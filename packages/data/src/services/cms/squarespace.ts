import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Squarespace = defineService({
  id: 'squarespace',
  name: 'Squarespace',
  category: ServiceCategory.OTHER,
  description: 'All-in-one website building and hosting platform',
  website: 'https://www.squarespace.com/',
  officialDocs: [
    'https://developers.squarespace.com/',
    'https://support.squarespace.com/hc/en-us/articles/205815908-Using-code-injection',
    'https://support.squarespace.com/hc/en-us/articles/205815928-Adding-custom-code-to-your-site',
  ],
  directives: {
    'script-src': [
      'https://squarespace.com',
      'https://www.squarespace.com',
      'https://static1.squarespace.com',
    ],
    'connect-src': ['https://squarespace.com', 'https://api.squarespace.com'],
    'img-src': ['https://images.squarespace-cdn.com'],
  },
  notes:
    "Squarespace verified from official documentation and community forums. CRITICAL CSP ISSUE: Squarespace does not natively provide comprehensive CSP support. Financial institutions flagged 'Content Security Policy Missing'. Bank regulators require CSP fixes. Single-domain CSP breaks editor functionality. Custom code injection available but CSP conflicts. Users in 'tough position' for compliance requirements.",
  aliases: ['squarespace-website'],
  lastUpdated: '2024-06-29T00:00:00.000Z',
  verifiedAt: '2025-07-03T00:00:00.000Z',
});
