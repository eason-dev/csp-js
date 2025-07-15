import { defineServiceInternal } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Stripe = defineServiceInternal({
  id: 'stripe',
  name: 'Stripe',
  category: ServiceCategory.PAYMENT,
  description:
    'Online payment processing platform for internet businesses including Stripe.js, Checkout, Connect, and 3D Secure authentication',
  website: 'https://stripe.com',
  officialDocs: [
    'https://stripe.com/docs/js',
    'https://stripe.com/docs/security/guide#content-security-policy',
    'https://stripe.com/docs/security/guide',
  ],
  directives: {
    'script-src': [
      'https://js.stripe.com',
      'https://*.js.stripe.com',
      'https://maps.googleapis.com',
    ],
    'frame-src': ['https://js.stripe.com', 'https://*.js.stripe.com', 'https://hooks.stripe.com'],
    'connect-src': [
      'https://api.stripe.com',
      'https://maps.googleapis.com',
      'https://q.stripe.com',
      'https://errors.stripe.com',
    ],
    'img-src': ['https://*.stripe.com'],
  },
  notes:
    'Stripe.js v3 library for secure payment processing. Includes domains for Google Maps (used in payment forms), error reporting (q.stripe.com), and wildcard subdomains for CDN delivery.',
  aliases: ['stripe-js'],
  lastUpdated: '2025-07-03T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z',
});
