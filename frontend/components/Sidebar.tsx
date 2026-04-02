"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { id: "/simulations", label: "Simulations", icon: "science" },
  { id: "/dashboard",   label: "Dashboard",   icon: "dashboard" },
  { id: "/agents",      label: "Agents",      icon: "groups" },
  { id: "/reports",     label: "Reports",     icon: "assessment" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [loginId, setLoginId] = useState("NEON_ADMIN_X");

  useEffect(() => {
    const saved = localStorage.getItem('NEON_LOGIN_ID');
    if (saved) setLoginId(saved);
  }, []);

  return (
    <aside className="h-screen w-64 rounded-r-[3rem] sticky left-0 top-0 bg-[#131313]/80 backdrop-blur-2xl flex flex-col py-8 px-6 shadow-[40px_0_80px_rgba(241,131,255,0.05)] z-50">
      <div className="mb-12">
        <h1 className="text-xl font-bold bg-gradient-to-r from-[#f183ff] to-[#ec6aff] bg-clip-text text-transparent font-headline">Neon Lab</h1>
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mt-1">Simulation active</p>
      </div>

      <nav className="flex-1 space-y-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.id || (item.id !== "/" && pathname.startsWith(item.id));
          return (
            <Link
              key={item.id}
              href={item.id}
              className={isActive 
                ? "flex items-center gap-4 px-5 py-4 text-[#f183ff] bg-[#262626]/60 backdrop-blur-md rounded-full shadow-[0_0_15px_rgba(241,131,255,0.3)] transition-all scale-95 active:scale-90"
                : "flex items-center gap-4 px-5 py-4 text-white/60 hover:text-white transition-colors group"
              }
            >
              <span className={`material-symbols-outlined ${!isActive ? "transition-transform group-hover:scale-110" : ""}`}>
                {item.icon}
              </span>
              <span className="font-headline font-semibold text-sm tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <button className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-headline font-bold rounded-full shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity active:scale-95">
          New Sim
        </button>

        <div className="mt-8 flex items-center gap-3 px-2">
          <div className="h-10 w-10 rounded-full overflow-hidden border border-white/10">
            <img 
              alt="User profile avatar" 
              className="h-full w-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0qMgTW5jcrJjLnHRCa6esUlYZbnaeBBAbEYzls80Zm1UKM2BWYJKP7_X_ghB2KVjXeH4sFiJ7vE2BzxlRxp6TPKgEuJgT_sc_ChLwbYB9rB09eA_0kr1SucO_6pBD43Bgbu48lVqsFs53puyNAnvIiPdrlCrkdXeeWI0MfAHMDDW8Ajz-uH-pNk3oZdC3zU2b3dpNuFW07Q_63Yk9aWK187KY28oexarjbVo8rmZPbC8QZ6-Mh5HBdND6y0gGR6yJP2ibQyhFdZk"
            />
          </div>
          <div className="flex flex-col text-white min-w-0">
            <span className="text-sm font-bold leading-none truncate">Admin</span>
            <span className="text-[10px] text-white/40 uppercase mt-1">Pro Access</span>
            <span className="text-[9px] font-mono text-primary/60 mt-0.5 tracking-tighter">ID: {loginId}</span>
          </div>
          <button className="ml-auto material-symbols-outlined text-white/20 hover:text-white/60 transition-colors text-lg">logout</button>
        </div>
      </div>
    </aside>
  );
}
