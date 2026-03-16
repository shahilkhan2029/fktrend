import type { Metadata } from 'next';
import { Rubik, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const rubik = Rubik({ subsets: ['latin'], variable: '--font-rubik' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'FK TREND | Gents Luxury Fashion & Tailoring',
  description: 'Discover the pinnacle of gentlemen\'s fashion at FK TREND. Premium shirts, trousers, and custom tailoring for the modern man.',
  keywords: 'gents fashion, luxury clothing, men style, tailoring, premium shirts',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${rubik.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased text-zinc-900 selection:bg-[var(--color-gold)] selection:text-white">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
