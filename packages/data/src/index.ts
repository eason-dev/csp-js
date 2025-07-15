// Export types first
export * from './types.js';
// Export only the types and functions safe for client components
export type {
  CSPService,
  SimpleCSPService,
  DefineServiceFn,
  DefineServiceInternalFn,
  ValidationResult,
  ConfigurableService,
} from './service-types.js';
export { defineService, defineServiceInternal, isCSPService } from './service-types.js';

// Export new services
export * from './services/index.js';

// Legacy compatibility functions for CI validation
import * as allServices from './services/index.js';
import type { CSPService } from './service-types.js';
import type { ServiceDefinition, ServiceRegistry, ServiceCategory } from './types.js';

export async function loadServices() {
  // Services are already loaded as ES modules
  return Promise.resolve();
}

export async function getServiceRegistry(): Promise<ServiceRegistry> {
  // Convert all exported services to a registry format
  const services: Record<string, ServiceDefinition> = {};
  const categories: Record<ServiceCategory, string[]> = {} as Record<ServiceCategory, string[]>;

  for (const [, value] of Object.entries(allServices)) {
    if (value && typeof value === 'object' && 'id' in value && 'directives' in value) {
      const service = value as CSPService;
      // Convert CSPService to ServiceDefinition format
      const serviceDefinition: ServiceDefinition = {
        id: service.id,
        name: service.name,
        category: service.category as ServiceCategory,
        description: service.description,
        website: service.website,
        cspDirectives: service.directives,
        lastUpdated: new Date().toISOString(),
        aliases: [],
        officialDocs: service.officialDocs ? [...service.officialDocs] : [],
        notes: service.notes,
        requiresDynamic: false,
        requiresNonce: false,
      };
      services[service.id] = serviceDefinition;

      // Build categories index
      const cat = service.category as ServiceCategory;
      if (!categories[cat]) {
        categories[cat] = [];
      }
      categories[cat].push(service.id);
    }
  }

  return {
    services,
    categories,
    lastUpdated: new Date().toISOString(),
    version: '1.0.0',
    schemaVersion: '2.0',
  };
}
