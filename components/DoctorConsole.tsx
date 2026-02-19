
import React, { useState } from 'react';
import { Play, CheckCircle2, User, Activity, AlertCircle, Sparkles, UserPlus, FileText, ChevronRight, UserMinus, MessageSquare } from 'lucide-react';
import { useClinic } from '../App';

const DoctorConsole: React.FC = () => {
  const { queue, currentInSession, callNext, completeSession, markAsSkipped, tier, locations, doctorProfile } = useClinic();
  const [sessionNotes, setSessionNotes] = useState('');

  const emergencyCount = queue.filter(p => p.status === 'EMERGENCY').length;
  const currentTokens = queue.filter(p => p.status !== 'COMPLETED').length;
  const maxOPD = locations[0]?.slots[0]?.maxOPD || 50;
  const isSlotFull = currentTokens >= maxOPD;

  const handleComplete = () => {
    completeSession(sessionNotes);
    setSessionNotes('');
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 md:gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter">Live Station</h2>
          <div className="flex items-center gap-3">
             <span className={`px-2 md:px-3 py-0.5 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-widest ${tier === 'GOLD' ? 'bg-amber-500 text-white' : 'bg-slate-800 text-slate-500'}`}>{tier} PLAN</span>
             <p className="text-slate-500 uppercase tracking-widest text-[8px] md:text-[9px] font-black whitespace-nowrap">DR. {doctorProfile.name.toUpperCase()} • STATION 4</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-3">
           {isSlotFull && (
             <div className="bg-red-500/10 border border-red-500/20 px-3 md:px-4 py-1.5 md:py-2 rounded-xl flex items-center gap-2">
                <AlertCircle className="text-red-500" size={14} md:size={16} />
                <span className="text-[9px] md:text-[10px] font-black text-red-500 uppercase tracking-tight">OPD Full</span>
             </div>
           )}
           {emergencyCount > 0 && (
             <div className="bg-amber-500/10 border border-amber-500/20 px-3 md:px-4 py-1.5 md:py-2 rounded-xl flex items-center gap-2">
                <AlertCircle className="text-amber-500" size={14} md:size={16} />
                <span className="text-[9px] md:text-[10px] font-black text-amber-500 uppercase tracking-tight">{emergencyCount} Emergency!</span>
             </div>
           )}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        <div className="lg:col-span-8 space-y-6 md:space-y-8">
          <section className="bg-slate-900 border border-slate-800 rounded-2xl md:rounded-[40px] p-6 md:p-10 shadow-xl relative overflow-hidden group min-h-[350px] md:min-h-[400px] flex flex-col justify-center items-center text-center">
            {currentInSession ? (
              <div className="relative z-10 space-y-6 w-full max-w-md">
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8px] md:text-[9px] font-black uppercase tracking-widest">Active Session</div>
                <div className="flex flex-col items-center">
                   <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-emerald-500 flex items-center justify-center text-white mb-4 shadow-xl shadow-emerald-500/20">
                      <User size={24} md:size={32} />
                   </div>
                   <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter mb-1 uppercase">{currentInSession.name}</h3>
                   <p className="text-slate-500 font-mono text-xs md:text-sm tracking-widest italic">TOKEN #{currentInSession.token}</p>
                </div>
                
                <div className="w-full space-y-2 text-left">
                  <label className="text-[8px] md:text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <MessageSquare size={12} /> Visit Notes
                  </label>
                  <textarea 
                    value={sessionNotes}
                    onChange={(e) => setSessionNotes(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg md:rounded-xl p-3 md:p-4 text-[11px] md:text-xs font-bold text-white outline-none focus:border-emerald-500 h-20 md:h-24 resize-none transition-all"
                    placeholder="Urdu guidance..."
                  />
                </div>

                <button onClick={handleComplete} className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 md:py-4 rounded-xl md:rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 uppercase tracking-widest text-[10px] md:text-xs">
                  <CheckCircle2 size={16} md:size={18} /> COMPLETE SESSION
                </button>
              </div>
            ) : (
              <div className="relative z-10 space-y-4 md:space-y-6 w-full max-w-sm">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-slate-800 flex items-center justify-center text-slate-600 mb-2 md:mb-4 mx-auto">
                   <Activity size={24} md:size={32} className="animate-pulse" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-slate-600 tracking-tighter italic">Station Idle</h3>
                <button onClick={callNext} className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 md:py-4 rounded-xl md:rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 group active:scale-95 uppercase tracking-widest text-[10px] md:text-xs">
                  <Play size={16} md:size={18} fill="currentColor" /> CALL NEXT PATIENT
                </button>
              </div>
            )}
          </section>

          <div className="bg-slate-900 border border-slate-800 rounded-xl md:rounded-3xl p-6 md:p-8 space-y-3 md:space-y-4 shadow-lg">
             <h4 className="text-base md:text-lg font-black text-white italic tracking-tight flex items-center gap-2">
                <FileText className="text-blue-500" size={16} md:size={20} /> Station Insight
             </h4>
             <p className="text-[10px] md:text-[11px] text-slate-500 leading-relaxed font-medium">
               Real-time status is synced to the Patient Portal. Instructions entered above will trigger the Urdu Voice engine for low-literacy clarity.
             </p>
          </div>
        </div>

        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl md:rounded-[40px] overflow-hidden shadow-lg flex flex-col h-[400px] lg:h-auto">
          <div className="p-5 md:p-6 border-b border-slate-800 bg-slate-800/30 flex justify-between items-center">
             <h3 className="text-xs md:text-sm font-black uppercase tracking-tight text-white">Queue</h3>
             <span className="text-[8px] md:text-[9px] font-black text-slate-500 uppercase tracking-widest">{currentTokens} Total</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
             {queue.filter(p => p.status !== 'COMPLETED' && p.status !== 'IN_SESSION').map(p => (
               <div key={p.id} className={`p-4 md:p-5 rounded-xl md:rounded-2xl border transition-all ${p.status === 'EMERGENCY' ? 'bg-red-500/10 border-red-500/30' : 'bg-slate-950 border-slate-800'} relative group`}>
                  <div className="flex justify-between items-start mb-1">
                     <span className={`text-[7px] md:text-[8px] font-black px-1.5 py-0.5 rounded uppercase ${p.status === 'EMERGENCY' ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-500'}`}>{p.status}</span>
                     <span className="font-mono text-[9px] md:text-[10px] text-slate-600">#{p.token}</span>
                  </div>
                  <h5 className="font-bold text-white text-sm md:text-md uppercase">{p.name}</h5>
                  <div className="mt-3 md:mt-4 pt-3 border-t border-slate-800/50 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all">
                     <button 
                      onClick={() => markAsSkipped(p.id)}
                      className="text-[8px] md:text-[9px] font-black text-red-400 uppercase tracking-widest flex items-center gap-1 hover:text-red-300"
                     >
                       <UserMinus size={10} md:size={12} /> No-Show
                     </button>
                     <ChevronRight className="text-slate-700" size={12} />
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorConsole;
