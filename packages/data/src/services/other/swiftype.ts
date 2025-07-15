import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Swiftype = defineService({
  id: 'swiftype',
  name: 'Swiftype',
  category: ServiceCategory.OTHER,
  description: 'Search platform for websites (now part of Elastic Enterprise Search)',
  website: 'https://swiftype.com/',
  officialDocs: [
    'https://swiftype.com/documentation/',
    'https://www.elastic.co/guide/en/enterprise-search/current/index.html',
    'https://swiftype.com/documentation/site-search/overview',
  ],
  directives: {
    'script-src': ['https://s.swiftypecdn.com'],
    'connect-src': [
      'https://search-api.swiftype.com',
      'https://api.swiftype.com',
      'https://*.api.swiftype.com',
    ],
    'img-src': ['https://ma.swiftypecdn.com'],
  },
  notes:
    'Swiftype verified from official documentation. Uses s.swiftypecdn.com for JavaScript embed, search-api.swiftype.com and api.swiftype.com for API calls. Service now part of Elastic Enterprise Search. Legacy implementations may still require these domains.',
  aliases: ['swiftype-search'],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-05T00:00:00.000Z',
});
