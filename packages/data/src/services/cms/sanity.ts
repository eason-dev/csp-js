import { defineServiceInternal } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Sanity = defineServiceInternal({
  id: 'sanity',
  name: 'Sanity',
  category: ServiceCategory.OTHER,
  description: 'Structured content platform with real-time APIs',
  website: 'https://sanity.io',
  officialDocs: [
    'https://www.sanity.io/docs/',
    'https://www.sanity.io/docs/api-cdn',
    'https://www.sanity.io/docs/security',
  ],
  directives: {
    'script-src': ['https://sanity.io'],
    'connect-src': ['https://api.sanity.io', 'https://cdn.sanity.io', 'wss://*.api.sanity.io'],
    'img-src': ['https://cdn.sanity.io', 'https://lh3.googleusercontent.com'],
  },
  notes:
    "Sanity verified from official API CDN and security documentation. Studio Presentation tool requires iframe CSP adjustments. Global CDN at cdn.sanity.io based on Google CDN. Real-time collaboration requires WebSocket connections (wss://). User avatars from Google (lh3.googleusercontent.com). frame-ancestors 'self' needed for embedded Studio. Avoid access tokens in browser-side JavaScript.",
  aliases: ['sanity-cms'],
  lastUpdated: '2025-06-29T00:00:00Z',
  verifiedAt: '2025-07-03T00:00:00.000Z',
});
