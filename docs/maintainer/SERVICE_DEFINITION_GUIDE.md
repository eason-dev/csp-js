# Service Definition Guide

This guide explains how to create and maintain service definitions for CSP Kit. Service definitions are now TypeScript modules that provide type-safe, tree-shakeable CSP configurations.

## Table of Contents

- [Overview](#overview)
- [Service Definition Structure](#service-definition-structure)
- [Creating a New Service](#creating-a-new-service)
- [CSP Directives](#csp-directives)
- [Advanced Features](#advanced-features)
- [Validation and Testing](#validation-and-testing)
- [Best Practices](#best-practices)
- [Migration from JSONC](#migration-from-jsonc)

## Overview

### What is a Service Definition?

A service definition is a TypeScript module that exports a `CSPService` object containing:

- **Service Identity**: Unique ID, name, and category
- **CSP Requirements**: Required CSP directives for the service
- **Metadata**: Description, documentation links, and notes
- **Advanced Features**: Validation, deprecation warnings, and conflicts

### File Structure

```
packages/data/src/services/
├── analytics/
│   ├── google-analytics.ts
│   ├── amplitude.ts
│   └── index.ts
├── payment/
│   ├── stripe.ts
│   ├── paypal.ts
│   └── index.ts
└── index.ts
```

Each service is a TypeScript file that exports a service definition using the `defineService` function.

## Service Definition Structure

### Complete Example

```typescript
import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const GoogleAnalytics = defineService({
  // Required: Service Identity
  id: 'google-analytics',
  name: 'Google Analytics 4',
  category: ServiceCategory.ANALYTICS,

  // Required: Description and Documentation
  description: 'Web analytics service that tracks and reports website traffic and user behavior',
  website: 'https://analytics.google.com/',

  // Required: CSP Directives
  directives: {
    'script-src': ['https://*.googletagmanager.com'],
    'img-src': [
      'https://*.google-analytics.com',
      'https://*.googletagmanager.com',
      'https://*.g.doubleclick.net',
      'https://*.google.com',
      'https://*.google.<TLD>',
    ],
    'connect-src': [
      'https://*.google-analytics.com',
      'https://*.analytics.google.com',
      'https://*.googletagmanager.com',
      'https://*.g.doubleclick.net',
      'https://*.google.com',
      'https://*.google.<TLD>',
      'https://pagead2.googlesyndication.com',
    ],
    'frame-src': ['https://td.doubleclick.net', 'https://www.googletagmanager.com'],
  },

  // Optional: Additional Metadata
  officialDocs: [
    'https://developers.google.com/tag-platform/security/guides/csp',
    'https://developers.google.com/analytics/devguides/collection/ga4',
    'https://www.google.com/supported_domains',
  ],
  notes:
    'For Google Signals (cross-device tracking), use the extended CSP configuration. Each Google top-level domain (TLD) must be specified individually in CSP. See https://www.google.com/supported_domains for complete list of Google TLDs.',
  aliases: ['ga4', 'gtag', 'google-gtag'],

  // Optional: Behavior Flags
  requiresDynamic: true,

  // Optional: Metadata
  lastUpdated: '2024-06-28T00:00:00.000Z',
  verifiedAt: '2025-07-03T00:00:00.000Z',
});
```

### Required Fields

| Field         | Type              | Description                            |
| ------------- | ----------------- | -------------------------------------- |
| `id`          | `string`          | Unique kebab-case identifier           |
| `name`        | `string`          | Human-readable service name            |
| `category`    | `ServiceCategory` | Service category enum value            |
| `description` | `string`          | Brief description (50-150 characters)  |
| `website`     | `string`          | Official service website URL           |
| `directives`  | `CSPDirectives`   | CSP directives required by the service |

### Optional Fields

| Field             | Type                               | Description                               |
| ----------------- | ---------------------------------- | ----------------------------------------- |
| `officialDocs`    | `string[]`                         | Links to official CSP documentation       |
| `notes`           | `string`                           | Implementation notes and requirements     |
| `aliases`         | `string[]`                         | Alternative service identifiers           |
| `requiresDynamic` | `boolean`                          | Service injects scripts dynamically       |
| `requiresNonce`   | `boolean`                          | Service requires nonce for inline scripts |
| `deprecated`      | `DeprecationInfo`                  | Deprecation information                   |
| `conflicts`       | `string[]`                         | IDs of conflicting services               |
| `validate`        | `(directives) => ValidationResult` | Custom validation function                |
| `lastUpdated`     | `string`                           | ISO timestamp of last update              |
| `verifiedAt`      | `string`                           | ISO timestamp when CSP was last verified  |

## Creating a New Service

### Step 1: Choose the Right Category

Create your service file in the appropriate category folder:

```typescript
// packages/data/src/services/analytics/new-analytics.ts
import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const NewAnalytics = defineService({
  id: 'new-analytics',
  name: 'New Analytics Service',
  category: ServiceCategory.ANALYTICS,
  // ... rest of definition
});
```

### Step 2: Research CSP Requirements

1. **Check Official Documentation**: Look for CSP guides in the service's docs
2. **Test Implementation**: Create a test page and monitor network requests
3. **Use Browser DevTools**: Identify all domains the service connects to
4. **Verify with CSP**: Test your CSP rules with the actual service

```bash
# Test your service definition
pnpm test -- new-analytics

# Validate against a live site
pnpm csp-cli check new-analytics --url https://example.com
```

### Step 3: Export from Category Index

Add your service to the category's index file:

```typescript
// packages/data/src/services/analytics/index.ts
export * from './google-analytics.js';
export * from './amplitude.js';
export * from './new-analytics.js'; // Add your service
```

## CSP Directives

### Supported Directives

```typescript
interface CSPDirectives {
  'script-src'?: string[]; // JavaScript sources
  'style-src'?: string[]; // CSS sources
  'img-src'?: string[]; // Image sources
  'connect-src'?: string[]; // Fetch/XHR/WebSocket sources
  'frame-src'?: string[]; // Frame/iframe sources
  'font-src'?: string[]; // Font sources
  'media-src'?: string[]; // Audio/video sources
  'object-src'?: string[]; // Plugin sources
  'worker-src'?: string[]; // Web workers
  'child-src'?: string[]; // Workers and frames
  'manifest-src'?: string[]; // Web app manifests
  'form-action'?: string[]; // Form submission targets
  'frame-ancestors'?: string[]; // Who can frame this site
  'base-uri'?: string[]; // Base tag restrictions
}
```

### CSP Source Guidelines

**Be Specific**:

```typescript
// ✅ Good - Specific domains
directives: {
  'script-src': ['https://cdn.service.com'],
  'connect-src': ['https://api.service.com']
}

// ❌ Avoid - Too broad
directives: {
  'script-src': ['https://*.com']
}
```

**Use Wildcards Carefully**:

```typescript
// ✅ Acceptable - Necessary for multi-subdomain services
directives: {
  'img-src': ['https://*.googletagmanager.com']
}

// ✅ Better - List known subdomains when possible
directives: {
  'img-src': [
    'https://www.googletagmanager.com',
    'https://tagmanager.google.com'
  ]
}
```

**Special Values**:

- `'self'` - Automatically added by generator
- `'unsafe-inline'` - Avoid! Use nonce instead
- `'unsafe-eval'` - Avoid! Security risk
- `data:` - Data URLs (use sparingly)
- `blob:` - Blob URLs (for generated content)

## Advanced Features

### Service Validation

Add custom validation logic to warn about misconfigurations:

```typescript
export const ServiceWithValidation = defineService({
  id: 'validated-service',
  name: 'Validated Service',
  category: ServiceCategory.ANALYTICS,
  directives: {
    'script-src': ['https://analytics.service.com'],
    'connect-src': ['https://api.service.com'],
  },

  // Custom validation
  validate: directives => {
    const warnings: string[] = [];
    const errors: string[] = [];

    // Check for wildcards
    const scriptSrc = directives['script-src'] || [];
    if (scriptSrc.some(src => src.includes('*'))) {
      warnings.push('script-src contains wildcards which may be overly permissive');
    }

    // Check for required directive
    if (!directives['connect-src']) {
      errors.push('connect-src is required for analytics tracking');
    }

    return { warnings, errors };
  },
});
```

### Deprecation Warnings

Mark services as deprecated with migration guidance:

```typescript
export const OldService = defineService({
  id: 'old-service',
  name: 'Old Service (Deprecated)',
  category: ServiceCategory.ANALYTICS,
  directives: {
    'script-src': ['https://old.service.com'],
  },

  deprecated: {
    since: '2024-01-01',
    message: 'Old Service has been replaced by New Service',
    alternative: 'new-service',
  },
});
```

### Service Conflicts

Prevent incompatible services from being used together:

```typescript
export const ServiceA = defineService({
  id: 'service-a',
  name: 'Service A',
  category: ServiceCategory.ANALYTICS,
  directives: {
    'script-src': ['https://a.service.com'],
  },
  conflicts: ['service-b'], // Cannot be used with service-b
});
```

### Configurable Services

For services that need runtime configuration:

```typescript
import { createConfigurableService } from '../../service-types.js';

export const StripeConfigurable = createConfigurableService({
  id: 'stripe-configurable',
  name: 'Stripe (Configurable)',
  category: ServiceCategory.PAYMENT,

  // Base configuration
  directives: {
    'script-src': ['https://js.stripe.com'],
    'frame-src': ['https://js.stripe.com'],
  },

  // Configuration function
  configure: (options: { checkout?: boolean; elements?: boolean; paymentRequest?: boolean }) => {
    const directives: CSPDirectives = {};

    if (options.checkout) {
      directives['frame-src'] = ['https://checkout.stripe.com'];
    }

    if (options.paymentRequest) {
      directives['connect-src'] = ['https://api.stripe.com'];
    }

    return { directives };
  },
});
```

## Validation and Testing

### Automated Testing

Every service should have a corresponding test:

```typescript
// packages/data/src/services/analytics/__tests__/new-analytics.test.ts
import { describe, it, expect } from 'vitest';
import { NewAnalytics } from '../new-analytics.js';
import { validateService } from '../../../test-utils.js';

describe('NewAnalytics', () => {
  it('should have valid structure', () => {
    expect(validateService(NewAnalytics)).toBe(true);
  });

  it('should have required directives', () => {
    expect(NewAnalytics.directives['script-src']).toBeDefined();
    expect(NewAnalytics.directives['connect-src']).toBeDefined();
  });

  it('should have valid URLs', () => {
    const scriptSrcs = NewAnalytics.directives['script-src'] || [];
    scriptSrcs.forEach(src => {
      expect(src).toMatch(/^https:\/\//);
    });
  });
});
```

### Manual Testing

Test your service definition with a real implementation:

```typescript
// test-implementation.ts
import { generateCSP } from '@csp-kit/generator';
import { NewAnalytics } from '@csp-kit/data';

const result = generateCSP({
  services: [NewAnalytics],
  nonce: true,
});

console.log('CSP Header:', result.header);
console.log('Warnings:', result.warnings);

// Test with actual HTML
const testHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Security-Policy" content="${result.header}">
  <!-- Add service integration code here -->
</head>
<body>
  <h1>CSP Test Page</h1>
</body>
</html>
`;
```

## Best Practices

### Code Quality

1. **Type Safety**: Always use TypeScript and proper types
2. **Consistent Naming**: Use PascalCase for exports, kebab-case for IDs
3. **Clear Documentation**: Add helpful notes and official links
4. **Comprehensive Testing**: Test with real service implementations

### Performance

1. **Tree-Shaking**: Services are individually importable
2. **Bundle Size**: Keep descriptions concise
3. **No Dynamic Imports**: All services are statically analyzable

### Security

1. **Minimal Permissions**: Only include necessary domains
2. **Avoid Wildcards**: Be as specific as possible
3. **No Unsafe Directives**: Avoid 'unsafe-inline' and 'unsafe-eval'
4. **Regular Updates**: Keep CSP rules current with service changes

### Documentation

```typescript
export const WellDocumentedService = defineService({
  id: 'well-documented',
  name: 'Well Documented Service',
  category: ServiceCategory.ANALYTICS,

  // Clear, concise description
  description: 'Analytics service for tracking user interactions and conversions',

  // Link to official site
  website: 'https://welldocumented.com',

  // CSP-specific documentation
  officialDocs: [
    'https://docs.welldocumented.com/security/csp',
    'https://help.welldocumented.com/integrate/content-security-policy',
  ],

  // Implementation notes
  notes:
    'Requires nonce for inline tracking scripts. For e-commerce tracking, additional domains may be needed. See official docs for advanced configuration.',

  // All CSP requirements
  directives: {
    'script-src': ['https://cdn.welldocumented.com'],
    'connect-src': ['https://api.welldocumented.com'],
    'img-src': ['https://pixel.welldocumented.com'],
  },
});
```

## Migration from JSONC

If you're migrating from the old JSONC format:

1. **Create TypeScript File**: Convert `.jsonc` to `.ts`
2. **Use defineService**: Wrap definition in `defineService()`
3. **Update Imports**: Use proper TypeScript imports
4. **Fix Property Names**: `cspDirectives` → `directives`
5. **Add to Exports**: Export from category index

```typescript
// Before: google-analytics.jsonc
{
  "id": "google-analytics",
  "name": "Google Analytics 4",
  "cspDirectives": {
    "script-src": ["https://www.googletagmanager.com"]
  }
}

// After: google-analytics.ts
import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const GoogleAnalytics = defineService({
  id: 'google-analytics',
  name: 'Google Analytics 4',
  category: ServiceCategory.ANALYTICS,
  directives: {
    'script-src': ['https://www.googletagmanager.com']
  },
  // ... additional required fields
});
```

## Tools and Commands

### CLI Tools

```bash
# Validate all services
pnpm validate

# Test a specific service
pnpm test google-analytics

# Check service against live site
pnpm csp-cli check google-analytics --url https://example.com

# Generate CSP for testing
pnpm csp-cli generate google-analytics stripe --output header
```

### Development Workflow

1. Create service definition in appropriate category
2. Add comprehensive test coverage
3. Export from category index
4. Run validation and tests
5. Test with real implementation
6. Submit PR with evidence of testing

---

_Last Updated: 2025-07-12_
