import { useState } from "react";
import AppSideBar from "./AppSideBar";
import { TopNav } from "./TopNav";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <AppSideBar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col">
        <TopNav onToggleSidebar={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
