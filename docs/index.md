---
sidebar_position: 1
---

# CSP Kit Documentation

<div align="center">

**The modern TypeScript-first Content Security Policy toolkit for developers**

[🌐 **Try Web Interface**](https://csp-kit.eason.ch) • [📦 **Install Packages**](./getting-started.md#installation) • [🛠️ **CLI Tools**](./cli-guide.md) • [🤝 **Contribute**](./contributing.md)

</div>

---

## 🚀 Quick Start

### Choose Your Interface

| Method | Best For | Time to Start |
|--------|----------|---------------|
| **[🌐 Web Interface](./web-interface.md)** | Beginners, visual learners, quick testing | **0 minutes** |
| **[📦 TypeScript API](./getting-started.md)** | Developers, production apps | **2 minutes** |
| **[🛠️ CLI Tools](./cli-guide.md)** | Contributors, automation | **5 minutes** |

### Most Popular: Web Interface

**👉 [Try CSP Kit Web Generator](https://csp-kit.eason.ch)**

- ✅ No installation required
- ✅ Visual service selection (106+ services)
- ✅ Real-time CSP generation
- ✅ Copy ready-to-use headers
- ✅ Works on mobile and desktop

### For Developers: TypeScript API

```bash
# Install both packages (required)
npm install @csp-kit/generator @csp-kit/data
```

```typescript
import { generateCSP } from '@csp-kit/generator';
import { GoogleAnalytics, Stripe, GoogleFonts } from '@csp-kit/data';

const result = generateCSP({
  services: [GoogleAnalytics, Stripe, GoogleFonts]
});
console.log(result.header);
// "script-src 'self' https://www.googletagmanager.com..."
```

## 📚 Documentation

### 🎯 **User Guides**

| Guide | Description | Audience |
|-------|-------------|----------|
| **[Getting Started](./getting-started.md)** | Installation, TypeScript API, common patterns | New users |
| **[Web Interface](./web-interface.md)** | Interactive CSP generator guide | All users |
| **[API Reference](./api-reference.md)** | Complete TypeScript API documentation | Developers |
| **[CLI Guide](./cli-guide.md)** | Command-line tools reference | Advanced users |

### 📖 **Reference**

| Resource | Description |
|----------|-------------|
| **[Service Support](./service-support.md)** | List of 106+ supported services |
| **[Framework Examples](./examples/nextjs.md)** | Next.js, Express, and more |

### 🤝 **Contributing**

| Guide | Description |
|-------|-------------|
| **[Contributing Guide](./contributing.md)** | How to contribute TypeScript service definitions |
| **[Service Development](./service-development-guide.md)** | Complete guide for creating services |

### 🔧 **For Maintainers**

| Guide | Description |
|-------|-------------|
| **[Architecture](./maintainer/ARCHITECTURE.md)** | Technical architecture overview |
| **[Service Definition Guide](./maintainer/SERVICE_DEFINITION_GUIDE.md)** | TypeScript service schema documentation |
| **[Maintainer Guide](./maintainer/MAINTAINER_GUIDE.md)** | Project maintenance procedures |
| **[Release Process](./maintainer/RELEASE_PROCESS.md)** | How releases are managed |
| **[NPM Publishing Guide](./maintainer/NPM_PUBLISHING_GUIDE.md)** | Package publishing procedures |

## 🎯 What is CSP Kit?

CSP Kit transforms Content Security Policy management from manual, error-prone work into a TypeScript-first, service-based approach:

```typescript
// ❌ Traditional approach: Manual, hard to maintain
const csp = "script-src 'self' https://www.googletagmanager.com https://js.stripe.com; style-src 'self' https://fonts.googleapis.com...";

// ✅ CSP Kit approach: Type-safe, automatic, always up-to-date
import { GoogleAnalytics, Stripe, GoogleFonts } from '@csp-kit/data';
const { header } = generateCSP({ services: [GoogleAnalytics, Stripe, GoogleFonts] });
```

### 🌟 **Key Benefits**

- **🎯 TypeScript-First**: Full type safety with IntelliSense support
- **📦 106+ Services**: Pre-configured TypeScript service definitions
- **🌳 Tree-Shakeable**: Only bundle the services you actually use
- **🔄 Always Updated**: Community-driven with automated monitoring
- **🌐 Multiple Interfaces**: Web UI, CLI tools, and TypeScript API
- **🚀 Production Ready**: Used by thousands of developers worldwide
- **🔒 Security-First**: Conservative defaults with expert guidance

## 🏗️ Architecture

### 📦 **Package Structure**

CSP Kit uses a data-package separation model:

```
@csp-kit/generator   # Core CSP generation library
@csp-kit/data        # TypeScript service definitions (updates frequently)
@csp-kit/cli         # Command-line tools
```

**Why separate packages?**
- ✅ **Fast Updates**: Get new services without library updates
- ✅ **Stable API**: Core library changes rarely
- ✅ **Tree Shaking**: Only bundle the services you import
- ✅ **Type Safety**: Full TypeScript support with IntelliSense
- ✅ **Community Driven**: Easy for contributors to add services

### 🌐 **TypeScript-First Design**

| Feature | Benefit |
|---------|---------|
| **Direct Imports** | `import { GoogleAnalytics } from '@csp-kit/data'` |
| **Type Safety** | Full compile-time checking and IntelliSense |
| **Tree Shaking** | Only bundle the services you use |
| **No Runtime Loading** | Services imported at build time |
| **Better DX** | Clear dependencies and refactoring support |

## 🚀 What's New in v2.x

### TypeScript-First API

TypeScript-first design provides better developer experience:

```typescript
// TypeScript imports with full type safety
import { GoogleAnalytics, Stripe } from '@csp-kit/data';
const result = generateCSP({ services: [GoogleAnalytics, Stripe] });
```

## 🤝 Community

### 🎯 **Get Involved**

- **⭐ [Star on GitHub](https://github.com/eason-dev/csp-kit)** - Show your support
- **🐛 [Report Issues](https://github.com/eason-dev/csp-kit/issues)** - Help us improve
- **💬 [Join Discussions](https://github.com/eason-dev/csp-kit/discussions)** - Ask questions, share ideas
- **🤝 [Contribute Services](./contributing.md)** - Add new TypeScript service definitions
- **📖 [Improve Docs](./contributing.md#documentation-improvements)** - Help others learn

### 📊 **Project Stats**

- **106+ Supported Services** across all major categories
- **TypeScript-First** with full IntelliSense support
- **Weekly Data Updates** with new services and fixes
- **Active Community** of contributors and users
- **Production Ready** with comprehensive testing
- **MIT Licensed** - Free forever for commercial and personal use
- **Open Source** - Transparent development, community-driven, no vendor lock-in

## 🆘 Need Help?

### 📞 **Support Channels**

| Channel | Best For | Response Time |
|---------|----------|---------------|
| **[📖 Documentation](https://csp-kit.eason.ch/docs)** | Guides, API reference, examples | Instant |
| **[🌐 Web Interface](https://csp-kit.eason.ch)** | Interactive CSP generation | Instant |
| **[💬 GitHub Discussions](https://github.com/eason-dev/csp-kit/discussions)** | Questions, feature requests | ~24 hours |
| **[🐛 GitHub Issues](https://github.com/eason-dev/csp-kit/issues)** | Bug reports, specific problems | ~48 hours |

### 🚀 **Quick Solutions**

**First time user?** → Start with the [Web Interface](https://csp-kit.eason.ch)

**Need to install?** → Follow the [Getting Started Guide](./getting-started.md)


**Looking for a service?** → Check [Service Support](./service-support.md)

**Want to contribute?** → Read the [Contributing Guide](./contributing.md)

**Having trouble?** → Search [GitHub Issues](https://github.com/eason-dev/csp-kit/issues)

---

<div align="center">

### 🎉 **Welcome to CSP Kit!**

**Making Content Security Policy simple, maintainable, and type-safe for everyone.**

[**Get Started →**](./getting-started.md)

</div>