import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Wix = defineService({
  id: 'wix',
  name: 'Wix',
  category: ServiceCategory.OTHER,
  description: 'Cloud-based website development platform',
  website: 'https://www.wix.com/',
  officialDocs: [
    'https://dev.wix.com/api/rest/getting-started/introduction',
    'https://support.wix.com/en/article/embedding-custom-code-on-your-site',
    'https://support.wix.com/en/article/wix-editor-embedding-a-site-or-a-widget',
  ],
  directives: {
    'script-src': ['https://wix.com', 'https://www.wix.com', 'https://static.wixstatic.com'],
    'connect-src': ['https://wix.com', 'https://www.wix.com'],
    'img-src': ['https://static.wixstatic.com'],
  },
  notes:
    'Wix verified from official documentation and community forums. LIMITED CSP SUPPORT: CSP headers managed at platform level, no user control. Custom code runs in sandboxed iframes for security. HTTPS required for all embedded content. External sites may block embedding due to their own CSP policies. Community reports limited support for custom security headers as of 2022.',
  aliases: ['wix-website'],
  lastUpdated: '2024-06-29T00:00:00.000Z',
  verifiedAt: '2025-07-03T00:00:00.000Z',
});
