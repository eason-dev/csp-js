import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const GoogleAnalytics = defineService({
  id: 'google-analytics',
  name: 'Google Analytics 4',
  category: ServiceCategory.ANALYTICS,
  description: 'Web analytics service that tracks and reports website traffic and user behavior',
  website: 'https://analytics.google.com/',
  officialDocs: [
    "https://developers.google.com/tag-platform/security/guides/csp",
    "https://developers.google.com/analytics/devguides/collection/ga4",
    "https://www.google.com/supported_domains"
  ],
  directives: {
    'script-src': ["https://*.googletagmanager.com"],
    'img-src': ["https://*.google-analytics.com","https://*.googletagmanager.com","https://*.g.doubleclick.net","https://*.google.com","https://*.google.<TLD>"],
    'connect-src': ["https://*.google-analytics.com","https://*.analytics.google.com","https://*.googletagmanager.com","https://*.g.doubleclick.net","https://*.google.com","https://*.google.<TLD>","https://pagead2.googlesyndication.com"],
    'frame-src': ["https://td.doubleclick.net","https://www.googletagmanager.com"]
  },
  requiresDynamic: true,
  notes: 'For Google Signals (cross-device tracking), use the extended CSP configuration Each Google top-level domain (TLD) must be specified individually in CSP See https://www.google.com/supported_domains for complete list of Google TLDs Nonce-based approach is recommended for inline scripts gtag.js automatically handles most CSP requirements',
  aliases: ["ga4","gtag","google-gtag"],
  lastUpdated: '2024-06-28T00:00:00.000Z',
  verifiedAt: '2025-07-03T00:00:00.000Z'
});
