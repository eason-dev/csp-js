import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Paypal = defineService({
  id: 'paypal',
  name: 'PayPal',
  category: ServiceCategory.PAYMENT,
  description: 'Online payment service that allows payments and money transfers',
  website: 'https://paypal.com',
  officialDocs: [
    "https://developer.paypal.com/sdk/js/csp/",
    "https://developer.paypal.com/docs/checkout/reference/security/",
    "https://developer.paypal.com/docs/checkout/integration-features/content-security-policy/"
  ],
  directives: {
    'script-src': ["https://www.paypal.com","https://*.paypal.com","https://*.paypalobjects.com","https://*.venmo.com"],
    'frame-src': ["https://www.paypal.com","https://*.paypal.com","https://*.paypalobjects.com","https://*.venmo.com"],
    'connect-src': ["https://www.paypal.com","https://api.paypal.com","https://*.paypal.com","https://*.paypalobjects.com","https://*.venmo.com","https://*.braintreegateway.com","https://*.braintree-api.com"],
    'img-src': ["https://www.paypalobjects.com","https://t.paypal.com","https://*.paypal.com","https://*.paypalobjects.com","https://*.venmo.com"],
    'style-src': ["https://*.paypal.com","https://*.paypalobjects.com","https://*.venmo.com","'unsafe-inline'"]
  },
  requiresDynamic: true,
  requiresNonce: true,
  notes: 'PayPal verified against official CSP documentation. Includes JavaScript SDK, Checkout, Fastlane, and Venmo integration domains. Supports nonce-based CSP (data-csp-nonce attribute). Includes Braintree gateway domains for advanced payment processing. FraudNet integration may require additional domains.',
  aliases: ["paypal-checkout"],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z'
});
