# @csp-kit/generator

A simple and powerful JavaScript library to generate Content Security Policy (CSP) headers for popular web services and libraries. Works together with `@csp-kit/data` for service definitions.

## Features

- 🚀 **Universal**: Works in any JavaScript environment (Node.js, Deno, Edge Runtime, Browser)
- 🛡️ **Secure**: Generate secure CSP headers for popular services
- 📦 **Lightweight**: Minimal dependencies, optimized for performance
- 🎯 **Service-Aware**: Built-in support for 100+ popular services via @csp-kit/data
- 🔧 **Customizable**: Easy to extend with custom rules
- 💡 **TypeScript**: Full TypeScript support with type definitions
- 🔌 **Type-Safe Services**: Import services as typed objects from @csp-kit/data

## Installation

**Both packages are required:**

```bash
npm install @csp-kit/generator @csp-kit/data
# or
yarn add @csp-kit/generator @csp-kit/data
# or
pnpm add @csp-kit/generator @csp-kit/data
```

> **Note**: `@csp-kit/generator` provides the CSP generation logic, while `@csp-kit/data` contains the service definitions. This separation allows for faster updates to service definitions without changing the core API.

## Quick Start

```javascript
import { generateCSP } from '@csp-kit/generator';
import { GoogleAnalytics } from '@csp-kit/data';

// Generate CSP using service objects
const result = generateCSP([GoogleAnalytics]);
console.log(result.header);
// Output: script-src https://www.google-analytics.com https://www.googletagmanager.com; img-src https://www.google-analytics.com https://www.googletagmanager.com https://www.google.com; connect-src https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net

// Use the CSP header in your response
response.setHeader('Content-Security-Policy', result.header);
```

## Usage Examples

### Basic Usage

```javascript
import { generateCSP } from '@csp-kit/generator';
import { GoogleAnalytics, MicrosoftClarity, Typeform } from '@csp-kit/data';

// Single service (simple array syntax)
const result = generateCSP([GoogleAnalytics]);

// Multiple services (simple array syntax)
const result = generateCSP([GoogleAnalytics, MicrosoftClarity, Typeform]);

// With options object (for advanced configuration)
const result = generateCSP({
  services: [GoogleAnalytics, MicrosoftClarity, Typeform],
  includeSelf: true,
});
```

### Advanced Usage

```javascript
import { generateCSP, generateNonce } from '@csp-kit/generator';
import { GoogleAnalytics, Stripe } from '@csp-kit/data';

// With custom options
const result = generateCSP({
  services: [GoogleAnalytics, Stripe],
  nonce: true, // Generate nonce for inline scripts
  additionalRules: {
    'script-src': ['https://my-domain.com'],
    'img-src': ['data:', 'blob:'],
  },
  reportUri: 'https://my-site.com/csp-report',
  includeSelf: true, // Include 'self' in common directives (default: false)
  includeUnsafeInline: false, // Allow 'unsafe-inline' (default: false, not recommended)
  includeUnsafeEval: false, // Allow 'unsafe-eval' (default: false, not recommended)
});

console.log(result.header); // Complete CSP header
console.log(result.nonce); // Generated nonce value
console.log(result.warnings); // Security warnings
console.log(result.includedServices); // Successfully included services
console.log(result.unknownServices); // Services not found
```

### Environment-Specific Configuration

```javascript
import { generateCSP } from '@csp-kit/generator';
import { GoogleAnalytics, Sentry } from '@csp-kit/data';

const result = generateCSP({
  services: [GoogleAnalytics, Sentry],
  // Development-specific settings (when NODE_ENV !== 'production')
  development: {
    includeUnsafeEval: true, // Allow eval() in development
    includeUnsafeInline: true, // Allow inline scripts
  },
  // Production-specific settings (when NODE_ENV === 'production')
  production: {
    reportUri: 'https://my-site.com/csp-report',
  },
});
```

## Supported Services

The `@csp-kit/data` package provides 100+ pre-configured services across various categories:

- **Analytics**: Google Analytics, Microsoft Clarity, Mixpanel, Amplitude, Heap, PostHog
- **Authentication**: Auth0, Clerk, Firebase Auth, Supabase Auth
- **CDN**: Cloudflare, Fastly, jsDelivr, unpkg, cdnjs
- **Chat**: Intercom, Crisp, Tawk.to, Zendesk Chat
- **Documentation**: Algolia DocSearch, Docsearch
- **Fonts**: Google Fonts, Adobe Fonts
- **Forms**: Typeform, Tally, Jotform
- **Maps**: Google Maps, Mapbox
- **Marketing**: HubSpot, Mailchimp, ConvertKit
- **Monitoring**: Sentry, Datadog, LogRocket, Bugsnag
- **Payment**: Stripe, PayPal, Square
- **Social**: Twitter/X Widgets, Facebook SDK, LinkedIn
- **Video**: YouTube, Vimeo, Wistia, Loom
- And many more...

## API Reference

### `generateCSP(input)`

Generate a complete CSP configuration.

**Parameters:**

- `input` - Array of CSPService objects OR options object

**Options:**

```typescript
// Simple array syntax
generateCSP(services: CSPService[])

// Full options object
interface CSPOptions {
  services: CSPService[]; // Service objects to include
  nonce?: boolean | string; // Generate/use nonce
  additionalRules?: CSPDirectives; // Additional CSP rules
  reportUri?: string; // CSP violation report URI
  includeSelf?: boolean; // Include 'self' (default: false)
  includeUnsafeInline?: boolean; // Allow 'unsafe-inline' (default: false)
  includeUnsafeEval?: boolean; // Allow 'unsafe-eval' (default: false)
  development?: Partial<CSPOptions>; // Development overrides (when NODE_ENV !== 'production')
  production?: Partial<CSPOptions>; // Production overrides (when NODE_ENV === 'production')
}
```

**Returns:**

```typescript
interface CSPResult {
  header: string; // Complete CSP header
  directives: CSPDirectives; // CSP rules object
  includedServices: string[]; // Successfully included services
  unknownServices: string[]; // Services not found
  warnings: string[]; // Security warnings
  nonce?: string; // Generated nonce (if requested)
}
```

### `generateNonce(options?)`

Generate a cryptographically secure nonce.

```javascript
import { generateNonce } from '@csp-kit/generator';

const nonce = generateNonce();
const hexNonce = generateNonce({ encoding: 'hex' });
const longNonce = generateNonce({ length: 32 });
```

### `generateCSPHeader(input)`

Convenience function that returns only the CSP header string.

```javascript
import { generateCSPHeader } from '@csp-kit/generator';

const header = generateCSPHeader(['google-analytics']);
// Returns: "script-src 'self' https://www.google-analytics.com; ..."
```

## Environment Support

csp-kit works in all JavaScript environments:

- ✅ Node.js (20+)
- ✅ Deno
- ✅ Cloudflare Workers
- ✅ Vercel Edge Runtime
- ✅ Browser (ES modules & CommonJS)

## Contributing

Contributions are welcome! Please see our [Contributing Guide](../../CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](../../LICENSE) for details.
