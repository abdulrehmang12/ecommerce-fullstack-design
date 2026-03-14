import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sample featured products
    setFeaturedProducts([
      {
        id: '1',
        name: 'Wireless Headphones',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        description: 'Premium wireless headphones with noise cancellation',
        category: 'Electronics',
        stock: 50
      },
      {
        id: '2',
        name: 'USB-C Cable',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500',
        description: 'Durable USB-C charging cable',
        category: 'Accessories',
        stock: 100
      },
      {
        id: '3',
        name: 'Phone Case',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1606933248051-5ce27db6ceaa?w=500',
        description: 'Protective phone case for all models',
        category: 'Accessories',
        stock: 75
      },
      {
        id: '4',
        name: 'Wireless Mouse',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
        description: 'Ergonomic wireless mouse',
        category: 'Electronics',
        stock: 60
      }
    ]);
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to EStore
          </h1>
          <p className="text-lg md:text-xl mb-8 text-blue-100">
            Discover amazing products at unbeatable prices
          </p>
          <Link
            to="/products"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
            <p className="text-gray-600">On orders over $50</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
            <p className="text-gray-600">100% safe transactions</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">↩️</div>
            <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
            <p className="text-gray-600">30-day money back</p>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Featured Products
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Check out our best-selling items
          </p>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-blue-600 text-white py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="mb-6">Get the latest updates on new products and special offers</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded text-gray-800"
            />
            <button className="bg-blue-800 px-6 py-3 rounded font-semibold hover:bg-blue-900 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}