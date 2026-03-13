import Link from 'next/link';
import { Instagram, Facebook, MapPin, Phone, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-300 py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <h3 className="font-serif text-2xl font-bold text-white mb-6">FK Trend</h3>
          <p className="text-sm leading-relaxed mb-6">
            Premium fashion near you. Explore our digital showroom and reserve your favorite styles before visiting the store.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
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
              <span>123 Fashion Street, Style District, City, Country</span>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <Phone size={18} className="shrink-0" />
              <span>+1 234 567 8900</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-zinc-800 text-sm text-zinc-500 flex flex-col md:flex-row items-center justify-between">
        <p>&copy; {new Date().getFullYear()} FK Trend. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Premium Fashion Digital Showroom</p>
      </div>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/12345678900" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 z-50 flex items-center justify-center animate-pulse-slow"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    </footer>
  );
}
