import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { getStoreSettings } from '@/lib/actions';

export default async function ContactPage() {
  const settings = await getStoreSettings();

  const address = settings?.address || 'Fatehpur, Rajasthan 332301';
  const phone = settings?.phone || '+91 61773421289081';
  const whatsapp = settings?.whatsapp || '9161773421289081';
  const email = settings?.email || 'fk.trend.shop@gmail.com';
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3543.2506039414225!2d75.406215!3d27.367887900000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396ced000f08dce1%3A0x80b79900c7444b0c!2sFK%20TREND!5e0!3m2!1sen!2sin!4v1773512990080!5m2!1sen!2sin";
  const directionsUrl = (settings as any)?.directionsUrl || "https://maps.app.goo.gl/ZVZk66iXV5EsGK5WA";

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-900 mb-4">Get in Touch</h1>
          <p className="text-lg text-zinc-600">We'd love to hear from you. Find us at our flagship store or send us a message.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Contact Details & Map */}
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-serif font-bold text-zinc-900 mb-8">Visit Our Showroom</h2>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-900 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 mb-1">Address</h3>
                  <p className="text-zinc-600 leading-relaxed">
                    {address}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-900 shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 mb-1">Opening Hours</h3>
                  <p className="text-zinc-600 leading-relaxed">
                    Monday - Saturday: 10:00 AM - 9:00 PM<br />
                    Sunday: 11:00 AM - 7:00 PM
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-900 shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 mb-1">Phone & WhatsApp</h3>
                  <div className="flex flex-col gap-1 text-zinc-600">
                    <a href={`tel:${phone}`} className="hover:text-zinc-900 transition-colors uppercase font-medium tracking-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] inline-block">{phone}</a>
                    <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 transition-colors text-sm font-bold text-green-600">WhatsApp Now</a>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-900 shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 mb-1">Email</h3>
                  <p className="text-zinc-600">
                    <a href={`mailto:${email}`} className="hover:text-zinc-900 transition-colors">{email}</a>
                  </p>
                </div>
              </div>
            </div>

            <div className={`h-64 rounded-2xl overflow-hidden shadow-sm bg-zinc-200 relative group ${!mapSrc.includes('google.com/maps/embed') ? 'flex items-center justify-center p-6' : ''}`}>
              {mapSrc.includes('google.com/maps/embed') ? (
                <>
                  <iframe 
                    src={mapSrc} 
                    width="100%" 
                    height="100%" 
                    style={{border: 0}} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <a 
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 right-4 bg-zinc-900 text-white px-6 py-2 rounded-full font-bold uppercase tracking-widest text-[9px] shadow-xl opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0"
                  >
                    Get Directions
                  </a>
                </>
              ) : (
                <div className="text-center">
                  <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest mb-3 italic">Map Location</p>
                  <a 
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-zinc-950 text-white px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest"
                  >
                    View on Maps
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-1/2">
            <div className="bg-zinc-50 rounded-2xl p-8 lg:p-10 border border-zinc-100">
              <h2 className="text-2xl font-serif font-bold text-zinc-900 mb-8">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fname" className="block text-sm font-medium text-zinc-700 mb-2">First Name</label>
                    <input type="text" id="fname" className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all outline-none" placeholder="John" />
                  </div>
                  <div>
                    <label htmlFor="lname" className="block text-sm font-medium text-zinc-700 mb-2">Last Name</label>
                    <input type="text" id="lname" className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all outline-none" placeholder="Doe" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-2">Email Address</label>
                  <input type="email" id="email" className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all outline-none" placeholder="john@example.com" />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-zinc-700 mb-2">Subject</label>
                  <input type="text" id="subject" className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all outline-none" placeholder="How can we help?" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-700 mb-2">Message</label>
                  <textarea id="message" rows={5} className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all outline-none resize-none" placeholder="Your message here..." />
                </div>

                <button type="button" className="w-full bg-zinc-900 text-white font-medium py-4 rounded-xl hover:bg-zinc-800 transition-colors shadow-lg shadow-zinc-900/20 text-lg">
                  Send Message
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
