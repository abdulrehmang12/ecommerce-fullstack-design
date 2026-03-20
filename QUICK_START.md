# QUICK START REFERENCE
**For Running Your Application Locally**

---

## 🎯 Start the Application

### Option 1: Run Both Servers
```bash
# Terminal 1 - Backend
cd backend
npm run dev
# Runs on http://localhost:5000

# Terminal 2 - Frontend
cd frontend
npm start
# Runs on http://localhost:3000
```

### Option 2: Single Command (Run in Background)
The application is already running!
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

---

## 🔐 Demo Credentials

**Admin Account:**
- Email: `admin@estore.com`
- Password: `admin123`

**Test Flow:**
1. Go to http://localhost:3000
2. Click Login
3. Enter admin credentials
4. Access to /admin/products
5. Create, edit, or delete products

---

## 📍 Key URLs

| Page | URL | Description |
|------|-----|-------------|
| Home | http://localhost:3000 | Featured products & deals |
| Products | http://localhost:3000/products | All products list |
| Details | http://localhost:3000/products/1 | Specific product |
| Cart | http://localhost:3000/cart | Shopping cart |
| Login | http://localhost:3000/login | Auth page |
| Admin | http://localhost:3000/admin/products | Admin panel |

---

## 🧪 Features to Test

### 1. Browse Products
- [ ] Homepage loads with featured items
- [ ] Click "Browse All Products"
- [ ] Filter by category
- [ ] Search products
- [ ] Click product for details

### 2. Shopping Cart
- [ ] Add product to cart
- [ ] View cart
- [ ] Change quantity
- [ ] Remove item
- [ ] Refresh page → cart still there

### 3. Authentication
- [ ] Sign up with new account
- [ ] Login with credentials
- [ ] See greeting in navbar
- [ ] Try to access /admin → redirected
- [ ] Logout

### 4. Admin Panel
- [ ] Login with admin@estore.com / admin123
- [ ] Go to Admin panel (in navbar or /admin/products)
- [ ] Create new product
- [ ] Edit existing product
- [ ] Delete product
- [ ] See changes immediately

### 5. Responsive Design
- [ ] Shrink browser window
- [ ] Menu becomes hamburger
- [ ] Products change layout (1→2→4 cols)
- [ ] Cart page readable on mobile
- [ ] Forms full-width on mobile

---

## 📁 Project Structure

```
ecommerce-fullstack-design/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Product.js         # Product schema
│   ├── data/
│   │   └── products.js        # Sample data
│   ├── .env                   # Database & secret vars
│   ├── server.js              # All API routes
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── authApi.js     # Auth endpoints
│   │   │   └── productsApi.js # Product endpoints
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   └── ...others
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── ProductListing.js
│   │   │   ├── Cart.js
│   │   │   ├── Login.js
│   │   │   └── AdminProducts.js
│   │   ├── utils/
│   │   │   ├── auth.js        # Auth helpers
│   │   │   └── cart.js        # Cart helpers
│   │   └── App.js             # Routes
│   ├── .env                   # API URL config
│   ├── tailwind.config.js     # Tailwind setup
│   └── package.json
│
├── TESTING_REPORT.md          # Detailed test report
├── DEPLOYMENT_GUIDE.md        # How to deploy
├── FINAL_SUMMARY.md           # Complete summary
├── render.yaml                # Render config
└── README.md                  # Project info
```

---

## 🔧 Common Commands

```bash
# Backend
npm install              # Install dependencies
npm run dev             # Start with nodemon
npm start              # Start production

# Frontend
npm install            # Install dependencies
npm start             # Start dev server
npm run build         # Build for production
npm test              # Run tests

# Git
git status            # See changes
git add .             # Stage all
git commit -m "..."   # Commit
git push              # Push to GitHub
```

---

## 🛠️ Troubleshooting

### "Port 5000 already in use"
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### "Cannot find module X"
```bash
# In the directory (backend/ or frontend/)
npm install
```

### "API not responding"
```bash
# Check if backend is running
curl http://localhost:5000/api/products
# Should return product list
```

### "Cart not persisting"
- Open DevTools (F12)
- Go to Application → localStorage
- Check for "cart" key
- Clear if corrupted: `localStorage.clear()`

### "Login failing"
- Check admin credentials: admin@estore.com / admin123
- Check backend logs for errors
- Ensure MongoDB is connected

---

## 📊 API Endpoints

### Products
```
GET  /api/products                  # All products
GET  /api/products/:id              # One product
POST /api/products                  # Create (admin)
PUT  /api/products/:id              # Update (admin)
DELETE /api/products/:id            # Delete (admin)
GET  /api/products/categories       # Categories
```

### Auth
```
POST /api/auth/signup               # Register
POST /api/auth/login                # Login
GET  /api/auth/me                   # Current user
POST /api/auth/request-password-reset
POST /api/auth/reset-password
```

### Admin
```
POST /api/admin/users               # Create user
GET  /api/admin/users               # List users
```

---

## 🚀 Deployment (Render)

```bash
# 1. Push to GitHub
git push origin main

# 2. Go to Render.com
# 3. Create backend service
#    - Build: cd backend && npm install
#    - Start: cd backend && npm start
#    - Env: PORT, JWT_SECRET, MONGODB_URI

# 4. Create frontend service
#    - Build: cd frontend && npm run build
#    - Dir: frontend/build
#    - Env: REACT_APP_API_URL=<backend_url>

# 5. Test live URL
```

---

## ✅ Checklist Before Submission

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Can login with admin@estore.com / admin123
- [ ] Can create/edit/delete products
- [ ] Can add items to cart
- [ ] Cart persists on refresh
- [ ] Can sign up new account
- [ ] Responsive on mobile
- [ ] Tested on actual device (if possible)
- [ ] Code committed to GitHub
- [ ] Deployed to Render
- [ ] Live URL working
- [ ] Demo video recorded
- [ ] Submitted to Google Classroom

---

## 📞 Need Help?

### Check These Files
1. **TESTING_REPORT.md** - Detailed verification
2. **DEPLOYMENT_GUIDE.md** - Deployment steps
3. **FINAL_SUMMARY.md** - Complete overview
4. **README.md** - Original documentation

### Common Questions
- **Q: Where's the admin?**
  A: http://localhost:3000/admin/products (login required)

- **Q: How do I change products?**
  A: Go to admin panel, create/edit/delete

- **Q: How many products?**
  A: 8 sample products auto-loaded

- **Q: How to reset?**
  A: Delete MongoDB database, restart (auto-seed)

---

**Status:** ✅ READY FOR TESTING & DEPLOYMENT
**Last Updated:** March 20, 2026
**Version:** 1.0

