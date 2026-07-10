import React from 'react';
import heroBooksImage from '../../assets/hero-books.png';

export function HeroIllustration() {
  return (
    <div className="w-full h-full min-h-[350px] md:min-h-[420px] flex items-center justify-center relative select-none">
      {/* Soft background glow */}
      <div className="absolute inset-0 bg-radial-gradient from-accent/5 to-transparent pointer-events-none rounded-full blur-3xl" />
      
      {/* Photorealistic Stack Image */}
      <div className="relative w-full max-w-[440px] transition-transform duration-500 hover:scale-[1.02]">
        <img 
          src={heroBooksImage} 
          alt="Curated Cybersecurity Book Stack and CyberShelf Mug" 
          className="w-full h-auto object-contain rounded-[24px] shadow-2xl border border-slate-100/10"
        />
        {/* Soft ground reflection shadow */}
        <div className="absolute bottom-[-12px] left-10 right-10 h-5 bg-slate-950/15 rounded-full blur-lg z-0 pointer-events-none" />
      </div>
    </div>
  );
}
