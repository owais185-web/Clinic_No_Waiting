
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
    <div className="space-y-10 animate-in fade-in duration-700">
      <header>
        <h2 className="text-4xl font-black text-white">AI Voice Interaction Map</h2>
        <p className="text-slate-400 mt-2">Zero-literacy voice architecture for No-Wait Clinics v2026.</p>
      </header>

      {/* Voice Map Table */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-widest">
                <th className="px-6 py-4">Event Context</th>
                <th className="px-6 py-4">Urdu (Nastaleeq)</th>
                <th className="px-6 py-4">Developer Guidance (Roman)</th>
                <th className="px-6 py-4">Vocal Tone</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {voiceMap.map((v, i) => (
                <tr key={i} className="hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-4 font-bold text-emerald-400 text-sm">{v.event}</td>
                  <td className="px-6 py-4 text-2xl font-urdu text-right leading-loose" dir="rtl">{v.nastaleeq}</td>
                  <td className="px-6 py-4 text-slate-400 text-xs italic">{v.roman}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-slate-800 rounded-full text-[10px] text-slate-300 font-bold uppercase">{v.tone}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* SSML Code Block */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Volume2 className="text-cyan-400" />
            SSML Prosody Templates
          </h3>
          {ssmlTemplates.map((ssml, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h4 className="text-sm font-bold text-slate-500 mb-3">{ssml.title}</h4>
              <pre className="text-xs font-mono text-cyan-400 bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
                {ssml.code}
              </pre>
            </div>
          ))}
        </div>

        {/* Mic Interaction Logic */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Mic className="text-emerald-400" />
            Voice Registration Logic
          </h3>
          <div className="bg-emerald-500/5 border border-emerald-500/20 p-8 rounded-[40px] space-y-6">
             <div className="flex items-center gap-4">
               <div className="w-16 h-16 bg-emerald-500 rounded-3xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                 <Mic className="text-white" size={32} />
               </div>
               <div>
                 <h4 className="text-lg font-bold text-white uppercase tracking-tight">The "Bolo" Button</h4>
                 <p className="text-sm text-slate-400">Pressure-sensitive voice recording logic.</p>
               </div>
             </div>
             
             <div className="space-y-4">
               <div className="flex items-start gap-3">
                 <div className="mt-1"><ShieldCheck className="text-emerald-400" size={18} /></div>
                 <p className="text-sm text-slate-300"><strong>OnPointerDown:</strong> Initialize <code>MediaRecorder</code> with 16kHz Mono (PCM) for Gemini TTS/STT compatibility.</p>
               </div>
               <div className="flex items-start gap-3">
                 <div className="mt-1"><Clock className="text-emerald-400" size={18} /></div>
                 <p className="text-sm text-slate-300"><strong>Real-time Visuals:</strong> Bind microphone <code>analyserNode.getByteFrequencyData</code> to the card's inner glow scale.</p>
               </div>
               <div className="flex items-start gap-3">
                 <div className="mt-1"><Sparkles className="text-emerald-400" size={18} /></div>
                 <p className="text-sm text-slate-300"><strong>Post-Process:</strong> Send base64 blob to Gemini with prompt: <em>"Extract the patient's name from this Urdu audio. Return JSON only."</em></p>
               </div>
             </div>

             <div className="pt-6 border-t border-emerald-500/10">
               <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">System Audio Logic</span>
                    <span className="text-[10px] text-emerald-400 font-bold">gemini-2.5-flash-preview-tts</span>
                  </div>
                  <code className="text-xs text-slate-500 leading-relaxed block">
                    // Triggering the empathy delay<br/>
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
