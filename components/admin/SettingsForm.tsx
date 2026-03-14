'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateStoreSettings, getCloudinarySignature } from '@/lib/admin-actions';
import { uploadToCloudinary } from '@/lib/cloudinary-client';
import { ImagePlus, Instagram, Youtube, Facebook, MapPin, Phone, Mail, MessageSquare, Save, X, Users, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface StoreSettings {
  id: string;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  address: string | null;
  mapLocation: string | null;
  directionsUrl: string | null;
  instagramUrl: string | null;
  facebookUrl: string | null;
  youtubeUrl: string | null;
  profilePic: string | null;
}

export default function SettingsForm({ settings }: { settings: StoreSettings | null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [email, setEmail] = useState(settings?.email || '');
  const [phone, setPhone] = useState(settings?.phone || '');
  const [whatsapp, setWhatsapp] = useState(settings?.whatsapp || '');
  const [address, setAddress] = useState(settings?.address || '');
  const [mapLocation, setMapLocation] = useState(settings?.mapLocation || '');
  const [directionsUrl, setDirectionsUrl] = useState(settings?.directionsUrl || '');
  const [instagramUrl, setInstagramUrl] = useState(settings?.instagramUrl || '');
  const [facebookUrl, setFacebookUrl] = useState(settings?.facebookUrl || '');
  const [youtubeUrl, setYoutubeUrl] = useState(settings?.youtubeUrl || '');
  const [profilePic, setProfilePic] = useState(settings?.profilePic || '');
  const [profileFile, setProfileFile] = useState<File | null>(null);

  const handleMapLocationChange = (val: string) => {
    // If user pastes the whole iframe tag, extract the src
    if (val.trim().startsWith('<iframe')) {
      const match = val.match(/src="([^"]+)"/);
      if (match && match[1]) {
        setMapLocation(match[1]);
        return;
      }
    }
    setMapLocation(val);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileFile(file);
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      let finalProfilePic = profilePic;

      // If there's a new profile file, upload it directly to Cloudinary
      if (profileFile) {
        const signatureData = await getCloudinarySignature();
        const url = await uploadToCloudinary(profileFile, signatureData as any);
        finalProfilePic = url;
      }

      const formData = new FormData();
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('whatsapp', whatsapp);
      formData.append('address', address);
      formData.append('mapLocation', mapLocation);
      formData.append('directionsUrl', directionsUrl);
      formData.append('instagramUrl', instagramUrl);
      formData.append('facebookUrl', facebookUrl);
      formData.append('youtubeUrl', youtubeUrl);
      formData.append('profilePic', finalProfilePic);

      const res = await updateStoreSettings(formData);
      if (res.success) {
        setSuccess(true);
        router.refresh();
      } else {
        throw new Error(res.error || 'Failed to update settings');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="animate-in fade-in duration-700 space-y-8 md:space-y-12">
      {/* Header with Save Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
        <div>
          <h2 className="text-2xl md:text-5xl font-serif font-black text-zinc-900 tracking-tighter mb-1 md:mb-3 uppercase">
             Store Settings
          </h2>
          <p className="text-zinc-400 font-medium font-serif italic text-base md:text-lg">
            Manage your digital identity and contact channels.
          </p>
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="group flex items-center gap-2 md:gap-3 bg-zinc-950 text-white px-6 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[9px] md:text-[11px] hover:bg-[var(--color-gold)] transition-all duration-500 shadow-xl shadow-zinc-900/20 active:scale-95 disabled:opacity-70"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : <Save size={16} className="md:size-[18px] group-hover:scale-110 transition-transform" />}
          Save Configuration
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 px-6 py-4 md:px-8 md:py-5 rounded-xl md:rounded-2xl border border-red-100 font-bold uppercase tracking-widest text-[9px] md:text-[10px] animate-in slide-in-from-top-4 duration-500">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 text-green-600 px-6 py-4 md:px-8 md:py-5 rounded-xl md:rounded-2xl border border-green-100 font-bold uppercase tracking-widest text-[9px] md:text-[10px] animate-in slide-in-from-top-4 duration-500">
          Configuration updated successfully!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
        {/* Profile & Branding */}
        <div className="lg:col-span-1 space-y-6 md:space-y-10">
          <div className="bg-white p-6 md:p-10 rounded-2xl md:rounded-[3rem] shadow-sm border border-zinc-100 flex flex-col items-center">
            <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6 md:mb-10 self-start">Visual Identity</h3>
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-zinc-50 border-4 md:border-8 border-white shadow-2xl relative mb-2">
                {profilePic ? (
                  <Image src={profilePic} alt="Profile" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-200">
                    <Users size={48} className="md:size-[64px]" />
                  </div>
                )}
              </div>
              <label className="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-10 h-10 md:w-12 md:h-12 bg-zinc-950 text-white rounded-full flex items-center justify-center cursor-pointer shadow-xl hover:bg-[var(--color-gold)] transition-all active:scale-90 z-10">
                <ImagePlus size={16} className="md:size-[20px]" />
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
            <p className="text-[9px] md:text-[10px] text-zinc-400 font-bold mt-6 md:mt-8 text-center uppercase tracking-widest leading-relaxed px-4">
              Authorized brand representative profile image.
            </p>
          </div>

          <div className="bg-white p-6 md:p-10 rounded-2xl md:rounded-[3rem] shadow-sm border border-zinc-100">
            <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6 md:mb-10">Social Ecosystem</h3>
            <div className="space-y-6 md:space-y-8">
              <div className="space-y-2 md:space-y-3">
                <label className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-700">
                  <Instagram size={12} className="text-pink-600 md:size-[14px]" /> Instagram Handle
                </label>
                <input 
                  type="url" value={instagramUrl} onChange={e => setInstagramUrl(e.target.value)}
                  className="w-full px-5 py-3.5 md:px-6 md:py-4 bg-zinc-50 border border-zinc-100 rounded-xl md:rounded-2xl outline-none focus:ring-2 focus:ring-zinc-950 transition-all font-bold text-xs md:text-sm"
                  placeholder="https://instagram.com/fktrend"
                />
              </div>
              <div className="space-y-2 md:space-y-3">
                <label className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-700">
                  <Youtube size={12} className="text-red-600 md:size-[14px]" /> YouTube Channel
                </label>
                <input 
                  type="url" value={youtubeUrl} onChange={e => setYoutubeUrl(e.target.value)}
                  className="w-full px-5 py-3.5 md:px-6 md:py-4 bg-zinc-50 border border-zinc-100 rounded-xl md:rounded-2xl outline-none focus:ring-2 focus:ring-zinc-950 transition-all font-bold text-xs md:text-sm"
                  placeholder="https://youtube.com/@fktrend"
                />
              </div>
              <div className="space-y-2 md:space-y-3">
                <label className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-700">
                  <Facebook size={12} className="text-blue-600 md:size-[14px]" /> Facebook Profile
                </label>
                <input 
                  type="url" value={facebookUrl} onChange={e => setFacebookUrl(e.target.value)}
                  className="w-full px-5 py-3.5 md:px-6 md:py-4 bg-zinc-50 border border-zinc-100 rounded-xl md:rounded-2xl outline-none focus:ring-2 focus:ring-zinc-950 transition-all font-bold text-xs md:text-sm"
                  placeholder="https://facebook.com/fktrend"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Location */}
        <div className="lg:col-span-2 space-y-6 md:space-y-10">
          <div className="bg-white p-6 md:p-10 rounded-2xl md:rounded-[3rem] shadow-sm border border-zinc-100">
            <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6 md:mb-10">Communications Hub</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-2 md:space-y-3">
                <label className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-700">
                  <Mail size={12} className="md:size-[14px]" /> Official Email
                </label>
                <input 
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full px-5 py-3.5 md:px-6 md:py-4 bg-zinc-50 border border-zinc-100 rounded-xl md:rounded-2xl outline-none focus:ring-2 focus:ring-zinc-950 transition-all font-bold text-xs md:text-sm tabular-nums"
                  placeholder="info@fktrend.com"
                />
              </div>
              <div className="space-y-2 md:space-y-3">
                <label className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-700">
                  <Phone size={12} className="md:size-[14px]" /> Direct Line
                </label>
                <input 
                  type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                  className="w-full px-5 py-3.5 md:px-6 md:py-4 bg-zinc-50 border border-zinc-100 rounded-xl md:rounded-2xl outline-none focus:ring-2 focus:ring-zinc-950 transition-all font-bold text-xs md:text-sm tabular-nums"
                  placeholder="+91 99999 99999"
                />
              </div>
              <div className="space-y-2 md:space-y-3">
                <label className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-700">
                  <MessageSquare size={12} className="text-green-600 md:size-[14px]" /> WhatsApp Interface
                </label>
                <input 
                  type="tel" value={whatsapp} onChange={e => setWhatsapp(e.target.value)}
                  className="w-full px-5 py-3.5 md:px-6 md:py-4 bg-zinc-50 border border-zinc-100 rounded-xl md:rounded-2xl outline-none focus:ring-2 focus:ring-zinc-950 transition-all font-bold text-xs md:text-sm tabular-nums"
                  placeholder="919999999999"
                />
              </div>
            </div>
            <div className="mt-6 md:mt-8 space-y-2 md:space-y-3">
              <label className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-700">
                <MapPin size={12} className="md:size-[14px]" /> Physical Headquarters
              </label>
              <textarea 
                rows={3} value={address} onChange={e => setAddress(e.target.value)}
                className="w-full px-5 py-3.5 md:px-6 md:py-4 bg-zinc-50 border border-zinc-100 rounded-xl md:rounded-2xl outline-none focus:ring-2 focus:ring-zinc-950 resize-none transition-all font-medium text-xs md:text-sm"
                placeholder="123 Luxury Avenue, Fashion District..."
              />
            </div>
          </div>

          <div className="bg-white p-6 md:p-10 rounded-2xl md:rounded-[3rem] shadow-sm border border-zinc-100 relative overflow-hidden group-map">
            <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6 md:mb-10">Cartographic Integration</h3>
            <div className="space-y-4 md:space-y-6">
              <div className="space-y-2 md:space-y-3">
                <label className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-zinc-700">
                  <ExternalLink size={12} className="md:size-[14px]" /> Maps Embed Signature
                </label>
                <input 
                  type="text" 
                  value={mapLocation} 
                  onChange={e => setMapLocation(e.target.value)}
                  className="w-full px-5 py-3.5 md:px-6 md:py-4 bg-zinc-50 border border-zinc-100 rounded-xl md:rounded-2xl outline-none focus:ring-2 focus:ring-zinc-950 transition-all font-medium text-[10px] md:text-xs truncate"
                  placeholder="Paste Google Maps iframe src..."
                />
                <p className="text-[8px] md:text-[9px] text-zinc-400 font-bold uppercase tracking-widest mt-2">
                  Use the "Embed a map" URL from Google Maps (src attribute).
                </p>
              </div>
              <div className="space-y-2 md:space-y-3">
                <label className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-700">
                  <MapPin size={12} className="md:size-[14px]" /> Navigation Link (Directions)
                </label>
                <input 
                  type="text" 
                  value={directionsUrl} 
                  onChange={e => setDirectionsUrl(e.target.value)}
                  className="w-full px-5 py-3.5 md:px-6 md:py-4 bg-zinc-50 border border-zinc-100 rounded-xl md:rounded-2xl outline-none focus:ring-2 focus:ring-zinc-950 transition-all font-medium text-[10px] md:text-xs"
                  placeholder="Paste your Google Maps location URL here..."
                />
                <p className="text-[8px] md:text-[9px] text-zinc-400 font-bold uppercase tracking-widest mt-2">
                  This will be used for the "Get Directions" button.
                </p>
              </div>
              <div className="aspect-[16/9] md:aspect-[21/9] w-full rounded-xl md:rounded-[2rem] bg-zinc-50 overflow-hidden relative border border-zinc-100 shadow-inner group-hover-map:shadow-2xl transition-all duration-700">
                {mapLocation ? (
                  <iframe 
                    src={mapLocation}
                    width="100%" height="100%" style={{ border: 0 }}
                    allowFullScreen loading="lazy"
                    className="grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-zinc-200">
                    <MapPin size={32} className="md:size-[48px] mb-2 md:mb-4 opacity-50" />
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">Map Preview Awaiting Signature</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
