import { NextRequest, NextResponse } from 'next/server';



export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const method = request.method;
  const startTime = Date.now();

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
