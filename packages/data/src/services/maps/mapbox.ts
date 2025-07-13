import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Mapbox = defineService({
  id: 'mapbox',
  name: 'Mapbox',
  category: ServiceCategory.MAPS,
  description: 'Interactive maps and location data platform',
  website: 'https://mapbox.com',
  officialDocs: [
    "https://docs.mapbox.com/mapbox-gl-js/api/",
    "https://docs.mapbox.com/help/troubleshooting/mapbox-browser-support/"
  ],
  directives: {
    'script-src': ["https://api.mapbox.com"],
    'style-src': ["https://api.mapbox.com"],
    'connect-src': ["https://api.mapbox.com","https://events.mapbox.com"],
    'img-src': ["https://api.mapbox.com"]
  },
  notes: 'Mapbox GL JS for interactive vector maps',
  aliases: ["mapbox-gl","mapbox-js"],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-03T00:00:00.000Z'
});
