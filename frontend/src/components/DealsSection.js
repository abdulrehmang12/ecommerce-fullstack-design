import React from 'react';
import { Link } from 'react-router-dom';
import DealTimer from './DealTimer';

export default function DealsSection() {
  const deals = [
    { name: 'Smart watches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=200&h=200&q=80', discount: '-25%' },
    { name: 'Laptops', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=200&h=200&q=80', discount: '-15%' },
    { name: 'GoPro cameras', image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?auto=format&fit=crop&w=200&h=200&q=80', discount: '-40%' },
    { name: 'Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&h=200&q=80', discount: '-25%' },
    { name: 'Canon cameras', image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?auto=format&fit=crop&w=200&h=200&q=80', discount: '-25%' },
  ];

  return (
    <section className="bg-gradient-to-r from-orange-50 to-orange-100 py-10 px-4 rounded-2xl mx-4 my-8 shadow-lg">
      <div className="max-w-7xl mx-auto">
        {/* Timer Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Deals and offers</h3>
            <p className="text-gray-700 font-medium">Hygiene equipments - Limited time offer</p>
          </div>

          {/* Live Countdown Timer */}
          <DealTimer />
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {deals.map((deal, idx) => (
            <Link key={idx} to="/products" className="block">
              <div className="bg-white rounded-xl p-4 text-center hover:shadow-xl transition duration-300 transform hover:-translate-y-2 shadow-md cursor-pointer">
                <div className="relative mb-3 overflow-hidden rounded-lg">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="w-full h-24 object-cover hover:scale-110 transition duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded font-bold text-xs">
                    {deal.discount}
                  </div>
                </div>
                <p className="text-xs font-semibold text-gray-800 truncate">{deal.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
