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
  'frame-ancestors'?: string[];
  'font-src'?: string[];
  'style-src'?: string[];
  'form-action'?: string[];
  'object-src'?: string[];
  'media-src'?: string[];
  'child-src'?: string[];
  'worker-src'?: string[];
  'manifest-src'?: string[];
  'base-uri'?: string[];
  'report-uri'?: string[];
  'report-to'?: string[];
}

// ServiceVersion interface removed - version support eliminated

/**
 * Service monitoring configuration
 */
export interface ServiceMonitoring {
  /** URLs to test for CSP violations */
  testUrls?: string[];

  /** How often to check for changes */
  checkInterval: 'daily' | 'weekly' | 'monthly';

  /** Whether to create alerts for breaking changes */
  alertOnBreaking: boolean;

  /** Last time this service was checked */
  lastChecked?: string;

  /** Additional monitoring notes */
  notes?: string[];
}

/**
 * Service definition interface (simplified - no versioning support)
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
  cspDirectives: CSPDirectives;

  /** Whether this service requires dynamic CSP (script injection) */
  requiresDynamic?: boolean;

  /** Nonce requirements */
  requiresNonce?: boolean;

  /** Implementation notes */
  notes?: string;

  /** Alternative service IDs (aliases) */
  aliases?: string[];

  /** Last updated timestamp (ISO string) */
  lastUpdated: string;

  /** When this service definition was last verified against official docs */
  verifiedAt?: string;

  /** Monitoring configuration */
  monitoring?: ServiceMonitoring;
}

// ServiceWithVersion interface removed - version support eliminated

/**
 * Service registry interface
 */
export interface ServiceRegistry {
  services: Record<string, ServiceDefinition>;
  categories: Record<ServiceCategory, string[]>;
  lastUpdated: string;
  /** Data package version (date-based: YYYY.MM.DD) */
  version: string;
  /** Schema version for backward compatibility */
  schemaVersion: string;
}

// VersionChange interface removed - version support eliminated
