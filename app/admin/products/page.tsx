import prisma from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Eye, EyeOff, ShoppingBag, ArrowUpRight } from 'lucide-react';
import ProductListActions from './ProductListActions';

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8 md:space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
        <div>
          <h2 className="text-2xl md:text-5xl font-serif font-black text-zinc-900 tracking-tighter mb-1 md:mb-3 uppercase">
             Inventory
          </h2>
          <p className="text-zinc-400 font-medium font-serif italic text-base md:text-lg">
            Curate and manage your premium catalog.
          </p>
        </div>
        <Link 
          href="/admin/products/new" 
          className="group flex items-center gap-2 md:gap-3 bg-zinc-950 text-white px-6 py-4 md:px-8 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[9px] md:text-[11px] hover:bg-[var(--color-gold)] transition-all duration-500 shadow-xl shadow-zinc-900/20 active:scale-95"
        >
          <Plus size={16} /> Add New Entry
        </Link>
      </div>

      <div className="bg-white rounded-2xl md:rounded-[3rem] shadow-sm border border-zinc-100 overflow-hidden flex flex-col transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-200/50">
        {products.length > 0 ? (
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left border-collapse min-w-[700px] md:min-w-0">
              <thead>
                <tr className="bg-zinc-50/50">
                  <th className="px-6 md:px-10 py-5 md:py-8 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400 w-24 md:w-32">Frame</th>
                  <th className="px-6 md:px-10 py-5 md:py-8 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400">Exclusive Details</th>
                  <th className="px-6 md:px-10 py-5 md:py-8 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400">Valuation</th>
                  <th className="px-6 md:px-10 py-5 md:py-8 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400">Presence</th>
                  <th className="px-6 md:px-10 py-5 md:py-8 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {products.map(product => {
                  let images: string[] = [];
                  try {
                    images = product.images ? JSON.parse(product.images) : [];
                  } catch (e) { /* ignore */ }
                  
                  return (
                    <tr key={product.id} className="group hover:bg-zinc-50/30 transition-colors">
                      <td className="px-6 md:px-10 py-6 md:py-8">
                        <div className="w-16 h-20 md:w-20 md:h-24 rounded-xl md:rounded-2xl overflow-hidden bg-white border border-zinc-100 flex items-center justify-center p-1.5 md:p-2 relative shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-500">
                          <Image src={images[0] || '/placeholder.png'} alt={product.title} fill className="object-contain" />
                        </div>
                      </td>
                      <td className="px-6 md:px-10 py-6 md:py-8">
                        <div className="font-serif font-black text-zinc-900 text-lg md:text-xl leading-tight mb-1.5 md:mb-2 group-hover:text-[var(--color-gold)] transition-colors line-clamp-1">{product.title}</div>
                        <div className="flex gap-1.5 md:gap-2">
                          <span className="bg-zinc-100 text-zinc-500 px-2.5 py-1 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-widest whitespace-nowrap">{product.category}</span>
                          {product.badge && <span className="bg-zinc-950 text-white px-2.5 py-1 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-widest whitespace-nowrap">{product.badge}</span>}
                        </div>
                      </td>
                      <td className="px-6 md:px-10 py-6 md:py-8">
                        <div className="font-serif font-black text-zinc-900 text-lg md:text-xl tracking-tighter tabular-nums">
                           ₹{product.price.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[8px] md:text-[10px] font-bold text-zinc-300 mt-1 uppercase tracking-widest italic">Reserved Pricing</div>
                      </td>
                      <td className="px-6 md:px-10 py-6 md:py-8">
                        <span className={`inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all ${product.available ? 'bg-green-50 text-green-700' : 'bg-zinc-100 text-zinc-400'}`}>
                          {product.available ? <><div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-green-500 animate-pulse" /> Live</> : <><div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-zinc-300" /> Hidden</>}
                        </span>
                      </td>
                      <td className="px-6 md:px-10 py-6 md:py-8 text-right">
                        <ProductListActions id={product.id} available={product.available} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-16 md:p-24 text-center">
            <div className="w-16 h-16 md:w-24 md:h-24 bg-zinc-50 rounded-2xl md:rounded-[2.5rem] flex items-center justify-center text-zinc-200 mx-auto mb-6 md:mb-8 shadow-inner">
               <ShoppingBag size={32} className="md:size-[40px]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-black text-zinc-900 mb-3 md:mb-4 tracking-tighter">GALLERY EMPTY</h2>
            <p className="max-w-md mx-auto mb-8 md:mb-10 text-zinc-400 font-medium italic font-serif text-sm md:text-lg leading-relaxed">Your digital archive is currently waiting for it's first luxury piece.</p>
            <Link 
              href="/admin/products/new" 
              className="inline-flex items-center gap-2 md:gap-3 bg-zinc-950 text-white px-8 py-4 md:px-12 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[9px] md:text-[11px] hover:bg-[var(--color-gold)] transition-all duration-500 shadow-xl active:scale-95"
            >
              Begin Curation <ArrowUpRight size={16} className="md:size-[18px]" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
