import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Strapi = defineService({
  id: 'strapi',
  name: 'Strapi',
  category: ServiceCategory.OTHER,
  description: 'Open-source headless content management system',
  website: 'https://strapi.io',
  officialDocs: [
    'https://docs.strapi.io/',
    'https://docs.strapi.io/cms/configurations/middlewares',
  ],
  directives: {
    'script-src': ['https://strapi.io'],
    'connect-src': ['https://api.strapi.io'],
  },
  notes:
    'Strapi verified from official middleware documentation. CSP configured in config/middlewares.js via strapi::security middleware. useDefaults: true recommended. Supports connect-src, img-src, media-src directives. AWS S3 integration examples provided. Known issue: custom CSP ignored for /admin path. upgradeInsecureRequests: null commonly used. Flexible directive configuration supported.',
  aliases: ['strapi-cms'],
  lastUpdated: '2025-06-29T00:00:00Z',
  verifiedAt: '2025-07-03T00:00:00.000Z',
});
