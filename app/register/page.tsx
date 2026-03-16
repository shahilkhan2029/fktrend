'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { UserPlus, Mail, Phone, Lock, User, ArrowRight } from 'lucide-react';
import { registerUser } from '@/lib/actions';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const res = await registerUser(formData);

    if (res.success) {
      router.push('/');
      router.refresh();
    } else {
      setError(res.error || 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white p-4 pb-20 pt-8">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden p-8 md:p-10 border border-zinc-50 animate-fade-in">
        
        <div className="w-16 h-16 bg-zinc-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-zinc-900/10">
          <UserPlus size={32} />
        </div>
        
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <Image src="/logo.svg" alt="FK TREND" width={160} height={40} className="h-12 w-auto" />
          </div>
          <h1 className="text-3xl font-serif font-black text-zinc-900 mb-2 tracking-tight">Create Account</h1>
          <p className="text-zinc-500 text-sm">Join us for a premium fashion experience</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1" htmlFor="name">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                id="name" name="name" type="text" required
                className="w-full pl-12 pr-4 py-3.5 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-zinc-900 focus:bg-white outline-none transition-all text-sm" 
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1" htmlFor="email">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                id="email" name="email" type="email" required
                className="w-full pl-12 pr-4 py-3.5 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-zinc-900 focus:bg-white outline-none transition-all text-sm" 
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1" htmlFor="phone">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                id="phone" name="phone" type="tel" required
                className="w-full pl-12 pr-4 py-3.5 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-zinc-900 focus:bg-white outline-none transition-all text-sm" 
                placeholder="+91 99999 99999"
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
                Create Account
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-zinc-500 text-xs font-medium">
            Already have an account? {' '}
            <Link href="/login" className="text-zinc-900 font-black uppercase tracking-widest hover:text-[var(--color-gold)] transition-colors underline underline-offset-4">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
