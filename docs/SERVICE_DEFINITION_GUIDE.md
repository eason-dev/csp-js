# Service Definition Guide

This guide explains how to create and maintain service definitions for CSP-JS. Service definitions are the core data that powers CSP generation for popular web services.

## Table of Contents

- [Overview](#overview)
- [Service Definition Structure](#service-definition-structure)
- [Version Management](#version-management)
- [CSP Directives](#csp-directives)
- [Monitoring Configuration](#monitoring-configuration)
- [Validation Process](#validation-process)
- [Best Practices](#best-practices)

## Overview

### What is a Service Definition?

A service definition is a JSON document that describes:

- **Service Identity**: Name, description, category
- **CSP Requirements**: Required CSP directives for each version
- **Version History**: Different implementations over time
- **Monitoring Setup**: Automated checking configuration
- **Documentation**: Official links and implementation notes

### File Structure

```
packages/csp-data/data/services/
├── google-analytics.jsonc
├── microsoft-clarity.jsonc
├── stripe.jsonc
└── ...
```

Each service has its own `.jsonc` file (JSON with comments) containing the complete service definition.

## Service Definition Structure

### Complete Example

```typescript
{
  // Basic Service Information
  "id": "google-analytics",
  "name": "Google Analytics 4",
  "category": "analytics",
  "description": "Web analytics service that tracks and reports website traffic",
  "website": "https://analytics.google.com/",
  "officialDocs": [
    "https://developers.google.com/tag-platform/security/guides/csp",
    "https://content-security-policy.com/examples/google-analytics/"
  ],

  // Version Management
  "versions": {
    "4.0.0": {
      "csp": {
        "script-src": [
          "https://www.googletagmanager.com",
          "https://www.google-analytics.com",
          "https://ssl.google-analytics.com"
        ],
        "img-src": [
          "https://www.google-analytics.com",
          "https://www.googletagmanager.com"
        ],
        "connect-src": [
          "https://www.google-analytics.com",
          "https://analytics.google.com",
          "https://stats.g.doubleclick.net"
        ]
      },
      "validFrom": "2023-01-01",
      "notes": [
        "Standard GA4 implementation with gtag.js",
        "For Google Signals, additional domains may be required"
      ],
      "requiresDynamic": true,
      "requiresNonce": false
    },
    "4.1.0": {
      "csp": {
        "script-src": [
          "https://www.googletagmanager.com",
          "https://www.google-analytics.com",
          "https://ssl.google-analytics.com"
        ],
        "img-src": [
          "https://www.google-analytics.com",
          "https://www.googletagmanager.com"
        ],
        "connect-src": [
          "https://www.google-analytics.com",
          "https://analytics.google.com",
          "https://stats.g.doubleclick.net",
          "https://region1.google-analytics.com"
        ]
      },
      "validFrom": "2024-01-15",
      "notes": [
        "Added regional analytics endpoint support",
        "Enhanced data collection capabilities"
      ],
      "breaking": false,
      "requiresDynamic": true,
      "requiresNonce": false
    }
  },
  "defaultVersion": "4.1.0",
  "aliases": ["ga4", "gtag", "google-gtag"],
  "lastUpdated": "2024-06-28T00:00:00.000Z",

  // Monitoring Configuration
  "monitoring": {
    "testUrls": [
      "https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"
    ],
    "checkInterval": "weekly",
    "alertOnBreaking": true,
    "lastChecked": "2024-06-28T00:00:00.000Z",
    "notes": [
      "Monitor for new regional endpoints and gtag.js updates"
    ]
  }
}
```

### Required Fields

| Field            | Type     | Description                             |
| ---------------- | -------- | --------------------------------------- |
| `id`             | string   | Unique kebab-case identifier            |
| `name`           | string   | Human-readable service name             |
| `category`       | string   | Service category (see categories below) |
| `description`    | string   | Brief description (50-150 characters)   |
| `website`        | string   | Official service website URL            |
| `officialDocs`   | string[] | Links to official CSP documentation     |
| `versions`       | object   | Version-specific configurations         |
| `defaultVersion` | string   | Default version to use                  |
| `lastUpdated`    | string   | ISO timestamp of last update            |

### Optional Fields

| Field        | Type     | Description                        |
| ------------ | -------- | ---------------------------------- |
| `aliases`    | string[] | Alternative service identifiers    |
| `monitoring` | object   | Automated monitoring configuration |

## Version Management

### Version Numbering

**Semantic Versioning** (Recommended for library integrations):

```
1.0.0 - Initial implementation
1.1.0 - New optional features/domains
2.0.0 - Breaking changes
```

**Date-based Versioning** (For infrastructure changes):

```
2024-01-15 - Service update on specific date
2024-06-01 - Major infrastructure change
```

### Version Object Structure

```typescript
interface ServiceVersion {
  csp: CSPDirectives; // Required CSP rules
  validFrom: string; // Date when version became valid
  deprecatedFrom?: string; // When version was deprecated
  notes?: string[]; // Implementation notes
  breaking?: boolean; // Is this a breaking change?
  requiresDynamic?: boolean; // Requires dynamic script injection
  requiresNonce?: boolean; // Requires nonce for inline scripts
  issues?: string[]; // Known issues or limitations
}
```

### Deprecation Process

1. **Mark as Deprecated**: Add `deprecatedFrom` date
2. **Update Documentation**: Add migration notes
3. **Grace Period**: Maintain for 6 months minimum
4. **Removal**: Remove after grace period

```typescript
{
  "1.0.0": {
    "csp": { /* old rules */ },
    "validFrom": "2023-01-01",
    "deprecatedFrom": "2024-01-01",
    "notes": [
      "Deprecated: Use version 2.0.0 instead",
      "Migration guide: https://docs.service.com/migrate"
    ]
  },
  "2.0.0": {
    "csp": { /* new rules */ },
    "validFrom": "2024-01-01",
    "breaking": true,
    "notes": [
      "Breaking: Removed legacy domain support",
      "See migration guide for upgrade path"
    ]
  }
}
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
  'form-action'?: string[]; // Form submission targets
  'object-src'?: string[]; // Plugin sources (flash, etc.)
  'media-src'?: string[]; // Audio/video sources
  'child-src'?: string[]; // Web workers and frames
  'worker-src'?: string[]; // Web workers only
  'manifest-src'?: string[]; // Web app manifests
}
```

### CSP Source Guidelines

**Specific Domains** (Preferred):

```json
{
  "script-src": ["https://cdn.service.com"]
}
```

**Avoid Wildcards** unless necessary:

```json
// Avoid if possible
{
  "script-src": ["https://*.service.com"]
}

// Prefer specific subdomains
{
  "script-src": [
    "https://cdn.service.com",
    "https://api.service.com"
  ]
}
```

**Special Values**:

- `'self'` - Same origin (added automatically by csp-js)
- `'unsafe-inline'` - Avoid! Use nonce instead
- `'unsafe-eval'` - Avoid! Security risk
- `data:` - Data URLs (use sparingly)
- `blob:` - Blob URLs (for generated content)

### CSP Research Process

1. **Official Documentation**: Check service's CSP docs first
2. **Implementation Testing**: Test with actual service integration
3. **Developer Tools**: Use browser network tab to identify domains
4. **Community Input**: Check existing implementations and issues

**Example Research Steps for New Service:**

```bash
# 1. Check official documentation
curl -s "https://docs.newservice.com" | grep -i "content security policy\|csp"

# 2. Test implementation
# Create test page with service integration
# Open browser developer tools -> Network tab
# Note all domains accessed by the service

# 3. Validate CSP rules
# Add CSP header with identified domains
# Test for console errors

# 4. Document findings
# Note any special requirements or configurations
```

## Monitoring Configuration

### Monitoring Object

```typescript
interface ServiceMonitoring {
  testUrls?: string[]; // URLs to test for CSP violations
  checkInterval: string; // 'daily' | 'weekly' | 'monthly'
  alertOnBreaking: boolean; // Create issues for breaking changes
  lastChecked?: string; // ISO timestamp of last check
  notes?: string[]; // Monitoring-specific notes
}
```

### Test URL Guidelines

**Good Test URLs**:

- Service demo pages
- Documentation examples
- CDN endpoint checks
- API endpoint health checks

```json
{
  "testUrls": [
    "https://service.com/demo", // Live demo
    "https://cdn.service.com/sdk.js", // CDN health
    "https://api.service.com/health" // API health
  ]
}
```

**Avoid**:

- URLs requiring authentication
- URLs with rate limiting
- Internal/private endpoints

### Check Intervals

- **Daily**: Critical services with frequent changes
- **Weekly**: Popular services with regular updates
- **Monthly**: Stable services with infrequent changes

## Validation Process

### Automated Validation

Service definitions are automatically validated for:

1. **JSON Schema**: Correct structure and required fields
2. **URL Validation**: Valid website and documentation URLs
3. **CSP Syntax**: Valid CSP directive format
4. **Version Logic**: Proper version numbering and relationships
5. **Monitoring URLs**: Accessible test endpoints

### Manual Validation

Before submitting a service definition:

1. **Test CSP Rules**:

   ```javascript
   import { generateCSP } from 'csp-js';

   const result = generateCSP(['your-service']);
   console.log(result.header);
   // Test this header with actual service integration
   ```

2. **Verify Documentation**:
   - Check all official documentation links
   - Ensure CSP requirements match official docs
   - Verify version information is current

3. **Test Monitoring**:
   ```bash
   # Test monitoring URLs
   csp-cli check your-service --url https://your-test-url.com
   ```

### Common Validation Errors

**Missing Required Fields**:

```typescript
// ❌ Invalid - missing required fields
{
  "id": "service",
  "name": "Service"
  // Missing: category, description, website, etc.
}

// ✅ Valid - all required fields present
{
  "id": "service",
  "name": "Service Name",
  "category": "analytics",
  "description": "Service description",
  "website": "https://service.com",
  "officialDocs": ["https://docs.service.com"],
  "versions": { /* ... */ },
  "defaultVersion": "1.0.0",
  "lastUpdated": "2024-06-29T00:00:00.000Z"
}
```

**Invalid CSP Directives**:

```typescript
// ❌ Invalid - CSP values must be arrays
{
  "csp": {
    "script-src": "https://cdn.service.com"  // Should be array
  }
}

// ✅ Valid - CSP values as arrays
{
  "csp": {
    "script-src": ["https://cdn.service.com"]
  }
}
```

**Version Consistency**:

```typescript
// ❌ Invalid - defaultVersion doesn't exist in versions
{
  "versions": {
    "1.0.0": { /* ... */ }
  },
  "defaultVersion": "2.0.0"  // Doesn't exist in versions
}

// ✅ Valid - defaultVersion exists in versions
{
  "versions": {
    "1.0.0": { /* ... */ },
    "2.0.0": { /* ... */ }
  },
  "defaultVersion": "2.0.0"
}
```

## Best Practices

### Service Definition Best Practices

1. **Accuracy First**: CSP rules must be accurate and tested
2. **Minimal Rules**: Only include necessary CSP directives
3. **Clear Documentation**: Provide helpful notes and links
4. **Version Management**: Use semantic versioning when possible
5. **Monitor Changes**: Set up appropriate monitoring intervals

### Naming Conventions

**Service IDs**: Use kebab-case

```
✅ google-analytics
✅ microsoft-clarity
✅ stripe-checkout
❌ GoogleAnalytics
❌ microsoft_clarity
```

**Aliases**: Include common variations

```json
{
  "id": "google-analytics",
  "aliases": ["ga4", "gtag", "google-gtag"]
}
```

### Documentation Standards

**Notes**: Include implementation details

```json
{
  "notes": [
    "Standard GA4 implementation with gtag.js",
    "For Google Signals, additional domains may be required",
    "Consider using nonce-based approach for inline scripts"
  ]
}
```

**Official Docs**: Link to CSP-specific documentation

```json
{
  "officialDocs": [
    "https://developers.google.com/tag-platform/security/guides/csp",
    "https://support.service.com/csp-integration"
  ]
}
```

### Categories

Use appropriate categories from `ServiceCategory` enum:

- `analytics` - Google Analytics, Adobe Analytics, Mixpanel
- `advertising` - Google Ads, Facebook Pixel, AdSense
- `social` - Twitter widgets, Facebook SDK, LinkedIn
- `payment` - Stripe, PayPal, Square
- `forms` - Typeform, Google Forms, JotForm
- `chat` - Intercom, Zendesk, Crisp
- `cdn` - jsDelivr, unpkg, cdnjs
- `fonts` - Google Fonts, Adobe Fonts, Typekit
- `maps` - Google Maps, Mapbox, OpenStreetMap
- `video` - YouTube, Vimeo, Wistia
- `testing` - Google Optimize, Optimizely, VWO
- `monitoring` - Sentry, LogRocket, Bugsnag
- `other` - Services that don't fit other categories

### Performance Considerations

**Bundle Size**: Keep service definitions concise

```json
// ✅ Concise but complete
{
  "description": "Web analytics service"
}

// ❌ Overly verbose
{
  "description": "A comprehensive web analytics service that provides detailed insights into user behavior, traffic patterns, conversion tracking, and much more for websites and applications"
}
```

**Load Time**: Optimize for fast parsing

- Use efficient JSON structure
- Avoid deeply nested objects
- Keep arrays reasonably sized

---

## Tools and Resources

### CLI Tools

```bash
# Add new service interactively
csp-cli add --interactive

# Update existing service
csp-cli update service-id --version 2.0.0

# Validate service definition
csp-cli validate --service service-id

# Check service for changes
csp-cli check service-id --url https://test-url.com
```

### Testing Tools

```javascript
// Test CSP generation
import { generateCSP, getServiceVersions } from 'csp-js';

const result = generateCSP(['your-service@1.0.0']);
console.log('CSP Header:', result.header);
console.log('Warnings:', result.warnings);

const versions = getServiceVersions('your-service');
console.log('Available versions:', versions);
```

### External Resources

- [CSP Reference](https://content-security-policy.com/)
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/)
- [MDN CSP Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [CSP Scanner](https://cspscanner.com/)

---

_Last Updated: 2024-06-29_
