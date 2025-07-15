import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const AdobeAnalytics = defineService({
  id: 'adobe-analytics',
  name: 'Adobe Analytics',
  category: ServiceCategory.ANALYTICS,
  description: 'Enterprise web analytics and digital marketing suite by Adobe',
  website: 'https://business.adobe.com/products/analytics/adobe-analytics.html',
  officialDocs: [
    'https://experienceleague.adobe.com/docs/analytics/implementation/js/overview.html',
    'https://experienceleague.adobe.com/en/docs/id-service/using/reference/csp',
    'https://experienceleague.adobe.com/en/docs/experience-platform/tags/client-side/content-security-policy',
  ],
  directives: {
    'script-src': ['https://assets.adobedtm.com', 'https://*.adobe.com'],
    'connect-src': [
      'https://*.2o7.net',
      'https://*.omtrdc.net',
      'https://*.demdex.net',
      'https://*.adobe.com',
      'https://*.omniture.com',
      'https://*.adobedc.net',
    ],
    'img-src': [
      'https://*.2o7.net',
      'https://*.omtrdc.net',
      'https://*.demdex.net',
      'https://*.adobe.com',
      'https://*.omniture.com',
    ],
  },
  requiresNonce: true,
  notes:
    "Adobe Analytics verified against official Experience League CSP documentation. Requires *.adobe.com for Activity Map, assets.adobedtm.com for tag management, *.demdex.net for Experience Cloud Identity Service, and legacy *.omniture.com domains. Adobe recommends nonce-based CSP over 'unsafe-inline'. *.adobedc.net required for Experience Platform integration.",
  aliases: ['adobe-launch', 'adobe-tags'],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z',
});
