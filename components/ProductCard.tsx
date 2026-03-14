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
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
      {/* Image Container */}
      <Link href={`/shop/${id}`} className="relative aspect-[3/4] bg-zinc-50 overflow-hidden">
        {badge && (
          <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10 bg-black text-white text-[8px] md:text-[10px] font-black px-2 md:px-3 py-1 uppercase tracking-widest rounded-full shadow-lg">
            {badge}
          </div>
        )}
        <Image
          src={imageUrl || '/placeholder.png'}
          alt={title}
          fill
          className="object-cover object-top transition-transform duration-1000 group-hover:scale-110"
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          loading="lazy"
        />
        
        {/* Hover Overlay (Desktop Only) */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 hidden md:flex flex-col items-center justify-end translate-y-4 group-hover:translate-y-0">
          <span className="w-full text-center bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] py-3 rounded-xl hover:bg-[var(--color-gold)] hover:text-white transition-colors">
            View Details
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-3 md:p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-1 md:mb-2">
          <div className="text-[8px] md:text-[10px] text-[var(--color-gold)] uppercase tracking-[0.2em] font-black">{category}</div>
          {/* Badge shown again for desktop if not on image */}
          <div className="hidden md:block">
            {badge && (
              <span className="text-[8px] text-zinc-400 font-bold uppercase tracking-widest">Featured</span>
            )}
          </div>
        </div>
        
        <Link href={`/shop/${id}`}>
          <h3 className="text-sm md:text-lg font-serif font-black text-zinc-900 mb-1 md:mb-2 truncate group-hover:text-[var(--color-gold)] transition-colors tracking-tight leading-tight">
            {title}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mb-2 md:mb-4">
          <div className="text-sm md:text-xl font-black text-zinc-900 tracking-tighter">₹{price.toLocaleString('en-IN')}</div>
          <div className="text-[8px] md:text-xs text-zinc-400 line-through decoration-zinc-300 font-medium">₹{(price * 1.6).toLocaleString('en-IN')}</div>
          <div className="text-[8px] md:text-xs font-bold text-[var(--color-gold)]"> -37%</div>
        </div>
        
        {/* Extra Info (Desktop Only) */}
        <div className="hidden md:block mb-6">
          <div className="flex flex-wrap gap-1.5 min-h-[24px]">
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
        </div>

        {/* Action Buttons (Desktop Only/Hidden on smallest Mobile) */}
        <div className="mt-auto hidden md:grid grid-cols-2 gap-3">
          <Link 
            href={`/shop/${id}`} 
            className="text-center text-[10px] font-black uppercase tracking-widest border border-zinc-200 text-zinc-600 px-3 py-3 rounded-xl hover:border-zinc-900 hover:text-zinc-900 transition-all"
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
        
        {/* Mobile-only CTA */}
        <div className="md:hidden mt-2">
           <Link 
            href={`/shop/${id}`} 
            className="block text-center text-[8px] font-black uppercase tracking-[0.2em] bg-zinc-50 text-zinc-400 py-2.5 rounded-lg active:bg-zinc-200 transition-colors"
          >
            Tap to view
          </Link>
        </div>
      </div>
    </div>
  );
}
