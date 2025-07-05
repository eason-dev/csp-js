# CSP Kit Documentation

<div align="center">

**The modern Content Security Policy toolkit for developers**

[🌐 **Try Web Interface**](https://csp-kit.eason.ch) • [📦 **Install Packages**](./getting-started.md#installation) • [🛠️ **CLI Tools**](./cli-guide.md) • [🤝 **Contribute**](./contributing.md)

</div>

---

## 🚀 Quick Start

### Choose Your Interface

| Method | Best For | Time to Start |
|--------|----------|---------------|
| **[🌐 Web Interface](./web-interface.md)** | Beginners, visual learners, quick testing | **0 minutes** |
| **[📦 JavaScript API](./getting-started.md)** | Developers, production apps | **2 minutes** |
| **[🛠️ CLI Tools](./cli-guide.md)** | Contributors, automation | **5 minutes** |

### Most Popular: Web Interface

**👉 [Try CSP Kit Web Generator](https://csp-kit.eason.ch)**

- ✅ No installation required
- ✅ Visual service selection (106+ services)
- ✅ Real-time CSP generation
- ✅ Copy ready-to-use headers
- ✅ Works on mobile and desktop

### For Developers: JavaScript API

```bash
# Install both packages (required)
npm install @csp-kit/generator @csp-kit/data
```

```javascript
import { generateCSP } from '@csp-kit/generator';

const result = generateCSP(['google-analytics', 'stripe', 'google-fonts']);
console.log(result.header);
// "script-src 'self' https://www.googletagmanager.com..."
```

## 📚 Documentation

### 🎯 **User Guides**

| Guide | Description | Audience |
|-------|-------------|----------|
| **[Getting Started](./getting-started.md)** | Installation, basic usage, common patterns | New users |
| **[Web Interface](./web-interface.md)** | Interactive CSP generator guide | All users |
| **[API Reference](./api-reference.md)** | Complete JavaScript/TypeScript API | Developers |
| **[CLI Guide](./cli-guide.md)** | Command-line tools reference | Advanced users |
| **[Upgrade Guide](./upgrade-guide.md)** | How to upgrade and get latest data | Existing users |

### 📖 **Reference**

| Resource | Description |
|----------|-------------|
| **[Service Support](./service-support.md)** | List of 106+ supported services |
| **[Contributing](./contributing.md)** | How to contribute new services |
| **[Examples](./examples/)** | Framework-specific examples |

### 🔧 **For Maintainers**

| Guide | Description |
|-------|-------------|
| **[Architecture](./maintainer/ARCHITECTURE.md)** | Technical architecture overview |
| **[Maintainer Guide](./maintainer/MAINTAINER_GUIDE.md)** | Project maintenance procedures |
| **[Release Process](./maintainer/RELEASE_PROCESS.md)** | How releases are managed |
| **[Service Definition Guide](./maintainer/SERVICE_DEFINITION_GUIDE.md)** | Detailed schema documentation |
| **[NPM Publishing Guide](./maintainer/NPM_PUBLISHING_GUIDE.md)** | Package publishing procedures |

## 🎯 What is CSP Kit?

CSP Kit transforms Content Security Policy management from manual, error-prone work into an automated, service-based approach:

```javascript
// ❌ Traditional approach: Manual, hard to maintain
const csp = "script-src 'self' https://www.googletagmanager.com https://js.stripe.com; style-src 'self' https://fonts.googleapis.com...";

// ✅ CSP Kit approach: Service-based, automatic, always up-to-date
const { header } = generateCSP(['google-analytics', 'stripe', 'google-fonts']);
```

### 🌟 **Key Benefits**

- **🎯 Service-First**: Configure by services, not directives
- **📦 106+ Services**: Pre-configured for popular web services
- **🔄 Always Updated**: Community-driven with automated monitoring
- **🌐 Multiple Interfaces**: Web UI, CLI tools, and JavaScript API
- **🚀 Production Ready**: Used by thousands of developers worldwide
- **🔒 Security-First**: Conservative defaults with expert guidance

## 🏗️ Architecture

### 📦 **Package Structure**

CSP Kit uses a data-package separation model:

```
@csp-kit/generator   # Core CSP generation library
@csp-kit/data        # Service definitions (updates frequently)
@csp-kit/cli         # Command-line tools
```

**Why separate packages?**
- ✅ **Fast Updates**: Get new services without library updates
- ✅ **Stable API**: Core library changes rarely
- ✅ **Smaller Bundles**: Only include what you need
- ✅ **Community Driven**: Easy for contributors to add services

### 🌐 **Ecosystem Overview**

| Component | Purpose | Users |
|-----------|---------|--------|
| **Web Interface** | Visual CSP generator | Beginners, designers, managers |
| **JavaScript API** | Programmatic integration | Developers, applications |
| **CLI Tools** | Service management, automation | Contributors, DevOps |
| **Data Package** | Service definitions database | All components |

## 🤝 Community

### 🎯 **Get Involved**

- **⭐ [Star on GitHub](https://github.com/eason-dev/csp-kit)** - Show your support
- **🐛 [Report Issues](https://github.com/eason-dev/csp-kit/issues)** - Help us improve
- **💬 [Join Discussions](https://github.com/eason-dev/csp-kit/discussions)** - Ask questions, share ideas
- **🤝 [Contribute Services](./contributing.md)** - Add new service definitions
- **📖 [Improve Docs](./contributing.md#documentation-improvements)** - Help others learn

### 📊 **Project Stats**

- **106+ Supported Services** across all major categories
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

**Making Content Security Policy simple, maintainable, and secure for everyone.**

[**Get Started →**](./getting-started.md)

</div>