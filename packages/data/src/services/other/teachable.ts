import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Teachable = defineService({
  id: 'teachable',
  name: 'Teachable',
  category: ServiceCategory.OTHER,
  description: 'Online course creation and hosting platform',
  website: 'https://teachable.com/',
  officialDocs: [
    "https://support.teachable.com/hc/en-us/articles/222637507-Embed-Forms-and-Other-Content-into-Lessons",
    "https://support.teachable.com/hc/en-us/articles/219090947-Teachable-s-API"
  ],
  directives: {
    'script-src': ["https://teachable.com","https://*.teachable.com"],
    'frame-src': ["https://teachable.com","https://*.teachable.com"],
    'connect-src': ["https://api.teachable.com"]
  },
  notes: 'Teachable course platform configuration based on general embedding documentation. Official CSP documentation not available. Course embeds and forms require frame-src permissions. Custom domains may need additional CSP entries. Supports embedding forms and materials via HTML/JavaScript code snippets.',
  aliases: ["teachable-courses"],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z'
});
