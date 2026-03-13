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
        <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1 font-medium">{category}</div>
        <Link href={`/shop/${id}`}>
          <h3 className="text-lg font-serif font-semibold text-zinc-900 mb-2 truncate group-hover:text-[var(--color-gold)] transition-colors">
            {title}
          </h3>
        </Link>
        <div className="text-xl font-medium text-zinc-900 mb-4">₹{price.toLocaleString('en-IN')}</div>
        
        {/* Sizes */}
        <div className="flex flex-wrap gap-2 mb-6 min-h-[28px]">
          {sizes && sizes.length > 0 ? sizes.map(size => (
            <span key={size} className="text-xs font-medium border border-zinc-200 text-zinc-600 px-2.5 py-1 rounded-md">
              {size}
            </span>
          )) : (
            <span className="text-xs font-medium border border-dashed border-zinc-200 text-zinc-400 px-2.5 py-1 rounded-md">
              Any Size
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-auto grid grid-cols-2 gap-3">
          <Link 
            href={`/shop/${id}`} 
            className="text-center text-sm font-medium border border-zinc-900 text-zinc-900 px-4 py-2.5 rounded-full hover:bg-zinc-50 transition-colors"
          >
            Details
          </Link>
          <Link 
            href={`/shop/${id}?book=true`}
            className="text-center text-sm font-medium bg-zinc-900 text-white px-4 py-2.5 rounded-full hover:bg-zinc-800 transition-colors shadow-md shadow-zinc-900/20"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
