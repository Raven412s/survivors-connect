import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // First, handle internationalization
  const intlResponse = intlMiddleware(request);
  if (intlResponse) return intlResponse;

  // Then handle authentication for admin routes
  return await handleAuthMiddleware(request);
}

async function handleAuthMiddleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Protected admin routes (works for all locales)
  if (pathname.includes('/admin') && !pathname.includes('/admin/login')) {
    if (!token) {
      // Redirect to login page while preserving locale
      const locale = getLocaleFromPath(pathname);
      const loginUrl = new URL(`/${locale}/admin/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const decoded = verifyToken(token);
      
      // Check if user has admin role for admin dashboard routes
      if (pathname.includes('/admin/dashboard') && decoded.role !== 'admin') {
        const locale = getLocaleFromPath(pathname);
        const unauthorizedUrl = new URL(`/${locale}/admin/unauthorized`, request.url);
        return NextResponse.redirect(unauthorizedUrl);
      }

      // Add user info to headers for use in server components
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', decoded.userId);
      requestHeaders.set('x-user-email', decoded.email);
      requestHeaders.set('x-user-role', decoded.role);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      // Invalid token, redirect to login
      const locale = getLocaleFromPath(pathname);
      const loginUrl = new URL(`/${locale}/admin/login`, request.url);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.set('token', '', { maxAge: 0 });
      return response;
    }
  }

  return NextResponse.next();
}

// Helper function to extract locale from pathname
function getLocaleFromPath(pathname: string): string {
  const segments = pathname.split('/');
  // Assuming the locale is the first segment after the domain
  // e.g., /en/admin/dashboard or /hi/admin/dashboard
  return segments[1] || 'en'; // default to 'en' if no locale found
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};