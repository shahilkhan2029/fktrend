import { getUserProfile } from '@/lib/actions';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Phone, Calendar, LogOut, ChevronRight } from 'lucide-react';

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  const profile = await getUserProfile();
  if (!profile) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-zinc-50/50 py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-serif font-black text-zinc-900 mb-2 tracking-tight">Your Profile</h1>
          <p className="text-zinc-500">Manage your account details and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-zinc-100 shadow-sm text-center animate-fade-in">
              <div className="w-24 h-24 bg-zinc-900 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-black shadow-xl shadow-zinc-900/10">
                {profile.name.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-xl font-serif font-bold text-zinc-900 mb-1">{profile.name}</h2>
              <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-6">FK Trend Member</p>
              
              <div className="pt-6 border-t border-zinc-50 space-y-2">
                <Link 
                  href="/bookings" 
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-50 transition-all group"
                >
                  <span className="text-xs font-bold text-zinc-600 group-hover:text-zinc-900">My Bookings</span>
                  <ChevronRight size={14} className="text-zinc-300" />
                </Link>
                <Link 
                  href="/wishlist" 
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-50 transition-all group"
                >
                  <span className="text-xs font-bold text-zinc-600 group-hover:text-zinc-900">Wishlist</span>
                  <ChevronRight size={14} className="text-zinc-300" />
                </Link>
              </div>
            </div>
          </div>

          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-zinc-100 shadow-sm animate-fade-in md:delay-75">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-8 pb-4 border-b border-zinc-50">Account Information</h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-10 h-10 bg-zinc-50 text-zinc-400 rounded-xl flex items-center justify-center shrink-0">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-1">Full Name</p>
                    <p className="text-base font-bold text-zinc-900">{profile.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-10 h-10 bg-zinc-50 text-zinc-400 rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-1">Email Address</p>
                    <p className="text-base font-bold text-zinc-900">{profile.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-10 h-10 bg-zinc-50 text-zinc-400 rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-1">Phone Number</p>
                    <p className="text-base font-bold text-zinc-900">{profile.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-10 h-10 bg-zinc-50 text-zinc-400 rounded-xl flex items-center justify-center shrink-0">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-1">Joined Date</p>
                    <p className="text-base font-bold text-zinc-900">
                      {new Date(profile.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-zinc-50 flex justify-between items-center">
                <button className="bg-zinc-900 text-white px-8 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-900/10">
                  Edit Profile
                </button>
                <button className="text-red-500 font-black text-[10px] uppercase tracking-widest hover:text-red-600 transition-colors flex items-center gap-2">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
            
            <div className="bg-zinc-900 rounded-3xl p-8 text-white relative overflow-hidden group animate-fade-in md:delay-150">
              <div className="relative z-10">
                <h3 className="text-2xl font-serif font-bold mb-2">Need Assistance?</h3>
                <p className="text-zinc-400 text-xs mb-6 max-w-xs">Our premium support team is available from 10 AM to 8 PM to help you with your reservations.</p>
                <Link href="/contact" className="inline-block bg-white text-zinc-900 px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-[var(--color-gold)] hover:text-white transition-all">
                  Contact Support
                </Link>
              </div>
              <div className="absolute right-[-20px] bottom-[-20px] opacity-10 group-hover:scale-110 transition-transform duration-700">
                <User size={180} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
