
import React, { useState } from 'react';
import { Mic, Volume2, ShieldCheck, Clock, AlertTriangle, Play, Sparkles } from 'lucide-react';

const VoiceInteractionSystem: React.FC = () => {
  const voiceMap = [
    {
      event: "Welcome / Registration",
      nastaleeq: "خوش آمدید! آپ کا ٹوکن نمبر ستائیس ہے، گھر پر آرام کریں۔",
      roman: "Khush amdeed! Aap ka token number sattayis hai, ghar par aaram karein.",
      tone: "Friendly / Reassuring"
    },
    {
      event: "Time to Move",
      nastaleeq: "اب نکلنے کا وقت ہے، برائے مہربانی کلینک تشریف لائیں۔",
      roman: "Ab nikalne ka waqt hai, baraye meherbani clinic tashreef layein.",
      tone: "Action-Oriented / Clear"
    },
    {
      event: "Emergency Delay",
      nastaleeq: "معذرت، ایک ضروری کیس کی وجہ سے پندرہ منٹ تاخیر ہوگی۔",
      roman: "Maazrat, ek zaroori case ki wajah se pandrah minute takheer hogi.",
      tone: "Empathetic / Humble"
    },
    {
      event: "Final Call",
      nastaleeq: "آپ کی باری آگئی ہے! کمرہ نمبر چار میں تشریف لے جائیں۔",
      roman: "Aap ki baari aa gayi hai! Kamra number chaar mein tashreef le jayein.",
      tone: "High Energy / Alert"
    }
  ];

  const ssmlTemplates = [
    {
      title: "Delay Apology (Prosody Driven)",
      code: `<speak>
  <p>
    <s>Maafi chahte hain.</s>
    <s>Doctor Sahab abhi ek <emphasis level="strong">emergency</emphasis> mareez dekh rahe hain.</s>
    <break time="500ms"/>
    <s>Aap ko mazeed <prosody rate="slow" pitch="+2st">pandrah minute</prosody> intezar karna hoga.</s>
    <s>Hum aap ki takleef samajhte hain.</s>
  </p>
</speak>`
    },
    {
      title: "Success Welcome",
      code: `<speak>
  <s>Assalam-o-Alaikum!</s>
  <s>Aap ki registration <prosody volume="loud">kamiyab</prosody> rahi.</s>
  <s>Aap ka token number <say-as interpret-as="cardinal">27</say-as> hai.</s>
</speak>`
    }
  ];

  return (
    <div className="space-y-8 md:space-y-10 animate-in fade-in duration-700">
      <header>
        <h2 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter">Voice Interaction Map</h2>
        <p className="text-slate-400 mt-2 text-sm md:text-base italic">Zero-literacy voice architecture for No-Wait Clinics v2026.</p>
      </header>

      {/* Voice Map Table */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="bg-slate-800/50 text-slate-400 text-[9px] md:text-xs uppercase tracking-widest font-black italic">
                <th className="px-6 py-4">Event Context</th>
                <th className="px-6 py-4">Urdu (Nastaleeq)</th>
                <th className="px-6 py-4">Roman Urdu</th>
                <th className="px-6 py-4">Vocal Tone</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {voiceMap.map((v, i) => (
                <tr key={i} className="hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-4 font-black text-emerald-400 text-[10px] md:text-sm uppercase">{v.event}</td>
                  <td className="px-6 py-4 text-xl md:text-2xl font-urdu text-right leading-loose" dir="rtl">{v.nastaleeq}</td>
                  <td className="px-6 py-4 text-slate-400 text-[10px] md:text-xs italic leading-relaxed">{v.roman}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-slate-800 rounded-full text-[8px] md:text-[10px] text-slate-300 font-black uppercase tracking-tight whitespace-nowrap">{v.tone}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {/* SSML Code Block */}
        <div className="space-y-6">
          <h3 className="text-lg md:text-xl font-bold flex items-center gap-2 italic uppercase tracking-tight">
            <Volume2 className="text-cyan-400" />
            Prosody Templates
          </h3>
          {ssmlTemplates.map((ssml, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl md:rounded-2xl p-5 md:p-6 shadow-xl">
              <h4 className="text-[10px] md:text-xs font-black text-slate-500 mb-3 uppercase tracking-widest">{ssml.title}</h4>
              <pre className="text-[10px] md:text-xs font-mono text-cyan-400 bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed scrollbar-hide">
                {ssml.code}
              </pre>
            </div>
          ))}
        </div>

        {/* Mic Interaction Logic */}
        <div className="space-y-6">
          <h3 className="text-lg md:text-xl font-bold flex items-center gap-2 italic uppercase tracking-tight text-white">
            <Mic className="text-emerald-400" />
            Bolo Registration
          </h3>
          <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 md:p-8 rounded-2xl md:rounded-[40px] space-y-6 shadow-2xl relative overflow-hidden group">
             <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="flex items-center gap-4 relative z-10">
               <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-500 rounded-xl md:rounded-3xl flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
                 <Mic className="text-white" size={24} md:size={32} />
               </div>
               <div>
                 <h4 className="text-base md:text-lg font-black text-white uppercase tracking-tight">Bolo Logic</h4>
                 <p className="text-[10px] md:text-sm text-slate-400 italic">Pressure-sensitive STT architecture.</p>
               </div>
             </div>
             
             <div className="space-y-4 relative z-10">
               <div className="flex items-start gap-3">
                 <div className="mt-1"><ShieldCheck className="text-emerald-400" size={16} md:size={18} /></div>
                 <p className="text-[11px] md:text-sm text-slate-300"><strong>Init:</strong> Initialize <code>MediaRecorder</code> with 16kHz PCM for Gemini v2026 compatibility.</p>
               </div>
               <div className="flex items-start gap-3">
                 <div className="mt-1"><Clock className="text-emerald-400" size={16} md:size={18} /></div>
                 <p className="text-[11px] md:text-sm text-slate-300"><strong>UI Bind:</strong> Bind <code>analyserNode</code> to card glow scale in real-time.</p>
               </div>
               <div className="flex items-start gap-3">
                 <div className="mt-1"><Sparkles className="text-emerald-400" size={16} md:size={18} /></div>
                 <p className="text-[11px] md:text-sm text-slate-300"><strong>Post:</strong> Process base64 blob via Gemini to extract patient identity with Urdu NLP.</p>
               </div>
             </div>

             <div className="pt-6 border-t border-emerald-500/10 relative z-10">
               <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-500 italic">System Logic</span>
                    <span className="text-[8px] md:text-[10px] text-emerald-400 font-black tracking-widest">GEMINI-2.5-TTS</span>
                  </div>
                  <code className="text-[10px] md:text-xs text-slate-500 leading-relaxed block scrollbar-hide overflow-x-auto whitespace-nowrap">
                    const audio = await generateStatusAudio(apologyText);<br/>
                    audioContext.play(audio);
                  </code>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceInteractionSystem;
