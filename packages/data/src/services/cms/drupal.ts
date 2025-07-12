import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Drupal = defineService({
  id: 'drupal',
  name: 'Drupal',
  category: ServiceCategory.OTHER,
  description: 'Open-source content management framework',
  website: 'https://drupal.org',
  officialDocs: [
    "https://www.drupal.org/project/csp",
    "https://www.drupal.org/docs/extending-drupal/contributed-modules/contributed-module-documentation/content-security-policy",
    "https://www.drupal.org/project/seckit"
  ],
  directives: {
    'script-src': ["https://drupal.org"],
    'connect-src': ["https://drupal.org","https://updates.drupal.org"]
  },
  notes: 'Drupal verified from official CSP module documentation. Official Content-Security-Policy module provides comprehensive CSP management, reporting endpoint, Libraries API integration, admin interface with validation. Security Kit module available with basic CSP support. Report-Only mode recommended for safe configuration. Dynamic policy modification via csp.policy_alter events. HTTP Response Headers module for custom headers.',
  aliases: ["drupal-cms"],
  lastUpdated: '2025-06-29T00:00:00Z',
  verifiedAt: '2025-07-03T00:00:00.000Z'
});
