import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Pinterest = defineService({
  id: 'pinterest',
  name: 'Pinterest',
  category: ServiceCategory.SOCIAL,
  description: 'Pinterest social media platform with Pin It buttons and widgets',
  website: 'https://pinterest.com',
  officialDocs: [
    'https://developers.pinterest.com/docs/web-features/buttons/',
    'https://help.pinterest.com/en/business/article/save-button',
    'https://developers.pinterest.com/tools/widget-builder/',
  ],
  directives: {
    'script-src': ['https://assets.pinterest.com', 'https://log.pinterest.com'],
    'frame-src': ['https://assets.pinterest.com', 'https://www.pinterest.com'],
    'img-src': [
      'https://i.pinimg.com',
      'https://assets.pinterest.com',
      'https://s.pinimg.com',
      'https://log.pinterest.com',
      'data:',
    ],
    'connect-src': ['https://assets.pinterest.com', 'https://log.pinterest.com'],
  },
  notes:
    "Pinterest verified from developer community and CSP discussions. Requires assets.pinterest.com for pinit.js script, log.pinterest.com for analytics/logging. Uses base64 images (data: URIs) for Pinterest logo. Known CSP complexity due to 'weird things' the JavaScript does during execution.",
  aliases: ['pinterest-widget'],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z',
});
