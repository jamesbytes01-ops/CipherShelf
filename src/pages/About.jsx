import React from 'react';
import { Target, Eye, ShieldCheck, Heart } from 'lucide-react';

export default function About() {
  const stats = [
    { label: 'Curated Editions', value: '30+' },
    { label: 'Active Readers', value: '12,000+' },
    { label: 'Security Sponsors', value: '140+' },
    { label: 'Delivery Rating', value: '4.9/5★' }
  ];

  const values = [
    {
      icon: <ShieldCheck className="w-5.5 h-5.5 text-accent" />,
      title: 'Verified Contents',
      desc: 'We verify our catalog with lead engineers to ensure the material provides concrete, actionable security practices.'
    },
    {
      icon: <Target className="w-5.5 h-5.5 text-accent" />,
      title: 'Practical Focus',
      desc: 'No fluff. We prefer guides containing source code, terminal commands, network maps, and real exploit walkthroughs.'
    },
    {
      icon: <Eye className="w-5.5 h-5.5 text-accent" />,
      title: 'Zero Overdesign',
      desc: 'Our interfaces and selections are focused, clean, and distraction-free, letting you prioritize knowledge growth.'
    },
    {
      icon: <Heart className="w-5.5 h-5.5 text-accent" />,
      title: 'Security Community',
      desc: 'We support local open-source testing guilds and donate resources to security research associations globally.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-20">
      {/* 1. Header Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
        <div className="lg:col-span-6 flex flex-col gap-4">
          <span className="text-xs font-bold text-accent uppercase tracking-widest">
            Behind the Shelf
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Curating Cybersecurity <br />
            For Modern Engineers
          </h1>
        </div>
        <div className="lg:col-span-6">
          <p className="text-sm md:text-base text-slate-500 leading-relaxed">
            Founded in 2026, CyberShelf was established to address a persistent challenge: separating high-fidelity, production-grade cybersecurity knowledge from superficial tutorials. We aggregate, verify, and deliver the books that actual security professionals rely on.
          </p>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="bg-slate-50 border border-slate-100 rounded-[24px] py-10 px-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col gap-1 items-center">
            <span className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              {stat.value}
            </span>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              {stat.label}
            </span>
          </div>
        ))}
      </section>

      {/* 3. Mission & Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
        <div className="p-8 border border-slate-100 rounded-[20px] bg-white flex flex-col gap-4">
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-800">
            <Target className="w-5 h-5 stroke-[1.8]" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Our Mission</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            To provide security analysts, penetration testers, and developers with direct, frictionless access to authoritative textbooks and reference manuals, ensuring they can write secure software and defend critical infrastructure.
          </p>
        </div>

        <div className="p-8 border border-slate-100 rounded-[20px] bg-white flex flex-col gap-4">
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-800">
            <Eye className="w-5 h-5 stroke-[1.8]" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Our Vision</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            To become the premier global repository for tech books, trusted by leading security organizations and academic labs as their first port of call for workforce development and skill mastery.
          </p>
        </div>
      </section>

      {/* 4. Core Values Grid */}
      <section className="text-left flex flex-col gap-10">
        <div>
          <span className="text-xs font-bold text-accent uppercase tracking-widest">
            Operational Pillars
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Our Core Values
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((v, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-slate-50 flex-shrink-0 flex items-center justify-center border border-slate-100">
                {v.icon}
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-slate-800 text-sm md:text-base">
                  {v.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
