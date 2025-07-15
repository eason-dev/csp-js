import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const GhostInspector = defineService({
  id: 'ghost-inspector',
  name: 'Ghost Inspector',
  category: ServiceCategory.TESTING,
  description: 'Automated browser testing and website monitoring service',
  website: 'https://ghostinspector.com',
  officialDocs: [
    'https://docs.ghostinspector.com/test-running-ip-addresses/',
    'https://docs.ghostinspector.com/test-settings/',
    'https://docs.ghostinspector.com/faq/',
  ],
  directives: {
    'script-src': ['https://ghostinspector.com'],
    'connect-src': ['https://api.ghostinspector.com', 'https://ghostinspector.com'],
  },
  notes:
    "Ghost Inspector verified from official documentation. Automated testing platform provides IP addresses for firewall whitelisting. Tests originate from specific documented IP ranges. User agent appends 'Ghost Inspector' for identification. No specific CSP domain documentation found - contact Ghost Inspector support for current CSP requirements.",
  aliases: ['ghost-test'],
  lastUpdated: '2025-06-29T00:00:00Z',
  verifiedAt: '2025-07-03T00:00:00.000Z',
});
