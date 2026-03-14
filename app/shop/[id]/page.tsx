import { getProduct, getProducts, getStoreSettings } from '@/lib/actions';
import { getSession } from '@/lib/auth';
import { notFound } from 'next/navigation';
import ImageGallery from '@/components/ImageGallery';
import ProductActions from '@/components/ProductActions';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { TrendingUp } from 'lucide-react';

export default async function ProductDetailPage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>,
  searchParams: Promise<{ book?: string }>
}) {
  const { id } = await params;
  const { book } = await searchParams;
  const product = await getProduct(id);
  const settings = await getStoreSettings();
  const user = await getSession();
  const whatsappNumber = settings?.whatsapp || '12345678900';

  if (!product) {
    notFound();
  }

  // Determine if booking modal should be open via URL searchParams
  const isBookingOpen = book === 'true';

  // Fetch similar products (same category)
  const allInCategory = await getProducts(product.category);
  const similarProducts = allInCategory.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-white min-h-screen">
      <div className="container-custom py-6 md:py-12">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-24">
          
          {/* Left Column: Gallery */}
          <div className="w-full lg:w-3/5 xl:w-[65%]">
            <ImageGallery images={product.images} alt={product.title} badge={product.badge} />
          </div>

          {/* Right Column: Product Info */}
          <div className="w-full lg:w-2/5 xl:w-[35%] flex flex-col space-y-8">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-[var(--color-gold)]">
                  {product.category}
                </span>
                {product.badge && (
                  <span className="px-3 py-1 bg-zinc-900 text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-full">
                    {product.badge}
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-zinc-900 leading-tight tracking-tight">
                {product.title}
              </h1>

              <div className="flex items-center gap-4 py-2">
                <span className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tighter">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-lg text-zinc-400 line-through decoration-zinc-300 font-medium italic">
                  ₹{(product.price * 1.6).toLocaleString('en-IN')}
                </span>
                <span className="text-sm font-bold text-[var(--color-gold)]">
                  (37% OFF)
                </span>
              </div>
            </div>
            
            <div className="prose prose-zinc max-w-none">
              <p className="text-zinc-500 leading-relaxed text-sm md:text-base">
                {product.description}
              </p>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-2 gap-4 py-8 border-y border-zinc-100">
               {[
                 { label: 'Fabric', value: 'Premium Silk Blend' },
                 { label: 'Fit', value: 'Modern Slim Fit' },
                 { label: 'Care', value: 'Dry Clean Only' },
                 { label: 'Design', value: 'Hand-finished Detail' }
               ].map((item, i) => (
                 <div key={i} className="flex flex-col space-y-1">
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{item.label}</span>
                   <span className="text-xs font-bold text-zinc-900">{item.value}</span>
                 </div>
               ))}
            </div>
            
            {/* Actions */}
            <div className="pt-2">
              <ProductActions 
                productId={product.id} 
                productTitle={product.title} 
                sizes={product.sizes} 
                initialOpen={isBookingOpen} 
                whatsappNumber={whatsappNumber}
                user={user}
              />
            </div>

            <div className="pt-6">
              <button className="flex items-center justify-center gap-3 w-full py-4 border border-zinc-100 text-zinc-400 font-black rounded-2xl hover:border-zinc-900 hover:text-zinc-900 transition-all text-[10px] uppercase tracking-[0.2em] group">
                Model Measurements
                <TrendingUp size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-zinc-100">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl md:text-3xl font-serif font-black text-zinc-900 tracking-tight">You Might Also Like</h2>
              <Link href="/shop" className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors border-b border-zinc-200 pb-1">View All Collection</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
              {similarProducts.map(p => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  title={p.title}
                  price={p.price}
                  category={p.category}
                  imageUrl={p.images?.[0] || '/placeholder.png'}
                  badge={p.badge}
                  sizes={p.sizes}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
