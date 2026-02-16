
import React from 'react';
import { Database, User, Clock, Settings, ChevronRight } from 'lucide-react';

const SchemaVisualization: React.FC = () => {
  const collections = [
    {
      name: 'clinics',
      description: 'Root clinic data and configurations',
      fields: [
        { name: 'name', type: 'string' },
        { name: 'address', type: 'geopoint' },
        { name: 'operating_hours', type: 'map' }
      ],
      subcollections: [
        {
          name: 'doctors',
          fields: [
            { name: 'name', type: 'string' },
            { name: 'specialization', type: 'string' },
            { name: 'status', type: 'enum (AVAILABLE, BUSY, AWAY)' },
            { name: 'scheduled_start_time', type: 'timestamp' },
            { name: 'first_token_call_time', type: 'timestamp (actual start)' },
            { name: 'current_token_id', type: 'reference (queues)' }
          ]
        },
        {
          name: 'clinic_settings',
          fields: [
            { name: 'max_wait_capacity', type: 'number' },
            { name: 'emergency_leapfrog_enabled', type: 'boolean' },
            { name: 'auto_delay_alert_mins', type: 'number (default: 20)' }
          ]
        }
      ]
    },
    {
      name: 'queues',
      description: 'Real-time state for patient tokens',
      fields: [
        { name: 'token_id', type: 'string (PK)' },
        { name: 'doctor_id', type: 'reference' },
        { name: 'patient_id', type: 'reference' },
        { name: 'patient_audio_name', type: 'string (gs:// URL)' },
        { name: 'status', type: 'enum (WAITING, TIME_TO_MOVE, ARRIVED, IN_SESSION, COMPLETED, CANCELLED)' },
        { name: 'payment_flag', type: 'boolean' },
        { name: 'is_emergency', type: 'boolean' },
        { name: 'index', type: 'number (for sorting)' },
        { name: 'timestamp', type: 'server_timestamp' }
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="text-3xl font-bold text-white mb-2 text-white">Firestore Data Architecture</h2>
        <p className="text-slate-400">Scalable, real-time schema designed for low-latency updates and massive concurrency.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {collections.map((col, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 bg-slate-800/50 border-b border-slate-800 flex items-center gap-3">
              <Database className="text-cyan-400" size={20} />
              <h3 className="font-bold text-lg">/{col.name}</h3>
            </div>
            
            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-400 italic mb-4">"{col.description}"</p>
              
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-widest text-slate-500 font-bold">Fields</h4>
                <div className="grid grid-cols-1 gap-1">
                  {col.fields.map((f, i) => (
                    <div key={i} className="flex justify-between items-center bg-slate-950/50 px-3 py-2 rounded border border-slate-800/50">
                      <span className="text-emerald-400 font-mono text-sm">{f.name}</span>
                      <span className="text-slate-500 text-xs">{f.type}</span>
                    </div>
                  ))}
                </div>
              </div>

              {col.subcollections && (
                <div className="mt-6 space-y-4">
                  <h4 className="text-xs uppercase tracking-widest text-slate-500 font-bold">Sub-collections</h4>
                  {col.subcollections.map((sub, si) => (
                    <div key={si} className="ml-4 border-l-2 border-slate-800 pl-4 space-y-2">
                      <div className="flex items-center gap-2 text-cyan-400 text-sm font-bold">
                        <ChevronRight size={14} />
                        {sub.name}
                      </div>
                      <div className="grid grid-cols-1 gap-1">
                        {sub.fields.map((f, fi) => (
                          <div key={fi} className="flex justify-between items-center bg-slate-950/30 px-3 py-1 rounded border border-slate-800/30">
                            <span className="text-emerald-400/80 font-mono text-xs">{f.name}</span>
                            <span className="text-slate-600 text-[10px]">{f.type}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-xl">
        <h3 className="text-amber-400 font-bold mb-2 flex items-center gap-2">
          <Settings size={18} />
          Architectural Note: Real-time Sharding
        </h3>
        <p className="text-sm text-amber-200/70 leading-relaxed">
          For highly active clinics, we utilize Firestore's distributed counters for the <code>current_token_id</code> and <code>index</code> fields to avoid write contention at scale. Security Rules are set up to allow Patients only <code>read</code> access to the <code>queues</code> of their specific clinic, ensuring data privacy and minimizing document read costs.
        </p>
      </div>
    </div>
  );
};

export default SchemaVisualization;
