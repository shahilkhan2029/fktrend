'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, Heart, User, LogOut, ChevronDown } from 'lucide-react';
import { logoutUser } from '@/lib/actions';

interface NavbarClientProps {
  user: { id: string; email: string; name: string } | null;
}

export default function NavbarClient({ user }: NavbarClientProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Do not show global navbar on admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    await logoutUser();
    window.location.reload();
  };

  const categories = [
    { name: 'T-Shirts', href: '/shop?category=T-Shirts' },
    { name: 'Shirts', href: '/shop?category=Shirts' },
    { name: 'Jeans', href: '/shop?category=Jeans' },
    { name: 'Trousers', href: '/shop?category=Trousers' },
    { name: 'Accessories', href: '/shop?category=Accessories' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 border-b border-zinc-100 transition-all duration-300">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-serif text-xl font-black tracking-tighter text-zinc-900 group">
            FK<span className="text-[var(--color-gold)]">.</span>TREND
          </Link>

          <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="text-[12px] font-bold uppercase tracking-widest text-zinc-900 hover:text-[var(--color-gold)] transition-colors">Home</Link>
            <Link href="/shop" className="text-[12px] font-bold uppercase tracking-widest text-zinc-900 hover:text-[var(--color-gold)] transition-colors">Shop</Link>
            
            {/* Categories Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <Link 
                href="/categories" 
                className={`text-[12px] font-bold uppercase tracking-widest text-zinc-900 hover:text-[var(--color-gold)] transition-colors flex items-center gap-1 ${isDropdownOpen ? 'text-[var(--color-gold)]' : ''}`}
              >
                Categories
                <svg className={`w-3 h-3 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              
              {/* Dropdown Menu */}
              <div className={`absolute left-0 top-full pt-4 transition-all duration-300 ${isDropdownOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}`}>
                <div className="bg-white border border-zinc-100 shadow-2xl rounded-2xl overflow-hidden min-w-[200px] py-4">
                  {categories.map((cat) => (
                    <Link 
                      key={cat.name} 
                      href={cat.href}
                      className="block px-6 py-3 text-[11px] font-bold uppercase tracking-widest text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-all"
                    >
                      {cat.name}
                    </Link>
                  ))}
                  <div className="border-t border-zinc-50 mt-2 pt-2">
                    <Link href="/categories" className="block px-6 py-3 text-[11px] font-black uppercase tracking-widest text-[var(--color-gold)] hover:bg-zinc-50">View All</Link>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/shop?badge=New" className="text-[12px] font-bold uppercase tracking-widest text-zinc-900 hover:text-[var(--color-gold)] transition-colors">New Arrivals</Link>
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            <button className="p-2 text-zinc-900 hover:text-[var(--color-gold)] transition-colors">
              <Search size={18} />
            </button>
            <button className="hidden sm:block p-2 text-zinc-900 hover:text-[var(--color-gold)] transition-colors">
              <Heart size={18} />
            </button>
            
            <div className="relative">
              {user ? (
                <div 
                  className="flex items-center gap-2 cursor-pointer p-2 hover:bg-zinc-50 rounded-lg transition-all"
                  onMouseEnter={() => setIsUserMenuOpen(true)}
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center text-[10px] font-black">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown size={14} className={`text-zinc-400 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  
                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full pt-2 w-48 animate-fade-in z-[60]">
                      <div className="bg-white border border-zinc-100 shadow-2xl rounded-2xl overflow-hidden py-2">
                        <div className="px-4 py-3 border-b border-zinc-50 mb-1">
                          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Signed in as</p>
                          <p className="text-xs font-bold text-zinc-900 truncate">{user.name}</p>
                        </div>
                        <Link href="/profile" className="block px-4 py-2 text-xs font-bold text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-all">My Profile</Link>
                        <Link href="/bookings" className="block px-4 py-2 text-xs font-bold text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-all">My Bookings</Link>
                        <button 
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 flex items-center gap-2 transition-all border-t border-zinc-50 mt-1"
                        >
                          <LogOut size={14} /> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  href="/login" 
                  className="p-2 text-zinc-900 hover:text-[var(--color-gold)] transition-colors flex items-center gap-2"
                >
                  <User size={18} />
                  <span className="hidden lg:block text-[10px] font-black uppercase tracking-widest">Sign In</span>
                </Link>
              )}
            </div>

            <button className="md:hidden p-2 text-zinc-900 hover:text-[var(--color-gold)] transition-colors" onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-white pt-24 px-8 md:hidden flex flex-col gap-6 transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <Link href="/" className="text-2xl font-serif font-bold text-zinc-900 border-b border-zinc-100 pb-4" onClick={toggleMenu}>Home</Link>
        <Link href="/shop" className="text-2xl font-serif font-bold text-zinc-900 border-b border-zinc-100 pb-4" onClick={toggleMenu}>Shop</Link>
        <Link href="/categories" className="text-2xl font-serif font-bold text-zinc-900 border-b border-zinc-100 pb-4" onClick={toggleMenu}>Categories</Link>
        
        {user ? (
          <>
            <Link href="/profile" className="text-2xl font-serif font-bold text-zinc-900 border-b border-zinc-100 pb-4" onClick={toggleMenu}>My Profile</Link>
            <Link href="/bookings" className="text-2xl font-serif font-bold text-zinc-900 border-b border-zinc-100 pb-4" onClick={toggleMenu}>My Bookings</Link>
            <button 
              onClick={handleLogout}
              className="text-2xl font-serif font-bold text-red-500 text-left border-b border-zinc-100 pb-4"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-2xl font-serif font-bold text-zinc-900 border-b border-zinc-100 pb-4" onClick={toggleMenu}>Sign In</Link>
            <Link href="/register" className="text-2xl font-serif font-bold text-zinc-900 border-b border-zinc-100 pb-4" onClick={toggleMenu}>Create Account</Link>
          </>
        )}
      </div>
    </>
  );
}
