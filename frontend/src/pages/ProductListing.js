import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { productsApi } from '../api/productsApi';

export default function ProductListing() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          productsApi.getProducts(),
          productsApi.getCategories()
        ]);
        setProducts(productsData);
        setCategories(['All', ...categoriesData]);
      } catch (_error) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Get brand from URL query parameter
  useEffect(() => {
    const brand = searchParams.get('brand');
    if (brand) {
      setSelectedBrand(brand);
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    const next = products.filter((product) => {
      const matchesQuery =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;

      // Filter by brand if selected
      let matchesBrand = true;
      if (selectedBrand) {
        const brandLower = selectedBrand.toLowerCase();
        const nameLower = product.name.toLowerCase();

        // Brand keyword mapping
        const brandKeywords = {
          'apple': ['iphone'],
          'samsung': ['samsung'],
          'google': ['google', 'pixel'],
          'xiaomi': ['xiaomi'],
          'oneplus': ['oneplus']
        };

        const keywords = brandKeywords[brandLower] || [brandLower];
        matchesBrand = keywords.some(keyword => nameLower.includes(keyword));
      }

      return matchesQuery && matchesCategory && matchesBrand;
    });

    if (sortBy === 'price-low') {
      next.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      next.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      next.sort((a, b) => a.name.localeCompare(b.name));
    }

    return next;
  }, [products, searchTerm, selectedCategory, sortBy, selectedBrand]);

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">
                {selectedBrand ? `${selectedBrand} Phones` : 'All Phones'}
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                {selectedBrand ? `Explore our selection of ${selectedBrand} smartphones` : 'Discover our wide selection of quality phones'}
              </p>
            </div>
            {selectedBrand && (
              <button
                onClick={() => setSelectedBrand('')}
                className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
              >
                ✕ Clear Filter
              </button>
            )}
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-4">
            <input
              type="text"
              placeholder="Search by name or category"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 md:col-span-2"
            />

            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-600">{filteredProducts.length} products found</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex h-56 items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-lg font-bold text-slate-800">No products match your filter</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4' : 'space-y-4'}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} viewMode={viewMode} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
