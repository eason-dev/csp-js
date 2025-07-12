import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Freshchat = defineService({
  id: 'freshchat',
  name: 'Freshchat',
  category: ServiceCategory.CHAT,
  description: 'Modern messaging software for sales and customer engagement',
  website: 'https://freshchat.com',
  officialDocs: [
    "https://developers.freshchat.com/web-sdk/",
    "https://support.freshchat.com/support/solutions/articles/238000-freshchat-javascript-sdk"
  ],
  directives: {
    'script-src': ["https://wchat.freshchat.com"],
    'connect-src': ["https://wsv.freshchat.com","https://wchat.freshchat.com"],
    'frame-src': ["https://wchat.freshchat.com"]
  },
  notes: 'Freshchat widget for customer messaging',
  aliases: ["fresh-chat"],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-03T00:00:00.000Z'
});
