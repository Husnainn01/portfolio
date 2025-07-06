import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value || '';
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin');
  const isLoginPage = request.nextUrl.pathname.includes('/admin/login');

  // Redirect to login if accessing admin page without token
  if (isAdminPage && !token && !isLoginPage) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // Redirect to admin dashboard if accessing login page with token
  if (isLoginPage && token) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
}; 