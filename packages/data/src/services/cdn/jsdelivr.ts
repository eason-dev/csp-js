import { defineServiceInternal } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Jsdelivr = defineServiceInternal({
  id: 'jsdelivr',
  name: 'jsDelivr',
  category: ServiceCategory.CDN,
  description: 'Free CDN for open source projects and NPM packages',
  website: 'https://jsdelivr.com',
  officialDocs: ['https://www.jsdelivr.com/', 'https://github.com/jsdelivr/jsdelivr'],
  directives: {
    'script-src': ['https://cdn.jsdelivr.net'],
    'style-src': ['https://cdn.jsdelivr.net'],
    'font-src': ['https://cdn.jsdelivr.net'],
    'img-src': ['https://cdn.jsdelivr.net'],
  },
  notes:
    'jsDelivr verified from developer community discussions and GitHub issues. Primary CDN domain cdn.jsdelivr.net required for script-src, style-src, font-src, and img-src. Supports specific path restrictions for enhanced security. Can use Report-Only mode for CSP testing.',
  aliases: ['jsdelivr-cdn'],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z',
});
