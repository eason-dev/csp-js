# Custom Service API Design

## Creating Custom Services for Your Application

While CSP Kit provides 106+ pre-configured services, you'll often need to add your own domains and services. This guide shows how to create custom services that integrate seamlessly with CSP Kit's TypeScript-first API.

## Quick Start: Custom Service Definition

```typescript
import { generateCSP, defineService } from '@csp-kit/generator';
import { GoogleAnalytics, Stripe } from '@csp-kit/data';

// Define a custom service for your CDN
const MyCDN = defineService({
  directives: {
    'img-src': ['https://cdn.myapp.com'],
    'font-src': ['https://cdn.myapp.com'],
    'style-src': ['https://cdn.myapp.com'],
    'script-src': ['https://cdn.myapp.com'],
  },
});

// Use it just like built-in services
const result = generateCSP({
  services: [GoogleAnalytics, Stripe, MyCDN],
  nonce: true,
});
```

## Why Custom Services?

Using custom services instead of `additionalRules` provides:

- **Type Safety**: Full TypeScript support with IntelliSense
- **Reusability**: Define once, use across your entire application
- **Consistency**: Same API as built-in services
- **Documentation**: Self-documenting with descriptions and metadata
- **Validation**: Built-in validation and conflict detection

## Service Definition Patterns

### 1. Basic Service Definition

For simple services with static domains:

```typescript
import { defineService } from '@csp-kit/generator';

export const MyAPI = defineService({
  directives: {
    'connect-src': ['https://api.myapp.com', 'wss://realtime.myapp.com'],
  },
});
```

### 2. Complex Service with Multiple Directives

For services that need multiple CSP directives:

```typescript
export const VideoStreaming = defineService({
  directives: {
    'media-src': [
      'https://video.myapp.com',
      'blob:', // For blob URLs in video player
    ],
    'img-src': ['https://thumbnails.myapp.com'],
    'connect-src': ['https://video-api.myapp.com'],
  },
});
```

### 3. Environment-Specific Services

Handle different configurations for development and production:

```typescript
// services/development.ts
export const DevTools = defineService({
  directives: {
    'script-src': [
      'http://localhost:3000',
      'http://localhost:5173', // Vite
      "'unsafe-eval'", // Required for hot reload
    ],
    'connect-src': [
      'ws://localhost:3000', // Hot reload websocket
      'ws://localhost:5173', // Vite HMR
      'http://localhost:3001', // API dev server
    ],
  },
});

// Usage with environment detection
const result = generateCSP({
  services: [
    GoogleAnalytics,
    Stripe,
    ...(process.env.NODE_ENV === 'development' ? [DevTools] : []),
  ],
});
```

### 4. Multi-Region Services

Create services dynamically based on user location:

```typescript
// services/regional.ts
import { defineService } from '@csp-kit/generator';

export function createRegionalCDN(region: 'us' | 'eu' | 'asia') {
  return defineService({
    directives: {
      'img-src': [`https://cdn-${region}.myapp.com`],
      'font-src': [`https://cdn-${region}.myapp.com`],
      'style-src': [`https://cdn-${region}.myapp.com`],
      'script-src': [`https://cdn-${region}.myapp.com`],
    },
  });
}

// Usage based on user region
const userRegion = getUserRegion(); // 'us', 'eu', or 'asia'
const result = generateCSP({
  services: [GoogleAnalytics, createRegionalCDN(userRegion)],
});
```

### 5. Configurable Services

For services that need runtime configuration:

```typescript
// services/monitoring.ts
import { defineService } from '@csp-kit/generator';

// For most cases, use a factory function
export function createMonitoringService(options: {
  apiKey: string;
  region?: 'us' | 'eu';
  enableRUM?: boolean;
}) {
  const region = options.region || 'us';
  const baseUrl = `https://monitoring-${region}.myapp.com`;

  return defineService({
    directives: {
      'script-src': [baseUrl],
      'connect-src': [baseUrl, ...(options.enableRUM ? [`https://rum-${region}.myapp.com`] : [])],
    },
  });
}
```

## Organizing Custom Services

### Recommended Project Structure

```
src/
├── services/
│   ├── index.ts          # Main exports
│   ├── cdn.ts            # CDN services
│   ├── api.ts            # API endpoints
│   ├── monitoring.ts     # Monitoring/analytics
│   ├── development.ts    # Dev-only services
│   └── third-party.ts    # Wrapped third-party services
├── csp/
│   ├── presets.ts        # Service combinations
│   └── config.ts         # CSP configuration
```

### Example Organization

```typescript
// services/index.ts
export * from './cdn';
export * from './api';
export * from './monitoring';
export * from './development';

// services/cdn.ts
import { defineService } from '@csp-kit/generator';

export const AssetsCDN = defineService({
  directives: {
    'img-src': ['https://assets.myapp.com'],
    'font-src': ['https://assets.myapp.com'],
    'style-src': ['https://assets.myapp.com'],
    'script-src': ['https://assets.myapp.com'],
  },
});

export const MediaCDN = defineService({
  directives: {
    'img-src': ['https://media.myapp.com'],
    'media-src': ['https://media.myapp.com'],
  },
});
```

### Service Presets

Group services into reusable presets:

```typescript
// csp/presets.ts
import { GoogleAnalytics, Stripe, Sentry } from '@csp-kit/data';
import { AssetsCDN, MediaCDN, MainAPI, Monitoring } from '../services';

export const coreServices = [AssetsCDN, MainAPI];

export const mediaServices = [MediaCDN];

export const analyticsServices = [GoogleAnalytics, Monitoring];

export const paymentServices = [Stripe];

export const errorServices = [Sentry];

// Complete preset for production
export const productionServices = [
  ...coreServices,
  ...analyticsServices,
  ...paymentServices,
  ...errorServices,
];
```

## Type Safety Benefits

Custom services provide full TypeScript support:

```typescript
import { type CSPService } from '@csp-kit/generator';
import { AssetsCDN, MainAPI } from './services';

// Type checking for service arrays
const services: CSPService[] = [AssetsCDN, MainAPI];

// IntelliSense for service properties
console.log(AssetsCDN.directives); // { 'img-src': [...], ... }

// Type errors for invalid directives
const BadService = defineService({
  directives: {
    'invalid-src': ['...'], // TypeScript error!
  },
});
```

## Advanced Patterns

### Service Validation

Add validation to ensure services are configured correctly:

```typescript
export const APIService = defineService({
  directives: {
    'connect-src': ['https://api.myapp.com'],
  },
});
```

### Service Conflicts

Prevent incompatible services from being used together:

```typescript
export const OldAPI = defineService({
  directives: {
    'connect-src': ['https://old-api.myapp.com'],
  },
});

export const NewAPI = defineService({
  directives: {
    'connect-src': ['https://api.myapp.com'],
  },
});
```

## Complete Example

Here's a complete example of a production-ready CSP configuration:

```typescript
// services/index.ts
import { defineService } from '@csp-kit/generator';

// CDN Services
export const AssetsCDN = defineService({
  directives: {
    'img-src': ['https://assets.myapp.com'],
    'font-src': ['https://assets.myapp.com'],
    'style-src': ['https://assets.myapp.com'],
  },
});

// API Services
export const MainAPI = defineService({
  directives: {
    'connect-src': ['https://api.myapp.com', 'wss://realtime.myapp.com'],
  },
});

// Monitoring
export const Monitoring = defineService({
  directives: {
    'script-src': ['https://monitoring.myapp.com'],
    'connect-src': ['https://monitoring.myapp.com'],
  },
});

// app.ts
import { generateCSP } from '@csp-kit/generator';
import { GoogleAnalytics, Stripe, Sentry } from '@csp-kit/data';
import { AssetsCDN, MainAPI, Monitoring } from './services';

export function generateAppCSP(options: { nonce?: string } = {}) {
  return generateCSP({
    services: [
      // Custom services
      AssetsCDN,
      MainAPI,
      Monitoring,

      // Third-party services
      GoogleAnalytics,
      Stripe,
      Sentry,
    ],
    nonce: options.nonce,
    reportUri: '/api/csp-violations',

    // Environment-specific overrides
    development: {
      unsafeEval: true, // For hot reload
      additionalRules: {
        'connect-src': ['http://localhost:*'],
      },
    },
  });
}
```

## Best Practices

1. **Use TypeScript**: Define services in `.ts` files for full type safety
2. **Add Comments**: Use code comments to document what each service does
3. **Group by Purpose**: Organize services logically by functionality
4. **Document Requirements**: Add comments for special requirements
5. **Version Control**: Track service changes in your repository
6. **Test Services**: Validate CSP headers in development and staging
7. **Monitor Violations**: Use `reportUri` to track CSP violations

## Migration from `additionalRules`

If you're currently using `additionalRules`, migrate to custom services:

```typescript
// ❌ Old approach with additionalRules
const result = generateCSP({
  services: [GoogleAnalytics, Stripe],
  additionalRules: {
    'img-src': ['https://cdn.myapp.com'],
    'connect-src': ['https://api.myapp.com'],
  },
});

// ✅ New approach with custom services
const MyCDN = defineService({
  directives: {
    'img-src': ['https://cdn.myapp.com'],
  },
});

const MyAPI = defineService({
  directives: {
    'connect-src': ['https://api.myapp.com'],
  },
});

const result = generateCSP({
  services: [GoogleAnalytics, Stripe, MyCDN, MyAPI],
});
```

This approach provides better organization, reusability, and type safety for your CSP configuration.
