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
const FAQ = lazy(() => import('./pages/FAQ'));

// Admin Pages
const AdminLayout = lazy(() => import('./admin/layout/AdminLayout').then(m => ({ default: m.AdminLayout })));
const Dashboard = lazy(() => import('./admin/pages/Dashboard').then(m => ({ default: m.Dashboard })));
const BooksManagement = lazy(() => import('./admin/pages/Books').then(m => ({ default: m.BooksManagement })));

// Storefront Wrapper
function StorefrontLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-700">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}

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
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Admin Routes (No storefront Navbar/Footer) */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="books" element={<BooksManagement />} />
              <Route path="categories" element={<div className="p-8">Categories (Coming Soon)</div>} />
              <Route path="blog" element={<div className="p-8">Blog CMS (Coming Soon)</div>} />
              <Route path="pages" element={<div className="p-8">Pages (Coming Soon)</div>} />
              <Route path="builder" element={<div className="p-8">Homepage Builder (Coming Soon)</div>} />
              <Route path="orders" element={<div className="p-8">Orders (Coming Soon)</div>} />
              <Route path="customers" element={<div className="p-8">Customers (Coming Soon)</div>} />
              <Route path="analytics" element={<div className="p-8">Analytics (Coming Soon)</div>} />
              <Route path="settings" element={<div className="p-8">Settings (Coming Soon)</div>} />
            </Route>

            {/* Storefront Routes */}
            <Route path="*" element={
              <StorefrontLayout>
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
                  <Route path="/resources/faq" element={<FAQ />} />
                  <Route path="*" element={
                    <div className="max-w-7xl mx-auto px-6 py-24 text-center">
                      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">404 - Not Found</h1>
                      <p className="text-sm text-slate-500 mt-2">The security node or page you requested does not exist.</p>
                    </div>
                  } />
                </Routes>
              </StorefrontLayout>
            } />
          </Routes>
        </Suspense>
      </CartProvider>
    </BrowserRouter>
  );
}
