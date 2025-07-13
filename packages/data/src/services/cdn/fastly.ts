import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Fastly = defineService({
  id: 'fastly',
  name: 'Fastly',
  category: ServiceCategory.CDN,
  description: 'Edge cloud platform and content delivery network',
  website: 'https://www.fastly.com',
  officialDocs: [
    "https://docs.fastly.com/",
    "https://docs.fastly.com/en/guides/content-security-policy"
  ],
  directives: {
    'script-src': ["https://*.fastly.com"],
    'connect-src': ["https://*.fastly.com"],
    'img-src': ["https://*.fastly.com"],
    'style-src': ["https://*.fastly.com"]
  },
  notes: 'Fastly CDN services and edge computing platform. Replace *.fastly.com with your specific Fastly subdomain. Supports Client-Side Protection with CSP policy management.',
  aliases: ["fastly-cdn"],
  lastUpdated: '2025-06-29T00:00:00Z',
  verifiedAt: '2025-07-03T00:00:00.000Z'
});
