import { defineServiceInternal } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Cypress = defineServiceInternal({
  id: 'cypress',
  name: 'Cypress',
  category: ServiceCategory.TESTING,
  description: 'End-to-end testing framework for web applications',
  website: 'https://www.cypress.io',
  officialDocs: [
    'https://docs.cypress.io/app/references/content-security-policy',
    'https://docs.cypress.io/guides/guides/content-security-policy',
    'https://docs.cypress.io/app/references/experiments',
  ],
  directives: {
    'script-src': ['https://download.cypress.io', "'unsafe-eval'"],
    'connect-src': ['https://api.cypress.io', 'https://dashboard.cypress.io'],
  },
  requiresDynamic: true,
  notes:
    "Cypress verified from official documentation. Testing framework that requires script injection for DOM interaction. By default, Cypress strips CSP headers to prevent blocking. Use experimentalCspAllowList configuration for CSP testing. Requires 'unsafe-eval' for test execution. Document.domain injection discontinued in v14.0.0 - use cy.origin() for cross-origin testing.",
  aliases: ['cy'],
  lastUpdated: '2025-06-29T00:00:00Z',
  verifiedAt: '2025-07-03T00:00:00.000Z',
});
