import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Snapchat = defineService({
  id: 'snapchat',
  name: 'Snapchat',
  category: ServiceCategory.SOCIAL,
  description: 'Snapchat social media platform with Snap Pixel and embeds',
  website: 'https://snapchat.com',
  officialDocs: [
    "https://businesshelp.snapchat.com/s/article/pixel-direct-implementation",
    "https://developers.snap.com/api/marketing-api/Ads-API/snap-pixel"
  ],
  directives: {
    'script-src': ["https://sc-static.net"],
    'frame-src': ["https://tr.snapchat.com","https://tr-shadow.snapchat.com","https://snap.adbrn.com"],
    'connect-src': ["https://tr.snapchat.com","https://tr-shadow.snapchat.com"],
    'form-action': ["https://tr.snapchat.com"]
  },
  notes: 'Snapchat verified from business help and third-party documentation (RudderStack). Snap Pixel requires sc-static.net for SDK loading, tr.snapchat.com for tracking. Cross-device impact measurement for advertising campaigns. Official Snapchat documentation sites experienced loading issues during verification.',
  aliases: ["snapchat-pixel","snap-pixel"],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z'
});
