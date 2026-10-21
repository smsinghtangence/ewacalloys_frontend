import { NextRequest, NextResponse } from 'next/server';
import { getSecuritySettings } from '@/lib/securityHeaders';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const settings = await getSecuritySettings();
  const contentSecurityPolicy =
    settings.contentSecurityPolicy &&
    process.env.NODE_ENV === 'development' &&
    !settings.contentSecurityPolicy.includes("'unsafe-eval'")
      ? settings.contentSecurityPolicy.replace("script-src ", "script-src 'unsafe-eval' ")
      : settings.contentSecurityPolicy;

  const headers: Record<string, string | null | undefined> = {
    'Content-Security-Policy': contentSecurityPolicy,
    'Permissions-Policy': settings.permissionsPolicy,
    'Referrer-Policy': settings.referrerPolicy,
    'X-Frame-Options': settings.xFrameOptions,
    'X-Content-Type-Options': settings.xContentTypeOptions,
    'Strict-Transport-Security': settings.strictTransportSecurity,
  };

  // Only send headers the backend actually configured.
  for (const [name, value] of Object.entries(headers)) {
    if (value) {
      response.headers.set(name, value);
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
