import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const CampaignMonitor = defineService({
  id: 'campaign-monitor',
  name: 'Campaign Monitor',
  category: ServiceCategory.OTHER,
  description: 'Email marketing platform with design tools and automation',
  website: 'https://www.campaignmonitor.com/',
  officialDocs: [
    'https://www.campaignmonitor.com/api/',
    'https://help.campaignmonitor.com/s/article/html-signup-forms',
  ],
  directives: {
    'script-src': ['https://campaignmonitor.com', 'https://www.campaignmonitor.com'],
    'frame-src': ['https://campaignmonitor.com', 'https://www.campaignmonitor.com'],
    'connect-src': ['https://api.createsend.com'],
  },
  notes:
    'Campaign Monitor verified from official API and HTML signup forms documentation. External session API used as iframe source for embedding within applications. HTML signup forms can be embedded on websites. Recommends linking to forms in emails rather than embedding for reliability. No specific official CSP documentation found - contact support for detailed requirements. Uses CreateSend API for backend operations.',
  aliases: ['createsend'],
  lastUpdated: '2024-06-29T00:00:00.000Z',
  verifiedAt: '2025-07-03T00:00:00.000Z',
});
