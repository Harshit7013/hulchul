"use client";

import { useState } from "react";

export default function InputBox({ onSend, isRunning }: { onSend: (t: string) => void; isRunning?: boolean }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || isRunning) return;
    onSend(trimmed);
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="glass-panel p-4 rounded-full border border-white/5 shadow-[0_10px_40px_rgba(241,131,255,0.05)] flex items-center gap-4 relative z-10 w-full">
      <button className="h-12 w-12 shrink-0 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
        <span className="material-symbols-outlined text-white/60">attach_file</span>
      </button>
      
      <input 
        className="flex-1 bg-transparent border-none focus:ring-0 text-white font-body py-3 placeholder:text-white/30 outline-none text-[15px]" 
        placeholder="Define custom simulation parameters..." 
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      
      <button 
        onClick={handleSend}
        disabled={!text.trim() || isRunning}
        className={`bg-gradient-to-r from-primary to-primary-container px-8 h-12 rounded-full font-headline font-bold text-on-primary-container flex items-center gap-2 transition-all shrink-0 ${
          !text.trim() || isRunning ? "opacity-50 grayscale cursor-not-allowed" : "hover:opacity-90 shadow-lg shadow-primary/20 active:scale-95"
        }`}
      >
        <span>{isRunning ? 'Processing' : 'Launch'}</span>
        <span className={`material-symbols-outlined text-sm ${isRunning ? 'animate-spin' : ''}`}>
          {isRunning ? 'sync' : 'rocket_launch'}
        </span>
      </button>
    </div>
  );
}
