import { describe, it, expect } from 'vitest';
import {
  generateCSPAsync,
  generateCSPHeaderAsync,
  generateReportOnlyCSPAsync,
} from '../generator.js';
import { generateNonce } from '../utils.js';

describe('generateCSP', () => {
  it('should generate CSP for single service', async () => {
    const result = await generateCSPAsync(['google-analytics']);

    expect(result.includedServices).toContain('google-analytics');
    expect(result.unknownServices).toHaveLength(0);
    expect(result.header).toContain('script-src');
    expect(result.header).toContain('https://*.google-analytics.com');
  });

  it('should generate CSP for multiple services', async () => {
    const result = await generateCSPAsync(['google-analytics', 'microsoft-clarity']);

    expect(result.includedServices).toContain('google-analytics');
    expect(result.includedServices).toContain('microsoft-clarity');
    expect(result.header).toContain('https://*.google-analytics.com');
    expect(result.header).toContain('https://www.clarity.ms');
  });

  it('should handle unknown services', async () => {
    const result = await generateCSPAsync(['unknown-service']);

    expect(result.unknownServices).toContain('unknown-service');
    expect(result.warnings).toContain('Unknown services: unknown-service');
  });

  it('should work with service aliases', async () => {
    const result = await generateCSPAsync(['ga4']); // alias for google-analytics

    expect(result.includedServices).toContain('google-analytics');
    expect(result.header).toContain('https://*.google-analytics.com');
  });

  it('should include self directive by default', async () => {
    const result = await generateCSPAsync(['google-fonts']);

    expect(result.header).toContain("'self'");
  });

  it('should merge custom rules', async () => {
    const result = await generateCSPAsync({
      services: ['google-fonts'],
      customRules: {
        'script-src': ['https://custom-domain.com'],
      },
    });

    expect(result.header).toContain('https://custom-domain.com');
    expect(result.header).toContain('https://fonts.googleapis.com');
  });

  it('should generate nonce when requested', async () => {
    const result = await generateCSPAsync({
      services: ['google-analytics'],
      nonce: true,
    });

    expect(result.nonce).toBeDefined();
    expect(result.header).toContain(`'nonce-${result.nonce}'`);
  });

  it('should use provided nonce', async () => {
    const customNonce = 'custom-nonce-123';
    const result = await generateCSPAsync({
      services: ['google-analytics'],
      nonce: customNonce,
    });

    expect(result.nonce).toBe(customNonce);
    expect(result.header).toContain(`'nonce-${customNonce}'`);
  });
});

describe('generateCSPHeader', () => {
  it('should return only header string', async () => {
    const header = await generateCSPHeaderAsync(['google-analytics']);

    expect(typeof header).toBe('string');
    expect(header).toContain('script-src');
  });
});

describe('generateReportOnlyCSP', () => {
  it('should generate report-only CSP', async () => {
    const header = await generateReportOnlyCSPAsync(['google-analytics']);

    expect(typeof header).toBe('string');
    expect(header).toContain('script-src');
  });
});

describe('generateNonce', () => {
  it('should generate a nonce', () => {
    const nonce = generateNonce();

    expect(typeof nonce).toBe('string');
    expect(nonce.length).toBeGreaterThan(0);
  });

  it('should generate nonce with custom length', () => {
    const nonce = generateNonce({ length: 32 });

    expect(typeof nonce).toBe('string');
    expect(nonce.length).toBeGreaterThan(20); // Base64 encoded will be longer
  });

  it('should generate hex nonce', () => {
    const nonce = generateNonce({ encoding: 'hex' });

    expect(typeof nonce).toBe('string');
    expect(/^[0-9a-f]+$/.test(nonce)).toBe(true);
  });
});
