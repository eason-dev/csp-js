import { defineServiceInternal } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Hotjar = defineServiceInternal({
  id: 'hotjar',
  name: 'Hotjar',
  category: ServiceCategory.ANALYTICS,
  description: 'Website heatmaps, visitor recordings, and user feedback analytics tool',
  website: 'https://hotjar.com',
  officialDocs: [
    'https://help.hotjar.com/hc/en-us/articles/115009336727-Content-Security-Policy-CSP-',
    'https://help.hotjar.com/hc/en-us/articles/115009336727',
  ],
  directives: {
    'script-src': ['https://*.hotjar.com', "'unsafe-inline'"],
    'connect-src': ['https://*.hotjar.com', 'https://*.hotjar.io', 'wss://*.hotjar.com'],
    'img-src': ['https://*.hotjar.com'],
    'font-src': ['https://*.hotjar.com'],
    'style-src': ['https://*.hotjar.com', "'unsafe-inline'"],
  },
  requiresDynamic: true,
  notes:
    "Hotjar verified against official CSP documentation. Requires *.hotjar.com for scripts/styles/images/fonts, *.hotjar.io for WebSocket connections, and 'unsafe-inline' for dynamic content injection. WebSocket connection (wss://) required for real-time features.",
  aliases: ['hotjar-analytics'],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z',
});
