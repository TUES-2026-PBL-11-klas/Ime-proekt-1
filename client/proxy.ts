import { isUserAdmin } from '@/lib/authentication';
import { isAdminRoute } from '@/lib/navigation';
import { NextRequest, NextResponse } from 'next/server';



export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const method = request.method;
  const startTime = Date.now();

  // Check if user is trying to access admin route without admin privileges
  if(isAdminRoute(pathname) && !(await isUserAdmin())) {
    // Return 404 Not Found - rewrite to show not found page without changing URL
    const notFoundUrl = new URL('/404', request.url);
    return NextResponse.rewrite(notFoundUrl);
  }

  // Create response
  const response = NextResponse.next();

  // Log response time
  const endTime = Date.now();
  const duration = endTime - startTime;
  console.log(`[${method}] ${pathname}${search} - ${duration}ms`);

  return response;
}



export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
