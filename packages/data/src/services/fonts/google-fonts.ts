import { defineServiceInternal } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const GoogleFonts = defineServiceInternal({
  id: 'google-fonts',
  name: 'Google Fonts',
  category: ServiceCategory.FONTS,
  description: 'Free web font service with hundreds of font families',
  website: 'https://fonts.google.com/',
  officialDocs: [
    'https://developers.google.com/maps/documentation/javascript/content-security-policy',
    'https://developers.google.com/fonts/docs/getting_started',
  ],
  directives: {
    'style-src': ['https://fonts.googleapis.com'],
    'font-src': ['https://fonts.gstatic.com'],
  },
  notes:
    'Google Fonts verified from official Google Maps CSP documentation. fonts.googleapis.com serves CSS stylesheets, fonts.gstatic.com serves actual font files. Both domains required for Google Fonts to work properly. Supports nonce-based CSP for enhanced security.',
  aliases: ['gfonts'],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z',
});
