import React from 'react';
import { motion } from 'framer-motion';
import { BookCover } from '../../utils/svgGenerator';
import booksData from '../../data/books.json';
const books = booksData.books;

// Select 4 visually distinct books from the dataset
const heroBooks = [
  books.find(b => b.id === 'black-hat-python') || books[0],
  books.find(b => b.id === 'linux-basics-for-hackers') || books[1],
  books.find(b => b.id === 'applied-cryptography') || books[3],
  books.find(b => b.id === 'practical-malware-analysis') || books[2]
];

export function HeroIllustration() {
  return (
    <div className="w-full h-full min-h-[450px] flex items-center justify-center relative">
      <div className="absolute inset-0 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative w-full h-[400px] max-w-[480px]">
        {/* Book 1: Top Left */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0 }}
          className="absolute top-[10%] left-[5%] w-[180px] z-20"
        >
          <BookCover 
            title={heroBooks[0].title}
            author={heroBooks[0].author}
            category={heroBooks[0].category}
            coverColor={heroBooks[0].coverColor}
            isbn={heroBooks[0].isbn}
            coverId={heroBooks[0].coverId}
            size="md"
            className="shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] transform -rotate-6 hover:rotate-0 transition-transform duration-500 cursor-pointer"
          />
        </motion.div>

        {/* Book 2: Top Right */}
        <motion.div 
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[2%] right-[5%] w-[200px] z-10"
        >
          <BookCover 
            title={heroBooks[1].title}
            author={heroBooks[1].author}
            category={heroBooks[1].category}
            coverColor={heroBooks[1].coverColor}
            isbn={heroBooks[1].isbn}
            coverId={heroBooks[1].coverId}
            size="md"
            className="shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] transform rotate-12 hover:rotate-0 transition-transform duration-500 cursor-pointer"
          />
        </motion.div>

        {/* Book 3: Bottom Center (Hero) */}
        <motion.div 
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-[5%] left-[20%] right-[20%] w-[220px] mx-auto z-30"
        >
          <BookCover 
            title={heroBooks[2].title}
            author={heroBooks[2].author}
            category={heroBooks[2].category}
            coverColor={heroBooks[2].coverColor}
            isbn={heroBooks[2].isbn}
            coverId={heroBooks[2].coverId}
            size="md"
            className="shadow-[0_30px_50px_-15px_rgba(0,0,0,0.4)] transform rotate-3 hover:rotate-0 transition-transform duration-500 cursor-pointer"
          />
        </motion.div>

        {/* Book 4: Bottom Right */}
        <motion.div 
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[15%] right-[2%] w-[160px] z-20"
        >
          <BookCover 
            title={heroBooks[3].title}
            author={heroBooks[3].author}
            category={heroBooks[3].category}
            coverColor={heroBooks[3].coverColor}
            isbn={heroBooks[3].isbn}
            coverId={heroBooks[3].coverId}
            size="md"
            className="shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] transform -rotate-12 hover:rotate-0 transition-transform duration-500 cursor-pointer"
          />
        </motion.div>

      </div>
    </div>
  );
}
