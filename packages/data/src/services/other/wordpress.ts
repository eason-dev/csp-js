import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Wordpress = defineService({
  id: 'wordpress',
  name: 'WordPress',
  category: ServiceCategory.OTHER,
  description: 'Open-source content management system and blogging platform',
  website: 'https://wordpress.org',
  officialDocs: [
    "https://developer.wordpress.org/",
    "https://wordpress.org/plugins/tags/content-security-policy/",
    "https://wordpress.org/plugins/cookies-and-content-security-policy/",
    "https://wpvip.com/blog/content-security-policy-guide/"
  ],
  directives: {
    'script-src': ["https://w.org","https://s.w.org"],
    'connect-src': ["https://api.wordpress.org"],
    'img-src': ["https://s.w.org"]
  },
  notes: 'WordPress verified from official plugin directory and VIP documentation. Multiple CSP plugins available: Content Security Policy Manager, Cookies and Content Security Policy, HTTP Headers. Admin area favors inline scripts - may require \'unsafe-inline\'. Themes/plugins can break with strict CSP. Different policies for admin vs frontend recommended. Extensive testing required after CSP implementation.',
  aliases: ["wp"],
  lastUpdated: '2025-06-29T00:00:00Z',
  verifiedAt: '2025-07-03T00:00:00.000Z'
});
