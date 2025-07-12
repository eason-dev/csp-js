import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Mailchimp = defineService({
  id: 'mailchimp',
  name: 'Mailchimp',
  category: ServiceCategory.FORMS,
  description: 'Email marketing platform with signup forms and automation',
  website: 'https://mailchimp.com',
  officialDocs: [
    "https://mailchimp.com/developer/marketing/guides/create-signup-form/",
    "https://mailchimp.com/help/add-a-signup-form-to-your-website/"
  ],
  directives: {
    'script-src': ["https://chimpstatic.com"],
    'connect-src': ["https://us1.api.mailchimp.com","https://chimpstatic.com"],
    'style-src': ["https://chimpstatic.com"]
  },
  notes: 'Mailchimp signup forms and embeds',
  aliases: ["mailchimp-forms"],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-03T00:00:00.000Z'
});
