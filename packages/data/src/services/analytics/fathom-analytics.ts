import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const FathomAnalytics = defineService({
  id: 'fathom-analytics',
  name: 'Fathom Analytics',
  category: ServiceCategory.ANALYTICS,
  description: 'Privacy-first website analytics without cookies',
  website: 'https://usefathom.com',
  officialDocs: [
    "https://usefathom.com/docs/troubleshooting/not-working",
    "https://usefathom.com/docs/integrations/discourse"
  ],
  directives: {
    'script-src': ["https://cdn.usefathom.com"],
    'connect-src': ["https://api.usefathom.com"]
  },
  notes: 'Fathom Analytics verified from official troubleshooting documentation. Requires CSP allowlisting for script.js from their CDN. Uses EU-based bunny.net CDN for GDPR compliance with EU data isolation. No cookies or personal data collection.',
  aliases: ["fathom"],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z'
});
