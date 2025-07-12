import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Divi = defineService({
  id: 'divi',
  name: 'Divi',
  category: ServiceCategory.OTHER,
  description: 'WordPress theme and visual page builder by Elegant Themes',
  website: 'https://www.elegantthemes.com/gallery/divi/',
  officialDocs: [
    "https://www.elegantthemes.com/documentation/divi/",
    "https://github.com/elegantthemes/create-divi-extension/issues/328"
  ],
  directives: {
    'script-src': ["https://elegantthemes.com","'unsafe-inline'","'unsafe-eval'"],
    'style-src': ["https://elegantthemes.com","'unsafe-inline'"],
    'worker-src': ["blob:"],
    'connect-src': ["https://elegantthemes.com"],
    'img-src': ["https://elegantthemes.com","data:"]
  },
  requiresDynamic: true,
  notes: 'Divi verified from GitHub issues and community reports. No official CSP documentation available. Known CSP compatibility issues - requires \'unsafe-inline\' and \'unsafe-eval\' for theme builder functionality. Worker-src blob: needed for bundle.js. Theme updates and third-party modules may need additional domains. Consider relaxed CSP for Divi pages.',
  aliases: ["divi-theme","elegant-themes"],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z'
});
