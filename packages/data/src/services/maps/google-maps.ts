import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const GoogleMaps = defineService({
  id: 'google-maps',
  name: 'Google Maps',
  category: ServiceCategory.MAPS,
  description: 'Interactive maps and location services by Google',
  website: 'https://maps.google.com',
  officialDocs: [
    'https://developers.google.com/maps/documentation/javascript/content-security-policy',
    'https://developers.google.com/maps/documentation/javascript/get-api-key',
    'https://developers.google.com/maps/documentation/javascript/load-maps-js-api',
  ],
  directives: {
    'script-src': [
      'https://*.googleapis.com',
      'https://*.gstatic.com',
      'https://*.google.com',
      'https://*.ggpht.com',
      'https://*.googleusercontent.com',
      "'unsafe-eval'",
      'blob:',
    ],
    'img-src': [
      'https://*.googleapis.com',
      'https://*.gstatic.com',
      'https://*.google.com',
      'https://*.googleusercontent.com',
      'data:',
    ],
    'frame-src': ['https://*.google.com'],
    'connect-src': [
      'https://*.googleapis.com',
      'https://*.google.com',
      'https://*.gstatic.com',
      'data:',
      'blob:',
    ],
    'font-src': ['https://fonts.gstatic.com'],
    'style-src': ['https://fonts.googleapis.com', "'unsafe-inline'"],
    'worker-src': ['blob:'],
  },
  requiresDynamic: true,
  requiresNonce: true,
  notes:
    "Google Maps JavaScript API for interactive maps. Supports nonce-based strict CSP (recommended) or allowlist CSP. Requires 'unsafe-eval' for some features. All websites must specify googleapis.com in CSP directives.",
  aliases: ['google-maps-api', 'gmaps'],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-03T00:00:00.000Z',
});
