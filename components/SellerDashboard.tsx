
import React, { useState } from 'react';
import { Wallet, Sparkles, UserPlus, ArrowRight, CheckCircle2, BadgeHelp, Rocket, DollarSign, TrendingUp, Copy, Check } from 'lucide-react';
import { useClinic } from '../App';

const SellerDashboard: React.FC = () => {
  const { walletBalance, setWalletBalance } = useClinic();
  const [promoCode] = useState('LAX_ZAIN_10');
  const [showPayout, setShowPayout] = useState(false);
  const [copied, setCopied] = useState(false);

  const stats = [
    { label: 'Referrals', val: '12', icon: <UserPlus size={20} md:size={24} />, color: 'blue' },
    { label: 'Activated', val: '8', icon: <CheckCircle2 size={20} md:size={24} />, color: 'emerald' },
    { label: 'Pending Docs', val: '3', icon: <TrendingUp size={20} md:size={24} />, color: 'amber' },
  ];

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in duration-700 pb-20">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 md:gap-10">
        <div className="space-y-2">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white italic tracking-tighter leading-none">Referral Hub</h2>
          <p className="text-slate-500 font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-[10px]">Medical Representative Portal 2026</p>
        </div>
        
        <div className="bg-slate-900 border-2 border-slate-800 rounded-2xl md:rounded-[48px] p-6 md:p-8 lg:px-12 flex items-center gap-6 md:gap-10 shadow-2xl relative overflow-hidden group w-full lg:w-auto">
           <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
           <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-600 text-white rounded-xl md:rounded-[24px] flex items-center justify-center shadow-xl shadow-blue-600/20 relative z-10 border border-white/10 shrink-0">
              <Wallet size={24} md:size={32} />
           </div>
           <div className="relative z-10">
              <span className="text-[9px] md:text-[10px] font-black uppercase text-slate-500 tracking-widest block mb-1 md:mb-2 italic">Commission</span>
              <span className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none">Rs. {walletBalance.toLocaleString()}</span>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        <div className="lg:col-span-8 space-y-8 md:space-y-12">
           <section className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl md:rounded-[72px] p-8 md:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl group">
              <div className="absolute top-0 right-0 p-8 lg:p-16 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                 <Rocket size={120} md:size={240} />
              </div>
              
              <div className="relative z-10 space-y-8 md:space-y-10">
                 <div className="space-y-3 md:space-y-4">
                    <h3 className="text-3xl md:text-5xl font-black italic tracking-tighter leading-none">Partner Earnings</h3>
                    <p className="text-blue-100 font-bold text-base md:text-lg max-w-lg leading-relaxed">Earn a lifetime 50% commission. Your providers get an instant 10% discount on their first 3 months.</p>
                 </div>

                 <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-6 md:p-10 rounded-2xl md:rounded-[48px] flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-10 shadow-2xl">
                    <div className="text-center lg:text-left">
                       <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-blue-100 block mb-2 md:mb-3">PROMO CODE</span>
                       <code className="text-3xl md:text-5xl font-black tracking-[0.1em] md:tracking-[0.2em] uppercase">{promoCode}</code>
                    </div>
                    <button 
                      onClick={handleCopy}
                      className="w-full lg:w-auto bg-white text-blue-600 px-8 lg:px-10 py-4 lg:py-5 rounded-xl md:rounded-[24px] font-black uppercase tracking-widest text-[10px] md:text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
                    >
                       {copied ? <Check size={16} md:size={20} /> : <Copy size={16} md:size={20} />}
                       {copied ? 'COPIED' : 'COPY'}
                    </button>
                 </div>
              </div>
           </section>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              {stats.map(s => (
                <div key={s.label} className="bg-slate-900 border border-slate-800 p-6 md:p-10 rounded-2xl md:rounded-[48px] space-y-4 group hover:border-blue-500 transition-all shadow-xl">
                   <div className={`text-${s.color}-500 mb-2 md:mb-6 group-hover:scale-110 transition-transform`}>{s.icon}</div>
                   <div>
                     <span className="text-[9px] md:text-[10px] font-black uppercase text-slate-500 tracking-widest block mb-1">{s.label}</span>
                     <span className="text-4xl md:text-5xl font-black text-white italic tracking-tighter">{s.val}</span>
                   </div>
                </div>
              ))}
           </div>
        </div>

        <aside className="lg:col-span-4 space-y-8 md:space-y-10">
           <div className="bg-slate-900 border border-slate-800 rounded-3xl md:rounded-[56px] p-8 md:p-12 space-y-8 md:space-y-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 md:p-10 text-slate-800 opacity-50"><DollarSign size={60} md:size={100} /></div>
              <h4 className="text-lg md:text-xl font-black text-white flex items-center gap-3 italic relative z-10">
                 <DollarSign className="text-blue-500" /> Payouts
              </h4>
              
              <div className="space-y-4 md:space-y-6 relative z-10">
                 <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-bold italic">Settlement floor: <strong className="text-white">Rs. 2,000</strong></p>
                 <div className="h-3 md:h-4 bg-slate-950 rounded-full overflow-hidden border border-slate-800 shadow-inner">
                    <div className="h-full bg-blue-600 shadow-xl" style={{ width: `${Math.min((walletBalance/2000)*100, 100)}%` }} />
                 </div>
                 <p className="text-[9px] md:text-[10px] text-slate-600 font-black uppercase tracking-widest text-right">{Math.floor(Math.min((walletBalance/2000)*100, 100))}% toward goal</p>
              </div>

              <button 
                disabled={walletBalance < 2000}
                onClick={() => setShowPayout(true)}
                className={`w-full py-6 md:py-8 rounded-xl md:rounded-[32px] font-black transition-all flex items-center justify-center gap-4 uppercase tracking-[0.2em] shadow-2xl relative z-10 text-[11px] md:text-sm ${walletBalance >= 2000 ? 'bg-white text-slate-950 shadow-white/10 hover:scale-[1.02] active:scale-95' : 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-50'}`}
              >
                REQUEST PAYOUT
              </button>
           </div>

           <div className="bg-emerald-500/5 border border-emerald-500/20 p-8 md:p-10 rounded-3xl md:rounded-[48px] space-y-4 md:space-y-6 shadow-xl">
              <h5 className="text-emerald-500 font-black uppercase text-[9px] md:text-[10px] tracking-widest flex items-center gap-3 italic">
                 <Sparkles size={16} md:size={18}/> Strategy
              </h5>
              <p className="text-[10px] md:text-xs text-slate-400 leading-relaxed font-bold italic">"Focus on high-volume clinics. Pediatricians and Surgeons see the most repeat bookings."</p>
           </div>
        </aside>
      </div>

      {showPayout && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 backdrop-blur-3xl bg-slate-950/80">
           <div className="bg-slate-900 border border-slate-800 p-8 md:p-16 rounded-[40px] md:rounded-[72px] max-w-lg w-full text-center space-y-8 md:space-y-10 animate-in zoom-in-95 duration-500 shadow-2xl">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mx-auto border-4 border-emerald-500/20 shadow-xl">
                 <CheckCircle2 size={48} md:size={64} />
              </div>
              <div className="space-y-4">
                <h3 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter">Request Sent</h3>
                <p className="text-slate-400 font-bold leading-relaxed text-sm md:text-base">Rs. {walletBalance.toLocaleString()} will be transferred to your JazzCash account ending in <strong className="text-white">***4421</strong>.</p>
              </div>
              <button onClick={() => setShowPayout(false)} className="w-full py-6 md:py-8 bg-white text-slate-950 font-black rounded-2xl md:rounded-[32px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-sm">AWESOME</button>
           </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
