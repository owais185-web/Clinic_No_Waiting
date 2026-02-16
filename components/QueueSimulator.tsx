
import React, { useState, useEffect } from 'react';
import { Play, FastForward, AlertTriangle, UserCheck, MoveRight, Volume2 } from 'lucide-react';

interface QueueItem {
  id: string;
  name: string;
  token: number;
  status: 'WAITING' | 'TIME_TO_MOVE' | 'ARRIVED' | 'IN_SESSION' | 'COMPLETED' | 'EMERGENCY';
  isEmergency?: boolean;
}

const QueueSimulator: React.FC = () => {
  const [queue, setQueue] = useState<QueueItem[]>([
    { id: '1', name: 'Ahmad', token: 1, status: 'IN_SESSION' },
    { id: '2', name: 'Zahra', token: 2, status: 'WAITING' },
    { id: '3', name: 'Bilal', token: 3, status: 'WAITING' },
    { id: '4', name: 'Fatima', token: 4, status: 'WAITING' },
    { id: '5', name: 'Omar', token: 5, status: 'WAITING' },
    { id: '6', name: 'Sana', token: 6, status: 'WAITING' },
    { id: '7', name: 'Hassan', token: 7, status: 'WAITING' },
    { id: '8', name: 'Maria', token: 8, status: 'WAITING' },
    { id: '9', name: 'Hamza', token: 9, status: 'WAITING' },
    { id: '10', name: 'Zainab', token: 10, status: 'WAITING' },
  ]);

  const [logs, setLogs] = useState<string[]>(['Simulator Initialized...']);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev.slice(0, 9)]);
  };

  const advanceQueue = () => {
    setQueue(prev => {
      const nextQueue = [...prev];
      const currentInSessionIdx = nextQueue.findIndex(q => q.status === 'IN_SESSION');
      
      if (currentInSessionIdx !== -1) {
        nextQueue[currentInSessionIdx].status = 'COMPLETED';
        addLog(`Token ${nextQueue[currentInSessionIdx].token} (Session Finished)`);
      }

      const nextToCallIdx = nextQueue.findIndex(q => q.status !== 'COMPLETED' && q.status !== 'IN_SESSION');
      if (nextToCallIdx !== -1) {
        nextQueue[nextToCallIdx].status = 'IN_SESSION';
        addLog(`Token ${nextQueue[nextToCallIdx].token} (${nextQueue[nextToCallIdx].name}) is now IN SESSION`);
      }

      // TRAVEL TRIGGER LOGIC (within 5 spots)
      const inSessionToken = nextToCallIdx !== -1 ? nextQueue[nextToCallIdx].token : 0;
      nextQueue.forEach(item => {
        if (item.status === 'WAITING' && item.token <= inSessionToken + 5) {
          item.status = 'TIME_TO_MOVE';
          addLog(`Cloud Function: Triggered 'TIME_TO_MOVE' for Token ${item.token}`);
        }
      });

      return nextQueue;
    });
  };

  const triggerEmergency = () => {
    const emergencyToken: QueueItem = {
      id: Math.random().toString(),
      name: 'EMERGENCY CASE',
      token: 99,
      status: 'EMERGENCY',
      isEmergency: true
    };

    setQueue(prev => {
      const nextQueue = [...prev];
      const sessionIdx = nextQueue.findIndex(q => q.status === 'IN_SESSION');
      // Leapfrog logic: Insert right after current session
      nextQueue.splice(sessionIdx + 1, 0, emergencyToken);
      addLog(`LEAPFROG EVENT: Emergency case inserted into slot ${sessionIdx + 2}`);
      return nextQueue;
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Queue Logic Simulator</h2>
          <p className="text-slate-400">Interact with the real-time state machine to see Travel Triggers and Leapfrogs in action.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={advanceQueue}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold transition-all"
          >
            <Play size={18} fill="currentColor" />
            Next Patient
          </button>
          <button 
            onClick={triggerEmergency}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-bold transition-all shadow-lg shadow-red-900/20"
          >
            <AlertTriangle size={18} />
            Emergency
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Visualization */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 min-h-[400px]">
            <h3 className="text-slate-500 uppercase text-xs font-bold tracking-widest mb-4">Clinic Waiting Hall (Live View)</h3>
            <div className="space-y-3">
              {queue.filter(q => q.status !== 'COMPLETED').map((item, i) => (
                <div 
                  key={item.id} 
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-500 transform ${
                    item.status === 'IN_SESSION' ? 'bg-emerald-500/20 border-emerald-500/50 scale-105 shadow-xl' :
                    item.status === 'TIME_TO_MOVE' ? 'bg-amber-500/20 border-amber-500/50 animate-pulse' :
                    item.status === 'EMERGENCY' ? 'bg-red-500/20 border-red-500/50 ring-2 ring-red-500 ring-offset-2 ring-offset-slate-900' :
                    'bg-slate-800/50 border-slate-700/50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xl ${
                    item.isEmergency ? 'bg-red-500' : 'bg-slate-700 text-slate-300'
                  }`}>
                    {item.token}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-100">{item.name}</span>
                      {item.isEmergency && <span className="bg-red-500 text-[10px] text-white px-2 py-0.5 rounded-full font-black uppercase">Critical</span>}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        item.status === 'IN_SESSION' ? 'bg-emerald-500/30 text-emerald-400' :
                        item.status === 'TIME_TO_MOVE' ? 'bg-amber-500/30 text-amber-400' :
                        item.status === 'EMERGENCY' ? 'bg-red-500/30 text-red-400' :
                        'bg-slate-700 text-slate-400'
                      }`}>
                        {item.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </div>
                  {item.status === 'TIME_TO_MOVE' && (
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-bold animate-bounce">
                      <MoveRight size={14} />
                      Leave Home Now!
                    </div>
                  )}
                  {item.status === 'IN_SESSION' && (
                    <UserCheck className="text-emerald-400" size={24} />
                  )}
                  <button className="text-slate-500 hover:text-white transition-colors">
                    <Volume2 size={20} />
                  </button>
                </div>
              ))}
              {queue.filter(q => q.status !== 'COMPLETED').length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-slate-600">
                   <FastForward size={48} className="mb-2 opacity-20" />
                   <p className="font-medium">Queue is empty. Clinic closed.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Backend Logs / Logic Analysis */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-1/2">
            <h3 className="text-slate-500 uppercase text-xs font-bold tracking-widest mb-4">Event Bus (Cloud Functions)</h3>
            <div className="space-y-2 font-mono text-xs overflow-hidden">
              {logs.map((log, i) => (
                <div key={i} className={`p-2 rounded border border-slate-800 ${i === 0 ? 'bg-slate-800 text-cyan-400' : 'text-slate-500'}`}>
                  &gt; {log}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-xl">
             <h4 className="text-emerald-400 font-bold text-sm mb-3">Architect's Insight</h4>
             <p className="text-xs text-slate-400 leading-relaxed">
               The "Time to Move" trigger uses a <span className="text-emerald-300">Firestore Cloud Function</span> on the <code>onUpdate</code> trigger of the Queue collection. It calculates the delta between <code>current_in_session_token</code> and the patient's token. If &lt; 5, it sets the status which triggers a <span className="text-emerald-300">Firebase Cloud Messaging (FCM)</span> push notification and an <span className="text-emerald-300">In-App Audio Alert</span>.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueSimulator;
