import { defineServiceInternal } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Gitbook = defineServiceInternal({
  id: 'gitbook',
  name: 'GitBook',
  category: ServiceCategory.OTHER,
  description: 'Modern documentation platform for teams',
  website: 'https://www.gitbook.com/',
  officialDocs: [
    'https://developer.gitbook.com/',
    'https://docs.gitbook.com/integrations/embed-content',
    'https://docs.gitbook.com/help-center/editing-content/assets-and-files/can-i-embed-an-iframe-in-gitbook',
  ],
  directives: {
    'script-src': ['https://gitbook.com', 'https://www.gitbook.com'],
    'frame-src': ['https://gitbook.com', 'https://www.gitbook.com', 'https://*.gitbook.io'],
  },
  notes:
    "GitBook verified from official documentation. Doesn't support external iframe embedding due to CSP. Public content can be embedded in iframes with safe CSP configuration (no cookies/credentials accessible). Custom domain SSL certificates managed by GitBook. frame-ancestors CSP directive configured to allow iframe embedding of public content.",
  aliases: ['gitbook-docs'],
  lastUpdated: '2024-06-29T00:00:00.000Z',
  verifiedAt: '2025-07-03T00:00:00.000Z',
});
