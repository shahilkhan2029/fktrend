import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-zinc-900 text-white py-20 text-center px-4">
        <div className="flex justify-center mb-8">
          <Image src="/logo.svg" alt="FK TREND" width={300} height={80} className="h-16 md:h-24 w-auto brightness-0 invert" />
        </div>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          Redefining premium fashion with exceptional quality and a seamless shopping experience.
        </p>
      </div>

      {/* Story Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-serif font-bold text-zinc-900 mb-6">Our Story</h2>
            <div className="prose prose-zinc prose-lg text-zinc-600">
              <p>
                Founded with a vision to make luxury fashion accessible, FK Trend started as a small boutique and has grown into a premier digital showroom. 
              </p>
              <p>
                We believe that clothing is not just about fabric; it's about confidence, expression, and feeling your absolute best. Every piece in our collection is carefully curated to ensure it meets our strict standards of quality, comfort, and style.
              </p>
              <p>
                What makes us unique is our "Reserve & Try" philosophy. We want you to be 100% satisfied with your fit. Browse online, book your favorite pieces, and visit our store to try them on before you take them home.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1563178406-4cdc2923acbc?q=80&w=1000&auto=format&fit=crop" 
                alt="Inside FK Trend Store" 
                fill 
                className="object-cover"
              />
            </div>
            {/* Decorative block */}
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-zinc-100 rounded-2xl -z-10"></div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-zinc-50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-zinc-900">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-[var(--color-gold)] text-2xl font-serif">1</div>
              <h3 className="text-xl font-bold mb-3 text-zinc-900">Uncompromising Quality</h3>
              <p className="text-zinc-600">Premium materials from the best manufacturers crafted to last.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-[var(--color-gold)] text-2xl font-serif">2</div>
              <h3 className="text-xl font-bold mb-3 text-zinc-900">Customer First</h3>
              <p className="text-zinc-600">Our reserve system is designed entirely around your convenience.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-[var(--color-gold)] text-2xl font-serif">3</div>
              <h3 className="text-xl font-bold mb-3 text-zinc-900">Contemporary Style</h3>
              <p className="text-zinc-600">Curated collections that reflect modern, elegant, and timeless fashion.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
