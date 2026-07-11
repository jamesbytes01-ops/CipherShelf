import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Calendar, Clock, ArrowLeft, Share2, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import blogPosts from '../data/blog.json';

// Simple frontmatter parser
function parseMD(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { attributes: {}, body: content };
  const frontmatterStr = match[1];
  const attributes = {};
  frontmatterStr.split('\n').forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx > -1) {
      const key = line.slice(0, colonIdx).trim();
      let val = line.slice(colonIdx + 1).trim();
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      attributes[key] = val;
    }
  });
  return { attributes, body: match[2] };
}

export default function BlogArticle() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  // Find related articles (same category, exclude current)
  const relatedArticles = blogPosts
    .filter(post => post.slug !== slug && post.category === article?.attributes?.category)
    .slice(0, 3);
    
  // If no related articles in same category, just show latest 3
  const fallbackRelated = relatedArticles.length > 0 
    ? relatedArticles 
    : blogPosts.filter(post => post.slug !== slug).slice(0, 3);

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
    setLoading(true);
    
    fetch(`/content/blog/${slug}.md`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.text();
      })
      .then(text => {
        if (text.startsWith('<!doctype html>')) throw new Error('Not found');
        const parsed = parseMD(text);
        setArticle(parsed);
        setLoading(false);
      })
      .catch(() => {
        // Fallback to data from blog.json
        const matchedPost = blogPosts.find(p => p.slug === slug);
        
        setArticle({
          attributes: {
            title: matchedPost ? matchedPost.title : slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
            date: matchedPost ? matchedPost.date : '2026-07-11',
            category: matchedPost ? matchedPost.category : 'Cybersecurity Guides',
            reading_time: matchedPost ? matchedPost.readingTime : '5',
            thumbnail: matchedPost ? matchedPost.image : 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200'
          },
          body: `
## Introduction

In the modern enterprise, relying on single-layer defense mechanisms is a guaranteed recipe for a security breach. We explore how modern solutions map to the MITRE ATT&CK framework.

### The Problem

Ransomware operators have shifted from indiscriminate phishing to highly targeted spear-phishing and credential stuffing. Once inside, they elevate privileges and move laterally. 

* The average dwell time before detection is 21 days.
* Active Directory misconfigurations are the #1 attack vector.
* Legacy antivirus relies on signatures, which are easily evaded by polymorphic malware.

### The Solution

A Zero Trust Architecture (ZTA) combined with Endpoint Detection and Response (EDR) provides the necessary visibility. 

1. **Implement MFA everywhere:** Ensure every authentication gateway requires hardware keys.
2. **Network Segmentation:** Isolate critical assets from general employee networks.
3. **Behavioral Analysis:** Use heuristics and AI to detect anomalous behavior rather than known signatures.

> "Security is not a product, but a process." - Bruce Schneier

Investing in modern architecture pays dividends when facing Advanced Persistent Threats (APTs).
          `
        });
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-slate-350 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 text-left">
      <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors mb-10 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Blog
      </Link>

      {/* Header */}
      <div className="mb-10">
        <span className="text-[10px] font-black uppercase tracking-widest text-accent bg-accent/5 border border-accent/15 px-3 py-1 rounded-full inline-block mb-4">
          {article.attributes.category}
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
          {article.attributes.title}
        </h1>
        <div className="flex items-center gap-6 text-xs font-bold text-slate-400 uppercase tracking-widest border-y border-slate-100 py-4">
          <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {article.attributes.date}</span>
          <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {article.attributes.reading_time} Min Read</span>
        </div>
      </div>

      {/* Featured Image */}
      {article.attributes.thumbnail && (
        <div className="w-full h-[300px] md:h-[450px] rounded-[24px] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 mb-12 relative group">
          <img 
            src={article.attributes.thumbnail} 
            alt={article.attributes.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-slate prose-lg max-w-none">
        <ReactMarkdown>{article.body}</ReactMarkdown>
      </div>

      {/* Footer Share Action */}
      <div className="mt-16 pt-8 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
            <span className="font-bold text-slate-900 text-xs">CS</span>
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">CyberShelf Editorial</div>
            <div className="text-xs text-slate-500 font-medium">Security Research Team</div>
          </div>
        </div>
        <Button variant="outline" size="sm" icon={<Share2 className="w-4 h-4" />}>
          Share Article
        </Button>
      </div>
      
      {/* Related Articles Section */}
      <div className="mt-20 pt-16 border-t border-slate-100">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-extrabold text-slate-900">Related Articles</h2>
          <Link to="/blog" className="text-sm font-bold text-accent hover:text-accent-hover transition-colors flex items-center gap-1 group">
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fallbackRelated.map((post) => (
            <div key={post.slug} className="bg-white rounded-[20px] border border-slate-100 shadow-sm flex flex-col overflow-hidden hover:shadow-lg hover:shadow-slate-200/40 transition-all duration-300 group">
              <div className="h-32 overflow-hidden relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                  {post.category}
                </span>
                <Link to={`/blog/${post.slug}`} className="mb-2">
                  <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-accent transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
                <div className="mt-auto flex items-center gap-3 text-[10px] font-bold text-slate-400">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
