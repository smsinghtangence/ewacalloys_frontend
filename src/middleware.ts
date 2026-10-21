import { NextRequest, NextResponse } from 'next/server';
import { getSecuritySettings } from '@/lib/securityHeaders';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const settings = await getSecuritySettings();
  const contentSecurityPolicy =
    process.env.NODE_ENV === 'development' && !settings.contentSecurityPolicy.includes("'unsafe-eval'")
      ? settings.contentSecurityPolicy.replace("script-src ", "script-src 'unsafe-eval' ")
      : settings.contentSecurityPolicy;

  response.headers.set('Content-Security-Policy', contentSecurityPolicy);
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
