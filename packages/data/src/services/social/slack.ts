import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Slack = defineService({
  id: 'slack',
  name: 'Slack',
  category: ServiceCategory.SOCIAL,
  description: 'Slack workspace communication platform with embeds and integrations',
  website: 'https://slack.com',
  officialDocs: [
    'https://api.slack.com/docs/slack-button',
    'https://api.slack.com/legacy/slack-button',
  ],
  directives: {
    'script-src': ['https://platform.slack-edge.com'],
    'frame-src': ['https://slack.com'],
    'img-src': ['https://slack.com', 'https://platform.slack-edge.com'],
  },
  notes:
    'Slack buttons and workspace embeds. Official CSP documentation not readily available - configuration based on general API documentation. platform.slack-edge.com serves embed scripts, slack.com for iframe content.',
  aliases: ['slack-button'],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z',
});
