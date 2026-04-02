"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Persist Login ID for the session
    if (typeof window !== 'undefined') {
      localStorage.setItem('HULCHUL_LOGIN_ID', loginId || 'HULCHUL_ADMIN_X');
    }

    // Mock login delay
    setTimeout(() => {
      router.push("/simulations");
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center relative overflow-hidden font-body">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/10 blur-[180px] rounded-full animate-pulse opacity-50"></div>
      <div className="absolute -bottom-48 -left-48 -z-10 w-[800px] h-[800px] bg-secondary/10 blur-[200px] rounded-full animate-pulse opacity-50 animation-delay-2000"></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 -z-10 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <main className="w-full max-w-md px-6 animate-fadeSlideUp">
        <div className="glass-panel p-10 rounded-[3rem] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)] relative overflow-hidden backdrop-blur-3xl">
          {/* Logo Section */}
          <div className="text-center mb-10">
            <div className="inline-flex h-16 w-16 bg-gradient-to-br from-primary to-primary-container rounded-2xl items-center justify-center mb-4 shadow-lg shadow-primary/20 rotate-3">
              <span className="material-symbols-outlined text-3xl text-on-primary-container font-bold">science</span>
            </div>
            <h1 className="text-3xl font-black font-headline tracking-tighter text-white uppercase italic">Hulchul</h1>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mt-2 italic font-black">Simulation Access Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-4">Login ID</label>
              <div className="relative group">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 material-symbols-outlined text-white/20 group-focus-within:text-primary transition-colors">fingerprint</span>
                <input 
                  required
                  type="text"
                  placeholder="ID: HULCHUL_XXXX_X"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  className="w-full bg-white/5 border border-white/5 rounded-full py-4 pl-14 pr-6 text-white outline-none focus:bg-white/10 focus:border-primary/30 transition-all placeholder:text-white/10 font-body"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-4">Access Key</label>
              <div className="relative group">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 material-symbols-outlined text-white/20 group-focus-within:text-secondary transition-colors">key</span>
                <input 
                  required
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/5 rounded-full py-4 pl-14 pr-6 text-white outline-none focus:bg-white/10 focus:border-secondary/30 transition-all placeholder:text-white/10 font-body"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-headline font-black rounded-full shadow-xl shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group overflow-hidden relative"
            >
              {isLoading ? (
                <span className="material-symbols-outlined animate-spin">sync</span>
              ) : (
                <>
                  <span className="tracking-widest uppercase">Request Access</span>
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-10 text-center text-[10px] text-white/30 uppercase tracking-widest">
            Critical infrastructure access only. <br/> Use with caution.
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 flex justify-between px-6 text-[11px] text-white/30 font-medium tracking-tight">
          <button className="hover:text-primary transition-colors">Forgotten Key?</button>
          <button className="hover:text-secondary transition-colors">Network Support</button>
        </div>
      </main>
    </div>
  );
}
