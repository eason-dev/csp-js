import { CSPDirectives } from '@csp-kit/data';
import { NonceOptions } from './types.js';

/**
 * Generate a cryptographically secure nonce
 */
export function generateNonce(options: NonceOptions = {}): string {
  const { length = 16, encoding = 'base64' } = options;

  // Try to use different crypto APIs based on environment
  if (typeof globalThis !== 'undefined' && globalThis.crypto?.getRandomValues) {
    // Browser or modern runtime environment
    const bytes = new Uint8Array(length);
    globalThis.crypto.getRandomValues(bytes);

    if (encoding === 'hex') {
      return Array.from(bytes)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    }

    // Base64 encoding
    const binary = String.fromCharCode(...bytes);
    return btoa(binary);
  }

  // Try Node.js crypto (check if in Node.js environment)
  if (typeof process !== 'undefined' && process.versions?.node) {
    try {
      // Import crypto dynamically only in Node.js
      const crypto = getNodeCrypto();
      if (crypto) {
        const bytes = crypto.randomBytes(length);
        return encoding === 'hex' ? bytes.toString('hex') : bytes.toString('base64');
      }
    } catch {
      // Continue to fallback
    }
  }

  // Fallback for environments without crypto
  console.warn('No secure random number generator available. Using fallback.');
  return generateInsecureNonce(length, encoding);
}

/**
 * Get Node.js crypto module if available
 */
function getNodeCrypto(): {
  randomBytes: (size: number) => { toString: (encoding: string) => string };
} | null {
  try {
    // This will be replaced by bundlers with undefined in browser environments
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('crypto');
  } catch {
    return null;
  }
}

/**
 * Fallback nonce generation (not cryptographically secure)
 */
function generateInsecureNonce(length: number, encoding: 'base64' | 'hex'): string {
  const chars =
    encoding === 'hex'
      ? '0123456789abcdef'
      : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

  let result = '';
  for (let i = 0; i < length * 2; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

/**
 * Merge multiple CSP directives objects
 */
export function mergeCSPDirectives(...directives: CSPDirectives[]): CSPDirectives {
  const merged: CSPDirectives = {};

  for (const directive of directives) {
    for (const [key, values] of Object.entries(directive)) {
      if (!values || values.length === 0) continue;

      const directiveKey = key as keyof CSPDirectives;
      if (!merged[directiveKey]) {
        merged[directiveKey] = [];
      }

      // Merge arrays and remove duplicates
      const existing = merged[directiveKey] || [];
      const combined = [...existing, ...values];
      merged[directiveKey] = [...new Set(combined)];
    }
  }

  return merged;
}

/**
 * Add nonce to script-src and style-src directives
 */
export function addNonceToDirectives(directives: CSPDirectives, nonce: string): CSPDirectives {
  const result = { ...directives };

  // Add nonce to script-src if it exists
  if (result['script-src']) {
    result['script-src'] = [...result['script-src'], `'nonce-${nonce}'`];
  }

  // Add nonce to style-src if it exists
  if (result['style-src']) {
    result['style-src'] = [...result['style-src'], `'nonce-${nonce}'`];
  }

  return result;
}

/**
 * Convert CSP directives object to header string
 */
export function directivesToHeader(directives: CSPDirectives): string {
  const parts: string[] = [];

  // Define the order of directives for consistent output
  const directiveOrder: Array<keyof CSPDirectives> = [
    'script-src',
    'style-src',
    'img-src',
    'connect-src',
    'font-src',
    'object-src',
    'media-src',
    'frame-src',
    'child-src',
    'worker-src',
    'manifest-src',
    'form-action',
    'report-uri',
    'report-to',
  ];

  for (const directive of directiveOrder) {
    const values = directives[directive];
    if (values && values.length > 0) {
      const directiveName = directive.replace(/([A-Z])/g, '-$1').toLowerCase();
      parts.push(`${directiveName} ${values.join(' ')}`);
    }
  }

  return parts.join('; ');
}

/**
 * Add default 'self' directive to common CSP directives
 */
export function addSelfDirective(directives: CSPDirectives): CSPDirectives {
  const result = { ...directives };

  const selfDirectives: Array<keyof CSPDirectives> = [
    'script-src',
    'style-src',
    'img-src',
    'connect-src',
    'font-src',
  ];

  for (const directive of selfDirectives) {
    if (result[directive]) {
      // Add 'self' at the beginning if not already present
      if (!result[directive]!.includes("'self'")) {
        result[directive] = ["'self'", ...result[directive]!];
      }
    }
  }

  return result;
}

/**
 * Validate CSP directives for common issues
 */
export function validateDirectives(directives: CSPDirectives): string[] {
  const warnings: string[] = [];

  // Check for unsafe directives
  for (const [directive, values] of Object.entries(directives)) {
    if (!values) continue;

    if (values.includes("'unsafe-inline'")) {
      warnings.push(`${directive} contains 'unsafe-inline' which reduces security`);
    }

    if (values.includes("'unsafe-eval'")) {
      warnings.push(`${directive} contains 'unsafe-eval' which reduces security`);
    }

    // Check for wildcards
    if (values.some((v: string) => v.includes('*'))) {
      warnings.push(`${directive} contains wildcards which may be overly permissive`);
    }
  }

  // Check for missing important directives
  if (!directives['script-src']) {
    warnings.push('No script-src directive specified');
  }

  if (!directives['style-src']) {
    warnings.push('No style-src directive specified');
  }

  return warnings;
}
