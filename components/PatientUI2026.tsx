
import React, { useState, useEffect, useRef } from 'react';
import { User, Check, Mic, Volume2, Star, Stethoscope, Hash, ArrowRight, History, Info, X, ChevronDown, Building, Sparkles, Search, Clock } from 'lucide-react';
import { useClinic } from '../App';
import { generateStatusAudio } from '../services/geminiTTS';

type BookingStep = 'DISCOVERY' | 'PROFILE' | 'RECORD_NAME' | 'CONFIRM_NAME' | 'SUCCESS';

const PatientUI2026: React.FC = () => {
  const { locations, queue, completedHistory, addPatient } = useClinic();
  const [step, setStep] = useState<BookingStep>('DISCOVERY');
  const [search, setSearch] = useState('');
  const [activeLocationId, setActiveLocationId] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [capturedName, setCapturedName] = useState('Hamza Ali'); 
  const [myToken, setMyToken] = useState<number | null>(null);
  const [isHistoryExploded, setIsHistoryExploded] = useState(false);

  const activeLoc = locations.find(l => l.id === activeLocationId) || locations[0];
  const currentTokensForLoc = queue.filter(p => p.locationId === activeLoc?.id).length;

  const audioContextRef = useRef<AudioContext | null>(null);

  const speakStatus = async (text: string) => {
    const audioData = await generateStatusAudio(text);
    if (audioData) {
      if (!audioContextRef.current) audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const ctx = audioContextRef.current;
      const binary = atob(audioData);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      const dataInt16 = new Int16Array(bytes.buffer);
      const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
      const channelData = buffer.getChannelData(0);
      for (let i = 0; i < dataInt16.length; i++) channelData[i] = dataInt16[i] / 32768.0;
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start();
    }
  };

  const handleBooking = () => {
    addPatient("03XX XXXXXXX", capturedName, false, activeLoc?.id, false);
    const nextToken = (queue.length + 1);
    setMyToken(nextToken);
    setStep('SUCCESS');
  };

  if (step === 'SUCCESS' && myToken) {
    const liveTokenObj = queue.find(p => p.status === 'IN_SESSION' && p.locationId === activeLoc?.id);
    const liveTokenNum = liveTokenObj?.token || 0;
    const aheadCount = Math.max(0, myToken - liveTokenNum);
    return (
      <div className="max-w-2xl mx-auto space-y-10 py-6 animate-in zoom-in-95 duration-500">
         <header className="text-center">
            <h2 className="text-6xl font-black text-white italic tracking-tighter leading-none select-none">Token issued</h2>
         </header>
         <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-10 text-center space-y-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-emerald-500/5 rotate-12"><Hash size={180}/></div>
            <div className="space-y-4 relative z-10">
               <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em] block">YOUR TOKEN POSITION</span>
               <div className="inline-flex items-center justify-center w-48 h-48 bg-[#020617] border-4 border-[#34d399]/30 rounded-full shadow-2xl">
                  <span className="text-7xl font-black text-white italic tracking-tighter">#{myToken}</span>
               </div>
               <p className="text-xl text-slate-400 font-black uppercase tracking-widest mt-4">{activeLoc?.name} Clinic</p>
            </div>
            <div className="grid grid-cols-2 gap-6 relative z-10">
              <div className="bg-[#020617] border border-slate-800/50 p-8 rounded-2xl shadow-inner space-y-2">
                 <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">PEOPLE AHEAD</span>
                 <p className="text-5xl font-black text-white leading-none tracking-tighter">{aheadCount}</p>
              </div>
              <div className="bg-[#020617] border border-slate-800/50 p-8 rounded-2xl shadow-inner space-y-2">
                 <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest text-[#22d3ee]">EST. WAIT</span>
                 <p className="text-5xl font-black text-[#22d3ee] italic leading-none tracking-tighter">~{aheadCount * 15}m</p>
              </div>
            </div>
         </div>
         <button onClick={() => setStep('DISCOVERY')} className="w-full py-6 bg-[#1e293b] text-slate-500 font-black rounded-2xl uppercase tracking-[0.2em] hover:text-white transition-all text-xs shadow-2xl">Return to Marketplace</button>
      </div>
    );
  }

  if (step === 'DISCOVERY') {
    return (
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-6xl md:text-7xl font-black text-white italic tracking-tighter leading-tight select-none">Marketplace</h2>
            <p className="text-slate-600 font-black uppercase tracking-[0.4em] text-[10px] ml-1">Digital Healthcare • Pakistan v2026</p>
          </div>
          <div className="relative w-full md:w-[400px] group">
             <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 transition-colors pointer-events-none group-focus-within:text-[#22d3ee]"><Search size={24} /></div>
             <input className="w-full bg-[#0f172a] border-2 border-slate-900 rounded-full py-5 pl-16 pr-8 text-lg font-bold text-white outline-none focus:border-[#22d3ee] shadow-xl" placeholder="Search specialist..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </header>

        {myToken && (
           <div className="bg-emerald-500/10 border-2 border-emerald-500/30 rounded-[40px] p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_32px_80px_rgba(16,185,129,0.1)]">
              <div className="flex items-center gap-6">
                 <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg"><Hash size={24} /></div>
                 <div>
                    <h4 className="text-2xl font-black text-white italic uppercase tracking-tight">Active Token Tracking</h4>
                    <p className="text-emerald-500 font-black text-xs uppercase tracking-widest mt-1">Token #{myToken} • {activeLoc?.name}</p>
                 </div>
              </div>
              <button onClick={() => setStep('SUCCESS')} className="px-8 py-3 bg-white text-slate-950 font-black rounded-full uppercase tracking-widest text-xs hover:scale-105 transition-all">Live Status</button>
           </div>
        )}

        {completedHistory.length > 0 && (
          <section className="relative group/history rounded-[40px] overflow-hidden transition-all duration-500 bg-[#020617] border border-[#22d3ee]/30 shadow-2xl">
            <button onClick={() => setIsHistoryExploded(!isHistoryExploded)} className={`w-full p-8 flex items-center justify-between transition-all duration-500 ${isHistoryExploded ? 'bg-[#22d3ee] text-slate-950' : 'bg-[#0f172a]/40 hover:bg-[#0f172a]/60 shadow-xl'}`}>
              <div className="flex items-center gap-6 text-left">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${isHistoryExploded ? 'bg-white text-[#22d3ee]' : 'bg-[#020617] text-[#10b981] border border-slate-800'}`}><History size={28} /></div>
                <div>
                  <h4 className="text-3xl font-black italic tracking-tighter leading-none">Visit History & Insights</h4>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] mt-2 opacity-60">SECURE MEDICAL RECORDS • TAP TO UNFOLD</p>
                </div>
              </div>
              <ChevronDown size={28} className={`transition-all duration-500 ${isHistoryExploded ? 'rotate-180' : ''}`} />
            </button>
            {isHistoryExploded && (
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#020617] animate-in slide-in-from-top-4 duration-500">
                 {completedHistory.map((h, i) => (
                   <div key={h.id} className="p-8 rounded-3xl border border-slate-800 bg-[#0f172a] flex flex-col justify-between min-h-[300px] shadow-xl transition-all hover:border-[#10b981]/50">
                      <div>
                          <div className="flex justify-between items-start mb-6">
                             <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white bg-[#10b981]`}><Check size={20} /></div>
                                <div><h5 className="font-black text-white text-lg tracking-tighter uppercase">Follow-up Insight</h5><p className="text-[10px] text-slate-600 font-bold uppercase mt-1">{h.completedAt}</p></div>
                             </div>
                             <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest font-mono">TOKEN #{h.token}</span>
                          </div>
                          <div className="p-6 rounded-2xl bg-[#1e293b]/40 border border-[#334155]/50 group-hover:bg-[#10b981]/5">
                             <div className="flex items-center gap-2 text-slate-500 text-[9px] font-black uppercase mb-3 tracking-[0.15em]"><Info size={14} /> ADVICE FOR PATIENT</div>
                             <p className="text-base text-slate-200 font-black italic leading-relaxed">"{h.notes || "Routine visit completed successfully."}"</p>
                          </div>
                      </div>
                      <button onClick={() => speakStatus(h.notes || "Visit completed.")} className="mt-6 flex items-center gap-3 text-[10px] font-black text-slate-600 hover:text-white uppercase tracking-[0.3em] transition-all"><div className="w-10 h-10 rounded-full bg-[#020617] border border-slate-800 flex items-center justify-center hover:bg-[#10b981] hover:text-white transition-all"><Volume2 size={18} /></div> BOLO (URDU)</button>
                   </div>
                 ))}
              </div>
            )}
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           <DoctorBentoCard name="Dr. Zain Malik" spec="General Surgeon" rating="4.9" wait="15m" liveToken={12} locationCount={locations.length || 1} onClick={() => setStep('PROFILE')} />
           <DoctorBentoCard name="Dr. Sara Khan" spec="Pediatrician" rating="4.7" wait="45m" liveToken={8} locationCount={1} busy />
           <DoctorBentoCard name="Dr. Ahmed Ali" spec="Dermatologist" rating="4.8" wait="5m" liveToken={21} locationCount={1} />
        </div>
      </div>
    );
  }

  if (step === 'PROFILE') {
    return (
      <div className="max-w-4xl mx-auto space-y-12 animate-in zoom-in-95 duration-500 pb-20">
         <header className="flex flex-col md:flex-row items-center gap-10">
            <div className="relative shrink-0">
              <div className="w-40 h-40 bg-[#0f172a] rounded-[40px] flex items-center justify-center text-slate-800 shadow-xl border-2 border-[#1e293b]"><User size={80} /></div>
              <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-[#10b981] rounded-2xl flex items-center justify-center border-4 border-[#020617]"><Sparkles className="text-white" size={24} /></div>
            </div>
            <div className="space-y-4 text-center md:text-left">
               <h2 className="text-6xl md:text-7xl font-black text-white italic tracking-tighter leading-tight select-none uppercase">Dr. Zain<br/>Malik</h2>
               <div className="space-y-2">
                 <p className="text-[#22d3ee] font-black uppercase tracking-[0.3em] text-[13px]">GENERAL SURGEON • LAHORE GENERAL</p>
                 <div className="flex items-center gap-2 bg-[#f59e0b]/10 px-4 py-1.5 rounded-full w-fit mx-auto md:mx-0 border border-[#f59e0b]/30">
                    <Star size={14} fill="#f59e0b" className="text-[#f59e0b]"/><span className="text-[#f59e0b] font-black text-[10px] uppercase tracking-widest">4.9 Rating</span>
                 </div>
               </div>
            </div>
         </header>

         <div className="space-y-12">
            <div className="space-y-6">
               <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase">Available Practices</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {locations.map(loc => (
                   <button key={loc.id} onClick={() => setActiveLocationId(loc.id)} className={`p-8 rounded-[40px] border-2 transition-all duration-500 text-left group relative overflow-hidden flex flex-col justify-between ${activeLocationId === loc.id ? 'bg-[#10b981]/10 border-[#10b981] scale-105 shadow-2xl' : 'bg-[#0f172a] border-[#1e293b]'}`}>
                     <div className="flex justify-between items-start relative z-10 mb-8">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${activeLocationId === loc.id ? 'bg-[#10b981] text-white border-transparent' : 'bg-[#020617] text-slate-700 border-slate-900 group-hover:text-slate-400'}`}><Building size={28} /></div>
                        {activeLocationId === loc.id && <div className="bg-[#10b981] px-4 py-1 rounded-full text-[9px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-1.5 shadow-xl"><Check size={12} /> Selected</div>}
                     </div>
                     <div className="relative z-10 space-y-3">
                        <h4 className="text-3xl font-black text-white italic tracking-tighter leading-none group-hover:translate-x-1 transition-transform">{loc.name}</h4>
                        <div className="flex flex-col gap-2">
                           <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 tracking-widest"><Clock size={12} /> {loc.slots[0].start} - {loc.slots[0].end}</div>
                           <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 tracking-widest uppercase italic">Rs. {loc.fee} CONSULT</div>
                        </div>
                     </div>
                   </button>
                 ))}
               </div>
            </div>

            <div className="bg-[#020617] border-2 border-slate-900 rounded-[56px] p-12 grid grid-cols-1 md:grid-cols-2 gap-12 shadow-2xl">
               <div className="bg-[#0f172a] rounded-[40px] p-10 flex flex-col items-center justify-center gap-4 border border-slate-800/40 shadow-inner group/stat relative overflow-hidden">
                  <span className="text-[12px] font-black text-slate-600 uppercase tracking-[0.5em] relative z-10">PEOPLE AHEAD</span>
                  <span className="text-7xl font-black text-white leading-none tracking-tighter select-none relative z-10 group-hover/stat:scale-105 transition-transform">{currentTokensForLoc}</span>
               </div>
               <div className="bg-[#0f172a] rounded-[40px] p-10 flex flex-col items-center justify-center gap-4 border border-slate-800/40 shadow-inner group/stat relative overflow-hidden">
                  <span className="text-[12px] font-black text-slate-600 uppercase tracking-[0.5em] relative z-10 text-[#22d3ee]">EST. WAIT</span>
                  <span className="text-7xl font-black text-[#22d3ee] italic leading-none tracking-tighter select-none relative z-10 group-hover/stat:scale-105 transition-transform">~{currentTokensForLoc * 15}m</span>
               </div>
            </div>

            <div className="flex flex-col gap-6 max-w-lg mx-auto w-full pt-4">
               <button onClick={() => setStep('RECORD_NAME')} className="w-full py-8 bg-white text-[#020617] font-black rounded-[32px] text-2xl uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-4">Book Slot <ArrowRight size={32} /></button>
               <button onClick={() => setStep('DISCOVERY')} className="text-slate-600 font-black uppercase text-[11px] tracking-[0.4em] hover:text-white transition-colors block text-center">Return to Search</button>
            </div>
         </div>
      </div>
    );
  }

  if (step === 'RECORD_NAME') {
    return (
      <div className="max-w-xl mx-auto space-y-12 text-center animate-in zoom-in-95 duration-500 py-10">
         <h2 className="text-6xl md:text-7xl font-black text-white italic tracking-tighter leading-tight select-none uppercase">Boliye...<br/>Apna Naam</h2>
         <div className="relative flex justify-center mt-12">
           <div className={`absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full transition-all duration-1000 ${isRecording ? 'opacity-100 scale-150' : 'opacity-0 scale-50'}`} />
           <button onMouseDown={() => setIsRecording(true)} onMouseUp={() => { setIsRecording(false); setStep('CONFIRM_NAME'); }} className={`relative w-64 h-64 rounded-[40px] flex items-center justify-center transition-all duration-500 border-[16px] border-[#0f172a] shadow-2xl ${isRecording ? 'bg-red-500 scale-110' : 'bg-[#10b981] hover:scale-105'}`}><Mic size={80} className="text-white" /></button>
         </div>
         <p className="text-slate-600 font-black uppercase tracking-[0.4em] text-[10px]">Hold button to speak name</p>
      </div>
    );
  }

  if (step === 'CONFIRM_NAME') {
    return (
      <div className="max-w-xl mx-auto space-y-12 py-10 animate-in fade-in duration-500 text-center">
         <div className="bg-[#0f172a] border-2 border-slate-900 rounded-[48px] p-16 text-center shadow-2xl"><span className="text-[11px] font-black text-slate-600 uppercase tracking-[0.4em]">CAPTURED IDENTITY</span><h3 className="text-5xl font-black text-white italic tracking-tighter leading-none break-words mt-4 uppercase">{capturedName}</h3></div>
         <div className="flex gap-6"><button onClick={() => setStep('RECORD_NAME')} className="flex-1 py-6 bg-[#0f172a] border-2 border-slate-800 text-slate-600 font-black rounded-[24px] uppercase tracking-[0.2em] text-[10px]">Retry</button><button onClick={handleBooking} className="flex-[2] py-6 bg-[#10b981] text-white font-black rounded-[24px] shadow-xl transition-all uppercase tracking-[0.2em] text-sm">Finalize Booking</button></div>
      </div>
    );
  }

  return null;
};

const DoctorBentoCard = ({ name, spec, rating, wait, liveToken, locationCount, onClick, busy }: any) => (
  <button onClick={onClick} disabled={busy} className={`w-full text-left p-8 rounded-[48px] border-2 transition-all duration-500 relative overflow-hidden shadow-xl h-[480px] flex flex-col justify-between group ${busy ? 'bg-slate-950 border-slate-900 opacity-40 grayscale' : 'bg-[#0f172a]/90 border-slate-900 hover:border-[#22d3ee]/40'}`}>
     <div className="absolute -top-6 -right-6 text-slate-800/10 transition-colors pointer-events-none rotate-12 group-hover:rotate-0 duration-700 scale-150"><Stethoscope size={200} strokeWidth={1} /></div>
     <div className="relative z-10 space-y-6">
        <div className="w-20 h-20 bg-[#020617] rounded-3xl flex items-center justify-center text-slate-800 border-2 border-slate-900 shadow-inner group-hover:bg-[#10b981] group-hover:text-white transition-all group-hover:rotate-3"><User size={40} /></div>
        <div className="space-y-2">
           <h4 className="text-5xl font-black text-white italic tracking-tighter leading-tight group-hover:translate-x-1 transition-transform uppercase">{name}</h4>
           <p className="text-[10px] font-black uppercase text-slate-600 tracking-[0.3em] group-hover:text-[#22d3ee] transition-colors">{spec}</p>
        </div>
     </div>
     <div className="relative z-10 space-y-6">
        <div className="grid grid-cols-2 gap-4">
           <div className="bg-[#020617] p-6 rounded-2xl border border-slate-900 shadow-xl flex flex-col items-center"><span className="text-[9px] font-black text-slate-700 uppercase tracking-[0.1em] block mb-1">Live Token</span><span className="text-3xl font-black text-white italic tracking-tighter">#{liveToken}</span></div>
           <div className="bg-[#020617] p-6 rounded-2xl border border-slate-900 shadow-xl flex flex-col items-center"><span className="text-[9px] font-black text-slate-700 uppercase tracking-[0.1em] block mb-1 text-[#22d3ee]">Est. Wait</span><span className="text-3xl font-black text-[#22d3ee] italic tracking-tighter">{wait}</span></div>
        </div>
        <div className="flex justify-between items-center px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-700"><div className="flex items-center gap-2 text-[#f59e0b]"><Star size={14} fill="#f59e0b"/> {rating} RATING</div><div className="flex items-center gap-2">{locationCount} LOCATIONS <ArrowRight size={14}/></div></div>
     </div>
     {busy && <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-sm flex items-center justify-center z-20"><div className="p-8 border-4 border-slate-900 rounded-[32px] -rotate-6 bg-slate-950 shadow-2xl"><span className="text-2xl font-black uppercase tracking-[0.4em] text-slate-800">CLOSED</span></div></div>}
  </button>
);

export default PatientUI2026;
