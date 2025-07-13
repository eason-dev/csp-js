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

// ✅ CSP Kit approach: Type-safe, automatic, always up-to-date
import { generateCSP } from '@csp-kit/generator';
import { GoogleAnalytics, Stripe, GoogleFonts } from '@csp-kit/data';

const { header } = generateCSP({
  services: [GoogleAnalytics, Stripe, GoogleFonts]
});
```

**Transform your security workflow:**
- 🎯 **Service-First**: Configure by services, not directives
- 📦 **106+ Services**: Pre-configured for Google Analytics, Stripe, Intercom, and more
- 🔄 **Always Updated**: Community-driven service definitions with automated monitoring
- 💪 **TypeScript-First**: Full type safety with tree-shakeable ES modules
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
- **TypeScript-First**: Import services as typed objects for full IntelliSense support
- **Tree-Shakeable**: Only bundle the services you actually use
- **106+ Popular Services**: Google Analytics, Stripe, Intercom, YouTube, and more
- **Always Up-to-Date**: Community-maintained service definitions
- **Multiple Formats**: Headers, meta tags, or JSON configurations
- **Nonce Support**: Cryptographic nonce generation for secure inline scripts

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

```typescript
import { generateCSP } from '@csp-kit/generator';
import { GoogleAnalytics, Stripe, GoogleFonts } from '@csp-kit/data';

// 🎯 Generate CSP for multiple services
const result = generateCSP({
  services: [GoogleAnalytics, Stripe, GoogleFonts]
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

### 5. TypeScript Benefits

```typescript
import { generateCSP, type CSPService } from '@csp-kit/generator';
import { GoogleAnalytics, Stripe } from '@csp-kit/data';

// ✅ Full type safety - services are typed objects
const services: CSPService[] = [GoogleAnalytics, Stripe];

// ✅ IntelliSense support - see all available properties
console.log(GoogleAnalytics.id); // "google-analytics"
console.log(GoogleAnalytics.category); // "analytics"
console.log(GoogleAnalytics.directives); // { 'script-src': [...], ... }

// ✅ Tree-shaking - only imports what you use
// Unused services are automatically removed from your bundle
```

## 📚 Documentation & Resources

| Resource | Description |
|----------|-------------|
| **[🌐 Web Generator](https://csp-kit.eason.ch)** | Interactive CSP generator with visual interface |
| **[📖 Full Documentation](https://csp-kit.eason.ch/docs)** | Complete guides, API reference, and examples |
| **[🛠️ API Reference](https://csp-kit.eason.ch/docs/api-reference)** | Detailed API documentation |
| **[📦 Service Catalog](https://csp-kit.eason.ch/services)** | Browse all 106+ supported services |
| **[🤝 Contributing Guide](https://csp-kit.eason.ch/docs/contributing)** | How to contribute new services |
| **[🔄 Migration Guide](https://csp-kit.eason.ch/docs/upgrade-guide)** | Upgrading from older versions |

### Core Concepts

#### Service-Based Configuration

Instead of manually specifying CSP directives, you import and use service objects:

```typescript
// Traditional approach ❌
const csp = "script-src 'self' https://www.googletagmanager.com https://js.stripe.com; img-src 'self' https://www.google-analytics.com";

// CSP Kit approach ✅
import { GoogleAnalytics, Stripe } from '@csp-kit/data';
const result = generateCSP({ services: [GoogleAnalytics, Stripe] });
```

#### Type-Safe Services

All services are TypeScript objects with full type definitions:

```typescript
import type { CSPService } from '@csp-kit/generator';

interface CSPService {
  id: string;                      // Unique identifier
  name: string;                    // Display name
  category: ServiceCategory;       // Service category
  directives: CSPDirectives;       // CSP directives
  description?: string;            // Service description
  website?: string;               // Service website
  deprecated?: DeprecationInfo;   // Deprecation info
  conflicts?: string[];           // Conflicting services
}
```

### API Reference

#### `generateCSP(options)`

Generate a complete CSP header with service-based configuration.

**Parameters:**

```typescript
type CSPOptions = {
  services: CSPService[];           // Array of service objects
  nonce?: boolean | string;         // Generate or use nonce
  additionalRules?: CSPDirectives;  // Additional CSP rules
  reportUri?: string;               // Violation reporting endpoint
  includeSelf?: boolean;            // Include 'self' (default: true)
  unsafeInline?: boolean;           // Allow unsafe-inline (not recommended)
  unsafeEval?: boolean;             // Allow unsafe-eval (not recommended)
  development?: Partial<CSPOptions>; // Dev-only options
  production?: Partial<CSPOptions>;  // Production-only options
}
```

**Returns:**

```typescript
interface CSPResult {
  header: string;                 // Complete CSP header string
  directives: CSPDirectives;      // CSP directives as object
  reportOnlyHeader: string;       // Report-only version
  includedServices: string[];     // Successfully included services
  unknownServices: string[];      // Services not found
  warnings: string[];             // Deprecation and security warnings
  conflicts: string[];            // Service conflicts detected
  nonce?: string;                 // Generated nonce (if requested)
}
```

#### Other Functions

```typescript
import {
  generateCSP,           // Main generator function
  generateCSPHeader,     // Returns only header string
  generateReportOnlyCSP, // Returns report-only header
  generateNonce,         // Generate cryptographic nonce
  
  // Service utilities
  defineService,         // Define custom services
  isCSPService,         // Type guard for services
} from '@csp-kit/generator';

// All services are exported from @csp-kit/data
import {
  // Analytics
  GoogleAnalytics,
  Amplitude,
  Mixpanel,
  
  // Payment
  Stripe,
  Paypal,
  Square,
  
  // Social
  Facebook,
  Twitter,
  LinkedIn,
  
  // ... and 100+ more services
} from '@csp-kit/data';
```

## 🔄 Keeping Up-to-Date

### Upgrading Packages

To get the latest service definitions and features:

```bash
# Upgrade both packages together
npm update @csp-kit/generator @csp-kit/data

# Check for latest versions
npm outdated @csp-kit/generator @csp-kit/data

# View installed versions
npm list @csp-kit/generator @csp-kit/data
```

### Package Architecture

- **`@csp-kit/generator`**: Core library with stable API (rarely changes)
- **`@csp-kit/data`**: Service definitions that update frequently
- **Benefits**: Get service updates without API changes, faster updates, optimal bundle size

## 🛠️ CLI Tools

The CLI tools help manage services and contribute to the project:

```bash
npm install -g @csp-kit/cli
```

### Available Commands

```bash
# 🆕 Add a new service interactively
csp-cli add --interactive

# 🔄 Update existing service definition
csp-cli update google-analytics

# ✅ Validate all service definitions
csp-cli validate

# 🔍 Check service for CSP changes
csp-cli check google-analytics --url https://example.com

# 📋 List all services by category
csp-cli list --category analytics

# 🚀 Generate CSP from command line
csp-cli generate google-analytics stripe --output header
```

## 🤝 Contributing

We welcome contributions! CSP Kit is community-driven, and we appreciate:

- 🆕 **New Service Definitions**: Add support for new services
- 🐛 **Bug Reports**: Help us identify and fix issues
- 📖 **Documentation**: Improve guides and examples
- 🌐 **Translations**: Help internationalize the project
- ⚡ **Performance**: Optimize code and reduce bundle size

See our [Contributing Guide](CONTRIBUTING.md) for detailed instructions.

### Quick Contribution

Add a new service in minutes:

```bash
# Interactive service creation
csp-cli add --interactive

# Or manually create a service definition
cat > new-service.ts << EOF
import { defineService } from '@csp-kit/generator';
import { ServiceCategory } from '@csp-kit/data';

export const MyService = defineService({
  id: 'my-service',
  name: 'My Service',
  category: ServiceCategory.ANALYTICS,
  directives: {
    'script-src': ['https://cdn.myservice.com'],
    'connect-src': ['https://api.myservice.com']
  }
});
EOF
```

## 🔒 Security

CSP Kit is designed with security as the top priority:

- **Conservative Defaults**: Restrictive by default, explicit opt-in for unsafe features
- **Security Warnings**: Clear warnings for potentially unsafe configurations
- **Regular Audits**: Automated security scanning and dependency updates
- **Community Review**: All service definitions reviewed by maintainers
- **Version Pinning**: Lock to specific versions for production stability

## 📊 Project Status

- **106+ Services**: Comprehensive coverage of popular web services
- **Active Development**: Regular updates and new features
- **Community**: Growing community of contributors
- **Production Ready**: Used in production by numerous companies
- **Open Source**: MIT licensed, free forever

## 📄 License

CSP Kit is [MIT licensed](LICENSE). Free for commercial and personal use.

## 🙏 Acknowledgments

Special thanks to:
- All [contributors](https://github.com/eason-dev/csp-kit/graphs/contributors) who help maintain service definitions
- The [browserslist](https://github.com/browserslist/browserslist) project for the data-package architecture inspiration
- The web security community for CSP best practices

---

<div align="center">

**[Get Started →](https://csp-kit.eason.ch)** | **[Documentation](https://csp-kit.eason.ch/docs)** | **[GitHub](https://github.com/eason-dev/csp-kit)**

Made with ❤️ by [contributors](https://github.com/eason-dev/csp-kit/graphs/contributors)

</div>