import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;
  const locale = getLocaleFromPath(pathname);

  // ✅ Handle /admin redirect *before* next-intl
  if (pathname === `/${locale}/admin` || pathname === `/${locale}/admin/`) {
    if (!token) {
      const loginUrl = new URL(`/${locale}/admin/login`, request.url);
      return NextResponse.redirect(loginUrl);
    } else {
      const dashboardUrl = new URL(`/${locale}/admin/dashboard`, request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  // ✅ Handle /admin without locale (e.g., /admin)
  if (pathname === '/admin' || pathname === '/admin/') {
    if (!token) {
      const loginUrl = new URL(`/en/admin/login`, request.url);
      return NextResponse.redirect(loginUrl);
    } else {
      const dashboardUrl = new URL(`/en/admin/dashboard`, request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  // 🌀 Now run next-intl middleware
  const intlResponse = intlMiddleware(request);
  if (intlResponse) return intlResponse;

  // ✅ Continue normal admin protection
  return await handleAuthMiddleware(request);
}

async function handleAuthMiddleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;
  const locale = getLocaleFromPath(pathname);

  if (pathname.includes('/admin') && !pathname.includes('/admin/login')) {
    if (!token) {
      const loginUrl = new URL(`/${locale}/admin/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const decoded = verifyToken(token);

      if (pathname.includes('/admin/dashboard') && decoded.role !== 'admin') {
        const unauthorizedUrl = new URL(`/${locale}/admin/unauthorized`, request.url);
        return NextResponse.redirect(unauthorizedUrl);
      }

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', decoded.userId);
      requestHeaders.set('x-user-email', decoded.email);
      requestHeaders.set('x-user-role', decoded.role);

      return NextResponse.next({
        request: { headers: requestHeaders },
      });
    } catch (error) {
      const loginUrl = new URL(`/${locale}/admin/login`, request.url);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.set('token', '', { maxAge: 0 });
      console.error(error);
      return response;
    }
  }

  return NextResponse.next();
}

function getLocaleFromPath(pathname: string): string {
  const segments = pathname.split('/');
  return segments[1] || 'en';
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
