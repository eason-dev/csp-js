import { defineServiceInternal } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Woocommerce = defineServiceInternal({
  id: 'woocommerce',
  name: 'WooCommerce',
  category: ServiceCategory.PAYMENT,
  description: 'WordPress-based e-commerce platform and payment processing',
  website: 'https://woocommerce.com',
  officialDocs: [
    'https://developer.woocommerce.com/',
    'https://woocommerce.com/document/woocommerce-rest-api/',
    'https://wordpress.org/support/topic/using-a-strict-content-security-policy-while-allowing-woocommerce-plugin-to-work/',
  ],
  directives: {
    'script-src': ['https://woocommerce.com', "'unsafe-inline'"],
    'connect-src': ['https://woocommerce.com', 'https://checkout.woocommerce.com'],
    'style-src': ["'unsafe-inline'"],
  },
  requiresDynamic: true,
  notes:
    "WooCommerce verified from community documentation and WordPress support forums. E-commerce plugin with known CSP compatibility challenges - may require 'unsafe-inline' for checkout functionality. WordPress CSP plugins like 'Cookies and Content Security Policy' can help manage WooCommerce CSP requirements. Implementation typically requires WordPress-level CSP configuration rather than dedicated WooCommerce CSP plugin.",
  aliases: ['woo'],
  lastUpdated: '2025-06-29T00:00:00Z',
  verifiedAt: '2025-07-03T00:00:00.000Z',
});
