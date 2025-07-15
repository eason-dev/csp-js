import { defineServiceInternal } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Webflow = defineServiceInternal({
  id: 'webflow',
  name: 'Webflow',
  category: ServiceCategory.OTHER,
  description: 'Visual web development platform for designers',
  website: 'https://webflow.com/',
  officialDocs: [
    'https://developers.webflow.com/',
    'https://university.webflow.com/lesson/custom-code-in-the-head-and-body-tags',
    'https://help.webflow.com/hc/en-us/articles/33961369170963-Custom-security-headers',
    'https://university.webflow.com/lesson/custom-code-embed',
  ],
  directives: {
    'script-src': ['https://webflow.com', 'https://d3e54v103j8qbb.cloudfront.net'],
    'connect-src': ['https://api.webflow.com'],
    'img-src': ['https://uploads-ssl.webflow.com'],
  },
  notes:
    "Webflow verified from official documentation. ENTERPRISE ONLY: Custom security headers available only on Enterprise plans ($15k+ annually). Paying customers request broader CSP access. Custom code blocked by default CSP. Community reports script-src 'none' blocking custom JavaScript. Cloudflare workaround available for non-Enterprise users.",
  aliases: ['webflow-cms'],
  lastUpdated: '2024-06-29T00:00:00.000Z',
  verifiedAt: '2025-07-03T00:00:00.000Z',
});
