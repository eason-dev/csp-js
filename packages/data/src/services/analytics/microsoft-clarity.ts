import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const MicrosoftClarity = defineService({
  id: 'microsoft-clarity',
  name: 'Microsoft Clarity',
  category: ServiceCategory.ANALYTICS,
  description: 'Free user behavior analytics tool with heatmaps and session recordings',
  website: 'https://clarity.microsoft.com/',
  officialDocs: [
    "https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-csp",
    "https://github.com/microsoft/clarity/issues/688"
  ],
  directives: {
    'script-src': ["https://www.clarity.ms","https://*.clarity.ms"],
    'connect-src': ["https://*.clarity.ms","https://c.bing.com"],
    'img-src': ["https://*.clarity.ms"],
    'style-src': ["'unsafe-inline'"]
  },
  requiresDynamic: true,
  notes: 'Clarity uses load balancing across multiple subdomains (a-z.clarity.ms) Requires \'unsafe-inline\' for style-src due to inline styles Uses wildcard *.clarity.ms to cover all subdomains c.bing.com is required for analytics integration CSP is not strictly required for Clarity to work',
  aliases: ["clarity","ms-clarity"],
  lastUpdated: '2024-06-28T00:00:00.000Z',
  verifiedAt: '2025-07-03T00:00:00.000Z'
});
