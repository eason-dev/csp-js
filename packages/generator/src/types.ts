import type { CSPDirectives, CSPService } from '@csp-kit/data';

/**
 * CSP generation options (legacy API)
 */
export interface CSPOptions {
  /** List of services to include */
  services: string[];

  /** Generate a nonce for inline scripts */
  nonce?: boolean | string;

  /** Custom CSP rules to merge */
  customRules?: CSPDirectives;

  /** Generate report-only policy instead of enforcing */
  reportOnly?: boolean;

  /** Report URI for CSP violations */
  reportUri?: string;

  /** Include 'self' directive by default */
  includeSelf?: boolean;

  /** Include 'unsafe-inline' (not recommended) */
  unsafeInline?: boolean;

  /** Include 'unsafe-eval' (not recommended) */
  unsafeEval?: boolean;
}

/**
 * CSP generation options (new API)
 */
export interface CSPOptionsV2 {
  /** List of services to include */
  services: CSPService[];

  /** Generate a nonce for inline scripts */
  nonce?: boolean | string;

  /** Additional CSP rules to merge */
  additionalRules?: CSPDirectives;

  /** Report URI for CSP violations */
  reportUri?: string;

  /** Include 'self' directive by default */
  includeSelf?: boolean;

  /** Include 'unsafe-inline' (not recommended) */
  unsafeInline?: boolean;

  /** Include 'unsafe-eval' (not recommended) */
  unsafeEval?: boolean;

  /** Development-specific options */
  development?: Partial<Omit<CSPOptionsV2, 'services' | 'development' | 'production'>>;

  /** Production-specific options */
  production?: Partial<Omit<CSPOptionsV2, 'services' | 'development' | 'production'>>;
}

/**
 * CSP generation result
 */
export interface CSPResult {
  /** Complete CSP header string */
  header: string;

  /** CSP directives as object */
  directives: CSPDirectives;

  /** Report-only header version */
  reportOnlyHeader: string;

  /** Services that were successfully included */
  includedServices: string[];

  /** Services that were not found */
  unknownServices: string[];

  /** Warnings about the generated policy */
  warnings: string[];

  /** Generated nonce (if requested) */
  nonce?: string;
}

/**
 * Nonce generation options
 */
export interface NonceOptions {
  /** Length of the nonce in bytes (default: 16) */
  length?: number;

  /** Encoding format (default: 'base64') */
  encoding?: 'base64' | 'hex';
}
