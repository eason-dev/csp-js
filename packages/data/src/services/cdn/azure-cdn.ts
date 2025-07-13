import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const AzureCdn = defineService({
  id: 'azure-cdn',
  name: 'Azure CDN',
  category: ServiceCategory.CDN,
  description: 'Microsoft Azure content delivery network',
  website: 'https://azure.microsoft.com/en-us/services/cdn/',
  officialDocs: [
    "https://learn.microsoft.com/en-us/azure/frontdoor/front-door-security-headers",
    "https://learn.microsoft.com/en-us/azure/api-management/"
  ],
  directives: {
    'script-src': ["https://*.azureedge.net"],
    'connect-src': ["https://*.azureedge.net"],
    'img-src': ["https://*.azureedge.net"],
    'style-src': ["https://*.azureedge.net"]
  },
  notes: 'Azure CDN verified from official Microsoft documentation. CSP headers configured via Azure Front Door Rules Engine. API Management has CSP and CORS configuration support. SharePoint Framework with Azure CDN deployment guidance available. Power Pages provides CSP management documentation. Rules Engine allows CSP header configuration for trusted script sources.',
  aliases: ["azure-content-delivery"],
  lastUpdated: '2025-06-29T00:00:00Z',
  verifiedAt: '2025-07-03T00:00:00.000Z'
});
