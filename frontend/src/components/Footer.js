import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <p className="text-2xl font-extrabold text-blue-700">PhoneStore</p>
            </Link>
            <p className="mt-3 max-w-sm text-sm text-slate-500">
              Your trusted destination for the latest smartphones from all major brands. Compare, shop, and get the best deals on phones today.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-700">Shop</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              <li><Link to="/products" className="text-slate-500 hover:text-blue-700 transition">All Phones</Link></li>
              <li><Link to="/products?brand=Apple" className="text-slate-500 hover:text-blue-700 transition">iPhone</Link></li>
              <li><Link to="/products?brand=Samsung" className="text-slate-500 hover:text-blue-700 transition">Samsung Galaxy</Link></li>
              <li><Link to="/products?brand=Google" className="text-slate-500 hover:text-blue-700 transition">Google Pixel</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-700">Support</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              <li><Link to="/contact" className="text-slate-500 hover:text-blue-700 transition">Contact Us</Link></li>
              <li><Link to="/warranty" className="text-slate-500 hover:text-blue-700 transition">Warranty Info</Link></li>
              <li><Link to="/returns" className="text-slate-500 hover:text-blue-700 transition">Returns</Link></li>
              <li><Link to="/faq" className="text-slate-500 hover:text-blue-700 transition">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-700">Company</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/" className="text-slate-500 hover:text-blue-700 transition">Home</Link></li>
              <li><Link to="/products" className="text-slate-500 hover:text-blue-700 transition">Phones</Link></li>
              <li><Link to="/cart" className="text-slate-500 hover:text-blue-700 transition">Cart</Link></li>
              <li><Link to="/privacy" className="text-slate-500 hover:text-blue-700 transition">Privacy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-5 text-xs font-semibold text-slate-500">
          <p>&copy; 2026 PhoneStore. All rights reserved. | Buy the latest smartphones online</p>
        </div>
      </div>
    </footer>
  );
}