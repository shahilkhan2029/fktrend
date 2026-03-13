import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import { getFeaturedProducts, getCategories } from '@/lib/actions';
import { MapPin, ShieldCheck, Clock, TrendingUp } from 'lucide-react';

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  const categories = await getCategories();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2000&auto=format&fit=crop" 
            alt="Fashion Store Hero" 
            fill 
            className="object-cover object-center opacity-60"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-[var(--color-gold)] font-medium tracking-[0.2em] uppercase mb-4 animate-in slide-in-from-bottom flex items-center gap-4">
            <span className="h-px w-8 bg-current"></span>
            Elevate Your Style
            <span className="h-px w-8 bg-current"></span>
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight animate-in slide-in-from-bottom duration-500 delay-100">
            Premium Fashion <br className="hidden md:block"/> Near You
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl mx-auto animate-in slide-in-from-bottom duration-500 delay-200">
            Discover the latest trends, book your favorite pieces online, and try them on in our store. Luxury clothing made accessible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-in slide-in-from-bottom duration-500 delay-300">
            <Link 
              href="/shop" 
              className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-colors"
            >
              Explore Collection
            </Link>
            <Link 
              href="/categories" 
              className="px-8 py-4 bg-transparent border border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
            >
              View Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="max-w-xl">
              <h2 className="text-4xl font-serif font-bold text-zinc-900 mb-4">Shop by Category</h2>
              <p className="text-zinc-600">Explore our wide range of premium collections handpicked for every occasion.</p>
            </div>
            <Link href="/categories" className="text-zinc-900 font-medium hover:text-[var(--color-gold)] transition-colors mt-4 md:mt-0 flex items-center gap-2">
              All Categories <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {categories.map((cat, idx) => (
              <div key={idx} className={idx === 0 || idx === 1 ? "md:col-span-2 xl:col-span-2" : "col-span-1 xl:col-span-1"}>
                <CategoryCard name={cat.name} image={cat.image} count={cat.count} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-zinc-50 border-t border-zinc-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[var(--color-gold)] font-medium tracking-widest uppercase mb-2 block">Our Collection</span>
            <h2 className="text-4xl font-serif font-bold text-zinc-900 mb-4">Trending Now</h2>
            <div className="w-20 h-1 bg-zinc-900 mx-auto rounded-full"></div>
          </div>
          
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-zinc-200">
              <p className="text-zinc-500">No products found. Add products from the admin dashboard.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/shop" className="inline-flex items-center justify-center px-8 py-4 bg-zinc-900 text-white font-medium rounded-full hover:bg-zinc-800 transition-colors gap-2">
              View Entire Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-zinc-900 text-white">
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
      <section className="py-20 relative overflow-hidden bg-white">
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
                    123 Fashion Street, City, Country
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113941.01166415712!2d80.84158485744474!3d26.81977717438497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd991f32b16b%3A0x93ccba8909978be7!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1709477793444!5m2!1sen!2sin" 
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
