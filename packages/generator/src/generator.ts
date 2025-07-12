import { type CSPService, isCSPService } from '@csp-kit/data';
import type { CSPDirectives } from '@csp-kit/data';
import type { CSPResult, CSPOptionsV2 } from './types.js';
import {
  generateNonce,
  mergeCSPDirectives,
  addNonceToDirectives,
  directivesToHeader,
  addSelfDirective,
  validateDirectives,
} from './utils.js';

/**
 * Check if a service is a configured result
 */
function isConfiguredService(service: unknown): boolean {
  // A configured service is a partial CSPService returned by configure()
  return service && typeof service === 'object' && 'directives' in service && !('id' in service);
}

/**
 * Generate CSP header from services and options (new API)
 */
export function generateCSP(input: CSPService[] | CSPOptionsV2): CSPResult {
  // Normalize input
  const options: CSPOptionsV2 = Array.isArray(input) ? { services: input } : input;

  const {
    services,
    nonce: nonceOption = false,
    additionalRules = {},
    reportUri,
    includeSelf = true,
    unsafeInline = false,
    unsafeEval = false,
    development = {},
    production = {},
  } = options;

  // Apply environment-specific options
  const envOptions = process.env.NODE_ENV === 'production' ? production : development;
  const finalOptions = {
    services,
    nonce: nonceOption,
    additionalRules,
    reportUri,
    includeSelf,
    unsafeInline,
    unsafeEval,
    development,
    production,
    ...envOptions,
  };

  // Track results
  const includedServices: string[] = [];
  const unknownServices: string[] = [];
  const serviceDirectives: CSPDirectives[] = [];
  const warnings: string[] = [];
  const conflicts: string[] = [];

  // Process each service
  const processedServiceIds = new Set<string>();
  
  for (const service of finalOptions.services) {
    // Check if this is a configured service partial
    if (isConfiguredService(service)) {
      // This is a configured service result, just use its directives
      serviceDirectives.push(service.directives);
      includedServices.push('custom-configured-service');
      continue;
    }

    // Type guard check for full service
    if (!isCSPService(service)) {
      warnings.push(`Invalid service object provided`);
      continue;
    }

    // Check for conflicts
    if (service.conflicts) {
      for (const conflictId of service.conflicts) {
        if (processedServiceIds.has(conflictId)) {
          conflicts.push(`${service.id} conflicts with ${conflictId}`);
          warnings.push(`Service ${service.id} conflicts with already included ${conflictId}, skipping`);
          continue;
        }
      }
    }

    // Check if service replaces another
    if (processedServiceIds.has(service.id)) {
      warnings.push(`Duplicate service ${service.id}, skipping`);
      continue;
    }

    processedServiceIds.add(service.id);
    includedServices.push(service.id);

    // Use service directives directly
    serviceDirectives.push(service.directives);

    // Run validation if available
    if (service.validate) {
      const validation = service.validate(service.directives);
      if (validation.warnings) {
        warnings.push(...validation.warnings.map(w => `[${service.id}] ${w}`));
      }
      if (validation.errors) {
        warnings.push(...validation.errors.map(e => `[${service.id}] ERROR: ${e}`));
      }
    }

    // Check for deprecation
    if (service.deprecated) {
      warnings.push(
        `Service ${service.id} is deprecated since ${service.deprecated.since}. ` +
        `${service.deprecated.message} Use ${service.deprecated.alternative} instead.`
      );
    }
  }

  // Merge all CSP directives including additional rules
  let mergedDirectives = mergeCSPDirectives(...serviceDirectives, finalOptions.additionalRules || {});

  // Add 'self' directive if requested
  if (finalOptions.includeSelf) {
    mergedDirectives = addSelfDirective(mergedDirectives);
  }

  // Add unsafe directives if requested (not recommended)
  if (finalOptions.unsafeInline) {
    if (mergedDirectives['script-src']) {
      mergedDirectives['script-src'].push("'unsafe-inline'");
    }
    if (mergedDirectives['style-src']) {
      mergedDirectives['style-src'].push("'unsafe-inline'");
    }
    warnings.push("Using 'unsafe-inline' is not recommended for production");
  }

  if (finalOptions.unsafeEval && mergedDirectives['script-src']) {
    mergedDirectives['script-src'].push("'unsafe-eval'");
    warnings.push("Using 'unsafe-eval' is not recommended for production");
  }

  // Handle nonce generation
  let nonce: string | undefined;
  if (nonceOption) {
    nonce = typeof nonceOption === 'string' ? nonceOption : generateNonce();
    mergedDirectives = addNonceToDirectives(mergedDirectives, nonce);
  }

  // Add report URI if specified
  if (finalOptions.reportUri) {
    mergedDirectives['report-uri'] = [finalOptions.reportUri];
  }

  // Generate validation warnings and merge with existing warnings
  const validationWarnings = validateDirectives(mergedDirectives);
  warnings.push(...validationWarnings);

  // Generate headers
  const header = directivesToHeader(mergedDirectives);
  const reportOnlyHeader = header; // Same content, different header name

  return {
    header,
    directives: mergedDirectives,
    reportOnlyHeader,
    includedServices,
    unknownServices,
    warnings,
    nonce,
  };
}

/**
 * Generate CSP header string directly
 */
export function generateCSPHeader(input: CSPService[] | CSPOptionsV2): string {
  return generateCSP(input).header;
}

/**
 * Generate report-only CSP header
 */
export function generateReportOnlyCSP(input: CSPService[] | CSPOptionsV2): CSPResult {
  const result = generateCSP(input);
  return {
    ...result,
    header: result.reportOnlyHeader,
  };
}