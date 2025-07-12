import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Constructor = defineService({
  id: 'constructor',
  name: 'Constructor',
  category: ServiceCategory.OTHER,
  description: 'Product search and discovery platform for e-commerce',
  website: 'https://constructor.io/',
  officialDocs: [
    "https://docs.constructor.io/",
    "https://docs.constructor.io/build/integration-guides/javascript-client/"
  ],
  directives: {
    'script-src': ["https://cnstrc.com"],
    'connect-src': ["https://ac.cnstrc.com"]
  },
  notes: 'Constructor.io configuration based on general documentation - no specific CSP documentation found. cnstrc.com hosts JavaScript files and custom bundles. ac.cnstrc.com used for API endpoints including collections, search, autocomplete, browse, and recommendations. Contact Constructor.io support for complete CSP requirements.',
  aliases: ["constructor-io"],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z'
});
