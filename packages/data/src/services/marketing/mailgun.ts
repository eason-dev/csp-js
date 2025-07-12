import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Mailgun = defineService({
  id: 'mailgun',
  name: 'Mailgun',
  category: ServiceCategory.OTHER,
  description: 'Email delivery service and API for developers',
  website: 'https://www.mailgun.com/',
  officialDocs: [
    "https://documentation.mailgun.com/en/latest/user_manual.html#csp-headers",
    "https://help.mailgun.com/hc/en-us/articles/203380100-Where-Can-I-Find-My-API-Key-and-SMTP-Credentials-"
  ],
  directives: {
    'script-src': ["https://mailgun.com"],
    'connect-src': ["https://api.mailgun.net","https://api.eu.mailgun.net"]
  },
  notes: 'Mailgun email delivery service for developers. Different API endpoints for US and EU regions. SMTP credentials may require additional domains.',
  aliases: ["mailgun-email"],
  lastUpdated: '2024-06-29T00:00:00.000Z',
  verifiedAt: '2025-07-03T00:00:00.000Z'
});
