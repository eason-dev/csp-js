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
 * Version-specific CSP rules and metadata
 */
export interface ServiceVersion {
  /** CSP directives required for this version */
  csp: CSPDirectives;

  /** Date this version was first valid (ISO string) */
  validFrom: string;

  /** Date this version was deprecated (ISO string, optional) */
  deprecatedFrom?: string;

  /** Implementation notes for this version */
  notes?: string[];

  /** Whether this is a breaking change from previous version */
  breaking?: boolean;

  /** Whether this service requires dynamic CSP (script injection) */
  requiresDynamic?: boolean;

  /** Nonce requirements */
  requiresNonce?: boolean;

  /** Known issues or limitations for this version */
  issues?: string[];
}

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
 * Service definition interface with versioning support
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

  /** Version-specific CSP rules */
  versions: Record<string, ServiceVersion>;

  /** Default version to use when no version specified */
  defaultVersion: string;

  /** Alternative service IDs (aliases) */
  aliases?: string[];

  /** Last updated timestamp (ISO string) */
  lastUpdated: string;

  /** Monitoring configuration */
  monitoring?: ServiceMonitoring;
}

/**
 * Service with version specification
 */
export interface ServiceWithVersion {
  /** Service ID */
  id: string;
  /** Version string (semantic version, date, or 'latest') */
  version: string;
}

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

/**
 * Version change information for changelog
 */
export interface VersionChange {
  /** Version identifier */
  version: string;
  /** Date of change */
  date: string;
  /** List of changes */
  changes: string[];
  /** Whether this is a breaking change */
  breaking: boolean;
  /** Type of change */
  type: 'added' | 'changed' | 'deprecated' | 'removed' | 'fixed' | 'security';
}
