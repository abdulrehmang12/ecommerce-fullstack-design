import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

export default function ProductListing() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeFilters, setActiveFilters] = useState([]);
  
  // Price range filter
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  // Sample products data
  const allProducts = [
    {
      id: '1',
      name: 'Wireless Headphones Pro',
      price: 79.99,
      originalPrice: 129.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=400&fit=crop',
      description: 'Premium wireless headphones with noise cancellation',
      category: 'Electronics',
      stock: 50,
      rating: 4.5,
      reviews: 128
    },
    {
      id: '2',
      name: 'USB-C Fast Charging Cable',
      price: 12.99,
      originalPrice: 19.99,
      image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=400&fit=crop',
      description: 'Durable USB-C charging cable with fast charging',
      category: 'Accessories',
      stock: 100,
      rating: 4.8,
      reviews: 256
    },
    {
      id: '3',
      name: 'Premium Phone Case',
      price: 24.99,
      originalPrice: 39.99,
      image: 'https://images.unsplash.com/photo-1606933248051-5ce27db6ceaa?w=500&h=400&fit=crop',
      description: 'Protective phone case for all models',
      category: 'Accessories',
      stock: 75,
      rating: 4.6,
      reviews: 187
    },
    {
      id: '4',
      name: 'Wireless Gaming Mouse',
      price: 34.99,
      originalPrice: 59.99,
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=400&fit=crop',
      description: 'Ergonomic wireless mouse for gaming',
      category: 'Electronics',
      stock: 60,
      rating: 4.7,
      reviews: 198
    },
    {
      id: '5',
      name: 'Mechanical Gaming Keyboard',
      price: 99.99,
      originalPrice: 149.99,
      image: 'https://images.unsplash.com/photo-1587829191301-a351b0c9a01f?w=500&h=400&fit=crop',
      description: 'RGB Mechanical keyboard with Cherry MX switches',
      category: 'Electronics',
      stock: 40,
      rating: 4.9,
      reviews: 312
    },
    {
      id: '6',
      name: 'Tempered Glass Screen Protector',
      price: 9.99,
      originalPrice: 14.99,
      image: 'https://images.unsplash.com/photo-1614008375890-cb53b6c5f8d5?w=500&h=400&fit=crop',
      description: 'Premium tempered glass screen protector',
      category: 'Accessories',
      stock: 200,
      rating: 4.4,
      reviews: 421
    },
    {
      id: '7',
      name: '4K Webcam',
      price: 129.99,
      originalPrice: 199.99,
      image: 'https://images.unsplash.com/photo-1598370409815-3103d4ee4aae?w=500&h=400&fit=crop',
      description: 'Ultra HD 4K webcam for streaming and video calls',
      category: 'Electronics',
      stock: 30,
      rating: 4.8,
      reviews: 156
    },
    {
      id: '8',
      name: 'Portable Power Bank',
      price: 39.99,
      originalPrice: 69.99,
      image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=400&fit=crop',
      description: 'High-capacity portable power bank with fast charging',
      category: 'Accessories',
      stock: 85,
      rating: 4.5,
      reviews: 289
    },
    {
      id: '9',
      name: 'Smart Watch Pro',
      price: 199.99,
      originalPrice: 299.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=400&fit=crop',
      description: 'Advanced fitness tracking smart watch',
      category: 'Electronics',
      stock: 45,
      rating: 4.6,
      reviews: 234
    },
    {
      id: '10',
      name: 'Laptop Stand',
      price: 29.99,
      originalPrice: 49.99,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=400&fit=crop',
      description: 'Adjustable aluminum laptop stand',
      category: 'Accessories',
      stock: 120,
      rating: 4.7,
      reviews: 167
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
    setCurrentPage(1);
    filterAndSort(term, selectedCategory, sortBy, priceRange);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    filterAndSort(searchTerm, category, sortBy, priceRange);
  };

  const handleSortChange = (e) => {
    const sort = e.target.value;
    setSortBy(sort);
    filterAndSort(searchTerm, selectedCategory, sort, priceRange);
  };

  const handlePriceChange = (type, value) => {
    const newRange = { ...priceRange, [type]: value };
    setPriceRange(newRange);
    setCurrentPage(1);
    filterAndSort(searchTerm, selectedCategory, sortBy, newRange);
  };

  const filterAndSort = (searchTerm, category, sort, priceRange) => {
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

    // Filter by price range
    filtered = filtered.filter(product =>
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Sort
    if (sort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(filtered);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center space-x-2 text-gray-600 text-sm">
          <a href="/" className="hover:text-blue-600">Home</a>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Products</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Products</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Showing {currentItems.length} of {filteredProducts.length} products
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search products by name or description..."
              value={searchTerm}
              onChange={handleSearch}
              className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-600 transition text-sm sm:text-base"
            />
            <select
              className="border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-600 transition text-sm"
            >
              <option>All category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition text-sm">
              Search
            </button>
          </div>
        </div>

        {/* Active Filters Tags */}
        {(searchTerm || selectedCategory !== 'All') && (
          <div className="mb-6 flex flex-wrap gap-2">
            {searchTerm && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                {searchTerm}
                <button onClick={() => handleSearch({ target: { value: '' } })} className="hover:text-blue-600">
                  ✕
                </button>
              </span>
            )}
            {selectedCategory !== 'All' && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                {selectedCategory}
                <button onClick={() => handleCategoryChange('All')} className="hover:text-blue-600">
                  ✕
                </button>
              </span>
            )}
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setPriceRange({ min: 0, max: 1000 });
              }}
              className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Filters and Products */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-8">
          {/* Sidebar - Filters */}
          <div className="md:col-span-1">
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 sticky top-20 space-y-6">
              {/* Categories */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`block w-full text-left px-4 py-2 rounded transition text-sm ${
                        selectedCategory === category
                          ? 'bg-blue-600 text-white font-semibold'
                          : 'text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Price Range</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Min: ${priceRange.min}</label>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange.min}
                      onChange={(e) => handlePriceChange('min', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Max: ${priceRange.max}</label>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange.max}
                      onChange={(e) => handlePriceChange('max', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Sort */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-600"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          <div className="md:col-span-4">
            {/* View Mode Toggle */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                  title="Grid view"
                >
                  ⊞
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                  title="List view"
                >
                  ☰
                </button>
              </div>

              {/* Items Per Page */}
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(parseInt(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-gray-300 rounded px-3 py-2 text-sm"
              >
                <option value={5}>Show 5</option>
                <option value={10}>Show 10</option>
                <option value={20}>Show 20</option>
              </select>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : currentItems.length > 0 ? (
              <>
                <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8" : "space-y-4 mb-8"}>
                  {currentItems.map(product => (
                    <ProductCard key={product.id} product={product} viewMode={viewMode} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ←
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 rounded transition ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'border hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      →
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg mb-4">No products found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setPriceRange({ min: 0, max: 1000 });
                  }}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}