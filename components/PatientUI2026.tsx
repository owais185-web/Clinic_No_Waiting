
import React, { useState, useEffect } from 'react';
import { Banknote, User, MapPin, Check, Smartphone, Mic, Volume2, AlertCircle, Clock } from 'lucide-react';
import { useClinic } from '../App';

const PatientUI2026: React.FC = () => {
  const { queue, currentInSession, isDoctorLate } = useClinic();
  const [isRecording, setIsRecording] = useState(false);
  const [myToken, setMyToken] = useState<number | null>(null);

  useEffect(() => {
    const waiting = queue.filter(p => p.status !== 'COMPLETED' && p.status !== 'IN_SESSION');
    if (waiting.length > 0 && !myToken) {
      setMyToken(waiting[waiting.length - 1].token);
    }
  }, [queue, myToken]);

  const myData = queue.find(p => p.token === myToken);
  const peopleAhead = myToken && currentInSession ? myToken - currentInSession.token - 1 : queue.filter(p => p.token < (myToken || 0) && p.status !== 'COMPLETED').length;
  const emergencyPending = queue.filter(p => p.status === 'EMERGENCY').length;
  
  const statusLabel = myData?.status === 'IN_SESSION' ? 'Your Turn!' : 
                    myData?.status === 'TIME_TO_MOVE' ? 'LEAVE NOW' : 
                    myData?.status === 'COMPLETED' ? 'Finished' : 'Waiting';

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-black text-white italic tracking-tighter">Your Clinic</h2>
          <p className="text-slate-500 mt-2 font-bold uppercase text-[10px] tracking-widest">Live Patient Session</p>
        </div>
        <div className="flex gap-2">
           {isDoctorLate && (
             <div className="bg-red-500/10 px-4 py-2 rounded-2xl border border-red-500/20 flex items-center gap-2">
                <Clock className="text-red-500" size={16} />
                <span className="text-[10px] font-black uppercase text-red-500">Delay</span>
             </div>
           )}
           <div className="bg-slate-900 px-4 py-2 rounded-2xl border border-slate-800 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase text-emerald-500">Live</span>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="relative aspect-[9/19] max-w-sm mx-auto w-full bg-[#020617] rounded-[56px] border-[12px] border-slate-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden ring-1 ring-slate-800">
          
          <div className={`absolute inset-0 transition-all duration-1000 blur-[100px] opacity-20 -z-10 ${
            myData?.status === 'IN_SESSION' ? 'bg-emerald-500' : 
            myData?.status === 'TIME_TO_MOVE' ? 'bg-amber-500 scale-150' : 
            emergencyPending > 0 ? 'bg-red-600 animate-pulse' : 'bg-blue-600'
          }`} />

          <div className="p-8 h-full flex flex-col relative">
            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-6 rounded-[36px] flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border border-white/10">
                <User className="text-slate-500" size={28} />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-black tracking-tight">Dr. Zain Malik</h4>
                <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">OPD Room #4</p>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-10">
              <div className={`w-full backdrop-blur-3xl border rounded-[48px] p-10 flex flex-col items-center shadow-2xl transition-all duration-1000 ${
                myData?.status === 'TIME_TO_MOVE' ? 'bg-amber-500/20 border-amber-500/30 py-20 ring-4 ring-amber-500/10' : 
                myData?.status === 'IN_SESSION' ? 'bg-emerald-500/20 border-emerald-500/30 py-16' : 
                emergencyPending > 0 ? 'bg-red-500/20 border-red-500/30 ring-4 ring-red-500/10' :
                'bg-white/5 border-white/10 py-12'
              }`}>
                <span className="text-[10px] uppercase tracking-[0.4em] font-black text-slate-500 mb-2">Token Number</span>
                <h3 className={`text-9xl font-black transition-colors duration-1000 tracking-tighter ${
                    myData?.status === 'TIME_TO_MOVE' ? 'text-amber-400' : 
                    emergencyPending > 0 ? 'text-red-500' : 'text-white'
                }`}>{myToken || '--'}</h3>
                
                <div className="mt-8 text-center">
                  <p className={`text-xl font-black uppercase tracking-widest transition-colors ${
                    myData?.status === 'TIME_TO_MOVE' ? 'text-amber-400 animate-pulse' : 
                    myData?.status === 'IN_SESSION' ? 'text-emerald-400' : 
                    emergencyPending > 0 ? 'text-red-500' : 'text-slate-400'
                  }`}>
                    {emergencyPending > 0 ? 'Emergency Delay' : statusLabel}
                  </p>
                </div>
              </div>

              {emergencyPending > 0 && (
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3 w-full">
                   <AlertCircle className="text-red-500" size={16} />
                   <p className="text-[10px] font-bold text-red-500 uppercase leading-tight italic">Doctor is handling a critical case. Please wait.</p>
                </div>
              )}
            </div>

            <div className="absolute bottom-36 left-1/2 -translate-x-1/2 z-30">
               <button 
                  onMouseDown={() => setIsRecording(true)}
                  onMouseUp={() => setIsRecording(false)}
                  className={`relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-500 border-[6px] border-slate-900 ${
                    isRecording ? 'scale-110 bg-red-500 shadow-[0_0_80px_rgba(239,68,68,0.4)]' : 'bg-emerald-500 shadow-2xl shadow-emerald-500/20'
                  }`}
               >
                  <Mic size={44} className="text-white drop-shadow-lg" />
                  <div className="absolute -bottom-12 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">Bolo (Speak)</div>
               </button>
            </div>

            <div className="mt-auto grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-5 rounded-[32px] flex flex-col gap-2">
                <Banknote className="text-emerald-400" size={24} />
                <span className="text-xs font-black">{myData?.paid ? 'Fee Paid' : 'Awaiting'}</span>
              </div>
              <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-5 rounded-[32px] flex flex-col gap-2">
                <MapPin className="text-blue-400" size={24} />
                <span className="text-xs font-black">{myData?.status === 'TIME_TO_MOVE' ? 'Leaving' : '~15 Mins'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-8">
           <div className="p-10 bg-slate-900 border border-slate-800 rounded-[48px] shadow-2xl relative overflow-hidden">
              <h4 className="text-emerald-400 font-black uppercase text-xs tracking-[0.3em] mb-8 flex items-center gap-3">
                <Volume2 size={18} /> Audio Alerts
              </h4>
              <div className="space-y-10 text-slate-400 text-sm">
                <p>The app will automatically announce status updates in Urdu. Keep your volume high.</p>
                {isDoctorLate && (
                  <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-3xl">
                     <p className="text-red-500 font-black uppercase text-[10px] mb-2 tracking-widest">Late Doctor Protocol Active</p>
                     <p className="text-xs leading-relaxed">System has detected the doctor is delayed. <strong>"Ghar Par Rukain"</strong> (Stay at home) advice has been extended to all tokens.</p>
                  </div>
                )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PatientUI2026;
