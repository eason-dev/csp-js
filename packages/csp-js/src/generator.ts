import { getService, type CSPDirectives } from '@csp-js/data';
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
  const options: CSPOptions = Array.isArray(input) 
    ? { services: input }
    : input;
  
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
  
  // Process each service
  for (const serviceName of services) {
    const service = getService(serviceName);
    if (service) {
      includedServices.push(service.id);
      serviceDirectives.push(service.csp);
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
  
  // Generate warnings
  const warnings = validateDirectives(mergedDirectives);
  
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
  const options = Array.isArray(input) ? { services: input, reportOnly: true } : { ...input, reportOnly: true };
  return generateCSP(options).reportOnlyHeader;
}