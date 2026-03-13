import prisma from '@/lib/prisma';
import Image from 'next/image';

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: 'desc' },
    include: { product: true }
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-zinc-900 mb-2">Booking Requests</h1>
        <p className="text-zinc-600">Review and manage customer reservation requests.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
        {bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-zinc-50 text-zinc-500 text-sm uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-medium border-b border-zinc-100">Date</th>
                  <th className="px-6 py-4 font-medium border-b border-zinc-100">Customer Details</th>
                  <th className="px-6 py-4 font-medium border-b border-zinc-100">Reserved Item</th>
                  <th className="px-6 py-4 font-medium border-b border-zinc-100">Message</th>
                  <th className="px-6 py-4 font-medium border-b border-zinc-100 text-right">Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {bookings.map(bk => (
                  <tr key={bk.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4 text-zinc-600 font-medium">
                      {new Date(bk.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      <div className="text-xs text-zinc-400 mt-1">{new Date(bk.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-zinc-900 leading-tight">{bk.name}</div>
                      <div className="text-sm text-zinc-500 mt-1">{bk.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {(() => {
                          try {
                            const parsedImages = bk.product?.images ? JSON.parse(bk.product.images) : [];
                            if (parsedImages && parsedImages.length > 0) {
                              return (
                                <div className="w-12 h-14 rounded-md overflow-hidden bg-zinc-100 relative shrink-0 shadow-sm border border-zinc-200">
                                  <Image src={parsedImages[0] || '/placeholder.png'} alt="Product" fill className="object-cover" />
                                </div>
                              );
                            }
                          } catch (e) {
                            // ignore parse error and return null
                          }
                          return null;
                        })()}
                        <div>
                          <div className="font-medium text-zinc-900 mb-1 leading-snug">{bk.product?.title || 'Unknown Product'}</div>
                          <span className="inline-block px-2.5 py-0.5 bg-zinc-100 text-zinc-700 rounded text-xs font-semibold border border-zinc-200">
                            Size: {bk.size}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-zinc-600 max-w-xs">{bk.message || <span className="text-zinc-400 italic">No message</span>}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a 
                        href={`https://wa.me/${bk.phone.replace(/[^0-9]/g, '')}?text=Hi ${bk.name}, we received your booking request for ${bk.product?.title}.`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center justify-center px-4 py-2 bg-[#25D366] text-white rounded-lg text-sm font-medium hover:bg-[#20bd5a] transition-colors shadow-sm"
                      >
                        WhatsApp
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-16 text-center text-zinc-500">
            <h3 className="text-xl font-medium text-zinc-900 mb-2">No bookings yet</h3>
            <p>Customers haven't booked any products. Requests will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
