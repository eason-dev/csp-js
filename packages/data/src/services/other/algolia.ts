import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Algolia = defineService({
  id: 'algolia',
  name: 'Algolia',
  category: ServiceCategory.OTHER,
  description: 'Search and discovery API platform for websites and applications',
  website: 'https://www.algolia.com/',
  officialDocs: [
    "https://support.algolia.com/hc/en-us/articles/8947249849873-How-do-I-fix-Content-Security-Policy-CSP-errors-on-my-site",
    "https://www.algolia.com/doc/guides/security/security-best-practices/"
  ],
  directives: {
    'script-src': ["https://cdn.jsdelivr.net"],
    'connect-src': ["https://*.algolia.net","https://*.algolianet.com","https://*.algolia.io"],
    'style-src': ["'unsafe-inline'"]
  },
  requiresDynamic: true,
  notes: 'Algolia verified from official CSP documentation. Requires *.algolia.net, *.algolianet.com, *.algolia.io for API connections. InstantSearch with insights needs cdn.jsdelivr.net for search-insights library. Some InstantSearch versions may require \'unsafe-eval\' for JavaScript evaluation. Application-specific subdomains require wildcard permissions.',
  aliases: ["algolia-search"],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z'
});
