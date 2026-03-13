import { getUserBookings } from '@/lib/actions';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, ChevronRight, Calendar, Phone } from 'lucide-react';

export default async function BookingsPage() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  const bookings = await getUserBookings();

  return (
    <div className="min-h-screen bg-zinc-50/50 py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-serif font-black text-zinc-900 mb-2 tracking-tight">My Bookings</h1>
            <p className="text-zinc-500">Track and manage your in-store reservations</p>
          </div>
          <Link 
            href="/shop" 
            className="inline-flex items-center gap-2 bg-zinc-900 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-900/10"
          >
            <ShoppingBag size={16} />
            Explore More
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-zinc-100 shadow-sm animate-fade-in">
            <div className="w-20 h-20 bg-zinc-50 text-zinc-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={40} />
            </div>
            <h2 className="text-xl font-bold text-zinc-900 mb-2">No bookings yet</h2>
            <p className="text-zinc-500 mb-8 max-w-xs mx-auto">You haven't reserved any items. Start exploring our premium collection.</p>
            <Link href="/shop" className="text-zinc-900 font-black uppercase tracking-widest text-xs underline underline-offset-8 decoration-2 decoration-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors">
              Go to Shop
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div 
                key={booking.id} 
                className="bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm hover:shadow-md transition-all group animate-fade-in"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative w-full md:w-32 h-40 bg-zinc-100 rounded-2xl overflow-hidden shrink-0">
                    <Image 
                      src={booking.product.images[0] || '/placeholder.png'} 
                      alt={booking.product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-between py-1">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{booking.product.category}</span>
                        <div className="px-3 py-1 bg-zinc-50 text-zinc-500 text-[9px] font-black uppercase tracking-widest rounded-full">
                          Pending Confirmation
                        </div>
                      </div>
                      <h3 className="text-xl font-serif font-bold text-zinc-900 mb-1 group-hover:text-[var(--color-gold)] transition-colors">{booking.product.title}</h3>
                      <div className="flex flex-wrap gap-4 text-xs text-zinc-500 font-medium mt-3">
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
                          Size: <span className="text-zinc-900 font-bold">{booking.size}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} className="text-zinc-300" />
                          {new Date(booking.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-zinc-50 flex items-center justify-between">
                      <div className="text-lg font-black text-zinc-900">
                        ₹{booking.product.price.toLocaleString('en-IN')}
                      </div>
                      <Link 
                        href={`/shop/${booking.productId}`} 
                        className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors"
                      >
                        View Product <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
