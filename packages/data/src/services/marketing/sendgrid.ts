import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Sendgrid = defineService({
  id: 'sendgrid',
  name: 'SendGrid',
  category: ServiceCategory.OTHER,
  description: 'Email delivery and marketing platform by Twilio',
  website: 'https://sendgrid.com/',
  officialDocs: [
    'https://docs.sendgrid.com/ui/sending-email/content-security-policy',
    'https://docs.sendgrid.com/api-reference/',
  ],
  directives: {
    'script-src': ['https://sendgrid.com'],
    'connect-src': ['https://api.sendgrid.com'],
  },
  notes:
    'SendGrid email delivery and marketing platform by Twilio. Marketing campaigns may require additional image domains. Webhook endpoints should be configured separately.',
  aliases: ['twilio-sendgrid'],
  lastUpdated: '2024-06-29T00:00:00.000Z',
  verifiedAt: '2025-07-03T00:00:00.000Z',
});
