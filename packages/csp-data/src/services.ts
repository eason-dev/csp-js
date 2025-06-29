import { ServiceDefinition, ServiceRegistry, ServiceCategory } from './types.js';

/**
 * Service definitions - loaded from JSONC files
 * This will be populated by the build process
 */
export const services: Record<string, ServiceDefinition> = {
  'google-analytics': {
    id: 'google-analytics',
    name: 'Google Analytics 4',
    category: ServiceCategory.ANALYTICS,
    description: 'Web analytics service that tracks and reports website traffic',
    website: 'https://analytics.google.com/',
    officialDocs: [
      'https://developers.google.com/tag-platform/security/guides/csp',
      'https://content-security-policy.com/examples/google-analytics/',
    ],
    csp: {
      'script-src': [
        'https://www.googletagmanager.com',
        'https://www.google-analytics.com',
        'https://ssl.google-analytics.com',
      ],
      'img-src': ['https://www.google-analytics.com', 'https://www.googletagmanager.com'],
      'connect-src': [
        'https://www.google-analytics.com',
        'https://analytics.google.com',
        'https://stats.g.doubleclick.net',
      ],
    },
    notes: [
      'For Google Signals (cross-device tracking), additional domains may be required',
      'gtag.js automatically handles most CSP requirements',
      'Consider using nonce-based approach for inline scripts',
    ],
    aliases: ['ga4', 'gtag', 'google-gtag'],
    lastUpdated: '2024-06-28T00:00:00.000Z',
    version: 'GA4',
    requiresDynamic: true,
    requiresNonce: false,
  },

  'microsoft-clarity': {
    id: 'microsoft-clarity',
    name: 'Microsoft Clarity',
    category: ServiceCategory.ANALYTICS,
    description: 'Free user behavior analytics tool with heatmaps and session recordings',
    website: 'https://clarity.microsoft.com/',
    officialDocs: [
      'https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-csp',
      'https://github.com/microsoft/clarity/issues/688',
    ],
    csp: {
      'script-src': ['https://www.clarity.ms'],
      'connect-src': [
        'https://a.clarity.ms',
        'https://b.clarity.ms',
        'https://c.clarity.ms',
        'https://d.clarity.ms',
        'https://e.clarity.ms',
        'https://f.clarity.ms',
        'https://g.clarity.ms',
        'https://h.clarity.ms',
        'https://i.clarity.ms',
        'https://j.clarity.ms',
        'https://k.clarity.ms',
        'https://l.clarity.ms',
        'https://m.clarity.ms',
        'https://n.clarity.ms',
        'https://o.clarity.ms',
        'https://p.clarity.ms',
        'https://q.clarity.ms',
        'https://r.clarity.ms',
        'https://s.clarity.ms',
        'https://t.clarity.ms',
        'https://u.clarity.ms',
        'https://v.clarity.ms',
        'https://w.clarity.ms',
        'https://x.clarity.ms',
        'https://y.clarity.ms',
        'https://z.clarity.ms',
        'https://c.bing.com',
      ],
      'font-src': ["'data:'"],
    },
    notes: [
      'Clarity uses load balancing across multiple subdomains (a-z.clarity.ms)',
      'Font loading via data URLs requires data: in font-src',
      'Future-proof approach: use *.clarity.ms if wildcards are acceptable',
      'Avoid unsafe-inline to maintain security',
    ],
    issues: ['Font loading via data URLs may cause CSP violations if not properly configured'],
    aliases: ['clarity', 'ms-clarity'],
    lastUpdated: '2024-06-28T00:00:00.000Z',
    requiresDynamic: true,
    requiresNonce: false,
  },

  typeform: {
    id: 'typeform',
    name: 'Typeform',
    category: ServiceCategory.FORMS,
    description: 'Online form builder for creating surveys, quizzes, and questionnaires',
    website: 'https://www.typeform.com/',
    officialDocs: [
      'https://community.typeform.com/integrate-your-typeform-43/csp-allowing-form-submissions-to-typeform-via-intercom-integration-9338',
    ],
    csp: {
      'script-src': ['https://embed.typeform.com'],
      'frame-src': ['https://form.typeform.com', 'https://embed.typeform.com'],
      'form-action': ['https://form.typeform.com', 'https://intercom-integration.typeform.com'],
      'connect-src': ['https://api.typeform.com', 'https://form.typeform.com'],
      'img-src': ['https://images.typeform.com'],
    },
    notes: [
      'Embedded forms require frame-src permissions',
      'Intercom integration requires additional form-action permissions',
      'API integration requires connect-src permissions',
    ],
    aliases: ['typeform-embed'],
    lastUpdated: '2024-06-28T00:00:00.000Z',
    requiresDynamic: false,
    requiresNonce: false,
  },

  'google-tag-manager': {
    id: 'google-tag-manager',
    name: 'Google Tag Manager',
    category: ServiceCategory.ANALYTICS,
    description: 'Tag management system for managing marketing and analytics tags',
    website: 'https://tagmanager.google.com/',
    officialDocs: [
      'https://developers.google.com/tag-platform/security/guides/csp',
      'https://www.simoahava.com/analytics/google-tag-manager-content-security-policy/',
    ],
    csp: {
      'script-src': ['https://www.googletagmanager.com'],
      'img-src': ['https://www.googletagmanager.com'],
      'connect-src': ['https://www.googletagmanager.com'],
    },
    notes: [
      'GTM requires nonce implementation for secure inline script execution',
      'Preview mode may require additional permissions',
      'Tags within GTM may require additional CSP rules',
      'Consider using nonce-based approach for optimal security',
    ],
    aliases: ['gtm', 'google-gtm'],
    lastUpdated: '2024-06-28T00:00:00.000Z',
    requiresDynamic: true,
    requiresNonce: true,
  },

  'google-fonts': {
    id: 'google-fonts',
    name: 'Google Fonts',
    category: ServiceCategory.FONTS,
    description: 'Free web font service with hundreds of font families',
    website: 'https://fonts.google.com/',
    officialDocs: ['https://developers.google.com/fonts/docs/getting_started'],
    csp: {
      'style-src': ['https://fonts.googleapis.com'],
      'font-src': ['https://fonts.gstatic.com'],
    },
    notes: [
      'fonts.googleapis.com serves CSS files',
      'fonts.gstatic.com serves the actual font files',
      'Both domains are required for Google Fonts to work properly',
    ],
    aliases: ['gfonts'],
    lastUpdated: '2024-06-28T00:00:00.000Z',
    requiresDynamic: false,
    requiresNonce: false,
  },

  youtube: {
    id: 'youtube',
    name: 'YouTube',
    category: ServiceCategory.VIDEO,
    description: 'Video hosting and embedding service',
    website: 'https://www.youtube.com/',
    officialDocs: ['https://developers.google.com/youtube/iframe_api_reference'],
    csp: {
      'frame-src': ['https://www.youtube.com', 'https://www.youtube-nocookie.com'],
      'script-src': ['https://www.youtube.com', 'https://s.ytimg.com'],
      'img-src': [
        'https://i.ytimg.com',
        'https://i9.ytimg.com',
        'https://ytimg.googleusercontent.com',
      ],
      'connect-src': ['https://www.youtube.com'],
    },
    notes: [
      'youtube-nocookie.com is the privacy-enhanced mode',
      'iframe API requires script-src permissions',
      'Thumbnail images are served from ytimg.com domains',
    ],
    aliases: ['youtube-embed', 'yt'],
    lastUpdated: '2024-06-28T00:00:00.000Z',
    requiresDynamic: false,
    requiresNonce: false,
  },
};

/**
 * Service categories mapping
 */
export const categories: Record<ServiceCategory, string[]> = {
  [ServiceCategory.ANALYTICS]: ['google-analytics', 'microsoft-clarity', 'google-tag-manager'],
  [ServiceCategory.ADVERTISING]: [],
  [ServiceCategory.SOCIAL]: [],
  [ServiceCategory.PAYMENT]: [],
  [ServiceCategory.FORMS]: ['typeform'],
  [ServiceCategory.CHAT]: [],
  [ServiceCategory.CDN]: [],
  [ServiceCategory.FONTS]: ['google-fonts'],
  [ServiceCategory.MAPS]: [],
  [ServiceCategory.VIDEO]: ['youtube'],
  [ServiceCategory.TESTING]: [],
  [ServiceCategory.MONITORING]: [],
  [ServiceCategory.OTHER]: [],
};

/**
 * Service registry with metadata
 */
export const serviceRegistry: ServiceRegistry = {
  services,
  categories,
  lastUpdated: '2024-06-28T00:00:00.000Z',
  version: '0.1.0',
};

/**
 * Get service by ID or alias
 */
export function getService(identifier: string): ServiceDefinition | undefined {
  // Direct lookup
  if (services[identifier]) {
    return services[identifier];
  }

  // Alias lookup
  for (const service of Object.values(services)) {
    if (service.aliases?.includes(identifier)) {
      return service;
    }
  }

  return undefined;
}

/**
 * Get all services in a category
 */
export function getServicesByCategory(category: ServiceCategory): ServiceDefinition[] {
  const serviceIds = categories[category] || [];
  return serviceIds
    .map(id => services[id])
    .filter((service): service is ServiceDefinition => Boolean(service));
}

/**
 * Search services by name or description
 */
export function searchServices(query: string): ServiceDefinition[] {
  const lowerQuery = query.toLowerCase();
  return Object.values(services).filter(
    service =>
      service.name.toLowerCase().includes(lowerQuery) ||
      service.description.toLowerCase().includes(lowerQuery) ||
      service.id.includes(lowerQuery) ||
      service.aliases?.some(alias => alias.includes(lowerQuery))
  );
}
