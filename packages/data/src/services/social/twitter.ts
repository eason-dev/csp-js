import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Twitter = defineService({
  id: 'twitter',
  name: 'Twitter',
  category: ServiceCategory.SOCIAL,
  description: 'Twitter social media platform integration for embedded tweets and buttons',
  website: 'https://twitter.com',
  officialDocs: [
    "https://developer.x.com/en/docs/x-for-websites/embedded-tweets/guides/cms-best-practices",
    "https://developer.x.com/en/docs/x-for-websites"
  ],
  directives: {
    'script-src': ["https://platform.twitter.com"],
    'frame-src': ["https://platform.twitter.com"],
    'connect-src': ["https://api.twitter.com"],
    'img-src': ["https://pbs.twimg.com","https://abs.twimg.com"],
    'style-src': ["https://platform.twitter.com"]
  },
  notes: 'Twitter/X verified from official developer documentation. Requires platform.twitter.com for widgets.js and iframe content. CSP parameter \'csp=on\' available to disable features that might trigger CSP warnings. Supports embedded tweets, timelines, and follow buttons with oEmbed API integration.',
  aliases: ["twitter-widgets","x"],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z'
});
