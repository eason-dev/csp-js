import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const ConstantContact = defineService({
  id: 'constant-contact',
  name: 'Constant Contact',
  category: ServiceCategory.OTHER,
  description: 'Email marketing and campaign management platform',
  website: 'https://www.constantcontact.com/',
  officialDocs: [
    'https://knowledgebase.constantcontact.com/lead-gen-crm/articles/KnowledgeBase/50227-Using-Form-Embed-Codes',
    'https://developer.constantcontact.com/api_reference/index.html',
  ],
  directives: {
    'script-src': ['https://imgssl.constantcontact.com'],
    'frame-src': ['https://lp.constantcontactpages.com'],
    'connect-src': ['https://api.constantcontact.com'],
    'img-src': ['https://imgssl.constantcontact.com'],
  },
  notes:
    'Constant Contact verified from official documentation and community forums. IMPORTANT: Embed codes for forms no longer available as of recent updates. Some pages refuse iframe connections due to security headers and Terms of Use restrictions. Embeddable forms available via lp.constantcontactpages.com domain. New inline and pop-up signup forms recommended. No specific official CSP documentation found - contact support for requirements.',
  aliases: ['constantcontact'],
  lastUpdated: '2024-06-29T00:00:00.000Z',
  verifiedAt: '2025-07-03T00:00:00.000Z',
});
