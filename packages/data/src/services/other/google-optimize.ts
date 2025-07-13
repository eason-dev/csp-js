import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const GoogleOptimize = defineService({
  id: 'google-optimize',
  name: 'Google Optimize',
  category: ServiceCategory.OTHER,
  description: 'Google\'s A/B testing and website optimization platform (deprecated September 2023)',
  website: 'https://optimize.google.com/',
  officialDocs: [
    "https://support.google.com/optimize/answer/7359264",
    "https://developers.google.com/optimize/"
  ],
  directives: {
    'script-src': ["https://www.googleoptimize.com"],
    'connect-src': ["https://www.googleoptimize.com"]
  },
  requiresDynamic: true,
  notes: 'Google Optimize service was DEPRECATED on September 30, 2023. Official documentation no longer maintained. Historical CSP configuration for legacy implementations only. Migrate to Google Analytics 4 experiments or other A/B testing platforms.',
  aliases: ["google-optimize-360"],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z'
});
