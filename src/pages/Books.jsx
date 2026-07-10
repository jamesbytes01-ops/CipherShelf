import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, RotateCcw, Star, X } from 'lucide-react';
import booksData from '../data/books.json';
import { BookCard } from '../components/cards/BookCard';
import { Button } from '../components/ui/Button';

const CATEGORIES = [
  'Ethical Hacking',
  'Cryptography',
  'OSINT',
  'Blue Team',
  'SOC',
  'Red Team',
  'Networking',
  'Linux',
  'Python',
  'Web Security',
  'Cloud Security',
  'Malware Analysis',
  'Digital Forensics'
];

export default function Books() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState('All');
  const [maxPrice, setMaxPrice] = useState(100);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Derive unique authors for filtering
  const authors = useMemo(() => {
    const list = booksData.map((b) => b.author);
    return ['All', ...new Set(list)].sort();
  }, []);

  // Update states when search parameters change (from Navbar/Footer links)
  useEffect(() => {
    const q = searchParams.get('search') || '';
    setSearchQuery(q);

    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategories([cat]);
    } else {
      setSelectedCategories([]);
    }
  }, [searchParams]);

  // Reset all filters helper
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedAuthor('All');
    setMaxPrice(100);
    setMinRating(0);
    setSortBy('featured');
    setSearchParams({});
  };

  // Main filter and sorting logic
  const filteredBooks = useMemo(() => {
    let result = [...booksData];

    // 1. Text Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q)
      );
    }

    // 2. Category selection
    if (selectedCategories.length > 0) {
      result = result.filter((b) => selectedCategories.includes(b.category));
    }

    // 3. Author dropdown
    if (selectedAuthor !== 'All') {
      result = result.filter((b) => b.author === selectedAuthor);
    }

    // 4. Price slider
    result = result.filter((b) => b.price <= maxPrice);

    // 5. Rating selection
    if (minRating > 0) {
      result = result.filter((b) => b.rating >= minRating);
    }

    // 6. Sorting logic
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // Default: featured first, then bestseller
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [searchQuery, selectedCategories, selectedAuthor, maxPrice, minRating, sortBy]);

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Title */}
      <div className="text-left mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
          Books Repository
        </h1>
        <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
          Search and filter through {booksData.length} premium cybersecurity editions.
        </p>
      </div>

      {/* Catalog Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* SIDEBAR FILTERS (Desktop) */}
        <aside className="hidden lg:flex flex-col gap-8 bg-white border border-slate-100 p-6 rounded-[20px] shadow-card text-left">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="font-bold text-slate-900 text-sm tracking-wide uppercase flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 stroke-[2]" /> Filters
            </h2>
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-slate-400 hover:text-slate-900 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Search bar inside filters */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Search</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl pl-9 pr-3 py-2 outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-colors"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Categories select checklist */}
          <div className="flex flex-col gap-2.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Category</label>
            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
              {CATEGORIES.map((cat) => (
                <label key={cat} className="flex items-center gap-2.5 text-xs text-slate-600 hover:text-slate-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="w-4 h-4 rounded border-slate-300 text-accent focus:ring-accent accent-accent"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Author Select */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Author</label>
            <select
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl p-2.5 outline-none focus:bg-white focus:border-slate-400 transition-colors"
            >
              {authors.map((auth) => (
                <option key={auth} value={auth}>
                  {auth}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Slider */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
              <span>Max Price</span>
              <span className="text-accent text-sm font-extrabold">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-accent"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
              <span>$10</span>
              <span>$100</span>
            </div>
          </div>

          {/* Min Rating Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Minimum Rating</label>
            <div className="flex items-center gap-1.5">
              {[0, 4.3, 4.5, 4.8].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setMinRating(rating)}
                  className={`flex-1 text-[10px] font-bold py-1.5 px-2 rounded-lg border transition-all ${
                    minRating === rating
                      ? 'bg-slate-900 border-slate-900 text-white'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {rating === 0 ? 'All' : `${rating}★`}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* MAIN RESULTS GRID AREA */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          {/* Header controls (Sort and mobile filters trigger) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 text-left">
            <div className="text-xs text-slate-400 font-semibold">
              Showing <span className="text-slate-900 font-bold">{filteredBooks.length}</span> of {booksData.length} Books
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
              {/* Mobile Filter toggle */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 border border-slate-200 text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-slate-50 active:scale-95 transition-all text-slate-800"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
              </button>

              {/* Sort selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-semibold whitespace-nowrap">Sort By</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 outline-none focus:bg-white focus:border-slate-400 transition-colors cursor-pointer font-medium text-slate-700"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating: High to Low</option>
                  <option value="title">Title: A-Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Grid display */}
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-6 border border-dashed border-slate-200 rounded-[20px] text-center">
              <span className="text-3xl mb-3">🔍</span>
              <h3 className="font-bold text-slate-800 text-base">No books match your criteria</h3>
              <p className="text-xs text-slate-500 max-w-xs mt-1.5 leading-relaxed">
                Try widening your search keywords or resetting specific filters to browse the entire collection.
              </p>
              <Button variant="outline" size="sm" className="mt-5" onClick={handleResetFilters}>
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE FILTER SIDEBAR OVERLAY */}
      {isMobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/20 backdrop-blur-sm flex justify-end" onClick={() => setIsMobileFilterOpen(false)}>
          <div 
            className="w-full max-w-xs bg-white h-full p-6 flex flex-col gap-6 overflow-y-auto shadow-2xl animate-slide-left text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-900 text-sm tracking-wide uppercase flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-900"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Reset option */}
            <button
              onClick={() => {
                handleResetFilters();
                setIsMobileFilterOpen(false);
              }}
              className="text-xs font-semibold text-accent flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-accent/5 hover:bg-accent/10 transition-colors w-full"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset All Filters
            </button>

            {/* Keyword Search */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Search</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl pl-9 pr-3 py-2 outline-none"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-col gap-2.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Category</label>
              <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-1">
                {CATEGORIES.map((cat) => (
                  <label key={cat} className="flex items-center gap-2.5 text-xs text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="w-4 h-4 rounded border-slate-300 text-accent focus:ring-accent"
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Author */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Author</label>
              <select
                value={selectedAuthor}
                onChange={(e) => setSelectedAuthor(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl p-2.5"
              >
                {authors.map((auth) => (
                  <option key={auth} value={auth}>
                    {auth}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Slider */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
                <span>Max Price</span>
                <span className="text-accent text-sm font-extrabold">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>

            {/* Min Rating */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Minimum Rating</label>
              <div className="flex items-center gap-1.5">
                {[0, 4.3, 4.5, 4.8].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => {
                      setMinRating(rating);
                    }}
                    className={`flex-1 text-[10px] font-bold py-1.5 px-2 rounded-lg border transition-all ${
                      minRating === rating
                        ? 'bg-slate-900 border-slate-900 text-white'
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    {rating === 0 ? 'All' : `${rating}★`}
                  </button>
                ))}
              </div>
            </div>

            <Button variant="primary" size="md" className="w-full mt-4" onClick={() => setIsMobileFilterOpen(false)}>
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
