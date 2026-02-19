
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Layout, Database, Activity, FileText, Smartphone, Settings, Mic, ClipboardList, ShieldCheck, UserCircle, Stethoscope, UserPlus, ShoppingBag, Rocket, BadgeHelp, Wallet, LogOut } from 'lucide-react';
import LandingPage from './components/LandingPage';
import SchemaVisualization from './components/SchemaVisualization';
import QueueSimulator from './components/QueueSimulator';
import ArchitectsBrief from './components/ArchitectsBrief';
import PatientUI2026 from './components/PatientUI2026';
import VoiceInteractionSystem from './components/VoiceInteractionSystem';
import ReceptionistDashboard from './components/ReceptionistDashboard';
import SystemsReliability from './components/SystemsReliability';
import DoctorConsole from './components/DoctorConsole';
import DoctorPracticeSetup from './components/DoctorPracticeSetup';
import SellerDashboard from './components/SellerDashboard';

// --- Shared Types ---
export type SubscriptionTier = 'BRONZE' | 'SILVER' | 'GOLD';
export type Role = 'ADMIN' | 'RECEPTIONIST' | 'DOCTOR' | 'PATIENT' | 'SELLER' | 'UNSET';
export type PatientStatus = 'PENDING' | 'WAITING' | 'TIME_TO_MOVE' | 'ARRIVED' | 'IN_SESSION' | 'COMPLETED' | 'EMERGENCY' | 'CANCELLED' | 'SKIPPED';

export interface Location {
  id: string;
  name: string;
  fee: number;
  days: string[];
  slots: { start: string; end: string; maxOPD: number }[];
}

export interface Patient {
  id: string;
  token: number;
  phone: string;
  status: PatientStatus;
  paid: boolean;
  name?: string;
  isEmergency?: boolean;
  locationId?: string;
  isPriority?: boolean;
  notes?: string;
  completedAt?: string;
}

interface DoctorProfile {
  name: string;
  specialty: string;
}

interface ClinicContextType {
  role: Role;
  setRole: (r: Role) => void;
  tier: SubscriptionTier;
  setTier: (t: SubscriptionTier) => void;
  locations: Location[];
  setLocations: (locs: Location[]) => void;
  queue: Patient[];
  pendingBookings: Patient[];
  completedHistory: Patient[];
  currentInSession: Patient | null;
  walletBalance: number;
  setWalletBalance: (b: number) => void;
  addPatient: (phone: string, name?: string, isEmergency?: boolean, locationId?: string, isPriority?: boolean) => void;
  approveBooking: (id: string) => void;
  updatePatient: (id: string, updates: Partial<Patient>) => void;
  callNext: () => void;
  completeSession: (notes?: string) => void;
  markAsSkipped: (id: string) => void;
  isDoctorLate: boolean;
  isSubscribed: boolean;
  setSubscribed: (val: boolean) => void;
  triggerEmergency: () => void;
  doctorProfile: DoctorProfile;
  setDoctorProfile: (p: DoctorProfile) => void;
}

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (!context) throw new Error("useClinic must be used within ClinicProvider");
  return context;
};

export const App: React.FC = () => {
  const [role, setRole] = useState<Role>('UNSET');
  const [activeTab, setActiveTab] = useState<string>('discovery');
  const [tier, setTier] = useState<SubscriptionTier>('GOLD');
  const [locations, setLocations] = useState<Location[]>([]);
  const [queue, setQueue] = useState<Patient[]>([]);
  const [pendingBookings, setPendingBookings] = useState<Patient[]>([]);
  const [completedHistory, setCompletedHistory] = useState<Patient[]>([]);
  const [currentInSession, setCurrentInSession] = useState<Patient | null>(null);
  const [walletBalance, setWalletBalance] = useState(2450); 
  const [isDoctorLate, setIsDoctorLate] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [doctorProfile, setDoctorProfile] = useState<DoctorProfile>({ name: 'Zain', specialty: 'General Surgeon' });

  useEffect(() => {
    if (role === 'PATIENT') setActiveTab('discovery');
    if (role === 'DOCTOR') setActiveTab('setup');
    if (role === 'SELLER') setActiveTab('seller');
    if (role === 'ADMIN') setActiveTab('schema');
    if (role === 'RECEPTIONIST') setActiveTab('reception');
  }, [role]);

  const addPatient = (phone: string, name?: string, isEmergency = false, locationId?: string, isPriority = false) => {
    const nextToken = (queue.length + pendingBookings.length + 1);
    const newPatient: Patient = {
      id: Math.random().toString(36).substr(2, 9),
      token: nextToken,
      phone,
      name: name || (isEmergency ? 'EMERGENCY' : `Patient ${nextToken}`),
      status: isEmergency ? 'EMERGENCY' : 'PENDING',
      paid: isEmergency,
      isEmergency,
      locationId,
      isPriority
    };

    if (isEmergency || (isPriority && tier === 'GOLD')) {
      setQueue(prev => [newPatient, ...prev]);
    } else {
      setPendingBookings(prev => [...prev, newPatient]);
    }
  };

  const approveBooking = (id: string) => {
    const p = pendingBookings.find(x => x.id === id);
    if (p) {
      setPendingBookings(prev => prev.filter(x => x.id !== id));
      setQueue(prev => [...prev, { ...p, status: 'WAITING' }]);
    }
  };

  const updatePatient = (id: string, updates: Partial<Patient>) => {
    setQueue(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
  };

  const callNext = () => {
    const next = queue.find(p => p.status === 'EMERGENCY') || queue.find(p => p.status === 'WAITING' || p.status === 'ARRIVED');
    if (!next) return;
    if (currentInSession) {
        completeSession("Quick completion.");
    }
    updatePatient(next.id, { status: 'IN_SESSION' });
    setCurrentInSession(next);
  };

  const completeSession = (notes?: string) => {
    if (currentInSession) {
      const finishedPatient: Patient = { 
        ...currentInSession, 
        status: 'COMPLETED', 
        notes, 
        completedAt: new Date().toLocaleTimeString() 
      };
      setCompletedHistory(prev => [finishedPatient, ...prev]);
      setQueue(prev => prev.filter(p => p.id !== currentInSession.id));
      setCurrentInSession(null);
    }
  };

  const markAsSkipped = (id: string) => {
    const p = queue.find(x => x.id === id);
    if (p) {
      const skippedPatient: Patient = { ...p, status: 'SKIPPED', completedAt: new Date().toLocaleTimeString() };
      setCompletedHistory(prev => [skippedPatient, ...prev]);
      setQueue(prev => prev.filter(x => x.id !== id));
      if (currentInSession?.id === id) setCurrentInSession(null);
    }
  };

  const triggerEmergency = () => addPatient("EMERGENCY", "EMERGENCY CASE", true);

  if (role === 'UNSET') return <LandingPage onSelect={setRole} />;

  return (
    <ClinicContext.Provider value={{ 
      role, setRole, tier, setTier, locations, setLocations, queue, pendingBookings, completedHistory,
      currentInSession, walletBalance, setWalletBalance, addPatient, approveBooking, 
      updatePatient, callNext, completeSession, markAsSkipped, isDoctorLate, isSubscribed, setSubscribed: setIsSubscribed, 
      triggerEmergency, doctorProfile, setDoctorProfile 
    }}>
      <div className="min-h-screen flex flex-col md:flex-row bg-[#020617] text-slate-100 font-sans">
        
        <aside className="w-full md:w-[260px] bg-[#020617] border-b md:border-b-0 md:border-r border-slate-900 flex flex-col sticky top-0 h-auto md:h-screen z-50 shrink-0">
          <div className="p-5 md:p-8 space-y-6">
            <div className="w-[180px] h-[40px] bg-gradient-to-r from-[#22d3ee] to-[#34d399] rounded-[4px] shadow-lg shadow-cyan-500/10"></div>
            <div>
              <p className="text-[10px] md:text-[11px] text-slate-500 uppercase tracking-[0.4em] font-black">{role} PORTAL</p>
            </div>
          </div>

          <nav className="flex md:flex-col overflow-x-auto md:overflow-x-visible px-4 space-x-2 md:space-x-0 md:space-y-2 pt-2 pb-4 md:pb-0 scrollbar-hide">
             {role === 'PATIENT' && <NavItem icon={<ShoppingBag size={18}/>} label="MARKET" active={activeTab === 'discovery'} onClick={() => setActiveTab('discovery')} />}
             {role === 'DOCTOR' && (
               <>
                 <NavItem icon={<Rocket size={18}/>} label="SET UP" active={activeTab === 'setup'} onClick={() => setActiveTab('setup')} />
                 <NavItem icon={<Stethoscope size={18}/>} label="STATION" active={activeTab === 'doctor'} onClick={() => setActiveTab('doctor')} />
                 <NavItem icon={<UserPlus size={18}/>} label="STAFF" active={activeTab === 'reception'} onClick={() => setActiveTab('reception')} />
               </>
             )}
             {role === 'RECEPTIONIST' && <NavItem icon={<ClipboardList size={18}/>} label="DESK" active={activeTab === 'reception'} onClick={() => setActiveTab('reception')} />}
             {role === 'ADMIN' && (
               <>
                 <NavItem icon={<Database size={18}/>} label="SCHEMA" active={activeTab === 'schema'} onClick={() => setActiveTab('schema')} />
                 <NavItem icon={<Activity size={18}/>} label="SIM" active={activeTab === 'simulator'} onClick={() => setActiveTab('simulator')} />
               </>
             )}
             {role === 'SELLER' && (
               <>
                 <NavItem icon={<Wallet size={18}/>} label="DASHBOARD" active={activeTab === 'seller'} onClick={() => setActiveTab('seller')} />
               </>
             )}
          </nav>

          <div className="mt-auto p-8">
             <button onClick={() => setRole('UNSET')} className="flex items-center gap-3 text-slate-500 hover:text-white transition-all font-bold uppercase text-[10px] tracking-[0.2em]">
                <LogOut size={16} /> SWITCH ROLE
             </button>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto bg-[#020617]">
          <div className="max-w-6xl mx-auto p-4 md:p-8 lg:p-10 pb-32">
            {activeTab === 'discovery' && <PatientUI2026 />}
            {activeTab === 'setup' && <DoctorPracticeSetup />}
            {activeTab === 'doctor' && <DoctorConsole />}
            {activeTab === 'reception' && <ReceptionistDashboard />}
            {activeTab === 'schema' && <SchemaVisualization />}
            {activeTab === 'simulator' && <QueueSimulator />}
            {activeTab === 'seller' && <SellerDashboard />}
          </div>
        </main>
      </div>
    </ClinicContext.Provider>
  );
};

const NavItem = ({ icon, label, active, onClick }: any) => (
  <button onClick={onClick} className={`flex-shrink-0 md:flex-shrink flex items-center gap-3 md:gap-4 px-4 md:px-5 py-2 md:py-3 rounded-full transition-all duration-300 ${active ? `bg-white/10 text-white shadow-xl scale-[1.02]` : 'text-slate-500 hover:text-slate-300'}`}>
    {icon} <span className="font-black text-[10px] md:text-[11px] tracking-wider whitespace-nowrap uppercase">{label}</span>
  </button>
);

export default App;
