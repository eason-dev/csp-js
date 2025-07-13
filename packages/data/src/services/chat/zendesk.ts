import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Zendesk = defineService({
  id: 'zendesk',
  name: 'Zendesk',
  category: ServiceCategory.CHAT,
  description: 'Customer service platform with support ticketing and live chat',
  website: 'https://zendesk.com',
  officialDocs: [
    "https://developer.zendesk.com/documentation/classic-web-widget-sdks/web-widget/integrating-with-google/csp/",
    "https://support.zendesk.com/hc/en-us/articles/5436016355738-Does-Zendesk-support-CSP-headers"
  ],
  directives: {
    'script-src': ["https://*.zdassets.com","https://static.zdassets.com"],
    'frame-src': ["https://*.zendesk.com","https://widget.zendesk.com"],
    'connect-src': ["https://*.zendesk.com","https://*.zopim.com","https://assets.zendesk.com","wss://*.zendesk.com","wss://*.zopim.com","https://zendesk-eu.my.sentry.io"],
    'img-src': ["https://v2assets.zopim.io","https://static.zdassets.com","data:"],
    'font-src': ["https://*.zdassets.com","https://static.zdassets.com"],
    'style-src': ["'unsafe-inline'"]
  },
  requiresDynamic: true,
  requiresNonce: true,
  notes: 'Zendesk verified against official CSP documentation. Web Widget (Classic) supports Google\'s strict CSP guidelines with nonce attribute. Requires static.zdassets.com for snippet.js and assets.zendesk.com for embeddable framework. Cannot guarantee custom CSP compatibility outside Google\'s guidelines.',
  aliases: ["zendesk-chat","zendesk-widget"],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z'
});
