import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, ShieldCheck, Globe } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError(null);
    setLoading(true);

    // Simulate network request
    setTimeout(() => {
      setLoading(false);
      // Navigate to home anyway for demonstration purposes since we have no backend
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-[85vh] bg-slate-50 flex items-center justify-center relative overflow-hidden py-20 px-6">
      {/* Background Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />
      <div className="absolute -top-[40%] -right-[20%] w-[80%] h-[80%] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-slate-900/5 blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white rounded-[24px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          {/* Header */}
          <div className="bg-slate-950 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-accent/30">
                <ShieldCheck className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">Secure Access</h2>
              <p className="text-sm text-slate-400 mt-2 font-medium">Enter your credentials to access your library</p>
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSignIn} className="flex flex-col gap-5">
              {error && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-xs font-semibold text-red-600 text-center animate-pulse">
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="agent@ciphershelf.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-slate-900 outline-none focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
                  <a href="#" className="text-xs font-bold text-accent hover:text-accent/80 transition-colors">Forgot?</a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-slate-900 outline-none focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  />
                </div>
              </div>

              <Button 
                variant="accent" 
                size="lg" 
                className={`w-full mt-2 justify-center font-bold text-sm tracking-wide ${loading ? 'opacity-80' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Authenticate <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </Button>

              <div className="relative flex items-center justify-center mt-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-100" />
                </div>
                <div className="relative px-4 bg-white text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Or continue with
                </div>
              </div>

              <button 
                type="button"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm font-bold text-slate-700 mt-2"
              >
                <Globe className="w-4 h-4" />
                SSO Portal
              </button>
            </form>
          </div>

          <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-500">
              Don't have an account? <a href="#" className="text-slate-900 font-bold hover:text-accent transition-colors">Request Access</a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
