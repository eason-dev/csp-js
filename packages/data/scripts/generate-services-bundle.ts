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
  marketing: ServiceCategory.OTHER,
  documentation: ServiceCategory.OTHER,
  productivity: ServiceCategory.OTHER,
};

async function loadServiceFromJSONC(filePath: string): Promise<ServiceDefinition | null> {
  try {
    const content = await readFile(filePath, 'utf-8');
    const serviceData = parse(content);

    const filename = filePath.split('/').pop()?.replace('.jsonc', '') || '';
    const serviceId = serviceData.id || filename;

    if (!serviceId || !serviceData.cspDirectives) {
      console.error(`Skipping service ${filePath}: Missing required fields`);
      return null;
    }

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

async function generateServicesBundle() {
  const servicesDir = join(__dirname, '../data/services');
  const outputPath = join(__dirname, '../src/services-bundle.ts');

  console.log('🏭 Generating services bundle...');
  console.log('📂 Reading from:', servicesDir);
  console.log('📝 Writing to:', outputPath);

  try {
    const files = await readdir(servicesDir);
    const jsoncFiles = files.filter(file => file.endsWith('.jsonc'));

    console.log(`📁 Found ${jsoncFiles.length} service files`);

    const services: Record<string, ServiceDefinition> = {};

    for (const file of jsoncFiles) {
      const filePath = join(servicesDir, file);
      const service = await loadServiceFromJSONC(filePath);
      if (service) {
        services[service.id] = service;
        console.log(`✅ Processed ${service.id}`);
      }
    }

    const servicesCount = Object.keys(services).length;
    console.log(`📦 Bundled ${servicesCount} services`);

    // Generate TypeScript file
    const tsContent = `// This file is auto-generated. Do not edit manually.
// Generated at: ${new Date().toISOString()}
// Source: packages/data/scripts/generate-services-bundle.ts

import type { ServiceDefinition } from './types.js';

/**
 * Prebuilt services data for production environments where filesystem access is limited.
 * This is used as a fallback when loading services from JSONC files fails.
 */
export const PREBUILT_SERVICES: Record<string, ServiceDefinition> = ${JSON.stringify(services, null, 2)} as const;

/**
 * Number of prebuilt services included in this bundle
 */
export const PREBUILT_SERVICES_COUNT = ${servicesCount};
`;

    await writeFile(outputPath, tsContent, 'utf-8');

    console.log('✅ Services bundle generated successfully!');
    console.log(`📊 Total services: ${servicesCount}`);
  } catch (error) {
    console.error('❌ Error generating services bundle:', error);
    process.exit(1);
  }
}

generateServicesBundle().catch(console.error);