import { defineServiceInternal } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const CloudflareAnalytics = defineServiceInternal({
  id: 'cloudflare-analytics',
  name: 'Cloudflare Analytics',
  category: ServiceCategory.ANALYTICS,
  description: 'Web analytics service by Cloudflare with privacy focus',
  website: 'https://cloudflare.com/web-analytics/',
  officialDocs: [
    'https://developers.cloudflare.com/fundamentals/reference/policies-compliances/content-security-policies/',
    'https://support.cloudflare.com/hc/en-us/articles/216537517-What-is-Content-Security-Policy-CSP-and-how-can-I-use-it-with-CloudFlare-',
  ],
  directives: {
    'script-src': ['https://static.cloudflareinsights.com'],
    'connect-src': ['https://cloudflareinsights.com'],
  },
  notes:
    'Cloudflare Analytics verified from official CSP documentation. Requires static.cloudflareinsights.com for script loading and cloudflareinsights.com for data reporting. CSP integration with Cloudflare features requires proper nonce support and /cdn-cgi/challenge-platform/ allowlisting.',
  aliases: ['cf-analytics', 'cloudflare-insights'],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z',
});
