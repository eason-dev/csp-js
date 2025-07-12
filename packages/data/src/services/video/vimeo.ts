import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Vimeo = defineService({
  id: 'vimeo',
  name: 'Vimeo',
  category: ServiceCategory.VIDEO,
  description: 'Vimeo video hosting platform for embedded video players',
  website: 'https://vimeo.com',
  officialDocs: [
    "https://developer.vimeo.com/player/sdk/basics",
    "https://help.vimeo.com/hc/en-us/articles/12426259908881-How-to-embed-my-video"
  ],
  directives: {
    'frame-src': ["https://player.vimeo.com"],
    'script-src': ["https://f.vimeocdn.com","https://www.gstatic.com"],
    'img-src': ["https://i.vimeocdn.com","https://secure-b.vimeocdn.com","https://f.vimeocdn.com","https://player.vimeo.com"],
    'media-src': ["https://player.vimeo.com"],
    'connect-src': ["https://player.vimeo.com"]
  },
  notes: 'Vimeo verified from developer community and GitHub issues. Requires player.vimeo.com for iframe embeds, f.vimeocdn.com for player.module.js and vendor.module.js, gstatic.com for Chromecast. Extensive domain requirements due to various Vimeo subdomains and CDN usage. CSP complexity noted by developers.',
  aliases: ["vimeo-player"],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z'
});
