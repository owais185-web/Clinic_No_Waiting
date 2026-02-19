
import React, { useState } from 'react';
import { Rocket, ShieldCheck, CreditCard, Check, ArrowRight, Upload, Building, Banknote, Sparkles } from 'lucide-react';
import { useClinic } from '../App';

const DoctorOnboarding: React.FC = () => {
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState<'GOLD' | 'PLATINUM' | null>(null);
  const { setSubscribed } = useClinic();

  const handleFinish = () => {
    setSubscribed(true);
    // In a real app, transition back to dashboard
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <header className="text-center space-y-4">
        <div className="inline-block px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-2">
          Merchant Program
        </div>
        <h2 className="text-5xl font-black text-white italic tracking-tighter">Onboard Your Clinic</h2>
        <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">v2026 Commercial License Setup</p>
      </header>

      {/* Progress Bar */}
      <div className="flex items-center justify-between max-w-md mx-auto relative mb-20">
        <div className="absolute top-1/2 left-0 w-full h-px bg-slate-800 -translate-y-1/2" />
        {[1, 2, 3].map((s) => (
          <div 
            key={s} 
            className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 transition-all duration-500 ${
              step >= s ? 'bg-emerald-500 border-white text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
          >
            {s}
          </div>
        ))}
      </div>

      {step === 1 && (
        <section className="bg-slate-900 border border-slate-800 rounded-[48px] p-12 space-y-10 animate-in zoom-in-95 duration-500">
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-white flex items-center gap-3">
              <Building className="text-emerald-400" />
              Clinic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500">Practice Name</label>
                <input className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 font-bold text-white outline-none focus:border-emerald-500 transition-all" placeholder="e.g. HealthFirst Clinic" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500">Specialization</label>
                <input className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 font-bold text-white outline-none focus:border-emerald-500 transition-all" placeholder="e.g. Pediatrics" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500">OPD Consultation Fee (PKR)</label>
              <div className="relative">
                <Banknote className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 pl-12 font-mono text-xl text-white outline-none focus:border-emerald-500 transition-all" placeholder="1500" />
              </div>
            </div>
          </div>
          <button onClick={() => setStep(2)} className="w-full py-6 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-3xl shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all">
            CHOOSE SUBSCRIPTION
            <ArrowRight size={20} />
          </button>
        </section>
      )}

      {step === 2 && (
        <section className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PlanCard 
              name="GOLD" 
              price="Rs. 5,000" 
              period="/mo"
              features={['Up to 500 tokens/mo', 'Basic Voice Engine', 'Standard Support']}
              active={plan === 'GOLD'}
              onClick={() => setPlan('GOLD')}
              color="gold"
            />
            <PlanCard 
              name="PLATINUM" 
              price="Rs. 12,000" 
              period="/mo"
              features={['Unlimited tokens', 'Custom Voice (Urdu/Punjabi)', 'Premium Insights', 'Priority Discoverability']}
              active={plan === 'PLATINUM'}
              onClick={() => setPlan('PLATINUM')}
              color="platinum"
            />
          </div>
          <button disabled={!plan} onClick={() => setStep(3)} className="w-full py-6 bg-white text-slate-950 font-black rounded-3xl shadow-xl hover:bg-slate-100 disabled:opacity-50 transition-all flex items-center justify-center gap-2">
            NEXT: DOCUMENTATION
            <ArrowRight size={20} />
          </button>
        </section>
      )}

      {step === 3 && (
        <section className="bg-slate-900 border border-slate-800 rounded-[48px] p-12 space-y-10 animate-in zoom-in-95 duration-500">
          <div className="space-y-6 text-center">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto text-emerald-400">
               <ShieldCheck size={40} />
            </div>
            <h3 className="text-3xl font-black text-white">License Verification</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">Please upload your PMDC/Council certification to activate your live marketplace profile.</p>
          </div>

          <div className="border-2 border-dashed border-slate-800 rounded-[32px] p-12 flex flex-col items-center justify-center gap-4 bg-slate-950/50 hover:bg-slate-950 transition-all cursor-pointer group">
            <Upload className="text-slate-500 group-hover:text-emerald-400 transition-colors" size={48} />
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Click to upload PDF or Photo</p>
          </div>

          <button onClick={handleFinish} className="w-full py-6 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-3xl shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all">
            COMPLETE ONBOARDING
            <Sparkles size={20} />
          </button>
        </section>
      )}
    </div>
  );
};

const PlanCard = ({ name, price, period, features, active, onClick, color }: any) => {
  const isGold = color === 'gold';
  return (
    <button 
      onClick={onClick}
      className={`relative w-full text-left p-10 rounded-[48px] border-2 transition-all duration-500 overflow-hidden group ${
        active 
        ? (isGold ? 'bg-amber-500/20 border-amber-400 ring-8 ring-amber-500/10' : 'bg-slate-100 border-white ring-8 ring-white/10') 
        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
      }`}
    >
      <div className={`absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform ${isGold ? 'text-amber-400' : 'text-slate-400'}`}>
        <CreditCard size={120} />
      </div>

      <h4 className={`text-sm font-black uppercase tracking-[0.3em] mb-4 ${active ? (isGold ? 'text-amber-400' : 'text-slate-950') : 'text-slate-500'}`}>{name}</h4>
      <div className="mb-8">
        <span className={`text-5xl font-black ${active ? (isGold ? 'text-white' : 'text-slate-950') : 'text-white'}`}>{price}</span>
        <span className={`text-sm font-bold ${active ? (isGold ? 'text-amber-400/60' : 'text-slate-500') : 'text-slate-600'}`}>{period}</span>
      </div>

      <ul className="space-y-4 relative z-10">
        {features.map((f: string, i: number) => (
          <li key={i} className={`flex items-center gap-3 text-sm font-bold ${active ? (isGold ? 'text-white/80' : 'text-slate-700') : 'text-slate-400'}`}>
            <Check size={16} className={isGold ? 'text-amber-400' : 'text-emerald-500'} />
            {f}
          </li>
        ))}
      </ul>
    </button>
  );
};

export default DoctorOnboarding;
