import React, { useState } from 'react';

const COLOR_THEMES = {
  indigo: { bg: '#1E1B4B', accent: '#6366F1', label: 'NETWORK SECURITY' },
  emerald: { bg: '#064E3B', accent: '#10B981', label: 'PYTHON & AUTOMATION' },
  rose: { bg: '#4C0519', accent: '#F43F5E', label: 'MALWARE ANALYSIS' },
  crimson: { bg: '#450A0A', accent: '#EF4444', label: 'RED TEAM OPERATIONS' },
  darkgray: { bg: '#111827', accent: '#9CA3AF', label: 'LINUX FOUNDATIONS' },
  slate: { bg: '#0F172A', accent: '#38BDF8', label: 'CLOUD OPERATIONS' },
  amber: { bg: '#451A03', accent: '#F59E0B', label: 'ETHICAL HACKING' },
  violet: { bg: '#2E1065', accent: '#8B5CF6', label: 'CRYPTOGRAPHY & MATH' },
  sky: { bg: '#082F49', accent: '#0EA5E9', label: 'REVERSE ENGINEERING' },
  teal: { bg: '#042F2E', accent: '#14B8A6', label: 'WEB APP SECURITY' }
};

// Render custom vector designs for iconic books to match their real-world covers
export function BookCover({ title, author, category, coverColor = 'indigo', className = '', size = 'md', isbn = '', coverId = '', image = '' }) {
  const initialUrl = image ? image : (coverId 
    ? `https://covers.openlibrary.org/b/id/${coverId}-${size === 'lg' ? 'L' : size === 'sm' ? 'M' : 'L'}.jpg`
    : (isbn ? `https://covers.openlibrary.org/b/isbn/${isbn}-${size === 'lg' ? 'L' : size === 'sm' ? 'M' : 'L'}.jpg` : null));

  const [imgSrc, setImgSrc] = useState(initialUrl);
  const [status, setStatus] = useState('loading'); // 'loading', 'loaded', 'error'
  const [triedGoogle, setTriedGoogle] = useState(false);

  const handleError = () => {
    if (!triedGoogle && isbn) {
      setTriedGoogle(true);
      fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
        .then(res => res.json())
        .then(data => {
          if (data.items && data.items[0] && data.items[0].volumeInfo.imageLinks) {
            const thumbnail = data.items[0].volumeInfo.imageLinks.thumbnail;
            setImgSrc(thumbnail.replace('zoom=1', 'zoom=0').replace('http:', 'https:'));
            setStatus('loading');
          } else {
            setStatus('error');
          }
        })
        .catch(() => setStatus('error'));
    } else {
      setStatus('error');
    }
  };

  if (isbn) {
    return (
      <div className={`relative h-full aspect-[2/3] rounded-lg overflow-hidden bg-slate-100 ${className}`} style={{ boxShadow: '0 8px 25px -5px rgba(0, 0, 0, 0.3)' }}>
        <img 
          src={imgSrc} 
          alt={`Cover of ${title}`} 
          className="w-full h-full object-cover"
          onLoad={(e) => {
            if (e.target.naturalWidth <= 1) {
              handleError();
            } else {
              setStatus('loaded');
            }
          }}
          onError={handleError}
          style={{ display: status === 'loaded' ? 'block' : 'none' }}
        />
        {/* Fallback container if both images fail */}
        {status === 'error' && (
          <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center p-4 text-center">
             <span className="text-white font-bold text-sm mb-2">{title}</span>
             <span className="text-slate-400 text-xs">{author}</span>
          </div>
        )}
      </div>
    );
  }

  // Fallback if no ISBN is provided
  const colors = COLOR_THEMES[coverColor] || COLOR_THEMES.indigo;
  let paddingClass = size === 'sm' ? 'p-2.5' : size === 'lg' ? 'p-8' : 'p-5';
  let titleClass = size === 'sm' ? 'text-[10px] leading-tight font-extrabold' : size === 'lg' ? 'text-2xl leading-snug font-extrabold' : 'text-lg font-extrabold';
  let spineWidth = size === 'sm' ? '4px' : size === 'lg' ? '12px' : '8px';
  let authorClass = size === 'sm' ? 'text-[8px]' : size === 'lg' ? 'text-sm font-semibold' : 'text-[10px] font-semibold';

  return (
    <div 
      className={`relative h-full aspect-[2/3] rounded-lg overflow-hidden transition-all duration-300 ${className}`}
      style={{
        backgroundColor: colors.bg,
        boxShadow: '0 12px 30px -5px rgba(0, 0, 0, 0.45)'
      }}
    >
      <div className="absolute left-0 top-0 bottom-0 z-20 bg-slate-950/40" style={{ width: spineWidth }} />
      <div className="absolute top-0 bottom-0 z-20" style={{ left: spineWidth, width: '2px', backgroundColor: colors.accent, opacity: 0.6 }} />

      <div className={`absolute inset-0 w-full h-full ${paddingClass} flex flex-col justify-between z-10 text-left`}>
        <div className="flex flex-col gap-0.5 pl-1.5">
          <span className="font-mono text-slate-400 font-extrabold uppercase tracking-widest" style={{ fontSize: size === 'sm' ? '5px' : '8px' }}>
            {category}
          </span>
          <div className="w-4 h-0.5" style={{ backgroundColor: colors.accent }} />
        </div>

        <div className="my-auto pl-1.5 flex flex-col gap-1.5">
          <h2 className={`text-white tracking-tight leading-tight ${titleClass}`}>
            {title}
          </h2>
        </div>

        <div className="flex flex-col border-t border-slate-700/40 pt-2.5 pl-1.5">
          <span className={`text-slate-200 truncate ${authorClass}`}>
            {author}
          </span>
        </div>
      </div>
    </div>
  );
}
