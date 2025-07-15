import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const LinkedinAds = defineService({
  id: 'linkedin-ads',
  name: 'LinkedIn Ads',
  category: ServiceCategory.ADVERTISING,
  description: "LinkedIn's advertising and marketing platform",
  website: 'https://business.linkedin.com/marketing-solutions/ads',
  officialDocs: [
    'https://www.linkedin.com/help/lms/answer/a425696',
    'https://docs.microsoft.com/en-us/linkedin/marketing/',
  ],
  directives: {
    'script-src': ['https://snap.licdn.com'],
    'connect-src': [
      'https://px.ads.linkedin.com',
      'https://px4.ads.linkedin.com',
      'https://dc.ads.linkedin.com',
    ],
    'img-src': ['https://px.ads.linkedin.com', 'https://px4.ads.linkedin.com'],
  },
  notes:
    'LinkedIn Ads verified from troubleshooting documentation and third-party sources. LinkedIn Insight Tag SDK loaded from snap.licdn.com. Requires multiple px domains for pixel tracking: px.ads.linkedin.com, px4.ads.linkedin.com, dc.ads.linkedin.com. Essential domains for conversion tracking and analytics functionality.',
  aliases: ['linkedin-insight'],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z',
});
