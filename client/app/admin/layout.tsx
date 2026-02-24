"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, Users, FileText, Library } from "lucide-react";
import { cn } from "@/lib/utils";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/books", label: "Manage Books", icon: BookOpen },
  { href: "/admin/users", label: "Manage Users", icon: Users },
  { href: "/admin/loans", label: "Manage Loans", icon: FileText },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="sticky top-0 flex h-screen w-64 flex-col bg-navy text-navy-foreground">
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-4">
          <Library className="h-7 w-7 text-accent" />
          <span className="text-lg font-bold">LibraryMS</span>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {adminLinks.map((link) => {
            const isActive =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground text-sm font-semibold">
              A
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">Admin</p>
              <p className="truncate text-xs text-sidebar-foreground/70">Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-background p-6">
        {children}
      </main>
    </div>
  );
}
