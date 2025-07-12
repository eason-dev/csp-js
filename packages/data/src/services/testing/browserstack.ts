import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Browserstack = defineService({
  id: 'browserstack',
  name: 'BrowserStack',
  category: ServiceCategory.TESTING,
  description: 'Cross-browser testing platform for web and mobile applications',
  website: 'https://www.browserstack.com',
  officialDocs: [
    "https://www.browserstack.com/docs/percy/common-issue/handling-csp",
    "https://www.browserstack.com/docs/enterprise/domain-verification",
    "https://www.browserstack.com/docs/live/local-testing"
  ],
  directives: {
    'script-src': ["https://www.browserstack.com"],
    'connect-src': ["https://api.browserstack.com","https://hub-cloud.browserstack.com"],
    'frame-src': ["https://www.browserstack.com"]
  },
  notes: 'BrowserStack verified from official documentation. Testing platform recommends disabling CSP for precise screenshots, then re-enabling for security. Enterprise domain controls available for IP whitelisting. Iframe content capture may require CORS header adjustments. Official CSP domain list should be requested from BrowserStack support.',
  aliases: ["bs"],
  lastUpdated: '2025-06-29T00:00:00Z',
  verifiedAt: '2025-07-03T00:00:00.000Z'
});
