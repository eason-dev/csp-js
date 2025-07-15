import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Thinkific = defineService({
  id: 'thinkific',
  name: 'Thinkific',
  category: ServiceCategory.OTHER,
  description: 'Online course creation and student management platform',
  website: 'https://www.thinkific.com/',
  officialDocs: [
    'https://developers.thinkific.com/api/api-documentation/',
    'https://support.thinkific.com/hc/en-us/articles/360030350314-Thinkific-API',
  ],
  directives: {
    'script-src': ['https://thinkific.com', 'https://*.thinkific.com'],
    'frame-src': ['https://thinkific.com', 'https://*.thinkific.com'],
    'connect-src': ['https://api.thinkific.com'],
  },
  notes:
    'Thinkific course platform configuration based on API and general documentation. Official CSP documentation not readily available. Course player requires frame embedding permissions. White-label solutions may use custom domains requiring additional CSP entries.',
  aliases: ['thinkific-courses'],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z',
});
