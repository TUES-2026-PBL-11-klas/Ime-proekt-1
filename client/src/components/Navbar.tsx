"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Library, BookOpen, FileText, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUserInfo, type UserInfo } from "@/actions/auth/getUserInfo";
import { logout } from "@/actions/auth/logout";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<UserInfo>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getUserInfo().then((info) => {
      setUser(info);
      setLoaded(true);
    });
  }, []);

  const navLinks = [
    { href: "/books", label: "Catalog", icon: BookOpen },
    { href: "/my-loans", label: "My Loans", icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-30 border-b bg-background">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Library className="h-6 w-6 text-accent" />
            <span className="text-lg font-bold">LibraryMS</span>
          </Link>

          {loaded && user && (
            <nav className="flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    pathname.startsWith(link.href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{link.label}</span>
                </Link>
              ))}
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    pathname.startsWith("/admin")
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">Admin</span>
                </Link>
              )}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-2">
          {loaded && user ? (
            <form action={logout}>
              <Button type="submit" variant="ghost" size="sm" className="gap-2">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </form>
          ) : loaded ? (
            <div className="flex gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Register</Button>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
