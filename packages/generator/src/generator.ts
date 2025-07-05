import { getService, getServiceAsync, loadServices, type CSPDirectives } from '@csp-kit/data';
import type { CSPOptions, CSPResult } from './types.js';
import {
  generateNonce,
  mergeCSPDirectives,
  addNonceToDirectives,
  directivesToHeader,
  addSelfDirective,
  validateDirectives,
} from './utils.js';

/**
 * Generate CSP header from service names and options
 */
export function generateCSP(input: string[] | CSPOptions): CSPResult {
  // Normalize input
  const options: CSPOptions = Array.isArray(input) ? { services: input } : input;

  const {
    services,
    nonce: nonceOption = false,
    customRules = {},
    reportUri,
    includeSelf = true,
    unsafeInline = false,
    unsafeEval = false,
  } = options;

  // Track results
  const includedServices: string[] = [];
  const unknownServices: string[] = [];
  const serviceDirectives: CSPDirectives[] = [];
  const warnings: string[] = [];

  // Process each service
  for (const serviceName of services) {
    const service = getService(serviceName);
    if (service) {
      includedServices.push(service.id);

      // Get CSP rules from simplified format
      serviceDirectives.push(service.cspDirectives);
    } else {
      unknownServices.push(serviceName);
    }
  }

  // Merge all CSP directives
  let mergedDirectives = mergeCSPDirectives(...serviceDirectives, customRules);

  // Add 'self' directive if requested
  if (includeSelf) {
    mergedDirectives = addSelfDirective(mergedDirectives);
  }

  // Add unsafe directives if requested (not recommended)
  if (unsafeInline) {
    if (mergedDirectives['script-src']) {
      mergedDirectives['script-src'].push("'unsafe-inline'");
    }
    if (mergedDirectives['style-src']) {
      mergedDirectives['style-src'].push("'unsafe-inline'");
    }
  }

  if (unsafeEval && mergedDirectives['script-src']) {
    mergedDirectives['script-src'].push("'unsafe-eval'");
  }

  // Handle nonce generation
  let nonce: string | undefined;
  if (nonceOption) {
    nonce = typeof nonceOption === 'string' ? nonceOption : generateNonce();
    mergedDirectives = addNonceToDirectives(mergedDirectives, nonce);
  }

  // Add report URI if specified
  if (reportUri) {
    mergedDirectives['report-uri'] = [reportUri];
  }

  // Generate validation warnings and merge with existing warnings
  const validationWarnings = validateDirectives(mergedDirectives);
  warnings.push(...validationWarnings);

  if (unknownServices.length > 0) {
    warnings.push(`Unknown services: ${unknownServices.join(', ')}`);
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
    warnings,
    nonce,
  };
}

/**
 * Generate CSP header string only (convenience function)
 */
export function generateCSPHeader(input: string[] | CSPOptions): string {
  return generateCSP(input).header;
}

/**
 * Generate report-only CSP header for testing
 */
export function generateReportOnlyCSP(input: string[] | CSPOptions): string {
  const options = Array.isArray(input)
    ? { services: input, reportOnly: true }
    : { ...input, reportOnly: true };
  return generateCSP(options).reportOnlyHeader;
}

/**
 * Generate CSP header from service names and options (async version)
 */
export async function generateCSPAsync(input: string[] | CSPOptions): Promise<CSPResult> {
  // Ensure services are loaded
  await loadServices();

  // Normalize input
  const options: CSPOptions = Array.isArray(input) ? { services: input } : input;

  const {
    services,
    nonce: nonceOption = false,
    customRules = {},
    reportUri,
    includeSelf = true,
    unsafeInline = false,
    unsafeEval = false,
  } = options;

  // Track results
  const includedServices: string[] = [];
  const unknownServices: string[] = [];
  const serviceDirectives: CSPDirectives[] = [];
  const warnings: string[] = [];

  // Process each service
  for (const serviceName of services) {
    const service = await getServiceAsync(serviceName);
    if (service) {
      includedServices.push(service.id);

      // Get CSP rules from simplified format
      serviceDirectives.push(service.cspDirectives);
    } else {
      unknownServices.push(serviceName);
    }
  }

  // Merge all CSP directives
  let mergedDirectives = mergeCSPDirectives(...serviceDirectives, customRules);

  // Add 'self' directive if requested
  if (includeSelf) {
    mergedDirectives = addSelfDirective(mergedDirectives);
  }

  // Add unsafe directives if requested (not recommended)
  if (unsafeInline) {
    if (mergedDirectives['script-src']) {
      mergedDirectives['script-src'].push("'unsafe-inline'");
    }
    if (mergedDirectives['style-src']) {
      mergedDirectives['style-src'].push("'unsafe-inline'");
    }
  }

  if (unsafeEval && mergedDirectives['script-src']) {
    mergedDirectives['script-src'].push("'unsafe-eval'");
  }

  // Handle nonce generation
  let nonce: string | undefined;
  if (nonceOption) {
    nonce = typeof nonceOption === 'string' ? nonceOption : generateNonce();
    mergedDirectives = addNonceToDirectives(mergedDirectives, nonce);
  }

  // Add report URI if specified
  if (reportUri) {
    mergedDirectives['report-uri'] = [reportUri];
  }

  // Generate validation warnings and merge with existing warnings
  const validationWarnings = validateDirectives(mergedDirectives);
  warnings.push(...validationWarnings);

  if (unknownServices.length > 0) {
    warnings.push(`Unknown services: ${unknownServices.join(', ')}`);
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
    warnings,
    nonce,
  };
}

/**
 * Generate CSP header string only (async convenience function)
 */
export async function generateCSPHeaderAsync(input: string[] | CSPOptions): Promise<string> {
  const result = await generateCSPAsync(input);
  return result.header;
}

/**
 * Generate report-only CSP header for testing (async version)
 */
export async function generateReportOnlyCSPAsync(input: string[] | CSPOptions): Promise<string> {
  const options = Array.isArray(input)
    ? { services: input, reportOnly: true }
    : { ...input, reportOnly: true };
  const result = await generateCSPAsync(options);
  return result.reportOnlyHeader;
}
