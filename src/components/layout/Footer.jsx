import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight, X, AlertTriangle, Scale, ShieldAlert, FileText, Map } from 'lucide-react';
import { Button } from '../ui/Button';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);


  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const categories = [
    'Ethical Hacking',
    'Web Security',
    'Blue Team',
    'Red Team',
    'Cloud Security',
    'Cryptography'
  ];

  return (
    <footer className="bg-[#0E243F] border-t-2 border-transparent [border-image:linear-gradient(to_right,transparent,#B58A54,transparent)_1] text-slate-400 mt-auto relative">
      {/* Soft ambient glow on top of footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent shadow-[0_0_20px_rgba(181,138,84,0.5)]"></div>
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-12">
        {/* Brand info */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          <Link to="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <Shield className="w-4.5 h-4.5 text-white stroke-[2]" />
            </div>
            <span className="font-extrabold text-lg text-white tracking-tight">
              Cyber<span className="text-accent">Shelf</span>
            </span>
          </Link>
          <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
            The world's premier digital bookshelf for security engineers, research analysts, malware developers, and cryptography experts.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition-colors text-slate-400" aria-label="YouTube">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
                <polygon points="10 15 15 12 10 9" />
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition-colors text-slate-400" aria-label="Instagram">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition-colors text-slate-400" aria-label="X">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-white text-sm tracking-wide uppercase">Company</h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <Link to="/about" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">About Us</Link>
            </li>
            <li>
              <Link to="/contact" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Contact</Link>
            </li>
            <li>
              <Link to="/legal/careers" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Careers</Link>
            </li>
            <li>
              <Link to="/legal/press" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Press Room</Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-white text-sm tracking-wide uppercase">Core Topics</h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {categories.map((cat) => (
              <li key={cat}>
                <Link to={`/books?category=${encodeURIComponent(cat)}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal links */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-white text-sm tracking-wide uppercase">Legal</h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <Link to="/legal/terms" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Terms of Service</Link>
            </li>
            <li>
              <Link to="/legal/eula" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">End User License Agreement (EULA)</Link>
            </li>
            <li>
              <Link to="/legal/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/legal/cookies" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Cookies Policy</Link>
            </li>
            <li>
              <Link to="/legal/returns" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Return Policy</Link>
            </li>
            <li>
              <Link to="/legal/security" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Security Disclosures</Link>
            </li>
            <li>
              <Link to="/legal/licenses" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Licenses &amp; Patents</Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-white text-sm tracking-wide uppercase">Newsletter</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Get curated security readings, fresh releases, and exclusive discounts direct to your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2 mt-1">
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 rounded-xl pl-3 pr-10 py-2.5 outline-none focus:bg-white/10 focus:border-white/20 transition-all duration-200"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            {subscribed && (
              <span className="text-[10px] text-accent font-medium animate-fade-in">
                Thank you! You are subscribed.
              </span>
            )}
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/10 py-8 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-6 text-sm text-slate-300">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Links */}
            <div className="flex gap-6 w-full md:w-1/3 justify-center md:justify-start order-2 md:order-1 font-medium">
              <Link to="/legal/terms" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Terms</Link>
              <Link to="/legal/sitemap" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Sitemap</Link>
              <Link to="/legal/security" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Security</Link>
            </div>
            
            {/* Copyright */}
            <div className="w-full md:w-1/3 text-center order-1 md:order-2 text-slate-200 font-semibold tracking-wide">
              &copy; {new Date().getFullYear()} CyberShelf. All rights reserved.
            </div>

            <div className="w-full md:w-1/3 order-3 hidden md:block"></div>
          </div>

          {/* Disclaimer */}
          <div className="text-xs text-slate-400 text-center max-w-4xl mx-auto leading-relaxed">
            CyberShelf is an independent online bookstore and educational platform. We are not affiliated with, endorsed by, sponsored by, or officially connected with Microsoft, McAfee, Webroot, Norton, Bitdefender, Kaspersky, Cisco, Palo Alto Networks, CrowdStrike, Cloudflare, Google, or any other third-party organization. All trademarks, logos, product names, and company names belong to their respective owners.
          </div>
        </div>
      </div>
    </footer>
  );
}
