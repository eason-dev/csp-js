// Main exports
export {
  generateCSP,
  generateCSPHeader,
  generateReportOnlyCSP,
} from './generator.js';

// Import for the async wrapper
import { generateCSP as generateCSPSync } from './generator.js';

// Alias for backwards compatibility (wrap in promise for CI)
export function generateCSPAsync(...args: Parameters<typeof generateCSPSync>): Promise<ReturnType<typeof generateCSPSync>> {
  return Promise.resolve(generateCSPSync(...args));
}


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
  loadServices,
  getServiceRegistry,
} from '@csp-kit/data';


// Default export for simple usage
export { generateCSP as default } from './generator.js';
