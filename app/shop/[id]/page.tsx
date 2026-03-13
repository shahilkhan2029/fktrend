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
    <div className="bg-white min-h-screen py-4 md:py-8">
      <div className="container mx-auto px-4 max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
          
          {/* Gallery */}
          <div className="flex flex-col">
            <ImageGallery images={product.images} alt={product.title} badge={product.badge} />
          </div>

          {/* Product Info */}
          <div className="flex flex-col h-full lg:sticky lg:top-24 pt-0">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                Category / {product.category}
              </span>
              {product.badge && (
                <span className="px-3 py-1 bg-zinc-900 text-white text-[9px] font-black uppercase tracking-widest rounded-full">
                  {product.badge}
                </span>
              )}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-serif font-black text-zinc-900 mb-2 leading-tight tracking-tight">
              {product.title}
            </h1>

            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-2xl font-black text-zinc-900 tracking-tight">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-base text-zinc-400 line-through decoration-zinc-300 font-medium">
                ₹{(product.price * 1.6).toLocaleString('en-IN')}
              </span>
              <span className="text-sm font-bold text-[var(--color-gold)]">
                (37% OFF)
              </span>
            </div>
            
            <div className="prose prose-zinc prose-p:text-zinc-500 prose-p:leading-relaxed mb-6 text-sm max-w-xl">
              <p>{product.description}</p>
            </div>

            {/* Product Details Section - More compact */}
            <div className="mb-8 py-6 border-y border-zinc-100">
              <h3 className="text-[10px] font-black uppercase tracking-[.25em] text-zinc-900 mb-4 flex items-center gap-2">
                <span className="w-4 h-px bg-zinc-900"></span>
                Product Details
              </h3>
              <ul className="grid grid-cols-2 gap-y-3 gap-x-8">
                {['Premium fabric', 'Comfortable fit', 'High durability', 'Sustainable material', 'Hand-finished detail', 'Fashion forward'].map((detail, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-zinc-500">
                    <div className="w-1 h-1 rounded-full bg-[var(--color-gold)] shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Actions via Client Component */}
            <div className="flex-grow-0">
              <ProductActions 
                productId={product.id} 
                productTitle={product.title} 
                sizes={product.sizes} 
                initialOpen={isBookingOpen} 
                whatsappNumber={whatsappNumber}
                user={user}
              />
            </div>

            {/* Model Preview Link - Minimal */}
            <button className="mt-6 flex items-center justify-center gap-2 w-full py-3 border border-zinc-100 text-zinc-400 font-bold rounded-xl hover:border-zinc-900 hover:text-zinc-900 transition-all text-[10px] uppercase tracking-widest group">
              View Outfit Look (Model)
              <TrendingUp size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="pt-16 border-t border-zinc-100">
            <h2 className="text-2xl font-serif font-bold text-zinc-900 mb-8 border-l-4 border-[var(--color-gold)] pl-4">Similar Products</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
