import { readdir, readFile } from 'node:fs/promises';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'jsonc-parser';
import type { ServiceDefinition, ServiceRegistry } from './types.js';
import { ServiceCategory } from './types.js';
import { PREBUILT_SERVICES } from './services-bundle.js';

// Get directory name compatible with both ESM and CJS
let currentDir: string;
try {
  // Try ESM approach first
  if (typeof import.meta !== 'undefined' && import.meta.url) {
    currentDir = dirname(fileURLToPath(import.meta.url));
  } else {
    // CJS fallback - this will be handled by tsup's polyfill
    throw new Error('Use CJS fallback');
  }
} catch {
  // For CJS builds, use a relative path from dist to data
  // This assumes the dist folder is at the same level as src
  currentDir = __dirname || dirname(require.resolve('./types.js'));
}

// Map string categories to enum values
const categoryMap: Record<string, ServiceCategory> = {
  analytics: ServiceCategory.ANALYTICS,
  advertising: ServiceCategory.ADVERTISING,
  social: ServiceCategory.SOCIAL,
  payment: ServiceCategory.PAYMENT,
  cdn: ServiceCategory.CDN,
  monitoring: ServiceCategory.MONITORING,
  forms: ServiceCategory.FORMS,
  video: ServiceCategory.VIDEO,
  testing: ServiceCategory.TESTING,
  chat: ServiceCategory.CHAT,
  fonts: ServiceCategory.FONTS,
  maps: ServiceCategory.MAPS,
  other: ServiceCategory.OTHER,
  // Map additional categories to existing ones
  communication: ServiceCategory.CHAT,
  mapping: ServiceCategory.MAPS,
  cms: ServiceCategory.OTHER,
  authentication: ServiceCategory.OTHER,
  ecommerce: ServiceCategory.OTHER,
  support: ServiceCategory.CHAT,
  email: ServiceCategory.OTHER,
  education: ServiceCategory.OTHER,
  search: ServiceCategory.OTHER,
  ab_testing: ServiceCategory.OTHER,
  website_builder: ServiceCategory.OTHER,
  marketing: ServiceCategory.OTHER,
  documentation: ServiceCategory.OTHER,
  productivity: ServiceCategory.OTHER,
};

// Cache for loaded services
let _servicesCache: Record<string, ServiceDefinition> | null = null;
let _registryCache: ServiceRegistry | null = null;

async function loadServiceFromJSONC(filePath: string): Promise<ServiceDefinition | null> {
  try {
    const content = await readFile(filePath, 'utf-8');
    // Parse JSONC content
    const serviceData = parse(content);

    // Generate ID from filename if not present
    const filename = basename(filePath, '.jsonc');
    const serviceId = serviceData.id || filename;

    // Skip if no ID could be determined
    if (!serviceId) {
      console.error(`Skipping service ${filePath}: No ID found`);
      return null;
    }

    // Validate required fields for simplified format
    if (!serviceData.cspDirectives) {
      console.error(`Skipping service ${filePath}: No cspDirectives found`);
      return null;
    }

    // Convert JSONC to simplified ServiceDefinition format
    const service: ServiceDefinition = {
      id: serviceId,
      name: serviceData.name,
      category: categoryMap[serviceData.category] || ServiceCategory.OTHER,
      description: serviceData.description,
      website: serviceData.website,
      officialDocs: serviceData.officialDocs || [],
      cspDirectives: serviceData.cspDirectives,
      requiresDynamic: serviceData.requiresDynamic || false,
      requiresNonce: serviceData.requiresNonce || false,
      notes: serviceData.notes,
      aliases: serviceData.aliases || [],
      lastUpdated: serviceData.lastUpdated || new Date().toISOString(),
      verifiedAt: serviceData.verifiedAt,
      monitoring: serviceData.monitoring,
    };

    return service;
  } catch (error) {
    console.error(`Error loading service from ${filePath}:`, error);
    return null;
  }
}

async function loadAllServices(): Promise<Record<string, ServiceDefinition>> {
  if (_servicesCache) {
    return _servicesCache;
  }

  const servicesDir = join(currentDir, '../data/services');

  try {
    const files = await readdir(servicesDir);
    const jsoncFiles = files.filter(file => file.endsWith('.jsonc'));

    const services: Record<string, ServiceDefinition> = {};

    for (const file of jsoncFiles) {
      const filePath = join(servicesDir, file);
      const service = await loadServiceFromJSONC(filePath);
      if (service) {
        services[service.id] = service;
      }
    }

    _servicesCache = services;
    return services;
  } catch (error) {
    console.error('Error loading services from filesystem, using prebuilt bundle:', (error as Error).message);
    
    // Fallback to prebuilt services for production environments
    _servicesCache = { ...PREBUILT_SERVICES };
    return _servicesCache;
  }
}

/**
 * Service definitions - loaded from JSONC files
 * This is dynamically loaded from the data/services directory
 */
export const services = new Proxy({} as Record<string, ServiceDefinition>, {
  get(_target, prop) {
    if (typeof prop === 'string') {
      // Lazy load services if not already loaded
      if (!_servicesCache) {
        throw new Error(
          'Services not loaded. Call loadServices() first or use async getService() function.'
        );
      }
      return _servicesCache[prop];
    }
    return undefined;
  },
  ownKeys() {
    if (!_servicesCache) {
      throw new Error('Services not loaded. Call loadServices() first.');
    }
    return Object.keys(_servicesCache);
  },
  has(_target, prop) {
    if (!_servicesCache) {
      return false;
    }
    return prop in _servicesCache;
  },
  getOwnPropertyDescriptor(_target, prop) {
    if (!_servicesCache) {
      return undefined;
    }
    return Object.getOwnPropertyDescriptor(_servicesCache, prop);
  },
});

/**
 * Load services from disk (call this before using other functions)
 */
export async function loadServices(): Promise<void> {
  await loadAllServices();
}

/**
 * Service registry for organized access
 */
export async function getServiceRegistry(): Promise<ServiceRegistry> {
  if (_registryCache) {
    return _registryCache;
  }

  const allServices = await loadAllServices();

  const registry: ServiceRegistry = {
    services: allServices,
    categories: Object.values(ServiceCategory).reduce(
      (acc, category) => {
        acc[category] = Object.values(allServices)
          .filter(service => service.category === category)
          .map(service => service.id);
        return acc;
      },
      {} as Record<ServiceCategory, string[]>
    ),
    lastUpdated: new Date().toISOString(),
    version: new Date().toISOString().split('T')[0]?.replace(/-/g, '.') || '0.0.0',
    schemaVersion: '1.0.0',
  };

  _registryCache = registry;
  return registry;
}

/**
 * All available service categories
 */
export const categories = Object.values(ServiceCategory);

/**
 * Get a service by its ID or alias (async version)
 */
export async function getServiceAsync(identifier: string): Promise<ServiceDefinition | undefined> {
  const allServices = await loadAllServices();

  // Try direct ID lookup first
  if (allServices[identifier]) {
    return allServices[identifier];
  }

  // Search by alias
  for (const service of Object.values(allServices)) {
    if (service.aliases?.includes(identifier)) {
      return service;
    }
  }

  return undefined;
}

/**
 * Get a service by its ID or alias (sync version - requires services to be preloaded)
 */
export function getService(identifier: string): ServiceDefinition | undefined {
  if (!_servicesCache) {
    throw new Error('Services not loaded. Call loadServices() first or use getServiceAsync().');
  }

  // Try direct ID lookup first
  if (_servicesCache[identifier]) {
    return _servicesCache[identifier];
  }

  // Search by alias
  for (const service of Object.values(_servicesCache)) {
    if (service.aliases?.includes(identifier)) {
      return service;
    }
  }

  return undefined;
}

/**
 * Get services by category (async version)
 */
export async function getServicesByCategory(
  category: ServiceCategory
): Promise<ServiceDefinition[]> {
  const allServices = await loadAllServices();
  return Object.values(allServices).filter(service => service.category === category);
}

/**
 * Search services by name, description, or aliases (async version)
 */
export async function searchServices(query: string): Promise<ServiceDefinition[]> {
  const allServices = await loadAllServices();
  const lowercaseQuery = query.toLowerCase();
  return Object.values(allServices).filter(
    service =>
      service.name.toLowerCase().includes(lowercaseQuery) ||
      service.description.toLowerCase().includes(lowercaseQuery) ||
      service.aliases?.some(alias => alias.toLowerCase().includes(lowercaseQuery))
  );
}

// parseServiceIdentifier function removed - version support eliminated

// getServiceWithVersion function removed - version support eliminated

// getServiceWithVersionAsync function removed - version support eliminated

// getServiceVersions function removed - version support eliminated

// isServiceVersionDeprecated function removed - version support eliminated

// getDeprecationWarning function removed - version support eliminated

// getDeprecationWarningAsync function removed - version support eliminated

/**
 * Clear the services cache (useful for testing or reloading)
 */
export function clearServicesCache(): void {
  _servicesCache = null;
  _registryCache = null;
}
