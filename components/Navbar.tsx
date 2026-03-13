'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/90 border-b border-zinc-200 transition-all duration-300">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-zinc-900">
            FK Trend
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">Home</Link>
            <Link href="/shop" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">Shop</Link>
            <Link href="/categories" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">Categories</Link>
            <Link href="/about" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">About Us</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/shop" className="p-2 text-zinc-600 hover:text-zinc-900 transition-colors">
              <Search size={20} />
            </Link>
            <button className="md:hidden p-2 text-zinc-600 hover:text-zinc-900 transition-colors" onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden flex flex-col gap-6 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <Link href="/" className="text-xl font-medium" onClick={toggleMenu}>Home</Link>
        <Link href="/shop" className="text-xl font-medium" onClick={toggleMenu}>Shop</Link>
        <Link href="/categories" className="text-xl font-medium" onClick={toggleMenu}>Categories</Link>
        <Link href="/about" className="text-xl font-medium" onClick={toggleMenu}>About Us</Link>
        <Link href="/contact" className="text-xl font-medium" onClick={toggleMenu}>Contact</Link>
      </div>
    </>
  );
}
