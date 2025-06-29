// Main exports
export { generateCSP, generateCSPHeader, generateReportOnlyCSP } from './generator.js';
export { generateNonce } from './utils.js';

// Type exports
export type { CSPOptions, CSPResult, NonceOptions } from './types.js';

// Re-export from data package for convenience
export type {
  ServiceDefinition,
  ServiceCategory,
  CSPDirectives,
  ServiceRegistry,
} from '@csp-js/data';

export {
  services,
  categories,
  serviceRegistry,
  getService,
  getServicesByCategory,
  searchServices,
  parseServiceIdentifier,
  getServiceWithVersion,
  getServiceVersions,
  isServiceVersionDeprecated,
  getDeprecationWarning,
} from '@csp-js/data';

// Default export for simple usage
export { generateCSP as default } from './generator.js';
