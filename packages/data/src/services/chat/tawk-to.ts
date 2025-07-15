import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const TawkTo = defineService({
  id: 'tawk-to',
  name: 'Tawk.to',
  category: ServiceCategory.CHAT,
  description: 'Free live chat software for websites',
  website: 'https://tawk.to',
  officialDocs: [
    'https://help.tawk.to/article/why-are-images-not-showing-up-in-the-widget',
    'https://developer.tawk.to/jsapi/',
  ],
  directives: {
    'script-src': ['https://*.tawk.to', 'https://cdn.jsdelivr.net'],
    'style-src': ['https://*.tawk.to', 'https://fonts.googleapis.com', 'https://cdn.jsdelivr.net'],
    'frame-src': ['https://*.tawk.to'],
    'font-src': ['https://*.tawk.to', 'https://fonts.gstatic.com'],
    'img-src': [
      'https://*.tawk.to',
      'https://cdn.jsdelivr.net',
      'https://tawk.link',
      'https://s3.amazonaws.com',
    ],
    'connect-src': ['https://*.tawk.to', 'wss://*.tawk.to'],
    'form-action': ['https://*.tawk.to'],
  },
  notes:
    'Tawk.to verified from official CSP documentation. Requires wildcard *.tawk.to domains for various resources. Known CSP complexity due to extensive inline styles in widget implementation. Official docs recommend specific CSP directives to ensure widget displays correctly.',
  aliases: ['tawk'],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z',
});
