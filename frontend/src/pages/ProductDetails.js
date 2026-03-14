import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  // Sample product data - in Week 2 this will come from API
  const product = {
    id: '1',
    name: 'Wireless Headphones Pro',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop',
    description: 'Experience premium audio with our wireless headphones featuring active noise cancellation, 30-hour battery life, and premium comfort padding.',
    category: 'Electronics',
    stock: 50,
    rating: 4.5,
    reviews: 128,
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Bluetooth 5.0 connectivity',
      'Comfortable padding for long use',
      'Built-in high-quality microphone'
    ],
    specifications: {
      'Color': 'Black',
      'Weight': '250g',
      'Warranty': '2 years',
      'Connectivity': 'Bluetooth 5.0'
    }
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Added ${quantity} item(s) to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-white py-8 sm:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center space-x-2 text-gray-600 text-sm sm:text-base">
          <button onClick={() => navigate('/')} className="hover:text-blue-600 transition">
            Home
          </button>
          <span>/</span>
          <button onClick={() => navigate('/products')} className="hover:text-blue-600 transition">
            Products
          </button>
          <span>/</span>
          <span className="text-gray-900 font-semibold truncate">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden h-64 sm:h-96">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div>
            {/* Category & Title */}
            <div className="mb-4">
              <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide mb-2 font-semibold">
                {product.category}
              </p>
              <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center">
                <span className="text-yellow-400 text-lg">★★★★☆</span>
                <span className="ml-2 text-gray-600 text-sm sm:text-base">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline space-x-4 flex-wrap">
                <span className="text-3xl sm:text-4xl font-bold text-blue-600">
                  ${product.price}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  ${(product.price * 1.2).toFixed(2)}
                </span>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded font-semibold text-sm">
                  Save 20%
                </span>
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              <p className={`text-base sm:text-lg font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-sm sm:text-lg mb-8">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded border border-gray-300 hover:bg-gray-100 transition font-bold"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border border-gray-300 rounded px-3 py-2"
                  min="1"
                  max={product.stock}
                />
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 rounded border border-gray-300 hover:bg-gray-100 transition font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8 flex-col sm:flex-row">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 py-3 rounded-lg font-semibold text-white transition text-sm sm:text-base ${
                  product.stock > 0
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className={`flex-1 py-3 rounded-lg font-semibold transition text-sm sm:text-base ${
                  product.stock > 0
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-400 cursor-not-allowed text-white'
                }`}
              >
                Buy Now
              </button>
            </div>

            {/* Additional Info */}
            <div className="border-t pt-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-2 sm:p-4">
                  <div className="text-3xl mb-2">🚚</div>
                  <p className="text-xs sm:text-sm text-gray-600">Free Shipping</p>
                </div>
                <div className="text-center p-2 sm:p-4">
                  <div className="text-3xl mb-2">↩️</div>
                  <p className="text-xs sm:text-sm text-gray-600">Easy Returns</p>
                </div>
                <div className="text-center p-2 sm:p-4">
                  <div className="text-3xl mb-2">🔒</div>
                  <p className="text-xs sm:text-sm text-gray-600">Secure Payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features & Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {/* Features */}
          <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Key Features</h3>
            <ul className="space-y-3">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Specifications */}
          <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Specifications</h3>
            <dl className="space-y-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b pb-2">
                  <dt className="font-semibold text-gray-700 capitalize text-sm sm:text-base">{key}</dt>
                  <dd className="text-gray-600 text-sm sm:text-base">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}