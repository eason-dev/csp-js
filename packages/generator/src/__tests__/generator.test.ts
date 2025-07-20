import { describe, it, expect } from 'vitest';
import { generateCSP, generateCSPHeader, generateReportOnlyCSP, defineService } from '../index.js';
import { ServiceCategory } from '@csp-kit/data';

// Import some real services for testing
import { GoogleAnalytics, Stripe, GoogleFonts } from '@csp-kit/data';

describe('generateCSP v2 API', () => {
  // Define a test service
  const TestService = defineService({
    id: 'test-service',
    name: 'Test Service',
    category: ServiceCategory.OTHER,
    description: 'A test service',
    website: 'https://test.com',
    officialDocs: ['https://test.com/docs'],
    directives: {
      'script-src': ['https://test.com'],
      'img-src': ['https://test.com/images'],
    },
    lastUpdated: '2024-01-01T00:00:00Z',
  });

  describe('Array input', () => {
    it('should generate CSP for single service', () => {
      const result = generateCSP([GoogleAnalytics]);

      expect(result.includedServices).toContain('google-analytics');
      expect(result.unknownServices).toHaveLength(0);
      expect(result.header).toContain('script-src');
      expect(result.header).toContain('https://www.googletagmanager.com');
    });

    it('should generate CSP for multiple services', () => {
      const result = generateCSP([GoogleAnalytics, Stripe]);

      expect(result.includedServices).toContain('google-analytics');
      expect(result.includedServices).toContain('stripe');
      expect(result.header).toContain('https://www.googletagmanager.com');
      expect(result.header).toContain('https://js.stripe.com');
    });

    it('should not include self directive by default', () => {
      const result = generateCSP([GoogleFonts]);

      expect(result.header).not.toContain("'self'");
    });
  });

  describe('Options input', () => {
    it('should merge additional rules', () => {
      const result = generateCSP({
        services: [GoogleAnalytics],
        additionalRules: {
          'img-src': ['https://custom-domain.com'],
        },
      });

      expect(result.header).toContain('https://custom-domain.com');
      expect(result.header).toContain('https://*.google-analytics.com'); // GA4 img-src
    });

    it('should generate nonce when requested', () => {
      const result = generateCSP({
        services: [TestService],
        nonce: true,
      });

      expect(result.nonce).toBeDefined();
      expect(result.header).toMatch(/'nonce-[\w+/=]+'/);
    });

    it('should use provided nonce', () => {
      const customNonce = 'test-nonce-123';
      const result = generateCSP({
        services: [TestService],
        nonce: customNonce,
      });

      expect(result.nonce).toBe(customNonce);
      expect(result.header).toContain(`'nonce-${customNonce}'`);
    });

    it('should add report URI when specified', () => {
      const result = generateCSP({
        services: [TestService],
        reportUri: '/csp-report',
      });

      expect(result.header).toContain('report-uri /csp-report');
    });

    it('should handle unsafe directives with warnings', () => {
      const result = generateCSP({
        services: [TestService],
        includeUnsafeInline: true,
        includeUnsafeEval: true,
      });

      expect(result.header).toContain("'unsafe-inline'");
      expect(result.header).toContain("'unsafe-eval'");
      expect(result.warnings).toContain(
        "Using 'unsafe-inline' significantly reduces CSP security. Consider using nonces or hashes instead."
      );
      expect(result.warnings).toContain(
        "Using 'unsafe-eval' reduces security. Avoid eval() and similar constructs."
      );
    });

    it('should include self directive when explicitly requested', () => {
      const result = generateCSP({
        services: [TestService],
        includeSelf: true,
      });

      expect(result.header).toContain("'self'");
    });

    it('should not include self directive by default', () => {
      const result = generateCSP({
        services: [TestService],
      });

      expect(result.header).not.toContain("'self'");
    });
  });

  describe('Custom services', () => {
    it('should work with custom defined services', () => {
      const MyCustomService = defineService({
        directives: {
          'connect-src': ['https://api.myapp.com', 'wss://realtime.myapp.com'],
        },
      });

      const result = generateCSP([GoogleAnalytics, MyCustomService]);

      expect(result.includedServices).toHaveLength(2);
      expect(result.header).toContain('https://api.myapp.com');
      expect(result.header).toContain('wss://realtime.myapp.com');
    });

    it('should handle services with validation', () => {
      const ServiceWithValidation = defineService({
        directives: {
          'script-src': ['https://validated.com'],
        },
      });

      const result = generateCSP([ServiceWithValidation]);

      expect(result.includedServices).toHaveLength(1);
      expect(result.header).toContain('https://validated.com');
    });

    it('should handle deprecated services', () => {
      const DeprecatedService = defineService({
        directives: {
          'script-src': ['https://deprecated.com'],
        },
      });

      const result = generateCSP([DeprecatedService]);

      expect(result.includedServices).toHaveLength(1);
      expect(result.header).toContain('https://deprecated.com');
    });

    it('should handle service conflicts', () => {
      const ServiceA = defineService({
        directives: {
          'script-src': ['https://a.com'],
        },
      });

      const ServiceB = defineService({
        directives: {
          'script-src': ['https://b.com'],
        },
      });

      const result = generateCSP([ServiceA, ServiceB]);

      expect(result.includedServices).toHaveLength(2);
      expect(result.header).toContain('https://a.com');
      expect(result.header).toContain('https://b.com');
    });
  });

  describe('Environment-specific options', () => {
    it('should apply development options in development', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      const result = generateCSP({
        services: [TestService],
        development: {
          includeUnsafeEval: true,
          includeUnsafeInline: true,
        },
        production: {
          reportUri: '/csp-report',
        },
      });

      expect(result.header).toContain("'unsafe-eval'");
      expect(result.header).toContain("'unsafe-inline'");
      expect(result.header).not.toContain('report-uri');

      process.env.NODE_ENV = originalEnv;
    });

    it('should apply production options in production', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      const result = generateCSP({
        services: [TestService],
        development: {
          includeUnsafeEval: true,
          includeUnsafeInline: true,
        },
        production: {
          reportUri: '/csp-report',
        },
      });

      expect(result.header).not.toContain("'unsafe-eval'");
      expect(result.header).not.toContain("'unsafe-inline'");
      expect(result.header).toContain('report-uri /csp-report');

      process.env.NODE_ENV = originalEnv;
    });
  });

  describe('Helper functions', () => {
    it('generateCSPHeader should return header string directly', () => {
      const header = generateCSPHeader([GoogleAnalytics]);

      expect(typeof header).toBe('string');
      expect(header).toContain('script-src');
      expect(header).toContain('https://www.googletagmanager.com');
    });

    it('generateReportOnlyCSP should return report-only result', () => {
      const result = generateReportOnlyCSP([GoogleAnalytics]);

      expect(result.header).toBe(result.reportOnlyHeader);
    });
  });
});
