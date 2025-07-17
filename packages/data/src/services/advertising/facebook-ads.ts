import { defineServiceInternal } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const FacebookAds = defineServiceInternal({
  id: 'facebook-ads',
  name: 'Facebook Ads',
  category: ServiceCategory.ADVERTISING,
  description: "Facebook's advertising and marketing platform",
  website: 'https://www.facebook.com/business/ads',
  officialDocs: [
    'https://developers.facebook.com/docs/meta-pixel/',
    'https://www.facebook.com/business/help/952192354843755',
  ],
  directives: {
    'script-src': ['https://connect.facebook.net'],
    'connect-src': ['https://www.facebook.com'],
    'img-src': ['https://www.facebook.com'],
  },
  notes:
    'Facebook Ads verified from community sources - official Meta developer documentation experiencing access issues. Facebook Pixel requires connect.facebook.net for script loading, www.facebook.com/tr/ for tracking endpoint. Noscript fallback uses img-src. Safari requires connect-src directive.',
  aliases: ['fb-ads', 'facebook-pixel', 'meta-pixel'],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z',
});
