import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

// Maps category strings to lucide icons
const CATEGORY_META = {
  'Ethical Hacking': { icon: 'Flame', desc: 'Pentesting, vulnerability discovery, and system exploitation.' },
  'Cryptography': { icon: 'Key', desc: 'Symmetric/asymmetric encryption, hashing, and cryptanalysis.' },
  'OSINT': { icon: 'Globe', desc: 'Open-source intelligence, tracking, and footprinting.' },
  'Blue Team': { icon: 'ShieldAlert', desc: 'Defensive architecture, mitigation, and system hardening.' },
  'SOC': { icon: 'Activity', desc: 'Security operations, threat hunting, and alerts monitoring.' },
  'Red Team': { icon: 'Target', desc: 'Adversary simulation, active attacks, and tactical operations.' },
  'Networking': { icon: 'Network', desc: 'IP packets routing, DNS audits, and Wireshark diagnostics.' },
  'Linux': { icon: 'Terminal', desc: 'Bash scripting, administration, and kernel exploration.' },
  'Python': { icon: 'Code', desc: 'Custom exploit scripts development and security automation.' },
  'Web Security': { icon: 'Cpu', desc: 'API testing, SQL injections, XSS, and authentication bypass.' },
  'Cloud Security': { icon: 'CloudLightning', desc: 'AWS, Azure, Docker, and Kubernetes environment audits.' },
  'Malware Analysis': { icon: 'Skull', desc: 'Reverse engineering, static analysis, and sandboxing.' },
  'Digital Forensics': { icon: 'Search', desc: 'RAM diagnostics, disk images, and digital footprints extraction.' }
};

export function CategoryCard({ name, count = 0 }) {
  const meta = CATEGORY_META[name] || { icon: 'Shield', desc: 'General cybersecurity knowledge.' };
  
  // Dynamically resolve icon component
  const IconComponent = Icons[meta.icon] || Icons.Shield;

  return (
    <Link 
      to={`/books?category=${encodeURIComponent(name)}`} className="group relative flex flex-col justify-between p-6 bg-white rounded-[24px] border border-slate-200 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-slate-300 hover:shadow-[0_20px_50px_-12px_rgba(15,23,42,0.12)] text-left overflow-hidden z-10"
    >
      {/* Background Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

      {/* Top Gold Accent Line on Hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex flex-col gap-5 relative z-10">
        {/* Premium double-ring icon frame */}
        <div className="w-14 h-14 rounded-2xl border-2 border-slate-100 bg-white text-slate-400 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all duration-500 shadow-sm group-hover:shadow-[0_10px_30px_-5px_rgba(15,23,42,0.3)]">
          <IconComponent className="w-6 h-6 stroke-[1.8]" />
        </div>

        {/* Text Details */}
        <div className="flex flex-col gap-2.5">
          <h3 className="font-extrabold text-slate-900 text-lg tracking-tight group-hover:text-accent transition-colors duration-300">
            {name}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed font-medium min-h-[3rem]">
            {meta.desc}
          </p>
        </div>
      </div>

      {/* Meta Footer */}
      <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider relative z-10">
        <span className="bg-slate-100/80 border border-slate-200 text-slate-600 rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest group-hover:bg-slate-200/80 transition-colors">
          {count} {count === 1 ? 'Book' : 'Books'}
        </span>
        <span className="flex items-center gap-1.5 text-slate-400 group-hover:text-slate-900 transition-colors">
          Explore <Icons.ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
        </span>
      </div>
    </Link>
  );
}
