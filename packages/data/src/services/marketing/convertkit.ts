import { defineServiceInternal } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Convertkit = defineServiceInternal({
  id: 'convertkit',
  name: 'ConvertKit',
  category: ServiceCategory.OTHER,
  description: 'Email marketing platform designed for creators and bloggers',
  website: 'https://convertkit.com/',
  officialDocs: [
    'https://developers.kit.com/v3',
    'https://help.kit.com/en/articles/4009572-form-embedding-basics',
  ],
  directives: {
    'script-src': ['https://convertkit.com', 'https://app.convertkit.com'],
    'connect-src': ['https://api.convertkit.com', 'https://app.convertkit.com'],
    'form-action': ['https://app.convertkit.com'],
    'frame-src': ['https://app.convertkit.com'],
    'img-src': ['https://convertkit.com', 'https://app.convertkit.com'],
  },
  notes:
    'ConvertKit (now Kit) verified from official embedding documentation. JavaScript embed recommended over HTML for automatic updates. Forms submit to app.convertkit.com domain. API base URL: api.convertkit.com/v3/. React and Svelte libraries available on GitHub. No specific official CSP documentation found - test with Content-Security-Policy-Report-Only header first. Requires form-action directive for form submissions.',
  aliases: ['ck'],
  lastUpdated: '2024-06-29T00:00:00.000Z',
  verifiedAt: '2025-07-03T00:00:00.000Z',
});
