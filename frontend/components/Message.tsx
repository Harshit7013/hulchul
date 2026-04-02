"use client";

const AGENT_ICONS: Record<string, { icon: string; color: string }> = {
  "Forwarding Aunty":    { icon: "person_4", color: "text-primary" },
  "Engineering Student": { icon: "computer", color: "text-secondary" },
  "Rural User":          { icon: "agriculture", color: "text-tertiary" },
  "NRI":                 { icon: "flight_takeoff", color: "text-secondary-dim" },
  "Religious Influencer":{ icon: "church", color: "text-primary-dim" },
  "Retired Officer":     { icon: "military_tech", color: "text-error" },
};

export default function Message({ msg }: { msg: any }) {
  const agent = AGENT_ICONS[msg.agent] || { icon: "smart_toy", color: "text-white/80" };
  
  const isNegative = msg.sentiment === "negative";
  const badgeColor = isNegative ? 'text-error border-error/30' : 
                     msg.sentiment === "positive" ? 'text-secondary border-secondary/30' : 
                     'text-white/60 border-white/10';

  return (
    <div className="flex gap-4 mb-6 group animate-fadeSlideUp w-full max-w-3xl">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-white/5 border border-white/10 mt-1`}>
        <span className={`material-symbols-outlined ${agent.color} text-xl`}>{agent.icon}</span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1.5 ml-1">
          <span className="text-sm font-bold text-white font-headline tracking-wide">{msg.agent}</span>
          <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${badgeColor}`}>
            {msg.sentiment}
          </span>
        </div>

        <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-sm px-5 py-4 text-sm text-white/80 leading-relaxed custom-scrollbar shadow-lg backdrop-blur-md">
          {msg.message}
        </div>
      </div>
    </div>
  );
}
