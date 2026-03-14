import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const handleAddToCart = (e) => {
    e.preventDefault();
    // We'll implement cart logic later
    alert(`Added ${product.name} to cart!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:scale-105">
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-200 h-48">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
          Sale
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <p className="text-sm text-gray-500 mb-1">{product.category}</p>

        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Stock Status */}
        <p className={`text-sm font-semibold mb-3 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
        </p>

        {/* Price and Actions */}
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">
            ${product.price}
          </span>
          <div className="space-x-2">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`px-3 py-2 rounded text-white text-sm font-semibold transition ${
                product.stock > 0
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}