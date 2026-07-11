import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Lazy load pages for optimized loading and speed performance
const Home = lazy(() => import('./pages/Home'));
const Books = lazy(() => import('./pages/Books'));
const BookDetails = lazy(() => import('./pages/BookDetails'));
const Categories = lazy(() => import('./pages/Categories'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Cart = lazy(() => import('./pages/Cart'));
const LegalDoc = lazy(() => import('./pages/LegalDoc'));
const SignIn = lazy(() => import('./pages/SignIn'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogArticle = lazy(() => import('./pages/BlogArticle'));

// Loading fallback component
function PageLoader() {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-6 h-6 border-2 border-slate-350 border-t-accent rounded-full animate-spin" />
        <span className="text-xs text-slate-400 font-bold uppercase tracking-widest animate-pulse">
          Decrypting Page...
        </span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="flex flex-col min-h-screen bg-white text-slate-700">
          <Navbar />
          
          {/* Main Content Area */}
          <main className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<Books />} />
                <Route path="/book/:id" element={<BookDetails />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/legal/:docKey" element={<LegalDoc />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogArticle />} />
                
                {/* Fallback route */}
                <Route path="*" element={
                  <div className="max-w-7xl mx-auto px-6 py-24 text-center">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">404 - Not Found</h1>
                    <p className="text-sm text-slate-500 mt-2">The security node or page you requested does not exist.</p>
                  </div>
                } />
              </Routes>
            </Suspense>
          </main>

          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
