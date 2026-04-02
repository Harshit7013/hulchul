"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [telemetry, setTelemetry] = useState<any>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      const socketUrl = `${process.env.NEXT_PUBLIC_WS_BASE_URL || 'ws://localhost:8000'}/telemetry`;
      const socket = new WebSocket(socketUrl);
      
      socket.onmessage = (event) => {
        setTelemetry(JSON.parse(event.data));
      };

      return () => socket.close();
    }
  }, [isActive]);

  return (
    <div className="flex-1 p-8 flex flex-col overflow-hidden animate-fadeSlideUp">
      <div className="flex-1 bg-[#131313]/50 backdrop-blur-xl border border-white/5 rounded-[2rem] p-10 flex flex-col items-center justify-center relative overflow-hidden group shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-40 group-hover:opacity-100 transition-opacity duration-1000"></div>
        
        {!isActive ? (
          <div className="relative flex flex-col items-center z-10 transform transition-transform duration-700 group-hover:-translate-y-2">
            <div className="w-24 h-24 rounded-full bg-surface-container-highest/80 flex items-center justify-center mb-8 shadow-inner border border-white/5 group-hover:shadow-[0_0_30px_rgba(241,131,255,0.2)] transition-shadow duration-500">
              <span className="material-symbols-outlined text-5xl text-white/50 group-hover:text-primary transition-colors duration-500">dashboard</span>
            </div>
            
            <h2 className="text-4xl font-headline font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-4 text-center">Dashboard Pipeline</h2>
            <p className="text-white/50 text-center max-w-lg mb-10 text-lg leading-relaxed">
              The telemetry interface is currently offline. Connect your primary data feed to start rendering active metrics, live insights, and latency graphs.
            </p>
            
            <button 
                onClick={() => setIsActive(true)}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-headline font-bold shadow-[0_0_20px_rgba(241,131,255,0.3)] hover:shadow-[0_0_30px_rgba(241,131,255,0.5)] transition-all active:scale-95 hover:scale-105"
            >
              Initialize Telemetry
            </button>
          </div>
        ) : (
          <div className="relative z-10 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-6 animate-fadeSlideUp">
            <div className="col-span-full mb-8 flex justify-between items-center">
                <div>
                   <h2 className="text-3xl font-headline font-black text-white">Live Monitoring</h2>
                   <p className="text-white/40 text-sm">Real-time infrastructure health and agent activity</p>
                </div>
                <button 
                  onClick={() => setIsActive(false)}
                  className="px-4 py-2 text-xs rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-colors"
                >
                  Disconnect
                </button>
            </div>

            <MetricCard 
                label="CPU Usage" 
                value={telemetry?.cpu_usage ? `${telemetry.cpu_usage}%` : "---"} 
                icon="memory" 
                color="text-primary"
                progress={telemetry?.cpu_usage}
            />
            <MetricCard 
                label="Memory" 
                value={telemetry?.memory_usage ? `${telemetry.memory_usage}%` : "---"} 
                icon="storage" 
                color="text-secondary"
                progress={telemetry?.memory_usage}
            />
            <MetricCard 
                label="Active Agents" 
                value={telemetry?.active_agents || "---"} 
                icon="smart_toy" 
                color="text-tertiary"
            />
            <MetricCard 
                label="Latency" 
                value={telemetry?.latency_ms ? `${telemetry.latency_ms}ms` : "---"} 
                icon="speed" 
                color="text-error"
            />

            <div className="col-span-full mt-8 bg-black/40 border border-white/5 rounded-3xl p-8 backdrop-blur-md">
                <div className="flex items-center justify-between mb-6">
                    <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Network Throughput</span>
                    <span className="text-secondary font-mono text-sm">{telemetry?.network_throughput || 0} MB/s</span>
                </div>
                <div className="h-32 flex items-end gap-1.5 overflow-hidden">
                    {[...Array(40)].map((_, i) => (
                        <div 
                          key={i} 
                          className="flex-1 bg-secondary/20 rounded-t-sm transition-all duration-500"
                          style={{ height: `${Math.random() * 80 + 20}%`, opacity: (i + 1) / 40 }}
                        ></div>
                    ))}
                </div>
            </div>
          </div>
        )}

        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-[40px] pointer-events-none"></div>
        <div className="absolute left-10 bottom-10 w-48 h-48 bg-primary/10 rounded-full blur-[50px] pointer-events-none"></div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, icon, color, progress }: any) {
    return (
        <div className="bg-white/5 border border-white/5 rounded-[2rem] p-6 hover:bg-white/10 transition-all duration-500 group/card">
            <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 ${color} transition-transform group-hover/card:scale-110`}>
                <span className="material-symbols-outlined">{icon}</span>
            </div>
            <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest block mb-1">{label}</span>
            <span className="text-2xl font-black font-headline text-white">{value}</span>
            {progress !== undefined && (
                <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                   <div 
                      className={`h-full bg-current transition-all duration-1000 ${color}`}
                      style={{ width: `${progress}%` }}
                   ></div>
                </div>
            )}
        </div>
    )
}
