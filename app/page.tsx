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

  const address = settings?.address || '123 Fashion Street, City, Country';
  const mapSrc = settings?.mapLocation || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113941.01166415712!2d80.84158485744474!3d26.81977717438497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd991f32b16b%3A0x93ccba8909978be7!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1709477793444!5m2!1sen!2sin";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-zinc-900 group">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070')] bg-cover bg-center opacity-60 transition-transform duration-1000 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block text-[var(--color-gold)] font-black uppercase tracking-[0.5em] mb-8 animate-fade-in text-sm">
              New Collection 2026
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-black text-white leading-none mb-10 tracking-tighter animate-slide-up">
              FK<span className="text-[var(--color-gold)]">.</span>TREND <br />
              <span className="text-zinc-400">GENTS</span>
            </h1>
            <p className="text-xl text-zinc-300 mb-12 max-w-xl leading-relaxed animate-fade-in delay-500 font-medium">
              Discover the art of fine tailoring and premium menswear. Our digital showroom allows you to reserve exclusive pieces before visiting our physical store.
            </p>
            <div className="flex flex-wrap gap-6 animate-fade-in delay-700">
              <Link href="/shop" className="bg-white text-black px-12 py-5 rounded-full font-black uppercase tracking-widest hover:bg-[var(--color-gold)] hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl">
                Explore Shop
              </Link>
              <Link href="/categories" className="border-2 border-white/30 text-white backdrop-blur-sm px-12 py-5 rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all transform hover:-translate-y-1">
                Categories
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-0.5 h-16 bg-gradient-to-b from-transparent via-white/50 to-white" />
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
                <Link href="/contact" className="inline-block border-2 border-zinc-900 text-zinc-900 px-8 py-3 rounded-full font-medium hover:bg-zinc-900 hover:text-white transition-colors">
                  Get Directions
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 min-h-[400px] bg-zinc-200 relative">
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
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
