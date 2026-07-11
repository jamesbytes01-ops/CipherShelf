import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShieldCheck, Truck, RotateCcw, ArrowLeft, Plus, Minus, ShoppingBag } from 'lucide-react';
import _booksRaw from '../data/books.json';
const booksData = Array.isArray(_booksRaw) ? _booksRaw : (_booksRaw.books || []);
import { BookCover } from '../utils/svgGenerator';
import { BookCard } from '../components/cards/BookCard';
import { Button } from '../components/ui/Button';
import { useCart } from '../context/CartContext';

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);

  // Find book from local json database
  const book = booksData.find((b) => b.id === id);

  // Scroll to top on page load or ID change
  useEffect(() => {
    window.scrollTo(0, 0);
    setQuantity(1);
  }, [id]);

  if (!book) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Book Not Found</h2>
        <p className="text-sm text-slate-500 mt-2">The security manuscript you requested could not be resolved.</p>
        <Link to="/books">
          <Button variant="primary" size="md" className="mt-6">
            Return to Repository
          </Button>
        </Link>
      </div>
    );
  }

  const { title, author, category, rating, price, description, isbn, pages, language, publisher, publishedYear, coverColor } = book;

  // Find 4 related books in same category (excluding current book)
  const relatedBooks = booksData
    .filter((b) => b.category === category && b.id !== id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(book, quantity);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Back button */}
      <button 
        onClick={() => navigate(-1)} 
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-8 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Catalog
      </button>

      {/* Main split details structure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20 text-left">
        {/* Left: Huge Book Cover layout */}
        <div className="lg:col-span-5 flex justify-center sticky top-24">
          <div className="w-full max-w-[360px] aspect-[2/3]">
            <BookCover 
              title={title} 
              author={author} 
              category={category} 
              coverColor={coverColor} 
              isbn={isbn}
              coverId={book.coverId}
              image={book.image}
              size="lg"
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Right: Book Details */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex flex-col gap-2.5">
            {/* Category */}
            <span className="text-xs uppercase font-extrabold tracking-widest text-accent">
              {category}
            </span>
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {title}
            </h1>
            {/* Author */}
            <p className="text-base text-slate-500 font-medium">
              Written by <span className="text-slate-900 font-semibold">{author}</span>
            </p>
          </div>

          {/* Rating & Price Box */}
          <div className="flex flex-wrap items-center gap-6 py-4 px-5 bg-slate-50 border border-slate-100 rounded-2xl">
            <div className="flex items-center gap-1.5">
              <Star className="w-4.5 h-4.5 fill-amber-400 stroke-amber-400" />
              <span className="text-sm font-bold text-slate-800">{rating}</span>
              <span className="text-xs text-slate-400">/ 5.0 Rating</span>
            </div>
            <div className="h-4 w-px bg-slate-200 hidden sm:block" />
            <div className="text-2xl font-extrabold text-slate-950">
              ${price.toFixed(2)}
            </div>
            <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5 ml-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              In Stock &amp; Ready
            </div>
          </div>

          {/* Book Synopsis */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-slate-900 text-sm tracking-wide uppercase">Synopsis</h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>

          {/* Add to Cart Actions */}
          <div className="flex flex-wrap items-center gap-4 py-4 border-y border-slate-100">
            {/* Quantity Selector */}
            <div className="flex items-center border border-slate-200 rounded-xl bg-white">
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="p-2.5 text-slate-500 hover:text-slate-900"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 font-bold text-sm text-slate-950 select-none w-10 text-center">
                {quantity}
              </span>
              <button 
                onClick={() => setQuantity(prev => prev + 1)}
                className="p-2.5 text-slate-500 hover:text-slate-900"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Button */}
            <Button 
              variant="primary" 
              size="lg" 
              className="flex-1 sm:flex-none sm:px-12"
              icon={<ShoppingBag className="w-4.5 h-4.5" />}
              onClick={handleAddToCart}
            >
              Add To Cart
            </Button>

            {addedMessage && (
              <span className="text-xs text-emerald-600 font-semibold animate-fade-in flex items-center gap-1.5">
                ✓ Added to cart!
              </span>
            )}
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-2">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Publisher</span>
              <span className="text-xs font-semibold text-slate-800">{publisher}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Published</span>
              <span className="text-xs font-semibold text-slate-800">{publishedYear}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">ISBN-13</span>
              <span className="text-xs font-semibold text-slate-800">{isbn}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Format</span>
              <span className="text-xs font-semibold text-slate-800">{pages} Pages</span>
            </div>
          </div>

          {/* Extra delivery guarantee specs */}
          <div className="border border-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-slate-400" />
              <span>Authentic Publisher Editions</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-slate-400" />
              <span>Dispatch within 24 Hours</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-slate-400" />
              <span>7-Day Hassle-Free Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related books layout */}
      {relatedBooks.length > 0 && (
        <div className="border-t border-slate-100 pt-16 text-left">
          <div className="mb-10">
            <span className="text-xs font-bold text-accent uppercase tracking-widest">
              More in {category}
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
              Related Recommended Reads
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedBooks.map((relatedBook) => (
              <BookCard key={relatedBook.id} book={relatedBook} />
            ))}
          </div>
        </div>
      )}

      {/* MOBILE STICKY ADD TO CART BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-slate-200/50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-40 flex items-center gap-4">
        <div className="flex-1 flex flex-col">
          <span className="text-sm font-extrabold text-slate-950">${price.toFixed(2)}</span>
          <span className="text-[10px] text-slate-500 font-semibold truncate">{title}</span>
        </div>
        <Button 
          variant="primary" 
          size="md" 
          className="flex-shrink-0 px-6 shadow-lg shadow-slate-900/20"
          icon={<ShoppingBag className="w-4 h-4" />}
          onClick={handleAddToCart}
        >
          Add To Cart
        </Button>
      </div>
    </div>
  );
}
