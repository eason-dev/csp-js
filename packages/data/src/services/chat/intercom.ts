import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Intercom = defineService({
  id: 'intercom',
  name: 'Intercom',
  category: ServiceCategory.CHAT,
  description: 'Customer messaging platform with live chat, help desk, and marketing automation',
  website: 'https://intercom.com',
  officialDocs: [
    "https://www.intercom.com/help/en/articles/3894-using-intercom-with-content-security-policy",
    "https://developers.intercom.com/installing-intercom/docs/javascript-api-overview",
    "https://developers.intercom.com/installing-intercom/docs/intercom-javascript"
  ],
  directives: {
    'script-src': ["https://app.intercom.io","https://widget.intercom.io","https://js.intercomcdn.com","https://video-messages.intercomcdn.com","https://messenger-apps.intercom.io","https://messenger-apps.eu.intercom.io","https://messenger-apps.au.intercom.io"],
    'frame-src': ["https://widget.intercom.io","https://intercom-sheets.com","https://www.intercom-reporting.com","https://www.youtube.com","https://player.vimeo.com","https://fast.wistia.net"],
    'connect-src': ["https://via.intercom.io","https://api.intercom.io","https://api.au.intercom.io","https://api.eu.intercom.io","https://api-iam.intercom.io","https://api-iam.eu.intercom.io","https://api-iam.au.intercom.io","https://api-ping.intercom.io","https://nexus-websocket-a.intercom.io","wss://nexus-websocket-a.intercom.io","https://nexus-websocket-b.intercom.io","wss://nexus-websocket-b.intercom.io","https://nexus-europe-websocket.intercom.io","wss://nexus-europe-websocket.intercom.io","https://nexus-australia-websocket.intercom.io","wss://nexus-australia-websocket.intercom.io","https://uploads.intercomcdn.com","https://uploads.intercomcdn.eu","https://uploads.au.intercomcdn.com","https://uploads.eu.intercomcdn.com","https://uploads.intercomusercontent.com"],
    'img-src': ["https://static.intercomassets.com","https://js.intercomcdn.com","https://downloads.intercomcdn.com","https://uploads.intercomusercontent.com","https://gifs.intercomcdn.com"],
    'style-src': ["'unsafe-inline'"],
    'font-src': ["https://js.intercomcdn.com"],
    'media-src': ["https://js.intercomcdn.com"]
  },
  requiresDynamic: true,
  requiresNonce: true,
  notes: 'Intercom verified against official CSP documentation. Requires multiple regional endpoints (US, EU, AU), WebSocket connections for real-time messaging, and various CDN domains for assets. Supports iframe embeds for third-party content (YouTube, Vimeo, Wistia). Regional API endpoints and upload domains required based on account location.',
  aliases: ["intercom-messenger"],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z'
});
