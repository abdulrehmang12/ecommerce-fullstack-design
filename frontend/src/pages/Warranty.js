import React from 'react';
import { Link } from 'react-router-dom';

export default function Warranty() {
  const warrantyInfo = [
    {
      title: 'Standard Warranty',
      duration: '12 Months',
      coverage: ['Manufacturing defects', 'Hardware failures', 'Battery issues', 'Processor problems']
    },
    {
      title: 'Extended Warranty',
      duration: '24 Months',
      coverage: ['Everything in Standard', 'Accidental damage', 'Water damage', 'Screen replacement', 'Priority support']
    },
    {
      title: 'What\'s NOT Covered',
      duration: 'All Plans',
      coverage: ['Intentional damage', 'Unauthorized modifications', 'Normal wear and tear', 'Software issues', 'Lost or stolen devices']
    }
  ];

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link to="/" className="text-sm font-bold text-blue-700 hover:text-blue-600">← Back Home</Link>
        <h1 className="mt-4 text-4xl font-extrabold text-slate-900">Warranty Information</h1>
        <p className="mt-2 text-lg text-slate-600">Protect your investment with our comprehensive warranty programs.</p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {warrantyInfo.map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm font-semibold text-blue-700">{item.duration}</p>
              <ul className="mt-4 space-y-2">
                {item.coverage.map((cov, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-blue-600 flex-shrink-0"></span>
                    {cov}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-blue-50 p-6">
          <h2 className="text-2xl font-bold text-slate-900">How to Claim Warranty</h2>
          <ol className="mt-4 space-y-3 list-decimal list-inside text-slate-600">
            <li>Contact our support team with your order number and product details</li>
            <li>Describe the issue you're experiencing</li>
            <li>We'll arrange a convenient pickup or shipping location</li>
            <li>Device will be repaired or replaced within 7-10 business days</li>
            <li>Return shipping is free for all warranty claims</li>
          </ol>
        </div>

        <div className="mt-8 text-center">
          <Link to="/contact" className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700">
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  );
}
