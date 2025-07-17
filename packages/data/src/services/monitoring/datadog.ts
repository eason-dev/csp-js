import { defineServiceInternal } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Datadog = defineServiceInternal({
  id: 'datadog',
  name: 'Datadog',
  category: ServiceCategory.MONITORING,
  description: 'Monitoring and analytics platform for cloud applications',
  website: 'https://datadoghq.com',
  officialDocs: [
    'https://docs.datadoghq.com/real_user_monitoring/browser/setup/',
    'https://docs.datadoghq.com/integrations/content_security_policy_logs/',
    'https://docs.datadoghq.com/real_user_monitoring/browser/troubleshooting/',
  ],
  directives: {
    'script-src': ['https://www.datadoghq-browser-agent.com'],
    'connect-src': ['https://browser-intake-datadoghq.com', 'https://session-replay-datadoghq.com'],
  },
  notes:
    'Datadog RUM (Real User Monitoring) browser agent. V5+ uses new intake domains. Worker compression may require additional CSP configuration.',
  aliases: ['datadog-rum'],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-03T00:00:00.000Z',
});
