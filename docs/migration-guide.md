# Migration Guide

This guide helps you migrate from the old string-based API to the new TypeScript-first API in CSP Kit v2.

## Overview of Changes

The new CSP Kit v2 introduces a completely redesigned API that provides:

- **TypeScript-first design** with full type safety
- **Tree-shakeable imports** for optimal bundle size
- **Direct service imports** instead of string IDs
- **Build-time optimization** instead of runtime loading
- **Better IDE support** with IntelliSense

## Quick Migration Example

### Before (v1.x)

```javascript
// Old API using string IDs
import { generateCSP } from '@csp-kit/generator';

const result = generateCSP(['google-analytics', 'stripe', 'google-fonts']);

// Or with options
const result = generateCSP({
  services: ['google-analytics', 'stripe'],
  nonce: true
});
```

### After (v2.x)

```typescript
// New API using direct imports
import { generateCSP } from '@csp-kit/generator';
import { GoogleAnalytics, Stripe, GoogleFonts } from '@csp-kit/data';

const result = generateCSP({
  services: [GoogleAnalytics, Stripe, GoogleFonts]
});

// With options (same structure)
const result = generateCSP({
  services: [GoogleAnalytics, Stripe],
  nonce: true
});
```

## Step-by-Step Migration

### 1. Update Dependencies

First, update to the latest versions:

```bash
npm update @csp-kit/generator @csp-kit/data
# or
yarn upgrade @csp-kit/generator @csp-kit/data
# or
pnpm update @csp-kit/generator @csp-kit/data
```

### 2. Update Imports

Change from string IDs to direct service imports:

```diff
import { generateCSP } from '@csp-kit/generator';
+ import { GoogleAnalytics, Stripe, Sentry } from '@csp-kit/data';

- const result = generateCSP(['google-analytics', 'stripe', 'sentry']);
+ const result = generateCSP({
+   services: [GoogleAnalytics, Stripe, Sentry]
+ });
```

### 3. Update Service References

Find all string service IDs and replace with imports:

```typescript
// Map of old IDs to new imports
const serviceMap = {
  'google-analytics': 'GoogleAnalytics',
  'google-gtag': 'GoogleAnalytics', // Alias
  'stripe': 'Stripe',
  'paypal': 'Paypal',
  'facebook-pixel': 'FacebookPixel',
  'twitter': 'Twitter',
  'youtube': 'Youtube',
  'google-fonts': 'GoogleFonts',
  'cloudflare': 'Cloudflare',
  'sentry': 'Sentry',
  // ... see full list in your node_modules/@csp-kit/data
};
```

### 4. Remove Async Loading

The new API doesn't require async loading:

```diff
// Old API with async loading
- import { loadServices, generateCSP } from '@csp-kit/generator';
- 
- await loadServices();
- const result = generateCSP(['google-analytics']);

// New API - no loading needed
+ import { generateCSP } from '@csp-kit/generator';
+ import { GoogleAnalytics } from '@csp-kit/data';
+ 
+ const result = generateCSP({
+   services: [GoogleAnalytics]
+ });
```

### 5. Update Configuration Objects

The options structure remains mostly the same:

```typescript
// Old API
const result = generateCSP({
  services: ['google-analytics', 'stripe'],
  nonce: true,
  customRules: { // Note: renamed to additionalRules
    'script-src': ['https://my-domain.com']
  },
  reportUri: '/csp-report'
});

// New API
import { GoogleAnalytics, Stripe } from '@csp-kit/data';

const result = generateCSP({
  services: [GoogleAnalytics, Stripe],
  nonce: true,
  additionalRules: { // Renamed from customRules
    'script-src': ['https://my-domain.com']
  },
  reportUri: '/csp-report'
});
```

## Framework-Specific Migration

### Next.js

#### Before (Pages Router)

```javascript
// pages/_document.js
import { generateCSP } from '@csp-kit/generator';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const csp = generateCSP(['google-analytics', 'stripe']);
    // ...
  }
}
```

#### After (Pages Router)

```typescript
// pages/_document.tsx
import { generateCSP } from '@csp-kit/generator';
import { GoogleAnalytics, Stripe } from '@csp-kit/data';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const csp = generateCSP({
      services: [GoogleAnalytics, Stripe]
    });
    // ...
  }
}
```

#### App Router

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import { generateCSPHeader } from '@csp-kit/generator';
import { GoogleAnalytics, VercelAnalytics } from '@csp-kit/data';

export function middleware(request: Request) {
  const csp = generateCSPHeader({
    services: [GoogleAnalytics, VercelAnalytics]
  });
  
  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy', csp);
  return response;
}
```

### Express.js

#### Before

```javascript
const { generateCSP } = require('@csp-kit/generator');

app.use((req, res, next) => {
  const result = generateCSP(['google-analytics', 'stripe']);
  res.setHeader('Content-Security-Policy', result.header);
  next();
});
```

#### After

```typescript
import { generateCSP } from '@csp-kit/generator';
import { GoogleAnalytics, Stripe } from '@csp-kit/data';

app.use((req, res, next) => {
  const result = generateCSP({
    services: [GoogleAnalytics, Stripe]
  });
  res.setHeader('Content-Security-Policy', result.header);
  next();
});
```

## Custom Services Migration

### Before

```javascript
// Using additionalRules for custom domains
const result = generateCSP({
  services: ['google-analytics'],
  customRules: {
    'script-src': ['https://my-cdn.com'],
    'img-src': ['https://my-images.com']
  }
});
```

### After (Recommended)

```typescript
import { generateCSP, defineService } from '@csp-kit/generator';
import { GoogleAnalytics, ServiceCategory } from '@csp-kit/data';

// Define custom service
const MyCDN = defineService({
  id: 'my-cdn',
  name: 'My CDN',
  category: ServiceCategory.CDN,
  description: 'Custom CDN for assets',
  website: 'https://mycdn.com',
  directives: {
    'script-src': ['https://my-cdn.com'],
    'img-src': ['https://my-images.com']
  }
});

// Use like any other service
const result = generateCSP({
  services: [GoogleAnalytics, MyCDN]
});
```

## TypeScript Configuration

For optimal TypeScript support, update your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler", // or "node16"
    "esModuleInterop": true,
    "strict": true,
    "target": "ES2020",
    "lib": ["ES2020", "DOM"]
  }
}
```

## Common Migration Issues

### 1. Cannot Find Service

**Problem**: `Cannot find name 'GoogleAnalytics'`

**Solution**: Import the service from `@csp-kit/data`:
```typescript
import { GoogleAnalytics } from '@csp-kit/data';
```

### 2. Type Errors

**Problem**: Type errors when passing services

**Solution**: Ensure you're passing service objects, not strings:
```typescript
// ❌ Wrong
generateCSP({ services: ['google-analytics'] });

// ✅ Correct
import { GoogleAnalytics } from '@csp-kit/data';
generateCSP({ services: [GoogleAnalytics] });
```

### 3. Async Functions

**Problem**: `loadServices is not a function`

**Solution**: Remove async loading - it's no longer needed:
```typescript
// Remove these lines
// await loadServices();
// Just use generateCSP directly
```

### 4. Unknown Services

**Problem**: Service not found in exports

**Solution**: Check the exact export name (PascalCase):
```typescript
// Service IDs are converted to PascalCase exports
'google-analytics' → GoogleAnalytics
'facebook-pixel' → FacebookPixel
'google-tag-manager' → GoogleTagManager
```

### 5. Bundle Size Concerns

The new API actually reduces bundle size through tree-shaking:

```typescript
// Only imports what you use
import { GoogleAnalytics, Stripe } from '@csp-kit/data';
// Other services are tree-shaken out
```

## Benefits After Migration

1. **Type Safety**: Full IntelliSense and compile-time checking
2. **Tree Shaking**: Only bundle the services you use
3. **Better Performance**: No runtime service loading
4. **IDE Support**: Autocomplete, go-to-definition, refactoring
5. **Clearer Dependencies**: See exactly which services are used

## Need Help?

- Check the [API Reference](./api-reference.md) for detailed documentation
- Browse [Examples](./examples/) for framework-specific code
- Ask questions in [GitHub Discussions](https://github.com/eason-dev/csp-kit/discussions)
- Report issues on [GitHub Issues](https://github.com/eason-dev/csp-kit/issues)

## Service Name Reference

Here's a quick reference for common service migrations:

| Old String ID | New Import Name |
|---------------|-----------------|
| `'google-analytics'` | `GoogleAnalytics` |
| `'google-gtag'` | `GoogleAnalytics` |
| `'google-tag-manager'` | `GoogleTagManager` |
| `'stripe'` | `Stripe` |
| `'paypal'` | `Paypal` |
| `'square'` | `Square` |
| `'facebook'` | `Facebook` |
| `'facebook-pixel'` | `FacebookPixel` |
| `'twitter'` | `Twitter` |
| `'linkedin'` | `LinkedIn` |
| `'youtube'` | `Youtube` |
| `'vimeo'` | `Vimeo` |
| `'google-fonts'` | `GoogleFonts` |
| `'cloudflare'` | `Cloudflare` |
| `'sentry'` | `Sentry` |
| `'intercom'` | `Intercom` |
| `'hotjar'` | `Hotjar` |
| `'google-maps'` | `GoogleMaps` |

For a complete list, check your `node_modules/@csp-kit/data` or use your IDE's autocomplete after typing `import { } from '@csp-kit/data'`.