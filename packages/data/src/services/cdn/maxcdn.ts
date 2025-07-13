import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Maxcdn = defineService({
  id: 'maxcdn',
  name: 'MaxCDN',
  category: ServiceCategory.CDN,
  description: 'Content delivery network (now part of StackPath) - SERVICE DISCONTINUED',
  website: 'https://www.maxcdn.com',
  officialDocs: [
    "https://support.stackpath.com/hc/en-us/categories/360001091912-MaxCDN"
  ],
  directives: {
    'script-src': ["https://*.maxcdn.com"],
    'connect-src': ["https://*.maxcdn.com"],
    'img-src': ["https://*.maxcdn.com"],
    'style-src': ["https://*.maxcdn.com"]
  },
  notes: 'MaxCDN/StackPath CDN service was DISCONTINUED in November 2023. Official documentation no longer maintained. Historical CSP configuration for legacy implementations only.',
  aliases: ["stackpath-legacy","stackpath"],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z'
});
