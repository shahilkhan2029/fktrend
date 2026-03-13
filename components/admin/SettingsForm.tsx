'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateStoreSettings, getCloudinarySignature } from '@/lib/admin-actions';
import { uploadToCloudinary } from '@/lib/cloudinary-client';
import { ImagePlus, Instagram, Youtube, Facebook, MapPin, Phone, Mail, MessageSquare, Save, X } from 'lucide-react';
import Image from 'next/image';

interface StoreSettings {
  id: string;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  address: string | null;
  mapLocation: string | null;
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
  const [instagramUrl, setInstagramUrl] = useState(settings?.instagramUrl || '');
  const [facebookUrl, setFacebookUrl] = useState(settings?.facebookUrl || '');
  const [youtubeUrl, setYoutubeUrl] = useState(settings?.youtubeUrl || '');
  const [profilePic, setProfilePic] = useState(settings?.profilePic || '');
  const [profileFile, setProfileFile] = useState<File | null>(null);

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
    <form onSubmit={handleSubmit} className="animate-fade-in">
      {/* Header with Save Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[var(--color-gold)] rounded-xl flex items-center justify-center text-white">
                  <X size={24} className="rotate-45" /> {/* Using X rotated as a settings-like icon or just keep Settings icon if available */}
              </div>
              <h1 className="text-3xl font-serif font-bold text-zinc-900">Store Settings</h1>
          </div>
          <p className="text-zinc-600">Manage your store's contact information, social links, and branding.</p>
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="bg-zinc-900 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-lg flex items-center justify-center gap-3 whitespace-nowrap disabled:opacity-70"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : <Save size={20} />}
          Save Changes
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 font-medium mb-8">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 text-green-600 p-4 rounded-xl border border-green-100 font-medium mb-8">
          Settings updated successfully!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile & Branding */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 flex flex-col items-center">
            <h3 className="text-lg font-bold text-zinc-900 mb-6 self-start">Store Profile</h3>
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-zinc-100 border-4 border-white shadow-lg relative">
                {profilePic ? (
                  <Image src={profilePic} alt="Profile" fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-300">
                    <Mail size={48} />
                  </div>
                )}
              </div>
              <label className="absolute bottom-0 right-0 w-10 h-10 bg-zinc-900 text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-zinc-800 transition-colors">
                <ImagePlus size={18} />
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
            <p className="text-sm text-zinc-500 mt-6 text-center">
              This picture will be used in the about section and contact pages.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-900 mb-6">Social Links</h3>
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 mb-2">
                  <Instagram size={16} className="text-pink-600" /> Instagram URL
                </label>
                <input 
                  type="url" value={instagramUrl} onChange={e => setInstagramUrl(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900 text-sm"
                  placeholder="https://instagram.com/fktrend"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 mb-2">
                  <Youtube size={16} className="text-red-600" /> YouTube URL
                </label>
                <input 
                  type="url" value={youtubeUrl} onChange={e => setYoutubeUrl(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900 text-sm"
                  placeholder="https://youtube.com/@fktrend"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 mb-2">
                  <Facebook size={16} className="text-blue-600" /> Facebook URL
                </label>
                <input 
                  type="url" value={facebookUrl} onChange={e => setFacebookUrl(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900 text-sm"
                  placeholder="https://facebook.com/fktrend"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Location */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-900 mb-6">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 mb-2">
                  <Mail size={16} /> Contact Email
                </label>
                <input 
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900"
                  placeholder="info@fktrend.com"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 mb-2">
                  <Phone size={16} /> Phone Number
                </label>
                <input 
                  type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900"
                  placeholder="+91 99999 99999"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 mb-2">
                  <MessageSquare size={16} className="text-green-600" /> WhatsApp Number
                </label>
                <input 
                  type="tel" value={whatsapp} onChange={e => setWhatsapp(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900"
                  placeholder="919999999999 (No + or spaces)"
                />
              </div>
            </div>
            <div className="mt-6">
              <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 mb-2">
                <MapPin size={16} /> Physical Address
              </label>
              <textarea 
                rows={3} value={address} onChange={e => setAddress(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900 resize-none"
                placeholder="Shop No. 12, Fashion Street, City-400001"
              />
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-900 mb-6">Google Maps Integration</h3>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 mb-2">
                <MapPin size={16} /> Embed URL
              </label>
              <input 
                type="text" value={mapLocation} onChange={e => setMapLocation(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900 mb-4"
                placeholder="Paste the src attribute from Google Maps embed code"
              />
              <div className="aspect-video w-full rounded-xl bg-zinc-100 overflow-hidden relative border border-zinc-200">
                {mapLocation ? (
                  <iframe 
                    src={mapLocation}
                    width="100%" height="100%" style={{ border: 0 }}
                    allowFullScreen loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 text-sm">
                    <MapPin size={32} className="mb-2" />
                    Preview will appear here
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
