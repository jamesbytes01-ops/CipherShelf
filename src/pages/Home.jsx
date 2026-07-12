import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, BookOpen, ShieldCheck, Truck, RotateCcw, 
  Flame, Network, Terminal, Key, Cpu, Search, Star, Sparkles, Mail,
  ChevronRight, TerminalSquare, Zap, Lock
} from 'lucide-react';
const bookModules = import.meta.glob('../data/books/*.json', { eager: true });
const booksData = Object.values(bookModules).map(mod => mod.default || mod);
import { BookCard } from '../components/cards/BookCard';
import { Button } from '../components/ui/Button';
import { HeroIllustration } from '../components/layout/HeroIllustration';
import { BookCover } from '../utils/svgGenerator';
import promoRealBooksImage from '../assets/promo-real-books.png';
import heroDarkBg from '../assets/hero-bookshelf-even.png';

export default function Home() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [promoHovered, setPromoHovered] = useState(false);
  
  const [activeTestimonial, setActiveTestimonial] = useState(0);
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


  // Testimonials list (12 items for 4 slides)
  const testimonials = [
    {
      quote: "CyberShelf has the best collection of cybersecurity books. The quality and delivery are excellent.",
      name: "Rohit Sharma",
      role: "Security Analyst",
      stars: 5,
      avatar: "https://i.pravatar.cc/150?u=rohit"
    },
    {
      quote: "Great prices, original books and fast delivery. My go-to store for all tech books!",
      name: "Sneha Verma",
      role: "Penetration Tester",
      stars: 5,
      avatar: "https://i.pravatar.cc/150?u=sneha"
    },
    {
      quote: "I found books here that were out of stock everywhere else. Highly recommended!",
      name: "Ankit Patel",
      role: "Cybersecurity Student",
      stars: 5,
      avatar: "https://i.pravatar.cc/150?u=ankit"
    },
    {
      quote: "An essential resource for any blue teamer. The defensive playbooks are top notch.",
      name: "David K.",
      role: "Security Engineer",
      stars: 5,
      avatar: "https://i.pravatar.cc/150?u=david"
    },
    {
      quote: "I passed my OSCP thanks to the materials I found here. Highly recommend!",
      name: "Sarah L.",
      role: "Penetration Tester",
      stars: 5,
      avatar: "https://i.pravatar.cc/150?u=sarah"
    },
    {
      quote: "The quality of these books is unmatched. Fast shipping and great customer service.",
      name: "Michael T.",
      role: "CISO",
      stars: 5,
      avatar: "https://i.pravatar.cc/150?u=michael"
    },
    {
      quote: "CipherShelf is my secret weapon for staying ahead of the latest threats.",
      name: "Elena R.",
      role: "Threat Hunter",
      stars: 5,
      avatar: "https://i.pravatar.cc/150?u=elena"
    },
    {
      quote: "Finally, a bookstore that understands what security professionals actually need.",
      name: "James B.",
      role: "Red Team Lead",
      stars: 5,
      avatar: "https://i.pravatar.cc/150?u=james"
    },
    {
      quote: "The curated bundles save me so much time when onboarding new analysts.",
      name: "Amanda W.",
      role: "SOC Manager",
      stars: 5,
      avatar: "https://i.pravatar.cc/150?u=amanda"
    },
    {
      quote: "Unbelievable depth of knowledge. The malware analysis books are incredibly detailed.",
      name: "Robert C.",
      role: "Reverse Engineer",
      stars: 5,
      avatar: "https://i.pravatar.cc/150?u=robert"
    },
    {
      quote: "I buy all my certification study guides here. Always up-to-date editions.",
      name: "Kevin M.",
      role: "Cyber Student",
      stars: 5,
      avatar: "https://i.pravatar.cc/150?u=kevin"
    },
    {
      quote: "A treasure trove for anyone serious about cryptography and low-level security.",
      name: "Dr. Lisa H.",
      role: "Crypto Researcher",
      stars: 5,
      avatar: "https://i.pravatar.cc/150?u=lisa"
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
      <section 
        className="relative overflow-hidden border-b border-slate-900 min-h-[calc(100vh-80px)] flex items-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.7) 100%), url(${heroDarkBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="w-full max-w-[92%] xl:max-w-[1600px] mx-auto px-4 md:px-8 relative z-10 flex justify-center">
          <div className="flex flex-col items-center text-center gap-7 max-w-5xl">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-sm">
              <div className="flex gap-0.5 text-amber-500">
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
              <span className="text-[10px] text-white font-bold uppercase tracking-wider">
                Excellent 4.9/5 from <span className="text-slate-300">2,000+ Engineers</span>
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-[54px] font-display font-medium text-white leading-[1.15] w-full">
              From Beginners to Experts We Have the <span className="text-accent font-semibold">Right Book</span> for Every Security Engineer
            </h1>
            
            <p className="text-sm md:text-lg text-slate-300 max-w-3xl leading-relaxed font-medium">
              Explore masterclasses on ethical hacking, penetration testing, network security, cryptography, and reverse engineering.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
              <Link to="/books" className="relative group inline-block">
                {/* Glowing border/pulse effect behind CTA */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-amber-300 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-500 animate-pulse"></div>
                <Button variant="accent" size="lg" className="relative px-8 py-3.5 text-sm uppercase tracking-widest font-extrabold shadow-xl text-slate-900 border-none">
                  Browse Books <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/categories" >
                <Button variant="outline" size="lg" className="px-7 py-3 bg-white/5 text-white border-white/20 hover:bg-white/10 hover:text-white backdrop-blur-md">
                  Explore Categories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 1.5 TRUSTED BY CORPORATE MARQUEE */}
      <section className="py-8 bg-[#03132B] border-b border-white/5 overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#03132B] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#03132B] to-transparent z-10 pointer-events-none" />
        
        <div className="flex items-center gap-12 whitespace-nowrap animate-marquee">
          {/* We duplicate the list twice to create a seamless infinite scrolling effect */}
          {[1, 2].map((set) => (
            <div key={set} className="flex items-center gap-16 text-slate-400/60 font-bold text-xl md:text-2xl tracking-tighter uppercase px-8">
              <span className="hover:text-white transition-colors duration-300">Fortune 500 Tech</span>
              <span className="hover:text-white transition-colors duration-300">Global Banks</span>
              <span className="hover:text-white transition-colors duration-300">Gov Agencies</span>
              <span className="hover:text-white transition-colors duration-300">Defense Contractors</span>
              <span className="hover:text-white transition-colors duration-300">Top Universities</span>
              <span className="hover:text-white transition-colors duration-300">10K+ Engineers</span>
              <span className="hover:text-white transition-colors duration-300">Enterprise SOCs</span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. SLEEK HORIZONTAL TRUST BAR */}
      <section className="py-6 border-b border-slate-200 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            
            {/* Item 1 */}
            <div className="flex items-center gap-4 w-full md:w-1/4 md:justify-center pt-4 md:pt-0 first:pt-0">
              <div className="w-10 h-10 rounded-xl border border-accent/40 flex items-center justify-center text-accent bg-white shadow-sm flex-shrink-0">
                <BookOpen className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-extrabold text-slate-900 tracking-wide uppercase">Wide Range</span>
                <span className="text-[11px] font-medium text-slate-500">of Books</span>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-center gap-4 w-full md:w-1/4 md:justify-center pt-4 md:pt-0 md:pl-4">
              <div className="w-10 h-10 rounded-xl border border-accent/40 flex items-center justify-center text-accent bg-white shadow-sm flex-shrink-0">
                <Sparkles className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-extrabold text-slate-900 tracking-wide uppercase">Affordable</span>
                <span className="text-[11px] font-medium text-slate-500">Prices</span>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-center gap-4 w-full md:w-1/4 md:justify-center pt-4 md:pt-0 md:pl-4">
              <div className="w-10 h-10 rounded-xl border border-accent/40 flex items-center justify-center text-accent bg-white shadow-sm flex-shrink-0">
                <Truck className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-extrabold text-slate-900 tracking-wide uppercase">Fast & Safe</span>
                <span className="text-[11px] font-medium text-slate-500">Delivery</span>
              </div>
            </div>

            {/* Item 4 */}
            <div className="flex items-center gap-4 w-full md:w-1/4 md:justify-center pt-4 md:pt-0 md:pl-4">
              <div className="w-10 h-10 rounded-xl border border-accent/40 flex items-center justify-center text-accent bg-white shadow-sm flex-shrink-0">
                <RotateCcw className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-extrabold text-slate-900 tracking-wide uppercase">Easy Returns</span>
                <span className="text-[11px] font-medium text-slate-500">Policy</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2.5. THE ENGINEER'S ADVANTAGE */}
      {/* 2.5. THE ENGINEER'S ADVANTAGE */}
      <section className="pt-12 pb-16 bg-slate-50 relative">
        <div className="w-full max-w-[92%] xl:max-w-[1500px] mx-auto px-4 md:px-8">
          
          {/* HEADING */}
          <div className="flex flex-col items-center text-center max-w-[650px] mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-display font-semibold text-slate-900 tracking-tight mb-2">
              The Engineer's Advantage
            </h2>
            <p className="text-[14px] md:text-[15px] text-slate-500 font-normal leading-relaxed">
              Why thousands of security professionals choose CipherShelf for their continued education.
            </p>
          </div>

          {/* FEATURE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-6 items-stretch">
            
            {/* CARD 1 */}
            <div className="group bg-white rounded-2xl p-6 xl:p-8 ring-1 ring-slate-200/50 shadow-[0_2px_12px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgb(0,0,0,0.06)] hover:ring-slate-200 transition-all duration-300 flex items-start gap-4 xl:gap-5">
              <div className="flex-shrink-0 w-12 h-12 xl:w-14 xl:h-14 rounded-[14px] bg-indigo-50/80 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 mt-0.5">
                <ShieldCheck className="w-6 h-6 xl:w-[26px] xl:h-[26px]" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <h3 className="text-[15px] xl:text-[17px] font-semibold text-slate-900 mb-1.5 tracking-tight">
                  Curated Library
                </h3>
                <p className="text-[13px] xl:text-[14.5px] text-slate-500 leading-relaxed pr-1">
                  Premium cybersecurity literature hand-picked by active industry experts.
                </p>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="group bg-white rounded-2xl p-6 xl:p-8 ring-1 ring-slate-200/50 shadow-[0_2px_12px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgb(0,0,0,0.06)] hover:ring-slate-200 transition-all duration-300 flex items-start gap-4 xl:gap-5">
              <div className="flex-shrink-0 w-12 h-12 xl:w-14 xl:h-14 rounded-[14px] bg-emerald-50/80 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 mt-0.5">
                <Zap className="w-6 h-6 xl:w-[26px] xl:h-[26px]" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <h3 className="text-[15px] xl:text-[17px] font-semibold text-slate-900 mb-1.5 tracking-tight">
                  Instant Formats
                </h3>
                <p className="text-[13px] xl:text-[14.5px] text-slate-500 leading-relaxed pr-1">
                  Immediate DRM-free PDF and EPUB downloads straight to your device.
                </p>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="group bg-white rounded-2xl p-6 xl:p-8 ring-1 ring-slate-200/50 shadow-[0_2px_12px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgb(0,0,0,0.06)] hover:ring-slate-200 transition-all duration-300 flex items-start gap-4 xl:gap-5">
              <div className="flex-shrink-0 w-12 h-12 xl:w-14 xl:h-14 rounded-[14px] bg-blue-50/80 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 mt-0.5">
                <Lock className="w-6 h-6 xl:w-[26px] xl:h-[26px]" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <h3 className="text-[15px] xl:text-[17px] font-semibold text-slate-900 mb-1.5 tracking-tight">
                  Global Shipping
                </h3>
                <p className="text-[13px] xl:text-[14.5px] text-slate-500 leading-relaxed pr-1">
                  Fast, fully tracked worldwide delivery for all physical hardcovers.
                </p>
              </div>
            </div>

            {/* CARD 4 */}
            <div className="group bg-white rounded-2xl p-6 xl:p-8 ring-1 ring-slate-200/50 shadow-[0_2px_12px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgb(0,0,0,0.06)] hover:ring-slate-200 transition-all duration-300 flex items-start gap-4 xl:gap-5">
              <div className="flex-shrink-0 w-12 h-12 xl:w-14 xl:h-14 rounded-[14px] bg-orange-50/80 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300 mt-0.5">
                <RotateCcw className="w-6 h-6 xl:w-[26px] xl:h-[26px]" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <h3 className="text-[15px] xl:text-[17px] font-semibold text-slate-900 mb-1.5 tracking-tight">
                  Risk-Free Returns
                </h3>
                <p className="text-[13px] xl:text-[14.5px] text-slate-500 leading-relaxed pr-1">
                  Not satisfied? Return any physical book within <span className="font-semibold text-orange-600">7 days</span> for a full refund.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* 3. SHOP BY CATEGORY SECTION */}
      <section className="py-24 bg-[#FAFAFA] relative border-b border-slate-200">
        <div className="w-full max-w-[95%] xl:max-w-[1600px] mx-auto px-4 md:px-8">
          
          <div className="flex flex-col lg:flex-row gap-16 xl:gap-24 items-start">
            
            {/* LEFT COLUMN: EDITORIAL HEADER */}
            <div className="w-full lg:w-[40%] flex flex-col items-start text-left lg:sticky lg:top-32">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/50 text-indigo-700 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                Domains of Expertise
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-slate-900 tracking-tighter mb-6 leading-[1.05]">
                Master Every Attack Surface.
              </h2>
              <p className="text-lg md:text-xl text-slate-500 leading-relaxed mb-10">
                We don't just sell books. We curate specialized playbooks for modern security teams. From low-level cryptography to advanced red-teaming, find the exact knowledge you need to stay ahead of zero-days.
              </p>
              <Link 
                to="/categories" 
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg text-slate-900 bg-gradient-to-r from-[#F5D372] to-[#E2A62B] hover:from-[#F0C95C] hover:to-[#D4981C] hover:shadow-[0_8px_20px_rgba(226,166,43,0.3)] transition-all duration-300 group"
              >
                Explore All Categories 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* RIGHT COLUMN: PREMIUM GRID */}
            <div className="w-full lg:w-[60%] grid grid-cols-1 md:grid-cols-2 gap-5 xl:gap-6">
              {categories.map((cat, idx) => (
                <motion.div key={idx} variants={itemVariants}>
                  <Link 
                    to={`/books?category=${encodeURIComponent(cat.name)}`} 
                    className="group relative flex flex-col items-start p-8 xl:p-10 bg-white rounded-3xl border border-slate-200/60 overflow-hidden hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] hover:border-slate-300 transition-all duration-500 hover:-translate-y-1"
                  >
                    {/* Glowing Background Orb on Hover */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                    
                    <div className="relative z-10 w-full">
                      <div className="w-14 h-14 rounded-[16px] bg-gradient-to-br from-blue-500 to-emerald-400 flex items-center justify-center text-white mb-10 group-hover:scale-110 group-hover:shadow-[0_8px_20px_rgba(59,130,246,0.3)] transition-all duration-500">
                        {cat.icon}
                      </div>
                      
                      <div className="flex flex-col">
                        <h3 className="text-[22px] font-bold text-slate-900 tracking-tight mb-2 group-hover:text-blue-600 transition-colors duration-300">
                          {cat.name}
                        </h3>
                        <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
                          {cat.count} resources
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 4. FEATURED BOOKS SECTION */}
      <section className="py-24 border-t border-slate-200 bg-white overflow-hidden flex flex-col">
        <div className="w-full max-w-[95%] xl:max-w-[1600px] mx-auto px-4 md:px-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
              <Star className="w-3.5 h-3.5 text-amber-500" />
              Top Rated
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tighter mb-4">
              Featured Releases
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              The most critical new playbooks and best-sellers, trusted by thousands of security teams globally.
            </p>
          </div>
          <div className="flex items-center gap-4 hidden sm:flex">
            <Link to="/books" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200 text-slate-700 font-semibold hover:border-slate-300 hover:bg-slate-50 transition-all">
              View Entire Library
            </Link>
          </div>
        </div>

        <div className="w-full max-w-[95%] xl:max-w-[1600px] mx-auto px-4 md:px-8">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {featuredBooks.map((book) => (
              <motion.div 
                key={book.id} 
                variants={itemVariants}
                className="w-[85vw] sm:w-[340px] md:w-[320px] lg:w-[300px] xl:w-[320px] flex-shrink-0 snap-start"
              >
                <BookCard book={book} />
              </motion.div>
            ))}
            
            {/* View All Card */}
            <motion.div variants={itemVariants} className="w-[200px] flex-shrink-0 snap-start flex items-center justify-center p-6">
              <Link to="/books" className="group flex flex-col items-center gap-4 text-slate-400 hover:text-indigo-600 transition-colors">
                <div className="w-20 h-20 rounded-full bg-slate-50 border-2 border-dashed border-slate-200 group-hover:border-indigo-200 group-hover:bg-indigo-50 flex items-center justify-center transition-all duration-300">
                  <ArrowRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
                </div>
                <span className="font-bold uppercase tracking-widest text-sm">See All Books</span>
              </Link>
            </motion.div>
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
              
              <h3 className="text-2xl md:text-3xl lg:text-[38px] font-display font-extrabold text-white leading-[1.15] tracking-tight max-w-lg">
                Upgrade Your Library <br />
                Save Up to <span className="text-accent">25% Off</span>
              </h3>
              
              <p className="text-xs md:text-sm text-slate-400 max-w-md leading-relaxed font-medium">
                Equip your operations desk with the industry's most trusted malware guides, red team field manuals, and defensive playbooks. Applied automatically at secure checkout.
              </p>
              
              <Link to="/books" className="mt-2">
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
      <section className="py-24 bg-white border-t border-slate-100 overflow-hidden flex flex-col">
        <div className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 md:px-8 mb-12 flex flex-col md:flex-row items-center text-center md:text-left justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tighter mb-4">
              Trusted by the best.
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              Security professionals rely on CipherShelf for their critical knowledge.
            </p>
          </div>
          
          {/* Dots Navigation */}
          <div className="flex gap-2">
            {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonial(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${activeTestimonial === idx ? 'bg-indigo-600 w-8' : 'bg-slate-200 hover:bg-slate-300'}`}
                aria-label={`Go to testimonial slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, slideIndex) => (
                <div key={slideIndex} className="min-w-full w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
                  {testimonials.slice(slideIndex * 3, slideIndex * 3 + 3).map((test, idx) => (
                    <div key={idx} className="bg-[#FAFAFA] border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 rounded-[28px] p-8 md:p-10 flex flex-col justify-between h-full">
                      <div className="flex gap-1 text-[#E2A62B] mb-8">
                        {Array.from({ length: test.stars }).map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-current" />
                        ))}
                      </div>
                      <h3 className="text-lg md:text-xl font-medium text-slate-900 leading-[1.6] tracking-tight mb-12">
                        "{test.quote}"
                      </h3>
                      <div className="flex items-center gap-4 mt-auto">
                        <img src={test.avatar} alt={test.name} className="w-12 h-12 rounded-full border border-slate-200" />
                        <div className="text-left">
                          <div className="font-bold text-slate-900">{test.name}</div>
                          <div className="text-xs font-bold text-indigo-600 uppercase tracking-widest mt-1">{test.role}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. NEWSLETTER / STAY UPDATED */}
      <section className="pt-16 bg-white flex flex-col items-center">
        <div className="w-full max-w-7xl px-6">
          <div className="bg-[#091224] rounded-t-[32px] p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 text-left shadow-[0_-10px_40px_rgba(0,0,0,0.05)] relative overflow-hidden">
            {/* Ambient inner glow for the card */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            
            <div className="flex gap-5 items-start max-w-lg relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex-shrink-0 flex items-center justify-center text-white shadow-sm backdrop-blur-sm">
                <Mail className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-extrabold text-white text-xl md:text-2xl">Stay Updated</h3>
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  Get the latest book releases, offers and cybersecurity insights straight to your inbox.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-3 relative z-10">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-72 bg-[#091224]/50 border border-white/10 text-sm text-white placeholder-slate-500 rounded-xl px-5 py-4 outline-none focus:border-white/30 transition-colors"
              />
              <Button type="submit" variant="accent" className="py-4 px-8 text-sm font-bold uppercase tracking-wider whitespace-nowrap bg-indigo-600 hover:bg-indigo-500 text-white border-none shadow-lg shadow-indigo-600/20">
                Subscribe
              </Button>
            </form>
          </div>
          {subscribed && (
            <span className="text-sm text-emerald-400 font-semibold mt-4 block animate-fade-in text-center pb-4 relative z-10">
              ✓ Subscribed successfully! Thank you.
            </span>
          )}
        </div>
      </section>
    </div>
  );
}
