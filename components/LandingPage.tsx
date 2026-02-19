
import React from 'react';
import { Stethoscope, UserCircle, BadgeHelp, ArrowRight, Sparkles } from 'lucide-react';

const LandingPage = ({ onSelect }: { onSelect: (r: any) => void }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Liquid Flow Simulation */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 blur-[120px] opacity-20">
         <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-500 rounded-full animate-pulse" />
         <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600 rounded-full animate-pulse delay-700" />
      </div>

      <div className="max-w-5xl w-full space-y-16">
        <header className="text-center space-y-6">
           <h1 className="text-7xl md:text-8xl font-black text-white italic tracking-tighter">Choose Your Role</h1>
           <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-sm">No-Wait Clinics Ecosystem v2026</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <RoleCard 
            title="Healthcare Provider" 
            sub="Doctors & Clinic Owners" 
            icon={<Stethoscope size={48} />}
            color="emerald"
            onClick={() => onSelect('DOCTOR')}
          />
          <RoleCard 
            title="Healthcare Seeker" 
            sub="Patients & Caregivers" 
            icon={<UserCircle size={48} />}
            color="blue"
            onClick={() => onSelect('PATIENT')}
          />
          <RoleCard 
            title="Business Partner" 
            sub="Referral & Marketplace Sales" 
            icon={<BadgeHelp size={48} />}
            color="amber"
            onClick={() => onSelect('SELLER')}
          />
        </div>
        
        <div className="text-center pt-10">
           <button onClick={() => onSelect('ADMIN')} className="text-slate-600 hover:text-white transition-all font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 mx-auto">
             System Administrator Access <ArrowRight size={14} />
           </button>
        </div>
      </div>
    </div>
  );
};

const RoleCard = ({ title, sub, icon, color, onClick }: any) => {
  const themes = {
    emerald: 'bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500 hover:shadow-emerald-500/20',
    blue: 'bg-blue-600/10 border-blue-600/20 hover:border-blue-500 hover:shadow-blue-500/20',
    amber: 'bg-amber-500/10 border-amber-500/20 hover:border-amber-500 hover:shadow-amber-500/20',
  }[color as 'emerald' | 'blue' | 'amber'];

  return (
    <button 
      onClick={onClick}
      className={`group relative p-10 rounded-[56px] border-2 transition-all duration-700 text-left h-[420px] flex flex-col justify-between overflow-hidden ${themes} shadow-2xl backdrop-blur-xl`}
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-1000" />
      
      {/* Skeuomorphic Icon Container */}
      <div className={`w-28 h-28 rounded-3xl flex items-center justify-center text-white shadow-[inset_0_4px_8px_rgba(255,255,255,0.3),_0_10px_20px_rgba(0,0,0,0.5)] border border-white/20 transition-all group-hover:scale-110 group-hover:rotate-6 ${
        color === 'emerald' ? 'bg-gradient-to-br from-emerald-400 to-emerald-600' : 
        color === 'blue' ? 'bg-gradient-to-br from-blue-400 to-blue-600' : 
        'bg-gradient-to-br from-amber-400 to-amber-600'
      }`}>
        {icon}
      </div>

      <div className="space-y-4">
        <h3 className="text-4xl font-black text-white italic tracking-tighter leading-none">{title}</h3>
        <p className="text-slate-500 font-bold text-lg leading-tight">{sub}</p>
        <div className="pt-4 flex items-center gap-2 text-white font-black uppercase text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
          Enter Portal <Sparkles size={16} />
        </div>
      </div>
    </button>
  );
};

export default LandingPage;
