"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  FileText,
  UserCircle,
  X,
  Library,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type User = { name?: string | null; role?: string | null } | null;

interface Props {
  open: boolean;
  onClose: () => void;
  user?: User;
}

export default function AppSideBar({ open, onClose, user }: Props) {
  const pathname = usePathname();

  const userLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/books", label: "Books", icon: BookOpen },
    { href: "/loans", label: "My Loans", icon: FileText },
    { href: "/profile", label: "Profile", icon: UserCircle },
  ];

  const adminLinks = [
    { href: "/admin", label: "Admin Dashboard", icon: LayoutDashboard },
    { href: "/admin/books", label: "Manage Books", icon: BookOpen },
    { href: "/admin/users", label: "Manage Users", icon: Users },
    { href: "/admin/loans", label: "Manage Loans", icon: FileText },
    { href: "/profile", label: "Profile", icon: UserCircle },
  ];

  const links = user?.role === "admin" ? adminLinks : userLinks;
  const displayName = user?.name ?? "Unknown User";
  const roleLabel = user?.role === "admin" ? "Administrator" : "Member";
  const initial = (displayName && displayName[0] ? displayName[0] : "U").toUpperCase();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-foreground/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-64 flex-col bg-navy transition-transform duration-300 lg:sticky lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          <div className="flex items-center gap-2">
            <Library className="h-7 w-7 text-accent" />
            <span className="text-lg font-bold text-navy-foreground">
              LibraryMS
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-navy-foreground lg:hidden"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              pathname.startsWith(link.href + "/");

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
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
              {initial}
            </div>

            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-navy-foreground">
                {displayName}
              </p>

              <p className="truncate text-xs text-sidebar-foreground/70">
                {roleLabel}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
