import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  category: string;
  imageUrl: string;
  badge?: string | null;
  sizes: string[];
}

export default function ProductCard({ id, title, price, category, imageUrl, badge, sizes }: ProductCardProps) {
  return (
    <div className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Container */}
      <Link href={`/shop/${id}`} className="relative aspect-[4/5] bg-zinc-100 overflow-hidden">
        {badge && (
          <div className="absolute top-4 left-4 z-10 bg-black text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-full">
            {badge}
          </div>
        )}
        <Image
          src={imageUrl || '/placeholder.png'}
          alt={title}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Quick View Overlay (Desktop) */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-end justify-center">
          <span className="text-white text-sm font-medium border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-colors">
            Quick View
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] text-zinc-400 uppercase tracking-[0.2em] font-black">{category}</div>
          {badge && (
            <div className="bg-black text-white text-[8px] font-black px-2 py-0.5 uppercase tracking-widest rounded-full">
              {badge}
            </div>
          )}
        </div>
        
        <Link href={`/shop/${id}`}>
          <h3 className="text-base font-serif font-black text-zinc-900 mb-2 truncate group-hover:text-[var(--color-gold)] transition-colors tracking-tight leading-tight">
            {title}
          </h3>
        </Link>

        <div className="flex items-baseline gap-2 mb-4">
          <div className="text-lg font-black text-zinc-900 tracking-tighter">₹{price.toLocaleString('en-IN')}</div>
          <div className="text-[10px] text-zinc-400 line-through decoration-zinc-300 font-medium">₹{(price * 1.6).toLocaleString('en-IN')}</div>
          <div className="text-[10px] font-bold text-[var(--color-gold)]">(37% OFF)</div>
        </div>
        
        {/* Sizes Chips */}
        <div className="flex flex-wrap gap-1.5 mb-6 min-h-[24px]">
          {sizes && sizes.length > 0 ? sizes.slice(0, 3).map(size => (
            <span key={size} className="text-[9px] font-black uppercase tracking-widest border border-zinc-100 text-zinc-500 px-2 py-1 rounded-md bg-zinc-50/50">
              {size}
            </span>
          )) : (
            <span className="text-[9px] font-black uppercase tracking-widest border border-dashed border-zinc-100 text-zinc-300 px-2 py-1 rounded-md">
              Free Size
            </span>
          )}
          {sizes && sizes.length > 3 && (
            <span className="text-[9px] font-black text-zinc-300 px-1 py-1">+{sizes.length - 3}</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-auto grid grid-cols-2 gap-2">
          <Link 
            href={`/shop/${id}`} 
            className="text-center text-[10px] font-black uppercase tracking-widest border border-zinc-900 text-zinc-900 px-3 py-3 rounded-xl hover:bg-zinc-900 hover:text-white transition-all"
          >
            Details
          </Link>
          <Link 
            href={`/shop/${id}?book=true`}
            className="text-center text-[10px] font-black uppercase tracking-widest bg-zinc-900 text-white px-3 py-3 rounded-xl hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-900/10"
          >
            Reserve
          </Link>
        </div>
      </div>
    </div>
  );
}
