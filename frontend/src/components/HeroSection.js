import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="px-4 pb-8 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-4">
        {/* Sidebar - Categories */}
        <aside className="hidden rounded-2xl border border-slate-200 bg-white p-4 lg:block">
          <p className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">Browse Phones</p>
          <div className="space-y-2">
            {['All Phones', 'iPhone', 'Samsung', 'Google Pixel', 'Xiaomi', 'OnePlus', 'Premium', 'Budget'].map((item) => (
              <Link
                key={item}
                to="/products"
                className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
              >
                {item}
              </Link>
            ))}
          </div>
        </aside>

        {/* Main Hero */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-50 to-sky-100 p-7 sm:p-10 lg:col-span-2">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-200/60 blur-3xl" />
          <div className="relative z-10 max-w-sm">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-blue-800">Latest Launch</p>
            <h1 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">iPhone 15 Pro Max</h1>
            <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">Advanced camera system with ProRaw, A17 Pro chip, and titanium design. Capture moments in stunning detail.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/products" className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700">Shop Now</Link>
              <Link to="/products" className="rounded-lg border border-blue-600 px-6 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50">Learn More</Link>
            </div>
          </div>
          <div className="relative z-10 mt-8 h-52 w-full rounded-xl overflow-hidden bg-gradient-to-b from-white/20 to-white/5 flex items-center justify-center shadow-lg">
            <div className="text-slate-400 font-semibold">iPhone 15 Pro Max</div>
          </div>
        </div>

        {/* Right Side Cards */}
        <div className="space-y-4">
          {/* Signup Box */}
          <div className="rounded-2xl border border-blue-200 bg-blue-100/80 p-5">
            <p className="text-sm font-semibold text-slate-600">New to PhoneStore?</p>
            <p className="mt-1 text-lg font-extrabold leading-tight text-slate-900">Get 10% off today</p>
            <button className="mt-4 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700">Sign Up</button>
            <Link to="/login" className="mt-2 block w-full rounded-lg border border-blue-600 text-center py-2.5 text-sm font-bold text-blue-700 transition hover:bg-blue-50">Log In</Link>
          </div>

          {/* Special Offer */}
          <div className="rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 p-5 text-white shadow-md">
            <p className="text-sm font-semibold uppercase tracking-wider text-amber-100">Special Offer</p>
            <p className="mt-1 text-lg font-extrabold">Trade-in your old phone</p>
            <p className="mt-1 text-xs text-amber-100">Get up to $500 credit</p>
          </div>

          {/* Free Delivery */}
          <div className="rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-600 p-5 text-white shadow-md">
            <p className="text-sm font-semibold uppercase tracking-wider text-cyan-100">Free Shipping</p>
            <p className="mt-1 text-lg font-extrabold">On all orders above $99</p>
            <p className="mt-1 text-xs text-cyan-100">Fast delivery guaranteed</p>
          </div>
        </div>
      </div>
    </section>
  );
}
