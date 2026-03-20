import React, { useState } from 'react';

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    item: '',
    quantity: '',
    unit: 'Piece',
    details: '',
    email: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ item: '', quantity: '', unit: 'Piece', details: '', email: '' });
  };

  return (
    <section className="py-16 px-4 bg-blue-600">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Send quote to suppliers
              </h2>
              <p className="text-gray-600 mb-6">
                Tell us what you need, we'll help you find the right suppliers.
              </p>
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=500&h=350&q=80"
                alt="Suppliers"
                className="w-full h-56 object-cover rounded-xl shadow-md"
              />
            </div>

            {/* Right - Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {submitted && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg font-semibold text-center">
                  OK Quote request sent successfully!
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Item name *
                </label>
                <input
                  type="text"
                  name="item"
                  value={formData.item}
                  onChange={handleChange}
                  placeholder="What are you looking for?"
                  required
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="e.g. 100"
                    required
                    min="1"
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Unit
                  </label>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition text-sm bg-white"
                  >
                    <option>Piece</option>
                    <option>Kilogram</option>
                    <option>Ton</option>
                    <option>Dozen</option>
                    <option>Set</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Additional details
                </label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  placeholder="Describe your requirements..."
                  rows={3}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Your email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg transform hover:-translate-y-1 duration-300"
              >
                Send inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
