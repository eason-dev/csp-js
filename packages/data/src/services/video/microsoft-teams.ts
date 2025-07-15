import { defineServiceInternal } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const MicrosoftTeams = defineServiceInternal({
  id: 'microsoft-teams',
  name: 'Microsoft Teams',
  category: ServiceCategory.VIDEO,
  description: "Microsoft's collaboration and video conferencing platform",
  website: 'https://teams.microsoft.com',
  officialDocs: [
    'https://learn.microsoft.com/en-us/microsoftteams/platform/tabs/how-to/tab-requirements',
    'https://devblogs.microsoft.com/microsoft365dev/action-required-ensure-your-microsoft-teams-apps-are-ready-for-upcoming-domain-changes/',
    'https://learn.microsoft.com/en-us/answers/questions/1785610/what-domain-do-i-specify-in-my-csp-headers-for-tea',
  ],
  directives: {
    'script-src': ['https://statics.teams.cdn.office.net', 'https://*.teams.microsoft.com'],
    'frame-src': [
      'https://teams.microsoft.com',
      'https://*.teams.microsoft.com',
      'https://*.teams.microsoft.us',
      'https://local.teams.office.com',
    ],
    'frame-ancestors': [
      'https://*.cloud.microsoft',
      'https://teams.microsoft.com',
      'https://*.teams.microsoft.com',
      'https://*.teams.microsoft.us',
      'https://local.teams.office.com',
      'https://*.office.com',
      'https://*.officeapps.live.com',
      'https://*.microsoft.com',
      'https://onedrive.live.com',
      'https://*.onedrive.live.com',
    ],
    'connect-src': ['https://teams.microsoft.com', 'https://*.teams.microsoft.com'],
  },
  notes:
    'Microsoft Teams verified from official Microsoft Learn documentation. Critical: Teams apps are migrating to *.cloud.microsoft domain by June 2024 - update CSP frame-ancestors to include this domain for future compatibility. Requires TeamsJS library v2.19+ and comprehensive frame-ancestors directive for Microsoft 365 integration across multiple hosting domains.',
  aliases: ['teams', 'ms-teams'],
  lastUpdated: '2025-06-29T00:00:00Z',
  verifiedAt: '2025-07-03T00:00:00.000Z',
});
