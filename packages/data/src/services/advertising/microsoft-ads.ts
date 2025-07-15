import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const MicrosoftAds = defineService({
  id: 'microsoft-ads',
  name: 'Microsoft Ads',
  category: ServiceCategory.ADVERTISING,
  description: "Microsoft's advertising platform (formerly Bing Ads)",
  website: 'https://ads.microsoft.com',
  officialDocs: [
    'https://docs.microsoft.com/en-us/advertising/',
    'https://help.ads.microsoft.com/apex/index/3/en/56684',
  ],
  directives: {
    'script-src': ['https://bat.bing.com'],
    'connect-src': ['https://bat.bing.com'],
  },
  notes: 'Microsoft Ads Universal Event Tracking (UET) tag',
  aliases: ['bing-ads', 'uet'],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z',
});
