// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'CSP Kit',
  tagline: 'Content Security Policy utilities for JavaScript',
  favicon: 'img/favicon.ico',

  url: 'https://csp-kit.eason.ch',
  baseUrl: '/docs/',

  organizationName: 'eason-dev',
  projectName: 'csp-kit',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          path: '../../docs',
          editUrl: 'https://github.com/eason-dev/csp-kit/tree/main/docs/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'CSP Kit',
        logo: {
          alt: 'CSP Kit Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://github.com/eason-dev/csp-kit',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Architecture',
                to: '/ARCHITECTURE',
              },
              {
                label: 'Maintainer Guide',
                to: '/MAINTAINER_GUIDE',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/eason-dev/csp-kit',
              },
              {
                label: 'NPM',
                href: 'https://www.npmjs.com/package/@csp-kit/generator',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Main Site',
                href: 'https://csp-kit.eason.ch',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} CSP Kit. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;