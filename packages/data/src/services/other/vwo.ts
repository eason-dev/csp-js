import { defineServiceInternal } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Vwo = defineServiceInternal({
  id: 'vwo',
  name: 'VWO',
  category: ServiceCategory.OTHER,
  description: 'A/B testing and conversion optimization platform',
  website: 'https://vwo.com/',
  officialDocs: [
    'https://help.vwo.com/hc/en-us/articles/360033730594-Content-Security-Policy-CSP-and-VWO',
    'https://developers.vwo.com/',
  ],
  directives: {
    'script-src': ['https://dev.visualwebsiteoptimizer.com'],
    'style-src': ["'unsafe-inline'"],
    'connect-src': ['https://dev.visualwebsiteoptimizer.com'],
    'img-src': ['https://dev.visualwebsiteoptimizer.com'],
  },
  requiresDynamic: true,
  notes:
    "VWO verified from official CSP documentation. A/B testing platform requires dev.visualwebsiteoptimizer.com for scripts and API calls. Test variations may require 'unsafe-inline' styles for dynamic content modifications. Heatmaps and session recordings may need additional permissions.",
  aliases: ['visual-website-optimizer'],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z',
});
