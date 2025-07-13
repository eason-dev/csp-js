import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Typeform = defineService({
  id: 'typeform',
  name: 'Typeform',
  category: ServiceCategory.FORMS,
  description: 'Online form builder for creating surveys, quizzes, and questionnaires',
  website: 'https://www.typeform.com/',
  officialDocs: [
    "https://community.typeform.com/integrate-your-typeform-43/csp-allowing-form-submissions-to-typeform-via-intercom-integration-9338",
    "https://medium.com/typeforms-engineering-blog/why-did-we-rewrite-typeform-embed-f0b16fd4fbd3"
  ],
  directives: {
    'script-src': ["https://embed.typeform.com"],
    'style-src': ["https://embed.typeform.com"],
    'frame-src': ["https://form.typeform.com"],
    'form-action': ["https://form.typeform.com","https://intercom-integration.typeform.com"],
    'connect-src': ["https://api.typeform.com","https://form.typeform.com"],
    'img-src': ["https://images.typeform.com"]
  },
  notes: 'Typeform verified from official engineering blog and community CSP documentation. Requires embed.typeform.com for scripts and styles, form.typeform.com for frame embedding. HTTPS required for all embeds. Intercom integration needs additional form-action permissions.',
  aliases: ["typeform-embed"],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-04T00:00:00.000Z'
});
