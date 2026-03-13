'use client';

import { useState, useEffect } from 'react';
import ReserveModal from './ReserveModal';
import { ShoppingBag, MessageCircle, CheckCircle, Ruler } from 'lucide-react';

interface ProductActionsProps {
  productId: string;
  productTitle: string;
  sizes: string[];
  initialOpen?: boolean;
  whatsappNumber?: string;
  user?: { id: string; email: string; name: string } | null;
}

export default function ProductActions({ 
  productId, 
  productTitle, 
  sizes, 
  initialOpen = false,
  whatsappNumber = '12345678900',
  user = null
}: ProductActionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(initialOpen);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

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
      <div className="mt-6 space-y-6">
        {/* Size Selection chips - Sleeker */}
        {sizes.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-900">Select Size</h3>
              <button className="text-[9px] font-bold uppercase tracking-widest text-zinc-300 flex items-center gap-1.5 hover:text-zinc-900 transition-colors">
                <Ruler size={12} /> Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl border text-xs font-bold transition-all duration-300 ${selectedSize === size ? 'border-zinc-900 bg-zinc-900 text-white shadow-xl shadow-zinc-900/10' : 'border-zinc-100 text-zinc-500 hover:border-zinc-300'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3 pt-2">
          <button 
            onClick={handleOpen}
            className="group relative block w-full bg-zinc-900 text-white font-black py-3.5 rounded-xl transition-all duration-300 hover:bg-zinc-800 hover:shadow-lg text-xs uppercase tracking-[0.2em]"
          >
            <span className="flex items-center justify-center gap-3">
              <ShoppingBag size={16} />
              Reserve In Store
            </span>
          </button>
          
          <a 
            href={`https://wa.me/${whatsappNumber}?text=Hi, I am interested in ${productTitle} (${productId})`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-3 w-full border border-zinc-100 text-zinc-400 font-bold py-3 rounded-xl hover:border-zinc-900 hover:text-zinc-900 transition-all duration-300 tracking-widest uppercase text-[9px]"
          >
            <MessageCircle size={14} /> Chat on WhatsApp
          </a>
        </div>

        {/* Trust Indicators - More Minimal */}
        <div className="grid grid-cols-3 gap-2 pt-6 border-t border-zinc-50">
          <div className="flex flex-col items-center text-center gap-2">
            <CheckCircle size={14} className="text-zinc-200" />
            <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-400">Try Before Buying</span>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <CheckCircle size={14} className="text-zinc-200" />
            <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-400">No Online Payment</span>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <CheckCircle size={14} className="text-zinc-200" />
            <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-400">Visit Store</span>
          </div>
        </div>
      </div>

      <ReserveModal 
        isOpen={isModalOpen} 
        onClose={handleClose} 
        productId={productId}
        productTitle={productTitle}
        sizes={sizes}
        user={user}
      />
    </>
  );
}
