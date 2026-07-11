import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Shield, Scale, AlertTriangle, ShieldAlert, FileText, Map, ArrowLeft, Calendar, UserCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';

// Document dictionary containing complete, realistic compliance and legal contents
const DOCS = {
  careers: {
    title: "Careers at CyberShelf",
    icon: <Shield className="w-8 h-8 text-accent" />,
    lastUpdated: "July 10, 2026",
    signee: "Talent Acquisition Node",
    content: `Join the forefront of cybersecurity literature curation. CyberShelf is a remote-first platform connecting modern security engineers with peer-reviewed publications.

    We are actively expanding our operations and recruiting for the following positions:

    1. Senior Frontend Architect (React, Vite, Tailwind CSS)
    - Experience in designing fluid micro-animations and custom user interfaces.
    - Strong knowledge of responsive layout grids and rendering optimizations.

    2. Cybersecurity Curation Director
    - Strong technical background in pentesting, reverse engineering, or cryptography.
    - Responsible for peer-reviewing catalog listings and publishing review logs.

    3. Publisher Relations Specialist
    - Experience in coordinating distribution rights with technical book publishing houses.
    - Fluent in software licensing mechanisms and academic distribution models.

    To apply, please submit your CV, sample technical write-ups, or link to your GitHub repositories to: careers@cybershelf.com.`
  },
  press: {
    title: "Press Room & Brand Assets",
    icon: <FileText className="w-8 h-8 text-accent" />,
    lastUpdated: "June 24, 2026",
    signee: "Communications Desk",
    content: `Welcome to the CyberShelf Press Room. CyberShelf is the leading digital bookshelf for elite cybersecurity technical textbooks, serving over 12,000 active security practitioners, researchers, and academic institutions worldwide.

    Media Assets Available:
    - High-resolution SVG brand logos (Light/Dark themes).
    - Curated screenshot mockups for technical publication spotlights.
    - Curation methodology whitepapers.

    Boilerplate Description:
    CyberShelf (Learn. Secure. Grow.) is a premium technical bookstore offering curated materials in Ethical Hacking, Cryptography, OSINT, Malware Analysis, and Cloud Security. We verify our catalog with expert security engineers to supply actionable learning materials to the global security community.

    For media inquiries, press releases, or interview requests with our founding engineers, please contact: press@cybershelf.com.`
  },
  terms: {
    title: "Terms of Service",
    icon: <Scale className="w-8 h-8 text-accent" />,
    lastUpdated: "July 01, 2026",
    signee: "General Legal Counsel",
    content: `Please read these Terms of Service carefully before accessing the CyberShelf platform. By placing an order, you agree to comply with our academic use agreement.

    1. Permitted Defensive Research Use
    All code listings, terminal commands, exploit scripts, and network analysis diagnostics contained in the textbooks sold on CyberShelf are intended strictly for educational, research, and authorized defensive testing purposes. CyberShelf does not advocate, support, or tolerate any malicious use of these materials.

    2. Intellectual Property Rights
    All textbook cover art, title properties, chapter text, and diagrams are the copyrighted property of their respective publishers (No Starch Press, Wiley, Pearson, Sybex, Apress, etc.) and authors.

    3. Compliance with Local Laws
    Purchasers are responsible for ensuring that their security audits, penetration testing exercises, and network sweeps comply with their local jurisdiction's computer fraud and abuse laws.`
  },
  privacy: {
    title: "Privacy & Data Protection Policy",
    icon: <ShieldAlert className="w-8 h-8 text-accent" />,
    lastUpdated: "July 05, 2026",
    signee: "Data Security Officer",
    content: `At CyberShelf, we believe privacy is a fundamental right. Our platform is designed from the ground up to minimize data collection and tracking.

    1. Local Storage Caching
    To optimize performance and respect user privacy, your shopping shelf inventory and cart items are stored entirely on your local device (via browser localStorage). No server-side cookies are set to track your behavior across other web domains.

    2. Third-Party Payment Processing
    All checkouts are simulated securely and do not store card credentials on our servers. In a production build, transactions are routed through encrypted gateways (such as Stripe) that adhere to PCI-DSS standards.

    3. Information Sharing
    We do not sell search parameters, reading selections, email listings, or user profiles to advertising brokers or analytics aggregators.`
  },
  returns: {
    title: "Return & Replacement Policy",
    icon: <AlertTriangle className="w-8 h-8 text-accent" />,
    lastUpdated: "May 18, 2026",
    signee: "Customer Operations Desk",
    content: `We stand behind the quality of the technical books we curate. If you are not satisfied with your purchase, we support returns under the following guidelines:

    1. 30-Day Evaluation Window
    Physical textbooks may be returned within 30 days of dispatch for a full refund or replacement. Books must be in original condition, free of writing, highlighting, or page bending.

    2. Digital Resource Codes
    Complementary exam vouchers, online lab access codes, Kali Linux code scratchcards, or accompanying CD-ROMs must remain unscratched and sealed to be eligible for a refund.

    3. Return Shipping
    CyberShelf provides prepaid return shipping labels for verified shipping damage or listing errors. Return shipping for general evaluations is the responsibility of the purchaser.`
  },
  security: {
    title: "Vulnerability Disclosure Policy",
    icon: <Shield className="w-8 h-8 text-accent" />,
    lastUpdated: "July 09, 2026",
    signee: "Security Response Team",
    content: `Security is core to our brand. CyberShelf is committed to maintaining a secure shopping interface. We support safe harbor for security researchers reporting vulnerabilities.

    1. Responsible Disclosure Protocol
    If you discover a vulnerability in our shop, catalog queries, or checkout nodes, please report it privately to security@cybershelf.com. Please allow 48 hours for our team to triage and respond.

    2. Encrypted Submissions
    For sensitive vulnerability disclosures, we recommend encrypting your communication using our team's PGP Public Key.
    Key Fingerprint: 9F2E D48A C110 B45E A791

    3. Safe Harbor
    We will not initiate legal action against researchers who discover bugs in good faith, do not access customer data, and do not execute destructive payloads.`
  },
  licenses: {
    title: "Licenses & Copyright Disclosures",
    icon: <Scale className="w-8 h-8 text-accent" />,
    lastUpdated: "January 15, 2026",
    signee: "Compliance Director",
    content: `This section details the licensing terms of CyberShelf platform software and the materials hosted on our bookstore.

    1. Platform Code License
    The CyberShelf storefront engine, styling tokens, catalog navigation scripts, and mock database models are open-source and distributed under the MIT License.

    2. Book Copyright Details
    All physical books, title names, cover artwork, and diagrams are the proprietary intellectual property of their authors and publishing houses. CyberShelf operates as an authorized distributor.

    3. Asset Attributions
    Vector icons are powered by Lucide React. UI design frames are curated under premium minimalist design guidelines.`
  },
  sitemap: {
    title: "Sitemap Node Directory",
    icon: <Map className="w-8.5 h-8.5 text-accent" />,
    lastUpdated: "July 10, 2026",
    signee: "Platform Administrator",
    content: `Below is a complete hierarchical directory mapping the accessible routes and nodes of the CyberShelf technical platform:

    - Home Node: /
      Primary landing portal featuring bestseller stacks, curated category selectors, testimonials, and promo highlights.

    - Books Repository: /books
      Advanced search filter engine. Query books by text matching, category filters, author selection, price parameters, and rating thresholds.

    - Categories Index: /categories
      Categorical index page mapping all 18 technical domains with description metadata.

    - Corporate Story: /about
      The mission statement, customer rating statistics, and core values of CyberShelf.

    - Support Desk: /contact
      Validated support ticketing node, customer queries, and billing contact forms.

    - Shopping Cart: /cart
      Shopping shelf list, subtotal calculations, and secure mock checkout gateways.`
  },
  eula: {
    title: "End User License Agreement (EULA)",
    icon: <Scale className="w-8 h-8 text-accent" />,
    lastUpdated: "July 11, 2026",
    signee: "Legal & Compliance",
    content: `This End User License Agreement ("Agreement") is a legal agreement between you and CyberShelf for the use of our digital resources.

    1. License Grant
    CyberShelf grants you a non-exclusive, non-transferable, limited license to access and use the digital educational materials exclusively for personal, non-commercial, and defensive cybersecurity research purposes.

    2. Restrictions
    You agree not to reproduce, distribute, or reverse-engineer any proprietary materials, DRM-free EPUBs, or code examples provided within the digital storefront without explicit written consent.

    3. Termination
    This license is effective until terminated. Your rights under this license will terminate automatically without notice if you fail to comply with any of its terms.`
  },
  cookies: {
    title: "Cookies Policy",
    icon: <Shield className="w-8 h-8 text-accent" />,
    lastUpdated: "July 11, 2026",
    signee: "Data Security Officer",
    content: `CyberShelf believes in a privacy-first approach. We minimize the use of cookies and local tracking mechanisms across our platform.

    1. Essential Cookies
    We use strictly necessary browser storage (such as localStorage and sessionStorage) to maintain your shopping cart state, authentication session, and display preferences. These do not track you across other websites.

    2. Analytics and Tracking
    CyberShelf does not deploy third-party advertising cookies, cross-site trackers, or hidden analytics pixels. Your reading preferences and searches remain local to your device.

    3. Managing Preferences
    You can clear your local cache or disable cookies entirely through your browser settings, though doing so will clear your shopping cart inventory.`
  }
};

export default function LegalDoc() {
  const { docKey } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [docKey]);

  const doc = DOCS[docKey?.toLowerCase()];

  if (!doc) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Document Not Found</h1>
        <p className="text-sm text-slate-500 mt-3">
          The legal node or compliance document you requested does not exist on this server.
        </p>
        <Link to="/" className="mt-8 inline-block">
          <Button variant="accent">Return to Home Portal</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-left">
      {/* Back to Home button */}
      <button 
        onClick={() => navigate('/')} 
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-900 mb-8 transition-colors uppercase tracking-wider"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Home
      </button>

      {/* Hero Header Card */}
      <div className="bg-slate-50 border border-slate-100 rounded-[24px] p-8 md:p-10 mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        {/* Soft background light */}
        <div className="absolute inset-0 bg-radial-gradient from-accent/5 to-transparent pointer-events-none rounded-full blur-3xl" />
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200/60 shadow-sm flex items-center justify-center">
            {doc.icon}
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight leading-tight">
              {doc.title}
            </h1>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">
              CyberShelf Compliance Node
            </span>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex flex-col gap-2 bg-white border border-slate-200/50 rounded-2xl px-5 py-4 min-w-[180px] shadow-sm relative z-10">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-450 font-bold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-accent" /> Last Updated
          </div>
          <span className="text-xs font-black text-slate-800">{doc.lastUpdated}</span>
        </div>
      </div>

      {/* Main body content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Document Content */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-[24px] p-8 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.01)] text-slate-650 text-[14px] leading-relaxed whitespace-pre-line font-medium">
          {doc.content}
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          <div className="bg-slate-50 border border-slate-100 rounded-[20px] p-6 flex flex-col gap-4">
            <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wide">Document Registry</h4>
            <div className="flex flex-col gap-3.5 text-xs border-t border-slate-200/60 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-450 font-semibold">Classification</span>
                <span className="text-slate-800 font-bold uppercase tracking-wider text-[10px] bg-slate-200/55 px-2 py-0.5 rounded">Public Node</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-450 font-semibold">Authority Signee</span>
                <span className="text-slate-800 font-bold">{doc.signee}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-450 font-semibold">Server ID</span>
                <span className="text-slate-800 font-mono text-[10px]">CS-CS-{(docKey || '95').toUpperCase().slice(0, 3)}</span>
              </div>
            </div>
          </div>

          <div className="border border-slate-100 rounded-[20px] p-6 text-center bg-white flex flex-col gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-accent mx-auto">
              <UserCheck className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-1">
              <h5 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Have Questions?</h5>
              <p className="text-[11px] text-slate-400 font-medium">
                Our support team is available 24/7 for audit ticket disclosures.
              </p>
            </div>
            <Link to="/contact" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="w-full justify-center text-xs">
                Open Support Ticket
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
