# CSP-JS 🛡️

[![NPM Version](https://img.shields.io/npm/v/csp-js)](https://www.npmjs.com/package/csp-js)
[![GitHub License](https://img.shields.io/github/license/eason-dev/csp-js)](https://github.com/eason-dev/csp-js/blob/main/LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/eason-dev/csp-js/ci.yml)](https://github.com/eason-dev/csp-js/actions)
[![Coverage](https://img.shields.io/codecov/c/github/eason-dev/csp-js)](https://codecov.io/gh/eason-dev/csp-js)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

> **Modern Content Security Policy (CSP) generator for popular web services and libraries**

CSP-JS automatically generates Content Security Policy headers by analyzing the services and libraries you use. Say goodbye to manual CSP configuration and hello to automatic, version-aware security policies.

## ✨ Features

- 🎯 **Service-First Approach**: Configure CSP by specifying services instead of manual directives
- 📦 **50+ Popular Services**: Pre-configured CSP rules for Google Analytics, Stripe, Intercom, and more
- 🔄 **Version Management**: Support for service versioning with automatic deprecation warnings
- 🤖 **Automated Monitoring**: GitHub Actions integration to detect service changes
- 🌐 **Multiple Formats**: Generate headers, meta tags, or JSON configurations
- 🔐 **Nonce Support**: Built-in nonce generation for secure inline scripts
- 📱 **Web Interface**: Interactive CSP generator at [csp-js.eason.ch](https://csp-js.eason.ch)
- 🛠️ **CLI Tools**: Command-line tools for automation and service management
- 📖 **TypeScript Ready**: Full TypeScript support with comprehensive types

## 🚀 Quick Start

### Installation

```bash
# Using npm
npm install csp-js

# Using yarn
yarn add csp-js

# Using pnpm
pnpm add csp-js
```

### Basic Usage

```javascript
import { generateCSP } from 'csp-js';

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
import { generateCSP } from 'csp-js';

const result = generateCSP({
  services: ['google-analytics@4.1.0', 'typeform', 'youtube'],
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
//   includedServices: ["google-analytics@4.1.0", "typeform@1.0.0", "youtube@1.0.0"]
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

// CSP-JS approach ✅
const result = generateCSP(['google-analytics', 'stripe']);
```

#### Version Management

Services support versioning for different implementation approaches:

```javascript
// Use specific version
generateCSP(['google-analytics@4.0.0']);

// Use latest version (default)
generateCSP(['google-analytics@latest']);
generateCSP(['google-analytics']); // same as above
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
  getServiceVersions, // Get available versions for service
} from 'csp-js';
```

## 🛠️ CLI Tools

Install the CLI for advanced service management:

```bash
npm install -g @csp-js/cli
```

### Available Commands

```bash
# Add a new service interactively
csp-cli add --interactive

# Update existing service
csp-cli update google-analytics --version 4.2.0

# Validate service definitions
csp-cli validate

# Check service for CSP changes
csp-cli check google-analytics --url https://example.com
```

## 🌐 Web Interface

Use our interactive web interface at [csp-js.eason.ch](https://csp-js.eason.ch) to:

- Browse available services
- Generate CSP policies visually
- Copy headers, meta tags, or JSON
- Validate configurations
- Preview CSP impact

## 🔐 Security

### Security Considerations

- **Conservative Defaults**: CSP-JS uses strict defaults and warns about insecure configurations
- **Nonce Support**: Built-in nonce generation for secure inline script execution
- **Regular Updates**: Service definitions are actively monitored and updated
- **Community Driven**: Security issues are quickly addressed through community involvement

### Reporting Security Issues

Please report security vulnerabilities through [GitHub Security Advisories](https://github.com/eason-dev/csp-js/security/advisories/new).

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) and [Architecture Guide](ARCHITECTURE.md) for details.

## 📋 Service Support

CSP-JS supports 50+ popular services including Google Analytics, Stripe, Typeform, YouTube, and more.

See [SERVICE_SUPPORT.md](SERVICE_SUPPORT.md) for:

- Complete list of supported services with versions
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

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/eason-dev/csp-js/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/eason-dev/csp-js/discussions)
- 📖 **Documentation**: [csp-js.eason.ch/docs](https://csp-js.eason.ch/docs)

---

<p align="center">
  <strong>Made with ❤️ by the CSP-JS team</strong><br>
  <em>Simplifying Content Security Policy for everyone</em>
</p>
