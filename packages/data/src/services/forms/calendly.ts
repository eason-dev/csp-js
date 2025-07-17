import { defineServiceInternal } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Calendly = defineServiceInternal({
  id: 'calendly',
  name: 'Calendly',
  category: ServiceCategory.FORMS,
  description: 'Scheduling software for appointments and meetings',
  website: 'https://calendly.com',
  officialDocs: [
    'https://developer.calendly.com/docs/embed-options-overview',
    'https://help.calendly.com/hc/en-us/articles/360020052833-Advanced-embed-options',
  ],
  directives: {
    'script-src': ['https://assets.calendly.com'],
    'frame-src': ['https://calendly.com'],
    'style-src': ['https://assets.calendly.com'],
  },
  notes:
    'Calendly verified from official embed documentation. Uses iframe by default for popup integrations. JavaScript widget loads from assets.calendly.com. Advanced embed options available for developers. Child-src may also be required for iframe compatibility. Direct iframe embedding supported with simple frame-src allowlist.',
  aliases: ['calendly-widget'],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-03T00:00:00.000Z',
});
