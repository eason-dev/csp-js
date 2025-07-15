import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Cdnjs = defineService({
  id: 'cdnjs',
  name: 'cdnjs',
  category: ServiceCategory.CDN,
  description: 'Free and open-source CDN service powered by Cloudflare',
  website: 'https://cdnjs.com',
  officialDocs: [
    'https://cdnjs.com/about',
    'https://cdnjs.com/libraries',
    'https://developers.cloudflare.com/fundamentals/reference/policies-compliances/content-security-policies/',
  ],
  directives: {
    'script-src': ['https://cdnjs.cloudflare.com'],
    'style-src': ['https://cdnjs.cloudflare.com'],
    'font-src': ['https://cdnjs.cloudflare.com'],
  },
  notes:
    "CDNJS verified from official Cloudflare CSP documentation. Free and open-source CDN powered by Cloudflare. Supports nonce-based CSP with automatic script injection. Potential path traversal security concerns with '../' bypasses. Page Shield abstraction available for easier CSP management. Compatible with CSP headers via Transform Rules or _headers files.",
  aliases: ['cdnjs-cloudflare'],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-03T00:00:00.000Z',
});
