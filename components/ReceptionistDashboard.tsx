
import React, { useState } from 'react';
import { UserPlus, Sparkles, UserCheck, AlertTriangle, Check, X, UserMinus } from 'lucide-react';
import { useClinic } from '../App';

const ReceptionistDashboard: React.FC = () => {
  const { queue, pendingBookings, addPatient, approveBooking, markAsSkipped, triggerEmergency } = useClinic();
  const [phoneInput, setPhoneInput] = useState('');
  const [nameInput, setNameInput] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneInput.length < 10) return;
    addPatient(phoneInput, nameInput);
    setPhoneInput('');
    setNameInput('');
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 md:gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter">Reception Desk</h2>
          <p className="text-slate-500 mt-1 uppercase tracking-widest text-[9px] md:text-[10px] font-black italic">Hall Management & Verification</p>
        </div>
        <button 
          onClick={triggerEmergency}
          className="w-full lg:w-auto bg-red-600 hover:bg-red-500 text-white font-black px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-3xl shadow-xl transition-all flex items-center justify-center gap-3 animate-pulse text-xs md:text-sm"
        >
          <AlertTriangle size={18} md:size={20} /> REPORT EMERGENCY
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        <div className="lg:col-span-12">
           <section className="bg-slate-900 border border-slate-800 rounded-2xl md:rounded-[40px] overflow-hidden shadow-2xl">
              <div className="p-6 md:p-8 border-b border-slate-800 bg-blue-500/10 flex items-center justify-between">
                 <h3 className="text-lg md:text-xl font-black text-white flex items-center gap-3">
                    <Sparkles className="text-blue-400" size={18} md:size={24} /> Remote Requests
                 </h3>
                 <span className="bg-blue-600 text-white text-[8px] md:text-[10px] font-black px-2 md:px-3 py-1 rounded-full uppercase tracking-widest italic">{pendingBookings.length} PENDING</span>
              </div>
              <div className="p-4 md:p-8">
                {pendingBookings.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {pendingBookings.map(p => (
                      <div key={p.id} className="bg-slate-950 border border-slate-800 rounded-2xl md:rounded-3xl p-5 md:p-6 space-y-4 hover:border-blue-500/30 transition-all">
                         <div className="flex justify-between items-start">
                            <div>
                               <h4 className="text-base md:text-lg font-black text-white uppercase tracking-tight">{p.name}</h4>
                               <p className="text-[10px] md:text-xs font-mono text-slate-500">{p.phone}</p>
                            </div>
                            <span className="text-[9px] md:text-[10px] font-black text-blue-400 uppercase tracking-tighter">Token #{p.token}</span>
                         </div>
                         <div className="flex gap-2">
                            <button onClick={() => approveBooking(p.id)} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2.5 md:py-3 rounded-lg md:rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                               <Check size={14} /> APPROVE
                            </button>
                            <button className="px-3 md:px-4 bg-slate-800 hover:bg-red-500/20 text-slate-500 hover:text-red-500 rounded-lg md:rounded-xl transition-all"><X size={16} md:size={18} /></button>
                         </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 flex flex-col items-center justify-center text-slate-700 opacity-20">
                     <UserCheck size={48} md:size={64} />
                     <p className="font-black uppercase tracking-[0.4em] mt-4 text-[10px]">No pending requests</p>
                  </div>
                )}
              </div>
           </section>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <section className="bg-slate-900 border border-slate-800 rounded-2xl md:rounded-[40px] p-6 md:p-8 shadow-2xl">
            <h3 className="text-lg md:text-xl font-bold mb-6 flex items-center gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-cyan-500/20 rounded-lg md:rounded-xl flex items-center justify-center text-cyan-400"><UserPlus size={18} md:size={20} /></div>
              Walk-in Entry
            </h3>
            <form onSubmit={handleRegister} className="space-y-4 md:space-y-6">
              <input type="text" placeholder="Patient Name" className="w-full bg-slate-950 border border-slate-800 rounded-xl md:rounded-2xl p-4 font-bold text-white outline-none focus:border-cyan-500 text-sm md:text-base uppercase" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
              <input type="tel" placeholder="03xx xxxxxxx" className="w-full bg-slate-950 border border-slate-800 rounded-xl md:rounded-2xl p-4 font-mono text-white outline-none focus:border-cyan-500 text-sm md:text-base" value={phoneInput} onChange={(e) => setPhoneInput(e.target.value)} />
              <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-black py-4 md:py-5 rounded-xl md:rounded-2xl transition-all flex items-center justify-center gap-2 text-xs md:text-sm tracking-widest uppercase">
                <Sparkles size={18} md:size={20} /> ISSUE TOKEN
              </button>
            </form>
          </section>
        </div>

        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl md:rounded-[40px] overflow-hidden shadow-2xl flex flex-col h-[400px] lg:h-auto">
          <div className="p-6 md:p-8 border-b border-slate-800 flex items-center justify-between bg-slate-800/30 shrink-0">
             <h3 className="text-sm md:text-xl font-bold text-white uppercase tracking-tight">Active Hall Queue</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11px] md:text-sm min-w-[400px]">
              <thead className="bg-slate-950/50 border-b border-slate-800">
                <tr className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-600">
                  <th className="px-6 md:px-8 py-4 md:py-5 italic">Token</th>
                  <th className="px-6 md:px-8 py-4 md:py-5 italic">Patient</th>
                  <th className="px-6 md:px-8 py-4 md:py-5 italic">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {queue.filter(p => p.status !== 'COMPLETED').map((p) => (
                  <tr key={p.id} className={`group ${p.status === 'IN_SESSION' ? 'bg-emerald-500/10' : 'hover:bg-slate-800/20'}`}>
                    <td className="px-6 md:px-8 py-4 md:py-6 font-black text-slate-400">#{p.token}</td>
                    <td className="px-6 md:px-8 py-4 md:py-6">
                      <div className="font-bold text-white uppercase tracking-tight">{p.name}</div>
                      <div className="text-[9px] md:text-[10px] text-slate-500 font-mono italic">{p.phone}</div>
                    </td>
                    <td className="px-6 md:px-8 py-4 md:py-6">
                      <button 
                        onClick={() => markAsSkipped(p.id)}
                        className="text-[8px] md:text-[10px] font-black text-red-400 uppercase tracking-widest flex items-center gap-2 hover:bg-red-500/10 p-2 rounded-lg md:rounded-xl transition-all whitespace-nowrap"
                      >
                        <UserMinus size={12} md:size={14} /> Skip
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceptionistDashboard;
