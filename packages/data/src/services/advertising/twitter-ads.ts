import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const TwitterAds = defineService({
  id: 'twitter-ads',
  name: 'Twitter Ads',
  category: ServiceCategory.ADVERTISING,
  description: 'Twitter\'s advertising and marketing platform (now X Ads)',
  website: 'https://ads.twitter.com',
  officialDocs: [
    "https://business.twitter.com/en/help/campaign-measurement-and-analytics/conversion-tracking-for-websites.html",
    "https://developer.twitter.com/en/docs/twitter-ads-api/measurement/web-conversions/overview"
  ],
  directives: {
    'script-src': ["https://static.ads-twitter.com"],
    'connect-src': ["https://ads-twitter.com","https://ads-api.twitter.com","https://analytics.twitter.com"],
    'img-src': ["https://t.co","https://analytics.twitter.com","https://ads-twitter.com"]
  },
  notes: 'Twitter/X Ads verified from official conversion tracking documentation. X Pixel requires static.ads-twitter.com for uwt.js script. Must allowlist ads-twitter.com, ads-api.twitter.com, and analytics.twitter.com in img-src and connect-src for X Pixel functionality. Essential for measuring return on ad spend.',
  aliases: ["twitter-conversion","x-ads"],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z'
});
