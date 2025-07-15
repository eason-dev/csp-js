import { defineServiceInternal } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const GoogleAds = defineServiceInternal({
  id: 'google-ads',
  name: 'Google Ads',
  category: ServiceCategory.ADVERTISING,
  description: "Google's online advertising and marketing platform",
  website: 'https://ads.google.com',
  officialDocs: [
    'https://developers.google.com/tag-platform/security/guides/csp',
    'https://developers.google.com/publisher-tag/guides/content-security-policy',
  ],
  directives: {
    'script-src': [
      'https://googleadservices.com',
      'https://www.googleadservices.com',
      'https://pagead2.googlesyndication.com',
    ],
    'connect-src': ['https://google.com', 'https://www.google.com', 'https://googleadservices.com'],
    'img-src': ['https://googleadservices.com', 'https://www.googleadservices.com'],
  },
  requiresDynamic: true,
  requiresNonce: true,
  notes:
    'Google Ads verified from official Google Tag Platform CSP documentation. Supports conversion tracking, remarketing, and Google Publisher Tags. Strongly recommends nonce-based CSP due to dynamic domain usage. Requires individual Google TLD specifications. Each Google top-level domain must be specified individually.',
  aliases: ['google-adwords', 'adwords'],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z',
});
