import { getProduct, getProducts } from '@/lib/actions';
import { notFound } from 'next/navigation';
import ImageGallery from '@/components/ImageGallery';
import ProductActions from '@/components/ProductActions';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

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
  
  if (!product) {
    notFound();
  }

  // Determine if booking modal should be open via URL searchParams
  const isBookingOpen = book === 'true';

  // Fetch similar products (same category)
  const allInCategory = await getProducts(product.category);
  const similarProducts = allInCategory.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-white min-h-screen py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-8 font-medium">
          <Link href="/" className="hover:text-zinc-900 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-zinc-900 transition-colors">Shop</Link>
          <span>/</span>
          <Link href={`/shop?category=${product.category}`} className="hover:text-zinc-900 transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-zinc-900 truncate max-w-[200px] md:max-w-xs">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24">
          
          {/* Gallery */}
          <div>
            <ImageGallery images={product.images} alt={product.title} />
          </div>

          {/* Product Info */}
          <div className="flex flex-col h-full lg:sticky lg:top-28">
            {product.badge && (
              <span className="inline-block px-3 py-1 bg-zinc-100 text-zinc-800 text-xs font-bold uppercase tracking-wider rounded-full mb-4 w-max">
                {product.badge}
              </span>
            )}
            
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-zinc-900 mb-4">{product.title}</h1>
            <p className="text-2xl text-zinc-900 mb-6 font-medium">₹{product.price.toLocaleString('en-IN')}</p>
            
            <div className="prose prose-zinc prose-p:text-zinc-600 mb-8">
              <p>{product.description}</p>
            </div>
            
            <hr className="border-zinc-100 mb-8" />

            {/* Sizes */}
            {product.sizes.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-zinc-900 uppercase text-sm tracking-wide">Select Size</h3>
                  <button className="text-sm text-zinc-500 underline hover:text-zinc-900">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <div 
                      key={size} 
                      className="w-12 h-12 flex items-center justify-center border border-zinc-200 rounded-lg text-sm font-medium text-zinc-700 hover:border-zinc-900 transition-colors cursor-pointer bg-white"
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions via Client Component */}
            <ProductActions 
              productId={product.id} 
              productTitle={product.title} 
              sizes={product.sizes} 
              initialOpen={isBookingOpen} 
            />

          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="pt-16 border-t border-zinc-100">
            <h2 className="text-2xl font-serif font-bold text-zinc-900 mb-8 border-l-4 border-[var(--color-gold)] pl-4">Similar Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
