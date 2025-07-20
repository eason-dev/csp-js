import type { CSPDirectives, CSPService } from '@csp-kit/data';

/**
 * CSP generation options
 */
export interface CSPOptions {
  /** List of services to include */
  services: CSPService[];

  /** Generate a nonce for inline scripts */
  nonce?: boolean | string;

  /** Additional CSP rules to merge */
  additionalRules?: CSPDirectives;

  /** Report URI for CSP violations */
  reportUri?: string;

  /**
   * Include 'self' directive for common directives
   * @default false
   */
  includeSelf?: boolean;

  /**
   * Include 'unsafe-inline' for script-src and style-src
   * WARNING: This significantly reduces security. Only use when absolutely necessary.
   * @default false
   */
  includeUnsafeInline?: boolean;

  /**
   * Include 'unsafe-eval' for script-src
   * WARNING: This reduces security. Avoid unless required for legacy code.
   * @default false
   */
  includeUnsafeEval?: boolean;

  /** Development-specific options */
  development?: Partial<Omit<CSPOptions, 'services' | 'development' | 'production'>>;

  /** Production-specific options */
  production?: Partial<Omit<CSPOptions, 'services' | 'development' | 'production'>>;
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
