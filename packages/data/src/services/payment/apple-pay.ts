import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const ApplePay = defineService({
  id: 'apple-pay',
  name: 'Apple Pay',
  category: ServiceCategory.PAYMENT,
  description: "Apple's digital payment and digital wallet service",
  website: 'https://developer.apple.com/apple-pay/',
  officialDocs: [
    'https://developer.apple.com/documentation/applepayontheweb/apple-pay-js-api',
    'https://developer.apple.com/documentation/applepayontheweb/displaying-apple-pay-buttons-using-javascript',
  ],
  directives: {
    'script-src': ['https://applepay.cdn-apple.com'],
    'connect-src': ['https://apple-pay-gateway.apple.com'],
    'frame-src': ['https://applepay.cdn-apple.com'],
  },
  notes:
    'Apple Pay verified from official JavaScript API documentation. Requires applepay.cdn-apple.com for SDK and iframe content, apple-pay-gateway.apple.com for merchant validation. SDK requires crossorigin attribute. Domain verification through Apple Developer Portal required. TLS 1.2+ with specific cipher suites mandatory.',
  aliases: ['applepay'],
  lastUpdated: '2025-06-29T00:00:00Z',
  verifiedAt: '2025-07-04T00:00:00.000Z',
});
