import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Contentful = defineService({
  id: 'contentful',
  name: 'Contentful',
  category: ServiceCategory.OTHER,
  description: 'API-first headless content management system',
  website: 'https://contentful.com',
  officialDocs: [
    "https://www.contentful.com/developers/docs/experiences/troubleshooting/",
    "https://www.contentful.com/blog/contentful-studio-experiences-sdk/"
  ],
  directives: {
    'connect-src': ["https://cdn.contentful.com","https://cdn.eu.contentful.com","https://preview.contentful.com","https://graphql.contentful.com"],
    'img-src': ["https://assets.ctfassets.net","https://images.ctfassets.net","https://videos.ctfassets.net","https://downloads.ctfassets.net","https://images.secure.ctfassets.net","https://assets.secure.ctfassets.net","https://videos.secure.ctfassets.net","https://downloads.secure.ctfassets.net"],
    'frame-src': ["https://app.contentful.com"]
  },
  notes: 'Contentful verified against official troubleshooting and SDK documentation. Requires app.contentful.com for Studio experiences, cdn.contentful.com for content delivery, and both regular and secure ctfassets.net domains for asset hosting. EU customers use cdn.eu.contentful.com endpoint.',
  aliases: ["contentful-cms"],
  lastUpdated: '2025-06-29T00:00:00Z',
  verifiedAt: '2025-07-04T00:00:00.000Z'
});
