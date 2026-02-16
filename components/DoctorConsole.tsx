
import React from 'react';
import { Play, LogOut, CheckCircle2, User, Activity, AlertCircle, Clock } from 'lucide-react';
import { useClinic } from '../App';

const DoctorConsole: React.FC = () => {
  const { queue, currentInSession, callNext, completeSession, isDoctorLate } = useClinic();

  const emergencyCount = queue.filter(p => p.status === 'EMERGENCY').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-white">Doctor Console</h2>
          <p className="text-slate-400 mt-1 uppercase tracking-widest text-[10px] font-black">OPD Room #4 | Live Feedback</p>
        </div>

        <div className="flex gap-4">
           {isDoctorLate && (
             <div className="bg-red-500/10 border border-red-500/20 px-6 py-4 rounded-3xl flex items-center gap-3 animate-pulse">
                <Clock className="text-red-500" size={20} />
                <span className="text-xs font-black text-red-500 uppercase tracking-tight">System Alert: You are late</span>
             </div>
           )}
           {emergencyCount > 0 && (
             <div className="bg-amber-500/10 border border-amber-500/20 px-6 py-4 rounded-3xl flex items-center gap-3">
                <AlertCircle className="text-amber-500" size={20} />
                <span className="text-xs font-black text-amber-500 uppercase tracking-tight">{emergencyCount} Emergency Pending</span>
             </div>
           )}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Status / Call Next */}
        <div className="lg:col-span-8 space-y-8">
          <section className="bg-slate-900 border border-slate-800 rounded-[48px] p-12 shadow-2xl relative overflow-hidden group min-h-[400px] flex flex-col justify-center items-center text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-50" />
            
            {currentInSession ? (
              <div className="relative z-10 space-y-8 w-full max-w-md">
                <div className="inline-block px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-4">
                  In Session
                </div>
                <div className="flex flex-col items-center">
                   <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center text-white mb-6 shadow-2xl shadow-emerald-500/40 ring-4 ring-white/10">
                      <User size={48} />
                   </div>
                   <h3 className="text-5xl font-black text-white tracking-tighter mb-2">{currentInSession.name}</h3>
                   <p className="text-slate-500 font-mono text-xl tracking-widest">TOKEN #{currentInSession.token}</p>
                </div>
                <button 
                  onClick={completeSession}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-black py-6 rounded-[32px] shadow-2xl transition-all flex items-center justify-center gap-3 group active:scale-95"
                >
                  <CheckCircle2 size={24} className="group-hover:scale-110 transition-transform" />
                  COMPLETE & CALL NEXT
                </button>
              </div>
            ) : (
              <div className="relative z-10 space-y-8 w-full max-w-md">
                <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center text-slate-600 mb-6 mx-auto">
                   <Activity size={48} className="animate-pulse" />
                </div>
                <h3 className="text-4xl font-black text-slate-600 tracking-tighter">Station Idle</h3>
                <p className="text-slate-500 text-sm max-w-xs mx-auto">Ready to see the next patient? Click below to broadcast the announcement.</p>
                <button 
                  onClick={callNext}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-6 rounded-[32px] shadow-2xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-3 group active:scale-95"
                >
                  <Play size={24} fill="currentColor" className="group-hover:scale-110 transition-transform" />
                  START NEXT SESSION
                </button>
              </div>
            )}
          </section>

          <div className="bg-slate-900/50 border border-slate-800 rounded-[32px] p-8 flex items-start gap-6">
             <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 shrink-0">
                <Activity size={24} />
             </div>
             <div>
               <h4 className="text-white font-bold mb-2">Efficiency Insight</h4>
               <p className="text-sm text-slate-500 leading-relaxed">
                 By calling patients only when you are truly ready, the <strong>"Wait-Room Crowding"</strong> is reduced by 60%. Patients receive an Urdu audio prompt on their phones the second you press "Start".
               </p>
             </div>
          </div>
        </div>

        {/* Side Queue List */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-[48px] overflow-hidden shadow-xl flex flex-col">
          <div className="p-8 border-b border-slate-800 bg-slate-800/30">
             <h3 className="text-lg font-black uppercase tracking-tight text-white">Up Next</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
             {queue.filter(p => p.status !== 'COMPLETED' && p.status !== 'IN_SESSION').length > 0 ? (
               queue.filter(p => p.status !== 'COMPLETED' && p.status !== 'IN_SESSION').map(p => (
                 <div key={p.id} className={`p-6 rounded-[28px] border transition-all ${
                   p.status === 'EMERGENCY' ? 'bg-red-500/10 border-red-500/30' : 'bg-slate-950 border-slate-800'
                 }`}>
                    <div className="flex justify-between items-start mb-2">
                       <span className={`text-[10px] font-black px-2 py-1 rounded-lg uppercase ${
                         p.status === 'EMERGENCY' ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-500'
                       }`}>
                         {p.status}
                       </span>
                       <span className="font-mono text-xs text-slate-600">Token {p.token}</span>
                    </div>
                    <h5 className="font-bold text-white text-lg">{p.name}</h5>
                    <p className="text-[10px] text-slate-600 uppercase tracking-widest mt-1">Waiting: ~{p.token * 5}m</p>
                 </div>
               ))
             ) : (
               <div className="h-full flex flex-col items-center justify-center text-slate-700 opacity-20 py-20">
                  <User size={64} />
                  <p className="font-black text-xs uppercase mt-4">Queue Clear</p>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorConsole;
