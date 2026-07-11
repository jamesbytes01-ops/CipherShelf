import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Star } from 'lucide-react';
import { BookCover } from '../../utils/svgGenerator';
import _booksRaw from '../../data/books.json';
const books = Array.isArray(_booksRaw) ? _booksRaw : (_booksRaw.books || []);
import heroWorkspaceImg from '../../assets/hero-workspace.png';

const heroBooks = [
  books.find(b => b.id === 'black-hat-python') || books[0],
  books.find(b => b.id === 'linux-basics-for-hackers') || books[1],
  books.find(b => b.id === 'applied-cryptography') || books[3],
  books.find(b => b.id === 'practical-malware-analysis') || books[2]
];

export function HeroIllustration() {
  return (
    <div className="w-full h-full min-h-[500px] flex items-center justify-center relative perspective-[1000px]">
      
      {/* Workspace Image Background with soft shadow and masking */}
      <div className="absolute inset-2 md:inset-0 rounded-[32px] overflow-hidden shadow-2xl shadow-slate-300/50 transform-gpu z-0">
        <img 
          src={heroWorkspaceImg} 
          alt="Premium cybersecurity desk workspace" 
          className="w-full h-full object-cover scale-105" 
        />
        {/* Soft vignette/gradient over image to blend and add depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent" />
      </div>

      {/* Floating Micro UI Card - Top Left */}
      <motion.div 
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        className="absolute top-[12%] left-[-5%] md:left-[5%] z-40 bg-white/80 backdrop-blur-md border border-white/50 rounded-2xl p-3 shadow-xl flex items-center gap-2"
      >
        <div className="flex text-amber-500">
          <Star className="w-3 h-3 fill-current" />
          <Star className="w-3 h-3 fill-current" />
          <Star className="w-3 h-3 fill-current" />
          <Star className="w-3 h-3 fill-current" />
          <Star className="w-3 h-3 fill-current" />
        </div>
        <span className="text-[10px] font-extrabold text-slate-800 tracking-wide">4.9/5 RATING</span>
      </motion.div>

      {/* Floating Micro UI Card - Right */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[40%] right-[-10%] md:right-[-5%] z-40 bg-white/90 backdrop-blur-md border border-slate-100 rounded-2xl p-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] flex flex-col gap-1"
      >
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span className="text-[11px] font-extrabold text-slate-900 uppercase tracking-widest">Industry Standard</span>
        </div>
        <span className="text-[9px] font-bold text-slate-500 ml-5">CEH • CISSP • SEC+</span>
      </motion.div>

      {/* Floating Micro UI Card - Bottom Left */}
      <motion.div 
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-[10%] left-[-2%] md:left-[2%] z-40 bg-slate-900/90 backdrop-blur-md border border-slate-700/50 rounded-2xl py-2.5 px-4 shadow-2xl flex items-center gap-2"
      >
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span className="text-[10px] font-extrabold text-white tracking-wider">25,000+ ENGINEERS</span>
      </motion.div>

      <div className="relative w-full h-[450px] max-w-[480px]">
        {/* Book 1: Top Left */}
        <motion.div 
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0 }}
          className="absolute top-[8%] left-[8%] w-[160px] md:w-[180px] z-20"
        >
          <BookCover 
            title={heroBooks[0].title} author={heroBooks[0].author} category={heroBooks[0].category}
            coverColor={heroBooks[0].coverColor} isbn={heroBooks[0].isbn} coverId={heroBooks[0].coverId} size="md"
            className="shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)] transform -rotate-12 hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-pointer"
          />
        </motion.div>

        {/* Book 2: Top Right */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[2%] right-[5%] w-[170px] md:w-[190px] z-10"
        >
          <BookCover 
            title={heroBooks[1].title} author={heroBooks[1].author} category={heroBooks[1].category}
            coverColor={heroBooks[1].coverColor} isbn={heroBooks[1].isbn} coverId={heroBooks[1].coverId} size="md"
            className="shadow-[0_15px_30px_-5px_rgba(0,0,0,0.5)] transform rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-pointer brightness-[0.95]"
          />
        </motion.div>

        {/* Book 3: Bottom Center (Hero) */}
        <motion.div 
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-[2%] left-[15%] right-[15%] w-[200px] md:w-[230px] mx-auto z-30"
        >
          <BookCover 
            title={heroBooks[2].title} author={heroBooks[2].author} category={heroBooks[2].category}
            coverColor={heroBooks[2].coverColor} isbn={heroBooks[2].isbn} coverId={heroBooks[2].coverId} size="md"
            className="shadow-[0_30px_60px_-10px_rgba(0,0,0,0.7)] transform rotate-2 hover:rotate-0 hover:-translate-y-2 transition-all duration-500 cursor-pointer"
          />
        </motion.div>

        {/* Book 4: Bottom Right */}
        <motion.div 
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[10%] right-[-5%] md:right-[0%] w-[150px] md:w-[170px] z-20"
        >
          <BookCover 
            title={heroBooks[3].title} author={heroBooks[3].author} category={heroBooks[3].category}
            coverColor={heroBooks[3].coverColor} isbn={heroBooks[3].isbn} coverId={heroBooks[3].coverId} size="md"
            className="shadow-[0_25px_45px_-10px_rgba(0,0,0,0.6)] transform -rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-pointer"
          />
        </motion.div>
      </div>
    </div>
  );
}
