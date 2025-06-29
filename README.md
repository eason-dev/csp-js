# CSP-JS 🛡️

[![NPM Version](https://img.shields.io/npm/v/csp-js)](https://www.npmjs.com/package/csp-js)
[![GitHub License](https://img.shields.io/github/license/easonz/csp-js)](https://github.com/easonz/csp-js/blob/main/LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/easonz/csp-js/ci.yml)](https://github.com/easonz/csp-js/actions)
[![Coverage](https://img.shields.io/codecov/c/github/easonz/csp-js)](https://codecov.io/gh/easonz/csp-js)
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
- 📱 **Web Interface**: Interactive CSP generator at [csp-js.dev](https://csp-js.dev)
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
    'img-src': ['data:', 'blob:']
  },
  reportUri: 'https://my-site.com/csp-report',
  includeSelf: true
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
const csp = "script-src 'self' https://www.googletagmanager.com https://js.stripe.com; img-src 'self' https://www.google-analytics.com";

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

#### Service Categories
Services are organized by category for easy discovery:

- **Analytics**: Google Analytics, Microsoft Clarity, Adobe Analytics
- **Payment**: Stripe, PayPal, Square
- **Social**: Facebook Pixel, Twitter, LinkedIn
- **Forms**: Typeform, Google Forms, JotForm
- **Chat**: Intercom, Zendesk, Crisp
- **And more**: CDN, Fonts, Maps, Video, Testing, Monitoring

### API Reference

#### `generateCSP(options)`

**Parameters:**
- `options` (string[] | CSPOptions): Services array or configuration object

**CSPOptions:**
```typescript
interface CSPOptions {
  services: string[];           // Array of service identifiers
  nonce?: boolean | string;     // Generate nonce or use provided
  customRules?: CSPDirectives;  // Additional CSP rules
  reportUri?: string;           // CSP violation reporting endpoint
  includeSelf?: boolean;        // Include 'self' directive (default: true)
  unsafeInline?: boolean;       // Allow unsafe-inline (not recommended)
  unsafeEval?: boolean;         // Allow unsafe-eval (not recommended)
}
```

**Returns:**
```typescript
interface CSPResult {
  header: string;               // Complete CSP header string
  directives: CSPDirectives;    // CSP directives as object
  reportOnlyHeader: string;     // Report-only version
  includedServices: string[];   // Successfully included services
  unknownServices: string[];    // Services not found
  warnings: string[];           // Deprecation and other warnings
  nonce?: string;              // Generated nonce (if requested)
}
```

#### Other Functions

```javascript
import { 
  generateCSPHeader,        // Returns only header string
  generateReportOnlyCSP,    // Returns report-only header
  generateNonce,            // Generate cryptographic nonce
  getService,              // Get service definition
  searchServices,          // Search services by name/description
  getServiceVersions       // Get available versions for service
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

Use our interactive web interface at [csp-js.dev](https://csp-js.dev) to:

- Browse available services
- Generate CSP policies visually
- Copy headers, meta tags, or JSON
- Validate configurations
- Preview CSP impact

## 🏗️ Architecture

CSP-JS is built as a modular monorepo with clear separation of concerns:

```
csp-js/
├── packages/
│   ├── csp-js/          # Core library and CSP generation
│   ├── csp-data/        # Service definitions database
│   └── csp-cli/         # Command-line tools
├── apps/
│   ├── web/             # Interactive web interface (Next.js)
│   └── docs/            # Documentation site
└── packages/
    ├── ui/              # Shared UI components
    └── typescript-config/ # Shared TypeScript configurations
```

### Design Principles

1. **Service-First**: Configure CSP by services, not individual directives
2. **Version Aware**: Support multiple versions of service implementations
3. **Automated Updates**: Monitor services for CSP requirement changes
4. **Developer Experience**: Intuitive APIs with comprehensive TypeScript support
5. **Security by Default**: Conservative defaults with opt-in for relaxed policies

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Contribution Guide

1. **Fork & Clone**
   ```bash
   git clone https://github.com/yourusername/csp-js.git
   cd csp-js
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Development Setup**
   ```bash
   # Build all packages
   pnpm build
   
   # Run tests
   pnpm test
   
   # Start development servers
   pnpm dev
   ```

4. **Add New Services**
   ```bash
   # Interactive service addition
   pnpm cli add --interactive
   
   # Or manually edit packages/csp-data/data/services/
   ```

### Project Structure

- **Monorepo**: Uses Turborepo for efficient builds and caching
- **Package Manager**: pnpm with workspaces
- **TypeScript**: 100% TypeScript with strict mode
- **Testing**: Vitest for unit tests
- **Linting**: ESLint + Prettier with zero-warning policy
- **CI/CD**: GitHub Actions for testing, building, and deployment

### Development Commands

```bash
# Root commands (run from project root)
pnpm dev          # Start all development servers
pnpm build        # Build all packages
pnpm test         # Run all tests
pnpm lint         # Lint all packages
pnpm check-types  # TypeScript type checking
pnpm format       # Format code with Prettier

# Package-specific commands
pnpm --filter csp-js test        # Test specific package
pnpm --filter web dev            # Start web app only
pnpm --filter @csp-js/cli build  # Build CLI only
```

## 📋 Service Support

### Currently Supported Services

| Service | Versions | Category | Auto-Monitoring |
|---------|----------|----------|-----------------|
| Google Analytics | 4.0.0, 4.1.0 | Analytics | ✅ |
| Microsoft Clarity | 1.0.0 | Analytics | ✅ |
| Typeform | 1.0.0 | Forms | ✅ |
| Google Tag Manager | 1.0.0 | Analytics | ✅ |
| Google Fonts | 1.0.0 | Fonts | ✅ |
| YouTube | 1.0.0 | Video | ✅ |

### Request New Services

We're always adding new services! To request support for a service:

1. [Create an issue](https://github.com/easonz/csp-js/issues/new?template=add-service.yml) using our service request template
2. Use the CLI: `csp-cli add --interactive`
3. Submit a pull request with the service definition

### Service Update Process

Services are automatically monitored for CSP requirement changes:

1. **Automated Monitoring**: GitHub Actions check services weekly
2. **Change Detection**: Compare current vs. expected CSP requirements
3. **Issue Creation**: Automatic issues for detected changes
4. **Community Review**: Maintainers and community validate changes
5. **Version Release**: Updated service definitions released

## 🔐 Security

### Security Considerations

- **Conservative Defaults**: CSP-JS uses strict defaults and warns about insecure configurations
- **Nonce Support**: Built-in nonce generation for secure inline script execution
- **Regular Updates**: Service definitions are actively monitored and updated
- **Community Driven**: Security issues are quickly addressed through community involvement

### Reporting Security Issues

Please report security vulnerabilities to [security@csp-js.dev](mailto:security@csp-js.dev) or through [GitHub Security Advisories](https://github.com/easonz/csp-js/security/advisories/new).

## 📈 Roadmap

### Current Focus (Q1 2025)
- [ ] Expand service database to 100+ services
- [ ] Advanced version selection UI
- [ ] CSP violation analysis tools
- [ ] Performance monitoring integration

### Future Plans
- [ ] Browser extension for CSP testing
- [ ] Webpack/Vite plugins for build-time CSP generation
- [ ] Integration with popular frameworks (Next.js, Nuxt, etc.)
- [ ] CSP policy optimization recommendations
- [ ] Real-time CSP monitoring dashboard

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Content Security Policy specification](https://www.w3.org/TR/CSP3/) by W3C
- [Helmet.js](https://helmetjs.github.io/) for CSP middleware inspiration
- [browserslist](https://github.com/browserslist/browserslist) for data package architecture
- All contributors who help maintain service definitions

## 📞 Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/easonz/csp-js/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/easonz/csp-js/discussions)
- 📖 **Documentation**: [csp-js.dev/docs](https://csp-js.dev/docs)
- 📧 **Email**: [hello@csp-js.dev](mailto:hello@csp-js.dev)

---

<p align="center">
  <strong>Made with ❤️ by the CSP-JS team</strong><br>
  <em>Simplifying Content Security Policy for everyone</em>
</p>