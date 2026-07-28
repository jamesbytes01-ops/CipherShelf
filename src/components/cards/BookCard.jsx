import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Check, Download } from 'lucide-react';
import { BookCover } from '../../utils/svgGenerator';
import { useCart } from '../../context/CartContext';

export function BookCard({ book }) {
  const { id, title, author, category, rating, price, coverColor, bestseller, featured, isbn } = book;
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  // Generate a mock original price for the discount presentation
  const originalPrice = price * 1.25;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(book, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleDownload = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const content = `<!DOCTYPE html><html><head><title>${title}</title><style>body{font-family:system-ui,sans-serif;max-width:800px;margin:40px auto;padding:0 20px;line-height:1.6;color:#333}h1{color:#0f172a;border-bottom:2px solid #e2e8f0;padding-bottom:10px}.meta{color:#64748b;font-size:1.1rem;margin-bottom:2rem}.watermark{padding:1rem;background:#fef3c7;color:#92400e;border-radius:0.5rem;margin-bottom:2rem;border:1px solid #fcd34d}</style></head><body><div class="watermark"><strong>Demo Version:</strong> This is a simulated e-book preview. Full copyrighted text is not included in this development environment.</div><h1>${title}</h1><div class="meta">By ${author}</div><h2>Chapter 1: Introduction</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><h2>Chapter 2: Getting Started</h2><p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p></body></html>`;
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Determine card badge
  let badge = null;
  if (bestseller) {
    badge = 'Best Seller';
  } else if (featured) {
    badge = 'Top Rated';
  } else if (price < 30) {
    badge = 'New Arrival';
  }

  return (
    <div className="group relative flex flex-col justify-between bg-white rounded-[20px] p-4.5 border border-slate-100 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-slate-200 hover:shadow-[0_20px_50px_-12px_rgba(15,23,42,0.12)]">
      <Link to={`/book/${id}`} className="block">
        {/* Cover Container with Badge */}
        <div className="relative w-full aspect-[2/3] overflow-hidden rounded-[14px] bg-slate-950 mb-4 shadow-sm">
          <BookCover 
            title={title} 
            author={author} 
            category={category} 
            coverColor={coverColor} 
            isbn={isbn}
            coverId={book.coverId}
            image={book.image}
            size="md"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
          
          {/* Badge Overlay */}
          {badge && (
            <span className="absolute top-3 left-3 z-20 text-[9px] font-bold text-white px-2.5 py-1 rounded-md bg-accent shadow-[0_2px_10px_rgba(181,138,84,0.4)] uppercase tracking-wide">
              {badge}
            </span>
          )}
        </div>

        {/* Metadata */}
        <div className="flex flex-col gap-1 px-0.5 text-left">
          <h3 className="font-bold text-slate-800 text-sm md:text-[15px] leading-snug group-hover:text-accent transition-colors duration-300 line-clamp-2 min-h-[2.5rem]">
            {title}
          </h3>
          <p className="text-xs text-slate-400 font-medium truncate">
            {author}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-3 h-3 ${
                    i < Math.floor(rating) 
                      ? 'fill-amber-400 stroke-amber-400' 
                      : 'stroke-slate-200 fill-transparent'
                  }`} 
                />
              ))}
            </div>
            <span className="text-[10px] font-bold text-slate-500 ml-1">
              {rating} ({Math.floor(rating * 120)})
            </span>
          </div>
        </div>
      </Link>

      {/* Pricing and Quick Add actions */}
      <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between px-0.5">
        <div className="flex items-baseline gap-2">
          <span className="text-[15px] font-extrabold text-slate-950">
            {price === 0 ? 'Free' : `$${price.toFixed(2)}`}
          </span>
          {price > 0 && (
            <span className="text-[11px] text-slate-400 line-through font-medium">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <button 
          onClick={price === 0 ? handleDownload : handleQuickAdd} 
          className={`flex items-center justify-center p-2.5 rounded-xl border transition-all duration-300 ease-out ${
            isAdded
              ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 hover:shadow-[0_5px_15px_-3px_rgba(15,23,42,0.4)] hover:-translate-y-0.5 active:scale-95'
          }`}
          aria-label={price === 0 ? `Download ${title}` : `Add ${title} to cart`}
        >
          {isAdded ? (
            <Check className="w-4 h-4 stroke-[2.5]" />
          ) : price === 0 ? (
            <Download className="w-4 h-4 stroke-[1.8]" />
          ) : (
            <ShoppingCart className="w-4 h-4 stroke-[1.8]" />
          )}
        </button>
      </div>
    </div>
  );
}
