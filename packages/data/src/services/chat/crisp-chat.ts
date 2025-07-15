import { defineServiceInternal } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const CrispChat = defineServiceInternal({
  id: 'crisp-chat',
  name: 'Crisp Chat',
  category: ServiceCategory.CHAT,
  description: 'Customer messaging platform with live chat, chatbots, and helpdesk',
  website: 'https://crisp.chat',
  officialDocs: [
    'https://docs.crisp.chat/guides/chatbox-sdks/web-sdk/',
    'https://help.crisp.chat/en/article/how-to-use-crisp-chatbox-javascript-sdk-10ud15y/',
  ],
  directives: {
    'script-src': ['https://client.crisp.chat'],
    'connect-src': ['wss://client.crisp.chat', 'https://client.crisp.chat'],
    'frame-src': ['https://client.crisp.chat'],
    'img-src': ['https://client.crisp.chat', 'https://image.crisp.chat'],
  },
  notes: 'Crisp chat widget with WebSocket support',
  aliases: ['crisp'],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-03T00:00:00.000Z',
});
