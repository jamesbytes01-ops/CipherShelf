import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ShieldAlert, Zap, Globe, Lock, Activity, Server, Clock, ServerCrash } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function AntivirusEducation() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-left">
      {/* Hero Section */}
      <section className="bg-slate-950 py-24 relative overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-6 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            Security Education Module
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-light text-white tracking-tight mb-6 leading-tight">
            Choosing the Right <br/> <span className="font-semibold text-accent">Antivirus Protection</span>
          </h1>
          <p className="text-base md:text-lg text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
            Our team at EAA Logi firmly believes that informed customers make the best security decisions. While we are an entirely independent organization—meaning we don't work for these companies—we've analyzed the market's top three endpoint protection suites to help you understand what actually keeps your machine safe.
          </p>
        </div>
      </section>

      {/* Main Educational Content */}
      <section className="py-20 flex-grow">
        <div className="max-w-5xl mx-auto px-6 flex flex-col gap-16">
          
          {/* Priority: Webroot Section */}
          <div className="bg-white border-2 border-accent/40 rounded-[32px] overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            
            <div className="p-8 md:p-12 relative z-10">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-100 pb-8 mb-8">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-[#091224] text-accent flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Zap className="w-8 h-8" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md inline-block w-max mb-1">Top Recommendation</span>
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Webroot SecureAnywhere</h2>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex flex-col gap-6">
                  <h3 className="text-xl font-bold text-slate-900">Why It's Our Top Pick</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Most traditional antivirus programs rely on huge databases of known threats that clog up your hard drive and slow down your machine. Webroot flips that script. It uses behavioral analysis and cloud computing, which means the heavy lifting is done on their servers, not your PC. It installs in seconds and scans take just a few minutes without interrupting your workflow.
                  </p>
                  
                  <div className="flex flex-col gap-3">
                    <h4 className="font-bold text-slate-900 text-sm">Key Features:</h4>
                    <ul className="flex flex-col gap-2.5 text-sm text-slate-600">
                      <li className="flex gap-3"><ShieldCheck className="w-5 h-5 text-accent flex-shrink-0" /> Zero-day protection leveraging cloud predictive intelligence.</li>
                      <li className="flex gap-3"><Activity className="w-5 h-5 text-accent flex-shrink-0" /> Incredibly small footprint (uses barely any RAM).</li>
                      <li className="flex gap-3"><Globe className="w-5 h-5 text-accent flex-shrink-0" /> Real-time anti-phishing blocks bad sites before they load.</li>
                      <li className="flex gap-3"><Lock className="w-5 h-5 text-accent flex-shrink-0" /> Identity shield safeguards your data while shopping online.</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col gap-5 h-fit">
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">Packages Offered</h3>
                  <div className="flex flex-col gap-4">
                    <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                      <div className="font-bold text-slate-900 text-sm mb-1">Basic AntiVirus</div>
                      <div className="text-xs text-slate-500">Perfect for 1 device. Covers the essentials: real-time threat protection and identity shielding.</div>
                    </div>
                    <div className="bg-white border-2 border-accent/30 p-4 rounded-xl shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-accent text-[9px] font-bold text-slate-900 uppercase px-2 py-1 rounded-bl-lg">Most Popular</div>
                      <div className="font-bold text-slate-900 text-sm mb-1">Internet Security Plus</div>
                      <div className="text-xs text-slate-500">Covers up to 3 devices (including phones and tablets) and adds an excellent password manager.</div>
                    </div>
                    <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                      <div className="font-bold text-slate-900 text-sm mb-1">Internet Security Complete</div>
                      <div className="text-xs text-slate-500">Covers up to 5 devices, adding a system optimizer and secure cloud storage to erase your digital tracks.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alternative 1: McAfee */}
          <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">McAfee Total Protection</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    McAfee is one of the oldest names in the game. It is a highly comprehensive suite designed for families or users who want an "everything-in-one-box" solution. While it can be slightly heavier on system resources compared to Webroot, it makes up for it by bundling in a VPN, parental controls, and a solid firewall right out of the gate.
                  </p>
                  <ul className="flex flex-col gap-2 text-sm text-slate-600 mt-2">
                    <li className="flex gap-2.5"><Server className="w-4 h-4 text-slate-400 mt-0.5" /> Excellent malware detection rates.</li>
                    <li className="flex gap-2.5"><Server className="w-4 h-4 text-slate-400 mt-0.5" /> Unlimited VPN bandwidth on premium tiers.</li>
                    <li className="flex gap-2.5"><Server className="w-4 h-4 text-slate-400 mt-0.5" /> Personalized protection scores to guide your security habits.</li>
                  </ul>
                </div>
                
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 h-fit">
                  <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide mb-3">Packages Offered</h3>
                  <div className="flex flex-col gap-3 text-sm">
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="font-bold text-slate-700">Basic (1 Device)</span>
                      <span className="text-slate-500 text-xs">Standard AV + Firewall</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="font-bold text-slate-700">Premium (5 Devices)</span>
                      <span className="text-slate-500 text-xs">Adds VPN & Identity Monitoring</span>
                    </div>
                    <div className="flex justify-between pb-1">
                      <span className="font-bold text-slate-700">Advanced (Unlimited)</span>
                      <span className="text-slate-500 text-xs">Full Family Protection</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alternative 2: Norton */}
          <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm hover:shadow-md transition-shadow mb-10">
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Norton 360</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Norton 360 offers a very strong defense against ransomware and sophisticated malware. What sets Norton apart is their integration of LifeLock identity theft protection on their higher tiers, making it a great choice if you are deeply concerned about data breaches affecting your credit.
                  </p>
                  <ul className="flex flex-col gap-2 text-sm text-slate-600 mt-2">
                    <li className="flex gap-2.5"><Server className="w-4 h-4 text-slate-400 mt-0.5" /> 100% Virus Protection Promise.</li>
                    <li className="flex gap-2.5"><Server className="w-4 h-4 text-slate-400 mt-0.5" /> Dark Web monitoring alerts you if your data leaks.</li>
                    <li className="flex gap-2.5"><Server className="w-4 h-4 text-slate-400 mt-0.5" /> Cloud backup for important files (PC only).</li>
                  </ul>
                </div>
                
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 h-fit">
                  <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide mb-3">Packages Offered</h3>
                  <div className="flex flex-col gap-3 text-sm">
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="font-bold text-slate-700">AntiVirus Plus</span>
                      <span className="text-slate-500 text-xs">AV + 2GB Cloud Backup</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="font-bold text-slate-700">360 Standard</span>
                      <span className="text-slate-500 text-xs">VPN + Dark Web Monitor</span>
                    </div>
                    <div className="flex justify-between pb-1">
                      <span className="font-bold text-slate-700">360 with LifeLock</span>
                      <span className="text-slate-500 text-xs">Full Identity Theft Resolution</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Closing thoughts */}
          <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-5">
            <h3 className="text-xl font-bold text-slate-900">The Final Word</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              While McAfee and Norton offer robust feature sets, our experience tells us that a lightweight, fast, and unobtrusive security solution like Webroot fits the modern user best. It keeps you secure without bogging down your system. Ultimately, the best antivirus is the one you keep updated and actually use.
            </p>
            <Link to="/books" className="mt-4">
              <Button variant="accent" size="lg">Return to Digital Library</Button>
            </Link>
          </div>
          
        </div>
      </section>
    </div>
  );
}
