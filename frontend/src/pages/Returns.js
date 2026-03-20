import React from 'react';
import { Link } from 'react-router-dom';

export default function Returns() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link to="/" className="text-sm font-bold text-blue-700 hover:text-blue-600">← Back Home</Link>
        <h1 className="mt-4 text-4xl font-extrabold text-slate-900">Returns & Refunds</h1>
        <p className="mt-2 text-lg text-slate-600">We want you to be completely satisfied with your purchase.</p>

        <div className="mt-8 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-2xl font-bold text-slate-900">30-Day Return Policy</h3>
            <p className="mt-3 text-slate-600">We offer a hassle-free 30-day return window from the date of purchase. If you're not completely satisfied with your phone, we'll make it right.</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-2xl font-bold text-slate-900">Return Conditions</h3>
            <ul className="mt-4 space-y-3 text-slate-600">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>Device must be in original, unopened condition</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>All original accessories and documentation included</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>No signs of physical damage or use</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>Full refund to original payment method</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-2xl font-bold text-slate-900">How to Return</h3>
            <ol className="mt-4 space-y-3 list-decimal list-inside text-slate-600">
              <li>Contact our support team within 30 days of purchase</li>
              <li>Provide your order number and reason for return</li>
              <li>Receive a prepaid return shipping label</li>
              <li>Pack the device securely with all accessories</li>
              <li>Ship back with tracking number</li>
              <li>Refund issued within 5-7 business days of receipt</li>
            </ol>
          </div>

          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <h4 className="font-bold text-slate-900">📞 Need Help?</h4>
            <p className="mt-2 text-slate-600">Contact our support team at support@phonestore.com or call +1 (555) 123-4567</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/contact" className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700">
            Start a Return
          </Link>
        </div>
      </div>
    </section>
  );
}
