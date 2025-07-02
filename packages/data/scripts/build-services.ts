import { readdir, readFile } from 'node:fs/promises';
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

interface ValidationError {
  file: string;
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

async function validateServiceFromJSONC(filePath: string): Promise<{
  service: ServiceDefinition | null;
  errors: ValidationError[];
}> {
  const errors: ValidationError[] = [];
  const fileName = filePath.split('/').pop() || '';

  try {
    const content = await readFile(filePath, 'utf-8');

    // Parse JSONC content
    let serviceData: unknown;
    try {
      serviceData = parse(content);
    } catch (parseError) {
      errors.push({
        file: fileName,
        field: 'json',
        message: `Failed to parse JSONC: ${String(parseError)}`,
        severity: 'error',
      });
      return { service: null, errors };
    }

    // Type guard for service data
    if (!serviceData || typeof serviceData !== 'object' || Array.isArray(serviceData)) {
      errors.push({
        file: fileName,
        field: 'root',
        message: 'Service data must be an object',
        severity: 'error',
      });
      return { service: null, errors };
    }

    const data = serviceData as Record<string, unknown>;

    // Generate ID from filename if not present
    const filename = filePath.split('/').pop()?.replace('.jsonc', '') || '';
    const serviceId = (data.id as string) || filename;

    // Validate required fields
    if (!serviceId) {
      errors.push({
        file: fileName,
        field: 'id',
        message: 'Service ID is required',
        severity: 'error',
      });
    }

    if (!data.name) {
      errors.push({
        file: fileName,
        field: 'name',
        message: 'Service name is required',
        severity: 'error',
      });
    }

    if (!data.description) {
      errors.push({
        file: fileName,
        field: 'description',
        message: 'Service description is required',
        severity: 'error',
      });
    }

    if (!data.website) {
      errors.push({
        file: fileName,
        field: 'website',
        message: 'Service website is required',
        severity: 'error',
      });
    }

    if (!data.category) {
      errors.push({
        file: fileName,
        field: 'category',
        message: 'Service category is required',
        severity: 'error',
      });
    } else if (!categoryMap[data.category as string]) {
      errors.push({
        file: fileName,
        field: 'category',
        message: `Invalid category "${data.category}". Valid categories: ${Object.keys(categoryMap).join(', ')}`,
        severity: 'error',
      });
    }

    // Validate CSP structure
    let cspRules: Record<string, unknown> = {};
    let versionKey = '1.0.0';

    if (serviceData.csp) {
      // Format 1: Direct csp object
      cspRules = serviceData.csp;
      if (typeof cspRules !== 'object' || Array.isArray(cspRules)) {
        errors.push({
          file: fileName,
          field: 'csp',
          message: 'CSP rules must be an object',
          severity: 'error',
        });
      }
    } else if (serviceData.versions) {
      // Format 2: versions object
      const firstVersion = Object.keys(serviceData.versions)[0];
      if (!firstVersion) {
        errors.push({
          file: fileName,
          field: 'versions',
          message: 'At least one version must be defined',
          severity: 'error',
        });
      } else {
        versionKey = firstVersion;
        const versionData = serviceData.versions[firstVersion];
        cspRules = versionData?.cspDirectives || versionData?.csp || {};

        if (typeof cspRules !== 'object' || Array.isArray(cspRules)) {
          errors.push({
            file: fileName,
            field: `versions.${versionKey}.csp`,
            message: 'CSP rules must be an object',
            severity: 'error',
          });
        }
      }
    } else {
      errors.push({
        file: fileName,
        field: 'csp',
        message: 'Either direct "csp" object or "versions" with CSP rules is required',
        severity: 'error',
      });
    }

    // Validate CSP directive formats
    const validDirectives = [
      'script-src',
      'style-src',
      'img-src',
      'font-src',
      'connect-src',
      'frame-src',
      'media-src',
      'object-src',
      'child-src',
      'worker-src',
      'manifest-src',
      'form-action',
      'frame-ancestors',
      'base-uri',
    ];

    Object.entries(cspRules).forEach(([directive, values]) => {
      if (!validDirectives.includes(directive)) {
        errors.push({
          file: fileName,
          field: `csp.${directive}`,
          message: `"${directive}" is not a valid CSP directive`,
          severity: 'warning',
        });
      }

      if (!Array.isArray(values)) {
        errors.push({
          file: fileName,
          field: `csp.${directive}`,
          message: `CSP directive "${directive}" must be an array of strings`,
          severity: 'error',
        });
      } else {
        values.forEach((value, index) => {
          if (typeof value !== 'string') {
            errors.push({
              file: fileName,
              field: `csp.${directive}[${index}]`,
              message: `CSP value must be a string, got ${typeof value}`,
              severity: 'error',
            });
          }
        });
      }
    });

    // Validate URLs
    if (serviceData.website) {
      try {
        new URL(serviceData.website);
      } catch {
        errors.push({
          file: fileName,
          field: 'website',
          message: 'Website must be a valid URL',
          severity: 'error',
        });
      }
    }

    if (serviceData.officialDocs && Array.isArray(serviceData.officialDocs)) {
      serviceData.officialDocs.forEach((doc: unknown, index: number) => {
        if (typeof doc !== 'string') {
          errors.push({
            file: fileName,
            field: `officialDocs[${index}]`,
            message: 'Official docs must be strings',
            severity: 'error',
          });
        } else {
          try {
            new URL(doc);
          } catch {
            errors.push({
              file: fileName,
              field: `officialDocs[${index}]`,
              message: 'Official doc must be a valid URL',
              severity: 'error',
            });
          }
        }
      });
    }

    // If there are errors, don't create the service object
    if (errors.some(error => error.severity === 'error')) {
      return { service: null, errors };
    }

    // Convert to ServiceDefinition format
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

    return { service, errors };
  } catch (error) {
    errors.push({
      file: fileName,
      field: 'file',
      message: `Error reading file: ${error}`,
      severity: 'error',
    });
    return { service: null, errors };
  }
}

async function validateServices() {
  const servicesDir = join(__dirname, '../data/services');

  console.log('🔍 Validating services from:', servicesDir);

  try {
    const files = await readdir(servicesDir);
    const jsoncFiles = files.filter(file => file.endsWith('.jsonc'));

    console.log(`📁 Found ${jsoncFiles.length} JSONC files`);

    const services: Record<string, ServiceDefinition> = {};
    const allErrors: ValidationError[] = [];
    let validServices = 0;
    let invalidServices = 0;

    for (const file of jsoncFiles) {
      const filePath = join(servicesDir, file);
      console.log(`🔄 Validating ${file}...`);

      const { service, errors } = await validateServiceFromJSONC(filePath);

      allErrors.push(...errors);

      if (service) {
        services[service.id] = service;
        validServices++;
        console.log(`✅ ${service.id} - valid`);
      } else {
        invalidServices++;
        console.log(`❌ ${file} - invalid`);
      }
    }

    // Report results
    console.log('\n📊 Validation Summary:');
    console.log(`✅ Valid services: ${validServices}`);
    console.log(`❌ Invalid services: ${invalidServices}`);
    console.log(`⚠️  Total warnings: ${allErrors.filter(e => e.severity === 'warning').length}`);
    console.log(`🚨 Total errors: ${allErrors.filter(e => e.severity === 'error').length}`);

    // Group errors by file
    if (allErrors.length > 0) {
      console.log('\n📋 Validation Details:');
      const errorsByFile = allErrors.reduce(
        (acc, error) => {
          if (!acc[error.file]) acc[error.file] = [];
          acc[error.file].push(error);
          return acc;
        },
        {} as Record<string, ValidationError[]>
      );

      Object.entries(errorsByFile).forEach(([file, fileErrors]) => {
        console.log(`\n📄 ${file}:`);
        fileErrors.forEach(error => {
          const icon = error.severity === 'error' ? '🚨' : '⚠️';
          console.log(`  ${icon} ${error.field}: ${error.message}`);
        });
      });
    }

    // Check for duplicate IDs and aliases
    console.log('\n🔍 Checking for duplicates...');
    const serviceIds = Object.keys(services);
    const aliases = Object.values(services).flatMap(s => s.aliases || []);

    // Check for duplicate service IDs
    const idCounts = serviceIds.reduce(
      (acc, id) => {
        acc[id] = (acc[id] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    const duplicateIds = Object.entries(idCounts).filter(([, count]) => count > 1);
    if (duplicateIds.length > 0) {
      console.log('🚨 Duplicate service IDs found:');
      duplicateIds.forEach(([id, count]) => {
        console.log(`  - "${id}" appears ${count} times`);
      });
    }

    // Check for alias conflicts with service IDs
    const aliasConflicts = aliases.filter(alias => serviceIds.includes(alias));
    if (aliasConflicts.length > 0) {
      console.log('🚨 Alias conflicts with service IDs:');
      aliasConflicts.forEach(alias => {
        console.log(`  - "${alias}" is both a service ID and an alias`);
      });
    }

    // Check for duplicate aliases
    const aliasCounts = aliases.reduce(
      (acc, alias) => {
        acc[alias] = (acc[alias] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    const duplicateAliases = Object.entries(aliasCounts).filter(([, count]) => count > 1);
    if (duplicateAliases.length > 0) {
      console.log('⚠️  Duplicate aliases found:');
      duplicateAliases.forEach(([alias, count]) => {
        console.log(`  - "${alias}" appears ${count} times`);
      });
    }

    const hasErrors =
      allErrors.some(error => error.severity === 'error') ||
      duplicateIds.length > 0 ||
      aliasConflicts.length > 0;

    if (hasErrors) {
      console.log('\n🚨 Validation failed! Please fix the errors above.');
      process.exit(1);
    } else {
      console.log('\n✅ All services are valid!');
      console.log(`📦 Successfully validated ${validServices} services`);
    }
  } catch (error) {
    console.error('💥 Error during validation:', error);
    process.exit(1);
  }
}

console.log('🛠️  CSP Kit Service Validator');
console.log('================================');
console.log('This script validates service definitions in data/services/');
console.log('Services are now loaded at runtime from JSONC files.\n');

validateServices().catch(console.error);
