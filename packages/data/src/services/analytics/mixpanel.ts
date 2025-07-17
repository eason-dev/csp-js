import { defineServiceInternal } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Mixpanel = defineServiceInternal({
  id: 'mixpanel',
  name: 'Mixpanel',
  category: ServiceCategory.ANALYTICS,
  description: 'Event tracking and user analytics platform for product teams',
  website: 'https://mixpanel.com',
  officialDocs: [
    'https://docs.mixpanel.com/docs/tracking-methods/sdks/javascript',
    'https://github.com/mixpanel/mixpanel-js/issues/234',
    'https://github.com/mixpanel/mixpanel-js',
  ],
  directives: {
    'script-src': ['https://cdn.mxpnl.com'],
    'connect-src': ['https://api.mixpanel.com', 'https://api-js.mixpanel.com'],
    'img-src': ['https://cdn.mxpnl.com'],
  },
  notes:
    'Mixpanel verified from official JavaScript SDK docs and GitHub issues. Version 2.31+ requires api-js.mixpanel.com for /decide endpoint. cdn.mxpnl.com serves the JavaScript library and tracking pixels. No nonce support required for basic tracking.',
  aliases: ['mixpanel-analytics'],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z',
});
