import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import { getFeaturedProducts, getCategories, getStoreSettings } from '@/lib/actions';
import { MapPin, ShieldCheck, Clock, TrendingUp } from 'lucide-react';

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  const categories = await getCategories();
  const settings = await getStoreSettings();

  const address = settings?.address || 'Fatehpur, Rajasthan 332301';
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3543.2506039414225!2d75.406215!3d27.367887900000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396ced000f08dce1%3A0x80b79900c7444b0c!2sFK%20TREND!5e0!3m2!1sen!2sin!4v1773512990080!5m2!1sen!2sin";
  const directionsUrl = (settings as any)?.directionsUrl || "https://maps.app.goo.gl/ZVZk66iXV5EsGK5WA";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Redesigned */}
      <section className="relative h-[80vh] md:h-[90vh] flex items-center overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop"
            alt="Hero Background"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="w-2 h-2 rounded-full bg-[var(--color-gold)] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Spring Summer Collection 2024</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black text-white leading-[0.9] tracking-tighter mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
              CRAFTED<br />
              FOR THE<br />
              <span className="text-[var(--color-gold)]">MODERN</span> MAN
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
              <Link 
                href="/shop" 
                className="group relative px-10 py-5 bg-white text-zinc-900 font-black rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 text-center"
              >
                <span className="relative z-10 text-[11px] uppercase tracking-[0.2em]">Explore Collection</span>
                <div className="absolute inset-0 bg-[var(--color-gold)] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>
              <Link 
                href="/categories" 
                className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/20 text-white font-black rounded-2xl transition-all duration-500 hover:bg-white/10 text-center"
              >
                <span className="text-[11px] uppercase tracking-[0.2em]">View Lookbook</span>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-4 animate-bounce">
          <span className="text-[9px] font-black uppercase tracking-[0.5em] rotate-90 origin-left translate-x-1.5 translate-y-4">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* Categories Simple Preview */}
      <section className="py-16 bg-zinc-50/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-7xl font-serif font-black text-zinc-900 mb-6 tracking-tighter">Collections</h2>
              <p className="text-xl text-zinc-500 font-medium font-serif italic">Curated styles for the modern individual.</p>
            </div>
            <Link href="/categories" className="text-sm font-black uppercase tracking-widest text-zinc-900 border-b-2 border-zinc-900 pb-2 hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-all">
              View All Categories
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {categories.map((cat, i) => (
              <Link key={i} href={`/shop?category=${cat.name}`} className="group relative aspect-[3/4] overflow-hidden rounded-3xl bg-zinc-100 shadow-2xl shadow-zinc-200/50">
                <Image src={cat.image} alt={cat.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-10 left-10">
                  <h3 className="text-3xl font-serif font-black text-white mb-2">{cat.name}</h3>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-gold)]">{cat.count} Items</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[var(--color-gold)] font-black uppercase tracking-[0.4em] mb-4 inline-block text-xs">The Edit</span>
            <h2 className="text-6xl md:text-8xl font-serif font-black text-zinc-900 mb-8 tracking-tighter leading-none">Trending Styles</h2>
            <p className="text-xl text-zinc-500 font-medium leading-relaxed font-serif italic">Most loved pieces from our current collection.</p>
          </div>
          
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-16">
              {featuredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  category={product.category}
                  imageUrl={product.images?.[0] || '/placeholder.png'}
                  badge={product.badge}
                  sizes={product.sizes}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-zinc-50 rounded-3xl border border-dashed border-zinc-200">
              <p className="text-zinc-500 font-medium italic">No products found. Add products from the admin dashboard.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/shop" className="group relative inline-flex items-center justify-center px-16 py-6 bg-zinc-900 text-white font-black uppercase tracking-[0.3em] rounded-full overflow-hidden transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:-translate-y-1 text-xs">
              <span className="relative z-10">Explore Entire Catalog</span>
              <div className="absolute inset-0 bg-[var(--color-gold)] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-zinc-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 text-[var(--color-gold)]">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 font-serif">Premium Quality</h3>
              <p className="text-zinc-400">Handpicked fabrics and materials ensuring the highest standard of clothing.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 text-[var(--color-gold)]">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 font-serif">Reserve & Try</h3>
              <p className="text-zinc-400">Book items online to guarantee availability when you visit our physical store.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 text-[var(--color-gold)]">
                <TrendingUp size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 font-serif">Latest Styles</h3>
              <p className="text-zinc-400">Constantly updated inventory with the newest seasonal fashion trends.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 text-[var(--color-gold)]">
                <MapPin size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 font-serif">Central Location</h3>
              <p className="text-zinc-400">Easily accessible flagship store located in the heart of the style district.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Store Location Map CTA */}
      <section className="py-12 relative overflow-hidden bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-zinc-100 rounded-3xl overflow-hidden shadow-sm flex flex-col lg:flex-row">
            <div className="p-10 lg:p-16 lg:w-1/2 flex flex-col justify-center">
              <h2 className="text-3xl lg:text-5xl font-serif font-bold text-zinc-900 mb-6">Visit Our Store</h2>
              <p className="text-lg text-zinc-600 mb-8 leading-relaxed">
                Experience the premium quality and perfect fit in person. Our style experts are ready to help you discover your next favorite outfit.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 text-zinc-700">
                  <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <MapPin size={20} className="text-zinc-900" />
                  </span>
                  <div>
                    <strong className="block text-zinc-900">Address</strong>
                    {address}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-zinc-700">
                  <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Clock size={20} className="text-zinc-900" />
                  </span>
                  <div>
                    <strong className="block text-zinc-900">Opening Hours</strong>
                    Mon-Sun: 10:00 AM - 9:00 PM
                  </div>
                </div>
              </div>
              <div>
                <a 
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border-2 border-zinc-900 text-zinc-900 px-8 py-3 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-zinc-900 hover:text-white transition-all transform active:scale-95"
                >
                  Get Directions
                </a>
              </div>
            </div>
            <div className={`lg:w-1/2 min-h-[400px] bg-zinc-200 relative ${!mapSrc.includes('google.com/maps/embed') ? 'p-10 flex items-center justify-center' : ''}`}>
               {mapSrc.includes('google.com/maps/embed') ? (
                 <iframe 
                    src={mapSrc}
                    width="100%" 
                    height="100%" 
                    style={{border: 0}} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-700"
                  />
               ) : (
                  <div className="text-center space-y-4">
                    <MapPin size={48} className="mx-auto text-zinc-400 mb-4" />
                    <p className="text-zinc-500 font-serif italic">Viewing map at {address}</p>
                    <a 
                      href={directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-zinc-900 text-white px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest"
                    >
                      Open in Google Maps
                    </a>
                  </div>
               )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
