# Getting Started with CSP Kit

Welcome to CSP Kit! This guide will help you get up and running quickly with Content Security Policy generation for your web applications.

## 🎯 What is CSP Kit?

CSP Kit is a modern TypeScript-first toolkit that simplifies Content Security Policy (CSP) management by using a **service-first approach**. Instead of manually writing CSP directives, you import and use service objects that automatically provide the correct security policies.

## 🚀 Quick Start Options

### Option 1: Web Interface (Recommended for Beginners)

The fastest way to get started is using our interactive web interface:

**👉 [Try CSP Kit Web Generator](https://csp-kit.eason.ch)**

**Benefits:**

- ✅ No installation required
- ✅ Visual service selection
- ✅ Real-time CSP generation
- ✅ Copy ready-to-use headers
- ✅ Learn how different services affect CSP

### Option 2: TypeScript/JavaScript API

For developers who want to integrate CSP generation into their applications:

#### Installation

You need **both packages** for CSP Kit to work:

```bash
# npm
npm install @csp-kit/generator @csp-kit/data

# yarn
yarn add @csp-kit/generator @csp-kit/data

# pnpm
pnpm add @csp-kit/generator @csp-kit/data
```

> **💡 Why two packages?** CSP Kit uses a data-package separation architecture. The `@csp-kit/generator` contains the core logic, while `@csp-kit/data` contains service definitions that update frequently. This allows you to get service updates without library updates.

#### Basic Usage

```typescript
import { generateCSP } from '@csp-kit/generator';
import { GoogleAnalytics, Stripe, GoogleFonts } from '@csp-kit/data';

// Generate CSP using imported services
const result = generateCSP({
  services: [GoogleAnalytics, Stripe, GoogleFonts],
});

console.log(result.header);
// Output: "script-src 'self' https://www.googletagmanager.com https://js.stripe.com; style-src 'self' https://fonts.googleapis.com; ..."

// Use the CSP header
response.setHeader('Content-Security-Policy', result.header);
```

### Option 3: CLI Tools

For developers who want to contribute or test CSP configurations:

```bash
# Test CSP generation (global installation not required)
npx tsx test-csp.ts

# For contributors: Install CLI globally
npm install -g @csp-kit/cli
```

## 🎯 Common Use Cases

### 1. Next.js Application (App Router)

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { generateCSPHeader } from '@csp-kit/generator';
import { GoogleAnalytics, VercelAnalytics, GoogleFonts } from '@csp-kit/data';

export function middleware(request: NextRequest) {
  const csp = generateCSPHeader({
    services: [GoogleAnalytics, VercelAnalytics, GoogleFonts],
  });

  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy', csp);

  return response;
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
```

### 2. Express.js Middleware

```typescript
import express from 'express';
import { generateCSP } from '@csp-kit/generator';
import { GoogleAnalytics, Stripe, Intercom } from '@csp-kit/data';

const app = express();

// Generate CSP once at startup (for better performance)
const cspResult = generateCSP({
  services: [GoogleAnalytics, Stripe, Intercom],
});

// Apply CSP to all routes
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', cspResult.header);
  next();
});
```

### 3. React Application (Vite)

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import { generateCSPHeader } from '@csp-kit/generator';
import { GoogleAnalytics, GoogleFonts } from '@csp-kit/data';

const csp = generateCSPHeader({
  services: [GoogleAnalytics, GoogleFonts],
});

export default defineConfig({
  server: {
    headers: {
      'Content-Security-Policy': csp,
    },
  },
});
```

### 4. Static Sites (Netlify, Vercel)

Generate CSP headers and add them to your hosting configuration:

```typescript
// generate-headers.ts
import { generateCSPHeader } from '@csp-kit/generator';
import { GoogleAnalytics, GoogleFonts } from '@csp-kit/data';

const csp = generateCSPHeader({
  services: [GoogleAnalytics, GoogleFonts],
});

console.log(csp);
// Copy this output to your configuration files
```

**Netlify (\_headers file):**

```
/*
  Content-Security-Policy: script-src 'self' https://www.googletagmanager.com; style-src 'self' https://fonts.googleapis.com
```

**Vercel (vercel.json):**

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "script-src 'self' https://www.googletagmanager.com; style-src 'self' https://fonts.googleapis.com"
        }
      ]
    }
  ]
}
```

## 🔧 Advanced Configuration

### Custom Services

Define your own services alongside built-in ones:

```typescript
import { generateCSP, defineService } from '@csp-kit/generator';
import { GoogleAnalytics, Stripe } from '@csp-kit/data';

// Define a custom service
const MyAPI = defineService({
  directives: {
    'connect-src': ['https://api.myapp.com'],
    'img-src': ['https://images.myapp.com'],
  },
});

// Use it like any built-in service
const result = generateCSP({
  services: [GoogleAnalytics, Stripe, MyAPI],
  nonce: true, // Generate nonce for inline scripts
  reportUri: 'https://my-site.com/csp-report',
});
```

### Nonce Support

For secure inline scripts:

```typescript
import { generateCSP } from '@csp-kit/generator';
import { GoogleAnalytics } from '@csp-kit/data';

const result = generateCSP({
  services: [GoogleAnalytics],
  nonce: true,
});

// Use the nonce in your HTML
const html = `
  <script nonce="${result.nonce}">
    // Your inline script
  </script>
`;
```

### Report-Only Mode

Test CSP without breaking your site:

```typescript
import { generateReportOnlyCSP } from '@csp-kit/generator';
import { GoogleAnalytics, Stripe } from '@csp-kit/data';

const reportOnlyHeader = generateReportOnlyCSP({
  services: [GoogleAnalytics, Stripe],
  reportUri: '/api/csp-violations',
});

// Use report-only header for testing
response.setHeader('Content-Security-Policy-Report-Only', reportOnlyHeader);
```

### Environment-Specific Configuration

```typescript
import { generateCSP, defineService } from '@csp-kit/generator';
import { GoogleAnalytics, Stripe } from '@csp-kit/data';

// Development-only service
const DevTools = defineService({
  directives: {
    'script-src': ['http://localhost:3000', "'unsafe-eval'"],
    'connect-src': ['ws://localhost:3000', 'http://localhost:3001'],
  },
});

const isDevelopment = process.env.NODE_ENV === 'development';

const result = generateCSP({
  services: [GoogleAnalytics, Stripe, ...(isDevelopment ? [DevTools] : [])],
  development: {
    unsafeEval: true, // Allow eval in development
    additionalRules: {
      'connect-src': ['ws://localhost:*'],
    },
  },
  production: {
    reportUri: 'https://api.myapp.com/csp-violations',
  },
});
```

## 🔍 Available Services

CSP Kit includes 106+ pre-configured services. Here's how to discover them:

### TypeScript Auto-Complete

The best way to discover services is through your IDE:

```typescript
import {
  // Start typing and your IDE will show all available services
  GoogleAnalytics,
  Stripe,
  Intercom,
  Sentry,
  // ... 100+ more services
} from '@csp-kit/data';
```

### Common Services by Category

```typescript
// Analytics
import { GoogleAnalytics, Mixpanel, Amplitude, Hotjar } from '@csp-kit/data';

// Payment
import { Stripe, Paypal, Square, Braintree } from '@csp-kit/data';

// Social Media
import { Facebook, Twitter, LinkedIn, Youtube } from '@csp-kit/data';

// Error Monitoring
import { Sentry, Bugsnag, Rollbar } from '@csp-kit/data';

// Customer Support
import { Intercom, Zendesk, Crisp, Drift } from '@csp-kit/data';

// CDN & Fonts
import { GoogleFonts, Cloudflare, Fastly } from '@csp-kit/data';
```

## 🐛 Troubleshooting

### Common Issues

**1. Cannot find service import**

```typescript
// ❌ Wrong - using string ID
const result = generateCSP(['google-analytics']);

// ✅ Correct - import service object
import { GoogleAnalytics } from '@csp-kit/data';
const result = generateCSP({ services: [GoogleAnalytics] });
```

**2. Type errors with services**

```typescript
// Make sure you have TypeScript configured properly
// tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "bundler", // or "node16"
    "esModuleInterop": true
  }
}
```

**3. Missing @csp-kit/data package**

```bash
# Make sure both packages are installed
npm list @csp-kit/generator @csp-kit/data

# If missing, install both
npm install @csp-kit/generator @csp-kit/data
```

### Getting Help

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/eason-dev/csp-kit/issues)
- 💬 **Questions**: [GitHub Discussions](https://github.com/eason-dev/csp-kit/discussions)
- 📖 **Documentation**: [csp-kit.eason.ch/docs](https://csp-kit.eason.ch/docs)

## 📚 Next Steps

Now that you're up and running:

1. **[API Reference](./api-reference.md)** - Complete API documentation
2. **[Custom Services](https://github.com/eason-dev/csp-kit/blob/main/CUSTOM-SERVICE-API-DESIGN.md)** - Create your own services
3. **[Contributing](./contributing.md)** - Help add new services
4. **[Next.js Examples](./examples/nextjs.md)** - Framework-specific examples

## 🎉 Welcome to the Community!

- ⭐ **[Star us on GitHub](https://github.com/eason-dev/csp-kit)**
- 💬 **[Join discussions](https://github.com/eason-dev/csp-kit/discussions)**
- 🤝 **[Contribute services](./contributing.md)**

Happy coding with type-safe CSP! 🚀
