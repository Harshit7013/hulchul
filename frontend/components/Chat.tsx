"use client";

import { useRef, useEffect } from "react";
import Message from "./Message";
import InputBox from "./InputBox";

const EMPTY_PROMPTS = [
  { text: "Fake PM speech on reservations", desc: "Highly viral deepfake vector", icon: "record_voice_over", color: "text-primary" },
  { text: "Celebrity death rumour on Twitter", desc: "High-velocity social engagement", icon: "trending_up", color: "text-secondary" },
  { text: "Water poisoning WhatsApp forward", desc: "Critical infrastructure panic vector", icon: "chat", color: "text-tertiary" }
];

export default function Chat({ messages, event, isRunning, onStartSimulation }: { messages: any[], event: string | null, isRunning: boolean, onStartSimulation: (prompt: string) => void }) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section className="col-span-8 flex flex-col h-full gap-8 min-h-0">
      <div className={`flex-1 glass-panel rounded-xl flex flex-col relative overflow-hidden border border-white/5 shadow-2xl min-h-0 ${messages.length === 0 && !isRunning ? 'justify-center items-center' : 'justify-start'}`}>
        
        {messages.length === 0 && !isRunning && (
          <div className="p-10 w-full h-full flex flex-col items-center justify-center">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full"></div>
            
            <div className="max-w-xl text-center relative z-10 animate-fadeSlideUp">
              <h3 className="text-4xl font-headline font-extrabold mb-4 tracking-tight leading-tight">
                Create a <span className="text-gradient">New Simulation</span> Space
              </h3>
              <p className="text-white/60 mb-10 leading-relaxed font-body">Select a predefined narrative vector or input a custom prompt to begin stress-testing your network resilience.</p>
              
              <div className="grid grid-cols-1 gap-4 text-left">
                {EMPTY_PROMPTS.map((p, i) => (
                  <button key={i} onClick={() => onStartSimulation(p.text)} className="group flex items-center justify-between p-5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all hover:scale-[1.02]">
                    <div className="flex items-center gap-4">
                      <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${p.color} ${p.color.replace('text-', 'bg-')}/20`}>
                        <span className="material-symbols-outlined">{p.icon}</span>
                      </div>
                      <div>
                        <span className="block font-bold text-white">{p.text}</span>
                        <span className="text-xs text-white/40">{p.desc}</span>
                      </div>
                    </div>
                    <span className={`material-symbols-outlined text-white/20 group-hover:${p.color} transition-colors`}>arrow_forward</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Live Simulation View */}
        {(messages.length > 0 || isRunning) && (
          <div className="flex-1 w-full overflow-y-auto px-10 pt-10 pb-20 custom-scrollbar flex flex-col min-h-0">
            <div className="max-w-4xl w-full mx-auto flex flex-col">
              {event && (
                <div className="flex justify-center mb-8 animate-fadeSlideUp">
                  <div className="bg-error-container/20 text-error-dim px-5 py-3 rounded-2xl border border-error/20 font-bold text-sm shadow-lg backdrop-blur-md">
                    {event}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-2">
                {messages.map((m, i) => (
                  <Message key={i} msg={m} />
                ))}
              </div>

              {isRunning && (
                <div className="flex items-center gap-3 text-secondary my-6 animate-pulse">
                  <span className="material-symbols-outlined animate-spin-slow">sync</span>
                  <span className="text-sm font-headline tracking-widest uppercase">Processing Network Graph...</span>
                </div>
              )}
              
              <div ref={bottomRef} className="h-4 w-full shrink-0" />
            </div>
          </div>
        )}
      </div>

      <InputBox onSend={onStartSimulation} isRunning={isRunning} />
    </section>
  );
}
