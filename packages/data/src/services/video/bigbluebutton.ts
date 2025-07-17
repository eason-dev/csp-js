import { defineServiceInternal } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Bigbluebutton = defineServiceInternal({
  id: 'bigbluebutton',
  name: 'BigBlueButton',
  category: ServiceCategory.VIDEO,
  description: 'Open-source web conferencing system for distance education',
  website: 'https://bigbluebutton.org',
  officialDocs: ['https://docs.bigbluebutton.org/', 'https://docs.bigbluebutton.org/dev/api.html'],
  directives: {
    'script-src': ['https://*.bigbluebutton.org'],
    'frame-src': ['https://*.bigbluebutton.org'],
    'connect-src': ['https://*.bigbluebutton.org', 'wss://*.bigbluebutton.org'],
  },
  notes:
    'BigBlueButton verified from community documentation and GitHub issues. Limited official CSP documentation available. iframe embedding requires SSL for WebRTC (camera, microphone, screen sharing). X-Frame-Options set to SAMEORIGIN by default in Greenlight. iframe needs allow permissions for geolocation, microphone, camera, display-capture. WebSocket connections required for real-time communication. iframe embedding not supported by default - may need provider request.',
  aliases: ['bbb'],
  lastUpdated: '2025-06-29T00:00:00Z',
  verifiedAt: '2025-07-03T00:00:00.000Z',
});
