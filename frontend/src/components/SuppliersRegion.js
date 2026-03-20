import React from 'react';
import { Link } from 'react-router-dom';

const suppliers = [
  {
    id: 1,
    country: 'United States',
    flag: 'US',
    description: 'Made in USA',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&h=200&q=80'
  },
  {
    id: 2,
    country: 'Germany',
    flag: 'DE',
    description: 'Made in Germany',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=200&q=80'
  },
  {
    id: 3,
    country: 'China',
    flag: 'CN',
    description: 'Made in China',
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=300&h=200&q=80'
  },
  {
    id: 4,
    country: 'Japan',
    flag: 'JP',
    description: 'Made in Japan',
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=300&h=200&q=80'
  },
  {
    id: 5,
    country: 'Italy',
    flag: 'IT',
    description: 'Made in Italy',
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=300&h=200&q=80'
  },
  {
    id: 6,
    country: 'South Korea',
    flag: 'KR',
    description: 'Made in Korea',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=300&h=200&q=80'
  }
];

export default function SuppliersRegion() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Suppliers by region</h2>
          <p className="text-gray-600 text-lg">Find trusted suppliers from around the world</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {suppliers.map((supplier) => (
            <Link
              key={supplier.id}
              to="/products"
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-2 group text-center"
            >
              <div className="relative overflow-hidden h-28">
                <img
                  src={supplier.image}
                  alt={supplier.country}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition duration-300" />
              </div>
              <div className="p-3">
                <div className="text-2xl mb-1">{supplier.flag}</div>
                <p className="text-sm font-bold text-gray-800 truncate">{supplier.country}</p>
                <p className="text-xs text-gray-500">{supplier.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/products"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg transform hover:-translate-y-1 duration-300"
          >
            Browse all suppliers ->
          </Link>
        </div>
      </div>
    </section>
  );
}
