import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple JWT payload decoder for Edge runtime
function decodeJWTPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payload = parts[1];
    if (!payload) return null;

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "="
    );
    const decoded = atob(padded);
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

// Routes that require authentication
const protectedRoutes = ["/my-loans", "/profile", "/admin"];
// Routes only accessible when NOT logged in
const authRoutes = ["/login", "/register"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth-token")?.value;

  const payload = token ? decodeJWTPayload(token) : null;
  const isAuthenticated = !!payload;
  const isAdmin = payload?.role === "admin";

  // Redirect authenticated users away from login/register
  if (isAuthenticated && authRoutes.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL("/books", request.url));
  }

  // Redirect unauthenticated users to login for protected routes
  if (
    !isAuthenticated &&
    protectedRoutes.some((r) => pathname.startsWith(r))
  ) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect non-admin users away from admin routes
  if (pathname.startsWith("/admin") && !isAdmin) {
    return NextResponse.redirect(new URL("/books", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/my-loans/:path*", "/profile/:path*", "/login", "/register"],
};
