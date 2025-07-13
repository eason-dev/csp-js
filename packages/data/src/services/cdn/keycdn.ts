import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Keycdn = defineService({
  id: 'keycdn',
  name: 'KeyCDN',
  category: ServiceCategory.CDN,
  description: 'High performance content delivery network',
  website: 'https://www.keycdn.com',
  officialDocs: [
    "https://www.keycdn.com/support/content-security-policy",
    "https://www.keycdn.com/blog/http-security-headers"
  ],
  directives: {
    'script-src': ["https://*.kxcdn.com"],
    'connect-src': ["https://*.kxcdn.com"],
    'img-src': ["https://*.kxcdn.com"],
    'style-src': ["https://*.kxcdn.com"],
    'font-src': ["https://*.kxcdn.com"]
  },
  notes: 'KeyCDN verified from official CSP documentation. Uses *.kxcdn.com wildcard domain for pull and push zones. Official documentation emphasizes CSP as powerful mechanism against XSS attacks. Replace wildcard with specific zone subdomain for enhanced security.',
  aliases: ["kxcdn"],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z'
});
