import { NextRequest, NextResponse } from 'next/server';
import { generateCSP } from '@csp-kit/generator';
import { GoogleAnalytics } from '@csp-kit/data';

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  // Generate CSP using csp-kit with Google Analytics
  const cspResult = generateCSP({
    services: [GoogleAnalytics],
    nonce,
    development: {
      // In development, we might need unsafe-eval for hot reloading
      unsafeEval: process.env.NODE_ENV !== 'production',
    },
    // Include 'self' directive for Next.js assets
    includeSelf: true,
  });

  // Get the generated CSP header value
  const contentSecurityPolicyHeaderValue = cspResult.header;

  // Set up request headers with nonce
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  // Create response with modified request headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Set CSP header on response
  response.headers.set(
    process.env.NODE_ENV === 'production'
      ? 'Content-Security-Policy'
      : 'Content-Security-Policy-Report-Only',
    contentSecurityPolicyHeaderValue
  );

  return response;
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
  ],
};
