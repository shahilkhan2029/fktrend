'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export default function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0] || '/placeholder.png');
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  if(!images || images.length === 0) return null;

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setMainImage(img)}
            className={`relative flex-shrink-0 w-20 h-24 md:w-24 md:h-32 rounded-xl overflow-hidden shadow-sm transition-all duration-300 ${mainImage === img ? 'ring-2 ring-zinc-900 ring-offset-2' : 'hover:opacity-80'}`}
          >
            <Image
              src={img}
              alt={`${alt} thumbnail ${idx + 1}`}
              fill
              className="object-cover object-top"
              sizes="96px"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div 
        className="relative flex-grow aspect-[3/4] md:aspect-auto md:h-[600px] bg-zinc-100 rounded-2xl overflow-hidden cursor-crosshair group"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={mainImage}
          alt={alt}
          fill
          className={`object-cover object-top transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}
          style={{
            transformOrigin: isZoomed ? `${mousePos.x}% ${mousePos.y}%` : 'center top'
          }}
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        
        {/* Zoom Hint Overlay */}
        <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm text-xs font-medium px-3 py-1.5 rounded-full text-zinc-700 opacity-100 md:opacity-0 group-hover:opacity-0 transition-opacity pointer-events-none md:flex items-center gap-1 hidden">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M8 11h6"/><path d="M11 8v6"/></svg>
          Hover to zoom
        </div>
      </div>
    </div>
  );
}
