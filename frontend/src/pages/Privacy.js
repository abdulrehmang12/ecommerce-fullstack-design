import React from 'react';
import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link to="/" className="text-sm font-bold text-blue-700 hover:text-blue-600">← Back Home</Link>
        <h1 className="mt-4 text-4xl font-extrabold text-slate-900">Privacy Policy</h1>
        <p className="mt-2 text-lg text-slate-600">Last updated: March 2026</p>

        <div className="mt-8 space-y-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-bold text-slate-900">1. Information We Collect</h2>
            <p className="mt-3 text-slate-600">We collect information you provide directly to us, such as:</p>
            <ul className="mt-3 space-y-2 ml-4 text-slate-600">
              <li>• Name, email address, and phone number</li>
              <li>• Shipping and billing address</li>
              <li>• Payment information</li>
              <li>• Purchase history and preferences</li>
              <li>• Customer service communications</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-bold text-slate-900">2. How We Use Your Information</h2>
            <p className="mt-3 text-slate-600">We use the information we collect to:</p>
            <ul className="mt-3 space-y-2 ml-4 text-slate-600">
              <li>• Process your orders and payments</li>
              <li>• Send order confirmations and updates</li>
              <li>• Provide customer support</li>
              <li>• Improve our products and services</li>
              <li>• Send marketing communications (with your consent)</li>
              <li>• Prevent fraud and ensure security</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-bold text-slate-900">3. Data Security</h2>
            <p className="mt-3 text-slate-600">
              We implement industry-standard security measures to protect your personal information. All payment processing is encrypted using SSL technology. However, no method of transmission over the internet is 100% secure.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-bold text-slate-900">4. Sharing Your Information</h2>
            <p className="mt-3 text-slate-600">
              We do not sell your personal information. We may share information with:
            </p>
            <ul className="mt-3 space-y-2 ml-4 text-slate-600">
              <li>• Payment processors and shipping carriers</li>
              <li>• Customer service providers</li>
              <li>• Law enforcement when required</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-bold text-slate-900">5. Cookies</h2>
            <p className="mt-3 text-slate-600">
              We use cookies to enhance your browsing experience. You can control cookie settings in your browser preferences.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-bold text-slate-900">6. Your Rights</h2>
            <p className="mt-3 text-slate-600">
              You have the right to access, update, or delete your personal information. Contact us at privacy@phonestore.com to exercise these rights.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-bold text-slate-900">7. Contact Us</h2>
            <p className="mt-3 text-slate-600">
              If you have questions about this Privacy Policy, please contact us at:<br />
              Email: privacy@phonestore.com<br />
              Phone: +1 (555) 123-4567
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/contact" className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
