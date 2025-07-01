/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://csp-kit.eason.ch',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/server-sitemap-index.xml'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      `${process.env.SITE_URL || 'https://csp-kit.eason.ch'}/server-sitemap-index.xml`,
      `${process.env.SITE_URL || 'https://csp-kit.eason.ch'}/docs/sitemap.xml`,
    ],
  },
  transform: async (config, path) => {
    // Custom transform for service pages
    if (path.startsWith('/service/')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      }
    }

    // Default transform
    return {
      loc: path,
      changefreq: 'daily',
      priority: path === '/' ? 1.0 : 0.7,
      lastmod: new Date().toISOString(),
    }
  },
}