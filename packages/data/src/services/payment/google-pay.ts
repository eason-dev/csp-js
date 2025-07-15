import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const GooglePay = defineService({
  id: 'google-pay',
  name: 'Google Pay',
  category: ServiceCategory.PAYMENT,
  description: "Google's digital payment platform and digital wallet",
  website: 'https://pay.google.com',
  officialDocs: [
    'https://developers.google.com/pay/api/web/overview',
    'https://developers.google.com/tag-platform/security/guides/csp',
  ],
  directives: {
    'script-src': ['https://pay.google.com'],
    'connect-src': ['https://payments.google.com', 'https://googleapis.com'],
    'img-src': ['https://www.gstatic.com', 'https://cdn.firebasestudio.dev'],
  },
  requiresNonce: true,
  notes:
    "Google Pay verified from official API overview and Google's CSP guide. Requires pay.google.com for JavaScript SDK, googleapis.com for API connections, and gstatic.com for static assets. Google recommends strict CSP with nonces for security. Firebase Studio CDN used for UI elements.",
  aliases: ['googlepay', 'gpay'],
  lastUpdated: '2025-06-29T00:00:00Z',
  verifiedAt: '2025-07-04T00:00:00.000Z',
});
