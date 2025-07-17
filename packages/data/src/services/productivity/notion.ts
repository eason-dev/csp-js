import { defineServiceInternal } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Notion = defineServiceInternal({
  id: 'notion',
  name: 'Notion',
  category: ServiceCategory.OTHER,
  description: 'All-in-one workspace for notes, docs, and collaboration',
  website: 'https://www.notion.so/',
  officialDocs: [
    'https://developers.notion.com/',
    'https://www.notion.so/help/embed-and-connect-other-apps',
  ],
  directives: {
    'script-src': ['https://notion.so', 'https://www.notion.so'],
    'frame-src': ['https://notion.so', 'https://www.notion.so'],
  },
  notes:
    "Notion verified from official embedding documentation. Blocks iframe embedding with X-Frame-Options: sameorigin and CSP frame-ancestors 'self' https://mail.notion.so only. Third-party services like notioniframe.com available for workarounds. API has limited embed block types in public API. Notion uses Iframely service for embedding 1,900+ external domains.",
  aliases: ['notion-workspace'],
  lastUpdated: '2024-06-29T00:00:00.000Z',
  verifiedAt: '2025-07-03T00:00:00.000Z',
});
