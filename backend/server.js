const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();

const seedProducts = require("./data/products");
const connectDb = require("./config/db");
const Product = require("./models/Product");
const User = require("./models/User");

const app = express();

app.use(cors());
app.use(express.json());

const generateId = () => String(Date.now());
const JWT_SECRET = process.env.JWT_SECRET || "change-this-secret-in-production";

const signToken = (user) =>
  jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

const safeUser = (user) => ({
  id: String(user._id),
  name: user.name,
  email: user.email,
  role: user.role
});

const safeProduct = (product) => ({
  id: product.productId,
  name: product.name,
  price: product.price,
  image: product.image,
  description: product.description,
  category: product.category,
  stock: product.stock,
  featured: product.featured,
  rating: product.rating,
  reviews: product.reviews
});

const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (_error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  return next();
};

app.get("/api/health", (_req, res) => {
  res.json({ message: "Backend is running" });
});

app.post("/api/auth/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "name, email and password are required" });
  }

  const existingUser = await User.findOne({ email: String(email).toLowerCase() });
  if (existingUser) {
    return res.status(409).json({ message: "Email is already in use" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email: String(email).toLowerCase(),
    passwordHash,
    role: "user"
  });

  const token = signToken(user);
  return res.status(201).json({ token, user: safeUser(user) });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  const user = await User.findOne({ email: String(email).toLowerCase() });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = signToken(user);
  return res.json({ token, user: safeUser(user) });
});

app.get("/api/auth/me", requireAuth, (req, res) => {
  User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json({ user: safeUser(user) });
    })
    .catch(() => res.status(500).json({ message: "Failed to fetch user" }));
});

app.post("/api/auth/request-password-reset", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "email is required" });
  }

  const user = await User.findOne({ email: String(email).toLowerCase() });
  if (!user) {
    return res.json({ message: "If this email exists, reset instructions were generated" });
  }

  const rawToken = crypto.randomBytes(24).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
  user.resetPasswordTokenHash = hashedToken;
  user.resetPasswordExpiresAt = new Date(Date.now() + 1000 * 60 * 15);
  await user.save();

  return res.json({
    message: "Password reset token generated",
    resetToken: rawToken,
    expiresInMinutes: 15
  });
});

app.post("/api/auth/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) {
    return res.status(400).json({ message: "token and newPassword are required" });
  }

  const hashedToken = crypto.createHash("sha256").update(String(token)).digest("hex");
  const user = await User.findOne({
    resetPasswordTokenHash: hashedToken,
    resetPasswordExpiresAt: { $gt: new Date() }
  });

  if (!user) {
    return res.status(400).json({ message: "Reset token is invalid or expired" });
  }

  user.passwordHash = await bcrypt.hash(newPassword, 10);
  user.resetPasswordTokenHash = null;
  user.resetPasswordExpiresAt = null;
  await user.save();

  return res.json({ message: "Password has been reset successfully" });
});

app.post("/api/admin/users", requireAuth, requireAdmin, async (req, res) => {
  const { name, email, password, role = "user" } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "name, email, and password are required" });
  }

  const normalizedEmail = String(email).toLowerCase();
  const existing = await User.findOne({ email: normalizedEmail });
  if (existing) {
    return res.status(409).json({ message: "Email is already in use" });
  }

  if (!["user", "admin"].includes(role)) {
    return res.status(400).json({ message: "role must be user or admin" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const createdUser = await User.create({
    name,
    email: normalizedEmail,
    passwordHash,
    role
  });

  return res.status(201).json({ user: safeUser(createdUser) });
});

app.get("/api/admin/users", requireAuth, requireAdmin, async (_req, res) => {
  const allUsers = await User.find({}).sort({ createdAt: -1 });
  return res.json(allUsers.map(safeUser));
});

app.get("/api/products", async (req, res) => {
  const { q = "", category = "", featured = "" } = req.query;
  const normalizedQuery = String(q).toLowerCase();
  const normalizedCategory = String(category).toLowerCase();

  const products = await Product.find({}).lean();
  const filtered = products.filter((product) => {
    const matchesQuery =
      !normalizedQuery ||
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery);

    const matchesCategory =
      !normalizedCategory ||
      product.category.toLowerCase() === normalizedCategory;

    const matchesFeatured =
      featured === "" ||
      (featured === "true" ? product.featured : !product.featured);

    return matchesQuery && matchesCategory && matchesFeatured;
  });

  res.json(filtered.map(safeProduct));
});

app.get("/api/products/categories", (_req, res) => {
  Product.find({})
    .then((products) => {
      const categories = [...new Set(products.map((product) => product.category))];
      res.json(categories);
    })
    .catch(() => res.status(500).json({ message: "Failed to load categories" }));
});

app.get("/api/products/:id", (req, res) => {
  Product.findOne({ productId: req.params.id })
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.json(safeProduct(product));
    })
    .catch(() => res.status(500).json({ message: "Failed to load product" }));
});

app.post("/api/products", requireAuth, requireAdmin, async (req, res) => {
  const { name, price, image, description, category, stock } = req.body;
  if (!name || price == null || !description || !category || stock == null) {
    return res.status(400).json({
      message: "name, price, description, category, and stock are required"
    });
  }

  const product = await Product.create({
    productId: generateId(),
    name,
    price: Number(price),
    image: image || "https://placehold.co/600x600?text=Product",
    description,
    category,
    stock: Number(stock),
    featured: false,
    rating: 4.0,
    reviews: 0
  });

  return res.status(201).json(safeProduct(product));
});

app.put("/api/products/:id", requireAuth, requireAdmin, async (req, res) => {
  const existing = await Product.findOne({ productId: req.params.id });
  if (!existing) {
    return res.status(404).json({ message: "Product not found" });
  }

  Object.assign(existing, req.body);
  await existing.save();

  return res.json(safeProduct(existing));
});

app.delete("/api/products/:id", requireAuth, requireAdmin, async (req, res) => {
  const deleted = await Product.findOneAndDelete({ productId: req.params.id });
  if (!deleted) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res.json({ message: "Product deleted", product: safeProduct(deleted) });
});

app.post("/api/reset-products", requireAuth, requireAdmin, async (_req, res) => {
  await Product.deleteMany({});
  const seeded = seedProducts.map((item) => ({ ...item, productId: item.id }));
  await Product.insertMany(seeded);
  return res.json({ message: "Products reset", total: seeded.length });
});

const ensureSeedData = async () => {
  // Always reset products to ensure latest data
  await Product.deleteMany({});
  const seededProducts = seedProducts.map((item) => ({ ...item, productId: item.id }));
  await Product.insertMany(seededProducts);

  const adminEmail = "admin@estore.com";
  const admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    await User.create({
      name: "Admin",
      email: adminEmail,
      passwordHash: await bcrypt.hash("admin123", 10),
      role: "admin"
    });
  }
};

const PORT = process.env.PORT || 5000;
connectDb()
  .then(async () => {
    await ensureSeedData();
    app.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  });
