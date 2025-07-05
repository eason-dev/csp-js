# Contributing to CSP Kit

Welcome to the CSP Kit community! We're excited you want to contribute to making web security easier for everyone. This guide will help you get started with contributing services, fixing bugs, and improving the toolkit.

## 🎯 What We Need Most

| Priority | Type | Description | Time Estimate |
|----------|------|-------------|---------------|
| **🔥 High** | **New Services** | Add support for popular web services | 15-30 min |
| **🔥 High** | **Service Updates** | Update existing services when they change | 10-15 min |
| **📚 Medium** | **Documentation** | Improve guides and examples | 30-60 min |
| **🐛 Medium** | **Bug Reports** | Report issues and edge cases | 5-10 min |
| **💡 Low** | **Feature Ideas** | Suggest new features and improvements | varies |

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** and **pnpm** (required)
- **Git** for version control
- **Basic CSP knowledge** (helpful but not required)

### 1. Setup Development Environment

```bash
# Fork and clone the repository
git clone https://github.com/yourusername/csp-kit.git
cd csp-kit

# Install dependencies
pnpm install

# Build packages
pnpm build

# Run tests
pnpm test

# Start development mode
pnpm dev
```

### 2. Install CLI for Contributing

```bash
# Install CLI globally for service management
npm install -g @csp-kit/cli

# Verify installation
csp-cli --version
```

## 🎯 Contributing Services (Most Needed!)

### 🆕 Adding a New Service

**Method 1: Interactive CLI (Recommended)**

```bash
# Start interactive service creation
csp-cli add --interactive
```

The CLI will guide you through:
1. **Service identification** (ID, name, category)
2. **Documentation** (website, official docs)
3. **CSP requirements** (what domains/directives are needed)
4. **Testing configuration** (URLs for validation)
5. **Review and submission** (creates PR automatically)

**Method 2: Manual Creation**

1. **Create service file:**
   ```bash
   touch packages/data/data/services/your-service.jsonc
   ```

2. **Use this template:**
   ```jsonc
   {
     // Required fields
     "id": "your-service",
     "name": "Your Service Name",
     "category": "analytics", // See categories below
     "description": "Brief description of what this service does",
     "website": "https://yourservice.com",
     "officialDocs": [
       "https://docs.yourservice.com/csp",
       "https://help.yourservice.com/security"
     ],
     "cspDirectives": {
       "script-src": ["https://cdn.yourservice.com"],
       "connect-src": ["https://api.yourservice.com"],
       "img-src": ["https://images.yourservice.com"]
     },
     
     // Optional fields
     "requiresDynamic": false,
     "requiresNonce": false,
     "notes": "Additional implementation details",
     "aliases": ["yourservice", "your-svc"],
     "lastUpdated": "2024-07-05T00:00:00.000Z",
     "verifiedAt": "2024-07-05T00:00:00.000Z",
     "monitoring": {
       "testUrls": ["https://yourservice.com/demo"],
       "checkInterval": "weekly",
       "alertOnBreaking": true
     }
   }
   ```

3. **Validate your service:**
   ```bash
   csp-cli validate --service your-service
   ```

4. **Test CSP generation:**
   ```bash
   csp-cli generate your-service
   ```

### 🔄 Updating Existing Services

When a service changes their CSP requirements:

```bash
# Check if service needs updates
csp-cli check service-name --url https://service-test-url.com

# Update interactively
csp-cli update service-name --interactive

# Or update specific fields manually
# Edit packages/data/data/services/service-name.jsonc
```

### 📋 Service Categories

Choose the most appropriate category:

| Category | Examples | Description |
|----------|----------|-------------|
| `analytics` | Google Analytics, Mixpanel, Hotjar | Tracking and analytics |
| `advertising` | Google Ads, Facebook Pixel | Ad networks and marketing |
| `social` | Facebook, Twitter, LinkedIn | Social media widgets |
| `payment` | Stripe, PayPal, Square | Payment processing |
| `forms` | Typeform, Calendly, Mailchimp | Form builders and surveys |
| `chat` | Intercom, Zendesk, Crisp | Customer support chat |
| `cdn` | Cloudflare, jsDelivr, Fastly | Content delivery |
| `fonts` | Google Fonts, Adobe Fonts | Web font services |
| `maps` | Google Maps, Mapbox | Mapping and location |
| `video` | YouTube, Vimeo, Twitch | Video hosting and players |
| `testing` | Optimizely, VWO, Hotjar | A/B testing and optimization |
| `monitoring` | Sentry, New Relic, Datadog | Error tracking and monitoring |
| `other` | Auth0, Firebase, Slack | Services that don't fit above |

### 🔍 Research Guidelines

Before adding a service, research their CSP requirements:

1. **Check official documentation**
   - Look for CSP, security, or implementation guides
   - Search for "Content Security Policy" on their docs

2. **Analyze real implementations**
   ```bash
   # Use browser dev tools to inspect CSP headers
   curl -I https://service-website.com
   ```

3. **Test with minimal CSP**
   ```html
   <meta http-equiv="Content-Security-Policy" content="default-src 'self'">
   ```
   Add domains until the service works

4. **Verify requirements**
   ```bash
   # Test with CSP Kit CLI
   csp-cli check new-service --url https://test-page.com
   ```

## 🐛 Bug Reports

Found a bug? Here's how to report it effectively:

### 1. Check Existing Issues

Search [GitHub Issues](https://github.com/eason-dev/csp-kit/issues) to avoid duplicates.

### 2. Gather Information

```bash
# Version information
npm list @csp-kit/generator @csp-kit/data
csp-cli --version

# Test case that reproduces the bug
node -e "console.log(require('@csp-kit/generator').generateCSP(['problematic-service']))"
```

### 3. Use Bug Report Template

Click **"New Issue"** → **"Bug Report"** and fill out:
- **Description**: What happened vs. what you expected
- **Reproduction Steps**: Minimal code to reproduce
- **Environment**: OS, Node.js version, package versions
- **Additional Context**: Screenshots, logs, etc.

## 💡 Feature Requests

Have an idea? We'd love to hear it!

### Types of Features We're Looking For

- **🔧 Framework Integrations**: Next.js plugins, Express middleware
- **🤖 Automation**: AI-powered service detection
- **📊 Analytics**: CSP violation tracking and analysis
- **🌐 Internationalization**: Multi-language support
- **🎨 UI/UX**: Web interface improvements

### How to Suggest Features

1. **Check [GitHub Discussions](https://github.com/eason-dev/csp-kit/discussions)**
2. **Use "Feature Request" template**
3. **Provide use cases and examples**
4. **Consider implementation complexity**

## 📚 Documentation Improvements

Help make CSP Kit more accessible:

### Areas That Need Help

- **More examples** for different frameworks
- **Video tutorials** for common scenarios
- **Translation** to other languages
- **API documentation** improvements
- **Beginner guides** for CSP concepts

### Contributing Docs

1. **Documentation files** are in `/docs`
2. **Edit in Markdown** with clear examples
3. **Test instructions** to ensure they work
4. **Use inclusive language** and clear explanations

## 🔧 Code Contributions

### Development Workflow

1. **Create a branch:**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes:**
   - Write clear, documented code
   - Add tests for new functionality
   - Update documentation if needed

3. **Test your changes:**
   ```bash
   pnpm test           # Run all tests
   pnpm lint           # Check code style
   pnpm check-types    # TypeScript validation
   pnpm format         # Format code
   ```

4. **Commit with conventional commits:**
   ```bash
   git commit -m "feat: add support for new-service"
   git commit -m "fix: resolve CSP generation issue"
   git commit -m "docs: improve getting started guide"
   ```

5. **Push and create PR:**
   ```bash
   git push origin feature/your-feature-name
   ```

### Code Style

- **TypeScript**: 100% TypeScript with strict mode
- **ESLint**: Zero warnings policy (`--max-warnings 0`)
- **Prettier**: Consistent code formatting
- **Conventional Commits**: Use conventional commit messages

### Testing Requirements

- **Unit tests** for new functions
- **Integration tests** for service definitions
- **Documentation** for public APIs
- **Examples** for new features

## 📊 Service Definition Schema

### Complete Schema Reference

```typescript
interface ServiceDefinition {
  // Required fields
  id: string;                    // Unique identifier (kebab-case)
  name: string;                  // Human-readable name
  category: ServiceCategory;     // Service category
  description: string;           // Brief description
  website: string;               // Official website URL
  officialDocs: string[];        // Documentation URLs
  cspDirectives: CSPDirectives;  // CSP requirements
  lastUpdated: string;           // ISO timestamp
  
  // Optional fields
  requiresDynamic?: boolean;     // Requires 'strict-dynamic'
  requiresNonce?: boolean;       // Requires nonce
  notes?: string;                // Additional notes
  aliases?: string[];            // Alternative identifiers
  verifiedAt?: string;           // Last verification timestamp
  monitoring?: {                 // Monitoring configuration
    testUrls: string[];
    checkInterval: 'daily' | 'weekly' | 'monthly';
    alertOnBreaking: boolean;
  };
}
```

### CSP Directives Format

```typescript
interface CSPDirectives {
  'script-src'?: string[];       // JavaScript sources
  'style-src'?: string[];        // CSS sources
  'img-src'?: string[];          // Image sources
  'connect-src'?: string[];      // AJAX/WebSocket/EventSource
  'font-src'?: string[];         // Font sources
  'object-src'?: string[];       // Plugins (avoid if possible)
  'media-src'?: string[];        // Audio/video sources
  'frame-src'?: string[];        // Iframe sources
  'child-src'?: string[];        // Web workers and nested contexts
  'worker-src'?: string[];       // Web worker sources
  'manifest-src'?: string[];     // Web app manifest
  'base-uri'?: string[];         // Base element URLs
  'form-action'?: string[];      // Form submission URLs
  'frame-ancestors'?: string[];  // Iframe embedding restrictions
  // Add other directives as needed
}
```

### Service Definition Best Practices

1. **Use specific domains**, avoid wildcards when possible:
   ```jsonc
   // Good
   "script-src": ["https://js.stripe.com"]
   
   // Avoid unless necessary
   "script-src": ["https://*.stripe.com"]
   ```

2. **Only include required directives**:
   ```jsonc
   // Don't include unnecessary directives
   "cspDirectives": {
     "script-src": ["https://analytics.example.com"],
     // Only add connect-src if service makes AJAX calls
     "connect-src": ["https://api.example.com"]
   }
   ```

3. **Add verification timestamps**:
   ```jsonc
   "lastUpdated": "2024-07-05T00:00:00.000Z",
   "verifiedAt": "2024-07-05T00:00:00.000Z"
   ```

4. **Include helpful notes**:
   ```jsonc
   "notes": "Requires script-src for tracking pixel. connect-src needed for real-time analytics data."
   ```

5. **Add test URLs for monitoring**:
   ```jsonc
   "monitoring": {
     "testUrls": ["https://service.com/demo", "https://docs.service.com/integration"],
     "checkInterval": "weekly",
     "alertOnBreaking": true
   }
   ```

## 🤝 Code Review Process

### What We Look For

1. **Correctness**
   - Service CSP requirements are accurate
   - Code follows TypeScript best practices
   - Tests pass and provide good coverage

2. **Completeness**
   - All required fields are present
   - Documentation is updated
   - Examples are provided when needed

3. **Quality**
   - Clear, readable code
   - Helpful comments for complex logic
   - Consistent with existing patterns

### Review Timeline

- **Service additions**: Usually reviewed within 48 hours
- **Bug fixes**: Priority review, usually within 24 hours
- **Features**: May take longer for discussion and refinement

## 🏆 Recognition

We believe in recognizing our contributors:

### How We Say Thank You

- **[Contributors page](https://csp-kit.eason.ch/contributors)** - Featured on our website
- **[GitHub contributors](https://github.com/eason-dev/csp-kit/graphs/contributors)** - GitHub recognition
- **Monthly highlights** - Featured in our newsletter
- **Conference mentions** - Speaking opportunities
- **Swag** - CSP Kit stickers and merchandise (coming soon!)

### Contribution Levels

- **🥉 Service Contributor**: Added 1-5 services
- **🥈 Regular Contributor**: Added 6-20 services or significant features
- **🥇 Core Contributor**: Major features, documentation, or 20+ services
- **💎 Maintainer**: Long-term commitment to project health

## 📞 Getting Help

### Where to Ask Questions

| Question Type | Best Place | Response Time |
|---------------|------------|---------------|
| **Service definition help** | [GitHub Discussions](https://github.com/eason-dev/csp-kit/discussions) | ~24 hours |
| **Bug reports** | [GitHub Issues](https://github.com/eason-dev/csp-kit/issues) | ~48 hours |
| **Feature discussions** | [GitHub Discussions](https://github.com/eason-dev/csp-kit/discussions) | ~48 hours |
| **Quick questions** | [Discord Community](https://discord.gg/csp-kit) | Real-time |

### Community Guidelines

We follow the [Contributor Covenant Code of Conduct](https://github.com/eason-dev/csp-kit/blob/main/CODE_OF_CONDUCT.md). Please be:

- **Respectful** and inclusive
- **Constructive** in feedback
- **Patient** with newcomers
- **Helpful** to other contributors

## 🎉 First-Time Contributors

New to open source? Welcome! Here are some beginner-friendly ways to start:

### Good First Issues

Look for issues labeled:
- **"good first issue"** - Perfect for beginners
- **"help wanted"** - We need community help
- **"documentation"** - Improve our docs

### Beginner-Friendly Tasks

1. **Add a simple service** (analytics, fonts, CDN)
2. **Fix typos** in documentation
3. **Add examples** for your favorite framework
4. **Improve error messages** in the CLI
5. **Write tests** for existing code

### Mentorship

We're happy to mentor new contributors:
- **Tag @maintainers** in issues for guidance
- **Join our Discord** for real-time help
- **Attend community calls** (monthly, announced in Discord)

## 📅 Release Process

Understanding our release cycle helps with contribution timing:

### Release Schedule

- **Data package** (`@csp-kit/data`): Weekly releases with new services
- **Core library** (`@csp-kit/generator`): Monthly releases with features
- **CLI tools** (`@csp-kit/cli`): Monthly releases with improvements

### Contribution Timing

- **Service additions**: Can be included in next weekly data release
- **Bug fixes**: Fast-tracked for next patch release
- **Features**: Planned for next minor release

## 🔮 Roadmap Alignment

Check our [roadmap](../ROADMAP.md) to see how your contribution fits:

### Current Focus Areas

1. **Service Coverage**: Adding more popular services
2. **Framework Integration**: Next.js, Express, and other plugins
3. **Developer Experience**: Better CLI tools and documentation
4. **Automation**: AI-powered service detection and updates

### Long-term Vision

- **Universal CSP Toolkit**: The go-to solution for all CSP needs
- **Community-Driven**: Self-sustaining contributor ecosystem
- **Enterprise Ready**: Advanced features for large organizations
- **Educational Resource**: Teaching developers about web security

---

## 🙏 Thank You!

Every contribution, no matter how small, makes CSP Kit better for everyone. Whether you're adding your first service or building major features, you're helping make the web more secure.

**Ready to contribute?** Start with a [good first issue](https://github.com/eason-dev/csp-kit/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) or [add a new service](https://github.com/eason-dev/csp-kit/issues/new?template=add-service.md)!

---

## 📚 Related Resources

- **[Getting Started](./getting-started.md)** - Using CSP Kit
- **[API Reference](./api-reference.md)** - Complete API docs
- **[CLI Guide](./cli-guide.md)** - Command-line tools
- **[Maintainer Architecture](./maintainer/architecture.md)** - Technical details
- **[Service Definition Guide](./maintainer/service-definition-guide.md)** - Detailed schema docs