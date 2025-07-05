# API Reference

Complete API documentation for CSP Kit JavaScript/TypeScript library.

## Installation

```bash
npm install @csp-kit/generator @csp-kit/data
```

## Core Functions

### `generateCSP(input)`

The primary function for generating Content Security Policy headers.

**Syntax:**
```javascript
generateCSP(services)
generateCSP(options)
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `input` | `string[]` \| `CSPOptions` | Array of service names or options object |

**CSPOptions Interface:**

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

**Return Value:**

```typescript
interface CSPResult {
  header: string;               // Complete CSP header string
  directives: CSPDirectives;    // CSP directives as object
  reportOnlyHeader: string;     // Report-only version
  includedServices: string[];   // Successfully included services
  unknownServices: string[];    // Services not found
  warnings: string[];           // Deprecation and other warnings
  nonce?: string;               // Generated nonce (if requested)
}
```

**Examples:**

```javascript
// Simple usage
const result = generateCSP(['google-analytics', 'stripe']);

// Advanced usage
const result = generateCSP({
  services: ['google-analytics', 'stripe'],
  nonce: true,
  customRules: {
    'script-src': ['https://my-cdn.com'],
    'img-src': ['data:', 'blob:']
  },
  reportUri: 'https://example.com/csp-report'
});
```

### `generateCSPHeader(input)`

Returns only the CSP header string.

**Syntax:**
```javascript
generateCSPHeader(services)
generateCSPHeader(options)
```

**Parameters:**
Same as `generateCSP()`

**Return Value:**
`string` - The CSP header string

**Example:**
```javascript
const header = generateCSPHeader(['google-analytics', 'stripe']);
// "script-src 'self' https://www.googletagmanager.com https://js.stripe.com; ..."
```

### `generateReportOnlyCSP(input)`

Generates a report-only CSP header for testing.

**Syntax:**
```javascript
generateReportOnlyCSP(services)
generateReportOnlyCSP(options)
```

**Parameters:**
Same as `generateCSP()`

**Return Value:**
`string` - The report-only CSP header string

**Example:**
```javascript
const reportOnlyHeader = generateReportOnlyCSP(['google-analytics']);
// Use for testing: res.setHeader('Content-Security-Policy-Report-Only', reportOnlyHeader);
```

## Async Functions

### `generateCSPAsync(input)`

Async version of `generateCSP()` that loads services on demand.

**Syntax:**
```javascript
await generateCSPAsync(services)
await generateCSPAsync(options)
```

**Example:**
```javascript
// No need to call loadServices() first
const result = await generateCSPAsync(['google-analytics', 'stripe']);
```

### `generateCSPHeaderAsync(input)`

Async version of `generateCSPHeader()`.

### `generateReportOnlyCSPAsync(input)`

Async version of `generateReportOnlyCSP()`.

## Service Management Functions

### `loadServices()`

Loads service definitions from disk. Must be called before using sync functions.

**Syntax:**
```javascript
await loadServices()
```

**Example:**
```javascript
import { loadServices, generateCSP } from '@csp-kit/generator';

await loadServices();
const result = generateCSP(['google-analytics']);
```

### `getService(identifier)`

Get a service by ID or alias (sync version).

**Parameters:**
- `identifier` (string): Service ID or alias

**Return Value:**
`ServiceDefinition | undefined`

**Example:**
```javascript
const service = getService('google-analytics');
// or by alias
const service = getService('ga4');
```

### `getServiceAsync(identifier)`

Get a service by ID or alias (async version).

**Parameters:**
- `identifier` (string): Service ID or alias

**Return Value:**
`Promise<ServiceDefinition | undefined>`

**Example:**
```javascript
const service = await getServiceAsync('google-analytics');
```

### `searchServices(query)`

Search services by name, description, or aliases.

**Parameters:**
- `query` (string): Search query

**Return Value:**
`Promise<ServiceDefinition[]>`

**Example:**
```javascript
const results = await searchServices('analytics');
console.log(results.map(s => s.id));
// ['google-analytics', 'mixpanel', 'hotjar', ...]
```

### `getServicesByCategory(category)`

Get all services in a specific category.

**Parameters:**
- `category` (ServiceCategory): Category enum value

**Return Value:**
`Promise<ServiceDefinition[]>`

**Example:**
```javascript
import { ServiceCategory } from '@csp-kit/generator';

const analyticsServices = await getServicesByCategory(ServiceCategory.ANALYTICS);
```

### `getServiceRegistry()`

Get the complete service registry with metadata.

**Return Value:**
`Promise<ServiceRegistry>`

**Example:**
```javascript
const registry = await getServiceRegistry();
console.log(`Last updated: ${registry.lastUpdated}`);
console.log(`Total services: ${Object.keys(registry.services).length}`);
```

## Utility Functions

### `generateNonce(length?)`

Generate a cryptographic nonce for CSP.

**Parameters:**
- `length` (number, optional): Nonce length in bytes (default: 16)

**Return Value:**
`string` - Base64-encoded nonce

**Example:**
```javascript
import { generateNonce } from '@csp-kit/generator';

const nonce = generateNonce();
// Use in HTML: <script nonce="${nonce}">...</script>
```

### `clearServicesCache()`

Clear the services cache (useful for testing).

**Example:**
```javascript
import { clearServicesCache } from '@csp-kit/generator';

clearServicesCache();
// Services will be reloaded on next access
```

## Type Definitions

### `ServiceDefinition`

```typescript
interface ServiceDefinition {
  id: string;                    // Unique service identifier
  name: string;                  // Human-readable name
  category: ServiceCategory;     // Service category
  description: string;           // Brief description
  website: string;               // Official website
  officialDocs: string[];        // Official documentation URLs
  cspDirectives: CSPDirectives;  // CSP requirements
  requiresDynamic?: boolean;     // Requires 'strict-dynamic'
  requiresNonce?: boolean;       // Requires nonce
  notes?: string;                // Additional notes
  aliases?: string[];            // Alternative identifiers
  lastUpdated: string;           // ISO timestamp
  verifiedAt?: string;           // Last verification timestamp
  monitoring?: ServiceMonitoring; // Monitoring configuration
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
  // ... other CSP directives
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
  OTHER = 'other'
}
```

### `ServiceRegistry`

```typescript
interface ServiceRegistry {
  services: Record<string, ServiceDefinition>;
  categories: Record<ServiceCategory, string[]>;
  lastUpdated: string;
  version: string;
  schemaVersion: string;
}
```

## Framework Examples

### Next.js

```javascript
// pages/api/csp.js or app/api/csp/route.js
import { generateCSP } from '@csp-kit/generator';

export default function handler(req, res) {
  const result = generateCSP(['google-analytics', 'vercel-analytics']);
  res.setHeader('Content-Security-Policy', result.header);
  res.json({ success: true });
}

// middleware.js
import { generateCSPHeader } from '@csp-kit/generator';

export function middleware(request) {
  const csp = generateCSPHeader(['google-analytics']);
  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy', csp);
  return response;
}
```

### Express.js

```javascript
import express from 'express';
import { generateCSP } from '@csp-kit/generator';

const app = express();

// CSP middleware
app.use((req, res, next) => {
  const result = generateCSP(['google-analytics', 'stripe']);
  res.setHeader('Content-Security-Policy', result.header);
  next();
});
```

### Fastify

```javascript
import Fastify from 'fastify';
import { generateCSPHeader } from '@csp-kit/generator';

const fastify = Fastify();

// CSP hook
fastify.addHook('onSend', async (request, reply) => {
  const csp = generateCSPHeader(['google-analytics']);
  reply.header('Content-Security-Policy', csp);
});
```

## Error Handling

### Common Errors

**Services not loaded:**
```javascript
try {
  const result = generateCSP(['google-analytics']);
} catch (error) {
  if (error.message.includes('Services not loaded')) {
    await loadServices();
    const result = generateCSP(['google-analytics']);
  }
}
```

**Unknown services:**
```javascript
const result = generateCSP(['unknown-service']);
if (result.unknownServices.length > 0) {
  console.warn('Unknown services:', result.unknownServices);
}
```

**Validation warnings:**
```javascript
const result = generateCSP({
  services: ['google-analytics'],
  unsafeInline: true
});

if (result.warnings.length > 0) {
  console.warn('CSP warnings:', result.warnings);
}
```

## Performance Considerations

### Service Loading

```javascript
// Load once at startup (recommended)
import { loadServices } from '@csp-kit/generator';
await loadServices();

// Or use async functions (loads on demand)
const result = await generateCSPAsync(['google-analytics']);
```

### Caching Results

```javascript
// Cache CSP result for better performance
const cspCache = new Map();

function getCachedCSP(services) {
  const key = services.sort().join(',');
  if (!cspCache.has(key)) {
    cspCache.set(key, generateCSP(services));
  }
  return cspCache.get(key);
}
```

## Migration Guide

### From v0.x to v1.x

The new version simplifies the API and removes version support:

```javascript
// Old (v0.x)
const result = generateCSP(['google-analytics@4.0.0']);

// New (v1.x) - versions removed, always uses latest
const result = generateCSP(['google-analytics']);
```

## TypeScript Support

CSP Kit is written in TypeScript and provides complete type definitions:

```typescript
import { generateCSP, type CSPOptions, type CSPResult } from '@csp-kit/generator';

const options: CSPOptions = {
  services: ['google-analytics'],
  nonce: true,
  customRules: {
    'script-src': ['https://example.com']
  }
};

const result: CSPResult = generateCSP(options);
```

## Browser Support

CSP Kit works in any JavaScript environment:
- ✅ Node.js 18+
- ✅ Modern browsers (ES2020+)
- ✅ Webpack/Rollup/Vite bundlers
- ✅ Edge runtime (Vercel, Cloudflare Workers)

---

## Need Help?

- 📖 **[Getting Started Guide](./getting-started.md)**
- 🐛 **[GitHub Issues](https://github.com/eason-dev/csp-kit/issues)**
- 💬 **[GitHub Discussions](https://github.com/eason-dev/csp-kit/discussions)**
- 🌐 **[Web Interface](https://csp-kit.eason.ch)**