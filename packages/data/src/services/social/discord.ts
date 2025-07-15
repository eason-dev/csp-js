import { defineServiceInternal } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const Discord = defineServiceInternal({
  id: 'discord',
  name: 'Discord',
  category: ServiceCategory.SOCIAL,
  description: 'Discord chat platform with widget embeds and invites',
  website: 'https://discord.com',
  officialDocs: [
    'https://discord.com/developers/docs/resources/widget',
    'https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks',
  ],
  directives: {
    'script-src': ['https://discord.com'],
    'frame-src': ['https://discord.com'],
    'img-src': ['https://cdn.discordapp.com'],
  },
  notes:
    'Discord verified from official widget documentation. Widget doesn\'t set CSP headers causing embedding problems. Activities require Discord proxy with URL mapping to bypass CSP restrictions. Chrome supports credentialless="true" but Firefox doesn\'t. Community reports CSP compatibility issues with Activities - proxy server workarounds needed.',
  aliases: ['discord-widget'],
  lastUpdated: '2024-12-29T00:00:00.000Z',
  verifiedAt: '2025-07-03T00:00:00.000Z',
});
