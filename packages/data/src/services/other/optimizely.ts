import { defineServiceInternal } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Optimizely = defineServiceInternal({
  id: 'optimizely',
  name: 'Optimizely',
  category: ServiceCategory.OTHER,
  description: 'A/B testing and experimentation platform for digital optimization',
  website: 'https://www.optimizely.com/',
  officialDocs: [
    'https://docs.developers.optimizely.com/web/docs/content-security-policy',
    'https://docs.developers.optimizely.com/',
  ],
  directives: {
    'script-src': ['https://cdn.optimizely.com'],
    'style-src': ["'unsafe-inline'"],
    'connect-src': ['https://logx.optimizely.com', 'https://p13nlog.dz.optimizely.com'],
    'img-src': ['https://cdn.optimizely.com'],
  },
  requiresDynamic: true,
  notes:
    "Optimizely verified from official CSP documentation. Requires cdn.optimizely.com for JavaScript SDK, logx.optimizely.com and p13nlog.dz.optimizely.com for event tracking. Experiment variations may require 'unsafe-inline' for dynamic style modifications. Custom events tracking needs additional connect sources.",
  aliases: ['optimizely-web'],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z',
});
