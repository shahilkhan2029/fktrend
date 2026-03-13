'use client';

import { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { submitBooking } from '@/lib/actions';

interface ReserveModalProps {
  productId: string;
  productTitle: string;
  sizes: string[];
  isOpen: boolean;
  onClose: () => void;
}

export default function ReserveModal({ productId, productTitle, sizes, isOpen, onClose }: ReserveModalProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  async function clientAction(formData: FormData) {
    setStatus('loading');
    setErrorMsg('');
    const result = await submitBooking(formData);
    if (result.success) {
      setStatus('success');
    } else {
      setStatus('error');
      setErrorMsg(result.error || 'Failed to submit booking');
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-100 bg-zinc-50/50">
          <h2 className="text-xl font-serif font-bold text-zinc-900">Reserve Item</h2>
          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors bg-white rounded-full shadow-sm">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4 animate-in zoom-in">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">Reservation Confirmed!</h3>
              <p className="text-zinc-600 mb-6">
                We've received your request for <strong className="text-zinc-900">{productTitle}</strong>. We will contact you shortly to confirm availability.
              </p>
              <button 
                onClick={onClose}
                className="w-full bg-zinc-900 text-white font-medium py-3 rounded-xl hover:bg-zinc-800 transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <>
              <p className="text-zinc-600 text-sm mb-6">
                Reserve <strong className="text-zinc-900">{productTitle}</strong> to check fit and quality in-store. No payment required now.
              </p>
              
              <form action={clientAction} className="space-y-4">
                <input type="hidden" name="productId" value={productId} />
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-700 mb-1">Full Name</label>
                  <input required type="text" id="name" name="name" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all outline-none" placeholder="John Doe" />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 mb-1">Phone Number</label>
                  <input required type="tel" id="phone" name="phone" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all outline-none" placeholder="+1 (234) 567-8900" />
                </div>
                
                {sizes.length > 0 && (
                  <div>
                    <label htmlFor="size" className="block text-sm font-medium text-zinc-700 mb-2">Select Size</label>
                    <div className="grid grid-cols-4 gap-2">
                      {sizes.map((size) => (
                        <label key={size} className="relative cursor-pointer">
                          <input required type="radio" name="size" value={size} className="peer sr-only" />
                          <div className="text-center px-3 py-2 border border-zinc-200 rounded-lg text-sm font-medium text-zinc-600 peer-checked:bg-zinc-900 peer-checked:text-white peer-checked:border-zinc-900 transition-colors hover:bg-zinc-50">
                            {size}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-700 mb-1">Message (Optional)</label>
                  <textarea id="message" name="message" rows={3} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all outline-none resize-none" placeholder="Any specific requests?" />
                </div>
                
                {status === 'error' && (
                  <p className="text-red-500 text-sm font-medium">{errorMsg}</p>
                )}
                
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full bg-[#C9A84C] text-white font-medium py-3.5 rounded-xl hover:bg-[#b5953c] transition-colors shadow-lg shadow-[#C9A84C]/30 disabled:opacity-70 disabled:cursor-not-allowed mt-2 text-lg flex items-center justify-center"
                >
                  {status === 'loading' ? (
                     <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Reserve Now"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
