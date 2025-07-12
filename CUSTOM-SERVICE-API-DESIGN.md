# Custom Service API Design

## The Problem with `additionalRules`

Adding custom domains via `additionalRules` breaks the service-oriented model. Instead, users should define their own services - it's cleaner and more reusable.

## Better Approach: Custom Services as First-Class Citizens

### Option 1: Inline Service Definition (Quick & Dirty)
```typescript
import { generateCSP, defineService } from '@csp-kit/generator';
import { GoogleAnalytics4, Stripe } from '@csp-kit/data';

// Define a custom service inline
const MyCDN = defineService({
  id: 'my-cdn',
  name: 'My CDN',
  category: 'cdn',
  directives: {
    'img-src': ['https://cdn.myapp.com'],
    'font-src': ['https://cdn.myapp.com'],
    'style-src': ['https://cdn.myapp.com']
  }
});

// Use it just like built-in services
const csp = generateCSP({
  services: [GoogleAnalytics4, Stripe, MyCDN],
  nonce: true
});
```

### Option 2: Reusable Service Files (Recommended)
```typescript
// services/my-cdn.ts
import { defineService } from '@csp-kit/generator';

export const MyCDN = defineService({
  id: 'my-cdn',
  name: 'My Company CDN',
  category: 'cdn',
  directives: {
    'img-src': ['https://cdn.myapp.com'],
    'font-src': ['https://cdn.myapp.com'],
    'style-src': ['https://cdn.myapp.com']
  }
});

// services/my-api.ts
export const MyAPI = defineService({
  id: 'my-api',
  name: 'My API',
  category: 'api',
  directives: {
    'connect-src': [
      'https://api.myapp.com',
      'wss://realtime.myapp.com'
    ]
  }
});

// services/my-monitoring.ts
export const MyMonitoring = defineService({
  id: 'my-monitoring',
  name: 'Internal Monitoring',
  category: 'monitoring',
  directives: {
    'script-src': ['https://monitoring.myapp.com'],
    'connect-src': ['https://monitoring.myapp.com']
  }
});

// app.ts
import { generateCSP } from '@csp-kit/generator';
import { GoogleAnalytics4, Stripe } from '@csp-kit/data';
import { MyCDN, MyAPI, MyMonitoring } from './services';

const csp = generateCSP({
  services: [
    // External services
    GoogleAnalytics4,
    Stripe,
    
    // Your custom services
    MyCDN,
    MyAPI,
    MyMonitoring
  ],
  nonce: true,
  environment: process.env.NODE_ENV
});
```

### Option 3: Service Factory Pattern (For Dynamic Needs)
```typescript
// When you need dynamic configuration
import { createService } from '@csp-kit/generator';

// Factory function for multi-region CDN
export const createRegionalCDN = (region: 'us' | 'eu' | 'asia') => 
  createService({
    id: `cdn-${region}`,
    name: `CDN ${region.toUpperCase()}`,
    category: 'cdn',
    directives: {
      'img-src': [`https://cdn-${region}.myapp.com`],
      'font-src': [`https://cdn-${region}.myapp.com`]
    }
  });

// Usage
const csp = generateCSP({
  services: [
    GoogleAnalytics4,
    createRegionalCDN('us'), // Based on user's region
    createRegionalCDN('eu')  // Or load multiple regions
  ]
});
```

### Option 4: Environment-Aware Services
```typescript
// services/development.ts
export const DevTools = defineService({
  id: 'dev-tools',
  name: 'Development Tools',
  category: 'development',
  directives: {
    'script-src': [
      'http://localhost:3000', // Vite/Webpack dev server
      "'unsafe-eval'"          // For hot reload
    ],
    'connect-src': [
      'ws://localhost:3000',   // Hot reload websocket
      'http://localhost:3001'  // API dev server
    ]
  }
});

// Usage
const csp = generateCSP({
  services: [
    GoogleAnalytics4,
    Stripe,
    ...(process.env.NODE_ENV === 'development' ? [DevTools] : [])
  ]
});
```

## Why This is Better

### 1. **Consistency**
Everything is a service - no special cases for "additional domains"

### 2. **Reusability**
```typescript
// Define once
export const CompanyAssets = defineService({
  id: 'company-assets',
  name: 'Company Assets',
  directives: {
    'img-src': ['https://assets.company.com'],
    'font-src': ['https://assets.company.com'],
    'style-src': ['https://assets.company.com']
  }
});

// Use everywhere
const webAppCSP = generateCSP({ services: [GA4, CompanyAssets] });
const mobileAppCSP = generateCSP({ services: [CompanyAssets] });
const landingPageCSP = generateCSP({ services: [GA4, Stripe, CompanyAssets] });
```

### 3. **Type Safety**
```typescript
// The defineService function ensures type safety
const BadService = defineService({
  id: 'bad',
  name: 'Bad Service',
  directives: {
    'invalid-src': ['...'] // TypeScript error!
  }
});
```

### 4. **Documentation**
```typescript
export const MyVideoStreaming = defineService({
  id: 'video-streaming',
  name: 'Video Streaming Service',
  category: 'video',
  description: 'Our custom video streaming infrastructure',
  website: 'https://docs.internal/video-streaming',
  directives: {
    'media-src': ['https://video.myapp.com'],
    'img-src': ['https://thumbnails.myapp.com']
  },
  notes: 'Requires authentication token in query params'
});
```

### 5. **Composition**
```typescript
// Combine multiple custom services into presets
export const MyAppPreset = {
  core: [MyCDN, MyAPI],
  monitoring: [MyMonitoring, ErrorTracking],
  thirdParty: [GoogleAnalytics4, Stripe]
};

// Usage
const csp = generateCSP({
  services: [
    ...MyAppPreset.core,
    ...MyAppPreset.monitoring,
    ...MyAppPreset.thirdParty
  ]
});
```

## Service Definition Helpers

```typescript
// Common patterns as helpers
import { cdn, api, analytics } from '@csp-kit/helpers';

// Shorthand for common patterns
export const MyCDN = cdn('https://cdn.myapp.com');
// Equivalent to:
// defineService({
//   id: 'cdn-myapp-com',
//   category: 'cdn',
//   directives: {
//     'img-src': ['https://cdn.myapp.com'],
//     'font-src': ['https://cdn.myapp.com'],
//     'style-src': ['https://cdn.myapp.com'],
//     'script-src': ['https://cdn.myapp.com']
//   }
// })

export const MyAPI = api('https://api.myapp.com', {
  websocket: 'wss://realtime.myapp.com'
});

export const MyAnalytics = analytics('https://analytics.myapp.com');
```

## Complete Example

```typescript
// services/index.ts - Your app's CSP service definitions
import { defineService, cdn, api } from '@csp-kit/generator';

// Simple CDN
export const AssetsCDN = cdn('https://assets.myapp.com');

// API with WebSocket
export const MainAPI = api('https://api.myapp.com', {
  websocket: 'wss://realtime.myapp.com'
});

// Complex service with full control
export const VideoService = defineService({
  id: 'video-service',
  name: 'Video Streaming',
  category: 'video',
  directives: {
    'media-src': [
      'https://video.myapp.com',
      'blob:' // For blob URLs in video player
    ],
    'img-src': ['https://thumbnails.myapp.com'],
    'connect-src': ['https://video-api.myapp.com']
  },
  configure: (options: { hdEnabled?: boolean }) => ({
    directives: {
      'media-src': options.hdEnabled 
        ? ['https://video-hd.myapp.com']
        : ['https://video.myapp.com']
    }
  })
});

// app.ts
import { generateCSP } from '@csp-kit/generator';
import { GoogleAnalytics4, Stripe } from '@csp-kit/data';
import { AssetsCDN, MainAPI, VideoService } from './services';

export const csp = generateCSP({
  services: [
    // Your services
    AssetsCDN,
    MainAPI,
    VideoService.configure({ hdEnabled: true }),
    
    // Third-party services
    GoogleAnalytics4,
    Stripe
  ],
  nonce: true,
  reportUri: '/csp-violations'
});
```

This approach makes custom services feel natural and consistent with the built-in ones, while providing maximum flexibility and reusability.