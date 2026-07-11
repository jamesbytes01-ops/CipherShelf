import React, { useState } from 'react';
import { Search } from 'lucide-react';
import booksData from '../data/books.json';
import { CategoryCard } from '../components/cards/CategoryCard';

const ALL_CATEGORIES = [
  'Ethical Hacking',
  'Cryptography',
  'OSINT',
  'Blue Team',
  'SOC',
  'Red Team',
  'Networking',
  'Linux',
  'Python',
  'Web Security',
  'Cloud Security',
  'Malware Analysis',
  'Digital Forensics'
];

export default function Categories() {
  const [searchTerm, setSearchTerm] = useState('');

  // Dynamically calculate book count per category
  const categoryCounts = ALL_CATEGORIES.reduce((acc, cat) => {
    acc[cat] = booksData.filter((b) => b.category === cat).length;
    return acc;
  }, {});

  const filteredCategories = ALL_CATEGORIES.filter(cat => 
    cat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* ELITE HERO SECTION */}
      <section className="relative pt-24 pb-20 bg-slate-950 overflow-hidden border-b border-slate-900">
        {/* Deep tech grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        
        {/* Soft glowing ambient lights */}
        <div className="absolute top-[-20%] right-[10%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-[-20%] left-[10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-accent bg-accent/10 border border-accent/20 px-4 py-1.5 rounded-full inline-block mb-6 shadow-[0_0_15px_rgba(181,138,84,0.15)]">
            Intelligence Domains
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight max-w-2xl">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-amber-300">Specialization</span>
          </h1>
          <p className="text-sm md:text-base text-slate-400 mt-5 leading-relaxed max-w-2xl font-medium">
            Browse our curated syllabus by technical domains. From low-level exploit development to enterprise cloud infrastructure compliance, we curate manuals for every sector.
          </p>

          {/* Search Filter for Categories */}
          <div className="mt-10 w-full max-w-md relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-indigo-500/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Find a specific domain..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 text-white placeholder-slate-500 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all shadow-xl"
              />
              <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY GRID */}
      <section className="py-16 relative z-20 -mt-8">
        <div className="max-w-7xl mx-auto px-6">
          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCategories.map((catName) => (
                <CategoryCard 
                  key={catName} 
                  name={catName} 
                  count={categoryCounts[catName] || 0} 
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-6 border-2 border-dashed border-slate-200 bg-white rounded-[24px] text-center shadow-sm">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 mb-5 text-slate-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">No domains found</h3>
              <p className="text-xs text-slate-500 max-w-sm mt-2 leading-relaxed">
                We couldn't find a category matching "{searchTerm}". Try a different keyword like "Security" or "Linux".
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
