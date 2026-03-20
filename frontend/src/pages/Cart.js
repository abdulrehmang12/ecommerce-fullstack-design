import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCart, removeFromCart, updateCartQuantity } from '../utils/cart';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const handleRemove = (id) => {
    const next = removeFromCart(id);
    setCartItems(next);
  };

  const handleQuantity = (id, quantity) => {
    const next = updateCartQuantity(id, quantity);
    setCartItems(next);
  };

  const { subtotal, tax, shipping, total } = useMemo(() => {
    const subtotalValue = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const taxValue = subtotalValue * 0.1;
    const shippingValue = cartItems.length > 0 ? 10 : 0;
    return {
      subtotal: subtotalValue,
      tax: taxValue,
      shipping: shippingValue,
      total: subtotalValue + taxValue + shippingValue
    };
  }, [cartItems]);

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-3xl font-extrabold text-slate-900">My cart ({cartItems.length})</h1>

        {cartItems.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-xl font-bold text-slate-800">Your cart is empty</p>
            <p className="mt-2 text-sm text-slate-500">Add some products to continue</p>
            <Link to="/products" className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white">
              Browse products
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {cartItems.map((item) => (
                <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <img src={item.image} alt={item.name} className="h-24 w-24 rounded-xl object-cover" />

                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-slate-900">{item.name}</h2>
                      <p className="text-sm text-slate-500">{item.category}</p>
                      <p className="mt-2 text-lg font-extrabold text-slate-900">${item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8 rounded border border-slate-300 font-bold"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(event) => handleQuantity(item.id, Number(event.target.value) || 1)}
                        className="w-14 rounded border border-slate-300 px-2 py-1 text-center"
                      />
                      <button
                        onClick={() => handleQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 rounded border border-slate-300 font-bold"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-blue-700">${(item.price * item.quantity).toFixed(2)}</p>
                      <button onClick={() => handleRemove(item.id)} className="mt-2 text-xs font-bold text-rose-700">
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-xl font-extrabold text-slate-900">Order summary</h2>

              <div className="mt-5 space-y-3 border-b border-slate-200 pb-5 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 flex justify-between text-lg font-extrabold text-slate-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button className="mt-5 w-full rounded-lg bg-emerald-600 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-700">
                Proceed to checkout
              </button>

              <Link
                to="/products"
                className="mt-3 block w-full rounded-lg border border-blue-600 px-4 py-3 text-center text-sm font-bold text-blue-700"
              >
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
