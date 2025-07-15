import { defineServiceInternal } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Youtube = defineServiceInternal({
  id: 'youtube',
  name: 'YouTube',
  category: ServiceCategory.VIDEO,
  description: 'Video hosting and embedding service',
  website: 'https://www.youtube.com/',
  officialDocs: ['https://developers.google.com/youtube/iframe_api_reference'],
  directives: {
    'script-src': ['https://www.youtube.com/iframe_api'],
    'frame-src': [
      'https://www.youtube.com/embed/',
      'http://www.youtube.com/embed/',
      'https://www.youtube-nocookie.com/embed/',
    ],
    'img-src': [
      'https://i.ytimg.com',
      'https://i9.ytimg.com',
      'https://ytimg.googleusercontent.com',
    ],
    'connect-src': ['https://www.youtube.com'],
  },
  notes:
    'YouTube verified against official iframe API documentation. Requires iframe_api for script-src and embed paths for frame-src. youtube-nocookie.com is the privacy-enhanced mode. Thumbnail images are served from ytimg.com domains. Include origin parameter for enhanced security.',
  aliases: ['youtube-embed', 'yt'],
  lastUpdated: '2024-06-28T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z',
});
