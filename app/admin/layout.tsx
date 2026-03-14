'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, CalendarCheck, Settings, LogOut, Menu, X, ChevronRight } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-zinc-50">{children}</div>;
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: ShoppingBag },
    { name: 'Bookings', href: '/admin/bookings', icon: CalendarCheck },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F9F9FB] flex">
      {/* Mobile Sidebar Backdrop */}
      <div 
        className={`fixed inset-0 z-40 bg-zinc-900/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 md:w-72 bg-zinc-950 text-white transform transition-transform duration-500 ease-soft md:translate-x-0 md:static md:inset-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col border-r border-white/5 shadow-2xl`}
      >
        <div className="h-20 md:h-24 flex items-center px-6 md:px-8 border-b border-white/5">
          <Link href="/" className="group flex items-center gap-2">
            <span className="font-serif text-xl md:text-2xl font-black tracking-tighter">FK<span className="text-[var(--color-gold)]">.</span>TREND</span>
            <span className="bg-white/10 text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded-md text-[var(--color-gold)]">Admin</span>
          </Link>
        </div>
        
        <nav className="flex-1 py-6 md:py-10 px-4 md:px-6 space-y-1 overflow-y-auto scrollbar-hide">
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 mb-4 md:mb-6 px-4">Menu Overview</p>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin');
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`group flex items-center justify-between px-4 py-3 md:px-5 md:py-4 rounded-xl md:rounded-2xl transition-all duration-300 ${
                  isActive 
                  ? 'bg-[var(--color-gold)] text-white shadow-lg shadow-[var(--color-gold)]/20' 
                  : 'text-zinc-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <item.icon size={18} className={`transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <span className="text-xs md:text-sm font-bold tracking-tight">{item.name}</span>
                </div>
                {isActive && <ChevronRight size={12} className="opacity-50" />}
              </Link>
            )
          })}
        </nav>
        
        <div className="p-4 md:p-6 mt-auto">
          <div className="bg-white/5 rounded-2xl md:rounded-[2rem] p-4 md:p-6 mb-4 md:mb-6">
             <div className="flex items-center gap-3 mb-4">
               <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-[var(--color-gold)] font-black text-xs md:text-base">A</div>
               <div>
                 <p className="text-[10px] md:text-xs font-black text-white">Administrator</p>
                 <p className="text-[9px] md:text-[10px] text-zinc-500 truncate">fk.trend@official.com</p>
               </div>
             </div>
             <form action="/api/admin/logout" method="POST">
               <button 
                 type="submit" 
                 className="w-full flex items-center justify-center gap-2 md:gap-3 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 text-[9px] md:text-xs font-black uppercase tracking-widest"
               >
                 <LogOut size={14} />
                 Sign Out
               </button>
             </form>
          </div>
          <p className="text-[9px] text-white/20 text-center uppercase tracking-widest px-4">&copy; 2024 FK TREND v2.0</p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen relative overflow-hidden">
        {/* Header */}
        <header className={`h-20 md:h-24 sticky top-0 z-30 transition-all duration-300 px-5 md:px-10 flex items-center justify-between ${
          scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-zinc-100 shadow-sm' : 'bg-transparent'
        }`}>
          <div className="flex items-center gap-3 md:gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2.5 bg-white shadow-md rounded-lg text-zinc-900 border border-zinc-100 active:scale-95 transition-all"
            >
              <Menu size={18} />
            </button>
            <h1 className="text-lg md:text-2xl font-serif font-black text-zinc-900 tracking-tight">
              {navItems.find(item => pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin'))?.name || 'Dashboard Overview'}
            </h1>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6">
            <Link href="/" className="hidden sm:flex text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 border border-zinc-200 px-4 md:px-6 py-2 md:py-2.5 rounded-full transition-all">
              Live Preview
            </Link>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-zinc-900 text-white flex items-center justify-center text-xs md:text-sm font-black shadow-lg shadow-zinc-900/20">
              AD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-5 md:p-10 flex-1">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
