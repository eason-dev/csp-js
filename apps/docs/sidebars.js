/**
 * Creating a sidebar enables you to:
 * - create an ordered group of docs
 * - render a sidebar for each doc of that group
 * - provide next/previous navigation
 *
 * The sidebars can be generated from the filesystem, or explicitly defined here.
 *
 * Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // Main documentation sidebar with logical organization
  tutorialSidebar: [
    // Introduction and Overview
    {
      type: 'doc',
      id: 'index',
      label: 'Introduction'
    },

    // Getting Started Section
    {
      type: 'category',
      label: '🚀 Getting Started',
      collapsible: true,
      collapsed: false,
      items: [
        'getting-started',
        'web-interface',
        'migration-guide'
      ]
    },

    // Core Documentation
    {
      type: 'category',
      label: '📚 Core Documentation',
      collapsible: true,
      collapsed: false,
      items: [
        'api-reference',
        'cli-guide',
        'service-support'
      ]
    },

    // Framework Examples
    {
      type: 'category',
      label: '🔧 Framework Integration',
      collapsible: true,
      collapsed: true,
      items: [
        'examples/nextjs'
        // More framework examples can be added here
      ]
    },

    // Development and Contributing
    {
      type: 'category',
      label: '🤝 Contributing',
      collapsible: true,
      collapsed: true,
      items: [
        'contributing',
        'service-development-guide'
      ]
    },

    // Maintainer Documentation
    {
      type: 'category',
      label: '🛠️ Maintainer Guides',
      collapsible: true,
      collapsed: true,
      items: [
        'maintainer/ARCHITECTURE',
        'maintainer/SERVICE_DEFINITION_GUIDE',
        'maintainer/MAINTAINER_GUIDE',
        'maintainer/NPM_PUBLISHING_GUIDE',
        'maintainer/RELEASE_PROCESS'
      ]
    },

    // Legacy and Migration
    {
      type: 'category',
      label: '🔄 Migration & Legacy',
      collapsible: true,
      collapsed: true,
      items: [
        'upgrade-guide'
      ]
    }
  ]
};

module.exports = sidebars;