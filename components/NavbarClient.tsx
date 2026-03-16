'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X, Search, Heart, User, LogOut, ChevronDown, ChevronRight } from 'lucide-react';
import { logoutUser } from '@/lib/actions';

interface NavbarClientProps {
  user: { id: string; email: string; name: string } | null;
}

export default function NavbarClient({ user }: NavbarClientProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

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
    { name: 'Shirts', href: '/shop?category=Shirts' },
    { name: 'T-Shirts', href: '/shop?category=T-Shirts' },
    { name: 'Jeans', href: '/shop?category=Jeans' },
    { name: 'Footwear', href: '/shop?category=Footwear' },
    { name: 'Undergarments', href: '/shop?category=Undergarments' },
    { name: 'Perfume', href: '/shop?category=Perfume' },
    { name: 'Caps', href: '/shop?category=Caps' },
    { name: 'Belts', href: '/shop?category=Belts' },
    { name: 'Accessories', href: '/shop?category=Accessories' },
  ];

  return (
    <>
      <nav 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' : 'bg-white py-4'
        } border-b border-zinc-100`}
      >
        <div className="container-custom flex items-center justify-between">
          <div className="flex items-center gap-4 lg:gap-8">
            <button 
              className="lg:hidden p-2 -ml-2 text-zinc-900 hover:text-[var(--color-gold)] transition-colors" 
              onClick={toggleMenu} 
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo.svg" 
                alt="FK TREND" 
                width={160} 
                height={40} 
                className="h-8 md:h-9 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
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
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
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

          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2 text-zinc-900 hover:text-[var(--color-gold)] transition-colors" aria-label="Search">
              <Search size={20} />
            </button>
            <button className="hidden sm:block p-2 text-zinc-900 hover:text-[var(--color-gold)] transition-colors" aria-label="Favorites">
              <Heart size={20} />
            </button>
            
            <div className="relative">
              {user ? (
                <div 
                  className="flex items-center gap-2 cursor-pointer p-1 hover:bg-zinc-50 rounded-full transition-all"
                  onMouseEnter={() => setIsUserMenuOpen(true)}
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center text-[10px] font-black">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown size={14} className={`hidden md:block text-zinc-400 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  
                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full pt-2 w-48 animate-in fade-in slide-in-from-top-1 z-[60]">
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
                  <User size={20} />
                  <span className="hidden lg:block text-[10px] font-black uppercase tracking-widest">Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sliding Navigation Backdrop */}
      <div 
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      />

      {/* Mobile Sliding Navigation Panel */}
      <div 
        className={`fixed inset-y-0 left-0 z-[60] w-[80%] max-w-[320px] bg-white shadow-2xl transform transition-transform duration-500 ease-soft lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
            <Link href="/" onClick={toggleMenu}>
              <Image 
                src="/logo.svg" 
                alt="FK TREND" 
                width={120} 
                height={30} 
                className="h-7 w-auto object-contain"
              />
            </Link>
            <button onClick={toggleMenu} className="p-2 -mr-2 text-zinc-400 hover:text-zinc-900 transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-8 px-6 space-y-8">
            <div className="space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Navigation</p>
              <div className="flex flex-col gap-4">
                <Link href="/" className="text-xl font-bold text-zinc-900 flex items-center justify-between group">
                  Home <ChevronRight size={18} className="text-zinc-300 group-hover:text-zinc-900 transition-colors" />
                </Link>
                <Link href="/shop" className="text-xl font-bold text-zinc-900 flex items-center justify-between group">
                  Shop <ChevronRight size={18} className="text-zinc-300 group-hover:text-zinc-900 transition-colors" />
                </Link>
                <Link href="/shop?badge=New" className="text-xl font-bold text-zinc-900 flex items-center justify-between group">
                  New Arrivals <ChevronRight size={18} className="text-zinc-300 group-hover:text-zinc-900 transition-colors" />
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Collections</p>
              <div className="grid grid-cols-1 gap-3">
                {categories.map(cat => (
                  <Link 
                    key={cat.name} 
                    href={cat.href}
                    className="flex items-center justify-between px-4 py-3 bg-zinc-50 rounded-xl text-sm font-bold text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 transition-all"
                  >
                    {cat.name}
                    <ChevronRight size={14} className="text-zinc-300" />
                  </Link>
                ))}
              </div>
            </div>

            {user ? (
              <div className="space-y-6">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Account</p>
                <div className="flex flex-col gap-4">
                  <Link href="/profile" className="text-lg font-bold text-zinc-700">My Profile</Link>
                  <Link href="/bookings" className="text-lg font-bold text-zinc-700">My Bookings</Link>
                  <button onClick={handleLogout} className="text-lg font-bold text-red-500 text-left">Logout</button>
                </div>
              </div>
            ) : (
              <div className="pt-4 border-t border-zinc-100 space-y-4">
                <Link 
                  href="/login" 
                  className="block w-full text-center bg-zinc-900 text-white font-bold py-4 rounded-xl shadow-lg shadow-zinc-900/10"
                >
                  Sign In
                </Link>
                <Link 
                  href="/register" 
                  className="block w-full text-center bg-white border border-zinc-200 text-zinc-900 font-bold py-4 rounded-xl"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>

          <div className="p-6 bg-zinc-50 border-t border-zinc-100">
            <p className="text-[10px] text-zinc-400 text-center uppercase tracking-widest">&copy; 2024 FK TREND</p>
          </div>
        </div>
      </div>
    </>
  );
}
