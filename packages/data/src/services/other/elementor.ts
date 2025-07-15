import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Elementor = defineService({
  id: 'elementor',
  name: 'Elementor',
  category: ServiceCategory.OTHER,
  description: 'WordPress website builder and page builder plugin',
  website: 'https://elementor.com/',
  officialDocs: [
    'https://elementor.com/help/requirements/',
    'https://github.com/elementor/elementor/issues/15192',
  ],
  directives: {
    'script-src': ['https://elementor.com', "'unsafe-inline'"],
    'frame-ancestors': ["'self'"],
    'connect-src': ['https://my.elementor.com', 'https://api.elementor.com'],
    'img-src': ['https://elementor.com', 'data:'],
  },
  requiresDynamic: true,
  notes:
    "Elementor verified from system requirements and GitHub issues. Known CSP compatibility issues - requires 'unsafe-inline' for dynamic scripts. frame-ancestors must be 'self' (not 'none') for editor preview iframe. Pro version and widget libraries may need additional domains. Consider disabling strict CSP for Elementor pages.",
  aliases: ['elementor-wordpress'],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z',
});
