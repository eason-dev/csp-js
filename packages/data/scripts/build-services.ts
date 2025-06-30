import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'jsonc-parser';
import type { ServiceDefinition } from '../src/types.js';
import { ServiceCategory } from '../src/types.js';

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

async function loadServiceFromJSONC(filePath: string): Promise<ServiceDefinition | null> {
  try {
    const content = await readFile(filePath, 'utf-8');
    // Parse JSONC content
    const serviceData = parse(content);

    // Generate ID from filename if not present
    const filename = filePath.split('/').pop()?.replace('.jsonc', '') || '';
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

function generateServicesCode(services: Record<string, ServiceDefinition>): string {
  const entries = Object.entries(services).map(([key, service]) => {
    // Convert service to code string with proper enum handling
    const serviceCode = JSON.stringify(service, null, 2).replace(
      /"category":\s*"([^"]+)"/g,
      (match, categoryValue) => {
        // Find the enum key by looking up the value
        const enumKey = Object.keys(ServiceCategory).find(
          key => ServiceCategory[key as keyof typeof ServiceCategory] === categoryValue
        );
        return `"category": ServiceCategory.${enumKey || 'OTHER'}`;
      }
    );

    return `  "${key}": ${serviceCode}`;
  });

  return `{\n${entries.join(',\n')}\n}`;
}

async function buildServices() {
  const servicesDir = join(__dirname, '../data/services');
  const outputPath = join(__dirname, '../src/services.ts');

  console.log('Loading services from:', servicesDir);

  try {
    const files = await readdir(servicesDir);
    const jsoncFiles = files.filter(file => file.endsWith('.jsonc'));

    console.log(`Found ${jsoncFiles.length} JSONC files`);

    const services: Record<string, ServiceDefinition> = {};

    for (const file of jsoncFiles) {
      const filePath = join(servicesDir, file);
      const service = await loadServiceFromJSONC(filePath);
      if (service) {
        services[service.id] = service;
        console.log(`Loaded service: ${service.id}`);
      }
    }

    console.log(`Successfully loaded ${Object.keys(services).length} services`);

    // Generate the services.ts file content with proper enum handling
    const servicesCode = generateServicesCode(services);

    const fileContent = `import { ServiceDefinition, ServiceRegistry, ServiceCategory } from './types.js';

/**
 * Service definitions - loaded from JSONC files
 * This file is auto-generated by scripts/build-services.ts
 * Do not edit manually - your changes will be overwritten
 */
export const services: Record<string, ServiceDefinition> = ${servicesCode};

/**
 * Service registry for organized access
 */
export const serviceRegistry: ServiceRegistry = {
  services,
  categories: Object.values(ServiceCategory).reduce((acc, category) => {
    acc[category] = Object.values(services).filter(service => service.category === category).map(service => service.id);
    return acc;
  }, {} as Record<ServiceCategory, string[]>),
  lastUpdated: new Date().toISOString(),
  version: new Date().toISOString().split('T')[0]!.replace(/-/g, '.'),
  schemaVersion: '1.0.0',
};

/**
 * All available service categories
 */
export const categories = Object.values(ServiceCategory);

/**
 * Get a service by its ID or alias
 */
export function getService(identifier: string): ServiceDefinition | undefined {
  // Try direct ID lookup first
  if (services[identifier]) {
    return services[identifier];
  }

  // Search by alias
  for (const service of Object.values(services)) {
    if (service.aliases?.includes(identifier)) {
      return service;
    }
  }

  return undefined;
}

/**
 * Get services by category
 */
export function getServicesByCategory(category: ServiceCategory): ServiceDefinition[] {
  return Object.values(services).filter(service => service.category === category);
}

/**
 * Search services by name, description, or aliases
 */
export function searchServices(query: string): ServiceDefinition[] {
  const lowercaseQuery = query.toLowerCase();
  return Object.values(services).filter(service => 
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
 * Get service with specific version
 */
export function getServiceWithVersion(
  identifier: string,
  version?: string
): { service: ServiceDefinition; version: string } | undefined {
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
 * Get all available versions for a service
 */
export function getServiceVersions(identifier: string): string[] {
  const service = getService(identifier);
  return service ? Object.keys(service.versions) : [];
}

/**
 * Check if a service version is deprecated
 */
export function isServiceVersionDeprecated(identifier: string, version: string): boolean {
  const service = getService(identifier);
  if (!service || !service.versions[version]) {
    return false;
  }

  return !!service.versions[version].deprecatedFrom;
}

/**
 * Get deprecation warning for a service version
 */
export function getDeprecationWarning(identifier: string, version: string): string | undefined {
  const service = getService(identifier);
  if (!service || !service.versions[version]) {
    return undefined;
  }

  const versionData = service.versions[version];
  if (versionData.deprecatedFrom) {
    return \`This version has been deprecated since \${versionData.deprecatedFrom}\`;
  }
  return undefined;
}
`;

    await writeFile(outputPath, fileContent, 'utf-8');
    console.log(`Generated services.ts with ${Object.keys(services).length} services`);
  } catch (error) {
    console.error('Error building services:', error);
    process.exit(1);
  }
}

buildServices().catch(console.error);
