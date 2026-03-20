import React from 'react';
import { Link } from 'react-router-dom';

export default function CategoryBrowse() {
  const categories = [
    {
      name: 'Home and outdoor',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&h=250&q=80',
      gradient: 'from-amber-500 to-orange-600'
    },
    {
      name: 'Consumer electronics',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&h=250&q=80',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      name: 'Soft chairs',
      image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=400&h=250&q=80',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      name: 'Smart watches',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&h=250&q=80',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      name: 'Kitchen dishes',
      image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?auto=format&fit=crop&w=400&h=250&q=80',
      gradient: 'from-red-500 to-rose-600'
    },
    {
      name: 'Headphones',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&h=250&q=80',
      gradient: 'from-yellow-500 to-orange-600'
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Browse by Category</h2>
          <p className="text-gray-600 text-lg">Explore our wide range of products</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, idx) => (
            <Link
              key={idx}
              to="/products"
              className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 group h-56"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-40 group-hover:opacity-50 transition duration-300`}></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-white text-2xl font-bold mb-3">{category.name}</h3>
                <button className="bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition w-fit shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300">
                  Browse ->
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
