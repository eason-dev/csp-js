import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const JitsiMeet = defineService({
  id: 'jitsi-meet',
  name: 'Jitsi Meet',
  category: ServiceCategory.VIDEO,
  description: 'Open-source video conferencing platform',
  website: 'https://meet.jit.si',
  officialDocs: [
    "https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe",
    "https://github.com/jitsi/jitsi-meet/blob/master/doc/api.md"
  ],
  directives: {
    'script-src': ["https://meet.jit.si","'unsafe-inline'"],
    'style-src': ["'unsafe-inline'"],
    'frame-src': ["https://meet.jit.si"],
    'connect-src': ["https://meet.jit.si","wss://meet.jit.si"],
    'img-src': ["https:","data:"],
    'media-src': ["'self'","data:"]
  },
  requiresDynamic: true,
  notes: 'Jitsi Meet verified from official iframe API documentation and community forums. CRITICAL SECURITY LIMITATION: Requires \'unsafe-inline\' for script-src and style-src - will not function without it. Known CSP security weakness. Nonce implementation discussed but not implemented. WebSocket connections for real-time communication. iframe API well-documented for embedding.',
  aliases: ["jitsi"],
  lastUpdated: '2025-06-29T00:00:00Z',
  verifiedAt: '2025-07-03T00:00:00.000Z'
});
