import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Klevu = defineService({
  id: 'klevu',
  name: 'Klevu',
  category: ServiceCategory.OTHER,
  description: 'AI-powered search and discovery platform for e-commerce',
  website: 'https://www.klevu.com/',
  officialDocs: [
    "https://docs.klevu.com/",
    "https://github.com/klevultd/frontend-sdk",
    "https://www.klevu.com/gdpr/"
  ],
  directives: {
    'script-src': ["https://js.klevu.com","https://*.ksearchnet.com"],
    'connect-src': ["https://*.klevu.com","https://*.ksearchnet.com"],
    'img-src': ["https://*.klevu.com","https://*.ksearchnet.com"],
    'style-src': ["https://*.klevu.com","https://*.ksearchnet.com"]
  },
  requiresDynamic: true,
  notes: 'Klevu verified from official documentation and GDPR policy. Uses wildcard domains *.klevu.com and *.ksearchnet.com for CDN, API endpoints, analytics, and search services. Key domains include js.klevu.com, stats.klevu.com, and customer-specific *.ksearchnet.com endpoints.',
  aliases: ["klevu-search"],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-05T00:00:00.000Z'
});
