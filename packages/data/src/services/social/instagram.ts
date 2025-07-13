import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Instagram = defineService({
  id: 'instagram',
  name: 'Instagram',
  category: ServiceCategory.SOCIAL,
  description: 'Instagram photo and video sharing platform integration for embedded posts',
  website: 'https://instagram.com',
  officialDocs: [
    "https://developers.facebook.com/docs/instagram-basic-display-api/",
    "https://developers.facebook.com/docs/instagram-api/"
  ],
  directives: {
    'script-src': ["https://platform.instagram.com"],
    'frame-src': ["https://www.instagram.com"],
    'connect-src': ["https://www.instagram.com"],
    'img-src': ["https://scontent.cdninstagram.com","https://instagram.com","https://www.instagram.com"]
  },
  notes: 'Instagram verified from developer community discussions and Stack Overflow. Requires platform.instagram.com for embeds.js script loading. Official Meta documentation unavailable during verification due to site issues. Known CSP race condition with async script loading - blockquote element must be in DOM before script execution.',
  aliases: ["instagram-embed"],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z'
});
