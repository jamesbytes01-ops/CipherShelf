const fs = require('fs');

const original = fs.readFileSync('c:/Users/Administrator/Desktop/CipherShelf/src/pages/Home.jsx', 'utf8');

const newImports = `
import { Shield, CheckCircle2, XCircle, BookOpenCheck } from 'lucide-react';
`;

let updated = original.replace("import { BookCover }", "import { Shield, CheckCircle2, XCircle, BookOpenCheck } from 'lucide-react';\nimport { BookCover }");

const heroSection = `      {/* 1. HERO SECTION */}
` + original.substring(original.indexOf('      {/* 1. HERO SECTION */}'), original.indexOf('      {/* 1.5 TRUSTED BY CORPORATE MARQUEE */}'));

const marquee = `      {/* 1.5 TRUSTED BY CORPORATE MARQUEE */}
` + original.substring(original.indexOf('      {/* 1.5 TRUSTED BY CORPORATE MARQUEE */}'), original.indexOf('      {/* 2. SLEEK HORIZONTAL TRUST BAR */}'));

const trustBar = `      {/* 2. SLEEK HORIZONTAL TRUST BAR */}
` + original.substring(original.indexOf('      {/* 2. SLEEK HORIZONTAL TRUST BAR */}'), original.indexOf("      {/* 2.5. THE ENGINEER'S ADVANTAGE */}"));

const advantage = `      {/* 2.5. THE ENGINEER'S ADVANTAGE */}
` + original.substring(original.indexOf("      {/* 2.5. THE ENGINEER'S ADVANTAGE */}"), original.indexOf('      {/* 3. SHOP BY CATEGORY SECTION */}'));

const categories = `      {/* 3. SHOP BY CATEGORY SECTION */}
` + original.substring(original.indexOf('      {/* 3. SHOP BY CATEGORY SECTION */}'), original.indexOf('      {/* 4. FEATURED BOOKS SECTION */}'));

const featuredBooks = `      {/* 4. FEATURED BOOKS SECTION */}
` + original.substring(original.indexOf('      {/* 4. FEATURED BOOKS SECTION */}'), original.indexOf('      {/* 5. PROMOTIONAL DISCOUNT BANNER */}'));

const testimonials = `      {/* 6. WHAT OUR READERS SAY (TESTIMONIALS) */}
` + original.substring(original.indexOf('      {/* 6. WHAT OUR READERS SAY (TESTIMONIALS) */}'), original.indexOf('      {/* 8. NEWSLETTER / STAY UPDATED */}'));

const newsletter = `      {/* 8. NEWSLETTER / STAY UPDATED */}
` + original.substring(original.indexOf('      {/* 8. NEWSLETTER / STAY UPDATED */}'), original.lastIndexOf('    </div>'));


const featuredFreeBooks = `
      {/* FEATURED FREE BOOKS SECTION */}
      <section className="pt-16 pb-24 bg-slate-50 overflow-hidden flex flex-col border-t border-slate-200">
        <div className="w-full max-w-[95%] xl:max-w-[1600px] mx-auto px-4 md:px-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
              <BookOpenCheck className="w-3.5 h-3.5 text-emerald-600" />
              Open Access
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-medium text-slate-900 tracking-tighter mb-4">
              Featured Free Books
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              High-quality, peer-reviewed cybersecurity resources available at no cost to support the community.
            </p>
          </div>
          <div className="flex items-center gap-4 hidden sm:flex">
            <Link to="/books?free=true" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200 text-slate-700 font-semibold hover:border-slate-300 hover:bg-white transition-all">
              View All Free Books
            </Link>
          </div>
        </div>

        <div className="w-full max-w-[95%] xl:max-w-[1600px] mx-auto px-4 md:px-8">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {freeBooks.map((book) => (
              <motion.div 
                key={book.id} 
                variants={itemVariants}
                className="w-[85vw] sm:w-[340px] md:w-[320px] lg:w-[300px] xl:w-[320px] flex-shrink-0 snap-start"
              >
                <BookCard book={book} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
`;

const whyWebroot = `
      {/* WHY WEBROOT SECTION */}
      <section className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900 text-left">
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/40 border border-emerald-800/50 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Shield className="w-3.5 h-3.5" />
              Editor's Choice
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tighter mb-6 leading-tight">
              Why Security Professionals Choose <span className="text-emerald-400">Webroot</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              In our independent testing, Webroot consistently outperforms traditional antivirus solutions due to its cloud-driven threat intelligence. It uses predictive behavioral analysis to stop zero-day threats before they execute.
            </p>
            <ul className="flex flex-col gap-4 text-slate-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Extremely lightweight agent with sub-2MB footprint</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Lightning-fast scans that take seconds, not hours</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Identity theft protection and secure browsing</span>
              </li>
            </ul>
            <Link to="/compare" className="mt-10 inline-block">
              <Button variant="accent" size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.4)] border-none">
                Read the Full Review
              </Button>
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full" />
            <div className="bg-[#0f172a] rounded-[32px] border border-slate-800 p-8 relative z-10 shadow-2xl">
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-800">
                <div className="flex flex-col">
                  <span className="text-white font-bold text-lg">Webroot SecureAnywhere</span>
                  <span className="text-slate-500 text-sm">AntiVirus</span>
                </div>
                <div className="flex gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-800">
                  <span className="text-slate-400 text-xs uppercase tracking-wider block mb-1">Scan Speed</span>
                  <span className="text-emerald-400 font-bold text-xl">20x Faster</span>
                </div>
                <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-800">
                  <span className="text-slate-400 text-xs uppercase tracking-wider block mb-1">System Impact</span>
                  <span className="text-emerald-400 font-bold text-xl">Minimal</span>
                </div>
                <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-800 col-span-2">
                  <span className="text-slate-400 text-xs uppercase tracking-wider block mb-1">Cloud Intelligence</span>
                  <span className="text-white font-bold text-lg">Real-time threat feeds</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
`;

const antivirusComparison = `
      {/* ANTIVIRUS COMPARISON */}
      <section className="py-24 bg-white overflow-hidden text-left border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-medium text-slate-900 tracking-tighter mb-4">
              2026 Antivirus Comparison
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              We independently tested the top security solutions. Here is how they stack up against modern malware strains.
            </p>
          </div>
          <div className="overflow-x-auto pb-4">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="py-5 px-6 font-bold text-slate-900 text-sm uppercase tracking-wider w-1/4">Software</th>
                  <th className="py-5 px-6 font-bold text-slate-900 text-sm uppercase tracking-wider">Malware Detection</th>
                  <th className="py-5 px-6 font-bold text-slate-900 text-sm uppercase tracking-wider">System Impact</th>
                  <th className="py-5 px-6 font-bold text-slate-900 text-sm uppercase tracking-wider">Price (Yearly)</th>
                  <th className="py-5 px-6 font-bold text-slate-900 text-sm uppercase tracking-wider text-center">Verdict</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors group bg-emerald-50/30">
                  <td className="py-5 px-6 font-bold text-slate-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <Shield className="w-4 h-4" />
                    </div>
                    Webroot
                  </td>
                  <td className="py-5 px-6 font-semibold text-emerald-600">99.8% (Excellent)</td>
                  <td className="py-5 px-6 text-slate-700">Virtually None</td>
                  <td className="py-5 px-6 text-slate-700">$29.99</td>
                  <td className="py-5 px-6 text-center">
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Top Pick</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-5 px-6 font-bold text-slate-900">Bitdefender</td>
                  <td className="py-5 px-6 text-slate-700">99.9% (Excellent)</td>
                  <td className="py-5 px-6 text-slate-700">Moderate</td>
                  <td className="py-5 px-6 text-slate-700">$39.99</td>
                  <td className="py-5 px-6 text-center text-slate-400 font-medium">Recommended</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-5 px-6 font-bold text-slate-900">Norton</td>
                  <td className="py-5 px-6 text-slate-700">99.5% (Great)</td>
                  <td className="py-5 px-6 text-slate-700">Heavy</td>
                  <td className="py-5 px-6 text-slate-700">$49.99</td>
                  <td className="py-5 px-6 text-center text-slate-400 font-medium">Good</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-5 px-6 font-bold text-slate-900">McAfee</td>
                  <td className="py-5 px-6 text-slate-700">98.9% (Good)</td>
                  <td className="py-5 px-6 text-slate-700">Heavy</td>
                  <td className="py-5 px-6 text-slate-700">$39.99</td>
                  <td className="py-5 px-6 text-center text-slate-400 font-medium">Average</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-5 px-6 font-bold text-slate-900">Windows Defender</td>
                  <td className="py-5 px-6 text-slate-700">97.5% (Average)</td>
                  <td className="py-5 px-6 text-slate-700">Moderate</td>
                  <td className="py-5 px-6 text-slate-700">Free</td>
                  <td className="py-5 px-6 text-center text-slate-400 font-medium">Baseline</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-8 text-center">
            <Link to="/compare">
              <Button variant="outline" size="md" className="border-slate-300 text-slate-700 hover:bg-slate-50">View Detailed Methodology</Button>
            </Link>
          </div>
        </div>
      </section>
`;

const educationHub = `
      {/* EDUCATION HUB */}
      <section className="py-24 bg-slate-50 text-left border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-display font-medium text-slate-900 tracking-tighter mb-4">
                Learning Paths
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Step-by-step educational tracks covering the most critical aspects of modern cybersecurity.
              </p>
            </div>
            <Link to="/blog?category=Education" className="inline-flex items-center gap-2 font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
              View All Paths <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/blog?category=Malware" className="group bg-white p-8 rounded-3xl border border-slate-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center mb-6">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">Malware Analysis</h3>
              <p className="text-slate-500 leading-relaxed mb-6">Understand how malicious software operates, spreads, and evades detection.</p>
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                5 Articles <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link to="/blog?category=Phishing" className="group bg-white p-8 rounded-3xl border border-slate-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">Phishing Defense</h3>
              <p className="text-slate-500 leading-relaxed mb-6">Learn to identify and mitigate social engineering attacks and email fraud.</p>
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                4 Articles <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link to="/blog?category=Networks" className="group bg-white p-8 rounded-3xl border border-slate-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <Network className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">Network Hardening</h3>
              <p className="text-slate-500 leading-relaxed mb-6">Secure your infrastructure against unauthorized access and lateral movement.</p>
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                6 Articles <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>
`;

const latestArticles = `
      {/* LATEST ARTICLES */}
      <section className="py-24 bg-white text-left border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-display font-medium text-slate-900 tracking-tighter mb-4">
                Latest from the Blog
              </h2>
            </div>
            <Link to="/blog" className="inline-flex items-center gap-2 font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
              Read More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1,2,3].map((i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="aspect-[16/9] rounded-2xl bg-slate-100 overflow-hidden relative">
                   <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                     <BookOpen className="w-12 h-12" />
                   </div>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <span className="text-indigo-600">Education</span>
                  <span>•</span>
                  <span>July 2026</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 hover:text-indigo-600 transition-colors line-clamp-2">
                  Understanding the Anatomy of Modern Ransomware Attacks
                </h3>
                <p className="text-slate-500 line-clamp-3">
                  An in-depth look at how threat actors infiltrate networks and the best practices for preventing data encryption events.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
`;

let newReturn = `  return (
    <div className="flex flex-col min-h-screen">
` + heroSection + marquee + trustBar + advantage + featuredBooks + featuredFreeBooks + whyWebroot + antivirusComparison + educationHub + latestArticles + categories + testimonials + newsletter + `
    </div>
  );
`;

updated = updated.replace(/  return \([\s\S]*    <\/div>\n  \);/, newReturn);

updated = updated.replace('const featuredBooks = booksData.filter((book) => book.featured).slice(0, 5);', 
  `const featuredBooks = booksData.filter((book) => book.featured).slice(0, 5);
  const freeBooks = booksData.filter((book) => book.price === 0).slice(0, 5);`);

fs.writeFileSync('c:/Users/Administrator/Desktop/CipherShelf/src/pages/Home.jsx', updated, 'utf8');
console.log('Done');
