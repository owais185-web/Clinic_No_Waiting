
import React from 'react';
import { Smartphone, Zap, ShieldAlert, Radio } from 'lucide-react';

const ArchitectsBrief: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-left-4 duration-500">
      <header className="border-b border-slate-800 pb-8">
        <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-widest mb-4">
          Project Vision
        </div>
        <h2 className="text-5xl font-black text-white leading-tight">
          Solving the <span className="text-emerald-400 underline decoration-emerald-800 underline-offset-8">4-Hour Blind Wait</span>
        </h2>
        <p className="text-xl text-slate-400 mt-6 max-w-3xl leading-relaxed">
          In Pakistan, private clinics suffer from chaotic, state-less queues. Our solution transforms this into a predictable, audio-first experience for patients, powered by a robust Firestore backend.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-slate-700 transition-all group">
          <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
            <Smartphone size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Low-Literacy Design</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            The Patient App uses <strong>Gemini 2.5 TTS</strong> to dynamically read status updates in Urdu. Instead of complex dashboards, patients see three color states: Green (Wait), Yellow (Move), Blue (Clinic). This reduces cognitive load significantly.
          </p>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-slate-700 transition-all group">
          <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
            <Zap size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">The Travel Trigger</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            Cloud Function logic that calculates the "Golden Moment" to leave home.
          </p>
          <div className="bg-slate-950 p-4 rounded-lg font-mono text-[10px] text-slate-500 border border-slate-800">
            <p className="text-cyan-400">// Pseudo-code for Travel Trigger</p>
            {/* Fix: Wrapped {id} in curly braces string interpolation to prevent 'id' variable reference error in JSX */}
            <p>onUpdate('queue/{"{id}"}', (snap) =&gt; &#123;</p>
            <p className="ml-4">const current = snap.after.data().token;</p>
            <p className="ml-4">const pending = db.where('status', 'WAITING').limit(10);</p>
            <p className="ml-4">pending.forEach(p =&gt; &#123;</p>
            <p className="ml-8">if (p.token &lt;= current + 5) p.update(&#123; status: 'TIME_TO_MOVE' &#125;);</p>
            <p className="ml-4">&#125;);</p>
            <p>&#125;);</p>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-slate-700 transition-all group">
          <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center text-red-400 mb-6 group-hover:scale-110 transition-transform">
            <ShieldAlert size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Emergency 'Leapfrog'</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            When an emergency is flagged, the Firestore <code>index</code> values are recalculated. Because all clients use <code>onSnapshot()</code>, the patient's screen instantly updates with a "Delayed" status and an audio apology, preventing hall-way disputes.
          </p>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-slate-700 transition-all group">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
            <Radio size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Real-time Data Sync</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            By utilizing Firebase's offline persistence, the app remains functional during load shedding (power outages) in Pakistan, syncing the queue as soon as 4G connectivity is restored.
          </p>
        </div>
      </section>

      <div className="p-12 bg-gradient-to-br from-emerald-600 to-cyan-700 rounded-3xl text-white">
        <h3 className="text-3xl font-black mb-4 italic uppercase">"Zero people waiting blindly."</h3>
        <p className="text-white/80 max-w-2xl leading-relaxed text-lg font-medium">
          Our mission is to return dignity to the healthcare experience. By offloading the 'Wait' to the patient's home, we reduce clinic crowding by up to 70% and increase doctor efficiency.
        </p>
      </div>
    </div>
  );
};

export default ArchitectsBrief;
