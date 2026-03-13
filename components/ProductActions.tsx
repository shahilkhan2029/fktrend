'use client';

import { useState, useEffect } from 'react';
import ReserveModal from './ReserveModal';

interface ProductActionsProps {
  productId: string;
  productTitle: string;
  sizes: string[];
  initialOpen?: boolean;
}

export default function ProductActions({ productId, productTitle, sizes, initialOpen = false }: ProductActionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(initialOpen);

  // Sync with URL search params on mount if needed
  useEffect(() => {
    if (initialOpen) setIsModalOpen(true);
  }, [initialOpen]);

  const handleOpen = () => {
    setIsModalOpen(true);
    // Remove query param without triggering navigation
    const url = new URL(window.location.href);
    if(url.searchParams.get('book')) {
      url.searchParams.delete('book');
      window.history.replaceState({}, '', url);
    }
  };

  const handleClose = () => setIsModalOpen(false);

  return (
    <>
      <div className="mt-auto space-y-4">
        <button 
          onClick={handleOpen}
          className="block text-center w-full bg-zinc-900 text-white font-medium py-4 rounded-xl hover:bg-zinc-800 transition-colors shadow-lg shadow-zinc-900/20 text-lg"
        >
          Book Product In-Store
        </button>
        
        <a 
          href={`https://wa.me/12345678900?text=Hi, I am interested in ${productTitle} (${productId})`}
          target="_blank"
          rel="noreferrer"
          className="block text-center w-full border-2 border-zinc-200 text-zinc-800 font-medium py-3.5 rounded-xl hover:border-zinc-900 hover:bg-zinc-50 transition-colors"
        >
          Ask on WhatsApp
        </a>
        <p className="text-center text-xs text-zinc-500 mt-4">
          No payment required for booking. Try before you buy.
        </p>
      </div>

      <ReserveModal 
        isOpen={isModalOpen} 
        onClose={handleClose} 
        productId={productId}
        productTitle={productTitle}
        sizes={sizes}
      />
    </>
  );
}
