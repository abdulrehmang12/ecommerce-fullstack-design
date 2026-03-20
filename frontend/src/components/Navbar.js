import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { clearAuth, getAuthUser, onAuthChange } from '../utils/auth';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(getAuthUser());

  const navItems = [
    { label: 'All Phones', href: '/products' },
    { label: 'iPhone', href: '/products?brand=Apple' },
    { label: 'Samsung', href: '/products?brand=Samsung' },
    { label: 'Google Pixel', href: '/products?brand=Google' },
    { label: 'Best Deals', href: '/products?featured=true' }
  ];

  useEffect(() => {
    const unsubscribe = onAuthChange(() => {
      setUser(getAuthUser());
    });

    return unsubscribe;
  }, []);

  const handleLogout = () => {
    clearAuth();
    setUser(null);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="border-b border-slate-100 bg-slate-50/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs font-semibold text-slate-600 sm:px-6 lg:px-8">
          <p className="hidden sm:block">Fast delivery to 180+ countries</p>
          <div className="flex items-center gap-4">
            <select className="bg-transparent outline-none">
              <option>English, USD</option>
            </select>
            <select className="bg-transparent outline-none">
              <option>Ship to Germany</option>
              <option>Ship to UAE</option>
              <option>Ship to USA</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl font-extrabold text-white">📱</div>
            <div>
              <p className="text-xl font-extrabold tracking-tight text-blue-700">PhoneStore</p>
              <p className="text-xs font-medium text-slate-500">Buy Latest Smartphones</p>
            </div>
          </Link>

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold md:hidden"
            aria-label="Toggle menu"
          >
            Menu
          </button>

          <div className="hidden flex-1 md:flex md:items-center md:gap-2 md:px-4">
            <input
              type="text"
              placeholder="Search phones..."
              className="h-11 flex-1 rounded-l-lg border border-slate-300 px-4 text-sm outline-none focus:border-blue-500"
            />
            <select className="h-11 border-y border-slate-300 px-3 text-sm outline-none">
              <option>All Brands</option>
              <option>Apple iPhone</option>
              <option>Samsung Galaxy</option>
              <option>Google Pixel</option>
              <option>Xiaomi</option>
              <option>OnePlus</option>
            </select>
            <button className="h-11 rounded-r-lg bg-blue-600 px-6 text-sm font-semibold text-white transition hover:bg-blue-700">
              Search
            </button>
          </div>

          <div className="hidden items-center gap-5 text-sm font-semibold text-slate-600 md:flex">
            {user ? (
              <>
                <span className="text-xs font-bold text-slate-500">Hi, {user.name}</span>
                {user.role === 'admin' && (
                  <Link to="/admin/products" className="transition hover:text-blue-700">Admin</Link>
                )}
                <button onClick={handleLogout} className="transition hover:text-blue-700">Logout</button>
              </>
            ) : (
              <Link to="/login" className="transition hover:text-blue-700">Login</Link>
            )}
            <Link to="/cart" className="rounded-lg border border-slate-200 px-4 py-2 transition hover:border-blue-600 hover:text-blue-700">
              Cart
            </Link>
          </div>
        </div>

        <div className="mt-4 hidden items-center gap-1 border-t border-slate-100 pt-3 text-sm font-semibold text-slate-600 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="rounded-md px-3 py-2 transition hover:bg-blue-50 hover:text-blue-700"
            >
              {item.label}
            </Link>
          ))}
          <span className="ml-auto text-xs font-bold text-blue-700">🚚 Free Shipping</span>
        </div>

        {isOpen && (
          <div className="mt-3 space-y-3 rounded-xl border border-slate-200 p-3 md:hidden">
            <input
              type="text"
              placeholder="Search phones..."
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm"
            />
            <div className="grid grid-cols-2 gap-2 text-sm">
              {navItems.map((item) => (
                <Link key={item.label} to={item.href} className="rounded-lg bg-slate-50 px-3 py-2 font-semibold text-slate-600">
                  {item.label}
                </Link>
              ))}
              {user?.role === 'admin' && (
                <Link to="/admin/products" className="rounded-lg bg-slate-50 px-3 py-2 font-semibold text-slate-600">
                  Admin
                </Link>
              )}
              {!user && (
                <Link to="/login" className="rounded-lg bg-slate-50 px-3 py-2 font-semibold text-slate-600">
                  Login
                </Link>
              )}
            </div>
            {user && (
              <button onClick={handleLogout} className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">
                Logout
              </button>
            )}
            <Link to="/cart" className="block rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white">
              Open Cart
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}