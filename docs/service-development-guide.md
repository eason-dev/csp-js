# Service Development Guide

A comprehensive guide for developing TypeScript service definitions for CSP Kit. This guide covers everything from research to testing.

## Table of Contents

1. [Overview](#overview)
2. [Service Research](#service-research)
3. [Development Workflow](#development-workflow)
4. [Testing Services](#testing-services)
5. [Common Patterns](#common-patterns)
6. [Troubleshooting](#troubleshooting)
7. [Best Practices](#best-practices)

## Overview

Services in CSP Kit are TypeScript modules that define the Content Security Policy requirements for third-party services. Each service exports a configuration object that the generator uses to build CSP headers.

### What Makes a Good Service Definition?

- **Accurate**: Contains all necessary domains and directives
- **Minimal**: Only includes what's actually required
- **Documented**: Has clear notes about special requirements
- **Tested**: Verified against real implementations
- **Maintained**: Updated when services change

## Service Research

### Step 1: Gather Information

Before writing code, research the service thoroughly:

#### Official Documentation

Look for CSP-specific documentation:

```bash
# Search terms to use:
- "Content Security Policy"
- "CSP requirements"
- "security headers"
- "domain whitelist"
- "allowed origins"
```

Example sources:
- Google Analytics: https://developers.google.com/tag-platform/security/guides/csp
- Stripe: https://stripe.com/docs/security/guide#content-security-policy
- Intercom: https://www.intercom.com/help/en/articles/3894-using-intercom-with-content-security-policy

#### Network Analysis

Use browser DevTools to analyze actual network requests:

1. **Create a test page** with the service integration:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Service Test Page</title>
  <!-- Add service integration code here -->
</head>
<body>
  <h1>Testing Service CSP Requirements</h1>
</body>
</html>
```

2. **Open DevTools** → Network tab
3. **Filter by domain** to see all requests
4. **Note all unique domains** and their purposes

#### CSP Testing

Test with restrictive CSP to find requirements:

```html
<!-- Start with very restrictive CSP -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self'">

<!-- Add service code and see what breaks -->
<!-- Check console for CSP violations -->
```

### Step 2: Document Your Findings

Create a research document:

```markdown
# Service: [Service Name]

## Domains Used
- `https://cdn.service.com` - Main JavaScript library
- `https://api.service.com` - API endpoints
- `https://assets.service.com` - Images and static assets
- `wss://realtime.service.com` - WebSocket connections

## CSP Requirements
- `script-src`: https://cdn.service.com
- `connect-src`: https://api.service.com, wss://realtime.service.com
- `img-src`: https://assets.service.com

## Special Requirements
- Requires 'unsafe-inline' for styles (try to avoid if possible)
- Uses dynamic script injection
- Needs frame-src for embedded widgets

## Test URLs
- Demo page: https://service.com/demo
- Documentation: https://docs.service.com/integrate
```

## Development Workflow

### Step 1: Create Service File

Navigate to the appropriate category:

```bash
cd packages/data/src/services/analytics/  # or appropriate category
```

Create your service file:

```typescript
// new-analytics-service.ts
import { defineService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

export const NewAnalyticsService = defineService({
  // Service identity
  id: 'new-analytics-service',
  name: 'New Analytics Service',
  category: ServiceCategory.ANALYTICS,
  
  // Description and documentation
  description: 'Advanced analytics platform for tracking user behavior and conversions',
  website: 'https://newanalytics.com',
  
  // CSP directives based on research
  directives: {
    'script-src': ['https://cdn.newanalytics.com'],
    'connect-src': [
      'https://api.newanalytics.com',
      'https://collect.newanalytics.com'
    ],
    'img-src': ['https://pixel.newanalytics.com']
  },
  
  // Documentation
  officialDocs: [
    'https://docs.newanalytics.com/security/csp',
    'https://help.newanalytics.com/integrate'
  ],
  
  // Implementation notes
  notes: 'Requires script-src for tracking library. The collect endpoint is for event data. Pixel endpoint is used for conversion tracking.',
  
  // Optional: Aliases for easier discovery
  aliases: ['new-analytics', 'na'],
  
  // Optional: Special requirements
  requiresDynamic: true, // If service injects scripts dynamically
  
  // Timestamps
  lastUpdated: new Date().toISOString(),
  verifiedAt: new Date().toISOString()
});
```

### Step 2: Add to Category Index

Export your service from the category index:

```typescript
// services/analytics/index.ts
export * from './google-analytics.js';
export * from './amplitude.js';
export * from './new-analytics-service.js'; // Add this line
```

### Step 3: Create Tests

Create a test file for your service:

```typescript
// services/analytics/__tests__/new-analytics-service.test.ts
import { describe, it, expect } from 'vitest';
import { NewAnalyticsService } from '../new-analytics-service.js';
import { validateService } from '../../../test-utils.js';

describe('NewAnalyticsService', () => {
  it('should have valid structure', () => {
    expect(validateService(NewAnalyticsService)).toBe(true);
  });
  
  it('should have correct ID and name', () => {
    expect(NewAnalyticsService.id).toBe('new-analytics-service');
    expect(NewAnalyticsService.name).toBe('New Analytics Service');
  });
  
  it('should include all required domains', () => {
    const { directives } = NewAnalyticsService;
    
    expect(directives['script-src']).toContain('https://cdn.newanalytics.com');
    expect(directives['connect-src']).toContain('https://api.newanalytics.com');
    expect(directives['connect-src']).toContain('https://collect.newanalytics.com');
    expect(directives['img-src']).toContain('https://pixel.newanalytics.com');
  });
  
  it('should have valid URLs', () => {
    const allUrls = Object.values(NewAnalyticsService.directives).flat();
    
    allUrls.forEach(url => {
      expect(url).toMatch(/^https?:\/\/.+/);
    });
  });
  
  it('should have proper documentation', () => {
    expect(NewAnalyticsService.website).toBeTruthy();
    expect(NewAnalyticsService.description).toBeTruthy();
    expect(NewAnalyticsService.officialDocs).toHaveLength(2);
  });
});
```

### Step 4: Integration Testing

Test your service with the actual generator:

```typescript
// test-integration.ts
import { generateCSP } from '@csp-kit/generator';
import { NewAnalyticsService } from './packages/data/src/services/analytics/new-analytics-service.js';

// Test basic generation
const result = generateCSP({
  services: [NewAnalyticsService]
});

console.log('Generated CSP:', result.header);
console.log('Included services:', result.includedServices);
console.log('Warnings:', result.warnings);

// Test with other services
const multiResult = generateCSP({
  services: [NewAnalyticsService, GoogleAnalytics, Stripe]
});

console.log('Multi-service CSP:', multiResult.header);

// Test with nonce
const nonceResult = generateCSP({
  services: [NewAnalyticsService],
  nonce: true
});

console.log('With nonce:', nonceResult.header);
```

## Testing Services

### Unit Tests

Every service should have comprehensive unit tests:

```typescript
describe('Service Tests', () => {
  // Structure validation
  it('should have all required fields', () => {
    expect(Service.id).toBeDefined();
    expect(Service.name).toBeDefined();
    expect(Service.category).toBeDefined();
    expect(Service.directives).toBeDefined();
  });
  
  // ID format
  it('should have kebab-case ID', () => {
    expect(Service.id).toMatch(/^[a-z]+(-[a-z]+)*$/);
  });
  
  // URL validation
  it('should have valid HTTPS URLs', () => {
    Object.values(Service.directives).flat().forEach(url => {
      if (!url.startsWith("'")) { // Skip CSP keywords
        expect(url).toMatch(/^https:\/\//);
      }
    });
  });
  
  // No duplicates
  it('should not have duplicate URLs in directives', () => {
    Object.entries(Service.directives).forEach(([directive, urls]) => {
      const unique = new Set(urls);
      expect(urls.length).toBe(unique.size);
    });
  });
});
```

### Manual Testing

Create a real-world test page:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>CSP Test - New Analytics Service</title>
  
  <!-- Apply generated CSP -->
  <meta http-equiv="Content-Security-Policy" content="script-src 'self' https://cdn.newanalytics.com; connect-src 'self' https://api.newanalytics.com https://collect.newanalytics.com; img-src 'self' https://pixel.newanalytics.com">
  
  <!-- Service integration code -->
  <script src="https://cdn.newanalytics.com/analytics.js"></script>
  <script>
    NewAnalytics.init('YOUR_API_KEY');
    NewAnalytics.track('page_view');
  </script>
</head>
<body>
  <h1>Testing New Analytics Service CSP</h1>
  <p>Check console for CSP violations</p>
  
  <button onclick="NewAnalytics.track('button_click')">
    Test Event Tracking
  </button>
</body>
</html>
```

### Automated Validation

Use the CLI tools to validate:

```bash
# Build the package
pnpm build --filter @csp-kit/data

# Run validation
pnpm validate-services

# Test specific service
pnpm test new-analytics-service
```

## Common Patterns

### Analytics Services

Common requirements for analytics services:

```typescript
export const AnalyticsPattern = defineService({
  id: 'analytics-pattern',
  name: 'Analytics Pattern',
  category: ServiceCategory.ANALYTICS,
  directives: {
    'script-src': [
      'https://cdn.analytics.com'      // Main tracking library
    ],
    'connect-src': [
      'https://api.analytics.com',     // Event collection
      'https://collect.analytics.com'  // Beacon API
    ],
    'img-src': [
      'https://pixel.analytics.com'    // Tracking pixels
    ]
  },
  requiresDynamic: true // Most analytics inject scripts
});
```

### Payment Services

Common requirements for payment processors:

```typescript
export const PaymentPattern = defineService({
  id: 'payment-pattern',
  name: 'Payment Pattern',
  category: ServiceCategory.PAYMENT,
  directives: {
    'script-src': [
      'https://js.payment.com'         // Payment SDK
    ],
    'frame-src': [
      'https://checkout.payment.com',  // Embedded checkout
      'https://3ds.payment.com'        // 3D Secure
    ],
    'connect-src': [
      'https://api.payment.com'        // API calls
    ],
    'img-src': [
      'https://assets.payment.com'     // Card brand logos
    ]
  },
  notes: 'frame-src required for embedded checkout and 3D Secure authentication'
});
```

### Chat/Support Services

Common requirements for chat widgets:

```typescript
export const ChatPattern = defineService({
  id: 'chat-pattern',
  name: 'Chat Pattern',
  category: ServiceCategory.CHAT,
  directives: {
    'script-src': [
      'https://widget.chat.com'        // Chat widget loader
    ],
    'frame-src': [
      'https://widget.chat.com',       // Chat iframe
      'https://app.chat.com'           // Full chat interface
    ],
    'connect-src': [
      'https://api.chat.com',          // REST API
      'wss://realtime.chat.com'        // WebSocket for real-time
    ],
    'img-src': [
      'https://static.chat.com',       // Avatars
      'https://uploads.chat.com'       // User uploads
    ],
    'media-src': [
      'https://media.chat.com'         // Voice/video calls
    ]
  }
});
```

### CDN Services

Common requirements for CDNs:

```typescript
export const CDNPattern = defineService({
  id: 'cdn-pattern',
  name: 'CDN Pattern',
  category: ServiceCategory.CDN,
  directives: {
    'script-src': ['https://cdn.example.com'],
    'style-src': ['https://cdn.example.com'],
    'img-src': ['https://cdn.example.com'],
    'font-src': ['https://cdn.example.com'],
    'media-src': ['https://cdn.example.com']
  },
  notes: 'General-purpose CDN serving multiple content types'
});
```

## Troubleshooting

### Common Issues

#### 1. Service Not Working

**Symptom**: Integration broken despite CSP rules
**Solution**: Check for:
- Missing domains (check ALL network requests)
- Dynamic script injection requiring 'strict-dynamic'
- Inline scripts/styles needing nonce
- WebSocket connections (wss://)

#### 2. Too Many Warnings

**Symptom**: Validation warnings about wildcards
**Solution**: 
- Be more specific with domains
- List known subdomains explicitly
- Only use wildcards when absolutely necessary

#### 3. Conflicting Services

**Symptom**: Services interfere with each other
**Solution**: Add conflict detection:

```typescript
export const ServiceA = defineService({
  id: 'service-a',
  // ... other fields
  conflicts: ['service-b'] // Cannot be used with service-b
});
```

#### 4. Dynamic Requirements

**Symptom**: Service works differently in different contexts
**Solution**: Document variations:

```typescript
export const DynamicService = defineService({
  id: 'dynamic-service',
  // ... other fields
  notes: 'Basic integration requires script-src only. If using advanced features (video calls), also needs media-src and additional connect-src endpoints.',
  validate: (directives) => {
    const warnings = [];
    if (!directives['media-src']?.includes('https://media.service.com')) {
      warnings.push('Video features require media-src for https://media.service.com');
    }
    return { warnings };
  }
});
```

## Best Practices

### 1. Research Thoroughly

- Always check official documentation first
- Test with real implementation
- Monitor for service updates
- Document edge cases

### 2. Be Conservative

- Only include domains you've verified
- Start minimal, add as needed
- Prefer specific domains over wildcards
- Document why each domain is needed

### 3. Maintain Quality

- Write comprehensive tests
- Update timestamps when verifying
- Add helpful notes for users
- Keep descriptions concise but clear

### 4. Consider Security

- Never include 'unsafe-inline' unless absolutely required
- Document security implications
- Suggest alternatives when possible
- Warn about risky configurations

### 5. Think About Users

- Use clear, recognizable names
- Add helpful aliases
- Write descriptive notes
- Include migration guidance for deprecated services

## Service Lifecycle

### 1. Initial Development

- Research requirements
- Create service definition
- Write tests
- Submit PR

### 2. Review Process

- Automated validation
- Manual testing
- Security review
- Documentation check

### 3. Maintenance

- Monitor for changes
- Update when needed
- Handle deprecations
- Respond to issues

### 4. Deprecation

When a service is no longer needed:

```typescript
export const DeprecatedService = defineService({
  id: 'deprecated-service',
  name: 'Deprecated Service',
  // ... other fields
  deprecated: {
    since: '2025-01-01',
    message: 'This service has shut down',
    alternative: 'new-service' // Suggest replacement
  }
});
```

## Contributing Your Service

### 1. Fork and Clone

```bash
git clone https://github.com/yourusername/csp-kit.git
cd csp-kit
pnpm install
```

### 2. Create Feature Branch

```bash
git checkout -b add-new-analytics-service
```

### 3. Develop and Test

```bash
# Build
pnpm build --filter @csp-kit/data

# Test
pnpm test --filter @csp-kit/data

# Manual test
pnpm tsx test-integration.ts
```

### 4. Submit PR

```bash
git add .
git commit -m "feat(data): add NewAnalyticsService definition"
git push origin add-new-analytics-service
```

Include in your PR:
- Service definition file
- Tests
- Export from category index
- Evidence of testing (screenshots, test URLs)
- Any special notes for reviewers

## Resources

- [Service Definition Schema](./SERVICE_DEFINITION_GUIDE.md)
- [TypeScript API Reference](./api-reference.md)
- [Contributing Guide](./contributing.md)
- [CSP MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

---

Thank you for contributing to CSP Kit! Your service definitions help developers implement security best practices more easily. 🚀