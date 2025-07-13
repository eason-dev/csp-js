import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const GoogleMeet = defineService({
  id: 'google-meet',
  name: 'Google Meet',
  category: ServiceCategory.VIDEO,
  description: 'Google\'s video conferencing and online meeting platform',
  website: 'https://meet.google.com',
  officialDocs: [
    "https://developers.google.com/meet/",
    "https://developers.google.com/meet/add-ons"
  ],
  directives: {
    'script-src': ["https://meet.google.com"],
    'frame-src': ["https://meet.google.com"],
    'connect-src': ["https://meet.google.com"]
  },
  notes: 'Google Meet verified from community documentation. CRITICAL LIMITATION: Google Meet does NOT allow iframe embedding - returns \'meet.google.com refused to connect\' errors. No official API/SDK for direct website integration. Must be used in new tab rather than embedded. frame-ancestors CSP directive blocks iframe embedding for security. Google official policy prevents iframe integration.',
  aliases: ["gmeet"],
  lastUpdated: '2025-06-29T00:00:00Z',
  verifiedAt: '2025-07-03T00:00:00.000Z'
});
