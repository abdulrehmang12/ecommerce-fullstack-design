const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    image: {
      type: String,
      default: "https://placehold.co/600x600?text=Product"
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    stock: {
      type: Number,
      required: true,
      min: 0
    },
    featured: {
      type: Boolean,
      default: false
    },
    rating: {
      type: Number,
      default: 4,
      min: 0,
      max: 5
    },
    reviews: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", productSchema);
