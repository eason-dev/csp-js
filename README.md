# CSP Kit 🛡️

[![NPM Version](https://img.shields.io/npm/v/@csp-kit/generator)](https://www.npmjs.com/package/@csp-kit/generator)
[![GitHub License](https://img.shields.io/github/license/eason-dev/csp-kit)](https://github.com/eason-dev/csp-kit/blob/main/LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/eason-dev/csp-kit/ci.yml)](https://github.com/eason-dev/csp-kit/actions)
[![Coverage](https://img.shields.io/codecov/c/github/eason-dev/csp-kit)](https://codecov.io/gh/eason-dev/csp-kit)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

> **Modern Content Security Policy (CSP) generator for popular web services and libraries**

CSP Kit automatically generates Content Security Policy headers by analyzing the services and libraries you use. Say goodbye to manual CSP configuration and hello to automatic security policies.

## ✨ Features

- 🎯 **Service-First Approach**: Configure CSP by specifying services instead of manual directives
- 📦 **50+ Popular Services**: Pre-configured CSP rules for Google Analytics, Stripe, Intercom, and more
- 🔄 **Service Management**: Up-to-date CSP rules for all supported services
- 🤖 **Automated Monitoring**: GitHub Actions integration to detect service changes
- 🌐 **Multiple Formats**: Generate headers, meta tags, or JSON configurations
- 🔐 **Nonce Support**: Built-in nonce generation for secure inline scripts
- 📱 **Web Interface**: Interactive CSP generator at [csp-kit.eason.ch](https://csp-kit.eason.ch)
- 🛠️ **CLI Tools**: Command-line tools for automation and service management
- 📖 **TypeScript Ready**: Full TypeScript support with comprehensive types

## 🚀 Quick Start

### Installation

```bash
# Using npm
npm install @csp-kit/generator

# Using yarn
yarn add @csp-kit/generator

# Using pnpm
pnpm add @csp-kit/generator
```

### Basic Usage

```javascript
import { generateCSP } from '@csp-kit/generator';

// Generate CSP for multiple services
const result = generateCSP(['google-analytics', 'stripe', 'google-fonts']);

console.log(result.header);
// Output: "script-src 'self' https://www.googletagmanager.com https://js.stripe.com; style-src 'self' https://fonts.googleapis.com; ..."

// Use in Express.js
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', result.header);
  next();
});
```

### Advanced Configuration

```javascript
import { generateCSP } from '@csp-kit/generator';

const result = generateCSP({
  services: ['google-analytics', 'typeform', 'youtube'],
  nonce: true,
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
```

## 📚 Documentation

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

## 🛠️ CLI Tools

Install the CLI for advanced service management:

```bash
npm install -g @csp-kit/cli
```

### Available Commands

```bash
# Add a new service interactively
csp-cli add --interactive

# Update existing service
csp-cli update google-analytics

# Validate service definitions
csp-cli validate

# Check service for CSP changes
csp-cli check google-analytics --url https://example.com
```

## 🌐 Web Interface

Use our interactive web interface at [csp-kit.eason.ch](https://csp-kit.eason.ch) to:

- Browse available services
- Generate CSP policies visually
- Copy headers, meta tags, or JSON
- Validate configurations
- Preview CSP impact

## 🔐 Security

### Security Considerations

- **Conservative Defaults**: CSP Kit uses strict defaults and warns about insecure configurations
- **Nonce Support**: Built-in nonce generation for secure inline script execution
- **Regular Updates**: Service definitions are actively monitored and updated
- **Community Driven**: Security issues are quickly addressed through community involvement

### Reporting Security Issues

Please report security vulnerabilities through [GitHub Security Advisories](https://github.com/eason-dev/csp-kit/security/advisories/new).

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) and [Architecture Guide](ARCHITECTURE.md) for details.

## 📋 Service Support

CSP Kit supports 100+ popular services including Google Analytics, Stripe, Typeform, YouTube, and more.

See [SERVICE_SUPPORT.md](SERVICE_SUPPORT.md) for:

- Complete list of supported services
- Service categories (Analytics, Payment, Social, etc.)
- How to request new services

## 📈 Roadmap

See [ROADMAP.md](ROADMAP.md) for our development plans and upcoming features.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Content Security Policy specification](https://www.w3.org/TR/CSP3/) by W3C
- [Helmet.js](https://helmetjs.github.io/) for CSP middleware inspiration
- [browserslist](https://github.com/browserslist/browserslist) for data package architecture
- All contributors who help maintain service definitions

## 📞 Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/eason-dev/csp-kit/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/eason-dev/csp-kit/discussions)
- 📖 **Documentation**: [csp-kit.eason.ch/docs](https://csp-kit.eason.ch/docs)

---

<p align="center">
  <strong>Made with ❤️ by the CSP Kit team</strong><br>
  <em>Simplifying Content Security Policy for everyone</em>
</p>
