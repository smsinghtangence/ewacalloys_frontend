import { NextResponse } from 'next/server';
import { getSecuritySettings } from '@/lib/securityHeaders';

export async function middleware(request) {
  const response = NextResponse.next();
  const settings = await getSecuritySettings();

  // React's dev build uses eval() to rebuild debug callstacks, so allow it in
  // development only — production keeps the policy exactly as configured.
  const csp =
    process.env.NODE_ENV === 'production'
      ? settings.contentSecurityPolicy
      : settings.contentSecurityPolicy.replace(/script-src([^;]*)/, "script-src$1 'unsafe-eval'");

  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('Permissions-Policy', settings.permissionsPolicy);
  response.headers.set('Referrer-Policy', settings.referrerPolicy);
  response.headers.set('X-Frame-Options', settings.xFrameOptions);
  response.headers.set('X-Content-Type-Options', settings.xContentTypeOptions);
  response.headers.set('Strict-Transport-Security', settings.strictTransportSecurity);

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
