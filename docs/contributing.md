# Contributing to CSP Kit

Welcome to the CSP Kit community! We're excited you want to contribute to making web security easier for everyone. This guide will help you get started with contributing services, fixing bugs, and improving the toolkit.

## 🎯 What We Need Most

| Priority | Type | Description | Time Estimate |
|----------|------|-------------|---------------|
| **🔥 High** | **New Services** | Add TypeScript service definitions | 15-30 min |
| **🔥 High** | **Service Updates** | Update existing services when they change | 10-15 min |
| **📚 Medium** | **Documentation** | Improve guides and examples | 30-60 min |
| **🐛 Medium** | **Bug Reports** | Report issues and edge cases | 5-10 min |
| **💡 Low** | **Feature Ideas** | Suggest new features and improvements | varies |

## 🚀 Quick Start

### Prerequisites

- **Node.js 22+** and **pnpm 9+** (required)
- **Git** for version control
- **TypeScript knowledge** (helpful for service definitions)
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

### 2. Project Structure

```
csp-kit/
├── packages/
│   ├── generator/           # Core CSP generation library
│   ├── data/               # TypeScript service definitions
│   │   └── src/
│   │       └── services/   # Service definition files
│   ├── cli/                # Command-line tools
│   └── ui/                 # Shared UI components
├── apps/
│   ├── web/                # Next.js web interface
│   └── docs/               # Documentation site
└── docs/                   # Markdown documentation
```

## 🎯 Contributing Services (Most Needed!)

### 🆕 Adding a New Service

Services are now TypeScript modules that export service definitions. Here's how to add one:

**Step 1: Choose the right category folder**

```bash
# Navigate to the appropriate category
cd packages/data/src/services/analytics/  # or payment/, social/, etc.
```

**Step 2: Create your service file**

```typescript
// packages/data/src/services/analytics/my-analytics.ts
import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const MyAnalytics = defineService({
  // Required fields
  id: 'my-analytics',
  name: 'My Analytics Service',
  category: ServiceCategory.ANALYTICS,
  description: 'Advanced analytics platform for tracking user behavior',
  website: 'https://myanalytics.com',
  
  // CSP directives
  directives: {
    'script-src': ['https://cdn.myanalytics.com'],
    'connect-src': ['https://api.myanalytics.com'],
    'img-src': ['https://pixel.myanalytics.com']
  },
  
  // Optional metadata
  officialDocs: [
    'https://docs.myanalytics.com/security/csp',
    'https://help.myanalytics.com/implementation'
  ],
  notes: 'Requires script-src for tracking code. Use connect-src for real-time events.',
  aliases: ['my-analytics', 'ma'],
  requiresDynamic: true, // If service injects scripts dynamically
  
  // Timestamps
  lastUpdated: '2025-07-12T00:00:00.000Z',
  verifiedAt: '2025-07-12T00:00:00.000Z'
});
```

**Step 3: Export from category index**

```typescript
// packages/data/src/services/analytics/index.ts
export * from './google-analytics.js';
export * from './amplitude.js';
export * from './my-analytics.js'; // Add your service
```

**Step 4: Test your service**

```bash
# Build the data package
pnpm build --filter @csp-kit/data

# Run tests
pnpm test --filter @csp-kit/data

# Test CSP generation
pnpm tsx test-service.ts
```

Create a test file:
```typescript
// test-service.ts
import { generateCSP } from '@csp-kit/generator';
import { MyAnalytics } from './packages/data/src/services/analytics/my-analytics.js';

const result = generateCSP({
  services: [MyAnalytics]
});

console.log('Generated CSP:', result.header);
console.log('Warnings:', result.warnings);
```

### 🔄 Updating Existing Services

When a service changes their CSP requirements:

1. **Find the service file:**
   ```bash
   # Search for the service
   find packages/data/src/services -name "*stripe*"
   ```

2. **Update the directives:**
   ```typescript
   // packages/data/src/services/payment/stripe.ts
   export const Stripe = defineService({
     // ... other fields
     directives: {
       'script-src': [
         'https://js.stripe.com',
         'https://checkout.stripe.com' // Add new domain
       ],
       // ... other directives
     },
     lastUpdated: '2025-07-12T00:00:00.000Z' // Update timestamp
   });
   ```

3. **Add a note about the change:**
   ```typescript
   notes: 'Added checkout.stripe.com for new Stripe Checkout experience. Required as of July 2025.',
   ```

### 📋 Service Categories

Choose the most appropriate category:

| Category | Import Path | Examples |
|----------|-------------|----------|
| `ANALYTICS` | `services/analytics/` | Google Analytics, Mixpanel |
| `ADVERTISING` | `services/advertising/` | Google Ads, Facebook Pixel |
| `SOCIAL` | `services/social/` | Facebook, Twitter, LinkedIn |
| `PAYMENT` | `services/payment/` | Stripe, PayPal, Square |
| `FORMS` | `services/forms/` | Typeform, Calendly |
| `CHAT` | `services/chat/` | Intercom, Zendesk |
| `CDN` | `services/cdn/` | Cloudflare, jsDelivr |
| `FONTS` | `services/fonts/` | Google Fonts, Adobe Fonts |
| `MAPS` | `services/maps/` | Google Maps, Mapbox |
| `VIDEO` | `services/video/` | YouTube, Vimeo |
| `MONITORING` | `services/monitoring/` | Sentry, DataDog |
| `OTHER` | `services/other/` | Everything else |

### 🔍 Research Guidelines

Before adding a service, research their CSP requirements:

1. **Check official documentation**
   ```bash
   # Search their docs for CSP information
   # Look for: "Content Security Policy", "CSP", "security headers"
   ```

2. **Analyze real implementations**
   ```bash
   # Check what domains they use
   curl -I https://example-using-service.com | grep -i content-security
   
   # Use browser DevTools Network tab
   # Filter by domain to see all requests
   ```

3. **Test with minimal CSP**
   ```html
   <!DOCTYPE html>
   <html>
   <head>
     <meta http-equiv="Content-Security-Policy" content="default-src 'self'">
     <!-- Add service integration code -->
   </head>
   <body>
     <!-- Test if service works -->
   </body>
   </html>
   ```

4. **Document your findings**
   - List all domains the service uses
   - Note which CSP directives are required
   - Include any special requirements (nonce, dynamic scripts)

## 🐛 Bug Reports

Found a bug? Here's how to report it effectively:

### 1. Check Existing Issues

Search [GitHub Issues](https://github.com/eason-dev/csp-kit/issues) to avoid duplicates.

### 2. Create a Minimal Reproduction

```typescript
// bug-reproduction.ts
import { generateCSP } from '@csp-kit/generator';
import { ProblematicService } from '@csp-kit/data';

// Show the exact code that causes the issue
const result = generateCSP({
  services: [ProblematicService],
  // Include all options you're using
});

console.log('Expected:', 'what you expected');
console.log('Actual:', result.header);
```

### 3. Use Bug Report Template

Include:
- **CSP Kit versions**: `npm list @csp-kit/generator @csp-kit/data`
- **Node.js version**: `node --version`
- **TypeScript version**: `npx tsc --version`
- **Complete error messages**
- **Minimal reproduction code**

## 💡 Feature Requests

Have an idea? We'd love to hear it!

### Types of Features We're Looking For

- **🔧 TypeScript Improvements**: Better types, generics support
- **🤖 DX Enhancements**: Better error messages, IntelliSense
- **📊 Validation**: Service conflict detection, CSP analysis
- **🌐 Framework Plugins**: Vite, Webpack, Next.js integrations
- **🎨 Service Discovery**: Auto-detect services from code

### How to Suggest Features

1. **Check [GitHub Discussions](https://github.com/eason-dev/csp-kit/discussions)**
2. **Provide concrete examples** of how it would work
3. **Explain the use case** and who benefits
4. **Consider implementation** complexity

## 📚 Documentation Improvements

Help make CSP Kit more accessible:

### Areas That Need Help

- **TypeScript examples** for different scenarios
- **Migration guides** from other CSP solutions
- **Framework guides** (Remix, SvelteKit, Astro)
- **Video tutorials** for common use cases
- **API documentation** improvements

### Contributing Docs

1. **Documentation structure:**
   ```
   docs/
   ├── getting-started.md      # User onboarding
   ├── api-reference.md        # Complete API docs
   ├── contributing.md         # This file
   ├── examples/               # Framework examples
   └── maintainer/             # Technical docs
   ```

2. **Use clear examples:**
   ```typescript
   // ✅ Good: Complete, runnable example
   import { generateCSP } from '@csp-kit/generator';
   import { GoogleAnalytics, Stripe } from '@csp-kit/data';
   
   const result = generateCSP({
     services: [GoogleAnalytics, Stripe],
     nonce: true
   });
   
   // ❌ Avoid: Incomplete snippets
   generateCSP({ services: [...] })
   ```

## 🔧 Code Contributions

### Development Workflow

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/add-service-validation
   # or
   git checkout -b fix/nonce-generation-issue
   ```

2. **Follow TypeScript best practices:**
   ```typescript
   // Use proper types
   export function validateService(service: CSPService): ValidationResult {
     // Implementation
   }
   
   // Avoid any
   export function processData(data: any) { // ❌
     // ...
   }
   ```

3. **Write tests:**
   ```typescript
   // packages/data/src/services/analytics/__tests__/my-analytics.test.ts
   import { describe, it, expect } from 'vitest';
   import { MyAnalytics } from '../my-analytics.js';
   import { validateService } from '../../../test-utils.js';
   
   describe('MyAnalytics', () => {
     it('should have valid structure', () => {
       expect(validateService(MyAnalytics)).toBe(true);
     });
     
     it('should include required domains', () => {
       expect(MyAnalytics.directives['script-src']).toContain(
         'https://cdn.myanalytics.com'
       );
     });
   });
   ```

4. **Run quality checks:**
   ```bash
   pnpm lint           # ESLint with zero warnings
   pnpm check-types    # TypeScript validation
   pnpm test           # All tests must pass
   pnpm format         # Prettier formatting
   ```

5. **Commit with conventional commits:**
   ```bash
   git commit -m "feat(data): add MyAnalytics service definition"
   git commit -m "fix(generator): resolve nonce generation issue"
   git commit -m "docs: improve TypeScript migration guide"
   ```

### Code Style Guidelines

- **TypeScript**: Strict mode, no implicit any
- **Imports**: Use `.js` extensions for local imports
- **Exports**: Named exports for services
- **Documentation**: JSDoc for public APIs
- **Testing**: 100% coverage for new services

## 📊 Service Definition Interface

### Complete TypeScript Interface

```typescript
interface ServiceDefinition {
  // Required fields
  id: string;                    // Unique kebab-case identifier
  name: string;                  // Human-readable name
  category: ServiceCategory;     // Category enum value
  description: string;           // 50-150 character description
  website: string;               // Official service URL
  directives: CSPDirectives;     // CSP requirements
  
  // Optional metadata
  officialDocs?: string[];       // Documentation URLs
  notes?: string;                // Implementation notes
  aliases?: string[];            // Alternative identifiers
  requiresDynamic?: boolean;     // Needs 'strict-dynamic'
  requiresNonce?: boolean;       // Needs nonce support
  
  // Advanced features
  deprecated?: {
    since: string;               // ISO date
    message: string;             // Explanation
    alternative?: string;        // Suggested replacement
  };
  conflicts?: string[];          // Incompatible service IDs
  validate?: (directives: CSPDirectives) => {
    warnings?: string[];
    errors?: string[];
  };
  
  // Timestamps
  lastUpdated?: string;          // ISO timestamp
  verifiedAt?: string;           // Last verification
}
```

### Service Definition Best Practices

1. **Be specific with domains:**
   ```typescript
   // ✅ Good - Specific domains
   directives: {
     'script-src': ['https://js.stripe.com'],
     'frame-src': ['https://checkout.stripe.com']
   }
   
   // ❌ Avoid - Overly broad
   directives: {
     'script-src': ['https://*.stripe.com']
   }
   ```

2. **Include helpful metadata:**
   ```typescript
   notes: 'Requires frame-src for 3D Secure authentication. The connect-src is only needed for Stripe.js v3+.',
   officialDocs: [
     'https://stripe.com/docs/security/guide#content-security-policy'
   ]
   ```

3. **Add validation when needed:**
   ```typescript
   validate: (directives) => {
     const warnings = [];
     if (!directives['frame-src']?.includes('https://checkout.stripe.com')) {
       warnings.push('Stripe Checkout requires frame-src for payment forms');
     }
     return { warnings };
   }
   ```

## 🤝 Pull Request Process

### Before Submitting

- [ ] Tests pass: `pnpm test`
- [ ] No lint errors: `pnpm lint`
- [ ] Types check: `pnpm check-types`
- [ ] Docs updated (if needed)
- [ ] Commits follow convention

### PR Title Format

```
feat(data): add Plausible Analytics service
fix(generator): handle empty directives correctly
docs: update Next.js integration guide
chore: update dependencies
```

### What We Review

1. **For new services:**
   - CSP directives are accurate
   - All required fields present
   - Tests included
   - Proper category placement

2. **For features:**
   - TypeScript types are sound
   - Tests cover edge cases
   - Documentation updated
   - No breaking changes

3. **For all PRs:**
   - Code follows project style
   - Commits are clear
   - CI checks pass

## 🏆 Recognition

We value our contributors!

### Contributor Showcases

- **Website**: Featured on [csp-kit.eason.ch/contributors](https://csp-kit.eason.ch/contributors)
- **README**: Listed in project README
- **Release notes**: Mentioned in releases
- **Social media**: Highlighted in announcements

### Contribution Milestones

- 🌱 **First PR**: Welcome to the community!
- 🌿 **5 Services**: Service Contributor badge
- 🌳 **10 Services**: Regular Contributor
- 🌲 **25+ Services**: Core Contributor
- 🏔️ **Major Feature**: Feature Contributor

## 📞 Getting Help

| Need Help With | Where to Go | Response Time |
|----------------|-------------|---------------|
| TypeScript questions | [GitHub Discussions](https://github.com/eason-dev/csp-kit/discussions) | ~24 hours |
| Service research | [Discord #services](https://discord.gg/csp-kit) | Real-time |
| PR feedback | Comment on PR | ~48 hours |
| General questions | [Discord #general](https://discord.gg/csp-kit) | Real-time |

## 🎉 First-Time Contributors

New to open source? Perfect! Here's how to start:

### Beginner-Friendly Tasks

1. **Add a simple service** (start with CDN or fonts)
2. **Improve error messages** in existing code
3. **Add tests** for services missing coverage
4. **Fix typos** in documentation
5. **Add code examples** to docs

### Your First Service

Let's add Google Fonts together:

```typescript
// packages/data/src/services/fonts/google-fonts.ts
import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const GoogleFonts = defineService({
  id: 'google-fonts',
  name: 'Google Fonts',
  category: ServiceCategory.FONTS,
  description: 'Web font service providing open source font families',
  website: 'https://fonts.google.com',
  directives: {
    'style-src': ['https://fonts.googleapis.com'],
    'font-src': ['https://fonts.gstatic.com']
  },
  officialDocs: ['https://developers.google.com/fonts/docs/getting_started'],
  notes: 'Use style-src for CSS and font-src for font files'
});
```

### Getting PR Feedback

- Tag `@maintainers` for help
- Ask specific questions
- Be patient and open to suggestions
- Celebrate when it's merged! 🎉

---

## 📄 License Agreement

By contributing to CSP Kit:
- Your contributions will be licensed under the [MIT License](../LICENSE)
- You retain copyright of your contributions
- CSP Kit remains free and open source forever

---

## Thank You! 🙏

Every contribution makes the web more secure. Whether you're adding your first service or building major features, you're part of something important.

**Ready to contribute?** Pick a service you use and add it to CSP Kit!