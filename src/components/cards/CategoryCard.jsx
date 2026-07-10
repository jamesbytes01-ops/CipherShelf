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
      to={`/books?category=${encodeURIComponent(name)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col justify-between p-6.5 bg-white border border-slate-100/80 rounded-[24px] shadow-[0_4px_25px_-5px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_35px_-10px_rgba(181,138,84,0.08)] hover:-translate-y-1 hover:border-slate-200 transition-all duration-300 text-left"
    >
      {/* Top Gold Accent Line on Hover */}
      <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-accent/50 to-amber-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />

      <div className="flex flex-col gap-4">
        {/* Premium double-ring icon frame */}
        <div className="w-12 h-12 rounded-full border border-slate-150 bg-slate-50/50 text-slate-650 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all duration-350 shadow-inner">
          <IconComponent className="w-5 h-5 stroke-[1.8]" />
        </div>

        {/* Text Details */}
        <div className="flex flex-col gap-2">
          <h3 className="font-extrabold text-slate-850 text-[15px] tracking-tight group-hover:text-accent transition-colors duration-300">
            {name}
          </h3>
          <p className="text-[11px] text-slate-500 leading-relaxed font-medium min-h-[2.5rem]">
            {meta.desc}
          </p>
        </div>
      </div>

      {/* Meta Footer */}
      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase tracking-wider">
        <span className="bg-slate-50 border border-slate-150/60 text-slate-500 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider group-hover:bg-slate-100/50 transition-colors">
          {count} {count === 1 ? 'Book' : 'Books'}
        </span>
        <span className="flex items-center gap-1.5 text-slate-450 group-hover:text-slate-900 transition-colors">
          Explore <Icons.ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
