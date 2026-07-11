import React, { useState } from 'react';
import { Plus, Minus, Search, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

const FAQS = [
  {
    category: "Orders & Shipping",
    items: [
      {
        q: "Do you ship physical books internationally?",
        a: "Yes, we ship globally via secure, tracked couriers. Shipping costs and delivery times are calculated at checkout based on your node location."
      },
      {
        q: "When will I receive my digital purchase?",
        a: "Immediately. All DRM-free EPUBs and PDF manuals are instantly unlocked and available for download in your dashboard the moment your transaction clears."
      },
      {
        q: "What is your return policy?",
        a: "We offer a 30-day evaluation window for physical books, provided they are in original condition. Digital goods are non-refundable once downloaded, unless there is a verifiable defect in the file."
      }
    ]
  },
  {
    category: "Technical Materials",
    items: [
      {
        q: "Are the digital books DRM-free?",
        a: "Yes, 100%. We believe security researchers should own their materials. Our digital downloads are completely DRM-free, meaning you can read them on any offline device."
      },
      {
        q: "Do the books come with lab materials or VMs?",
        a: "Many of our penetration testing and malware analysis books include access codes for companion lab environments or downloadable ZIP files containing the referenced malware samples (password protected)."
      }
    ]
  },
  {
    category: "Accounts & Security",
    items: [
      {
        q: "Is my payment information stored on your servers?",
        a: "No. We use encrypted, PCI-compliant third-party payment gateways (like Stripe). Your raw credit card data never touches our database."
      },
      {
        q: "Do you offer corporate or academic discounts?",
        a: "Yes. For bulk orders (10+ copies) for SOC teams, universities, or corporate libraries, please contact our support desk for specialized procurement pricing."
      }
    ]
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Flatten and filter FAQs based on search
  const filteredFaqs = FAQS.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header Section */}
      <section className="bg-slate-950 py-20 relative overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />
        
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-inner">
            <ShieldCheck className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-400 font-medium">
            Find answers about orders, digital formats, security, and corporate purchasing.
          </p>

          <div className="mt-8 relative max-w-xl mx-auto">
            <input 
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-4 focus:border-accent/50 outline-none transition-colors"
            />
            <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-16 flex-grow">
        <div className="max-w-3xl mx-auto px-6">
          {filteredFaqs.length > 0 ? (
            <div className="flex flex-col gap-10">
              {filteredFaqs.map((category, catIdx) => (
                <div key={catIdx}>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-4 tracking-tight">
                    {category.category}
                  </h3>
                  <div className="flex flex-col gap-3">
                    {category.items.map((item, itemIdx) => {
                      const globalIdx = \`\${catIdx}-\${itemIdx}\`;
                      const isOpen = openIndex === globalIdx;
                      return (
                        <div 
                          key={globalIdx}
                          className={\`border rounded-xl transition-all duration-300 overflow-hidden \${
                            isOpen ? 'border-accent/40 bg-white shadow-md' : 'border-slate-200 bg-white hover:border-slate-300'
                          }\`}
                        >
                          <button
                            onClick={() => toggleFaq(globalIdx)}
                            className="w-full text-left px-6 py-4 flex items-center justify-between focus:outline-none"
                          >
                            <span className="font-bold text-slate-900 text-sm md:text-base pr-4">
                              {item.q}
                            </span>
                            <div className={\`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors \${
                              isOpen ? 'bg-accent/10 text-accent' : 'bg-slate-50 text-slate-400'
                            }\`}>
                              {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                            </div>
                          </button>
                          
                          <div 
                            className={\`px-6 overflow-hidden transition-all duration-300 ease-in-out \${
                              isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'
                            }\`}
                          >
                            <div className="pt-2 border-t border-slate-50">
                              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                {item.a}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
              <p className="text-slate-500 font-medium">
                No answers found for "{searchQuery}".
              </p>
            </div>
          )}

          {/* Contact Support CTA */}
          <div className="mt-16 bg-slate-900 rounded-[24px] p-8 md:p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-indigo-500/10 pointer-events-none" />
            <div className="relative z-10">
              <h4 className="text-xl font-extrabold text-white tracking-tight mb-2">Still have questions?</h4>
              <p className="text-sm text-slate-400 mb-6">Our support nodes are online and ready to assist you.</p>
              <Link to="/contact">
                <Button variant="accent" size="md">
                  Open Support Ticket
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
