/**
 * Categories for different types of services
 */
export enum ServiceCategory {
  ANALYTICS = 'analytics',
  ADVERTISING = 'advertising',
  SOCIAL = 'social',
  PAYMENT = 'payment',
  FORMS = 'forms',
  CHAT = 'chat',
  CDN = 'cdn',
  FONTS = 'fonts',
  MAPS = 'maps',
  VIDEO = 'video',
  TESTING = 'testing',
  MONITORING = 'monitoring',
  OTHER = 'other',
}

/**
 * CSP directive types
 */
export interface CSPDirectives {
  'script-src'?: string[];
  'img-src'?: string[];
  'connect-src'?: string[];
  'frame-src'?: string[];
  'font-src'?: string[];
  'style-src'?: string[];
  'form-action'?: string[];
  'object-src'?: string[];
  'media-src'?: string[];
  'child-src'?: string[];
  'worker-src'?: string[];
  'manifest-src'?: string[];
  'report-uri'?: string[];
  'report-to'?: string[];
}

/**
 * Service definition interface
 */
export interface ServiceDefinition {
  /** Unique identifier for the service */
  id: string;

  /** Display name of the service */
  name: string;

  /** Service category */
  category: ServiceCategory;

  /** Short description of what the service does */
  description: string;

  /** Official website URL */
  website: string;

  /** Official CSP documentation URLs */
  officialDocs: string[];

  /** CSP directives required for this service */
  csp: CSPDirectives;

  /** Additional implementation notes */
  notes?: string[];

  /** Known issues or limitations */
  issues?: string[];

  /** Alternative service IDs (aliases) */
  aliases?: string[];

  /** Last updated timestamp (ISO string) */
  lastUpdated: string;

  /** Service API/SDK version if applicable */
  version?: string;

  /** Whether this service requires dynamic CSP (script injection) */
  requiresDynamic?: boolean;

  /** Nonce requirements */
  requiresNonce?: boolean;
}

/**
 * Service registry interface
 */
export interface ServiceRegistry {
  services: Record<string, ServiceDefinition>;
  categories: Record<ServiceCategory, string[]>;
  lastUpdated: string;
  version: string;
}
