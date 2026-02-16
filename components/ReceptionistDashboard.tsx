
import React, { useState } from 'react';
import { UserPlus, Banknote, UserCheck, Play, BellRing, Phone, ShieldAlert, Sparkles, Hash, LogOut, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useClinic } from '../App';

const ReceptionistDashboard: React.FC = () => {
  const { queue, addPatient, updatePatient, triggerEmergency } = useClinic();
  const [phoneInput, setPhoneInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [logs, setLogs] = useState<string[]>(['Interface initialized...']);

  const pushLog = (msg: string) => setLogs(prev => [msg, ...prev.slice(0, 5)]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneInput.length < 10) return;
    addPatient(phoneInput, nameInput);
    pushLog(`Registered walk-in: ${nameInput || phoneInput}`);
    setPhoneInput('');
    setNameInput('');
  };

  const togglePay = (id: string, currentlyPaid: boolean) => {
    updatePatient(id, { paid: !currentlyPaid });
    pushLog(`Payment updated for ${id.substr(0,4)}`);
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-white italic">Reception Desk</h2>
          <p className="text-slate-500 mt-1 uppercase tracking-widest text-[10px] font-black">Front Desk Registration & Billing</p>
        </div>

        <button 
          onClick={triggerEmergency}
          className="bg-red-600 hover:bg-red-500 text-white font-black px-8 py-4 rounded-3xl shadow-xl shadow-red-900/20 transition-all active:scale-95 flex items-center gap-3 animate-pulse"
        >
          <AlertTriangle size={20} />
          REPORT EMERGENCY
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <section className="bg-slate-900 border border-slate-800 rounded-[40px] p-8 shadow-2xl relative overflow-hidden group">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-400">
                <UserPlus size={20} />
              </div>
              Walk-in Entry
            </h3>
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Patient Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter full name"
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-4 text-white font-bold focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all placeholder:text-slate-800"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                    <input 
                      type="tel" 
                      placeholder="03xx xxxxxxx"
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-xl font-mono focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all placeholder:text-slate-800"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <button 
                type="submit"
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-black py-5 rounded-2xl shadow-xl shadow-cyan-900/20 transition-all flex items-center justify-center gap-2 group"
              >
                <Sparkles size={20} />
                ISSUE TOKEN
              </button>
            </form>
          </section>

          <div className="bg-slate-900/50 border border-slate-800 rounded-[32px] p-6 h-48 overflow-hidden">
             <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 px-2 italic">Operation Logs</h4>
             <div className="space-y-2 font-mono text-[10px] px-2 text-slate-600">
                {logs.map((log, i) => <div key={i}>&gt; {log}</div>)}
             </div>
          </div>
        </div>

        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-[40px] overflow-hidden shadow-2xl">
          <div className="p-8 border-b border-slate-800 flex items-center justify-between bg-slate-800/30">
             <h3 className="text-xl font-bold flex items-center gap-3">Active Hall</h3>
             <div className="flex gap-4">
                <div className="flex items-center gap-2 text-[10px] font-black text-emerald-400">
                   <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                   LIVE
                </div>
             </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-widest text-slate-600 border-b border-slate-800/50">
                  <th className="px-8 py-5">Token</th>
                  <th className="px-8 py-5">Patient</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5">Billing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {queue.filter(p => p.status !== 'COMPLETED').map((p) => (
                  <tr key={p.id} className={`group transition-all ${p.status === 'IN_SESSION' ? 'bg-emerald-500/10' : 'hover:bg-slate-800/20'}`}>
                    <td className="px-8 py-6">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm border-2 ${
                        p.status === 'EMERGENCY' ? 'bg-red-500 text-white border-red-400' : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}>
                        {p.token}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="font-bold text-slate-200">{p.name}</div>
                      <div className="font-mono text-[10px] text-slate-600">{p.phone}</div>
                    </td>
                    <td className="px-8 py-6">
                       <span className={`text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest border ${
                         p.status === 'EMERGENCY' ? 'bg-red-500/20 text-red-500 border-red-500/30' :
                         p.status === 'IN_SESSION' ? 'bg-emerald-500 text-emerald-950 border-emerald-400' :
                         'bg-slate-800 text-slate-500 border-slate-700'
                       }`}>
                         {p.status}
                       </span>
                    </td>
                    <td className="px-8 py-6">
                      <button 
                        onClick={() => togglePay(p.id, p.paid)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${
                          p.paid 
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                          : 'bg-slate-950 border-slate-800 text-slate-700 hover:border-emerald-500/50 hover:text-emerald-500'
                        }`}
                      >
                        {p.paid ? <CheckCircle2 size={14} /> : <Banknote size={14} />}
                        <span className="text-[10px] font-black uppercase">{p.paid ? 'PAID' : 'COLLECT'}</span>
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
