"use client";

import { useMemo } from "react";

export default function RightPanel({ messages = [], event = null, isRunning = false }: { messages: any[], event: string | null, isRunning: boolean }) {
  // Calculate Sentiment Mix
  const sentimentCounts = useMemo(() => {
    const counts: Record<string, number> = { negative: 0, neutral: 0, positive: 0 };
    messages.forEach((m: any) => {
      if (counts[m.sentiment] !== undefined) counts[m.sentiment]++;
    });
    return counts;
  }, [messages]);

  const total = messages.length || 1;
  const negPct = Math.round((sentimentCounts.negative / total) * 100) || 0;
  const neuPct = Math.round((sentimentCounts.neutral / total) * 100) || 0;
  const posPct = 100 - negPct - neuPct > 0 && messages.length > 0 ? 100 - negPct - neuPct : 0; // ensure it sums to 100%

  // Calculate Virality Index
  const isCritical = negPct > 50 || event;
  const isModerate = negPct > 30 || messages.length > 5;
  const score = messages.length === 0 ? "Offline" : isCritical ? "Critical" : isModerate ? "Moderate" : "Low";

  // Calculate Network Agents
  const uniqueAgents = new Set(messages.map((m: any) => m.agent)).size;
  const networkMultiplier = 142; // arbitrary scaling factor for visual
  const agentCount = messages.length === 0 ? 0 : uniqueAgents * networkMultiplier + messages.length * 15;
  const displayAgents = agentCount > 1000 ? (agentCount / 1000).toFixed(1) + 'k' : agentCount;

  // Generate Activity Logs
  const recentLogs = useMemo(() => {
    const logs = [];
    if (messages.length > 0 && !isRunning) {
        logs.push({ text: `Simulation finalized and archived.`, color: 'text-primary-container', time: new Date().toLocaleTimeString('en-US',{hour12:false,hour:'2-digit',minute:'2-digit'}) });
    }
    if (event) {
        logs.push({ text: `Propensity shift: ${event}`, color: 'text-error', time: new Date().toLocaleTimeString('en-US',{hour12:false,hour:'2-digit',minute:'2-digit'}) });
    }
    if (messages.length > 0) {
        logs.push({ text: `Detected ${uniqueAgents} unique seed nodes targeting network.`, color: 'text-white', time: new Date().toLocaleTimeString('en-US',{hour12:false,hour:'2-digit',minute:'2-digit'}) });
    }
    if (isRunning) {
        logs.push({ text: `Simulation session initialized...`, color: 'text-secondary', time: new Date().toLocaleTimeString('en-US',{hour12:false,hour:'2-digit',minute:'2-digit'}) });
    }
    if (logs.length === 0) {
      logs.push({ text: `Awaiting network connection...`, color: 'text-white/40', time: '--:--' });
    }
    return logs;
  }, [messages.length, isRunning, event, uniqueAgents]);

  return (
    <aside className="col-span-4 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
      {/* Live Telemetry Card */}
      <div className="glass-panel rounded-xl p-6 border border-white/5 relative overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h4 className="font-headline font-bold text-lg">Analytics</h4>
          <span className={`text-[10px] ${isRunning ? 'bg-secondary/10 text-secondary' : 'bg-white/5 text-white/40'} px-3 py-1 rounded-full font-bold uppercase tracking-wider transition-colors`}>
            {isRunning ? 'Live Telemetry' : 'Standby'}
          </span>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white/5 rounded-2xl p-5">
            <span className="text-white/40 text-[11px] font-bold uppercase tracking-widest block mb-1">Target Zone</span>
            <div className="flex items-center gap-3">
              <span className={`material-symbols-outlined ${messages.length > 0 ? 'text-secondary' : 'text-white/40'}`}>location_on</span>
              <span className={`text-xl font-bold font-headline ${messages.length > 0 ? 'text-white' : 'text-white/40'}`}>Urban India</span>
            </div>
            {/* Mini map visual */}
            <div className="mt-4 h-24 w-full rounded-xl overflow-hidden bg-surface-container relative">
              <img 
                alt="Simulation map" 
                className={`w-full h-full object-cover transition-all duration-1000 ${messages.length > 0 ? 'opacity-50 contrast-125' : 'opacity-20 grayscale'}`}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMk35J3DrAT_DFjsB9RikCzdljdV_m8sMe4lQiKD75sd31KfeYydXW_m2-cvGkZV2Cz1Thq40Op4NkPCoscd50CKrCzjctD17WWGvLp-LLs2OUQOdOWKjexHdPbJ5snFSm-1cS9Yyq1JbvTLh_JapHMW-CfN9un3ghshX5nwNhIGcQmn-bENVup1H2mq72oIBgk7KefGBrICJGXhzmYkWk_cJz8Wjw3eXFlP3jjJhPiSAucsllIvp8rpE5oLM-802v214323prC1o" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-2xl p-4">
              <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest block mb-2">Virality Index</span>
              <div className="flex items-baseline gap-1">
                <span className={`text-2xl font-black font-headline ${score === 'Critical' ? 'text-error' : score === 'Moderate' ? 'text-primary' : 'text-primary'}`}>{score === 'Low' ? 'Low' : score}</span>
                <span className={`material-symbols-outlined text-sm ${score === 'Critical' ? 'text-error' : 'text-primary'}`}>{score === 'Critical' ? 'trending_up' : 'trending_flat'}</span>
              </div>
            </div>
            <div className="bg-white/5 rounded-2xl p-4">
              <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest block mb-2">Network Agents</span>
              <div className="flex items-baseline gap-1">
                <span className={`text-2xl font-black font-headline ${messages.length > 0 ? 'text-secondary' : 'text-white/40'}`}>{messages.length > 0 ? displayAgents : '0'}</span>
                <span className={`material-symbols-outlined text-xs text-secondary ${messages.length > 0 ? '' : 'opacity-40'}`}>groups</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-2xl p-5">
            <span className="text-white/40 text-[11px] font-bold uppercase tracking-widest block mb-4">Sentiment Mix</span>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1.5 transition-all">
                  <span className={`${negPct > 0 ? 'text-error font-semibold' : 'text-white/40'}`}>Negative</span>
                  <span className="text-white font-bold">{negPct}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-error rounded-full transition-all duration-1000" style={{ width: `${negPct}%` }}></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-[10px] mb-1">
                    <span className="text-white/40">Neutral</span>
                    <span className="text-white font-bold">{neuPct}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-white/40 rounded-full transition-all duration-1000" style={{ width: `${neuPct}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] mb-1">
                    <span className="text-secondary">Positive</span>
                    <span className="text-white font-bold">{posPct}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-secondary rounded-full transition-all duration-1000" style={{ width: `${posPct}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Simulation Logs */}
      <div className="glass-panel rounded-xl p-6 border border-white/5 flex-1 relative overflow-hidden">
        <h4 className="font-headline font-bold text-sm text-white/40 uppercase tracking-widest mb-4">Recent Activity</h4>
        <div className="space-y-3">
          {recentLogs.map((log, i) => (
            <div key={i} className="flex gap-3 text-xs animate-fadeSlideUp">
              <span className="text-secondary font-mono">{log.time}</span>
              <p className="text-white/70 leading-snug">
                {log.text.includes("TV Debate") ? (
                  <>
                    Propensity shift: <span className="text-error font-bold">{log.text.split("Propensity shift: ")[1]}</span>
                  </>
                ) : log.text.includes("finalized") ? (
                  <>
                    Simulation <span className="text-primary-container font-semibold">#042</span> finalized and archived.
                  </>
                ) : log.text.includes("seed nodes") ? (
                  <>
                    Detected <span className="text-secondary font-semibold">{uniqueAgents}</span> unique seed nodes targeting network.
                  </>
                ) : (
                  log.text
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
