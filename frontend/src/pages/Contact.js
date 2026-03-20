import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <Link to="/" className="text-sm font-bold text-blue-700 hover:text-blue-600">← Back Home</Link>
          <h1 className="mt-4 text-4xl font-extrabold text-slate-900">Contact Us</h1>
          <p className="mt-2 text-lg text-slate-600">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-bold text-slate-900">Phone</h3>
              <p className="mt-2 text-slate-600">+1 (555) 123-4567</p>
              <p className="text-sm text-slate-500">Available Monday - Friday, 9am - 6pm EST</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-bold text-slate-900">Email</h3>
              <p className="mt-2 text-slate-600">support@phonestore.com</p>
              <p className="text-sm text-slate-500">We'll reply within 24 hours</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-bold text-slate-900">Address</h3>
              <p className="mt-2 text-slate-600">123 Tech Street<br />Silicon Valley, CA 94025<br />United States</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            {submitted && (
              <div className="mb-4 rounded-lg bg-green-50 border border-green-200 p-4">
                <p className="text-green-800 font-semibold">✓ Thank you! We'll get back to you soon.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
                  placeholder="Tell us more..."
                />
              </div>

              <button type="submit" className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
