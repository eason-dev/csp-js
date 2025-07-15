import { defineServiceInternal } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Udemy = defineServiceInternal({
  id: 'udemy',
  name: 'Udemy',
  category: ServiceCategory.OTHER,
  description: 'Online learning and teaching marketplace',
  website: 'https://www.udemy.com/',
  officialDocs: [
    'https://www.udemy.com/developers/',
    'https://business-support.udemy.com/hc/en-us/articles/13292752846999-How-to-Embed-Content-via-iframe-Leadership-Academy',
    'https://www.udemy.com/developers/instructor/',
  ],
  directives: {
    'script-src': ['https://udemy.com', 'https://www.udemy.com'],
    'frame-src': ['https://udemy.com', 'https://www.udemy.com'],
  },
  notes:
    'Udemy verified from official documentation. CRITICAL: Affiliate API discontinued January 1, 2025. Course widget discontinued. Udemy Business supports iframe embedding for internal use only. REST/GraphQL/xAPI available for Business customers. Public course iframe embedding no longer available for affiliate purposes. Contact current affiliate program for CSP domain requirements.',
  aliases: ['udemy-courses'],
  lastUpdated: '2024-06-29T00:00:00.000Z',
  verifiedAt: '2025-07-03T00:00:00.000Z',
});
