import { defineServiceInternal } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Onelogin = defineServiceInternal({
  id: 'onelogin',
  name: 'OneLogin',
  category: ServiceCategory.OTHER,
  description: 'Cloud-based identity and access management platform',
  website: 'https://www.onelogin.com/',
  officialDocs: [
    'https://developers.onelogin.com/api-docs/2/getting-started/working-with-apis',
    'https://developers.onelogin.com/',
  ],
  directives: {
    'script-src': ['https://onelogin.com', 'https://www.onelogin.com'],
    'connect-src': ['https://api.onelogin.com'],
    'frame-src': ['https://*.onelogin.com'],
  },
  notes:
    'OneLogin cloud-based identity platform. Subdomain-specific configurations may be required. SAML integrations may need additional domains.',
  aliases: ['onelogin-identity'],
  lastUpdated: '2024-06-29T00:00:00.000Z',
  verifiedAt: '2025-07-03T00:00:00.000Z',
});
