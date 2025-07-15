import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Auth0 = defineService({
  id: 'auth0',
  name: 'Auth0',
  category: ServiceCategory.OTHER,
  description: 'Identity platform for developers and enterprise security',
  website: 'https://auth0.com/',
  officialDocs: [
    'https://auth0.com/blog/defending-against-xss-with-csp/',
    'https://auth0.com/blog/deploying-csp-in-spa/',
    'https://auth0.com/blog/from-zero-to-hero-with-csp/',
    'https://auth0.com/docs/libraries/auth0-single-page-app-sdk',
    'https://auth0.com/docs/troubleshoot/product-lifecycle/past-migrations/clickjacking-protection-for-universal-login',
  ],
  directives: {
    'script-src': ['https://cdn.auth0.com'],
    'connect-src': ['https://*.auth0.com'],
    'frame-src': ['https://*.auth0.com'],
  },
  requiresDynamic: true,
  notes:
    "Auth0 verified from comprehensive official CSP documentation. New Universal Login automatically sets frame-ancestors: 'none' and X-Frame-Options: deny (cannot be disabled). SPA SDK uses Web Workers - configure separate worker file to avoid blob CSP issues. Requires connect-src for tenant domain. Form-action should be 'none' for SPAs. CSP-Report-Only recommended for testing.",
  aliases: ['auth0-identity'],
  lastUpdated: '2024-06-29T00:00:00.000Z',
  verifiedAt: '2025-07-03T00:00:00.000Z',
});
