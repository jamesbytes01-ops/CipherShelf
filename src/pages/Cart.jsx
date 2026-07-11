import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus, CreditCard, ChevronRight, X, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BookCover } from '../utils/svgGenerator';
import { Button } from '../components/ui/Button';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartSubtotal, cartTotal } = useCart();
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('form'); // 'form' | 'success'
  
  // Checkout form state
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !address || !cardNumber || !expiry || !cvv) return;

    setIsProcessing(true);
    // Simulate transaction processing
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutStep('success');
      clearCart();
    }, 2000);
  };

  if (cartItems.length === 0 && checkoutStep !== 'success') {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center flex flex-col items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
          <ShoppingBag className="w-7 h-7 stroke-[1.5]" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-slate-900">Your Shelf is Empty</h2>
          <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
            You haven't added any cybersecurity literature to your shelf yet. Start exploring our collections.
          </p>
        </div>
        <Link to="/books" >
          <Button variant="accent" size="md">
            Browse Books
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 text-left">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-10">
        Shopping Shelf
      </h1>

      {/* Cart Page Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="border border-slate-100 rounded-[20px] overflow-hidden bg-white shadow-card">
            {/* Header titles */}
            <div className="hidden sm:grid grid-cols-12 gap-4 bg-slate-50/70 py-4 px-6 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span className="col-span-6">Product Details</span>
              <span className="col-span-3 text-center">Quantity</span>
              <span className="col-span-3 text-right">Price</span>
            </div>

            {/* List */}
            <div className="divide-y divide-slate-100">
              {cartItems.map((item) => (
                <div key={item.id} className="p-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  {/* Book Info Column */}
                  <div className="col-span-1 sm:col-span-6 flex gap-4 items-center">
                    {/* Tiny Cover Preview */}
                    <div className="w-14 h-20 flex-shrink-0">
                      <BookCover 
                        title={item.title} 
                        author={item.author} 
                        category={item.category} 
                        coverColor={item.coverColor} 
                        size="sm"
                        className="w-full h-full"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-1 text-left">
                      <span className="text-[9px] uppercase font-bold tracking-widest text-accent">
                        {item.category}
                      </span>
                      <Link to={`/book/${item.id}`} className="font-bold text-slate-800 hover:text-accent transition-colors text-sm leading-tight line-clamp-1">
                        {item.title}
                      </Link>
                      <span className="text-xs text-slate-400 truncate">{item.author}</span>
                    </div>
                  </div>

                  {/* Quantity Actions Column */}
                  <div className="col-span-1 sm:col-span-3 flex items-center justify-center gap-2">
                    <div className="flex items-center border border-slate-200 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 text-slate-400 hover:text-slate-800 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-slate-800 w-8 text-center select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 text-slate-400 hover:text-slate-800 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-50 transition-colors ml-2"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4 stroke-[1.8]" />
                    </button>
                  </div>

                  {/* Pricing Column */}
                  <div className="col-span-1 sm:col-span-3 text-right flex sm:flex-col justify-between items-center sm:items-end">
                    <span className="text-xs text-slate-400 sm:hidden">Price:</span>
                    <span className="font-extrabold text-slate-900 text-sm">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart actions row */}
          <div className="flex justify-between items-center">
            <Link to="/books" className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors">
              &larr; Continue Shopping
            </Link>
            <button
              onClick={clearCart}
              className="text-xs font-semibold text-slate-400 hover:text-slate-800 flex items-center gap-1.5 transition-colors"
            >
              Clear Shelf
            </button>
          </div>
        </div>

        {/* Right Column: Pricing Summary Card */}
        <div className="lg:col-span-4 flex flex-col gap-6 bg-slate-50 border border-slate-100 p-6 rounded-[20px]">
          <h2 className="font-bold text-slate-900 text-sm tracking-wide uppercase pb-3 border-b border-slate-200">
            Pricing Summary
          </h2>

          <div className="flex flex-col gap-4 text-xs font-medium text-slate-500 border-b border-slate-200 pb-4">
            <div className="flex justify-between">
              <span>Shelf Subtotal</span>
              <span className="text-slate-900 font-semibold">${cartSubtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Secure Shipping</span>
              <span className="text-emerald-600 font-semibold uppercase tracking-wide text-[10px]">Free Delivery</span>
            </div>
            <div className="flex justify-between">
              <span>Security Audited Packaging</span>
              <span className="text-slate-900 font-semibold">$0.00</span>
            </div>
          </div>

          <div className="flex justify-between items-end">
            <span className="text-xs font-bold text-slate-900 uppercase">Estimated Total</span>
            <span className="text-2xl font-extrabold text-slate-950">${cartTotal.toFixed(2)}</span>
          </div>

          <Button
            variant="accent"
            size="lg"
            className="w-full justify-center mt-2 shadow-md hover:shadow-lg"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
            onClick={() => {
              setCheckoutStep('form');
              setCheckoutModalOpen(true);
            }}
          >
            Checkout Securely
          </Button>

          <div className="text-[10px] text-slate-400 text-center leading-relaxed">
            Locked transactions with 256-bit encryption. <br />
            Compliant with PCI-DSS network security standards.
          </div>
        </div>
      </div>

      {/* CHECKOUT SIMULATION DIALOG OVERLAY */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-[24px] border border-slate-200 w-full max-w-lg overflow-hidden shadow-2xl animate-scale-up text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 bg-slate-50 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-accent stroke-[1.8]" />
                <h3 className="font-extrabold text-slate-900 text-base">
                  {checkoutStep === 'form' ? 'Secure Checkout Node' : 'Transaction Log'}
                </h3>
              </div>
              <button 
                onClick={() => setCheckoutModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {checkoutStep === 'form' ? (
                <form onSubmit={handleCheckoutSubmit} className="flex flex-col gap-4">
                  {/* Total indicator */}
                  <div className="flex justify-between items-center bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-xs text-slate-600 font-semibold mb-2">
                    <span>Due Amount</span>
                    <span className="text-base font-extrabold text-slate-950">${cartTotal.toFixed(2)}</span>
                  </div>

                  {/* Shipping name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:bg-white focus:border-slate-400 transition-colors"
                    />
                  </div>

                  {/* Delivery Address */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Shipping Address</label>
                    <input
                      type="text"
                      required
                      placeholder="100 Security Blvd, San Francisco, CA"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:bg-white focus:border-slate-400 transition-colors"
                    />
                  </div>

                  {/* Card Number */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Card Number</label>
                    <input
                      type="text"
                      required
                      placeholder="•••• •••• •••• ••••"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:bg-white focus:border-slate-400 transition-colors font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Expiration date */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Expiry Date</label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        maxLength={5}
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:bg-white focus:border-slate-400 transition-colors font-mono"
                      />
                    </div>

                    {/* CVV */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">CVV Code</label>
                      <input
                        type="password"
                        required
                        placeholder="•••"
                        maxLength={3}
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:bg-white focus:border-slate-400 transition-colors font-mono"
                      />
                    </div>
                  </div>

                  {/* Submit checkout */}
                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    disabled={isProcessing}
                    className="w-full justify-center mt-3 shadow-md"
                  >
                    {isProcessing ? 'Processing Hash...' : `Authorize payment of $${cartTotal.toFixed(2)}`}
                  </Button>
                </form>
              ) : (
                // Success screen
                <div className="flex flex-col items-center gap-5 text-center py-6">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center animate-scale-up">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h4 className="font-extrabold text-slate-900 text-lg">Purchase Order Complete</h4>
                    <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                      Thank you for choosing CyberShelf, <span className="font-semibold text-slate-800">{fullName}</span>. Your billing transaction was approved under Ledger ID:
                    </p>
                    <code className="text-xs bg-slate-50 text-slate-800 px-3 py-1.5 rounded-lg border border-slate-100 font-mono mt-1 select-all select-none">
                      TX-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                    </code>
                  </div>
                  <p className="text-[11px] text-slate-400 max-w-xs mt-1.5 leading-relaxed">
                    We sent a secure invoice receipt and dispatch tracking codes directly to your provided billing node.
                  </p>
                  <Button 
                    variant="primary" 
                    size="md" 
                    className="w-full mt-4"
                    onClick={() => setCheckoutModalOpen(false)}
                  >
                    Return to Shop
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
