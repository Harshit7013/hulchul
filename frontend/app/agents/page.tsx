export default function AgentsPage() {
  return (
    <div className="flex-1 p-8 flex flex-col overflow-hidden animate-fadeSlideUp">
      <div className="flex-1 bg-[#131313]/50 backdrop-blur-xl border border-white/5 rounded-[2rem] p-10 flex flex-col items-center justify-center relative overflow-hidden group shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        
        <div className="relative flex flex-col items-center z-10 transform transition-transform duration-700 group-hover:-translate-y-2">
          <div className="w-24 h-24 rounded-full bg-surface-container-highest/80 flex items-center justify-center mb-8 shadow-inner border border-white/5 group-hover:shadow-[0_0_30px_rgba(241,131,255,0.2)] transition-shadow duration-500">
            <span className="material-symbols-outlined text-5xl text-white/50 group-hover:text-primary transition-colors duration-500">smart_toy</span>
          </div>
          
          <h2 className="text-4xl font-headline font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-4 text-center">AI Agent Roster</h2>
          <p className="text-white/50 text-center max-w-lg mb-10 text-lg leading-relaxed">
            Manage your autonomous simulation agents. Define behaviors, tweak LLM prompts, and monitor agent lifecycle events from this central hub.
          </p>
          
          <button className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-headline font-bold shadow-[0_0_20px_rgba(241,131,255,0.3)] hover:shadow-[0_0_30px_rgba(241,131,255,0.5)] transition-all active:scale-95 hover:scale-105 flex items-center gap-3">
            <span className="material-symbols-outlined">add</span> Deploy Agent
          </button>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 right-20 w-40 h-40 bg-secondary/10 rounded-full blur-[40px] pointer-events-none"></div>
        <div className="absolute left-1/4 bottom-20 w-56 h-56 bg-primary/10 rounded-full blur-[50px] pointer-events-none"></div>
      </div>
    </div>
  );
}
