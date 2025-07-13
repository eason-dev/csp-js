import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Okta = defineService({
  id: 'okta',
  name: 'Okta',
  category: ServiceCategory.OTHER,
  description: 'Identity and access management platform',
  website: 'https://www.okta.com/',
  officialDocs: [
    "https://developer.okta.com/docs/guides/content-security-policy/main/",
    "https://developer.okta.com/"
  ],
  directives: {
    'script-src': ["https://oktacdn.com"],
    'connect-src': ["https://*.okta.com","https://*.oktapreview.com"],
    'frame-src': ["https://*.okta.com","https://*.oktapreview.com"]
  },
  requiresDynamic: true,
  notes: 'Okta identity and access management platform. Organization-specific subdomains require wildcard permissions. Preview environments use oktapreview.com domain. Widget embedding requires frame permissions.',
  aliases: ["okta-identity"],
  lastUpdated: '2024-06-29T00:00:00.000Z',
  verifiedAt: '2025-07-03T00:00:00.000Z'
});
