import { MessageCircle } from 'lucide-react';
import { getStoreSettings } from '@/lib/actions';

export default async function WhatsAppButton() {
  const settings = await getStoreSettings();
  const whatsappNumber = settings?.whatsapp || '12345678900';

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=Hi, I am interested in your fashion collection!`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[80] bg-[#25D366] text-white p-3.5 md:p-4 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-all duration-500 hover:scale-110 hover:shadow-[0_15px_40px_rgba(37,211,102,0.6)] group flex items-center gap-3 overflow-hidden max-w-[54px] md:max-w-[64px] hover:max-w-[220px]"
    >
      <MessageCircle size={24} className="shrink-0 md:size-8" />
      <span className="font-serif font-black text-[10px] md:text-xs uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Chat with us
      </span>
    </a>
  );
}
