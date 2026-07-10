import React from 'react';
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
  // Dynamically calculate book count per category
  const categoryCounts = ALL_CATEGORIES.reduce((acc, cat) => {
    acc[cat] = booksData.filter((b) => b.category === cat).length;
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Title */}
      <div className="text-left mb-12 border-b border-slate-100 pb-8">
        <span className="text-[9px] font-black uppercase tracking-widest text-accent bg-accent/5 border border-accent/15 px-3 py-1 rounded-full inline-block mb-3.5">
          Specialized Catalog Domains
        </span>
        <h1 className="text-3xl md:text-[38px] font-extrabold tracking-tight text-slate-900 leading-tight">
          Explore Categories
        </h1>
        <p className="text-xs md:text-sm text-slate-500 mt-2 leading-relaxed max-w-2xl font-medium">
          Browse our curated syllabus by technical domains. From low-level exploit development to enterprise cloud infrastructure compliance, we curate manuals for every specialization.
        </p>
      </div>

      {/* Grid of categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {ALL_CATEGORIES.map((catName) => (
          <CategoryCard 
            key={catName} 
            name={catName} 
            count={categoryCounts[catName] || 0} 
          />
        ))}
      </div>
    </div>
  );
}
