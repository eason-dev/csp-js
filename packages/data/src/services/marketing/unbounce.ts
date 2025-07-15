import { defineServiceInternal } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Unbounce = defineServiceInternal({
  id: 'unbounce',
  name: 'Unbounce',
  category: ServiceCategory.OTHER,
  description: 'Landing page builder with A/B testing and conversion optimization',
  website: 'https://unbounce.com/',
  officialDocs: [
    'https://developer.unbounce.com/',
    'https://documentation.unbounce.com/hc/en-us/articles/203879070-Adding-Custom-JavaScript-and-CSS-in-the-Classic-Builder',
    'https://unbounce.com/product/security/',
  ],
  directives: {
    'script-src': ['https://unbounce.com'],
    'connect-src': ['https://unbounce.com'],
  },
  notes:
    'Unbounce verified from official documentation. No specific official CSP documentation found. Custom JavaScript and CSS supported in Classic Builder. API available on all pricing plans. HTTPS/SSL enforced with industry-leading security protocols. Contact support for CSP-specific requirements. Community forums available for developer discussions.',
  aliases: ['unbounce-landing'],
  lastUpdated: '2024-06-29T00:00:00.000Z',
  verifiedAt: '2025-07-03T00:00:00.000Z',
});
