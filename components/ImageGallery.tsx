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
    <div className="flex flex-col gap-4">
      {/* Main Image in a soft frame */}
      <div className="relative aspect-[4/5] max-h-[500px] bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-100/50 flex items-center justify-center p-6 group">
        {badge && (
          <div className="absolute top-4 left-4 z-10 bg-black text-white text-[9px] font-black px-3 py-1 uppercase tracking-[0.2em] rounded-full shadow-lg">
            {badge}
          </div>
        )}
        
        <div className="relative w-full h-full">
          <Image
            src={mainImage}
            alt={alt}
            fill
            className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* Thumbnails - Horizontal & Centered */}
      <div className="flex justify-center gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x transition-all">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setMainImage(img)}
            className={`relative flex-shrink-0 w-16 h-20 rounded-xl overflow-hidden transition-all duration-300 snap-start border ${mainImage === img ? 'border-zinc-900 ring-2 ring-zinc-900/5 ring-offset-2' : 'border-zinc-100 opacity-60 hover:opacity-100'}`}
          >
            <Image
              src={img}
              alt={`${alt} thumbnail ${idx + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
