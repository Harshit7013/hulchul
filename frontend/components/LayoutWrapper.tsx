"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Sidebar />
      <main className="flex-1 flex flex-col relative overflow-hidden h-screen z-10 w-full">
        <Header />
        {children}
      </main>
    </>
  );
}
