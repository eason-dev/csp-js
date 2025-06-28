# csp-js

A simple and powerful JavaScript library to generate Content Security Policy (CSP) headers for popular web services and libraries.

## Features

- 🚀 **Universal**: Works in any JavaScript environment (Node.js, Deno, Edge Runtime, Browser)
- 🛡️ **Secure**: Generate secure CSP headers for popular services  
- 📦 **Zero Dependencies**: Lightweight and fast
- 🎯 **Service-Aware**: Built-in support for Google Analytics, Microsoft Clarity, Typeform, and more
- 🔧 **Customizable**: Easy to extend with custom rules
- 💡 **TypeScript**: Full TypeScript support with type definitions

## Installation

```bash
npm install csp-js
# or
yarn add csp-js
# or  
pnpm add csp-js
```

## Quick Start

```javascript
import { generateCSP } from 'csp-js';

// Generate CSP for Google Analytics
const result = generateCSP(['google-analytics']);
console.log(result.header);
// Output: script-src 'self' https://www.google-analytics.com; img-src 'self' https://www.google-analytics.com; ...

// Use the CSP header in your response
response.setHeader('Content-Security-Policy', result.header);
```

## Usage Examples

### Basic Usage

```javascript
import { generateCSP } from 'csp-js';

// Single service
const result = generateCSP(['google-analytics']);

// Multiple services
const result = generateCSP(['google-analytics', 'microsoft-clarity', 'typeform']);
```

### Advanced Usage

```javascript
import { generateCSP, generateNonce } from 'csp-js';

// With custom options
const result = generateCSP({
  services: ['google-analytics'],
  nonce: true,                    // Generate nonce for inline scripts
  customRules: {
    'script-src': ['https://my-domain.com'],
    'img-src': ['data:', 'blob:']
  },
  reportUri: 'https://my-site.com/csp-report'
});

console.log(result.header);     // Complete CSP header
console.log(result.nonce);      // Generated nonce value
console.log(result.warnings);   // Security warnings
```

### Service Aliases

```javascript
// These are equivalent
generateCSP(['google-analytics']);
generateCSP(['ga4']);
generateCSP(['gtag']);
```

## Supported Services

- **Analytics**: Google Analytics 4, Microsoft Clarity, Google Tag Manager
- **Forms**: Typeform
- **Fonts**: Google Fonts  
- **Video**: YouTube
- And more...

## API Reference

### `generateCSP(input)`

Generate a complete CSP configuration.

**Parameters:**
- `input` - String array of service names OR options object

**Options:**
```typescript
interface CSPOptions {
  services: string[];           // Service names to include
  nonce?: boolean | string;     // Generate/use nonce
  customRules?: CSPDirectives;  // Additional CSP rules
  reportOnly?: boolean;         // Generate report-only policy
  reportUri?: string;          // CSP violation report URI
  includeSelf?: boolean;       // Include 'self' (default: true)
}
```

**Returns:**
```typescript
interface CSPResult {
  header: string;              // Complete CSP header
  directives: CSPDirectives;   // CSP rules object
  includedServices: string[];  // Successfully included services  
  unknownServices: string[];   // Services not found
  warnings: string[];          // Security warnings
  nonce?: string;             // Generated nonce (if requested)
}
```

### `generateNonce(options?)`

Generate a cryptographically secure nonce.

```javascript
import { generateNonce } from 'csp-js';

const nonce = generateNonce();
const hexNonce = generateNonce({ encoding: 'hex' });
const longNonce = generateNonce({ length: 32 });
```

### `generateCSPHeader(input)`

Convenience function that returns only the CSP header string.

```javascript
import { generateCSPHeader } from 'csp-js';

const header = generateCSPHeader(['google-analytics']);
// Returns: "script-src 'self' https://www.google-analytics.com; ..."
```

## Environment Support

csp-js works in all JavaScript environments:

- ✅ Node.js (18+)
- ✅ Deno
- ✅ Cloudflare Workers  
- ✅ Vercel Edge Runtime
- ✅ Browser (ES modules & CommonJS)

## Contributing

Contributions are welcome! Please see our [Contributing Guide](../../CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](../../LICENSE) for details.