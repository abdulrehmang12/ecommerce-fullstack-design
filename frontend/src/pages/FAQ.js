import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function FAQ() {
  const [expanded, setExpanded] = useState(null);

  const faqs = [
    {
      q: 'How long does shipping take?',
      a: 'Standard shipping takes 5-7 business days. Express shipping takes 2-3 business days. International orders may take 7-14 days depending on the destination.'
    },
    {
      q: 'Is your store secure?',
      a: 'Yes! We use industry-standard SSL encryption and secure payment gateways. Your personal and payment information is completely safe.'
    },
    {
      q: 'Can I cancel my order?',
      a: 'You can cancel your order within 24 hours of purchase. After that, the order is processing and cannot be cancelled, but you can still return it within 30 days.'
    },
    {
      q: 'Do you offer student discounts?',
      a: 'Yes! We offer 10% student discount with valid student ID. Contact our support team to verify your status and receive your discount code.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major credit cards (Visa, Mastercard, American Express), Apple Pay, Google Pay, and PayPal.'
    },
    {
      q: 'Are phones unlocked?',
      a: 'All phones sold on PhoneStore come unlocked and work with any carrier. You can use them internationally with any local SIM card.'
    },
    {
      q: 'What if I receive a damaged phone?',
      a: 'If you receive a damaged device, contact us immediately with photos. We will replace it or provide a full refund at no cost to you, including return shipping.'
    },
    {
      q: 'How can I track my order?',
      a: 'After your order ships, you\'ll receive an email with a tracking number. You can use this to track your package in real-time on the carrier\'s website.'
    }
  ];

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link to="/" className="text-sm font-bold text-blue-700 hover:text-blue-600">← Back Home</Link>
        <h1 className="mt-4 text-4xl font-extrabold text-slate-900">Frequently Asked Questions</h1>
        <p className="mt-2 text-lg text-slate-600">Find answers to common questions about our products and services.</p>

        <div className="mt-8 space-y-2">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-200 bg-white">
              <button
                onClick={() => setExpanded(expanded === idx ? null : idx)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition"
              >
                <p className="text-left font-semibold text-slate-900">{faq.q}</p>
                <span className="text-2xl text-blue-600 flex-shrink-0">{expanded === idx ? '−' : '+'}</span>
              </button>
              {expanded === idx && (
                <div className="border-t border-slate-200 px-6 py-4 text-slate-600">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-blue-50 p-6 text-center">
          <p className="text-slate-600">Didn't find your answer?</p>
          <Link to="/contact" className="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700">
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  );
}
