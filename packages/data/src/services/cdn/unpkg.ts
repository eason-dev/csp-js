import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Unpkg = defineService({
  id: 'unpkg',
  name: 'unpkg',
  category: ServiceCategory.CDN,
  description: 'Fast, global content delivery network for everything on npm',
  website: 'https://unpkg.com',
  officialDocs: [
    "https://unpkg.com/",
    "https://github.com/mjackson/unpkg"
  ],
  directives: {
    'script-src': ["https://unpkg.com"],
    'style-src': ["https://unpkg.com"],
    'font-src': ["https://unpkg.com"]
  },
  notes: 'unpkg verified from official documentation. Fast, global CDN for everything on npm. Mirror of all npm packages available within minutes. Runs on Cloudflare\'s global edge network using Workers. For best cache hits use full version numbers. Subresource Integrity recommended for additional security. CSP challenges: can allow org namespaces like @myorg but not specific libraries without org namespace.',
  aliases: ["unpkg-cdn"],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-03T00:00:00.000Z'
});
