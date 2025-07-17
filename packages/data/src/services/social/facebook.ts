import { defineServiceInternal } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Facebook = defineServiceInternal({
  id: 'facebook',
  name: 'Facebook',
  category: ServiceCategory.SOCIAL,
  description:
    'Facebook social media platform integration including Like buttons, Comments, and Login',
  website: 'https://facebook.com',
  officialDocs: [
    'https://developers.facebook.com/docs/javascript/quickstart/',
    'https://developers.facebook.com/docs/plugins/',
  ],
  directives: {
    'script-src': ['https://connect.facebook.net'],
    'frame-src': ['https://www.facebook.com'],
    'connect-src': ['https://www.facebook.com', 'https://connect.facebook.net'],
    'img-src': ['https://www.facebook.com', 'https://scontent.xx.fbcdn.net'],
  },
  notes:
    'Facebook SDK for JavaScript, Like buttons, Comments widget. Note: Official CSP documentation from Facebook is currently inaccessible - many developer pages return errors. Configuration verified from community sources and Stack Overflow discussions.',
  aliases: ['facebook-sdk', 'fb'],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-05T00:00:00.000Z',
});
