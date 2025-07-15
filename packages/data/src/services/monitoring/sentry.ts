import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Sentry = defineService({
  id: 'sentry',
  name: 'Sentry',
  category: ServiceCategory.MONITORING,
  description: 'Application monitoring and error tracking platform',
  website: 'https://sentry.io',
  officialDocs: [
    'https://docs.sentry.io/platforms/javascript/install/',
    'https://docs.sentry.io/product/security/content-security-policy/',
  ],
  directives: {
    'script-src': ['https://browser.sentry-cdn.com'],
    'connect-src': ['https://sentry.io', 'https://o*.ingest.sentry.io'],
  },
  notes: 'Sentry JavaScript SDK for error monitoring',
  aliases: ['sentry-js'],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-03T00:00:00.000Z',
});
