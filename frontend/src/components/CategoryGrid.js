import React from 'react';
import { Link } from 'react-router-dom';

export default function CategoryGrid() {
  const categories = [
    {
      id: 1,
      name: 'Home and outdoor',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&h=300&q=80',
      items: '12,911 items'
    },
    {
      id: 2,
      name: 'Consumer electronics and gadgets',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&h=300&q=80',
      items: '45,230 items'
    },
    {
      id: 3,
      name: 'Soft chairs',
      image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=400&h=300&q=80',
      items: '8,456 items'
    },
    {
      id: 4,
      name: 'Smart watches',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&h=300&q=80',
      items: '5,234 items'
    },
    {
      id: 5,
      name: 'Kitchen mixer',
      image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?auto=format&fit=crop&w=400&h=300&q=80',
      items: '3,120 items'
    },
    {
      id: 6,
      name: 'Headphones',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&h=300&q=80',
      items: '9,876 items'
    }
  ];

  return (
    <section className="py-12 sm:py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Browse by Category</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map(category => (
            <Link
              key={category.id}
              to="/products"
              className="relative overflow-hidden rounded-lg group cursor-pointer"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 sm:h-64 object-cover group-hover:scale-110 transition duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition duration-300 flex flex-col justify-end p-4 sm:p-6">
                <h3 className="text-white text-lg sm:text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-gray-200 text-sm sm:text-base mb-3">{category.items}</p>
                <button className="bg-white text-gray-800 px-4 py-2 rounded font-semibold w-fit hover:bg-gray-100 transition">
                  Source now
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
