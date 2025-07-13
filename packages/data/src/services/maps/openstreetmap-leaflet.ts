import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const OpenstreetmapLeaflet = defineService({
  id: 'openstreetmap-leaflet',
  name: 'OpenStreetMap/Leaflet',
  category: ServiceCategory.MAPS,
  description: 'Open-source JavaScript library for mobile-friendly interactive maps',
  website: 'https://leafletjs.com',
  officialDocs: [
    "https://leafletjs.com/examples/quick-start/",
    "https://leafletjs.com/reference.html"
  ],
  directives: {
    'script-src': ["https://unpkg.com","'unsafe-eval'"],
    'style-src': ["https://unpkg.com","'unsafe-inline'"],
    'connect-src': ["https://tile.openstreetmap.org","https://*.tile.openstreetmap.org"],
    'img-src': ["https://tile.openstreetmap.org","https://*.tile.openstreetmap.org","https://unpkg.com"]
  },
  requiresDynamic: true,
  notes: 'Leaflet/OpenStreetMap verified from community documentation and GitHub issues. Requires \'unsafe-eval\' for mapping libraries and \'unsafe-inline\' for dynamic styling. Common error: img-src violations for tile loading. Must include wildcard domains (*.tile.openstreetmap.org) for subdomain tiles (a,b,c). Different tile servers require specific CSP configurations. Cordova requires network access whitelist.',
  aliases: ["leaflet","osm","openstreetmap"],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-03T00:00:00.000Z'
});
