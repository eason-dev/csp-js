import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const CrazyEgg = defineService({
  id: 'crazy-egg',
  name: 'Crazy Egg',
  category: ServiceCategory.OTHER,
  description: 'Heatmap and user behavior analytics platform',
  website: 'https://www.crazyegg.com/',
  officialDocs: [
    'https://support.crazyegg.com/hc/en-us/articles/115003890728-Content-Security-Policy-CSP-',
    'https://www.crazyegg.com/help/',
  ],
  directives: {
    'script-src': ['https://script.crazyegg.com'],
    'style-src': ["'unsafe-inline'"],
    'connect-src': ['https://crazyegg.com'],
    'img-src': ['https://crazyegg.com'],
  },
  requiresDynamic: true,
  notes:
    "Crazy Egg verified from official CSP documentation. Requires script.crazyegg.com for tracking scripts and crazyegg.com for data collection. Heatmap overlays may require 'unsafe-inline' styles for dynamic visualization. Recording features may need additional permissions.",
  aliases: ['crazyegg'],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z',
});
