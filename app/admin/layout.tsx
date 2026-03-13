'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, CalendarCheck, Tags, Settings, LogOut } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Hide sidebar on login page
  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-zinc-50">{children}</div>;
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: ShoppingBag },
    { name: 'Bookings', href: '/admin/bookings', icon: CalendarCheck },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-200 flex flex-col fixed inset-y-0 z-10 hidden md:flex">
        <div className="h-20 flex items-center px-6 border-b border-zinc-800">
          <Link href="/" className="font-serif text-2xl font-bold text-white tracking-tight">FK Trend <span className="text-[var(--color-gold)] text-sm ml-2">ADMIN</span></Link>
        </div>
        
        <nav className="flex-1 py-8 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin');
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive ? 'bg-[var(--color-gold)] text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            )
          })}
        </nav>
        
        <div className="p-4 border-t border-zinc-800">
          <form action="/api/admin/logout" method="POST">
            <button type="submit" className="flex w-full items-center gap-3 px-4 py-3 rounded-lg font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
              <LogOut size={20} />
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <header className="h-20 bg-white border-b border-zinc-200 flex items-center justify-between px-8 sticky top-0 z-10 hidden md:flex">
          <h1 className="text-xl font-semibold text-zinc-800 tracking-tight">Admin Portal</h1>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-900 font-bold">
              A
            </div>
          </div>
        </header>
        <div className="p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
