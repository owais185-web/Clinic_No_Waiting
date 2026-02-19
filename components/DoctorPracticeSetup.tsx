
import React, { useState, useEffect } from 'react';
import { Building, Plus, Trash2, Edit3, User } from 'lucide-react';
import { useClinic, Location } from '../App';

const DoctorPracticeSetup: React.FC = () => {
  const { tier, setTier, locations, setLocations, doctorProfile } = useClinic();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Location>>({
    name: '', fee: 1000, days: ['Monday', 'Tuesday', 'Wednesday'], slots: [{ start: '09:00', end: '13:00', maxOPD: 25 }]
  });

  useEffect(() => {
    if (locations.length === 0) {
      setLocations([
        { id: 'iza-1', name: 'IZA', fee: 1000, days: ['Monday', 'Tuesday', 'Wednesday'], slots: [{ start: '09:00', end: '13:00', maxOPD: 25 }] },
        { id: 'life-1', name: 'Life', fee: 1000, days: ['Monday', 'Tuesday', 'Wednesday'], slots: [{ start: '09:00', end: '13:00', maxOPD: 25 }] }
      ]);
    }
  }, []);

  const handleSave = () => {
    if (!form.name) return;
    const loc: Location = {
      id: editingId || Math.random().toString(36).substr(2, 9),
      name: form.name!,
      fee: form.fee || 0,
      days: form.days || [],
      slots: form.slots || []
    };
    if (editingId) setLocations(locations.map(l => l.id === editingId ? loc : l));
    else setLocations([...locations, loc]);
    setShowModal(false);
    setEditingId(null);
  };

  return (
    <div className="space-y-8 md:space-y-10 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <header className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        <div className="space-y-3">
          <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter leading-tight select-none">Practice Management</h2>
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-[#064e3b] rounded-lg flex items-center justify-center text-[#34d399] border border-[#065f46]">
                <User size={16} />
             </div>
             <p className="text-slate-500 font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px]">WELCOME, <span className="text-white border-b-2 border-white pb-0.5 whitespace-nowrap">{doctorProfile.name.toUpperCase()}</span></p>
          </div>
        </div>
        
        <div className="flex gap-1 p-1.5 bg-[#0f172a] rounded-full border border-slate-800 self-start shadow-xl">
           {(['BRONZE', 'SILVER', 'GOLD'] as const).map(t => (
             <button 
              key={t}
              onClick={() => setTier(t)}
              className={`px-6 py-2 rounded-full font-black text-[10px] tracking-[0.1em] transition-all whitespace-nowrap ${
                tier === t 
                ? (t === 'GOLD' ? 'bg-amber-500 text-white' : 'bg-slate-700 text-white') 
                : 'text-slate-600 hover:text-slate-400'
              }`}
             >
               {t}
             </button>
           ))}
        </div>
      </header>

      <div className="space-y-6 pt-6">
        {locations.map((loc) => (
          <div key={loc.id} className="bg-[#0f172a] border border-slate-800/50 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-xl flex flex-col md:flex-row gap-6 md:gap-10 relative group transition-all hover:bg-[#1e293b]">
            <div className="absolute top-4 right-4 md:top-8 md:right-8 flex gap-3">
              <button onClick={() => { setEditingId(loc.id); setForm(loc); setShowModal(true); }} className="w-10 h-10 flex items-center justify-center bg-[#1e293b] text-slate-400 rounded-full hover:bg-white hover:text-slate-950 transition-all border border-slate-800">
                <Edit3 size={16} />
              </button>
              <button onClick={() => setLocations(locations.filter(l => l.id !== loc.id))} className="w-10 h-10 flex items-center justify-center bg-[#1e293b] text-slate-400 rounded-full hover:bg-red-500 hover:text-white transition-all border border-slate-800">
                <Trash2 size={16} />
              </button>
            </div>
            <div className="w-20 h-20 bg-[#064e3b]/30 rounded-2xl flex items-center justify-center text-[#34d399] border-2 border-[#34d399]/30 shrink-0">
              <Building size={36} />
            </div>
            <div className="flex-1 space-y-6">
               <div>
                 <h3 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter mb-4">{loc.name}</h3>
                 <div className="flex flex-wrap gap-2">
                   {loc.days.map(d => <span key={d} className="px-3 py-1 bg-[#1e293b] rounded-full text-[9px] font-black uppercase tracking-widest text-slate-500 border border-slate-800">{d.toUpperCase()}</span>)}
                 </div>
               </div>
               <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                  <div>
                    <span className="text-[9px] font-black uppercase text-slate-600 block mb-1 tracking-widest italic">CONSULT FEE</span>
                    <span className="text-2xl font-black text-[#34d399] italic tracking-tighter">Rs. {loc.fee}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-black uppercase text-slate-600 block mb-1 tracking-widest italic">SCHEDULE</span>
                    <span className="text-2xl font-black text-[#22d3ee] italic tracking-tighter whitespace-nowrap">{loc.slots[0]?.start} - {loc.slots[0]?.end}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-black uppercase text-slate-600 block mb-1 tracking-widest italic">MAX OPD</span>
                    <span className="text-2xl font-black text-[#22d3ee] italic tracking-tighter">{loc.slots[0]?.maxOPD}</span>
                  </div>
               </div>
            </div>
          </div>
        ))}
        <button onClick={() => { setEditingId(null); setForm({ name: '', fee: 1000, days: ['Monday', 'Tuesday', 'Wednesday'], slots: [{ start: '09:00', end: '13:00', maxOPD: 25 }] }); setShowModal(true); }} className="w-full py-16 rounded-3xl border-2 border-dashed border-slate-800 bg-[#020617] flex flex-col items-center justify-center gap-4 text-slate-700 hover:text-[#34d399] hover:border-[#34d399]/30 transition-all group">
          <div className="w-14 h-14 bg-[#0f172a] rounded-2xl flex items-center justify-center group-hover:bg-[#34d399] group-hover:text-white transition-all border border-slate-900 shadow-inner">
             <Plus size={32} />
          </div>
          <span className="font-black uppercase tracking-[0.4em] text-[11px]">Add Location</span>
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 backdrop-blur-xl bg-black/60 animate-in fade-in duration-300" onClick={() => setShowModal(false)}>
          <div className="bg-[#0f172a] w-full max-w-lg rounded-[40px] p-8 md:p-12 space-y-10 shadow-[0_32px_120px_rgba(0,0,0,0.8)] border border-slate-800 animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
             <h3 className="text-4xl font-black text-white italic tracking-tighter text-center leading-tight">Slot Setup</h3>
             <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">LOCATION NAME</label>
                  <input className="w-full bg-[#020617] border border-slate-800 rounded-xl px-6 py-4 font-bold text-white outline-none focus:border-[#34d399] text-base" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">FEE (RS.)</label>
                    <input type="number" className="w-full bg-[#020617] border border-slate-800 rounded-xl px-6 py-4 font-bold text-white outline-none focus:border-[#34d399] text-base" value={form.fee} onChange={e => setForm({...form, fee: parseInt(e.target.value)})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">MAX OPD</label>
                    <input type="number" className="w-full bg-[#020617] border border-slate-800 rounded-xl px-6 py-4 font-bold text-white outline-none focus:border-[#34d399] text-base" value={form.slots?.[0].maxOPD} onChange={e => setForm({...form, slots: [{...form.slots![0], maxOPD: parseInt(e.target.value)}]})} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">START TIME</label>
                    <input type="time" className="w-full bg-[#020617] border border-slate-800 rounded-xl px-6 py-4 font-bold text-white outline-none focus:border-[#34d399] text-base" value={form.slots?.[0].start} onChange={e => setForm({...form, slots: [{...form.slots![0], start: e.target.value}]})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">END TIME</label>
                    <input type="time" className="w-full bg-[#020617] border border-slate-800 rounded-xl px-6 py-4 font-bold text-white outline-none focus:border-[#34d399] text-base" value={form.slots?.[0].end} onChange={e => setForm({...form, slots: [{...form.slots![0], end: e.target.value}]})} />
                  </div>
                </div>
             </div>
             <button onClick={handleSave} className="w-full py-6 bg-[#34d399] text-slate-950 font-black rounded-3xl shadow-xl uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-95 transition-all">SAVE PRACTICE</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorPracticeSetup;
