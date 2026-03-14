import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-600">🛍️</span>
            <span className="text-2xl font-bold hidden sm:inline">EStore</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-blue-600 transition">
              Products
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-blue-600 transition">
              Cart
            </Link>
          </div>

          {/* Cart Icon */}
          <Link
            to="/cart"
            className="hidden md:flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            <span>🛒</span>
            <span>Cart</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block px-4 py-2 hover:bg-gray-100 rounded">
              Home
            </Link>
            <Link to="/products" className="block px-4 py-2 hover:bg-gray-100 rounded">
              Products
            </Link>
            <Link to="/cart" className="block px-4 py-2 hover:bg-gray-100 rounded">
              Cart
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}