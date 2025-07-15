# API Reference

Complete API documentation for CSP Kit TypeScript-first library.

## Installation

```bash
npm install @csp-kit/generator @csp-kit/data
# or
yarn add @csp-kit/generator @csp-kit/data
# or
pnpm add @csp-kit/generator @csp-kit/data
```

## Core API

### `generateCSP(options)`

The primary function for generating Content Security Policy headers.

**Syntax:**

```typescript
import { generateCSP } from '@csp-kit/generator';
import { GoogleAnalytics, Stripe } from '@csp-kit/data';

const result = generateCSP({
  services: [GoogleAnalytics, Stripe],
});
```

**Parameters:**

```typescript
interface CSPOptions {
  services: CSPService[]; // Array of service objects (imported from @csp-kit/data)
  nonce?: boolean | string; // Generate nonce or use provided value
  additionalRules?: CSPDirectives; // Additional CSP rules
  reportUri?: string; // CSP violation reporting endpoint
  includeSelf?: boolean; // Include 'self' directive (default: true)
  unsafeInline?: boolean; // Allow unsafe-inline (not recommended)
  unsafeEval?: boolean; // Allow unsafe-eval (not recommended)
  development?: Partial<CSPOptions>; // Dev-only options
  production?: Partial<CSPOptions>; // Production-only options
}
```

**Return Value:**

```typescript
interface CSPResult {
  header: string; // Complete CSP header string
  directives: CSPDirectives; // CSP directives as object
  reportOnlyHeader: string; // Report-only version
  includedServices: string[]; // Service IDs that were included
  unknownServices: string[]; // Always empty in new API
  warnings: string[]; // Deprecation and security warnings
  conflicts: string[]; // Service conflicts detected
  nonce?: string; // Generated nonce (if requested)
}
```

**Examples:**

```typescript
// Basic usage with imported services
import { generateCSP } from '@csp-kit/generator';
import { GoogleAnalytics, Stripe } from '@csp-kit/data';

const result = generateCSP({
  services: [GoogleAnalytics, Stripe],
});

// Advanced usage with nonce and custom rules
const result = generateCSP({
  services: [GoogleAnalytics, Stripe],
  nonce: true,
  additionalRules: {
    'script-src': ['https://my-cdn.com'],
    'img-src': ['data:', 'blob:'],
  },
  reportUri: 'https://example.com/csp-report',
});

// Environment-specific configuration
const result = generateCSP({
  services: [GoogleAnalytics],
  development: {
    unsafeEval: true, // For hot reload
    additionalRules: {
      'connect-src': ['ws://localhost:*'],
    },
  },
  production: {
    reportUri: 'https://api.example.com/csp-violations',
  },
});
```

### `generateCSPHeader(options)`

Returns only the CSP header string (convenience function).

**Example:**

```typescript
import { generateCSPHeader } from '@csp-kit/generator';
import { GoogleAnalytics, Stripe } from '@csp-kit/data';

const header = generateCSPHeader({
  services: [GoogleAnalytics, Stripe],
});
// "script-src 'self' https://www.googletagmanager.com https://js.stripe.com; ..."
```

### `generateReportOnlyCSP(options)`

Generates a report-only CSP header for testing.

**Example:**

```typescript
import { generateReportOnlyCSP } from '@csp-kit/generator';
import { GoogleAnalytics } from '@csp-kit/data';

const reportOnlyHeader = generateReportOnlyCSP({
  services: [GoogleAnalytics],
  reportUri: '/api/csp-report',
});
// Use: res.setHeader('Content-Security-Policy-Report-Only', reportOnlyHeader);
```

## Service Definition Functions

### `defineService(definition)`

Define a custom service with full TypeScript support.

**Syntax:**

```typescript
import { defineService } from '@csp-kit/generator';
import { ServiceCategory } from '@csp-kit/data';

const MyService = defineService({
  id: 'my-service',
  name: 'My Service',
  category: ServiceCategory.API,
  directives: {
    'connect-src': ['https://api.myservice.com'],
  },
});
```

**Parameters:**

```typescript
interface ServiceDefinition {
  // Required fields
  id: string; // Unique kebab-case identifier
  name: string; // Human-readable name
  category: ServiceCategory; // Service category
  description: string; // Brief description
  website: string; // Official website URL
  directives: CSPDirectives; // CSP directives

  // Optional fields
  officialDocs?: string[]; // Documentation URLs
  notes?: string; // Implementation notes
  aliases?: string[]; // Alternative identifiers
  requiresDynamic?: boolean; // Requires 'strict-dynamic'
  requiresNonce?: boolean; // Requires nonce
  deprecated?: DeprecationInfo; // Deprecation information
  conflicts?: string[]; // Conflicting service IDs
  validate?: (directives: CSPDirectives) => ValidationResult;
  lastUpdated?: string; // ISO timestamp
  verifiedAt?: string; // Last verification timestamp
}
```

**Return Value:**
`CSPService` - A service object ready to use with `generateCSP()`

**Example:**

```typescript
import { defineService } from '@csp-kit/generator';
import { ServiceCategory } from '@csp-kit/data';

// Define a custom CDN service
const MyCDN = defineService({
  id: 'my-cdn',
  name: 'My CDN',
  category: ServiceCategory.CDN,
  description: 'Custom CDN for static assets',
  website: 'https://mycdn.com',
  directives: {
    'img-src': ['https://cdn.myapp.com'],
    'font-src': ['https://cdn.myapp.com'],
    'style-src': ['https://cdn.myapp.com'],
    'script-src': ['https://cdn.myapp.com'],
  },
});

// Use it like any built-in service
const result = generateCSP({
  services: [MyCDN, GoogleAnalytics],
});
```

### `isCSPService(value)`

Type guard to check if a value is a valid CSPService.

**Example:**

```typescript
import { isCSPService } from '@csp-kit/generator';
import { GoogleAnalytics } from '@csp-kit/data';

console.log(isCSPService(GoogleAnalytics)); // true
console.log(isCSPService({ id: 'test' })); // false
```

## Utility Functions

### `generateNonce(length?)`

Generate a cryptographic nonce for CSP.

**Parameters:**

- `length` (number, optional): Nonce length in bytes (default: 16)

**Return Value:**
`string` - Base64-encoded nonce

**Example:**

```typescript
import { generateNonce } from '@csp-kit/generator';

const nonce = generateNonce();
// Use in HTML: <script nonce="${nonce}">...</script>
```

## Type Definitions

### `CSPService`

The core service interface used by all services:

```typescript
interface CSPService {
  id: string; // Unique service identifier
  name: string; // Human-readable name
  category: ServiceCategory; // Service category
  description: string; // Brief description
  website: string; // Official website
  directives: CSPDirectives; // CSP requirements

  // Optional properties
  officialDocs?: string[]; // Documentation URLs
  notes?: string; // Implementation notes
  aliases?: string[]; // Alternative identifiers
  requiresDynamic?: boolean; // Requires 'strict-dynamic'
  requiresNonce?: boolean; // Requires nonce
  deprecated?: DeprecationInfo; // Deprecation info
  conflicts?: string[]; // Conflicting service IDs
  validate?: (directives: CSPDirectives) => ValidationResult;
  lastUpdated?: string; // ISO timestamp
  verifiedAt?: string; // Verification timestamp
}
```

### `CSPDirectives`

```typescript
interface CSPDirectives {
  'script-src'?: string[];
  'style-src'?: string[];
  'img-src'?: string[];
  'connect-src'?: string[];
  'font-src'?: string[];
  'object-src'?: string[];
  'media-src'?: string[];
  'frame-src'?: string[];
  'child-src'?: string[];
  'worker-src'?: string[];
  'manifest-src'?: string[];
  'base-uri'?: string[];
  'form-action'?: string[];
  'frame-ancestors'?: string[];
  'report-uri'?: string[];
  'report-to'?: string[];
  // ... other standard CSP directives
}
```

### `ServiceCategory`

```typescript
enum ServiceCategory {
  ANALYTICS = 'analytics',
  ADVERTISING = 'advertising',
  SOCIAL = 'social',
  PAYMENT = 'payment',
  CDN = 'cdn',
  MONITORING = 'monitoring',
  FORMS = 'forms',
  VIDEO = 'video',
  TESTING = 'testing',
  CHAT = 'chat',
  FONTS = 'fonts',
  MAPS = 'maps',
  API = 'api',
  DEVELOPMENT = 'development',
  OTHER = 'other',
}
```

### `DeprecationInfo`

```typescript
interface DeprecationInfo {
  since: string; // ISO date when deprecated
  message: string; // Explanation
  alternative?: string; // Suggested alternative service ID
}
```

### `ValidationResult`

```typescript
interface ValidationResult {
  warnings?: string[]; // Non-critical issues
  errors?: string[]; // Critical issues
}
```

## Importing Services

All 106+ pre-configured services are available from `@csp-kit/data`:

```typescript
// Import specific services
import { GoogleAnalytics, Stripe, GoogleFonts, Intercom, Sentry } from '@csp-kit/data';

// Use with generateCSP
const result = generateCSP({
  services: [GoogleAnalytics, Stripe, GoogleFonts, Intercom, Sentry],
});
```

### Available Services by Category

**Analytics** (12+ services):

```typescript
import {
  GoogleAnalytics,
  Amplitude,
  Mixpanel,
  Hotjar,
  Plausible,
  Fathom,
  // ... more
} from '@csp-kit/data';
```

**Payment** (8+ services):

```typescript
import {
  Stripe,
  Paypal,
  Square,
  Braintree,
  Razorpay,
  // ... more
} from '@csp-kit/data';
```

**Social** (15+ services):

```typescript
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  Youtube,
  // ... more
} from '@csp-kit/data';
```

**And many more categories...**

## Framework Integration Examples

### Next.js App Router

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import { generateCSPHeader } from '@csp-kit/generator';
import { GoogleAnalytics, VercelAnalytics } from '@csp-kit/data';

export function middleware(request: Request) {
  const csp = generateCSPHeader({
    services: [GoogleAnalytics, VercelAnalytics],
  });

  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy', csp);
  return response;
}
```

### Express.js

```typescript
import express from 'express';
import { generateCSP } from '@csp-kit/generator';
import { GoogleAnalytics, Stripe, Sentry } from '@csp-kit/data';

const app = express();

// CSP middleware
app.use((req, res, next) => {
  const result = generateCSP({
    services: [GoogleAnalytics, Stripe, Sentry],
    nonce: true,
  });

  res.locals.nonce = result.nonce;
  res.setHeader('Content-Security-Policy', result.header);
  next();
});
```

### Custom Service Patterns

```typescript
import { defineService, generateCSP } from '@csp-kit/generator';
import { ServiceCategory, GoogleAnalytics } from '@csp-kit/data';

// Pattern 1: Environment-specific services
const DevServer = defineService({
  id: 'dev-server',
  name: 'Development Server',
  category: ServiceCategory.DEVELOPMENT,
  description: 'Local development server',
  website: 'http://localhost:3000',
  directives: {
    'script-src': ['http://localhost:3000', "'unsafe-eval'"],
    'connect-src': ['ws://localhost:3000'],
  },
});

// Pattern 2: Dynamic service creation
function createRegionalCDN(region: 'us' | 'eu' | 'asia') {
  return defineService({
    id: `cdn-${region}`,
    name: `CDN ${region.toUpperCase()}`,
    category: ServiceCategory.CDN,
    description: `Regional CDN for ${region}`,
    website: `https://cdn-${region}.example.com`,
    directives: {
      'img-src': [`https://cdn-${region}.example.com`],
      'script-src': [`https://cdn-${region}.example.com`],
    },
  });
}

// Usage
const isDev = process.env.NODE_ENV === 'development';
const userRegion = getUserRegion(); // Your logic

const result = generateCSP({
  services: [GoogleAnalytics, createRegionalCDN(userRegion), ...(isDev ? [DevServer] : [])],
});
```

## Error Handling

CSP Kit provides helpful error messages and warnings:

```typescript
const result = generateCSP({
  services: [GoogleAnalytics],
  unsafeInline: true, // Not recommended
});

// Check warnings
if (result.warnings.length > 0) {
  console.warn('CSP warnings:', result.warnings);
  // ["Using 'unsafe-inline' is not recommended for security"]
}

// Check for conflicts
const result2 = generateCSP({
  services: [OldAnalytics, NewAnalytics], // If they conflict
});

if (result2.conflicts.length > 0) {
  console.error('Service conflicts:', result2.conflicts);
}
```

## Performance Tips

### 1. Import Only What You Need

```typescript
// ✅ Good - tree-shakeable imports
import { GoogleAnalytics, Stripe } from '@csp-kit/data';

// ❌ Avoid - imports entire library
import * as allServices from '@csp-kit/data';
```

### 2. Cache CSP Results

```typescript
const cspCache = new Map<string, CSPResult>();

function getCachedCSP(services: CSPService[]): CSPResult {
  const key = services
    .map(s => s.id)
    .sort()
    .join(',');

  if (!cspCache.has(key)) {
    cspCache.set(key, generateCSP({ services }));
  }

  return cspCache.get(key)!;
}
```

### 3. Reuse Service Definitions

```typescript
// Define once, use many times
const commonServices = [GoogleAnalytics, GoogleFonts];

// Different pages
const homepageCSP = generateCSP({
  services: [...commonServices, Youtube],
});

const checkoutCSP = generateCSP({
  services: [...commonServices, Stripe, Paypal],
});
```

## Migration Guide

### From String IDs to Service Objects

The new TypeScript API uses direct imports instead of string IDs:

```typescript
// ❌ Old API (v1.x and below)
import { generateCSP } from '@csp-kit/generator';

const result = generateCSP(['google-analytics', 'stripe']);

// ✅ New API (v2.x)
import { generateCSP } from '@csp-kit/generator';
import { GoogleAnalytics, Stripe } from '@csp-kit/data';

const result = generateCSP({
  services: [GoogleAnalytics, Stripe],
});
```

### Benefits of the New API

1. **Type Safety**: Full IntelliSense and compile-time checking
2. **Tree Shaking**: Only bundle the services you use
3. **No Runtime Loading**: Services are imported at build time
4. **Better Performance**: No async loading or service registry
5. **Clearer Dependencies**: See exactly which services are used

## TypeScript Configuration

For optimal TypeScript support:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler", // or "node16"
    "esModuleInterop": true,
    "strict": true
  }
}
```

## Browser Support

CSP Kit works in any modern JavaScript environment:

- ✅ Node.js 18+
- ✅ Modern browsers (ES2020+)
- ✅ Bundlers (Webpack, Vite, Rollup, esbuild)
- ✅ Edge runtimes (Vercel, Cloudflare Workers)
- ✅ Deno (with npm: specifiers)

---

## Need Help?

- 📖 **[Getting Started Guide](./getting-started.md)**
- 🌐 **[Web Interface](https://csp-kit.eason.ch)**
- 🐛 **[GitHub Issues](https://github.com/eason-dev/csp-kit/issues)**
- 💬 **[GitHub Discussions](https://github.com/eason-dev/csp-kit/discussions)**
