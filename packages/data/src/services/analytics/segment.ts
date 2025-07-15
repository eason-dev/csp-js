import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Segment = defineService({
  id: 'segment',
  name: 'Segment',
  category: ServiceCategory.ANALYTICS,
  description: 'Customer data platform for collecting, cleaning, and controlling customer data',
  website: 'https://segment.com',
  officialDocs: [
    'https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/faq/',
    'https://segment.com/docs/connections/sources/custom-domain/',
  ],
  directives: {
    'script-src': ['https://cdn.segment.com'],
    'connect-src': ['https://api.segment.io', 'https://events.eu1.segmentapis.com'],
  },
  notes:
    'Segment verified from official FAQ and Custom Domain documentation. Requires cdn.segment.com for Analytics.js library and api.segment.io for event tracking. EU workspaces use events.eu1.segmentapis.com endpoint. Supports nonce-based CSP and custom domain proxying.',
  aliases: ['segment-analytics'],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z',
});
