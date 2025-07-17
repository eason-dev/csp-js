import { defineServiceInternal } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Percy = defineServiceInternal({
  id: 'percy',
  name: 'Percy',
  category: ServiceCategory.TESTING,
  description: 'Visual testing and review platform for web applications',
  website: 'https://percy.io',
  officialDocs: [
    'https://www.browserstack.com/docs/percy/common-issue/handling-csp',
    'https://docs.percy.io/docs/enterprise-firewalls',
    'https://docs.percy.io/docs/capturing-multiple-asset-hosts-cli',
  ],
  directives: {
    'script-src': ['https://percy.io'],
    'connect-src': ['https://percy.io', 'https://api.percy.io'],
  },
  notes:
    'Percy verified from official BrowserStack documentation. Visual testing platform (now part of BrowserStack) recommends temporarily disabling CSP during screenshot capture for accurate results, then re-enabling for security. Requires outbound access to percy.io domain. Use allowed-hostnames config for multi-domain asset capture. CI environment must allow outbound internet access to percy.io.',
  aliases: ['percy-visual'],
  lastUpdated: '2025-06-29T00:00:00Z',
  verifiedAt: '2025-07-03T00:00:00.000Z',
});
