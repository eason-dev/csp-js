import { type CSPService, isCSPService } from '@csp-kit/data';
import type { CSPDirectives } from '@csp-kit/data';
import type { CSPResult, CSPOptions } from './types.js';
import {
  generateNonce,
  mergeCSPDirectives,
  addNonceToDirectives,
  directivesToHeader,
  addSelfDirective,
} from './utils.js';

/**
 * Check if a service is a configured result
 */
function isConfiguredService(service: unknown): service is { directives: CSPDirectives } {
  // A configured service is a partial CSPService returned by configure()
  return (
    service !== null && typeof service === 'object' && 'directives' in service && !('id' in service)
  );
}

/**
 * Generate CSP header from services and options
 */
export function generateCSP(input: CSPService[] | CSPOptions): CSPResult {
  // Normalize input
  const options: CSPOptions = Array.isArray(input) ? { services: input } : input;

  const {
    services,
    nonce: nonceOption = false,
    additionalRules = {},
    reportUri,
    includeSelf = false,
    includeUnsafeInline = false,
    includeUnsafeEval = false,
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
    includeUnsafeInline,
    includeUnsafeEval,
    development,
    production,
    ...envOptions,
  };

  // Track results
  const includedServices: string[] = [];
  const unknownServices: string[] = [];
  const serviceDirectives: CSPDirectives[] = [];

  // Process each service
  const processedServiceIds = new Set<string>();

  for (const serviceItem of finalOptions.services) {
    // Check if this is a configured service partial
    if (isConfiguredService(serviceItem)) {
      // This is a configured service result, just use its directives
      serviceDirectives.push(serviceItem.directives);
      includedServices.push('custom-configured-service');
      continue;
    }

    // Type guard check for full service
    if (!isCSPService(serviceItem)) {
      continue;
    }

    // Now TypeScript knows serviceItem is CSPService
    const service: CSPService = serviceItem;

    // Check for conflicts
    if (service.conflicts) {
      let hasConflict = false;
      for (const conflictId of service.conflicts) {
        if (processedServiceIds.has(conflictId)) {
          hasConflict = true;
          break;
        }
      }
      if (hasConflict) continue;
    }

    // Check if service replaces another
    if (processedServiceIds.has(service.id)) {
      continue;
    }

    processedServiceIds.add(service.id);
    includedServices.push(service.id);

    // Use service directives directly
    serviceDirectives.push(service.directives);
  }

  // Merge all CSP directives including additional rules
  let mergedDirectives = mergeCSPDirectives(
    ...serviceDirectives,
    finalOptions.additionalRules || {}
  );

  // Add 'self' directive if requested
  if (finalOptions.includeSelf) {
    mergedDirectives = addSelfDirective(mergedDirectives);
  }

  // Add unsafe directives if requested
  if (finalOptions.includeUnsafeInline) {
    if (mergedDirectives['script-src']) {
      // Only add if not already present
      if (!mergedDirectives['script-src'].includes("'unsafe-inline'")) {
        mergedDirectives['script-src'].push("'unsafe-inline'");
      }
    }
    if (mergedDirectives['style-src']) {
      // Only add if not already present
      if (!mergedDirectives['style-src'].includes("'unsafe-inline'")) {
        mergedDirectives['style-src'].push("'unsafe-inline'");
      }
    }
  }

  if (finalOptions.includeUnsafeEval && mergedDirectives['script-src']) {
    // Only add if not already present
    if (!mergedDirectives['script-src'].includes("'unsafe-eval'")) {
      mergedDirectives['script-src'].push("'unsafe-eval'");
    }
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

  // Generate headers
  const header = directivesToHeader(mergedDirectives);
  const reportOnlyHeader = header; // Same content, different header name

  return {
    header,
    directives: mergedDirectives,
    reportOnlyHeader,
    includedServices,
    unknownServices,
    nonce,
  };
}

/**
 * Generate CSP header string directly
 */
export function generateCSPHeader(input: CSPService[] | CSPOptions): string {
  return generateCSP(input).header;
}

/**
 * Generate report-only CSP header
 */
export function generateReportOnlyCSP(input: CSPService[] | CSPOptions): CSPResult {
  const result = generateCSP(input);
  return {
    ...result,
    header: result.reportOnlyHeader,
  };
}
