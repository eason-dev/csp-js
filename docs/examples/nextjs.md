# Next.js Integration

Complete guide for integrating CSP Kit with Next.js applications, covering both App Router and Pages Router.

## 🚀 Quick Start

### Installation

```bash
npm install @csp-kit/generator @csp-kit/data
```

### Basic Setup

```javascript
// lib/csp.js
import { generateCSP } from '@csp-kit/generator';

export const cspConfig = generateCSP([
  'google-analytics',
  'vercel-analytics', 
  'google-fonts'
]);
```

## 📱 App Router (Next.js 13+)

### Method 1: Middleware (Recommended)

Create `middleware.js` in your project root:

```javascript
// middleware.js
import { NextResponse } from 'next/server';
import { generateCSPHeader } from '@csp-kit/generator';

export function middleware(request) {
  // Generate CSP header
  const csp = generateCSPHeader([
    'google-analytics',
    'vercel-analytics',
    'google-fonts'
  ]);

  // Create response
  const response = NextResponse.next();
  
  // Add CSP header
  response.headers.set('Content-Security-Policy', csp);
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
```

### Method 2: Route Headers

```javascript
// app/layout.js
import { headers } from 'next/headers';
import { generateCSP } from '@csp-kit/generator';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <CSPMeta />
      </head>
      <body>{children}</body>
    </html>
  );
}

function CSPMeta() {
  const result = generateCSP([
    'google-analytics',
    'vercel-analytics'
  ]);

  return (
    <meta 
      httpEquiv="Content-Security-Policy" 
      content={result.header} 
    />
  );
}
```

### Method 3: API Route

```javascript
// app/api/csp/route.js
import { generateCSP } from '@csp-kit/generator';
import { NextResponse } from 'next/server';

export async function GET() {
  const result = generateCSP([
    'google-analytics',
    'stripe',
    'google-fonts'
  ]);

  return NextResponse.json({
    csp: result.header,
    services: result.includedServices,
    warnings: result.warnings
  });
}
```

## 📄 Pages Router (Next.js 12 and below)

### Method 1: Custom Document

```javascript
// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { generateCSP } from '@csp-kit/generator';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    
    // Generate CSP
    const cspResult = generateCSP([
      'google-analytics',
      'google-fonts',
      'vercel-analytics'
    ]);

    // Add CSP header if we have access to res
    if (ctx.res) {
      ctx.res.setHeader('Content-Security-Policy', cspResult.header);
    }

    return { 
      ...initialProps, 
      csp: cspResult.header 
    };
  }

  render() {
    return (
      <Html>
        <Head>
          {this.props.csp && (
            <meta 
              httpEquiv="Content-Security-Policy" 
              content={this.props.csp} 
            />
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

### Method 2: API Middleware

```javascript
// pages/api/_middleware.js (Next.js 12)
import { NextResponse } from 'next/server';
import { generateCSPHeader } from '@csp-kit/generator';

export function middleware(req) {
  const csp = generateCSPHeader(['google-analytics', 'stripe']);
  
  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy', csp);
  
  return response;
}
```

### Method 3: Custom App with getInitialProps

```javascript
// pages/_app.js
import App from 'next/app';
import { generateCSP } from '@csp-kit/generator';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // Set CSP header on server side
    if (ctx.res) {
      const cspResult = generateCSP([
        'google-analytics',
        'google-fonts'
      ]);
      
      ctx.res.setHeader('Content-Security-Policy', cspResult.header);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default MyApp;
```

## 🔧 Advanced Configurations

### Dynamic CSP Based on Route

```javascript
// middleware.js
import { NextResponse } from 'next/server';
import { generateCSPHeader } from '@csp-kit/generator';

export function middleware(request) {
  const url = request.nextUrl.clone();
  let services = ['google-analytics', 'google-fonts']; // Base services

  // Add services based on route
  if (url.pathname.startsWith('/checkout')) {
    services.push('stripe');
  }
  
  if (url.pathname.startsWith('/contact')) {
    services.push('typeform');
  }
  
  if (url.pathname.startsWith('/help')) {
    services.push('intercom');
  }

  const csp = generateCSPHeader(services);
  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy', csp);
  
  return response;
}
```

### Environment-Based CSP

```javascript
// lib/csp.js
import { generateCSP } from '@csp-kit/generator';

const getCSPForEnvironment = () => {
  const baseServices = ['google-fonts'];
  
  if (process.env.NODE_ENV === 'development') {
    // More permissive for development
    return generateCSP({
      services: [...baseServices, 'localhost'],
      customRules: {
        'script-src': ["'unsafe-eval'"], // For hot reloading
        'style-src': ["'unsafe-inline'"] // For styled-components
      }
    });
  }
  
  if (process.env.NODE_ENV === 'production') {
    // Strict for production
    return generateCSP([
      ...baseServices,
      'google-analytics',
      'vercel-analytics'
    ]);
  }
  
  // Staging environment
  return generateCSP({
    services: [...baseServices, 'google-analytics'],
    reportUri: 'https://staging.example.com/csp-report'
  });
};

export const cspConfig = getCSPForEnvironment();
```

### CSP with Nonce for Inline Scripts

```javascript
// app/layout.js
import { generateCSP } from '@csp-kit/generator';

export default function RootLayout({ children }) {
  const cspResult = generateCSP({
    services: ['google-analytics'],
    nonce: true
  });

  return (
    <html lang="en">
      <head>
        <meta 
          httpEquiv="Content-Security-Policy" 
          content={cspResult.header} 
        />
      </head>
      <body>
        {children}
        
        {/* Use nonce for inline scripts */}
        <script nonce={cspResult.nonce}>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </script>
      </body>
    </html>
  );
}
```

## 🎯 Common Use Cases

### E-commerce Site

```javascript
// middleware.js - E-commerce CSP
import { generateCSPHeader } from '@csp-kit/generator';

export function middleware(request) {
  const csp = generateCSPHeader([
    'google-analytics',    // Analytics
    'facebook-pixel',      // Marketing
    'stripe',              // Payments
    'google-fonts',        // Typography
    'intercom',            // Customer support
    'hotjar',              // User experience
    'mailchimp',           // Email marketing
    'google-ads'           // Advertising
  ]);

  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy', csp);
  return response;
}
```

### SaaS Application

```javascript
// lib/csp-saas.js
import { generateCSP } from '@csp-kit/generator';

export const saasCsp = generateCSP({
  services: [
    'google-analytics',    // Product analytics
    'mixpanel',            // Event tracking
    'sentry',              // Error monitoring
    'intercom',            // Customer support
    'stripe',              // Billing
    'auth0',               // Authentication
    'google-fonts'         // Typography
  ],
  customRules: {
    'connect-src': [
      'https://api.yoursaas.com',  // Your API
      'wss://realtime.yoursaas.com' // WebSocket
    ]
  },
  reportUri: 'https://yoursaas.com/csp-report'
});
```

### Blog/Content Site

```javascript
// Blog CSP configuration
import { generateCSPHeader } from '@csp-kit/generator';

const blogCsp = generateCSPHeader([
  'google-analytics',      // Analytics
  'google-fonts',          // Typography
  'youtube',               // Video embeds
  'twitter',               // Tweet embeds
  'instagram',             // Instagram embeds
  'google-ads',            // Monetization
  'disqus'                 // Comments (if supported)
]);
```

## 🔒 Security Best Practices

### Report-Only Mode for Testing

```javascript
// middleware.js - Test CSP without breaking site
import { generateReportOnlyCSPAsync } from '@csp-kit/generator';

export async function middleware(request) {
  const reportOnlyCsp = await generateReportOnlyCSPAsync([
    'google-analytics',
    'new-service-to-test'
  ]);

  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy-Report-Only', reportOnlyCsp);
  return response;
}
```

### CSP Violation Reporting

```javascript
// pages/api/csp-report.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    const report = req.body;
    
    // Log CSP violations
    console.error('CSP Violation:', {
      document: report['document-uri'],
      violated: report['violated-directive'],
      blocked: report['blocked-uri'],
      source: report['source-file'],
      line: report['line-number']
    });
    
    // Optionally send to monitoring service
    // await sendToMonitoring(report);
    
    res.status(204).end();
  } else {
    res.status(405).end();
  }
}
```

### Gradual CSP Rollout

```javascript
// Gradually enable strict CSP
import { generateCSP } from '@csp-kit/generator';

const getCSPStrictness = () => {
  const rolloutPercentage = 10; // 10% of users get strict CSP
  const userId = getUserId(); // Your user identification logic
  const isInRollout = (userId % 100) < rolloutPercentage;
  
  if (isInRollout) {
    return generateCSP(['google-analytics']); // Strict
  } else {
    return generateCSP({
      services: ['google-analytics'],
      unsafeInline: true // Less strict
    });
  }
};
```

## 🚀 Performance Optimization

### Cached CSP Generation

```javascript
// lib/csp-cache.js
import { generateCSP } from '@csp-kit/generator';

const cspCache = new Map();

export function getCachedCSP(services) {
  const key = services.sort().join(',');
  
  if (!cspCache.has(key)) {
    const result = generateCSP(services);
    cspCache.set(key, result);
  }
  
  return cspCache.get(key);
}

// Clear cache periodically
setInterval(() => {
  cspCache.clear();
}, 60 * 60 * 1000); // 1 hour
```

### Edge Runtime Compatible

```javascript
// middleware.js - Works with Edge Runtime
import { generateCSPHeader } from '@csp-kit/generator';

export const config = {
  runtime: 'edge',
};

export function middleware(request) {
  // Works in Vercel Edge Functions
  const csp = generateCSPHeader(['google-analytics', 'vercel-analytics']);
  
  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy', csp);
  return response;
}
```

## 🧪 Testing

### Test CSP Configuration

```javascript
// __tests__/csp.test.js
import { generateCSP } from '@csp-kit/generator';

describe('CSP Configuration', () => {
  test('generates valid CSP for production', () => {
    const result = generateCSP([
      'google-analytics',
      'stripe',
      'google-fonts'
    ]);
    
    expect(result.header).toContain("script-src 'self'");
    expect(result.includedServices).toHaveLength(3);
    expect(result.unknownServices).toHaveLength(0);
  });
  
  test('includes nonce when requested', () => {
    const result = generateCSP({
      services: ['google-analytics'],
      nonce: true
    });
    
    expect(result.nonce).toBeDefined();
    expect(result.header).toContain(`'nonce-${result.nonce}'`);
  });
});
```

### E2E Testing with CSP

```javascript
// cypress/e2e/csp.cy.js
describe('CSP Compliance', () => {
  it('should not have CSP violations', () => {
    cy.visit('/');
    
    // Check for CSP violations in console
    cy.window().then((win) => {
      cy.spy(win.console, 'error').as('consoleError');
    });
    
    // Interact with features that use external scripts
    cy.get('[data-testid="analytics-button"]').click();
    
    // Should not have CSP violation errors
    cy.get('@consoleError').should('not.have.been.calledWith', 
      Cypress.sinon.match(/Content Security Policy/)
    );
  });
});
```

## 🚨 Troubleshooting

### Common Issues

**1. CSP blocking development tools**
```javascript
// Add development-specific rules
const isDev = process.env.NODE_ENV === 'development';

const csp = generateCSP({
  services: ['google-analytics'],
  customRules: isDev ? {
    'script-src': ["'unsafe-eval'"], // For hot reloading
    'connect-src': ['webpack://', 'ws://localhost:*']
  } : {}
});
```

**2. CSP blocking styled-components**
```javascript
// Add nonce support for styled-components
import { ServerStyleSheet } from 'styled-components';

const sheet = new ServerStyleSheet();
const csp = generateCSP({
  services: ['google-analytics'],
  nonce: true
});

// Use nonce in styled-components
sheet.collectStyles(<App nonce={csp.nonce} />);
```

**3. CSP violations in production**
```javascript
// Enable reporting to debug issues
const csp = generateCSP({
  services: ['google-analytics', 'stripe'],
  reportUri: 'https://yourdomain.com/api/csp-report'
});
```

### Debug CSP Generation

```javascript
// lib/debug-csp.js
import { generateCSP } from '@csp-kit/generator';

export function debugCSP(services) {
  const result = generateCSP(services);
  
  console.log('🔒 CSP Debug Info:');
  console.log('Services:', result.includedServices);
  console.log('Unknown:', result.unknownServices);
  console.log('Warnings:', result.warnings);
  console.log('Header:', result.header);
  
  return result;
}

// Usage in development
if (process.env.NODE_ENV === 'development') {
  debugCSP(['google-analytics', 'stripe']);
}
```

## 📚 Next.js Specific Resources

- **[Next.js Security Headers](https://nextjs.org/docs/advanced-features/security-headers)**
- **[Next.js Middleware](https://nextjs.org/docs/middleware)**
- **[Vercel Edge Functions](https://vercel.com/docs/concepts/functions/edge-functions)**

---

## 🔗 Related Examples

- **[Express.js Integration](./express.md)**
- **[React Integration](./react.md)**
- **[Vue.js Integration](./vue.md)**
- **[Nuxt.js Integration](./nuxt.md)**