import { describe, it, expect, beforeEach } from 'vitest';
import {
  generateCSP,
  generateCSPHeader,
  generateReportOnlyCSP,
  defineService,
  type CSPService,
} from '../index.js';
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

    it('should include self directive by default', () => {
      const result = generateCSP([GoogleFonts]);

      expect(result.header).toContain("'self'");
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
        unsafeInline: true,
        unsafeEval: true,
      });

      expect(result.header).toContain("'unsafe-inline'");
      expect(result.header).toContain("'unsafe-eval'");
      expect(result.warnings).toContain("Using 'unsafe-inline' is not recommended for production");
      expect(result.warnings).toContain("Using 'unsafe-eval' is not recommended for production");
    });

    it('should exclude self directive when requested', () => {
      const result = generateCSP({
        services: [TestService],
        includeSelf: false,
      });

      expect(result.header).not.toContain("'self'");
    });
  });

  describe('Custom services', () => {
    it('should work with custom defined services', () => {
      const MyCustomService = defineService({
        id: 'my-api',
        name: 'My API',
        category: 'api',
        description: 'My custom API',
        website: 'https://api.myapp.com',
        officialDocs: [],
        directives: {
          'connect-src': ['https://api.myapp.com', 'wss://realtime.myapp.com'],
        },
        lastUpdated: '2024-01-01T00:00:00Z',
      });

      const result = generateCSP([GoogleAnalytics, MyCustomService]);

      expect(result.includedServices).toContain('my-api');
      expect(result.header).toContain('https://api.myapp.com');
      expect(result.header).toContain('wss://realtime.myapp.com');
    });

    it('should handle services with validation', () => {
      const ServiceWithValidation = defineService({
        id: 'validated-service',
        name: 'Validated Service',
        category: ServiceCategory.OTHER,
        description: 'Service with validation',
        website: 'https://validated.com',
        officialDocs: [],
        directives: {
          'script-src': ['https://validated.com'],
        },
        validate: (directives) => ({
          warnings: ['This is a validation warning'],
        }),
        lastUpdated: '2024-01-01T00:00:00Z',
      });

      const result = generateCSP([ServiceWithValidation]);

      expect(result.warnings).toContain('[validated-service] This is a validation warning');
    });

    it('should handle deprecated services', () => {
      const DeprecatedService = defineService({
        id: 'deprecated-service',
        name: 'Deprecated Service',
        category: ServiceCategory.OTHER,
        description: 'A deprecated service',
        website: 'https://deprecated.com',
        officialDocs: [],
        directives: {
          'script-src': ['https://deprecated.com'],
        },
        deprecated: {
          since: '2024-01-01',
          alternative: 'new-service',
          message: 'This service is no longer maintained.',
        },
        lastUpdated: '2024-01-01T00:00:00Z',
      });

      const result = generateCSP([DeprecatedService]);

      expect(result.warnings.some(w => w.includes('deprecated'))).toBe(true);
      expect(result.warnings.some(w => w.includes('new-service'))).toBe(true);
    });

    it('should handle service conflicts', () => {
      const ServiceA = defineService({
        id: 'service-a',
        name: 'Service A',
        category: ServiceCategory.OTHER,
        description: 'Service A',
        website: 'https://a.com',
        officialDocs: [],
        directives: {
          'script-src': ['https://a.com'],
        },
        lastUpdated: '2024-01-01T00:00:00Z',
      });

      const ServiceB = defineService({
        id: 'service-b',
        name: 'Service B',
        category: ServiceCategory.OTHER,
        description: 'Service B that conflicts with A',
        website: 'https://b.com',
        officialDocs: [],
        directives: {
          'script-src': ['https://b.com'],
        },
        conflicts: ['service-a'],
        lastUpdated: '2024-01-01T00:00:00Z',
      });

      const result = generateCSP([ServiceA, ServiceB]);

      expect(result.warnings.some(w => w.includes('conflicts'))).toBe(true);
    });
  });

  describe('Environment-specific options', () => {
    it('should apply development options in development', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      const result = generateCSP({
        services: [TestService],
        development: {
          unsafeEval: true,
          unsafeInline: true,
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
          unsafeEval: true,
          unsafeInline: true,
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