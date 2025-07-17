import { defineServiceInternal } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const PingIdentity = defineServiceInternal({
  id: 'ping-identity',
  name: 'Ping Identity',
  category: ServiceCategory.OTHER,
  description: 'Identity security platform for enterprises',
  website: 'https://www.pingidentity.com/',
  officialDocs: [
    'https://docs.pingidentity.com/r/en-us/pingone/pingone_overview',
    'https://developer.pingidentity.com/',
  ],
  directives: {
    'script-src': ['https://pingone.com'],
    'connect-src': ['https://api.pingone.com', 'https://*.pingone.com'],
    'frame-src': ['https://*.pingone.com'],
  },
  notes:
    'Ping Identity security platform. Environment-specific subdomains require wildcard permissions. PingFederate may require additional domains.',
  aliases: ['pingone', 'ping-federate'],
  lastUpdated: '2024-06-29T00:00:00.000Z',
  verifiedAt: '2025-07-03T00:00:00.000Z',
});
