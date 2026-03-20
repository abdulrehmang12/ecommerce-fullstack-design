import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addToCart } from '../utils/cart';

export default function ProductCard({ product, viewMode = 'grid' }) {
  const [addedToCart, setAddedToCart] = useState(false);
  const fallbackImage = 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=900&h=700&q=80';

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const originalPrice = product.originalPrice || product.price * 1.2;
  const discountPercent = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  if (viewMode === 'list') {
    return (
      <article className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-lg sm:flex-row">
        <Link to={`/products/${product.id}`} className="sm:w-44 sm:flex-shrink-0">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={product.image}
              alt={product.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = fallbackImage;
              }}
              className="h-44 w-full object-cover transition duration-300 hover:scale-105"
            />
            {discountPercent > 0 && (
              <span className="absolute right-2 top-2 rounded-full bg-rose-600 px-2 py-1 text-xs font-bold text-white">
                -{discountPercent}%
              </span>
            )}
          </div>
        </Link>

        <div className="flex flex-1 flex-col">
          <Link to={`/products/${product.id}`}>
            <h3 className="text-lg font-bold text-slate-900 transition hover:text-blue-700">
              {product.name}
            </h3>
          </Link>

          <p className="mt-2 line-clamp-2 text-sm text-slate-600">{product.description}</p>

          <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
            <span className="font-semibold text-amber-500">{product.rating || 4.5}</span>
            <span>({product.reviews || 0} reviews)</span>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">In stock</span>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <span className="text-2xl font-extrabold text-slate-900">${product.price.toFixed(2)}</span>
            <span className="text-sm text-slate-400 line-through">${originalPrice.toFixed(2)}</span>
            <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-bold text-rose-700">
              Save {discountPercent}%
            </span>
          </div>

          <Link
            to={`/products/${product.id}`}
            className="mt-4 inline-flex text-sm font-bold text-blue-700"
          >
            View details
          </Link>
        </div>

        <div className="flex items-center sm:items-start">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`rounded-lg px-4 py-2 text-sm font-bold text-white transition ${
              product.stock > 0
                ? addedToCart
                  ? 'bg-emerald-600'
                  : 'bg-blue-600 hover:bg-blue-700'
                : 'cursor-not-allowed bg-slate-400'
            }`}
          >
            {addedToCart ? 'Added' : 'Add to cart'}
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-56 overflow-hidden bg-slate-100">
        <Link to={`/products/${product.id}`} className="block h-full w-full">
          <img
            src={product.image}
            alt={product.name}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallbackImage;
            }}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>

        {discountPercent > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-rose-600 px-3 py-1 text-xs font-bold text-white">
            -{discountPercent}%
          </span>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
          {product.category}
        </p>

        <Link to={`/products/${product.id}`}>
          <h3 className="mt-2 line-clamp-2 h-12 text-base font-bold text-slate-900 transition group-hover:text-blue-700">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
          <span>{product.rating || 4.5}</span>
          <span>•</span>
          <span>{product.reviews || 0} reviews</span>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="text-xl font-extrabold text-slate-900">${product.price.toFixed(2)}</span>
          <span className="text-sm text-slate-400 line-through">${originalPrice.toFixed(2)}</span>
        </div>

        <p className={`mt-2 text-xs font-bold ${product.stock > 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
          {product.stock > 0 ? 'In stock' : 'Out of stock'}
        </p>

        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`mt-4 w-full rounded-lg py-2.5 text-sm font-bold text-white transition ${
            product.stock > 0
              ? addedToCart
                ? 'bg-emerald-600'
                : 'bg-blue-600 hover:bg-blue-700'
              : 'cursor-not-allowed bg-slate-400'
          }`}
        >
          {addedToCart ? 'Added to cart' : 'Add to cart'}
        </button>
      </div>
    </article>
  );
}