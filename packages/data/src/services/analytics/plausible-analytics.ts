import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const PlausibleAnalytics = defineService({
  id: 'plausible-analytics',
  name: 'Plausible Analytics',
  category: ServiceCategory.ANALYTICS,
  description: 'Privacy-focused web analytics without cookies or personal data collection',
  website: 'https://plausible.io',
  officialDocs: [
    "https://plausible.io/docs/plausible-script",
    "https://github.com/plausible/docs/issues/20"
  ],
  directives: {
    'script-src': ["https://plausible.io"],
    'connect-src': ["https://plausible.io"]
  },
  notes: 'Plausible Analytics verified from official documentation and GitHub CSP issues. Requires plausible.io for both script loading and data collection. Self-hosted instances require custom domain in CSP. Proxy configurations require additional domain allowlisting. Supports automatic nonce in Discourse integration.',
  aliases: ["plausible"],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z'
});
