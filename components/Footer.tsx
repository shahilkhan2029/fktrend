import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, MapPin, Phone, MessageCircle, Youtube } from 'lucide-react';
import { getStoreSettings } from '@/lib/actions';

export default async function Footer() {
  const settings = await getStoreSettings();

  const whatsappNumber = settings?.whatsapp || '12345678900';
  const phoneNumber = settings?.phone || '+1 234 567 8900';
  const address = settings?.address || '123 Fashion Street, Style District, City, Country';

  return (
    <footer className="bg-zinc-900 text-zinc-300 py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <div className="mb-6">
            <Image 
              src="/logo.svg" 
              alt="FK TREND" 
              width={150} 
              height={40} 
              className="h-8 w-auto brightness-0 invert"
            />
          </div>
          <p className="text-sm leading-relaxed mb-6">
            Premium fashion near you. Explore our digital showroom and reserve your favorite styles before visiting the store.
          </p>
          <div className="flex items-center gap-4">
            {settings?.instagramUrl && (
              <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            )}
            {settings?.facebookUrl && (
              <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
            )}
            {settings?.youtubeUrl && (
              <a href={settings.youtubeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-white font-medium mb-6">Quick Links</h4>
          <ul className="space-y-3">
            <li><Link href="/shop" className="hover:text-white transition-colors text-sm">Shop All</Link></li>
            <li><Link href="/categories" className="hover:text-white transition-colors text-sm">Categories</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors text-sm">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors text-sm">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-6">Customer Service</h4>
          <ul className="space-y-3">
            <li><Link href="/faq" className="hover:text-white transition-colors text-sm">FAQs</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors text-sm">Store Location</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors text-sm">Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-6">Visit Us</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-sm">
              <MapPin size={18} className="shrink-0 mt-0.5" />
              <span>{address}</span>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <Phone size={18} className="shrink-0" />
              <span>{phoneNumber}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-zinc-800 text-sm text-zinc-500 flex flex-col md:flex-row items-center justify-between">
        <p>&copy; {new Date().getFullYear()} FK Trend. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Premium Fashion Digital Showroom</p>
      </div>

    </footer>
  );
}
