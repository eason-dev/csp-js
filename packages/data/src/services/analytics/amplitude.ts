import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Amplitude = defineService({
  id: 'amplitude',
  name: 'Amplitude',
  category: ServiceCategory.ANALYTICS,
  description: 'Digital analytics platform for tracking user behavior and product usage',
  website: 'https://amplitude.com',
  officialDocs: [
    'https://www.docs.developers.amplitude.com/data/sdks/browser-2/',
    'https://www.docs.developers.amplitude.com/guides/cookies-consent-mgmt-guide/',
  ],
  directives: {
    'script-src': ['https://*.amplitude.com'],
    'connect-src': ['https://*.amplitude.com'],
    'img-src': ['https://*.amplitude.com'],
  },
  notes:
    'Amplitude verified against official Browser SDK 2.0 documentation. Requires *.amplitude.com wildcard for script loading and API connections. Covers all Amplitude subdomains including api2.amplitude.com for events, api-secure.amplitude.com for session replay, and cdn.amplitude.com for SDK delivery.',
  aliases: ['amplitude-analytics'],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z',
});
