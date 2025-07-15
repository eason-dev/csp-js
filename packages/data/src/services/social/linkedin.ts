import { defineServiceInternal } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Linkedin = defineServiceInternal({
  id: 'linkedin',
  name: 'LinkedIn',
  category: ServiceCategory.SOCIAL,
  description:
    'LinkedIn professional networking platform integration for share buttons and company follow',
  website: 'https://linkedin.com',
  officialDocs: [
    'https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/share-on-linkedin',
    'https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/plugins/share-plugin',
    'https://www.linkedin.com/developers/tools',
  ],
  directives: {
    'script-src': ['https://platform.linkedin.com', 'https://www.linkedin.com'],
    'frame-src': ['https://www.linkedin.com'],
    'connect-src': ['https://www.linkedin.com'],
    'img-src': ['https://media.licdn.com'],
  },
  notes:
    'LinkedIn verified from Microsoft Learn documentation and developer resources. Requires domain configuration in LinkedIn Developer Console for Valid SDK Domains. JavaScript API requires specific domain allowlisting for security. Share plugin and company follow buttons use platform.linkedin.com and www.linkedin.com domains.',
  aliases: ['linkedin-widgets'],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z',
});
