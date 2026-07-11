import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import blogPosts from '../data/blog.json';

const CATEGORIES = [
  'All',
  'Cybersecurity Awareness',
  'Antivirus',
  'Windows Security',
  'Malware',
  'Ransomware',
  'Network Security',
  'Privacy',
  'VPN',
  'Threat Intelligence',
  'Product Reviews',
  'Cybersecurity Books'
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') {
      return blogPosts;
    }
    return blogPosts.filter(post => post.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 text-left">
      {/* Title */}
      <div className="mb-12 border-b border-slate-100 pb-10">
        <span className="text-[9px] font-black uppercase tracking-widest text-accent bg-accent/5 border border-accent/15 px-3 py-1 rounded-full inline-block mb-3.5">
          Resources &amp; Intelligence
        </span>
        <h1 className="text-3xl md:text-[42px] font-extrabold tracking-tight text-slate-900 leading-tight">
          CyberShelf Blog
        </h1>
        <p className="text-xs md:text-sm text-slate-500 mt-3 leading-relaxed max-w-2xl font-medium">
          Expert antivirus reviews, cybersecurity awareness guides, and industry best practices. Stay ahead of modern threats.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-10 pb-2">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 border ${
              activeCategory === category
                ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid of Articles */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div key={post.slug} className="bg-white rounded-[24px] border border-slate-100 shadow-card flex flex-col overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group">
              
              {/* Featured Image */}
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-slate-900/10 z-10 group-hover:bg-transparent transition-colors duration-300" />
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-900 shadow-sm">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readingTime} Min Read</span>
                </div>
                
                <Link to={`/blog/${post.slug}`} className="mb-3">
                  <h3 className="text-lg font-extrabold text-slate-900 leading-tight group-hover:text-accent transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
                
                <p className="text-xs text-slate-500 leading-relaxed font-medium line-clamp-3 mb-6 flex-grow">
                  {post.description}
                </p>
                
                <Link to={`/blog/${post.slug}`} className="mt-auto inline-block w-full">
                  <Button variant="outline" size="sm" className="w-full justify-between group-hover:border-slate-300 group-hover:bg-slate-50 text-xs">
                    Read Article <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-accent transition-colors" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-[24px]">
          <span className="text-3xl mb-3">📄</span>
          <h3 className="font-bold text-slate-800 text-base">No articles found</h3>
          <p className="text-xs text-slate-500 max-w-xs mt-1.5">There are currently no published articles in the "{activeCategory}" category.</p>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => setActiveCategory('All')}>
            Clear Filter
          </Button>
        </div>
      )}
    </div>
  );
}
