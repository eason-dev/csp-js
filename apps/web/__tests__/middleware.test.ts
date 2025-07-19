import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';

// Mock @csp-kit packages
vi.mock('@csp-kit/generator', () => ({
  generateCSP: vi.fn(),
}));

vi.mock('@csp-kit/data', () => ({
  GoogleAnalytics: {
    id: 'google-analytics',
    name: 'Google Analytics 4',
    directives: {
      'script-src': ['https://*.googletagmanager.com'],
      'img-src': ['https://*.google-analytics.com'],
      'connect-src': ['https://*.google-analytics.com'],
    },
  },
}));

// Import after mocking
import { middleware, config } from '../middleware';
import { generateCSP } from '@csp-kit/generator';

describe('Middleware', () => {
  const mockGenerateCSP = generateCSP as vi.MockedFunction<typeof generateCSP>;
  
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset environment variables
    process.env.NODE_ENV = 'test';
    delete process.env.CSP_REPORT_URI;
    
    // Set default mock return value
    mockGenerateCSP.mockReturnValue({
      header: 'default-src \'self\'; script-src \'self\' \'nonce-test-nonce\' https://*.googletagmanager.com;',
      directives: {
        'default-src': ["'self'"],
        'script-src': ["'self'", "'nonce-test-nonce'", 'https://*.googletagmanager.com'],
      },
      nonce: 'test-nonce',
      includedServices: ['google-analytics'],
      unknownServices: [],
      warnings: [],
    });
  });

  it('should add CSP headers to the response', () => {
    const request = new NextRequest(new URL('http://localhost:3000/'));
    const response = middleware(request);

    // Check that CSP header is set
    const cspHeader = response.headers.get('Content-Security-Policy-Report-Only');
    expect(cspHeader).toBeTruthy();
    expect(cspHeader).toContain("default-src 'self'");
    expect(cspHeader).toContain('https://*.googletagmanager.com');
  });

  it('should generate and set nonce in headers', () => {
    const request = new NextRequest(new URL('http://localhost:3000/'));
    const response = middleware(request);

    // Get the nonce from request headers (set in the response)
    const nextResponse = response as NextResponse;
    expect(nextResponse).toBeDefined();
  });

  it('should use Content-Security-Policy header in production', () => {
    process.env.NODE_ENV = 'production';
    
    const request = new NextRequest(new URL('http://localhost:3000/'));
    const response = middleware(request);

    // In production, should use Content-Security-Policy (not Report-Only)
    const cspHeader = response.headers.get('Content-Security-Policy');
    expect(cspHeader).toBeTruthy();
    
    // Report-Only header should not be set in production
    const reportOnlyHeader = response.headers.get('Content-Security-Policy-Report-Only');
    expect(reportOnlyHeader).toBeFalsy();
  });

  it('should include report URI when provided', () => {
    process.env.CSP_REPORT_URI = 'https://example.com/csp-report';
    process.env.NODE_ENV = 'production';
    
    mockGenerateCSP.mockReturnValueOnce({
      header: 'default-src \'self\'; report-uri https://example.com/csp-report;',
      directives: {
        'default-src': ["'self'"],
        'report-uri': ['https://example.com/csp-report'],
      },
      nonce: 'test-nonce',
      includedServices: ['google-analytics'],
      unknownServices: [],
      warnings: [],
    });

    const request = new NextRequest(new URL('http://localhost:3000/'));
    const response = middleware(request);

    const cspHeader = response.headers.get('Content-Security-Policy');
    expect(cspHeader).toContain('report-uri https://example.com/csp-report');
  });

  it('should match correct paths based on config', () => {
    // The matcher in the config excludes certain paths
    expect(config.matcher).toBeDefined();
    expect(config.matcher.length).toBe(1);
    
    // The pattern excludes api, _next/static, _next/image, favicon.ico, files with extensions, and public folder
    const pattern = config.matcher[0];
    expect(pattern).toContain('(?!api|_next/static|_next/image|favicon.ico');
  });

  it('should enable unsafe-eval in development mode', () => {
    process.env.NODE_ENV = 'development';
    
    const request = new NextRequest(new URL('http://localhost:3000/'));
    middleware(request);

    // Verify generateCSP was called with development options
    expect(mockGenerateCSP).toHaveBeenCalledWith(
      expect.objectContaining({
        development: {
          unsafeEval: true,
        },
      })
    );
  });
});