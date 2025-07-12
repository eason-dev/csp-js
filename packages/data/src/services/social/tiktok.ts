import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Tiktok = defineService({
  id: 'tiktok',
  name: 'TikTok',
  category: ServiceCategory.SOCIAL,
  description: 'TikTok social media platform with video embeds and tracking',
  website: 'https://tiktok.com',
  officialDocs: [
    "https://developers.tiktok.com/doc/embed-player",
    "https://developers.tiktok.com/doc/embed-creator-profiles",
    "https://ads.tiktok.com/help/article/get-started-pixel"
  ],
  directives: {
    'script-src': ["https://www.tiktok.com","https://sf16-website-login.neutral.ttwstatic.com","https://analytics.tiktok.com"],
    'frame-src': ["https://www.tiktok.com"],
    'connect-src': ["https://analytics.tiktok.com","https://www.tiktok.com"],
    'img-src': ["https://www.tiktok.com","https://p16-sign-sg.tiktokcdn.com","https://sf16-website-login.neutral.ttwstatic.com"]
  },
  notes: 'TikTok verified from developer documentation and ads platform guides. Requires www.tiktok.com for embed.js script and iframe embeds. TikTok Ads Manager mentions CSP considerations when setting up pixel. oEmbed API available for video embedding. Player uses postMessage communication.',
  aliases: ["tiktok-pixel"],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z'
});
