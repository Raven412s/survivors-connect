import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

// Create the next-intl middleware handler
const intlMiddleware = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;
  const locale = getLocaleFromPath(pathname);

  // Redirect /{locale}/admin to login or dashboard
  if (pathname === `/${locale}/admin` || pathname === `/${locale}/admin/`) {
    if (!token) {
      return NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
    } else {
      return NextResponse.redirect(new URL(`/${locale}/admin/dashboard`, request.url));
    }
  }
  // Redirect /admin without locale (e.g. '/admin') to '/en/admin/...'
  if (pathname === '/admin' || pathname === '/admin/') {
    if (!token) {
      return NextResponse.redirect(new URL(`/en/admin/login`, request.url));
    } else {
      return NextResponse.redirect(new URL(`/en/admin/dashboard`, request.url));
    }
  }

  // Run next-intl middleware (handles locale negotiation)
  const intlResponse = intlMiddleware(request);
  if (intlResponse) {
    return intlResponse;
  }

  // Admin authentication checks (same as before)
  if (pathname.includes('/admin') && !pathname.includes('/admin/login')) {
    if (!token) {
      return NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
    }
    try {
      const decoded = verifyToken(token);
      if (pathname.includes('/admin/dashboard') && decoded.role !== 'admin') {
        return NextResponse.redirect(new URL(`/${locale}/admin/unauthorized`, request.url));
      }
      // Attach user info to headers for API routes etc.
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', decoded.userId);
      requestHeaders.set('x-user-email', decoded.email);
      requestHeaders.set('x-user-role', decoded.role);
      return NextResponse.next({ request: { headers: requestHeaders } });
    } catch (error) {
      // If token is invalid, clear it and redirect to login
      const response = NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
      response.cookies.set('token', '', { maxAge: 0 });
      console.error('Token verification failed:', error);
      return response;
    }
  }

  // Fallback: continue with the request
  return NextResponse.next();
}

function getLocaleFromPath(pathname: string): string {
  const segments = pathname.split('/');
  return segments[1] || 'en';
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
