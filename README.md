# CSP Kit 🛡️

<div align="center">

[![NPM Version](https://img.shields.io/npm/v/@csp-kit/generator)](https://www.npmjs.com/package/@csp-kit/generator)
[![NPM Downloads](https://img.shields.io/npm/dm/@csp-kit/generator)](https://www.npmjs.com/package/@csp-kit/generator)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/eason-dev/csp-kit/blob/main/LICENSE)
[![Open Source](https://img.shields.io/badge/Open%20Source-%E2%9D%A4-red.svg)](https://github.com/eason-dev/csp-kit)
[![Build Status](https://img.shields.io/github/actions/workflow/status/eason-dev/csp-kit/ci.yml)](https://github.com/eason-dev/csp-kit/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

**The modern Content Security Policy toolkit for developers** \
**Open Source • 106+ services • Zero config • TypeScript-first • Web interface**

[📖 Documentation](https://csp-kit.eason.ch/docs) • [🌐 Web Generator](https://csp-kit.eason.ch) • [🚀 Quick Start](#-quick-start) • [💬 Discord](https://discord.gg/csp-kit)

</div>

---

## 🎯 Why CSP Kit?

Content Security Policy is **critical for web security**, but manually managing CSP headers is complex and error-prone. CSP Kit transforms this experience:

```javascript
// ❌ Traditional approach: Manual, error-prone, hard to maintain
const csp = "script-src 'self' https://www.googletagmanager.com https://js.stripe.com; style-src 'self' https://fonts.googleapis.com; connect-src 'self' https://api.stripe.com...";

// ✅ CSP Kit approach: Service-based, automatic, always up-to-date
const { header } = generateCSP(['google-analytics', 'stripe', 'google-fonts']);
```

**Transform your security workflow:**
- 🎯 **Service-First**: Configure by services, not directives
- 📦 **106+ Services**: Pre-configured for Google Analytics, Stripe, Intercom, and more
- 🔄 **Always Updated**: Community-driven service definitions with automated monitoring
- 🌐 **Multiple Interfaces**: Web UI, CLI tools, and JavaScript/TypeScript API
- 🚀 **Production Ready**: Used by thousands of developers worldwide
- 🆓 **Free & Open Source**: MIT licensed, free for commercial and personal use

## ✨ Features

### 🌐 **Web Interface** 
**[Try the interactive generator →](https://csp-kit.eason.ch)**
- Visual service selection with real-time CSP preview
- Copy headers, meta tags, or JSON configurations
- Browse and search 106+ supported services
- Test and validate your CSP policies

### 📦 **JavaScript/TypeScript API**
- **Service-First Approach**: Configure by services, not manual directives
- **106+ Popular Services**: Google Analytics, Stripe, Intercom, YouTube, and more
- **Always Up-to-Date**: Community-maintained service definitions
- **Multiple Formats**: Headers, meta tags, or JSON configurations
- **Nonce Support**: Cryptographic nonce generation for secure inline scripts
- **TypeScript-First**: Complete type safety with comprehensive types

### 🛠️ **CLI Tools**
- **Service Management**: Add, update, and validate service definitions
- **Automated Monitoring**: GitHub Actions integration to detect changes
- **Development Workflow**: Streamlined tools for contributors
- **Data Validation**: Comprehensive validation and testing tools

### 🔄 **Ecosystem**
- **Data Package**: Separate `@csp-kit/data` for fast updates
- **Community-Driven**: Open source with active community
- **Production Ready**: Battle-tested in real-world applications
- **Security-First**: Conservative defaults, security warnings, regular audits
- **Community-Driven**: Open source with active community contributions

## 🚀 Quick Start

### 1. Try the Web Interface *(Recommended)*

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

**CLI tools** (optional):

```bash
# Global installation for CLI tools
npm install -g @csp-kit/cli
```

> **📦 Package Architecture**: CSP Kit uses a data-package separation model inspired by [browserslist](https://github.com/browserslist/browserslist). The `@csp-kit/data` package contains service definitions and updates independently from the core library.

### 3. Basic Usage

```javascript
import { generateCSP } from '@csp-kit/generator';

// 🎯 Generate CSP for multiple services
const result = generateCSP(['google-analytics', 'stripe', 'google-fonts']);

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

```javascript
import { generateCSP } from '@csp-kit/generator';

// 🔧 Advanced configuration with custom rules
const result = generateCSP({
  services: ['google-analytics', 'typeform', 'youtube'],
  nonce: true, // Generate cryptographic nonce
  customRules: {
    'script-src': ['https://my-custom-domain.com'],
    'img-src': ['data:', 'blob:'],
  },
  reportUri: 'https://my-site.com/csp-report',
  includeSelf: true,
});

console.log(result);
// {
//   header: "script-src 'self' 'nonce-abc123' https://www.googletagmanager.com ...",
//   nonce: "abc123",
//   warnings: [],
//   includedServices: ["google-analytics", "typeform", "youtube"]
// }

// 📋 Generate multiple formats
const { header, directives, reportOnlyHeader } = result;

// Use report-only for testing
res.setHeader('Content-Security-Policy-Report-Only', reportOnlyHeader);
```

## 📚 Documentation & Resources

| Resource | Description |
|----------|-------------|
| **[🌐 Web Generator](https://csp-kit.eason.ch)** | Interactive CSP generator with visual interface |
| **[📖 Full Documentation](https://csp-kit.eason.ch/docs)** | Complete guides, API reference, and examples |
| **[🛠️ CLI Reference](https://csp-kit.eason.ch/docs/cli-guide)** | Command-line tools documentation |
| **[📦 Service Support](https://csp-kit.eason.ch/docs/service-support)** | List of 106+ supported services |
| **[🤝 Contributing Guide](https://csp-kit.eason.ch/docs/contributing)** | How to contribute new services |
| **[🔄 Upgrade Guide](#-keeping-up-to-date)** | How to upgrade and get latest service data |

### Core Concepts

#### Service-Based Configuration

Instead of manually specifying CSP directives, you specify the services you use:

```javascript
// Traditional approach ❌
const csp =
  "script-src 'self' https://www.googletagmanager.com https://js.stripe.com; img-src 'self' https://www.google-analytics.com";

// CSP Kit approach ✅
const result = generateCSP(['google-analytics', 'stripe']);
```

#### Service Identifiers

Services are identified by their unique names and can include aliases:

```javascript
// Use service by ID
generateCSP(['google-analytics']);

// Use service by alias
generateCSP(['ga4', 'gtag']); // aliases for google-analytics

// Mix IDs and aliases
generateCSP(['google-analytics', 'stripe', 'youtube']);
```

### API Reference

#### `generateCSP(options)`

**Parameters:**

- `options` (string[] | CSPOptions): Services array or configuration object

**CSPOptions:**

```typescript
interface CSPOptions {
  services: string[]; // Array of service identifiers
  nonce?: boolean | string; // Generate nonce or use provided
  customRules?: CSPDirectives; // Additional CSP rules
  reportUri?: string; // CSP violation reporting endpoint
  includeSelf?: boolean; // Include 'self' directive (default: true)
  unsafeInline?: boolean; // Allow unsafe-inline (not recommended)
  unsafeEval?: boolean; // Allow unsafe-eval (not recommended)
}
```

**Returns:**

```typescript
interface CSPResult {
  header: string; // Complete CSP header string
  directives: CSPDirectives; // CSP directives as object
  reportOnlyHeader: string; // Report-only version
  includedServices: string[]; // Successfully included services
  unknownServices: string[]; // Services not found
  warnings: string[]; // Deprecation and other warnings
  nonce?: string; // Generated nonce (if requested)
}
```

#### Other Functions

```javascript
import {
  generateCSPHeader, // Returns only header string
  generateReportOnlyCSP, // Returns report-only header
  generateNonce, // Generate cryptographic nonce
  getService, // Get service definition
  searchServices, // Search services by name/description
  getServicesByCategory, // Get services by category
} from '@csp-kit/generator';
```

## 🔄 Keeping Up-to-Date

### Upgrading Packages

To get the latest service definitions and features:

```bash
# Upgrade both packages together
npm update @csp-kit/generator @csp-kit/data

# Or check for latest versions
npm info @csp-kit/generator @csp-kit/data

# Verify your versions
npm list @csp-kit/generator @csp-kit/data
```

### Why Separate Packages?

- **`@csp-kit/generator`**: Core library with stable API
- **`@csp-kit/data`**: Service definitions that update frequently
- **Benefits**: Get service updates without library changes, faster updates, smaller bundles

## 🛠️ CLI Tools

Install the CLI for service management and contributions:

```bash
npm install -g @csp-kit/cli
```

### Available Commands

```bash
# 🆕 Add a new service interactively
csp-cli add --interactive

# 🔄 Update existing service
csp-cli update google-analytics

# ✅ Validate service definitions
csp-cli validate

# 🔍 Check service for CSP changes
csp-cli check google-analytics --url https://example.com

# 📋 List all services
csp-cli list --category analytics
```

[**→ See full CLI documentation**](https://csp-kit.eason.ch/docs/cli-guide)

## 🌐 Interactive Web Generator

**[Try it now at csp-kit.eason.ch →](https://csp-kit.eason.ch)**

<div align="center">

![Web Interface Preview](https://csp-kit.eason.ch/api/og?title=Interactive%20CSP%20Generator)

</div>

### ✨ Web Interface Features:

| Feature | Description |
|---------|-------------|
| **🎯 Visual Service Selection** | Browse and select from 106+ services with search and filtering |
| **⚡ Real-time Generation** | See CSP policies update instantly as you add/remove services |
| **📋 Multiple Formats** | Copy as HTTP headers, HTML meta tags, or JSON configuration |
| **🔍 Service Details** | View detailed information about each service's CSP requirements |
| **✅ Policy Validation** | Built-in validation with security warnings and suggestions |
| **🔗 Shareable URLs** | Share your configuration with team members via URL |
| **📱 Mobile Responsive** | Works perfectly on desktop, tablet, and mobile devices |

**Perfect for:**
- 🚀 **Getting Started**: Try CSP Kit without any installation
- 👥 **Team Collaboration**: Share configurations with stakeholders
- 🎨 **Visual Exploration**: Discover new services and their requirements
- 📚 **Learning**: Understand how different services affect CSP policies

## 🔐 Security

### Security Considerations

- **Conservative Defaults**: CSP Kit uses strict defaults and warns about insecure configurations
- **Nonce Support**: Built-in nonce generation for secure inline script execution
- **Regular Updates**: Service definitions are actively monitored and updated
- **Community Driven**: Security issues are quickly addressed through community involvement

### Reporting Security Issues

Please report security vulnerabilities through [GitHub Security Advisories](https://github.com/eason-dev/csp-kit/security/advisories/new).

## 🤝 Contributing

CSP Kit thrives on community contributions! Here's how you can help:

### 🎯 **Quick Contributions**

**🆕 Add a New Service** *(Most needed)*
```bash
# Install CLI and add service interactively
npm install -g @csp-kit/cli
csp-cli add --interactive
```

**🔄 Update Existing Service**
```bash
csp-cli update service-name
```

### 📚 **Contribution Resources**

| Guide | Purpose |
|-------|----------|
| **[📖 Contributing Guide](./CONTRIBUTING.md)** | Complete contribution workflow |
| **[🏗️ Architecture Guide](./docs/ARCHITECTURE.md)** | Technical architecture and design |
| **[🔧 Service Definition Guide](./docs/SERVICE_DEFINITION_GUIDE.md)** | How to create service definitions |
| **[🚀 Development Setup](./CONTRIBUTING.md#quick-start)** | Local development environment |

### 🌟 **What We Need Most**

1. **🆕 New Service Definitions** - Add support for more web services
2. **🔄 Service Updates** - Keep existing services up-to-date
3. **📝 Documentation** - Improve guides and examples
4. **🐛 Bug Reports** - Report issues and edge cases
5. **💡 Feature Ideas** - Suggest new features and improvements

### 🎉 **Recognition**

All contributors are recognized in our:
- **[Contributors Page](https://csp-kit.eason.ch/contributors)**
- **[GitHub Contributors](https://github.com/eason-dev/csp-kit/graphs/contributors)**
- **Monthly community highlights**

## 📦 Supported Services (106+)

CSP Kit supports **106+ popular web services** across all major categories:

| Category | Examples | Count |
|----------|----------|-------|
| **📊 Analytics** | Google Analytics, Mixpanel, Hotjar, Segment | 12+ |
| **💳 Payment** | Stripe, PayPal, Square, Shopify | 8+ |
| **📱 Social** | Facebook, Twitter, LinkedIn, Instagram | 15+ |
| **🎥 Media** | YouTube, Vimeo, Twitch | 6+ |
| **💬 Chat & Support** | Intercom, Zendesk, Crisp, Tawk.to | 8+ |
| **📝 Forms** | Typeform, Calendly, Mailchimp | 10+ |
| **🔤 Fonts & CDN** | Google Fonts, jsDelivr, Cloudflare | 12+ |
| **🗺️ Maps** | Google Maps, Mapbox, OpenStreetMap | 4+ |
| **🧪 Testing & Monitoring** | Sentry, New Relic, Cypress | 15+ |
| **🛍️ E-commerce** | Shopify, WooCommerce, Squarespace | 8+ |
| **📚 Other** | Auth0, Firebase, Slack, Notion | 28+ |

**[→ View all supported services](https://csp-kit.eason.ch/services)**

### 🚀 Request New Services

- **[Request via Web Interface](https://csp-kit.eason.ch/request-service)** *(Recommended)*
- **[GitHub Issues](https://github.com/eason-dev/csp-kit/issues/new?template=add-service.md)**
- **[Contribute via CLI](#-contributing)** - Use `csp-cli add --interactive`

## 📈 Roadmap & Future Plans

### 🚀 **Coming Soon**

- **🔌 Framework Integrations**: Next.js plugin, Express middleware, Webpack plugin
- **🤖 AI-Powered Service Detection**: Automatically detect services from your codebase
- **📊 CSP Analytics**: Track CSP violations and optimize policies
- **🔄 Auto-Updates**: Automatic service definition updates
- **🌍 Internationalization**: Multi-language support for the web interface

### 💭 **Ideas & Discussions**

- **[📋 Full Roadmap](./ROADMAP.md)** - Detailed development plans
- **[💬 GitHub Discussions](https://github.com/eason-dev/csp-kit/discussions)** - Share ideas and feedback
- **[🗳️ Feature Requests](https://github.com/eason-dev/csp-kit/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)** - Vote on upcoming features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Content Security Policy specification](https://www.w3.org/TR/CSP3/) by W3C
- [Helmet.js](https://helmetjs.github.io/) for CSP middleware inspiration
- [browserslist](https://github.com/browserslist/browserslist) for data package architecture
- All contributors who help maintain service definitions

## 💬 Community & Support

### 🆘 **Get Help**

| Platform | Purpose | Response Time |
|----------|---------|---------------|
| **[💬 GitHub Discussions](https://github.com/eason-dev/csp-kit/discussions)** | Questions, ideas, general discussion | ~24 hours |
| **[🐛 GitHub Issues](https://github.com/eason-dev/csp-kit/issues)** | Bug reports, feature requests | ~48 hours |
| **[📖 Documentation](https://csp-kit.eason.ch/docs)** | Guides, API reference, examples | Instant |
| **[🌐 Web Interface](https://csp-kit.eason.ch)** | Try without installation | Instant |

### 🤝 **Community**

- **[👥 Contributors](https://github.com/eason-dev/csp-kit/graphs/contributors)** - Meet our amazing contributors
- **[⭐ Stargazers](https://github.com/eason-dev/csp-kit/stargazers)** - See who's supporting the project
- **[🔍 Dependents](https://github.com/eason-dev/csp-kit/network/dependents)** - Projects using CSP Kit
- **[📊 Package Stats](https://www.npmjs.com/package/@csp-kit/generator)** - Download statistics

### 🏢 **Enterprise Support**

Need dedicated support, custom service definitions, or enterprise features?
**[Contact us →](mailto:enterprise@csp-kit.eason.ch)**

---

<div align="center">

### 🙏 **Acknowledgments**

- **[W3C CSP Specification](https://www.w3.org/TR/CSP3/)** - The foundation of web security
- **[Helmet.js](https://helmetjs.github.io/)** - Inspiration for middleware approach
- **[browserslist](https://github.com/browserslist/browserslist)** - Data package architecture model
- **All contributors** who maintain service definitions and improve the toolkit

**Star us on GitHub • Share with your team • Contribute to the community**

⭐ **[github.com/eason-dev/csp-kit](https://github.com/eason-dev/csp-kit)** ⭐

### 📄 **License**

**CSP Kit is free and open source software.**

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

- **License**: [MIT License](./LICENSE)
- **Commercial Use**: ✅ Allowed
- **Modification**: ✅ Allowed  
- **Distribution**: ✅ Allowed
- **Private Use**: ✅ Allowed

<p>
  <strong>Made with ❤️ by the CSP Kit team and community</strong><br>
  <em>Securing the web, one policy at a time</em><br><br>
  <strong>Copyright (c) 2025 Eason Chang. Free for commercial and personal use.</strong>
</p>

**[🌐 csp-kit.eason.ch](https://csp-kit.eason.ch)** • **[📖 Documentation](https://csp-kit.eason.ch/docs)** • **[💬 Community](https://github.com/eason-dev/csp-kit/discussions)**

</div>
