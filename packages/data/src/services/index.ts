// Auto-generated service exports
export * from './advertising/index.js';
export * from './analytics/index.js';
export * from './authentication/index.js';
export * from './cdn/index.js';
export * from './chat/index.js';
export * from './cms/index.js';
export * from './documentation/index.js';
export * from './education/index.js';
export * from './fonts/index.js';
export * from './forms/index.js';
export * from './maps/index.js';
export * from './marketing/index.js';
export * from './monitoring/index.js';
export * from './other/index.js';
export * from './payment/index.js';
export * from './productivity/index.js';
export * from './social/index.js';
export * from './testing/index.js';
export * from './video/index.js';

// Re-export types
export type { CSPService, DefineServiceFn, ValidationResult, ConfigurableService } from '../service-types.js';
export { defineService, isCSPService } from '../service-types.js';
// Note: createConfigurableService is not exported as it creates functions
// that can't be serialized to client components
