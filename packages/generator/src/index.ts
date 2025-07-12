// Main exports
export {
  generateCSP,
  generateCSPHeader,
  generateReportOnlyCSP,
} from './generator.js';


export { generateNonce } from './utils.js';

// Type exports
export type { CSPOptions, CSPOptionsV2, CSPResult, NonceOptions } from './types.js';

// Re-export from data package for convenience
export type {
  ServiceDefinition,
  ServiceCategory,
  CSPDirectives,
  ServiceRegistry,
  CSPService,
  DefineServiceFn,
  ValidationResult,
  ConfigurableService,
} from '@csp-kit/data';

export {
  defineService,
  isCSPService,
} from '@csp-kit/data';


// Default export for simple usage
export { generateCSP as default } from './generator.js';
