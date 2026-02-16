
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Layout, Database, Activity, FileText, Smartphone, Settings, Mic, ClipboardList, ShieldCheck, UserCircle, Stethoscope, UserPlus } from 'lucide-react';
import SchemaVisualization from './components/SchemaVisualization';
import QueueSimulator from './components/QueueSimulator';
import ArchitectsBrief from './components/ArchitectsBrief';
import PatientUI2026 from './components/PatientUI2026';
import VoiceInteractionSystem from './components/VoiceInteractionSystem';
import ReceptionistDashboard from './components/ReceptionistDashboard';
import SystemsReliability from './components/SystemsReliability';
import DoctorConsole from './components/DoctorConsole';
import { generateStatusAudio } from './services/geminiTTS';

// --- Shared Types & Context ---
export type PatientStatus = 'WAITING' | 'TIME_TO_MOVE' | 'ARRIVED' | 'IN_SESSION' | 'COMPLETED' | 'EMERGENCY' | 'CANCELLED';

export interface Patient {
  id: string;
  token: number;
  phone: string;
  status: PatientStatus;
  paid: boolean;
  name?: string;
  isEmergency?: boolean;
}

interface ClinicContextType {
  queue: Patient[];
  currentInSession: Patient | null;
  addPatient: (phone: string, name?: string, isEmergency?: boolean) => void;
  updatePatient: (id: string, updates: Partial<Patient>) => void;
  callNext: () => void;
  completeSession: () => void;
  triggerEmergency: () => void;
  isDoctorLate: boolean;
}

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (!context) throw new Error("useClinic must be used within ClinicProvider");
  return context;
};

// --- Audio Decoding Helpers ---
const decode = (base64: string) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

const decodeAudioData = async (
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> => {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
};

// --- Main App Component ---
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'brief' | 'schema' | 'simulator' | 'patient' | 'reception' | 'doctor' | 'systems' | 'voice'>('brief');
  const [role, setRole] = useState<'ADMIN' | 'RECEPTIONIST' | 'DOCTOR' | 'PATIENT'>('ADMIN');
  
  const [queue, setQueue] = useState<Patient[]>([
    { id: 'p1', token: 1, phone: '03001112233', status: 'WAITING', paid: true, name: 'Ahmad' },
    { id: 'p2', token: 2, phone: '03215554444', status: 'WAITING', paid: false, name: 'Fatima' },
  ]);
  const [currentInSession, setCurrentInSession] = useState<Patient | null>(null);
  const [isDoctorLate, setIsDoctorLate] = useState(false);

  // Business Logic
  const addPatient = (phone: string, name?: string, isEmergency: boolean = false) => {
    const nextToken = isEmergency ? 99 : (queue.length > 0 ? Math.max(...queue.map(p => p.token)) + 1 : 1);
    const newPatient: Patient = {
      id: Math.random().toString(36).substr(2, 9),
      token: nextToken,
      phone,
      name: name || (isEmergency ? 'EMERGENCY CASE' : `Patient ${nextToken}`),
      status: isEmergency ? 'EMERGENCY' : 'WAITING',
      paid: isEmergency,
      isEmergency
    };

    if (isEmergency) {
      setQueue(prev => [newPatient, ...prev]);
      playVoice("Maazrat, ek emergency ki wajah se takheer hogi."); // Delay apology
    } else {
      setQueue(prev => [...prev, newPatient]);
    }
  };

  const updatePatient = (id: string, updates: Partial<Patient>) => {
    setQueue(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
  };

  const playVoice = async (text: string) => {
    const base64 = await generateStatusAudio(text);
    if (base64) {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const audioBuffer = await decodeAudioData(decode(base64), audioContext, 24000, 1);
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.start();
      } catch (err) {
        console.error("Audio failure:", err);
      }
    }
  };

  const triggerEmergency = () => {
    addPatient("0000000000", "Critical Patient", true);
  };

  const callNext = () => {
    // Priority: Emergency > Arrived/Paid
    const next = queue.find(p => p.status === 'EMERGENCY') || 
                 queue.find(p => p.paid && (p.status === 'ARRIVED' || p.status === 'WAITING' || p.status === 'TIME_TO_MOVE'));
    
    if (!next) return;

    if (currentInSession) {
      updatePatient(currentInSession.id, { status: 'COMPLETED' });
    }

    updatePatient(next.id, { status: 'IN_SESSION' });
    setCurrentInSession(next);
    playVoice(`Token number ${next.token}, please enter the room.`);
  };

  const completeSession = () => {
    if (currentInSession) {
      updatePatient(currentInSession.id, { status: 'COMPLETED' });
      setCurrentInSession(null);
    }
  };

  // Travel Trigger Logic & Late Doctor Simulator
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!currentInSession && queue.length > 0) {
        setIsDoctorLate(true);
      }
    }, 10000); // Simulate 10 seconds delay as "Doctor is Late"

    if (currentInSession) {
      setIsDoctorLate(false);
      const sessionToken = currentInSession.token;
      setQueue(prev => prev.map(p => {
        if (p.status === 'WAITING' && p.token <= sessionToken + 5 && p.token > sessionToken) {
          return { ...p, status: 'TIME_TO_MOVE' };
        }
        return p;
      }));
    }
    return () => clearTimeout(timer);
  }, [currentInSession, queue]);

  return (
    <ClinicContext.Provider value={{ queue, currentInSession, addPatient, updatePatient, callNext, completeSession, triggerEmergency, isDoctorLate }}>
      <div className="min-h-screen flex flex-col md:flex-row bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/30">
        
        <aside className="w-full md:w-72 bg-slate-900 border-r border-slate-800 flex flex-col sticky top-0 h-auto md:h-screen z-50">
          <div className="p-8">
            <h1 className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent tracking-tighter">
              NO-WAIT CLINICS
            </h1>
            <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-[0.3em] font-black">Architecture & App Hub</p>
          </div>

          <div className="px-6 mb-8">
            <div className="bg-slate-950 rounded-2xl p-2 border border-slate-800 flex gap-1">
              {(['ADMIN', 'RECEPTIONIST', 'DOCTOR', 'PATIENT'] as const).map(r => (
                <button
                  key={r}
                  onClick={() => { 
                    setRole(r); 
                    const targetTab = r === 'ADMIN' ? 'brief' : r === 'RECEPTIONIST' ? 'reception' : r === 'DOCTOR' ? 'doctor' : 'patient';
                    setActiveTab(targetTab as any); 
                  }}
                  className={`flex-1 py-2 rounded-xl text-[10px] font-black transition-all ${role === r ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  {r[0]}
                </button>
              ))}
            </div>
          </div>

          <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
            <NavItem icon={<FileText size={18}/>} label="Architect's Brief" active={activeTab === 'brief'} onClick={() => setActiveTab('brief')} />
            <NavItem icon={<Database size={18}/>} label="Cloud Schema" active={activeTab === 'schema'} onClick={() => setActiveTab('schema')} />
            <NavItem icon={<Activity size={18}/>} label="Logic Simulator" active={activeTab === 'simulator'} onClick={() => setActiveTab('simulator')} />
            
            <div className="py-4 px-4"><div className="h-px bg-slate-800 w-full" /></div>
            
            <NavItem icon={<ClipboardList size={18}/>} label="Reception Desk" active={activeTab === 'reception'} onClick={() => setActiveTab('reception')} color="cyan" />
            <NavItem icon={<Stethoscope size={18}/>} label="Doctor Console" active={activeTab === 'doctor'} onClick={() => setActiveTab('doctor')} color="emerald" />
            <NavItem icon={<Smartphone size={18}/>} label="Patient App" active={activeTab === 'patient'} onClick={() => setActiveTab('patient')} color="blue" />
            
            <div className="py-4 px-4"><div className="h-px bg-slate-800 w-full" /></div>
            
            <NavItem icon={<Mic size={18}/>} label="AI Voice System" active={activeTab === 'voice'} onClick={() => setActiveTab('voice')} />
            <NavItem icon={<ShieldCheck size={18}/>} label="Reliability & QA" active={activeTab === 'systems'} onClick={() => setActiveTab('systems')} />
          </nav>

          <div className="p-6 mt-auto border-t border-slate-800 bg-slate-900/50">
            <div className="flex items-center gap-3 text-slate-500 text-xs font-bold hover:text-slate-300 cursor-pointer transition-colors">
              <Settings size={16} />
              <span>System Preferences</span>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-6 md:p-12 relative">
          <div className="max-w-6xl mx-auto pb-24">
            {activeTab === 'brief' && <ArchitectsBrief />}
            {activeTab === 'schema' && <SchemaVisualization />}
            {activeTab === 'simulator' && <QueueSimulator />}
            {activeTab === 'reception' && <ReceptionistDashboard />}
            {activeTab === 'doctor' && <DoctorConsole />}
            {activeTab === 'patient' && <PatientUI2026 />}
            {activeTab === 'voice' && <VoiceInteractionSystem />}
            {activeTab === 'systems' && <SystemsReliability />}
          </div>
        </main>
      </div>
    </ClinicContext.Provider>
  );
};

const NavItem = ({ icon, label, active, onClick, color = 'emerald' }: { icon: any, label: string, active: boolean, onClick: () => void, color?: string }) => {
  const activeClasses = {
    emerald: 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30',
    cyan: 'bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/30',
    blue: 'bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/30',
  }[color];

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
        active ? activeClasses : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
      }`}
    >
      <span className={active ? '' : 'opacity-50'}>{icon}</span>
      <span className="font-bold text-sm tracking-tight">{label}</span>
    </button>
  );
};

export default App;
