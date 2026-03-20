import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productsApi } from '../api/productsApi';
import { addToCart } from '../utils/cart';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productData = await productsApi.getProductById(id);
        setProduct(productData);
      } catch (_error) {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="px-4 py-14 text-center">
        <p className="text-lg font-bold text-slate-800">Product not found.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    window.alert(`Added ${quantity} item(s) to cart`);
  };

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex items-center gap-2 text-sm text-slate-500">
          <button onClick={() => navigate('/')} className="hover:text-blue-700">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/products')} className="hover:text-blue-700">Products</button>
          <span>/</span>
          <span className="font-semibold text-slate-700">{product.name}</span>
        </div>

        <div className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-xl bg-slate-100">
            <img src={product.image} alt={product.name} className="h-full min-h-80 w-full object-cover" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-700">{product.category}</p>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-900">{product.name}</h1>

            <div className="mt-4 flex items-center gap-3 text-sm text-slate-500">
              <span className="rounded-full bg-amber-100 px-2 py-1 font-bold text-amber-700">{product.rating || 4.5}</span>
              <span>{product.reviews || 0} reviews</span>
              <span className="rounded-full bg-emerald-100 px-2 py-1 font-bold text-emerald-700">{product.stock > 0 ? 'In stock' : 'Out of stock'}</span>
            </div>

            <div className="mt-6">
              <p className="text-4xl font-extrabold text-slate-900">${product.price.toFixed(2)}</p>
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-600">{product.description}</p>

            <div className="mt-7 flex items-center gap-3">
              <button
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                className="h-10 w-10 rounded-lg border border-slate-300 font-bold"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
                className="h-10 w-20 rounded-lg border border-slate-300 text-center"
              />
              <button
                onClick={() => setQuantity((current) => Math.min(product.stock, current + 1))}
                className="h-10 w-10 rounded-lg border border-slate-300 font-bold"
              >
                +
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleAddToCart}
                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                Add to cart
              </button>
              <button
                onClick={() => {
                  handleAddToCart();
                  navigate('/cart');
                }}
                className="rounded-lg border border-blue-600 px-6 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
