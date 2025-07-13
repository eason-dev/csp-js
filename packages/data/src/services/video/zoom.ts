import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Zoom = defineService({
  id: 'zoom',
  name: 'Zoom',
  category: ServiceCategory.VIDEO,
  description: 'Video conferencing and communication platform',
  website: 'https://zoom.us',
  officialDocs: [
    "https://developers.zoom.us/docs/meeting-sdk/web/",
    "https://devforum.zoom.us/t/what-is-an-appropiate-content-security-policy-csp-for-embedding-an-application-on-the-zoom-client/73158",
    "https://devforum.zoom.us/t/content-securty-policy/5945"
  ],
  directives: {
    'script-src': ["https://source.zoom.us","https://*.zoom.us","'unsafe-eval'"],
    'frame-src': ["https://*.zoom.us"],
    'connect-src': ["https://*.zoom.us","wss://*.zoom.us"],
    'worker-src': ["blob:"],
    'font-src': ["data:"]
  },
  requiresDynamic: true,
  notes: 'Zoom Web SDK verified from official developer forum discussions. Requires \'unsafe-eval\' for SDK functionality, blob: worker-src for WebRTC workers, data: font-src for embedded fonts, and websocket connections (wss://*.zoom.us). Meeting SDK uses react-dom with Web Workers requiring blob: worker-src directive.',
  aliases: ["zoom-video"],
  lastUpdated: '2025-06-29T00:00:00Z',
  verifiedAt: '2025-07-03T00:00:00.000Z'
});
