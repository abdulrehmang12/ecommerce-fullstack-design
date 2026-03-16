import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, viewMode = 'grid' }) {
  const [addedToCart, setAddedToCart] = useState(false);
  const [wishlist, setWishlist] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    setWishlist(!wishlist);
  };

  // Calculate discount percentage
  const originalPrice = product.originalPrice || product.price * 1.2;
  const discountPercent = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  if (viewMode === 'list') {
    return (
      <div className="border rounded-lg overflow-hidden hover:shadow-lg transition mb-4 flex gap-4 p-4 bg-white">
        {/* Product Image */}
        <Link to={`/products/${product.id}`} className="flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-32 h-32 object-cover rounded hover:scale-105 transition"
          />
        </Link>

        {/* Product Info */}
        <div className="flex-grow">
          <Link to={`/products/${product.id}`}>
            <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition">
              {product.name}
            </h3>
          </Link>
          
          <p className="text-gray-600 text-sm mb-2">{product.description}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-400 text-sm">★★★★☆ {product.rating}</span>
            <span className="text-gray-500 text-sm">({product.reviews} orders)</span>
            <span className="text-green-600 text-sm font-semibold">Free Shipping</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
            <span className="text-lg text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-bold">
              -{discountPercent}%
            </span>
          </div>

          {/* View Details Link */}
          <Link
            to={`/products/${product.id}`}
            className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
          >
            View details →
          </Link>
        </div>

        {/* Wishlist & Cart */}
        <div className="flex flex-col gap-2 items-end">
          <button
            onClick={toggleWishlist}
            className={`text-2xl transition ${wishlist ? 'text-red-600' : 'text-gray-400 hover:text-red-600'}`}
          >
            ♥
          </button>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`px-4 py-2 rounded text-white text-sm font-semibold transition ${
              product.stock > 0
                ? addedToCart 
                  ? 'bg-green-600' 
                  : 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {addedToCart ? '✓ Added' : 'Add'}
          </button>
        </div>
      </div>
    );
  }

  // Grid view (default)
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-2 duration-300">
      {/* Product Image Container */}
      <div className="relative overflow-hidden bg-gray-200 h-48 sm:h-56">
        <Link 
          to={`/products/${product.id}`}
          className="block w-full h-full"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-110 transition duration-300"
          />
        </Link>
        
        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs sm:text-sm font-bold">
            -{discountPercent}%
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          className={`absolute top-2 left-2 text-2xl transition ${
            wishlist ? 'text-red-600' : 'text-white hover:text-red-600'
          }`}
        >
          ♥
        </button>

        {/* Free Shipping Badge */}
        <div className="absolute bottom-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
          Free Shipping
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3 sm:p-4">
        {/* Category */}
        <p className="text-xs sm:text-sm text-gray-500 mb-1 uppercase tracking-wide font-semibold">
          {product.category}
        </p>

        {/* Product Name */}
        <Link to={`/products/${product.id}`}>
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 truncate hover:text-blue-600 transition line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-yellow-400 text-xs sm:text-sm">★★★★★</span>
          <span className="text-gray-600 text-xs sm:text-sm">
            {product.rating} ({product.reviews} orders)
          </span>
        </div>

        {/* Price */}
        <div className="mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Stock Status */}
        <p className={`text-xs sm:text-sm font-semibold mb-3 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
        </p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full py-2 rounded text-white text-xs sm:text-sm font-semibold transition ${
            product.stock > 0
              ? addedToCart 
                ? 'bg-green-600' 
                : 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {addedToCart ? '✓ Added' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}