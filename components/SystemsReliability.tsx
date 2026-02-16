
import React, { useState } from 'react';
// Added missing Smartphone and Mic imports from lucide-react
import { WifiOff, Clock, Rocket, Server, BatteryCharging, AlertCircle, CheckCircle2, Cpu, Smartphone, Mic } from 'lucide-react';

const SystemsReliability: React.FC = () => {
  const [offlineSim, setOfflineSim] = useState(false);

  const deploymentSteps = [
    { title: "Staff Orientation", desc: "48-hour hands-on training for Receptionists on the 'Fast-Entry' screen." },
    { title: "Hardware Resilience", desc: "Installation of UPS (Uninterruptible Power Supply) for Clinic Routers to ensure 24/7 Firebase sync." },
    { title: "Pilot Enrollment", desc: "First 50 walk-in patients get a Rs. 500 discount for using the Voice-First Registration." },
    { title: "Network Stress Test", desc: "Simulated load shedding to verify Firestore Offline Persistence and local caching." },
    { title: "Feedback Loop", desc: "Weekly review of 'Travel Trigger' accuracy vs. actual traffic conditions in the clinic locality." }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <header>
        <h2 className="text-4xl font-black text-white italic">The Pakistani Reality Protocol</h2>
        <p className="text-slate-400 mt-2">Engineered resilience for power outages, connectivity gaps, and human delays.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Offline-First Logic Visualizer */}
        <section className="bg-slate-900 border border-slate-800 rounded-[32px] overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-800 bg-slate-800/20 flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <WifiOff className="text-amber-500" />
              Connectivity Resilience
            </h3>
            <button 
              onClick={() => setOfflineSim(!offlineSim)}
              className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                offlineSim ? 'bg-red-500 text-white animate-pulse' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}
            >
              {offlineSim ? 'SIMULATING OFFLINE' : 'GO OFFLINE'}
            </button>
          </div>
          
          <div className="p-8 flex-1 flex flex-col justify-center items-center text-center space-y-6">
            <div className={`p-8 rounded-[40px] border-2 transition-all duration-500 w-full max-w-xs ${
              offlineSim ? 'bg-amber-500/5 border-amber-500/20 shadow-2xl shadow-amber-500/10' : 'bg-slate-950 border-slate-800'
            }`}>
              <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest block mb-2">Live Token</span>
              <h4 className={`text-7xl font-black ${offlineSim ? 'text-amber-500' : 'text-white'}`}>24</h4>
              {offlineSim && (
                <div className="mt-4 flex items-center justify-center gap-2 text-amber-500/80 font-bold text-xs">
                  <AlertCircle size={14} />
                  SYNC LOST: Showing Last Known
                </div>
              )}
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              <strong>Logic:</strong> We utilize <code>Firestore.enablePersistence()</code>. If the web socket drops due to a power outage, the patient sees the <strong>Last Known State</strong> with a "Stale Data" warning instead of an empty screen.
            </p>
          </div>
        </section>

        {/* Doctor Late Protocol */}
        <section className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 space-y-8">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Clock className="text-red-400" />
            Delay & "Late Doctor" Protocol
          </h3>
          
          <div className="space-y-4">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 border-l-4 border-l-red-500">
               <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Auto-Correction Logic</h4>
               <p className="text-xs text-slate-500 leading-relaxed">
                 If <code>first_session_start</code> is &gt; 20m past <code>scheduled_time</code>, Cloud Functions trigger:
               </p>
               <ul className="mt-4 space-y-3">
                 <li className="flex gap-3 text-xs text-slate-300">
                    <CheckCircle2 size={14} className="text-red-500 shrink-0" />
                    <span><strong>Mass Notification</strong>: "Ghar par rukain" (Stay at home) SMS sent to all waiting tokens.</span>
                 </li>
                 <li className="flex gap-3 text-xs text-slate-300">
                    <CheckCircle2 size={14} className="text-red-500 shrink-0" />
                    <span><strong>Dynamic Buffer</strong>: Automatically adds +15 mins to all ETA estimations in the UI.</span>
                 </li>
               </ul>
            </div>

            <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-2xl">
               <h4 className="text-sm font-bold text-emerald-400 mb-1 uppercase tracking-tight">Leapfrog Synchronization</h4>
               <p className="text-xs text-slate-400 leading-relaxed">
                 Emergencies trigger an instant <code>WriteBatch</code> that shifts all <code>index</code> values. Every connected handset receives an audio alert: <em>"Emergency ki wajah se der hogi."</em>
               </p>
            </div>
          </div>
        </section>
      </div>

      {/* Tech Stack & Pilot Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <h3 className="text-xl font-bold flex items-center gap-2 italic">
            <Cpu className="text-cyan-400" />
            Final Tech Stack
          </h3>
          <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400">
                <Smartphone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-white">Flutter (Dart)</h4>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Frontend Application</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center text-amber-400">
                <Server size={24} />
              </div>
              <div>
                <h4 className="font-bold text-white">Firebase Suite</h4>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Backend & Real-time Sync</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400">
                <Mic size={24} />
              </div>
              <div>
                <h4 className="font-bold text-white">Gemini 2.5 + Whisper</h4>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Voice Engine & Urdu NLP</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-xl font-bold flex items-center gap-2 mb-8">
            <Rocket className="text-emerald-400" />
            Clinic Pilot Deployment Guide
          </h3>
          <div className="relative pl-8 border-l-2 border-slate-800 space-y-12">
            {deploymentSteps.map((step, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-slate-900 border-2 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center justify-center text-[8px] font-black text-emerald-400">
                  {i+1}
                </div>
                <h4 className="text-lg font-bold text-white">{step.title}</h4>
                <p className="text-slate-400 text-sm mt-1">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Global Success Banner */}
      <div className="p-12 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-[48px] text-center shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500" />
        <div className="relative z-10 flex flex-col items-center">
           <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mb-6 border border-emerald-500/30 group-hover:scale-110 transition-transform">
              <CheckCircle2 size={40} />
           </div>
           <h3 className="text-3xl font-black text-white italic tracking-tight">System Architecture Verified.</h3>
           <p className="text-slate-400 mt-4 max-w-xl">
             From Firestore indexing to Gemini Voice templates, the <strong>No-Wait Clinics v1.0</strong> architecture is ready for a 4-week pilot in Central Lahore.
           </p>
           <button className="mt-8 bg-emerald-600 hover:bg-emerald-500 text-white font-black px-10 py-4 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all active:scale-95">
             GENERATE DEPLOYMENT BUNDLE
           </button>
        </div>
      </div>
    </div>
  );
};

export default SystemsReliability;
