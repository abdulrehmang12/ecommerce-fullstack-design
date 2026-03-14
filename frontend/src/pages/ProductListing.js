import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

export default function ProductListing() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  // Sample products data
  const allProducts = [
    {
      id: '1',
      name: 'Wireless Headphones',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      description: 'Premium wireless headphones with noise cancellation',
      category: 'Electronics',
      stock: 50
    },
    {
      id: '2',
      name: 'USB-C Cable',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500',
      description: 'Durable USB-C charging cable',
      category: 'Accessories',
      stock: 100
    },
    {
      id: '3',
      name: 'Phone Case',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1606933248051-5ce27db6ceaa?w=500',
      description: 'Protective phone case for all models',
      category: 'Accessories',
      stock: 75
    },
    {
      id: '4',
      name: 'Wireless Mouse',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
      description: 'Ergonomic wireless mouse',
      category: 'Electronics',
      stock: 60
    },
    {
      id: '5',
      name: 'Mechanical Keyboard',
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1587829191301-a351b0c9a01f?w=500',
      description: 'RGB Mechanical keyboard for gaming',
      category: 'Electronics',
      stock: 40
    },
    {
      id: '6',
      name: 'Screen Protector',
      price: 9.99,
      image: 'https://images.unsplash.com/photo-1614008375890-cb53b6c5f8d5?w=500',
      description: 'Tempered glass screen protector',
      category: 'Accessories',
      stock: 200
    },
  ];

  const categories = ['All', 'Electronics', 'Accessories'];

  useEffect(() => {
    setProducts(allProducts);
    setFilteredProducts(allProducts);
    setLoading(false);
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterProducts(term, selectedCategory);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterProducts(searchTerm, category);
  };

  const filterProducts = (searchTerm, category) => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by category
    if (category !== 'All') {
      filtered = filtered.filter(product => product.category === category);
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Products</h1>
          <p className="text-gray-600">Browse our complete collection</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search products by name or description..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-600"
          />
        </div>

        {/* Filters and Products */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Sidebar - Categories */}
          <div className="md:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-20">
              <h3 className="text-xl font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`block w-full text-left px-4 py-2 rounded transition ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Price Range */}
              <h3 className="text-xl font-semibold mb-4 mt-6">Price Range</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span>All Prices</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Under $25</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>$25 - $75</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Above $75</span>
                </label>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="md:col-span-4">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
              </div>
            )}

            {/* Results Count */}
            <div className="mt-8 text-center text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}