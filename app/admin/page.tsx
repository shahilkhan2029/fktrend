import prisma from '@/lib/prisma';
import { ShoppingBag, CalendarCheck, Clock, TrendingUp } from 'lucide-react';
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

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-zinc-900 mb-2">Dashboard Overview</h1>
          <p className="text-zinc-600">Welcome back. Here's what's happening at FK Trend today.</p>
        </div>
        <Link href="/admin/products/new" className="bg-[var(--color-gold)] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#b5953c] transition-colors shadow-sm">
          + Add New Product
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 flex items-center gap-4">
          <div className="w-14 h-14 bg-zinc-100 rounded-xl flex items-center justify-center text-zinc-900">
            <ShoppingBag size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-500 mb-1">Total Products</p>
            <h3 className="text-3xl font-bold text-zinc-900">{totalProducts}</h3>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <CalendarCheck size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-500 mb-1">Total Bookings</p>
            <h3 className="text-3xl font-bold text-zinc-900">{totalBookings}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 flex items-center gap-4">
          <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-500 mb-1">Status</p>
            <h3 className="text-xl font-bold text-zinc-900 mt-2">Active Tracker</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 flex items-center gap-4">
          <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-500 mb-1">Store Views</p>
            <h3 className="text-xl font-bold text-zinc-900 mt-2">Growing</h3>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
        <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
          <h2 className="text-xl font-serif font-bold text-zinc-900">Recent Booking Requests</h2>
          <Link href="/admin/bookings" className="text-sm font-medium text-[var(--color-gold)] hover:underline">
            View All
          </Link>
        </div>
        
        {recentBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-zinc-50 text-zinc-500 text-sm uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-medium border-b border-zinc-100">Customer</th>
                  <th className="px-6 py-4 font-medium border-b border-zinc-100">Item</th>
                  <th className="px-6 py-4 font-medium border-b border-zinc-100">Size</th>
                  <th className="px-6 py-4 font-medium border-b border-zinc-100">Date/Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {recentBookings.map(bk => (
                  <tr key={bk.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-zinc-900">{bk.name}</div>
                      <div className="text-sm text-zinc-500">{bk.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {(() => {
                          try {
                            const parsedImages = bk.product?.images ? JSON.parse(bk.product.images) : [];
                            if (parsedImages && parsedImages.length > 0) {
                              return (
                                <div className="w-10 h-10 rounded-md overflow-hidden bg-zinc-100 relative shrink-0">
                                  <Image src={parsedImages[0] || '/placeholder.png'} alt="Product" fill className="object-cover" />
                                </div>
                              );
                            }
                          } catch (e) {
                            // ignore
                          }
                          return null;
                        })()}
                        <span className="font-medium text-zinc-900 max-w-[200px] truncate">{bk.product?.title || 'Unknown Product'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 bg-zinc-100 text-zinc-700 rounded-md text-sm font-medium">
                        {bk.size}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-zinc-600 text-sm">
                      {new Date(bk.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-zinc-500">
            No booking requests yet.
          </div>
        )}
      </div>

    </div>
  );
}
