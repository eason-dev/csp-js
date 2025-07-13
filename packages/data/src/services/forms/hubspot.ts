import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Hubspot = defineService({
  id: 'hubspot',
  name: 'HubSpot',
  category: ServiceCategory.FORMS,
  description: 'Marketing, sales, and service software with forms and tracking',
  website: 'https://hubspot.com',
  officialDocs: [
    "https://knowledge.hubspot.com/domains-and-urls/ssl-and-domain-security-in-hubspot",
    "https://community.hubspot.com/t5/HubSpot-Ideas/A-guide-to-Content-Security-Policy-CSP-settings/idi-p/314328",
    "https://community.hubspot.com/t5/APIs-Integrations/Content-Security-Policy-and-Embedded-Hubspot-Forms/m-p/320730"
  ],
  directives: {
    'script-src': ["https://js.hsforms.net","https://js.hs-scripts.com","https://js.hs-banner.com","https://js.hscollectedforms.net","https://js.hs-analytics.net","https://js.hsadspixel.net","https://*.hubspot.com","https://*.usemessages.com"],
    'connect-src': ["https://forms.hubspot.com","https://forms.hsforms.com","https://forms.hscollectedforms.net","https://*.hubspot.com","https://*.hubapi.com","https://*.hs-banner.com","https://*.hscollectedforms.net","https://*.hsforms.com"],
    'frame-src': ["https://forms.hubspot.com","https://*.hubspot.com","https://*.hsforms.net","https://*.hsforms.com","https://play.hubspotvideo.com"],
    'img-src': ["https://*.hsforms.com","https://*.hubspot.com","https://static.hsappstatic.net","https://*.hubspotusercontent-na1.net","https://*.hubspotusercontent20.net","https://cdn2.hubspot.net"],
    'style-src': ["'unsafe-inline'"]
  },
  requiresDynamic: true,
  notes: 'HubSpot verified from official knowledge base and community documentation. Comprehensive multi-domain CDN setup with regional variations (EU domains: js-eu1.hs-scripts.com). Requires \'unsafe-inline\' styles due to v2.js inline styling. Includes forms, tracking, video, and analytics functionality across multiple HubSpot subdomains.',
  aliases: ["hubspot-forms","hs-forms"],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-03T00:00:00.000Z'
});
