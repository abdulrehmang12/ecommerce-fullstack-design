import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import HeroSection from '../components/HeroSection';
import { productsApi } from '../api/productsApi';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [featured, allCategories] = await Promise.all([
          productsApi.getFeaturedProducts(),
          productsApi.getCategories()
        ]);
        setFeaturedProducts(featured);
        setCategories(allCategories);
      } catch (_error) {
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <HeroSection />

      {/* Best Deals Section */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">Limited Time Offers</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900">Best Deals on Latest Phones</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { brand: 'iPhone 15 Pro', discount: '-12%' },
              { brand: 'Samsung S24', discount: '-15%' },
              { brand: 'Xiaomi 14 Ultra', discount: '-18%' },
              { brand: 'OnePlus 12', discount: '-20%' }
            ].map((item) => (
              <div key={item.brand} className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-lg hover:-translate-y-1">
                <div className="relative h-40 bg-gradient-to-br from-blue-50 to-slate-100 rounded-xl overflow-hidden mb-4 flex items-center justify-center">
                  <p className="text-slate-400 font-semibold">{item.brand}</p>
                  <span className="absolute top-3 right-3 rounded-full bg-rose-600 text-white px-3 py-1 text-xs font-bold">{item.discount}</span>
                </div>
                <p className="text-sm font-bold text-slate-900">{item.brand}</p>
                <Link to="/products" className="mt-3 w-full block rounded-lg bg-blue-600 py-2 text-center text-sm font-bold text-white transition hover:bg-blue-700">
                  View Deal
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">Premium Selection</p>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900">Featured Smartphones</h2>
            </div>
            <LinkToProducts />
          </div>

          {loading ? (
            <div className="flex h-56 items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} viewMode="grid" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Brand Showcase */}
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">Shop by Brand</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[
              { label: 'Apple iPhone', brand: 'Apple' },
              { label: 'Samsung Galaxy', brand: 'Samsung' },
              { label: 'Google Pixel', brand: 'Google' },
              { label: 'Xiaomi', brand: 'Xiaomi' },
              { label: 'OnePlus', brand: 'OnePlus' },
              { label: 'All Phones', brand: '' },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.brand ? `/products?brand=${item.brand}` : '/products'}
                className="group rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:shadow-lg hover:border-blue-400"
              >
                <div className="h-20 bg-gradient-to-br from-blue-100 to-slate-100 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-slate-400 font-semibold text-sm">{item.label}</span>
                </div>
                <p className="font-bold text-slate-900 group-hover:text-blue-700 transition">{item.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-4 pb-10 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-2xl bg-gradient-to-r from-blue-700 to-blue-600 p-8 text-center">
          <h2 className="text-3xl font-extrabold text-white">Get Latest Phone Deals</h2>
          <p className="mt-2 text-blue-100">Subscribe to get exclusive offers and new phone launches first</p>
          <form className="mx-auto mt-6 flex max-w-xl flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg px-4 py-3 text-sm text-slate-800 outline-none"
              required
            />
            <button className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-800">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

function LinkToProducts() {
  return (
    <Link to="/products" className="text-sm font-bold text-blue-700">
      View all products
    </Link>
  );
}
