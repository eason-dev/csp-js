# CSP Kit 🛡️

<div align="center">

[![Generator Version](https://img.shields.io/npm/v/@csp-kit/generator?label=%40csp-kit%2Fgenerator)](https://www.npmjs.com/package/@csp-kit/generator)
[![Data Version](https://img.shields.io/npm/v/@csp-kit/data?label=%40csp-kit%2Fdata)](https://www.npmjs.com/package/@csp-kit/data)
[![NPM Downloads](https://img.shields.io/npm/dm/@csp-kit/data)](https://www.npmjs.com/package/@csp-kit/data)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/eason-dev/csp-kit/blob/main/LICENSE)

**The modern Content Security Policy toolkit for developers** \
**Open Source • 106+ services • Zero config • TypeScript-first • Web interface**

[📖 Documentation](https://csp-kit.eason.ch/docs) • [🌐 Web Generator](https://csp-kit.eason.ch) • [🚀 Quick Start](#-quick-start)

</div>

---

## Table of Contents

- [Why CSP Kit?](#-why-csp-kit)
- [Features](#-features)
- [Quick Start](#-quick-start)
- [API Reference](#-api-reference)
- [Custom Services](#-custom-services)
- [Available Services](#-available-services)
- [Documentation & Resources](#-documentation--resources)
- [Keeping Up-to-Date](#-keeping-up-to-date)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Why CSP Kit?

Content Security Policy is **critical for web security**, but manually managing CSP headers is complex and error-prone. CSP Kit transforms this experience:

```javascript
// ❌ Traditional approach: Manual, error-prone, hard to maintain
const csp =
  "script-src 'self' https://www.googletagmanager.com https://js.stripe.com; style-src 'self' https://fonts.googleapis.com; connect-src 'self' https://api.stripe.com...";

// ✅ CSP Kit approach: Type-safe, automatic, always up-to-date
import { generateCSP } from '@csp-kit/generator';
import { GoogleAnalytics, Stripe, GoogleFonts } from '@csp-kit/data';

const { header } = generateCSP({
  services: [GoogleAnalytics, Stripe, GoogleFonts],
});
```

**Key Benefits:**

- 🎯 **Service-First**: Import services directly, no manual CSP directives
- 📦 **106+ Services**: Pre-configured CSP for all major web services
- 🔧 **TypeScript**: Full type safety and IntelliSense support
- 🌐 **Web Interface**: Visual generator at [csp-kit.eason.ch](https://csp-kit.eason.ch)

## ✨ Features

- **[Web Interface](https://csp-kit.eason.ch)**: Visual service selection, instant CSP generation
- **TypeScript API**: Type-safe service imports with tree-shaking
- **Nonce Support**: Built-in cryptographic nonce generation
- **Multiple Outputs**: Headers, meta tags, or JSON format

## 🚀 Quick Start

### 1. Try the Web Interface _(Recommended)_

Visit **[csp-kit.eason.ch](https://csp-kit.eason.ch)** for an interactive experience:

- Select services visually
- See real-time CSP generation
- Copy ready-to-use headers
- No installation required

### 2. Install for Your Project

**Core packages** (both required):

```bash
# npm
npm install @csp-kit/generator @csp-kit/data

# yarn
yarn add @csp-kit/generator @csp-kit/data

# pnpm
pnpm add @csp-kit/generator @csp-kit/data
```

### 3. Basic Usage

```typescript
import { generateCSP } from '@csp-kit/generator';
import { GoogleAnalytics, Stripe, GoogleFonts } from '@csp-kit/data';

// 🎯 Generate CSP for multiple services
const result = generateCSP({
  services: [GoogleAnalytics, Stripe, GoogleFonts],
});

console.log(result.header);
// Output: "script-src 'self' https://www.googletagmanager.com https://js.stripe.com; style-src 'self' https://fonts.googleapis.com; ..."

// 🚀 Use in Express.js
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', result.header);
  next();
});

// 🔐 Use in Next.js
export default function handler(req, res) {
  res.setHeader('Content-Security-Policy', result.header);
  // Your API logic
}
```

### 4. Advanced Configuration

```typescript
import { generateCSP, generateNonce } from '@csp-kit/generator';
import { GoogleAnalytics, Typeform, Youtube } from '@csp-kit/data';

// 🔧 Advanced configuration with custom rules
const nonce = generateNonce();

const result = generateCSP({
  services: [GoogleAnalytics, Typeform, Youtube],
  nonce, // Use cryptographic nonce
  additionalRules: {
    'script-src': ['https://my-custom-domain.com'],
    'img-src': ['data:', 'blob:'],
  },
  reportUri: 'https://my-site.com/csp-report',
  includeSelf: true,
});

console.log(result);
// {
//   header: "script-src 'self' 'nonce-abc123' https://www.googletagmanager.com ...",
//   directives: { 'script-src': [...], 'style-src': [...] },
//   reportOnlyHeader: "Content-Security-Policy-Report-Only: ...",
//   includedServices: ["google-analytics", "typeform", "youtube"],
//   warnings: [],
//   nonce: "abc123"
// }

// 📋 Use report-only for testing
res.setHeader('Content-Security-Policy-Report-Only', result.reportOnlyHeader);
```

## 📚 API Reference

### Complete Example with All Options

```typescript
import { generateCSP, generateNonce } from '@csp-kit/generator';
import { GoogleAnalytics, Stripe, Cloudflare } from '@csp-kit/data';

// Generate a cryptographic nonce
const nonce = generateNonce();

// Configure CSP with all available options
const result = generateCSP({
  // Required: Services to include
  services: [GoogleAnalytics, Stripe, Cloudflare],

  // Optional: Nonce for inline scripts
  nonce: nonce, // or true to auto-generate, or your own string

  // Optional: Additional custom rules
  additionalRules: {
    'script-src': ['https://my-custom-cdn.com'],
    'img-src': ['data:', 'blob:'],
    'font-src': ['https://my-fonts.com'],
  },

  // Optional: CSP violation reporting endpoint
  reportUri: 'https://my-site.com/csp-violations',

  // Optional: Include 'self' in directives (default: false)
  includeSelf: true,

  // Optional: Allow unsafe-inline (NOT recommended, default: false)
  includeUnsafeInline: false,

  // Optional: Allow unsafe-eval (NOT recommended, default: false)
  includeUnsafeEval: false,

  // Optional: Environment-specific overrides
  development: {
    includeUnsafeEval: true, // Allow eval() in development only
    includeUnsafeInline: true, // Allow inline scripts in development
  },
  production: {
    reportUri: 'https://production.com/csp-report',
  },
});

// Access all result properties
console.log(result.header); // "script-src 'self' 'nonce-xyz' https://..."
console.log(result.directives); // { 'script-src': [...], 'style-src': [...] }
console.log(result.reportOnlyHeader); // "Content-Security-Policy-Report-Only: ..."
console.log(result.includedServices); // ["google-analytics", "stripe", "cloudflare"]
console.log(result.unknownServices); // [] (services that weren't found)
console.log(result.nonce); // "xyz123..." (the generated nonce)

// Apply the CSP header
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', result.header);
  next();
});
```

### Key Functions

```typescript
import {
  generateCSP, // Main generator function (shown above)
  generateCSPHeader, // Returns only the header string
  generateNonce, // Generate cryptographic nonce
  defineService, // Define custom services
} from '@csp-kit/generator';

// generateCSPHeader - Shorthand for getting just the header
const header = generateCSPHeader({
  services: [GoogleAnalytics, Stripe],
});
// Returns: "script-src 'self' https://www.google-analytics.com..."

// generateNonce - Create secure nonces
const nonce = generateNonce(); // Default: 16 bytes, base64
const hexNonce = generateNonce({
  encoding: 'hex', // 'base64' or 'hex'
  length: 32, // Length in bytes
});
```

## 🔧 Custom Services

Define your own services for internal or unsupported third-party services:

```typescript
import { defineService } from '@csp-kit/data';
import { generateCSP } from '@csp-kit/generator';

// Define a custom service - only directives are required
const MyCustomService = defineService({
  directives: {
    'script-src': ['https://analytics.internal.company.com'],
    'connect-src': ['https://api.internal.company.com'],
    'img-src': ['https://assets.internal.company.com'],
  },
});

// Use it like any other service
const result = generateCSP({
  services: [MyCustomService, GoogleAnalytics, Stripe],
});
```

## 📦 Available Services

CSP Kit includes 106+ pre-configured services. Import them by name from `@csp-kit/data`:

```typescript
import {
  // Analytics
  AdobeAnalytics, // Adobe Analytics
  Amplitude, // Amplitude Analytics
  CloudflareAnalytics, // Cloudflare Web Analytics
  CrazyEgg, // Crazy Egg Analytics
  FathomAnalytics, // Fathom Analytics
  GoogleAnalytics, // Google Analytics 4
  GoogleOptimize, // Google Optimize
  GoogleTagManager, // Google Tag Manager
  Hotjar, // Hotjar Analytics
  MicrosoftClarity, // Microsoft Clarity
  Mixpanel, // Mixpanel Analytics
  PlausibleAnalytics, // Plausible Analytics
  Segment, // Segment CDP
  Vwo, // VWO Analytics

  // Payment
  ApplePay, // Apple Pay
  GooglePay, // Google Pay
  Paypal, // PayPal
  Shopify, // Shopify
  Square, // Square Payments
  Stripe, // Stripe

  // Authentication
  Auth0, // Auth0
  FirebaseAuth, // Firebase Authentication
  Okta, // Okta
  Onelogin, // OneLogin
  PingIdentity, // Ping Identity

  // Video & Media
  Bigbluebutton, // BigBlueButton
  GoogleMeet, // Google Meet
  JitsiMeet, // Jitsi Meet
  MicrosoftTeams, // Microsoft Teams
  Twitch, // Twitch
  Vimeo, // Vimeo
  Youtube, // YouTube
  Zoom, // Zoom

  // Social Media
  Discord, // Discord Widget
  Facebook, // Facebook SDK
  FacebookAds, // Facebook Ads
  Instagram, // Instagram Embeds
  Linkedin, // LinkedIn
  LinkedinAds, // LinkedIn Ads
  Pinterest, // Pinterest
  Slack, // Slack
  Snapchat, // Snapchat
  Tiktok, // TikTok
  Twitter, // Twitter/X
  TwitterAds, // Twitter Ads
  Whatsapp, // WhatsApp

  // Chat & Support
  CrispChat, // Crisp Chat
  Drift, // Drift Chat
  Freshchat, // Freshchat
  Intercom, // Intercom
  TawkTo, // Tawk.to
  Zendesk, // Zendesk

  // Forms & Email
  Calendly, // Calendly
  CampaignMonitor, // Campaign Monitor
  ConstantContact, // Constant Contact
  Convertkit, // ConvertKit
  Mailchimp, // Mailchimp
  Mailgun, // Mailgun
  Sendgrid, // SendGrid
  Typeform, // Typeform
  Unbounce, // Unbounce

  // CDN & Infrastructure
  AwsCloudfront, // AWS CloudFront
  AzureCdn, // Azure CDN
  Cdnjs, // cdnjs
  Cloudflare, // Cloudflare (legacy alias for AwsCloudfront)
  Fastly, // Fastly CDN
  Jsdelivr, // jsDelivr
  Keycdn, // KeyCDN
  Maxcdn, // MaxCDN
  Unpkg, // unpkg

  // Monitoring & Analytics
  Datadog, // Datadog RUM
  NewRelic, // New Relic Browser
  Sentry, // Sentry

  // Marketing & Advertising
  GoogleAds, // Google Ads
  Hubspot, // HubSpot
  MicrosoftAds, // Microsoft Ads
  Optimizely, // Optimizely

  // Maps
  GoogleMaps, // Google Maps
  Mapbox, // Mapbox
  OpenstreetmapLeaflet, // OpenStreetMap with Leaflet

  // Fonts
  GoogleFonts, // Google Fonts

  // CMS & Platforms
  Contentful, // Contentful
  Divi, // Divi
  Drupal, // Drupal
  Elementor, // Elementor
  Gitbook, // GitBook
  Sanity, // Sanity
  Squarespace, // Squarespace
  Strapi, // Strapi
  Teachable, // Teachable
  Thinkific, // Thinkific
  Udemy, // Udemy
  Webflow, // Webflow
  Wix, // Wix
  Woocommerce, // WooCommerce
  Wordpress, // WordPress

  // Search & Discovery
  Algolia, // Algolia
  Constructor, // Constructor.io
  Elasticsearch, // Elasticsearch
  Klevu, // Klevu
  Swiftype, // Swiftype

  // Other
  Notion, // Notion
} from '@csp-kit/data';
```

View the full interactive list at [csp-kit.eason.ch/services](https://csp-kit.eason.ch/services)

## 📚 Documentation & Resources

| Resource                                                                | Description                                     |
| ----------------------------------------------------------------------- | ----------------------------------------------- |
| **[🌐 Web Generator](https://csp-kit.eason.ch)**                        | Interactive CSP generator with visual interface |
| **[📖 Full Documentation](https://csp-kit.eason.ch/docs)**              | Complete guides, API reference, and examples    |
| **[🛠️ API Reference](https://csp-kit.eason.ch/docs/api-reference)**     | Detailed API documentation                      |
| **[📦 Service Catalog](https://csp-kit.eason.ch/services)**             | Browse all 106+ supported services              |
| **[🤝 Contributing Guide](https://csp-kit.eason.ch/docs/contributing)** | How to contribute new services                  |
| **[💻 Development Setup](./DEVELOPMENT.md)**                            | Complete IDE and environment setup              |

## 🔄 Keeping Up-to-Date

### Getting Updates

```bash
# Update to latest versions
npm update @csp-kit/generator @csp-kit/data

# Check for available updates
npm outdated @csp-kit/generator @csp-kit/data
```

## 🤝 Contributing

We welcome contributions! CSP Kit is community-driven, and we appreciate:

- 🆕 **New Service Definitions**: Add support for new services
- 🐛 **Bug Reports**: Help us identify and fix issues
- 📖 **Documentation**: Improve guides and examples
- 🌐 **Translations**: Help internationalize the project
- ⚡ **Performance**: Optimize code and reduce bundle size

See our [Contributing Guide](CONTRIBUTING.md) for detailed instructions.

## 📄 License

CSP Kit is [MIT licensed](LICENSE). Free for commercial and personal use.

---

<div align="center">

**[Get Started →](https://csp-kit.eason.ch)** | **[Documentation](https://csp-kit.eason.ch/docs)** | **[GitHub](https://github.com/eason-dev/csp-kit)**

Made with ❤️ by [contributors](https://github.com/eason-dev/csp-kit/graphs/contributors)

</div>
