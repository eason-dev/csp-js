# Contributing to CSP Kit

<div align="center">

**Welcome to the CSP Kit community!** 🎉

We're excited you want to help make web security easier for everyone.

[📚 **Full Contributing Guide**](./docs/contributing.md) • [🆕 **Add Service**](https://github.com/eason-dev/csp-kit/issues/new?template=add-service.md) • [🌐 **Web Interface**](https://csp-kit.eason.ch) • [💬 **Discussions**](https://github.com/eason-dev/csp-kit/discussions)

</div>

---

## 🚀 Quick Start

### 🎯 **What We Need Most**

| Priority | Type | Time | Description |
|----------|------|------|-------------|
| **🔥 High** | **New Services** | 15-30 min | Add support for popular web services |
| **🔥 High** | **Service Updates** | 10-15 min | Update existing services when they change |
| **📚 Medium** | **Documentation** | 30-60 min | Improve guides and examples |
| **🐛 Medium** | **Bug Reports** | 5-10 min | Report issues and edge cases |

### 🏃‍♂️ **Fastest Ways to Contribute**

**1. 🆕 Add a New Service** *(Most needed!)*
```bash
# Install CLI and add service interactively
npm install -g @csp-kit/cli
csp-cli add --interactive
```

**2. 🌐 Use Web Interface**
- Visit [csp-kit.eason.ch](https://csp-kit.eason.ch)
- Click "Request Service" for missing services
- Share feedback and suggestions

**3. 📝 Improve Documentation**
- Fix typos and improve clarity
- Add examples for your favorite framework
- Translate documentation (coming soon)

### 💻 **Development Setup**

```bash
# 1. Fork & Clone
git clone https://github.com/yourusername/csp-kit.git
cd csp-kit

# 2. Install Dependencies (requires pnpm)
pnpm install

# 3. Build Packages
pnpm build

# 4. Run Tests
pnpm test

# 5. Start Development
pnpm dev
```

## 📦 **Project Structure**

```
csp-kit/
├── packages/
│   ├── generator/           # Core CSP generation library
│   ├── data/               # Service definitions database (106+ services)
│   ├── cli/                # Command-line tools for contributors
│   ├── ui/                 # Shared UI components
│   └── *-config/           # Shared configurations
├── apps/
│   ├── web/                # Interactive web interface
│   └── docs/               # Documentation site
└── docs/                   # User and maintainer documentation
    ├── getting-started.md  # New user guide
    ├── contributing.md     # Complete contribution guide
    ├── api-reference.md    # API documentation
    ├── cli-guide.md        # CLI tools guide
    ├── examples/           # Framework examples
    └── maintainer/         # Technical documentation
```

## 🎯 **Popular Contributions**

### 🆕 **Adding Services** *(Most impactful)*

Help expand CSP Kit's service support:

```bash
# Interactive CLI (recommended)
csp-cli add --interactive

# Manual contribution
# 1. Research service CSP requirements
# 2. Create service definition file
# 3. Test and validate
# 4. Submit pull request
```

**Popular services to add:**
- New social media platforms
- Emerging payment providers  
- Popular WordPress plugins
- Microsoft services (Teams, Office)
- Regional services (non-US)

### 🔄 **Updating Services**

Services change their CSP requirements frequently:

```bash
# Check for updates
csp-cli check service-name --url https://test-url.com

# Update interactively
csp-cli update service-name --interactive
```

### 📚 **Documentation**

- **[User guides](./docs/)** - Help developers use CSP Kit
- **[Examples](./docs/examples/)** - Framework-specific guides
- **[API docs](./docs/api-reference.md)** - Complete API reference
- **Translations** - Multi-language support (coming soon)

### 💻 **Code Contributions**

- **Features** - CLI improvements, web interface enhancements
- **Bug fixes** - Report and fix issues
- **Performance** - Optimize CSP generation and bundle size
- **Framework integration** - Next.js plugins, Express middleware

## 🎯 **Service Contribution Guide**

> **📖 For complete details, see [docs/contributing.md](./docs/contributing.md)**

### 🚀 **Quick Service Addition**

**Method 1: Interactive CLI** *(Recommended)*
```bash
npm install -g @csp-kit/cli
csp-cli add --interactive
```

**Method 2: Web Interface**
- Visit [csp-kit.eason.ch](https://csp-kit.eason.ch)
- Click "Request Service"
- Follow the guided form

**Method 3: GitHub Issue**
- Use [Add Service template](https://github.com/eason-dev/csp-kit/issues/new?template=add-service.md)
- Provide service details and CSP requirements
- Community will help implement

### 📋 **Service Definition Format**

CSP Kit uses a simplified JSON schema:

```jsonc
{
  "id": "service-name",
  "name": "Service Display Name",
  "category": "analytics", // analytics, payment, social, etc.
  "description": "What this service does",
  "website": "https://service.com",
  "officialDocs": ["https://docs.service.com/csp"],
  "cspDirectives": {
    "script-src": ["https://cdn.service.com"],
    "connect-src": ["https://api.service.com"]
  },
  // Optional fields
  "aliases": ["service", "svc"],
  "notes": "Implementation details",
  "lastUpdated": "2024-07-05T00:00:00.000Z"
}
```

**Key changes from v0.x:**
- ✅ **Simplified schema** - No more complex version management
- ✅ **Easier contribution** - Single CSP configuration per service
- ✅ **Better validation** - Automated testing and validation
- ✅ **Community friendly** - Interactive tools for non-developers

## 📊 **Service Categories**

Choose the best category for your service:

| Category | Examples | Count |
|----------|----------|-------|
| **analytics** | Google Analytics, Mixpanel, Hotjar | 12+ |
| **payment** | Stripe, PayPal, Square | 8+ |
| **social** | Facebook, Twitter, LinkedIn | 15+ |
| **forms** | Typeform, Calendly, Mailchimp | 10+ |
| **chat** | Intercom, Zendesk, Crisp | 8+ |
| **video** | YouTube, Vimeo, Twitch | 6+ |
| **cdn** | Google Fonts, jsDelivr, Cloudflare | 12+ |
| **maps** | Google Maps, Mapbox | 4+ |
| **testing** | Optimizely, Sentry, Cypress | 15+ |
| **other** | Auth0, Firebase, Slack | 28+ |

### ✅ **Service Quality Guidelines**

- **Specific domains** over wildcards when possible
- **Minimal directives** - only what's actually required
- **Test URLs** for validation
- **Official documentation** links
- **Clear descriptions** of service purpose

### 🔍 **Research Tips**

1. **Check official docs** for CSP requirements
2. **Inspect existing implementations** with browser dev tools
3. **Test with minimal CSP** and add domains as needed
4. **Verify with CLI** testing tools

## ✅ **Review Process**

### 🤖 **Automated Checks**
All contributions go through:
- ✅ **TypeScript compilation**
- ✅ **ESLint** (zero warnings policy)
- ✅ **Tests** pass
- ✅ **Service validation** for CSP accuracy
- ✅ **Build** succeeds

### 👥 **Community Review**
- **Service contributions**: Reviewed for accuracy within 48 hours
- **Bug fixes**: Priority review, usually within 24 hours  
- **Features**: Discussion and design review
- **Documentation**: Quick approval for improvements

### 🏆 **Recognition**
Contributors get:
- **[Contributors page](https://csp-kit.eason.ch/contributors)** listing
- **GitHub recognition** in repository
- **Monthly highlights** in community updates
- **Conference opportunities** for major contributors

## 🧪 **Testing Your Contributions**

### 🔍 **Service Testing**
```bash
# Validate service definition
csp-cli validate --service your-service

# Test CSP generation
csp-cli generate your-service

# Check for changes
csp-cli check your-service --url https://test-url.com
```

### 🏃‍♂️ **Code Testing**
```bash
# Run all tests
pnpm test

# Test specific package
pnpm test --filter @csp-kit/generator

# Check code quality
pnpm lint && pnpm check-types
```

### 🌐 **Manual Testing**
- Test your service with [web interface](https://csp-kit.eason.ch)
- Verify CSP works in real applications
- Check for browser console errors

## 📚 **Documentation Structure**

| Document | Purpose | Audience |
|----------|---------|----------|
| **[docs/contributing.md](./docs/contributing.md)** | **Complete contribution guide** | **All contributors** |
| **[docs/getting-started.md](./docs/getting-started.md)** | User onboarding | New users |
| **[docs/api-reference.md](./docs/api-reference.md)** | API documentation | Developers |
| **[docs/cli-guide.md](./docs/cli-guide.md)** | CLI tools reference | Advanced users |
| **[docs/examples/](./docs/examples/)** | Framework examples | Integration developers |

**Need help with documentation?**
- 📝 **Fix typos** - Quick improvements welcome
- 📖 **Add examples** - Show real-world usage
- 🌍 **Translate** - Multi-language support (coming soon)
- 📋 **Improve structure** - Better organization

## 📋 **Issue Templates**

We have templates to make contributing easier:

| Template | Use For | Processing Time |
|----------|---------|------------------|
| **[🆕 Add Service](https://github.com/eason-dev/csp-kit/issues/new?template=add-service.md)** | Request new service support | 1-2 weeks |
| **[🔄 Update Service](https://github.com/eason-dev/csp-kit/issues/new?template=update-service.md)** | Report CSP requirement changes | 2-3 days |
| **[🐛 Bug Report](https://github.com/eason-dev/csp-kit/issues/new?template=bug-report.md)** | Report bugs or issues | 1-3 days |
| **[💡 Feature Request](https://github.com/eason-dev/csp-kit/issues/new?template=feature-request.md)** | Suggest new features | 1-2 weeks |

**💡 Tip**: Use the web interface at [csp-kit.eason.ch](https://csp-kit.eason.ch) for the fastest service requests!

## 🚀 **Release & Versioning**

### 📦 **Package Release Schedule**

| Package | Frequency | Purpose |
|---------|-----------|----------|
| **@csp-kit/data** | **Weekly** | New services, service updates |
| **@csp-kit/generator** | **Monthly** | Features, API improvements |
| **@csp-kit/cli** | **Monthly** | CLI enhancements, bug fixes |

### 🔄 **Contribution Timeline**

- **Service additions** → Next weekly data release
- **Bug fixes** → Next patch release (within days)
- **Features** → Next minor release (monthly)
- **Breaking changes** → Next major release (rare)

**📈 Want faster releases?** Services added via CLI can be included in the next weekly release!

## 🛠️ **For Maintainers**

Maintainer-specific documentation:

- **[Architecture Guide](./docs/maintainer/architecture.md)** - Technical deep dive
- **[Release Process](./docs/maintainer/release-process.md)** - How releases work
- **[Service Definition Guide](./docs/maintainer/service-definition-guide.md)** - Schema details
- **[NPM Publishing Guide](./docs/maintainer/npm-publishing-guide.md)** - Package publishing

### 🎯 **Maintainer Duties**
- **Service monitoring** - Weekly automated checks
- **Issue triage** - Respond to community issues
- **Code review** - Review contributions for quality
- **Community building** - Help new contributors
- **Architecture** - Evolve the system thoughtfully

## 💬 **Getting Help**

| Need Help With | Best Place | Response Time |
|----------------|------------|---------------|
| **🆕 Adding services** | [CLI tool](https://github.com/eason-dev/csp-kit/discussions) or [discussions](https://github.com/eason-dev/csp-kit/discussions) | ~24 hours |
| **🐛 Bug reports** | [GitHub Issues](https://github.com/eason-dev/csp-kit/issues) | ~48 hours |
| **💡 Feature ideas** | [GitHub Discussions](https://github.com/eason-dev/csp-kit/discussions) | ~48 hours |
| **❓ General questions** | [GitHub Discussions](https://github.com/eason-dev/csp-kit/discussions) | ~24 hours |
| **📖 Documentation** | [Full docs site](https://csp-kit.eason.ch/docs) | Instant |

---

## 🎉 **Ready to Contribute?**

### 🏃‍♂️ **Quick Start Options**

1. **🆕 Add a service**: `npm i -g @csp-kit/cli && csp-cli add --interactive`
2. **🌐 Use web interface**: [csp-kit.eason.ch](https://csp-kit.eason.ch)
3. **📚 Read full guide**: [docs/contributing.md](./docs/contributing.md)
4. **💬 Ask questions**: [GitHub Discussions](https://github.com/eason-dev/csp-kit/discussions)

### 🤝 **Community Values**

- **Inclusive** - Everyone is welcome
- **Helpful** - We support each other
- **Security-focused** - Making the web safer
- **Open** - Transparent development

**By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).**

**🔓 Your contributions remain open source forever** - CSP Kit is committed to remaining free and open source software.

---

<div align="center">

### 🙏 **Thank You!**

**Every contribution makes CSP Kit better for developers worldwide.**

[**⭐ Star the project**](https://github.com/eason-dev/csp-kit) • [**🤝 Start contributing**](./docs/contributing.md) • [**💬 Join the community**](https://github.com/eason-dev/csp-kit/discussions)

</div>
