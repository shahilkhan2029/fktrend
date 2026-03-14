import prisma from '@/lib/prisma';
import Image from 'next/image';
import { Mail, Phone, ExternalLink, CalendarCheck } from 'lucide-react';

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: 'desc' },
    include: { product: true }
  });

  return (
    <div className="space-y-6 md:space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
        <div>
          <h2 className="text-2xl md:text-5xl font-serif font-black text-zinc-900 tracking-tighter mb-1 md:mb-3 uppercase">
             Reservations
          </h2>
          <p className="text-zinc-400 font-medium font-serif italic text-base md:text-lg">
            Manage your exclusive customer requests.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl md:rounded-[3rem] shadow-sm border border-zinc-100 overflow-hidden flex flex-col transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-200/50">
        {bookings.length > 0 ? (
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left border-collapse min-w-[800px] md:min-w-0">
              <thead>
                <tr className="bg-zinc-50/50">
                  <th className="px-6 md:px-10 py-5 md:py-8 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400">Arrival Timeline</th>
                  <th className="px-6 md:px-10 py-5 md:py-8 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400">Guest Details</th>
                  <th className="px-6 md:px-10 py-5 md:py-8 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400">Exclusive Item</th>
                  <th className="px-6 md:px-10 py-5 md:py-8 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400">Message</th>
                  <th className="px-6 md:px-10 py-5 md:py-8 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400 text-right">Concierge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {bookings.map(bk => (
                  <tr key={bk.id} className="group hover:bg-zinc-50/30 transition-colors">
                    <td className="px-6 md:px-10 py-6 md:py-10">
                      <div className="text-xs md:text-sm font-black text-zinc-900 tabular-nums">
                        {new Date(bk.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </div>
                      <div className="text-[8px] md:text-[10px] font-bold text-zinc-400 mt-1 uppercase tracking-widest">{new Date(bk.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
                    </td>
                    <td className="px-6 md:px-10 py-6 md:py-10">
                      <div className="font-serif font-black text-zinc-900 text-lg md:text-xl leading-tight">{bk.name}</div>
                      <div className="inline-flex items-center gap-1 md:gap-2 mt-1.5 md:mt-2 px-2.5 py-1 bg-zinc-100 rounded-full text-[8px] md:text-[10px] font-black text-zinc-500 whitespace-nowrap">
                        <Phone size={10} className="text-[var(--color-gold)]" />
                        {bk.phone}
                      </div>
                    </td>
                    <td className="px-6 md:px-10 py-6 md:py-10">
                      <div className="flex items-center gap-3 md:gap-5">
                        {(() => {
                          try {
                            const parsedImages = bk.product?.images ? JSON.parse(bk.product.images) : [];
                            if (parsedImages && parsedImages.length > 0) {
                              return (
                                <div className="w-12 h-16 md:w-16 md:h-20 rounded-xl md:rounded-2xl overflow-hidden bg-white border border-zinc-100 flex items-center justify-center p-1.5 md:p-2 relative shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-500">
                                  <Image src={parsedImages[0] || '/placeholder.png'} alt="Product" fill className="object-contain" />
                                </div>
                              );
                            }
                          } catch (e) { /* ignore */ }
                          return null;
                        })()}
                        <div className="space-y-1 md:space-y-1.5">
                          <div className="font-bold text-zinc-900 text-xs md:text-sm leading-snug max-w-[150px] md:max-w-[200px] line-clamp-1">{bk.product?.title || 'Unknown Product'}</div>
                          <span className="inline-block px-2.5 py-0.5 md:px-3 md:py-1 bg-zinc-900 text-white rounded-md md:rounded-lg text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em]">
                            Size: {bk.size}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 md:px-10 py-6 md:py-10">
                      <p className="text-xs md:text-sm text-zinc-500 leading-relaxed max-w-[200px] md:max-w-[240px] italic line-clamp-2 md:line-clamp-none">
                        {bk.message ? `"${bk.message}"` : <span className="text-zinc-300 not-italic uppercase text-[8px] md:text-[10px] tracking-widest font-black">No inquiry message</span>}
                      </p>
                    </td>
                    <td className="px-6 md:px-10 py-6 md:py-10 text-right">
                      <a 
                        href={`https://wa.me/${bk.phone.replace(/[^0-9]/g, '')}?text=Hi ${bk.name}, we received your booking request for ${bk.product?.title}.`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="group/btn inline-flex items-center gap-2 md:gap-3 px-4 py-3 md:px-6 md:py-4 bg-zinc-950 text-white rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[var(--color-gold)] transition-all duration-500 shadow-xl shadow-zinc-900/10 active:scale-95"
                      >
                        WhatsApp
                        <ExternalLink size={12} className="md:size-[14px] group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-16 md:p-24 text-center">
            <div className="w-16 h-16 md:w-24 md:h-24 bg-zinc-50 rounded-2xl md:rounded-[2.5rem] flex items-center justify-center text-zinc-200 mx-auto mb-6 md:mb-8 shadow-inner">
               <CalendarCheck size={32} className="md:size-[40px]" />
            </div>
            <h3 className="text-xl md:text-2xl font-serif font-black text-zinc-900 mb-2 md:mb-3 tracking-tight uppercase">Quiet on the Front</h3>
            <p className="text-zinc-400 font-medium italic font-serif text-sm md:text-base">Awaiting the next wave of style reservations...</p>
          </div>
        )}
      </div>
    </div>
  );
}
