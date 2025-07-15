import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Whatsapp = defineService({
  id: 'whatsapp',
  name: 'WhatsApp',
  category: ServiceCategory.SOCIAL,
  description: 'WhatsApp messaging platform with chat widgets and business integrations',
  website: 'https://whatsapp.com',
  officialDocs: [
    'https://developers.facebook.com/docs/whatsapp/',
    'https://business.whatsapp.com/products/business-platform',
  ],
  directives: {
    'script-src': ['https://web.whatsapp.com'],
    'frame-src': ['https://web.whatsapp.com'],
    'connect-src': ['https://web.whatsapp.com'],
  },
  notes: 'WhatsApp Business chat widgets and embeds',
  aliases: ['whatsapp-business', 'whatsapp-chat'],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-03T00:00:00.000Z',
});
