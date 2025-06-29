import got from 'got';
import { load } from 'cheerio';
import chalk from 'chalk';
import type { ServiceCheckResult } from '../types.js';
import { getService } from '@csp-js/data';

/**
 * Check a service's CSP requirements by analyzing its scripts and resources
 */
export async function checkServiceCSP(
  serviceId: string,
  options: { url?: string; version?: string } = {}
): Promise<ServiceCheckResult> {
  const service = getService(serviceId);
  
  if (!service) {
    return {
      serviceId,
      version: options.version || 'unknown',
      success: false,
      errors: [`Service '${serviceId}' not found`],
      warnings: [],
    };
  }

  const version = options.version || service.defaultVersion;
  const serviceVersion = service.versions[version];
  
  if (!serviceVersion) {
    return {
      serviceId,
      version,
      success: false,
      errors: [`Version '${version}' not found for service '${serviceId}'`],
      warnings: [],
    };
  }

  const result: ServiceCheckResult = {
    serviceId,
    version,
    success: true,
    errors: [],
    warnings: [],
  };

  try {
    // Use provided URL or service monitoring URLs
    const testUrls = options.url 
      ? [options.url] 
      : (service.monitoring?.testUrls || []);

    if (testUrls.length === 0) {
      result.warnings.push('No test URLs available for checking');
      return result;
    }

    // Check each URL and collect CSP requirements
    const detectedCSP: Record<string, Set<string>> = {};
    
    for (const url of testUrls) {
      try {
        console.log(chalk.blue(`Checking ${url}...`));
        
        const response = await got(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; CSP-JS-CLI/1.0)',
          },
          timeout: {
            request: 10000,
          },
        });

        const $ = load(response.body);
        
        // Analyze scripts
        $('script[src]').each((_, element) => {
          const src = $(element).attr('src');
          if (src) {
            const domain = extractDomain(src);
            if (domain) {
              addToCSP(detectedCSP, 'script-src', domain);
            }
          }
        });

        // Analyze stylesheets
        $('link[rel="stylesheet"][href]').each((_, element) => {
          const href = $(element).attr('href');
          if (href) {
            const domain = extractDomain(href);
            if (domain) {
              addToCSP(detectedCSP, 'style-src', domain);
            }
          }
        });

        // Analyze images
        $('img[src]').each((_, element) => {
          const src = $(element).attr('src');
          if (src) {
            const domain = extractDomain(src);
            if (domain) {
              addToCSP(detectedCSP, 'img-src', domain);
            }
          }
        });

        // Analyze iframes
        $('iframe[src]').each((_, element) => {
          const src = $(element).attr('src');
          if (src) {
            const domain = extractDomain(src);
            if (domain) {
              addToCSP(detectedCSP, 'frame-src', domain);
            }
          }
        });

        // Check for potential connect-src requirements by looking for fetch/xhr patterns
        const scriptContent = response.body;
        const fetchPatterns = [
          /fetch\s*\(\s*['"`]([^'"`]+)['"`]/g,
          /XMLHttpRequest.*open\s*\(\s*['"`][^'"`]*['"`]\s*,\s*['"`]([^'"`]+)['"`]/g,
          /\.ajax\s*\(\s*\{[^}]*url\s*:\s*['"`]([^'"`]+)['"`]/g,
        ];

        for (const pattern of fetchPatterns) {
          let match;
          while ((match = pattern.exec(scriptContent)) !== null) {
            const url = match[1];
            if (url) {
              const domain = extractDomain(url);
              if (domain) {
                addToCSP(detectedCSP, 'connect-src', domain);
              }
            }
          }
        }

      } catch (error) {
        result.warnings.push(`Failed to check URL ${url}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    // Convert sets to arrays
    result.detectedCSP = Object.fromEntries(
      Object.entries(detectedCSP).map(([key, value]) => [key, Array.from(value)])
    );

    // Compare with expected CSP
    result.comparisonResult = compareCSP(serviceVersion.csp, result.detectedCSP);

    // Add warnings for differences
    if (Object.keys(result.comparisonResult.missing).length > 0) {
      result.warnings.push('Some expected CSP directives were not detected');
    }
    
    if (Object.keys(result.comparisonResult.extra).length > 0) {
      result.warnings.push('Additional CSP requirements detected');
    }

  } catch (error) {
    result.success = false;
    result.errors.push(`Failed to check service: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  return result;
}

/**
 * Extract domain from URL
 */
function extractDomain(url: string): string | null {
  try {
    // Handle relative URLs
    if (url.startsWith('//')) {
      url = 'https:' + url;
    } else if (url.startsWith('/')) {
      return null; // Skip relative paths
    } else if (!url.includes('://')) {
      return null; // Skip relative URLs without protocol
    }

    const urlObj = new URL(url);
    return `${urlObj.protocol}//${urlObj.host}`;
  } catch {
    return null;
  }
}

/**
 * Add domain to CSP directive
 */
function addToCSP(csp: Record<string, Set<string>>, directive: string, domain: string): void {
  if (!csp[directive]) {
    csp[directive] = new Set();
  }
  csp[directive].add(domain);
}

/**
 * Compare expected CSP with detected CSP
 */
function compareCSP(
  expected: Record<string, string[]>,
  detected: Record<string, string[]>
): {
  missing: Record<string, string[]>;
  extra: Record<string, string[]>;
  matches: Record<string, string[]>;
} {
  const missing: Record<string, string[]> = {};
  const extra: Record<string, string[]> = {};
  const matches: Record<string, string[]> = {};

  // Check for missing directives
  for (const [directive, expectedSources] of Object.entries(expected)) {
    const detectedSources = detected[directive] || [];
    const missingSources = expectedSources.filter(source => !detectedSources.includes(source));
    const matchingSources = expectedSources.filter(source => detectedSources.includes(source));
    
    if (missingSources.length > 0) {
      missing[directive] = missingSources;
    }
    
    if (matchingSources.length > 0) {
      matches[directive] = matchingSources;
    }
  }

  // Check for extra directives
  for (const [directive, detectedSources] of Object.entries(detected)) {
    const expectedSources = expected[directive] || [];
    const extraSources = detectedSources.filter(source => !expectedSources.includes(source));
    
    if (extraSources.length > 0) {
      extra[directive] = extraSources;
    }
  }

  return { missing, extra, matches };
}