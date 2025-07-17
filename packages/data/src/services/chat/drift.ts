import { defineServiceInternal } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Drift = defineServiceInternal({
  id: 'drift',
  name: 'Drift',
  category: ServiceCategory.CHAT,
  description: 'Conversational marketing platform with live chat and chatbots',
  website: 'https://drift.com',
  officialDocs: [
    'https://devdocs.drift.com/docs/enabling-drift-in-your-apps-content-security-policy-csp',
    'https://devdocs.drift.com/docs/drift-javascript-api',
  ],
  directives: {
    'script-src': ['https://js.driftt.com', 'https://widget.drift.com'],
    'frame-src': ['https://js.driftt.com', 'https://widget.drift.com'],
    'connect-src': ['wss://customer-api.drift.com', 'https://drift.com'],
  },
  notes:
    'Drift chat widget and conversational marketing platform. Requires js.driftt.com and widget.drift.com for both script and frame sources per official CSP documentation.',
  aliases: ['drift-chat'],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-03T00:00:00.000Z',
});
