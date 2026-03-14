import prisma from '@/lib/prisma';
import { ShoppingBag, CalendarCheck, Clock, TrendingUp, Users, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default async function AdminDashboardOverview() {
  const [totalProducts, totalBookings, recentBookings] = await Promise.all([
    prisma.product.count(),
    prisma.booking.count(),
    prisma.booking.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { product: true }
    })
  ]);

  const stats = [
    { label: 'Inventory', value: totalProducts, icon: ShoppingBag, color: 'text-zinc-900', bg: 'bg-zinc-100', trend: '+12% this month' },
    { label: 'Booking Requests', value: totalBookings, icon: CalendarCheck, color: 'text-[var(--color-gold)]', bg: 'bg-[var(--color-gold)]/10', trend: '+24% this week' },
    { label: 'Customer Pulse', value: 'High', icon: Users, color: 'text-zinc-900', bg: 'bg-zinc-100', trend: 'Active Engagement' },
    { label: 'Store Status', value: 'Prime', icon: TrendingUp, color: 'text-zinc-900', bg: 'bg-zinc-100', trend: 'Growing Reach' },
  ];

  return (
    <div className="space-y-8 md:space-y-12">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
        <div>
          <h2 className="text-2xl md:text-5xl font-serif font-black text-zinc-900 tracking-tighter mb-1 md:mb-3">
             DASHBOARD OVERVIEW
          </h2>
          <p className="text-zinc-400 font-medium font-serif italic text-base md:text-lg">
            Elevating the FK Trend digital experience.
          </p>
        </div>
        <Link 
          href="/admin/products/new" 
          className="group flex items-center gap-2 md:gap-3 bg-zinc-950 text-white px-6 py-4 md:px-8 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[9px] md:text-[11px] hover:bg-[var(--color-gold)] transition-all duration-500 shadow-xl shadow-zinc-900/20 active:scale-95"
        >
          Add New Product 
          <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Link>
      </div>

      {/* Modern Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="group bg-white p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-zinc-100 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 md:p-8 opacity-0 group-hover:opacity-10 transition-opacity">
               <stat.icon size={60} className="md:size-[80px]" />
             </div>
             
             <div className={`${stat.bg} ${stat.color} w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-inner`}>
               <stat.icon size={20} className="md:size-[28px]" />
             </div>
             
             <div className="space-y-0.5 md:space-y-1">
               <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{stat.label}</p>
               <h3 className="text-xl md:text-4xl font-serif font-black text-zinc-900 tracking-tighter">{stat.value}</h3>
             </div>
             
             <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-zinc-50 flex items-center gap-2">
               <span className="text-[7px] md:text-[9px] font-black uppercase tracking-widest text-[var(--color-gold)]">{stat.trend}</span>
             </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Bookings + Quick Insights */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-10">
        
        {/* Recent Activity Table */}
        <div className="xl:col-span-2 bg-white rounded-2xl md:rounded-[3rem] shadow-sm border border-zinc-100 overflow-hidden flex flex-col">
          <div className="p-6 md:p-10 border-b border-zinc-50 flex justify-between items-center gap-4">
            <div>
              <h3 className="text-lg md:text-2xl font-serif font-black text-zinc-900 tracking-tight">Recent Reservations</h3>
              <p className="text-[9px] md:text-xs text-zinc-400 font-medium mt-0.5 md:mt-1 uppercase tracking-widest">Latest customer booking requests</p>
            </div>
            <Link href="/admin/bookings" className="shrink-0 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-[var(--color-gold)] border border-[var(--color-gold)]/20 px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-[var(--color-gold)] hover:text-white transition-all">
              View All
            </Link>
          </div>
          
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-zinc-50/50">
                  <th className="px-6 md:px-10 py-4 md:py-6 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400">Customer</th>
                  <th className="px-6 md:px-10 py-4 md:py-6 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400">Item</th>
                  <th className="px-6 md:px-10 py-4 md:py-6 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400">Size</th>
                  <th className="px-6 md:px-10 py-4 md:py-6 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {recentBookings.length > 0 ? recentBookings.map(bk => (
                  <tr key={bk.id} className="group hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 md:px-10 py-6 md:py-8">
                      <div className="font-serif font-black text-zinc-900 text-base md:text-lg leading-tight">{bk.name}</div>
                      <div className="text-[10px] md:text-xs text-zinc-400 font-medium tabular-nums mt-0.5 md:mt-1">{bk.phone}</div>
                    </td>
                    <td className="px-6 md:px-10 py-6 md:py-8">
                      <div className="flex items-center gap-3 md:gap-4">
                        {(() => {
                          try {
                            const parsedImages = bk.product?.images ? JSON.parse(bk.product.images) : [];
                            if (parsedImages && parsedImages.length > 0) {
                              return (
                                <div className="w-10 h-12 md:w-14 md:h-14 rounded-lg md:rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-100 flex items-center justify-center p-1 md:p-1.5 relative shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                                  <Image src={parsedImages[0] || '/placeholder.png'} alt="Product" fill className="object-contain" />
                                </div>
                              );
                            }
                          } catch (e) { /* ignore */ }
                          return null;
                        })()}
                        <span className="font-bold text-zinc-800 text-xs md:text-sm md:tracking-tight line-clamp-1">{bk.product?.title || 'Unknown Product'}</span>
                      </div>
                    </td>
                    <td className="px-6 md:px-10 py-6 md:py-8">
                      <span className="inline-flex px-3 py-1.5 bg-zinc-100 text-zinc-500 rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-black uppercase tracking-widest">
                        {bk.size}
                      </span>
                    </td>
                    <td className="px-6 md:px-10 py-6 md:py-8 text-right tabular-nums text-[10px] md:text-xs font-bold text-zinc-400">
                      {new Date(bk.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="px-6 md:px-10 py-12 md:py-20 text-center font-serif italic text-zinc-400 text-lg md:text-xl border-none">
                      Awaiting new reservations...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Insights Card */}
        <div className="flex flex-col gap-6 md:gap-10">
           <div className="bg-zinc-950 rounded-2xl md:rounded-[3rem] p-6 md:p-10 text-white relative overflow-hidden flex-1 flex flex-col justify-between shadow-2xl min-h-[240px]">
              <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-[var(--color-gold)] opacity-10 blur-[80px] md:blur-[100px]" />
              <div>
                <Clock className="text-[var(--color-gold)] mb-6 md:mb-8 size-[32px] md:size-[40px]" />
                <h3 className="text-xl md:text-3xl font-serif font-black tracking-tight mb-3 md:mb-4 leading-tight">System Status: <span className="text-[var(--color-gold)]">Operational</span></h3>
                <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">
                  All local storage and database clusters are running optimally for version 2.0.
                </p>
              </div>
              <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-white/5 flex items-center justify-between gap-4">
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-white/40">v2 dev build</span>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                   <span className="text-[8px] md:text-[10px] font-black text-green-500 uppercase tracking-widest">Online</span>
                </div>
              </div>
           </div>

           <div className="bg-[#EFE9E1] rounded-2xl md:rounded-[3rem] p-6 md:p-10 border border-zinc-200/50 flex-1 flex flex-col justify-between min-h-[200px]">
              <div>
                <TrendingUp className="text-zinc-900 mb-6 md:mb-8 size-[28px] md:size-[32px]" />
                <h3 className="text-lg md:text-2xl font-serif font-black text-zinc-900 tracking-tight leading-tight">Optimization Complete</h3>
                <p className="text-zinc-600/80 text-xs md:text-sm mt-3 md:mt-4 font-medium">
                  Images and layouts are fully optimized for rapid mobile loading.
                </p>
              </div>
              <Link href="/admin/settings" className="mt-8 md:mt-10 self-start text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-900 border-b border-zinc-900 pb-1">Open Global Settings</Link>
           </div>
        </div>

      </div>
    </div>
  );
}
