'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  alt: string;
  badge?: string | null;
}

export default function ImageGallery({ images, alt, badge }: ImageGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0] || '/placeholder.png');

  if(!images || images.length === 0) return null;

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4 md:gap-6">
      {/* Thumbnails - Left on lg, Bottom on mobile */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto pb-4 lg:pb-0 scrollbar-hide snap-x lg:w-24 shrink-0">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setMainImage(img)}
            className={`relative flex-shrink-0 w-16 h-20 md:w-20 md:h-24 lg:w-full lg:h-32 rounded-2xl overflow-hidden transition-all duration-300 snap-start border-2 ${mainImage === img ? 'border-zinc-900 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`}
          >
            <Image
              src={img}
              alt={`${alt} thumbnail ${idx + 1}`}
              fill
              className="object-cover"
              sizes="120px"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Main Image in a soft frame */}
      <div className="relative flex-1 aspect-[3/4] bg-zinc-50 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-zinc-100/50 flex items-center justify-center p-4 md:p-8 lg:p-12 group transition-all duration-500">
        {badge && (
          <div className="absolute top-6 left-6 z-10 bg-black text-white text-[9px] md:text-[10px] font-black px-4 py-1.5 uppercase tracking-[0.25em] rounded-full shadow-2xl">
            {badge}
          </div>
        )}
        
        <div className="relative w-full h-full">
          <Image
            src={mainImage}
            alt={alt}
            fill
            className="object-contain transition-transform duration-1000 group-hover:scale-[1.03]"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          />
        </div>

        {/* Zoom Indicator */}
        <div className="absolute bottom-6 right-6 p-3 bg-white/10 backdrop-blur-md rounded-full text-white opacity-0 md:group-hover:opacity-100 transition-opacity">
          <Search size={20} />
        </div>
      </div>
    </div>
  );
}
