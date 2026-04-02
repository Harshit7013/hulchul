export default function Header() {
  return (
    <header className="flex justify-between items-center w-full max-w-[1440px] mx-auto pt-6 px-8 h-20">
      <div className="flex flex-col">
        <h2 className="text-2xl font-black tracking-tighter text-white font-headline uppercase italic">Hulchul Dashboard</h2>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse"></span>
          <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">System Operational</span>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-white/40">search</span>
          <input 
            className="bg-surface-container-low border-none rounded-full pl-12 pr-6 py-2.5 text-sm w-64 focus:ring-1 focus:ring-secondary/50 focus:bg-surface-container-highest transition-all outline-none text-white placeholder:text-white/30" 
            placeholder="Search simulation data..." 
            type="text"
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined p-2 text-white/70 hover:text-white hover:bg-white/5 rounded-full transition-all">notifications</button>
          <button className="material-symbols-outlined p-2 text-white/70 hover:text-white hover:bg-white/5 rounded-full transition-all">settings</button>
        </div>
      </div>
    </header>
  );
}
