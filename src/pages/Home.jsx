import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, BookOpen, ShieldCheck, Truck, RotateCcw, 
  Flame, Network, Terminal, Key, Cpu, Search, Star, Sparkles, Mail,
  ChevronRight, TerminalSquare
} from 'lucide-react';
import booksData from '../data/books.json';
import { BookCard } from '../components/cards/BookCard';
import { Button } from '../components/ui/Button';
import { HeroIllustration } from '../components/layout/HeroIllustration';
import { BookCover } from '../utils/svgGenerator';
import promoRealBooksImage from '../assets/promo-real-books.png';

export default function Home() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [promoHovered, setPromoHovered] = useState(false);
  
  // Terminal Easter Egg State
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState([
    { type: 'system', text: 'CipherOS v2.4.1 (tty1)' },
    { type: 'system', text: 'Type "help" to see available commands.' }
  ]);

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim().toLowerCase();
    const newOutput = [...terminalOutput, { type: 'user', text: `visitor@ciphershelf:~$ ${cmd}` }];

    if (cmd === 'sudo get-discount' || cmd === 'cat /etc/discount') {
      newOutput.push({ type: 'success', text: 'Access Granted! Use code ELITE10 at checkout for 10% off.' });
    } else if (cmd === 'help') {
      newOutput.push({ type: 'system', text: 'Commands: help, whoami, clear, sudo get-discount' });
    } else if (cmd === 'whoami') {
      newOutput.push({ type: 'system', text: 'guest_user_992' });
    } else if (cmd === 'clear') {
      setTerminalOutput([]);
      setTerminalInput('');
      return;
    } else {
      newOutput.push({ type: 'error', text: `bash: ${cmd}: command not found` });
    }

    setTerminalOutput(newOutput);
    setTerminalInput('');
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  // Extract featured and best seller books (limit to 5 each like the mockup)
  const featuredBooks = booksData.filter((book) => book.featured).slice(0, 5);


  // Testimonials list
  const testimonials = [
    {
      quote: "CyberShelf has the best collection of cybersecurity books. The quality and delivery are excellent.",
      name: "Rohit Sharma",
      role: "Security Analyst",
      stars: 5,
      avatar: "R"
    },
    {
      quote: "Great prices, original books and fast delivery. My go-to store for all tech books!",
      name: "Sneha Verma",
      role: "Penetration Tester",
      stars: 5,
      avatar: "S"
    },
    {
      quote: "I found books here that were out of stock everywhere else. Highly recommended!",
      name: "Ankit Patel",
      role: "Cybersecurity Student",
      stars: 5,
      avatar: "A"
    }
  ];

  // Category listing shortcuts
  const categories = [
    { name: 'Ethical Hacking', icon: <Flame className="w-5 h-5" />, count: '12+ Books' },
    { name: 'Networking', icon: <Network className="w-5 h-5" />, count: '9+ Books' },
    { name: 'Penetration Testing', icon: <Terminal className="w-5 h-5" />, count: '11+ Books' },
    { name: 'Cryptography', icon: <Key className="w-5 h-5" />, count: '7+ Books' },
    { name: 'Web Security', icon: <Cpu className="w-5 h-5" />, count: '8+ Books' },
    { name: 'Digital Forensics', icon: <Search className="w-5 h-5" />, count: '6+ Books' }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-16 pb-12 bg-white border-b border-slate-50">
        {/* Modern Dot-Matrix Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-45 pointer-events-none z-0" />
        
        {/* Soft Decorative Blurred Spotlights */}
        <div className="absolute top-0 right-1/4 w-[380px] h-[380px] bg-accent/4 rounded-full blur-[90px] pointer-events-none z-0" />
        <div className="absolute bottom-4 left-12 w-[240px] h-[240px] bg-slate-100 rounded-full blur-[60px] pointer-events-none z-0 opacity-40" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Text */}
          <div className="lg:col-span-6 flex flex-col items-start text-left gap-5">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/60 text-[9px] text-accent font-extrabold uppercase tracking-widest">
              Learn. Secure. Grow.
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-[46px] font-extrabold tracking-tight text-slate-900 leading-[1.18] max-w-xl">
              From Beginners to Experts <br />
              We Have the <span className="text-accent">Right Book</span> for Every Security Engineer
            </h1>
            
            <p className="text-sm md:text-base text-slate-500 max-w-lg leading-relaxed font-medium">
              Explore masterclasses on ethical hacking, penetration testing, network security, cryptography, and reverse engineering.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-2">
              <Link to="/books" target="_blank" rel="noopener noreferrer">
                <Button variant="accent" size="lg" className="px-7 py-3">
                  Browse Books
                </Button>
              </Link>
              <Link to="/categories" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="px-7 py-3 bg-white">
                  Explore Categories
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Mug Stack Illustration */}
          <div className="lg:col-span-6 w-full flex justify-center">
            <HeroIllustration />
          </div>
        </div>
      </section>

      {/* 1.5 TRUSTED BY CORPORATE MARQUEE */}
      <section className="py-8 bg-sky-50 border-b border-sky-100 overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-sky-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-sky-50 to-transparent z-10 pointer-events-none" />
        
        <div className="flex items-center gap-12 whitespace-nowrap animate-marquee">
          {/* We duplicate the list twice to create a seamless infinite scrolling effect */}
          {[1, 2].map((set) => (
            <div key={set} className="flex items-center gap-16 text-sky-400/60 font-bold text-xl md:text-2xl tracking-tighter uppercase px-8">
              <span className="hover:text-sky-700 transition-colors duration-300">Google</span>
              <span className="hover:text-sky-700 transition-colors duration-300">Microsoft</span>
              <span className="hover:text-sky-700 transition-colors duration-300">CrowdStrike</span>
              <span className="hover:text-sky-700 transition-colors duration-300">Cloudflare</span>
              <span className="hover:text-sky-700 transition-colors duration-300">Palo Alto</span>
              <span className="hover:text-sky-700 transition-colors duration-300">Okta</span>
              <span className="hover:text-sky-700 transition-colors duration-300">Cisco</span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. HORIZONTAL FEATURES BAR */}
      <section className="py-6 border-y border-slate-100 bg-slate-50/65">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="text-accent p-1 bg-white border border-slate-100 rounded-lg shadow-sm">
                <BookOpen className="w-4 h-4 stroke-[2]" />
              </div>
              <div className="text-left">
                <h4 className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wide">Wide Range</h4>
                <p className="text-[10px] text-slate-400 font-medium">of Books</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="text-accent p-1 bg-white border border-slate-100 rounded-lg shadow-sm">
                <Sparkles className="w-4 h-4 stroke-[2]" />
              </div>
              <div className="text-left">
                <h4 className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wide">Affordable</h4>
                <p className="text-[10px] text-slate-400 font-medium">Prices</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="text-accent p-1 bg-white border border-slate-100 rounded-lg shadow-sm">
                <Truck className="w-4 h-4 stroke-[2]" />
              </div>
              <div className="text-left">
                <h4 className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wide">Fast &amp; Safe</h4>
                <p className="text-[10px] text-slate-400 font-medium">Delivery</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="text-accent p-1 bg-white border border-slate-100 rounded-lg shadow-sm">
                <RotateCcw className="w-4 h-4 stroke-[2]" />
              </div>
              <div className="text-left">
                <h4 className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wide">Easy Returns</h4>
                <p className="text-[10px] text-slate-400 font-medium">Policy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SHOP BY CATEGORY SECTION */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        {/* Premium grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        {/* Soft glowing ambient lights */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-accent/15 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="mb-14 max-w-md mx-auto">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Shop by Category</h2>
            <div className="h-1 w-16 bg-accent mx-auto mt-4 rounded-full" />
            <p className="text-sm text-slate-400 font-medium mt-4 leading-relaxed">
              Find the perfect playbook from our handpicked intelligence categories
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12"
          >
            {categories.map((cat, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Link 
                  to={`/books?category=${encodeURIComponent(cat.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center justify-center p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[24px] shadow-2xl hover:shadow-[0_0_40px_-10px_rgba(181,138,84,0.3)] hover:-translate-y-2 hover:border-accent/40 hover:bg-white/10 transition-all duration-500 ease-out relative overflow-hidden"
                >
                  {/* Hover gradient shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent/0 via-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Icon container */}
                  <div className="w-16 h-16 rounded-2xl border border-white/10 bg-black/40 text-slate-300 flex items-center justify-center mb-5 group-hover:bg-accent/20 group-hover:text-accent group-hover:border-accent/50 transition-all duration-500 shadow-inner">
                    {cat.icon}
                  </div>
                  
                  <h3 className="font-extrabold text-white text-[13px] tracking-tight transition-colors duration-300 leading-tight min-h-[2.5rem] flex items-center text-center">
                    {cat.name}
                  </h3>
                  
                  <span className="text-[10px] text-accent/80 font-bold uppercase tracking-widest mt-2">
                    {cat.count}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <Link to="/categories" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-10 py-4 bg-accent/10 border border-accent/30 text-accent hover:bg-accent hover:text-slate-950 text-[11px] font-extrabold tracking-[0.2em] uppercase rounded-full transition-all duration-500 hover:shadow-[0_0_30px_0px_rgba(181,138,84,0.4)] hover:-translate-y-1">
            Explore All Intelligence
          </Link>
        </div>
      </section>

      {/* 4. FEATURED BOOKS SECTION */}
      <section className="py-16 border-t border-slate-100 bg-slate-50/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 text-left">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Featured Books</h2>
              <p className="text-xs text-slate-500 font-semibold mt-1">
                Best selling and top rated books by our readers
              </p>
            </div>
            <Link to="/books" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-wider">
              View All Books <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5"
          >
            {featuredBooks.map((book) => (
              <motion.div key={book.id} variants={itemVariants}>
                <BookCard book={book} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. PROMOTIONAL DISCOUNT BANNER */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div 
            onMouseEnter={() => setPromoHovered(true)}
            onMouseLeave={() => setPromoHovered(false)}
            className="w-full bg-slate-950 rounded-[28px] overflow-hidden text-left relative grid grid-cols-1 md:grid-cols-12 gap-0 border border-slate-900 hover:border-accent/20 transition-all duration-500 shadow-2xl cursor-pointer"
          >
            {/* Tech grid mesh in banner */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1.2px,transparent_1.2px)] [background-size:20px_20px] opacity-15 pointer-events-none z-0" />

            {/* Left Content */}
            <div className="md:col-span-7 flex flex-col items-start gap-5 z-10 relative py-12 px-8 md:px-14">
              <span className="text-[9px] font-black uppercase tracking-widest text-accent bg-accent/5 border border-accent/15 px-3 py-1 rounded-full">
                Security Operations Deal
              </span>
              
              <h3 className="text-2xl md:text-3xl lg:text-[38px] font-extrabold text-white leading-[1.15] tracking-tight max-w-lg">
                Upgrade Your Library <br />
                Save Up to <span className="text-accent">25% Off</span>
              </h3>
              
              <p className="text-xs md:text-sm text-slate-400 max-w-md leading-relaxed font-medium">
                Equip your operations desk with the industry's most trusted malware guides, red team field manuals, and defensive playbooks. Applied automatically at secure checkout.
              </p>
              
              <Link to="/books" target="_blank" rel="noopener noreferrer" className="mt-2">
                <Button variant="accent" size="md" className="px-7 py-3 font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 hover:scale-[1.02]">
                  Explore Curated Library
                </Button>
              </Link>
            </div>

            {/* Right Graphic: Full-bleed glowing gold security shield and open book */}
            <div className="md:col-span-5 relative min-h-[280px] md:min-h-full w-full h-full overflow-hidden self-stretch z-10">
              {/* Soft gradient transition overlay to blend image into dark left column */}
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950 via-slate-950/20 to-transparent z-20 pointer-events-none" />
              
              <div 
                className="w-full h-full transition-transform duration-700 ease-out"
                style={{
                  transform: promoHovered ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                <img 
                  src={promoRealBooksImage} 
                  alt="Realistic photograph of a stack of cybersecurity books" 
                  className="w-full h-full object-cover md:absolute md:inset-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHAT OUR READERS SAY (TESTIMONIALS) */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-12 max-w-sm mx-auto">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">What Our Readers Say</h2>
            <div className="h-0.5 w-12 bg-accent mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {testimonials.map((test, idx) => (
              <div 
                key={idx} 
                className="p-6 bg-white border border-slate-100 rounded-[20px] shadow-soft flex flex-col justify-between gap-6"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex gap-0.5 text-amber-400">
                    {Array.from({ length: test.stars }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{test.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-50">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                    {test.avatar}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-950">{test.name}</span>
                    <span className="text-[10px] text-slate-400 font-semibold">{test.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE CIPHERSHELF */}
      <section className="py-24 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">The Engineer's Advantage</h2>
            <p className="text-slate-500 mt-4 text-sm leading-relaxed">Why thousands of security professionals, from junior pentesters to CISOs, choose CipherShelf for their continued education.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col gap-5 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-lg mb-2">Curated Selection</h4>
                <p className="text-xs text-slate-500 leading-relaxed">No filler. Every book on our shelf is hand-picked and reviewed by active security researchers.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col gap-5 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-lg mb-2">Instant Digital</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Need it now? Get DRM-free PDF & EPUB versions instantly upon purchase for immediate study.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col gap-5 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-lg mb-2">Secure Shipping</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Physical copies are packed with extreme care and shipped globally with tracking and insurance.</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col gap-5 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-lg mb-2">7-Day Returns</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Not the right book? Return any physical book in original condition within 7 days for a full refund.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 8. NEWSLETTER / STAY UPDATED */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-50 border border-slate-100 rounded-[24px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
            <div className="flex gap-4 items-start max-w-lg">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/50 flex-shrink-0 flex items-center justify-center text-accent shadow-sm">
                <Mail className="w-5.5 h-5.5 stroke-[1.8]" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-extrabold text-slate-900 text-base md:text-lg">Stay Updated</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Get the latest book releases, offers and cybersecurity insights straight to your inbox.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-64 bg-white border border-slate-200 text-xs rounded-xl px-4 py-3 outline-none focus:border-slate-400 transition-colors"
              />
              <Button type="submit" variant="accent" className="py-3 px-6 text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                Subscribe
              </Button>
            </form>
          </div>
          {subscribed && (
            <span className="text-xs text-emerald-600 font-semibold mt-3 block animate-fade-in text-center">
              ✓ Subscribed successfully! Thank you.
            </span>
          )}
        </div>
      </section>
    </div>
  );
}
