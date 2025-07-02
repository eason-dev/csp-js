import { readdir, readFile } from 'node:fs/promises';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'jsonc-parser';
import type { ServiceDefinition, ServiceRegistry } from './types.js';
import { ServiceCategory } from './types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

    // Handle different JSONC formats
    let cspRules: Record<string, unknown> = {};
    let versionKey = '1.0.0';

    if (serviceData.csp) {
      // Format 1: Direct csp object (youtube, google-analytics)
      cspRules = serviceData.csp;
    } else if (serviceData.versions) {
      // Format 2: versions object (stripe, facebook)
      const firstVersion = Object.keys(serviceData.versions)[0];
      if (!firstVersion) {
        console.error(`Skipping service ${filePath}: No versions found`);
        return null;
      }
      versionKey = firstVersion;
      const versionData = serviceData.versions[firstVersion];
      cspRules = versionData.cspDirectives || versionData.csp || {};
    }

    // Convert JSONC format to ServiceDefinition format
    const notes = serviceData.notes || serviceData.versions?.[versionKey]?.notes || [];
    const normalizedNotes = Array.isArray(notes) ? notes : [notes].filter(Boolean);

    const service: ServiceDefinition = {
      id: serviceId,
      name: serviceData.name,
      category: categoryMap[serviceData.category] || ServiceCategory.OTHER,
      description: serviceData.description,
      website: serviceData.website,
      officialDocs: serviceData.officialDocs || [],
      versions: {
        [versionKey]: {
          csp: cspRules,
          validFrom: serviceData.versions?.[versionKey]?.validFrom || '2024-01-01',
          notes: normalizedNotes,
          requiresDynamic:
            serviceData.requiresDynamic ||
            serviceData.versions?.[versionKey]?.requiresDynamic ||
            false,
          requiresNonce:
            serviceData.requiresNonce || serviceData.versions?.[versionKey]?.requiresNonce || false,
        },
      },
      defaultVersion: serviceData.defaultVersion || versionKey,
      aliases: serviceData.aliases || [],
      lastUpdated: serviceData.lastUpdated || new Date().toISOString(),
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

  const servicesDir = join(__dirname, '../data/services');

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
    console.error('Error loading services:', error);
    return {};
  }
}

/**
 * Service definitions - loaded from JSONC files
 * This is dynamically loaded from the data/services directory
 */
export const services = new Proxy({} as Record<string, ServiceDefinition>, {
  get(target, prop) {
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
  has(target, prop) {
    if (!_servicesCache) {
      return false;
    }
    return prop in _servicesCache;
  },
  getOwnPropertyDescriptor(target, prop) {
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

/**
 * Parse service identifier (serviceId@version)
 */
export function parseServiceIdentifier(identifier: string): { id: string; version?: string } {
  const parts = identifier.split('@');
  return {
    id: parts[0] || '',
    version: parts[1],
  };
}

/**
 * Get service with specific version (sync version - requires services to be preloaded)
 */
export function getServiceWithVersion(
  identifier: string,
  version?: string
): { service: ServiceDefinition; version: string } | undefined {
  if (!_servicesCache) {
    throw new Error('Services not loaded. Call loadServices() first or use getServiceWithVersionAsync().');
  }

  const { id, version: parsedVersion } = parseServiceIdentifier(identifier);
  const targetVersion = version || parsedVersion;

  const service = getService(id);
  if (!service) {
    return undefined;
  }

  const serviceVersion = targetVersion || service.defaultVersion;

  if (!service.versions[serviceVersion]) {
    return undefined;
  }

  return {
    service,
    version: serviceVersion,
  };
}

/**
 * Get service with specific version (async version)
 */
export async function getServiceWithVersionAsync(
  identifier: string,
  version?: string
): Promise<{ service: ServiceDefinition; version: string } | undefined> {
  const { id, version: parsedVersion } = parseServiceIdentifier(identifier);
  const targetVersion = version || parsedVersion;

  const service = await getServiceAsync(id);
  if (!service) {
    return undefined;
  }

  const serviceVersion = targetVersion || service.defaultVersion;

  if (!service.versions[serviceVersion]) {
    return undefined;
  }

  return {
    service,
    version: serviceVersion,
  };
}

/**
 * Get all available versions for a service (async version)
 */
export async function getServiceVersions(identifier: string): Promise<string[]> {
  const service = await getServiceAsync(identifier);
  return service ? Object.keys(service.versions) : [];
}

/**
 * Check if a service version is deprecated (async version)
 */
export async function isServiceVersionDeprecated(
  identifier: string,
  version: string
): Promise<boolean> {
  const service = await getServiceAsync(identifier);
  if (!service || !service.versions[version]) {
    return false;
  }

  return !!service.versions[version].deprecatedFrom;
}

/**
 * Get deprecation warning for a service version (sync version - requires services to be preloaded)
 */
export function getDeprecationWarning(
  identifier: string,
  version: string
): string | undefined {
  if (!_servicesCache) {
    throw new Error('Services not loaded. Call loadServices() first or use getDeprecationWarningAsync().');
  }

  const service = getService(identifier);
  if (!service || !service.versions[version]) {
    return undefined;
  }

  const versionData = service.versions[version];
  if (versionData.deprecatedFrom) {
    return `This version has been deprecated since ${versionData.deprecatedFrom}`;
  }
  return undefined;
}

/**
 * Get deprecation warning for a service version (async version)
 */
export async function getDeprecationWarningAsync(
  identifier: string,
  version: string
): Promise<string | undefined> {
  const service = await getServiceAsync(identifier);
  if (!service || !service.versions[version]) {
    return undefined;
  }

  const versionData = service.versions[version];
  if (versionData.deprecatedFrom) {
    return `This version has been deprecated since ${versionData.deprecatedFrom}`;
  }
  return undefined;
}

/**
 * Clear the services cache (useful for testing or reloading)
 */
export function clearServicesCache(): void {
  _servicesCache = null;
  _registryCache = null;
}
