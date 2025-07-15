import { defineServiceInternal } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Square = defineServiceInternal({
  id: 'square',
  name: 'Square',
  category: ServiceCategory.PAYMENT,
  description: 'Square payment processing and commerce platform',
  website: 'https://squareup.com',
  officialDocs: [
    'https://developer.squareup.com/forums/t/whitelisted-square-domains-for-content-security-policy-web-payments-sdk/8186',
    'https://developer.squareup.com/forums/t/content-security-policy-csp-questions-for-web-payments-sdk/11628',
  ],
  directives: {
    'script-src': ['https://js.squareup.com'],
    'connect-src': ['https://connect.squareup.com', 'https://pci-connect.squareup.com'],
    'frame-src': ['https://js.squareup.com'],
  },
  notes:
    'Square verified from developer forums discussing CSP requirements. Web Payments SDK requires HTTPS and CSP headers as of October 2025. Known CSP gaps in official documentation - developers report issues with 3DS verification frames and undocumented domains like geoissuer.card. CSP implementation requires testing to identify all needed domains.',
  aliases: ['square-payments'],
  lastUpdated: '2025-06-29T00:00:00Z',
  verifiedAt: '2025-07-04T00:00:00.000Z',
});
