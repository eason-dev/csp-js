/**
 * Service types for the new TypeScript-based architecture
 */

import { ServiceCategory, CSPDirectives, ServiceMonitoring } from './types.js';

/**
 * Base service definition that can be used directly or configured
 */
export interface CSPService {
  /** Unique identifier for the service */
  readonly id: string;

  /** Display name of the service */
  readonly name: string;

  /** Service category */
  readonly category: ServiceCategory | string;

  /** Short description of what the service does */
  readonly description: string;

  /** Official website URL */
  readonly website: string;

  /** Official CSP documentation URLs */
  readonly officialDocs: readonly string[];

  /** CSP directives required for this service */
  readonly directives: CSPDirectives;

  /** Whether this service requires dynamic CSP (script injection) */
  readonly requiresDynamic?: boolean;

  /** Nonce requirements */
  readonly requiresNonce?: boolean;

  /** Implementation notes */
  readonly notes?: string;

  /** Alternative service IDs (aliases) */
  readonly aliases?: readonly string[];

  /** Last updated timestamp (ISO string) */
  readonly lastUpdated: string;

  /** When this service definition was last verified against official docs */
  readonly verifiedAt?: string;

  /** Monitoring configuration */
  readonly monitoring?: ServiceMonitoring;

  /** Optional: Dynamic configuration */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  configure?: (options: any) => Partial<CSPService>;

  /** Optional: Validation logic */
  validate?: (directives: CSPDirectives) => ValidationResult;

  /** Optional: Dependencies on other services */
  dependencies?: readonly string[];

  /** Optional: Services that conflict with this one */
  conflicts?: readonly string[];

  /** Optional: Deprecation info */
  deprecated?: {
    readonly since: string;
    readonly alternative: string;
    readonly message: string;
  };
}

/**
 * Result of service validation
 */
export interface ValidationResult {
  valid?: boolean;
  errors?: string[];
  warnings?: string[];
}

/**
 * Type for the defineService function that ensures proper typing
 */
export type DefineServiceFn = <T extends CSPService>(service: T) => T;

/**
 * Create a properly typed service definition
 */
export const defineService: DefineServiceFn = service => {
  // Validate required fields at runtime in development
  if (process.env.NODE_ENV !== 'production') {
    const required = [
      'id',
      'name',
      'category',
      'description',
      'website',
      'officialDocs',
      'directives',
      'lastUpdated',
    ];
    for (const field of required) {
      if (!(field in service)) {
        throw new Error(`Service ${service.id || 'unknown'} is missing required field: ${field}`);
      }
    }
  }

  return Object.freeze(service);
};

/**
 * Type guard to check if a value is a CSPService
 */
export function isCSPService(value: unknown): value is CSPService {
  if (!value || typeof value !== 'object') return false;
  const service = value as Record<string, unknown>;
  return (
    typeof service.id === 'string' &&
    typeof service.name === 'string' &&
    typeof service.category === 'string' &&
    typeof service.directives === 'object'
  );
}

/**
 * Type for configurable services
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ConfigurableService<TOptions = any> extends CSPService {
  configure: (options: TOptions) => Partial<CSPService>;
}

/**
 * Helper to create a configurable service
 */
export function createConfigurableService<TOptions>(
  baseService: CSPService,
  configureFn: (options: TOptions) => Partial<CSPService>
): CSPService & ConfigurableService<TOptions> {
  return {
    ...baseService,
    configure: (options: TOptions) => {
      const configured = configureFn(options);
      // Return a new complete service object with merged properties
      return {
        ...baseService,
        ...configured,
        id: `${baseService.id}-configured`,
        directives: configured.directives
          ? mergeDirectives(baseService.directives, configured.directives)
          : baseService.directives,
      };
    },
  };
}

/**
 * Helper to merge CSP directives
 */
function mergeDirectives(base: CSPDirectives, additional: CSPDirectives): CSPDirectives {
  const result: CSPDirectives = { ...base };

  for (const [key, values] of Object.entries(additional)) {
    const directiveKey = key as keyof CSPDirectives;
    if (result[directiveKey]) {
      // Merge arrays and deduplicate
      const existing = result[directiveKey] || [];
      const newValues = values || [];
      result[directiveKey] = [...new Set([...existing, ...newValues])];
    } else {
      result[directiveKey] = values;
    }
  }

  return result;
}
