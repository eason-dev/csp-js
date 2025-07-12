// Export types first
export * from './types.js';
// Export only the types and functions safe for client components
export type { CSPService, DefineServiceFn, ValidationResult, ConfigurableService } from './service-types.js';
export { defineService, isCSPService } from './service-types.js';

// Export new services
export * from './services/index.js';

// Legacy compatibility functions for CI validation
import * as allServices from './services/index.js';
import type { CSPService } from './service-types.js';

export async function loadServices() {
  // Services are already loaded as ES modules
  return Promise.resolve();
}

export async function getServiceRegistry() {
  // Convert all exported services to a registry format
  const services: Record<string, CSPService> = {};
  
  for (const [, value] of Object.entries(allServices)) {
    if (value && typeof value === 'object' && 'id' in value && 'directives' in value) {
      const service = value as CSPService;
      services[service.id] = service;
    }
  }
  
  return {
    services,
    categories: Object.values(services).reduce((acc, service) => {
      const category = service.category;
      if (!acc[category]) acc[category] = [];
      acc[category].push(service);
      return acc;
    }, {} as Record<string, CSPService[]>)
  };
}
