import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Shield, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';

export function Navbar() {
  const { cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll detection for minimal shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/books', label: 'Books' },
    { to: '/categories', label: 'Categories' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' }
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-all duration-300 ${
        isScrolled 
          ? 'shadow-[0_2px_15px_-3px_rgba(15,23,42,0.05),0_10px_20px_-15px_rgba(15,23,42,0.03)] border-b border-slate-100 py-3' 
          : 'border-b border-slate-100 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo left */}
        <Link to="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
            <Shield className="w-5 h-5 text-white stroke-[2]" />
          </div>
          <span className="font-extrabold text-xl text-slate-900 tracking-tight">
            Cyber<span className="text-accent">Shelf</span>
          </span>
        </Link>

        {/* Menu center - Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              target="_blank"
              rel="noopener noreferrer"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-slate-900 relative py-1 ${
                  isActive 
                    ? 'text-slate-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-slate-900 after:rounded-full' 
                    : 'text-slate-500'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Action icons right - Desktop */}
        <div className="hidden md:flex items-center gap-5">
          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 xl:w-56 bg-slate-50 border border-slate-200 text-xs rounded-xl pl-9 pr-3 py-2 outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all duration-200"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </form>

          {/* Cart Icon */}
          <Link to="/cart" target="_blank" rel="noopener noreferrer" className="relative p-2 text-slate-600 hover:text-slate-900 transition-colors">
            <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-[9px] font-bold text-white rounded-full flex items-center justify-center animate-fade-in shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Login Button */}
          <Link to="/signin" onClick={() => window.scrollTo(0, 0)}>
            <Button variant="outline" size="sm" icon={<User className="w-3.5 h-3.5" />}>
              Sign In
            </Button>
          </Link>
        </div>

        {/* Mobile menu triggers */}
        <div className="flex md:hidden items-center gap-4">
          <Link to="/cart" target="_blank" rel="noopener noreferrer" className="relative p-2 text-slate-600">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-accent text-[8px] font-bold text-white rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-600 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[65px] bg-slate-950/20 backdrop-blur-sm z-40 animate-fade-in" onClick={() => setIsMobileMenuOpen(false)}>
          <div 
            className="bg-white w-full border-b border-slate-200 px-6 py-6 flex flex-col gap-6 animate-slide-down"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search premium books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </form>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-700 hover:text-slate-900 py-1"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
              <Link to="/signin" onClick={() => setIsMobileMenuOpen(false)}>
                <Button 
                  variant="outline" 
                  size="md" 
                  className="w-full justify-center"
                  icon={<User className="w-4 h-4" />}
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
