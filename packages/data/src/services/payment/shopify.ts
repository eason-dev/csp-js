import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Shopify = defineService({
  id: 'shopify',
  name: 'Shopify',
  category: ServiceCategory.PAYMENT,
  description: 'E-commerce platform with integrated payment processing',
  website: 'https://shopify.com',
  officialDocs: [
    "https://shopify.dev/docs/apps/build/security/set-up-iframe-protection",
    "https://shopify.dev/docs/storefronts/headless/hydrogen/content-security-policy",
    "https://shopify.dev/docs/api/hydrogen/2024-10/utilities/createcontentsecuritypolicy"
  ],
  directives: {
    'script-src': ["https://cdn.shopify.com","https://*.shopify.com"],
    'connect-src': ["https://checkout.shopify.com","https://shop.app","https://*.shopify.com"],
    'frame-ancestors': ["https://*.myshopify.com","https://admin.shopify.com"],
    'img-src': ["https://cdn.shopify.com","https://*.shopify.com"]
  },
  requiresDynamic: true,
  requiresNonce: true,
  notes: 'Shopify verified from official developer documentation. Requires dynamic frame-ancestors per shop domain (https://[shop].myshopify.com https://admin.shopify.com). Embedded apps must implement shop-specific CSP headers. Hydrogen storefronts use script nonces and include cdn.shopify.com by default. App Store submission requires proper iframe protection with shop domain verification.',
  aliases: ["shopify-checkout"],
  lastUpdated: '2025-06-29T00:00:00Z',
  verifiedAt: '2025-07-03T00:00:00.000Z'
});
