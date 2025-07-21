# @csp-kit/generator

Core CSP generation library for CSP Kit. Generate Content Security Policy headers using service-based configuration.

## Installation

```bash
npm install @csp-kit/generator @csp-kit/data
```

Both packages are required - `@csp-kit/generator` provides the generation logic, `@csp-kit/data` contains service definitions.

## Quick Start

```javascript
import { generateCSP } from '@csp-kit/generator';
import { GoogleAnalytics, Stripe } from '@csp-kit/data';

const result = generateCSP({
  services: [GoogleAnalytics, Stripe],
});

// Use in your app
response.setHeader('Content-Security-Policy', result.header);
```

## API Reference

### `generateCSP(options)`

```typescript
// Simple array syntax
generateCSP([GoogleAnalytics, Stripe])

// Full options
generateCSP({
  services: CSPService[],           // Required: services to include
  nonce?: boolean | string,         // Generate/use nonce
  additionalRules?: CSPDirectives,  // Custom CSP rules
  reportUri?: string,               // Violation reporting
  includeSelf?: boolean,            // Include 'self' (default: false)
  includeUnsafeInline?: boolean,    // Allow unsafe-inline (not recommended)
  includeUnsafeEval?: boolean,      // Allow unsafe-eval (not recommended)
  development?: Partial<CSPOptions>, // Dev overrides (NODE_ENV !== 'production')
  production?: Partial<CSPOptions>,  // Production overrides
})

// Returns
{
  header: string,              // Complete CSP header
  directives: CSPDirectives,   // CSP rules object
  reportOnlyHeader: string,    // Report-only version
  includedServices: string[],  // Services included
  unknownServices: string[],   // Services not found
  warnings: string[],          // Security warnings
  conflicts: string[],         // Service conflicts
  nonce?: string,             // Generated nonce
}
```

### Other Functions

- `generateCSPHeader(options)` - Returns only header string
- `generateNonce(options)` - Generate cryptographic nonce
- `defineService(directives)` - Define custom services

## Examples

### With Nonce

```javascript
const result = generateCSP({
  services: [GoogleAnalytics],
  nonce: true,
});
// Adds 'nonce-xxx' to script-src
```

### Custom Rules

```javascript
const result = generateCSP({
  services: [Stripe],
  additionalRules: {
    'img-src': ['data:', 'blob:'],
    'connect-src': ['https://api.myapp.com'],
  },
});
```

### Environment Config

```javascript
const result = generateCSP({
  services: [GoogleAnalytics],
  development: {
    includeUnsafeEval: true,
  },
  production: {
    reportUri: 'https://myapp.com/csp-report',
  },
});
```

## License

MIT © [CSP Kit Contributors](https://github.com/eason-dev/csp-kit/graphs/contributors)
