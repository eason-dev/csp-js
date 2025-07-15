import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const NewRelic = defineService({
  id: 'new-relic',
  name: 'New Relic',
  category: ServiceCategory.MONITORING,
  description: 'Application performance monitoring and observability platform',
  website: 'https://newrelic.com',
  officialDocs: [
    'https://docs.newrelic.com/docs/browser/new-relic-browser/performance-quality/security-browser-monitoring/',
    'https://docs.newrelic.com/docs/browser/new-relic-browser/getting-started/compatibility-requirements-browser-monitoring/',
  ],
  directives: {
    'script-src': ['https://js-agent.newrelic.com'],
    'connect-src': [
      'https://bam.nr-data.net',
      'https://bam-cell.nr-data.net',
      'https://js-agent.newrelic.com',
    ],
  },
  requiresDynamic: true,
  requiresNonce: true,
  notes:
    'New Relic verified against official security and compatibility documentation. Browser agent supports CSP Level 2 with nonce configuration (Ruby agent 9.10.0+ auto-detects CSP nonce). Agent v1.247.0+ includes integrity hashes for CDN verification. Proxy configuration available to reduce CSP exceptions.',
  aliases: ['newrelic', 'nr'],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z',
});
