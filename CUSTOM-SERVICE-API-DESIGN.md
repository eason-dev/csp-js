# Custom Service API Design

## Creating Custom Services for Your Application

While CSP Kit provides 106+ pre-configured services, you'll often need to add your own domains and services. This guide shows how to create custom services that integrate seamlessly with CSP Kit's TypeScript-first API.

## Quick Start: Custom Service Definition

```typescript
import { generateCSP, defineService } from '@csp-kit/generator';
import { GoogleAnalytics, Stripe } from '@csp-kit/data';
import { ServiceCategory } from '@csp-kit/data';

// Define a custom service for your CDN
const MyCDN = defineService({
  id: 'my-cdn',
  name: 'My CDN',
  category: ServiceCategory.CDN,
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
import { ServiceCategory } from '@csp-kit/data';

export const MyAPI = defineService({
  id: 'my-api',
  name: 'My API',
  category: ServiceCategory.API,
  description: 'Main application API and WebSocket connections',
  directives: {
    'connect-src': ['https://api.myapp.com', 'wss://realtime.myapp.com'],
  },
});
```

### 2. Comprehensive Service with Metadata

Add documentation and validation for team collaboration:

```typescript
export const VideoStreaming = defineService({
  id: 'video-streaming',
  name: 'Video Streaming Service',
  category: ServiceCategory.VIDEO,
  description: 'Custom video streaming infrastructure for product demos',
  website: 'https://docs.internal/video-streaming',
  directives: {
    'media-src': [
      'https://video.myapp.com',
      'blob:', // For blob URLs in video player
    ],
    'img-src': ['https://thumbnails.myapp.com'],
    'connect-src': ['https://video-api.myapp.com'],
  },
  notes: 'Requires authentication token in query params',
  requiresDynamic: true, // Indicates dynamic content generation
});
```

### 3. Environment-Specific Services

Handle different configurations for development and production:

```typescript
// services/development.ts
export const DevTools = defineService({
  id: 'dev-tools',
  name: 'Development Tools',
  category: ServiceCategory.DEVELOPMENT,
  description: 'Local development servers and hot reload',
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
  notes: 'Only include in development builds',
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
import { ServiceCategory } from '@csp-kit/data';

export function createRegionalCDN(region: 'us' | 'eu' | 'asia') {
  return defineService({
    id: `cdn-${region}`,
    name: `CDN ${region.toUpperCase()}`,
    category: ServiceCategory.CDN,
    description: `Regional CDN for ${region.toUpperCase()} users`,
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
import { defineService, createConfigurableService } from '@csp-kit/generator';
import { ServiceCategory } from '@csp-kit/data';

// Note: createConfigurableService is for advanced use cases
// For most cases, use a factory function instead
export function createMonitoringService(options: {
  apiKey: string;
  region?: 'us' | 'eu';
  enableRUM?: boolean;
}) {
  const region = options.region || 'us';
  const baseUrl = `https://monitoring-${region}.myapp.com`;

  return defineService({
    id: 'monitoring',
    name: 'Application Monitoring',
    category: ServiceCategory.MONITORING,
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
import { ServiceCategory } from '@csp-kit/data';

export const AssetsCDN = defineService({
  id: 'assets-cdn',
  name: 'Assets CDN',
  category: ServiceCategory.CDN,
  directives: {
    'img-src': ['https://assets.myapp.com'],
    'font-src': ['https://assets.myapp.com'],
    'style-src': ['https://assets.myapp.com'],
    'script-src': ['https://assets.myapp.com'],
  },
});

export const MediaCDN = defineService({
  id: 'media-cdn',
  name: 'Media CDN',
  category: ServiceCategory.CDN,
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
console.log(AssetsCDN.id); // "assets-cdn"
console.log(AssetsCDN.category); // "cdn"
console.log(AssetsCDN.directives); // { 'img-src': [...], ... }

// Type errors for invalid directives
const BadService = defineService({
  id: 'bad',
  name: 'Bad Service',
  category: ServiceCategory.OTHER,
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
  id: 'api-service',
  name: 'API Service',
  category: ServiceCategory.API,
  directives: {
    'connect-src': ['https://api.myapp.com'],
  },
  validate: directives => {
    const warnings = [];

    // Check if API is using HTTPS
    const connectSrc = directives['connect-src'] || [];
    const hasHttp = connectSrc.some(src => src.startsWith('http://'));

    if (hasHttp) {
      warnings.push('API should use HTTPS in production');
    }

    return { warnings };
  },
});
```

### Service Conflicts

Prevent incompatible services from being used together:

```typescript
export const OldAPI = defineService({
  id: 'old-api',
  name: 'Legacy API',
  category: ServiceCategory.API,
  directives: {
    'connect-src': ['https://old-api.myapp.com'],
  },
  deprecated: {
    since: '2024-01-01',
    message: 'Legacy API is deprecated',
    alternative: 'new-api',
  },
});

export const NewAPI = defineService({
  id: 'new-api',
  name: 'New API',
  category: ServiceCategory.API,
  directives: {
    'connect-src': ['https://api.myapp.com'],
  },
  conflicts: ['old-api'], // Prevents using both APIs together
});
```

## Complete Example

Here's a complete example of a production-ready CSP configuration:

```typescript
// services/index.ts
import { defineService } from '@csp-kit/generator';
import { ServiceCategory } from '@csp-kit/data';

// CDN Services
export const AssetsCDN = defineService({
  id: 'assets-cdn',
  name: 'Static Assets CDN',
  category: ServiceCategory.CDN,
  description: 'CDN for images, fonts, and static assets',
  directives: {
    'img-src': ['https://assets.myapp.com'],
    'font-src': ['https://assets.myapp.com'],
    'style-src': ['https://assets.myapp.com'],
  },
});

// API Services
export const MainAPI = defineService({
  id: 'main-api',
  name: 'Main API',
  category: ServiceCategory.API,
  description: 'Primary API and real-time connections',
  directives: {
    'connect-src': ['https://api.myapp.com', 'wss://realtime.myapp.com'],
  },
});

// Monitoring
export const Monitoring = defineService({
  id: 'monitoring',
  name: 'Error & Performance Monitoring',
  category: ServiceCategory.MONITORING,
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
2. **Add Descriptions**: Help your team understand what each service does
3. **Group by Category**: Organize services logically
4. **Document Requirements**: Use the `notes` field for special requirements
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
  id: 'my-cdn',
  name: 'My CDN',
  category: ServiceCategory.CDN,
  directives: {
    'img-src': ['https://cdn.myapp.com'],
  },
});

const MyAPI = defineService({
  id: 'my-api',
  name: 'My API',
  category: ServiceCategory.API,
  directives: {
    'connect-src': ['https://api.myapp.com'],
  },
});

const result = generateCSP({
  services: [GoogleAnalytics, Stripe, MyCDN, MyAPI],
});
```

This approach provides better organization, reusability, and type safety for your CSP configuration.
