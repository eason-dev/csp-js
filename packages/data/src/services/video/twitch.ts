import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Twitch = defineService({
  id: 'twitch',
  name: 'Twitch',
  category: ServiceCategory.VIDEO,
  description: 'Twitch live streaming platform for embedded video players and chat',
  website: 'https://twitch.tv',
  officialDocs: [
    'https://dev.twitch.tv/docs/embed/',
    'https://dev.twitch.tv/docs/embed/video-and-clips/',
    'https://discuss.dev.twitch.com/t/new-extensions-policy-for-content-security-policy-csp-directives-and-timeline-for-enforcement/33695',
  ],
  directives: {
    'script-src': ['https://player.twitch.tv', 'https://embed.twitch.tv'],
    'frame-src': ['https://player.twitch.tv', 'https://embed.twitch.tv', 'https://clips.twitch.tv'],
    'img-src': ['https://static-cdn.jtvnw.net', 'https://clips-media-assets2.twitch.tv'],
    'connect-src': [
      'https://gql.twitch.tv',
      'https://api.twitch.tv',
      'https://irc-ws.chat.twitch.tv',
    ],
  },
  notes:
    'Twitch verified from official developer documentation and forums. Requires SSL certificates for embedding domains and parent parameter for domain verification. Extensions use iframe sandboxing with dynamically constructed CSP. CSP policy updated in 2024 for Extensions enforcement. Chat integration requires websocket connections to irc-ws.chat.twitch.tv.',
  aliases: ['twitch-player'],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-03T00:00:00.000Z',
});
