// Main exports
export { generateCSP, generateCSPHeader, generateReportOnlyCSP, generateCSPAsync, generateCSPHeaderAsync, generateReportOnlyCSPAsync } from './generator.js';
export { generateNonce } from './utils.js';

// Type exports
export type { CSPOptions, CSPResult, NonceOptions } from './types.js';

// Re-export from data package for convenience
export type {
  ServiceDefinition,
  ServiceCategory,
  CSPDirectives,
  ServiceRegistry,
} from '@csp-kit/data';

export {
  services,
  categories,
  getServiceRegistry,
  getService,
  getServicesByCategory,
  searchServices,
  parseServiceIdentifier,
  getServiceWithVersion,
  getServiceWithVersionAsync,
  getServiceVersions,
  isServiceVersionDeprecated,
  getDeprecationWarning,
  getDeprecationWarningAsync,
  loadServices,
  getServiceAsync,
  clearServicesCache,
} from '@csp-kit/data';

// Default export for simple usage
export { generateCSP as default } from './generator.js';
