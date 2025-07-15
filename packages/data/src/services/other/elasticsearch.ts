import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Elasticsearch = defineService({
  id: 'elasticsearch',
  name: 'Elasticsearch',
  category: ServiceCategory.OTHER,
  description: 'Distributed search and analytics engine with Kibana visualization',
  website: 'https://www.elastic.co/elasticsearch/',
  officialDocs: [
    'https://www.elastic.co/guide/en/kibana/current/Security-production-considerations.html',
    'https://www.elastic.co/guide/en/kibana/current/settings.html',
  ],
  directives: {
    'script-src': ["'unsafe-eval'", "'self'"],
    'worker-src': ['blob:', "'self'"],
    'style-src': ["'unsafe-inline'", "'self'"],
    'connect-src': ['https://*.elastic.co'],
  },
  requiresDynamic: true,
  notes:
    "Elasticsearch/Kibana verified from official security documentation. Kibana uses CSP strict mode (csp.strict: true) to block browsers that don't enforce basic CSP. Requires 'unsafe-eval' and 'unsafe-inline' for functionality. Self-hosted instances need custom domain configuration. Elastic Cloud uses cluster-specific subdomains.",
  aliases: ['elastic-search', 'kibana'],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z',
});
