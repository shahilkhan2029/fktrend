'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogIn, Mail, Lock, ArrowRight } from 'lucide-react';
import { loginUser } from '@/lib/actions';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const res = await loginUser(formData);

    if (res.success) {
      if ((res as any).isAdmin) {
        router.push('/admin');
      } else {
        router.push('/');
      }
      router.refresh();
    } else {
      setError(res.error || 'Invalid identifier or password');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white p-4 pb-20 pt-8">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden p-8 md:p-10 border border-zinc-50 animate-fade-in">
        
        <div className="w-16 h-16 bg-zinc-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-zinc-900/10">
          <LogIn size={32} />
        </div>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif font-black text-zinc-900 mb-2 tracking-tight">Welcome Back</h1>
          <p className="text-zinc-500 text-sm">Sign in to your FK Trend account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1" htmlFor="identifier">Email or Phone</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                id="identifier" name="identifier" type="text" required
                className="w-full pl-12 pr-4 py-3.5 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-zinc-900 focus:bg-white outline-none transition-all text-sm" 
                placeholder="email@example.com or 9988776655"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1" htmlFor="password">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                id="password" name="password" type="password" required
                className="w-full pl-12 pr-4 py-3.5 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-zinc-900 focus:bg-white outline-none transition-all text-sm" 
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Link href="/forgot-password" title="Forgot Password" className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors">
              Forgot Password?
            </Link>
          </div>

          {error && <p className="text-red-500 text-xs font-bold text-center bg-red-50 py-3 rounded-lg border border-red-100 animate-shake">{error}</p>}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-zinc-900 text-white font-black py-4 rounded-xl hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-900/10 text-xs uppercase tracking-[0.2em] flex items-center justify-center disabled:opacity-70 group"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-zinc-400 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                Sign In
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-zinc-500 text-xs font-medium">
            Don't have an account? {' '}
            <Link href="/register" className="text-zinc-900 font-black uppercase tracking-widest hover:text-[var(--color-gold)] transition-colors underline underline-offset-4">
              Join Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
