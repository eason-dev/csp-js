import { defineServiceInternal } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const GoogleTagManager = defineServiceInternal({
  id: 'google-tag-manager',
  name: 'Google Tag Manager',
  category: ServiceCategory.ANALYTICS,
  description: 'Tag management system for managing marketing and analytics tags',
  website: 'https://tagmanager.google.com/',
  officialDocs: [
    'https://developers.google.com/tag-platform/security/guides/csp',
    'https://developers.google.com/tag-manager/quickstart',
  ],
  directives: {
    'script-src': ['https://www.googletagmanager.com', 'https://*.googletagmanager.com'],
    'img-src': ['https://www.googletagmanager.com', 'https://*.googletagmanager.com'],
    'connect-src': ['https://www.googletagmanager.com', 'https://*.googletagmanager.com'],
  },
  requiresDynamic: true,
  requiresNonce: true,
  notes:
    "Google Tag Manager verified against official CSP guide. GTM requires nonce implementation for secure inline script execution (preferred method). Preview mode requires additional domains. GTM may require 'unsafe-eval' for Custom JavaScript Variables. Tags within GTM may require additional CSP rules specific to each tag.",
  aliases: ['gtm', 'google-gtm'],
  lastUpdated: '2024-06-28T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z',
});
