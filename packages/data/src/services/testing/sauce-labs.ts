import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const SauceLabs = defineService({
  id: 'sauce-labs',
  name: 'Sauce Labs',
  category: ServiceCategory.TESTING,
  description: 'Cloud-based testing platform for web and mobile applications',
  website: 'https://saucelabs.com',
  officialDocs: [
    'https://docs.saucelabs.com/basics/data-center-endpoints/',
    'https://docs.saucelabs.com/secure-connections/sauce-connect/security-authentication/',
    'https://wiki.saucelabs.com/display/DOCS/Whitelisted+Domains+for+Sauce+Connect+Proxy',
  ],
  directives: {
    'script-src': ['https://saucelabs.com', 'https://*.saucelabs.com'],
    'connect-src': [
      'https://api.saucelabs.com',
      'https://ondemand.saucelabs.com',
      'https://*.saucelabs.com',
      'https://*.miso.saucelabs.com',
    ],
  },
  notes:
    'Sauce Labs verified from official documentation. Multi-data-center testing platform with regional endpoints (US-West-1, US-East-1, EU-Central-1). Requires Sauce Connect Proxy domains (*.miso.saucelabs.com) for tunnel connections. Recommends hostname whitelisting over IP addresses. Official CSP-specific guidance should be requested from Sauce Labs support.',
  aliases: ['saucelabs'],
  lastUpdated: '2025-06-29T00:00:00Z',
  verifiedAt: '2025-07-03T00:00:00.000Z',
});
