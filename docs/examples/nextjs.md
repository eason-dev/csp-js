# Next.js Integration

Complete guide for integrating CSP Kit with Next.js applications, covering both App Router and Pages Router with the new TypeScript API.

## 🚀 Quick Start

### Installation

```bash
npm install @csp-kit/generator @csp-kit/data
# or
yarn add @csp-kit/generator @csp-kit/data
# or
pnpm add @csp-kit/generator @csp-kit/data
```

### Basic Setup

```typescript
// lib/csp.ts
import { generateCSP } from '@csp-kit/generator';
import { GoogleAnalytics, VercelAnalytics, GoogleFonts } from '@csp-kit/data';

export const cspConfig = generateCSP({
  services: [GoogleAnalytics, VercelAnalytics, GoogleFonts]
});
```

## 📱 App Router (Next.js 13+)

### Method 1: Middleware (Recommended)

Create `middleware.ts` in your project root:

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { generateCSPHeader } from '@csp-kit/generator';
import { GoogleAnalytics, VercelAnalytics, GoogleFonts } from '@csp-kit/data';

export function middleware(request: NextRequest) {
  // Generate CSP header
  const csp = generateCSPHeader({
    services: [GoogleAnalytics, VercelAnalytics, GoogleFonts]
  });

  // Create response
  const response = NextResponse.next();
  
  // Add CSP header
  response.headers.set('Content-Security-Policy', csp);
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
```

### Method 2: Route Headers with Nonce

```typescript
// app/layout.tsx
import { headers } from 'next/headers';
import { generateCSP } from '@csp-kit/generator';
import { GoogleAnalytics, VercelAnalytics } from '@csp-kit/data';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nonce = headers().get('x-nonce') || '';
  
  return (
    <html lang="en">
      <head>
        <CSPMeta nonce={nonce} />
      </head>
      <body>{children}</body>
    </html>
  );
}

function CSPMeta({ nonce }: { nonce: string }) {
  const result = generateCSP({
    services: [GoogleAnalytics, VercelAnalytics],
    nonce
  });

  return (
    <meta 
      httpEquiv="Content-Security-Policy" 
      content={result.header} 
    />
  );
}
```

### Method 3: Dynamic CSP by Route

```typescript
// middleware.ts - Dynamic CSP based on route
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { generateCSPHeader, defineService } from '@csp-kit/generator';
import { 
  GoogleAnalytics, 
  Stripe, 
  Typeform, 
  Intercom,
  ServiceCategory 
} from '@csp-kit/data';

// Custom service for your API
const MyAPI = defineService({
  id: 'my-api',
  name: 'My API',
  category: ServiceCategory.API,
  description: 'Application API endpoints',
  website: 'https://api.myapp.com',
  directives: {
    'connect-src': ['https://api.myapp.com']
  }
});

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Base services for all routes
  const baseServices = [GoogleAnalytics, MyAPI];
  
  // Add services based on route
  const services = [...baseServices];
  
  if (pathname.startsWith('/checkout')) {
    services.push(Stripe);
  }
  
  if (pathname.startsWith('/contact')) {
    services.push(Typeform);
  }
  
  if (pathname.startsWith('/support')) {
    services.push(Intercom);
  }

  const csp = generateCSPHeader({ services });
  
  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy', csp);
  
  return response;
}
```

## 📄 Pages Router (Next.js 12 and below)

### Method 1: Custom Document

```typescript
// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';
import type { DocumentContext, DocumentInitialProps } from 'next/document';
import { generateCSP } from '@csp-kit/generator';
import { GoogleAnalytics, GoogleFonts, VercelAnalytics } from '@csp-kit/data';

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps & { csp: string }> {
    const initialProps = await Document.getInitialProps(ctx);
    
    // Generate CSP
    const cspResult = generateCSP({
      services: [GoogleAnalytics, GoogleFonts, VercelAnalytics]
    });

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
    const { csp } = this.props as any;
    
    return (
      <Html>
        <Head>
          {csp && (
            <meta 
              httpEquiv="Content-Security-Policy" 
              content={csp} 
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

### Method 2: Custom App with getInitialProps

```typescript
// pages/_app.tsx
import App from 'next/app';
import type { AppContext, AppInitialProps } from 'next/app';
import { generateCSP } from '@csp-kit/generator';
import { GoogleAnalytics, GoogleFonts } from '@csp-kit/data';

class MyApp extends App {
  static async getInitialProps({
    Component,
    ctx,
  }: AppContext): Promise<AppInitialProps> {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // Set CSP header on server side
    if (ctx.res) {
      const cspResult = generateCSP({
        services: [GoogleAnalytics, GoogleFonts]
      });
      
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

### Environment-Based CSP

```typescript
// lib/csp.ts
import { generateCSP, defineService } from '@csp-kit/generator';
import { GoogleFonts, ServiceCategory } from '@csp-kit/data';

// Development tools service
const NextDevTools = defineService({
  id: 'next-dev-tools',
  name: 'Next.js Dev Tools',
  category: ServiceCategory.DEVELOPMENT,
  description: 'Next.js development server and hot reload',
  website: 'http://localhost:3000',
  directives: {
    'script-src': ["'unsafe-eval'"], // Required for hot reload
    'connect-src': [
      'http://localhost:3000',
      'ws://localhost:3000',    // Hot reload websocket
      'http://localhost:3001'   // API routes in dev
    ],
    'style-src': ["'unsafe-inline'"] // For styled-jsx in dev
  }
});

export function getCSPForEnvironment() {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isProduction = process.env.NODE_ENV === 'production';
  
  return generateCSP({
    services: [
      GoogleFonts,
      ...(isDevelopment ? [NextDevTools] : [])
    ],
    development: {
      // More permissive in development
      unsafeEval: true,
      unsafeInline: true
    },
    production: {
      // Strict in production
      reportUri: process.env.CSP_REPORT_URI || '/api/csp-report'
    }
  });
}
```

### CSP with Nonce for Inline Scripts

```typescript
// app/layout.tsx
import { headers } from 'next/headers';
import { generateCSP, generateNonce } from '@csp-kit/generator';
import { GoogleAnalytics } from '@csp-kit/data';
import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nonce = generateNonce();
  
  const cspResult = generateCSP({
    services: [GoogleAnalytics],
    nonce
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
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          nonce={nonce}
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
```

### CSP for Specific Features

```typescript
// middleware.ts - Feature-specific CSP
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { generateCSPHeader, defineService } from '@csp-kit/generator';
import { 
  GoogleAnalytics,
  Stripe,
  Youtube,
  GoogleMaps,
  ServiceCategory
} from '@csp-kit/data';

// Custom services for your features
const ImageCDN = defineService({
  id: 'image-cdn',
  name: 'Image CDN',
  category: ServiceCategory.CDN,
  description: 'Next.js Image Optimization',
  website: 'https://images.myapp.com',
  directives: {
    'img-src': [
      'https://images.myapp.com',
      'data:', // For placeholder images
      'blob:'  // For dynamic images
    ]
  }
});

const WebSocketAPI = defineService({
  id: 'websocket-api',
  name: 'WebSocket API',
  category: ServiceCategory.API,
  description: 'Real-time WebSocket connections',
  website: 'wss://realtime.myapp.com',
  directives: {
    'connect-src': ['wss://realtime.myapp.com']
  }
});

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Always include these services
  const services = [GoogleAnalytics, ImageCDN];
  
  // Add services based on features used
  if (pathname.includes('/videos')) {
    services.push(Youtube);
  }
  
  if (pathname.includes('/maps')) {
    services.push(GoogleMaps);
  }
  
  if (pathname.includes('/checkout')) {
    services.push(Stripe);
  }
  
  if (pathname.includes('/chat')) {
    services.push(WebSocketAPI);
  }

  const csp = generateCSPHeader({ services });
  
  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy', csp);
  
  return response;
}
```

## 🎯 Common Use Cases

### E-commerce Site

```typescript
// middleware.ts - E-commerce CSP
import { generateCSPHeader } from '@csp-kit/generator';
import {
  GoogleAnalytics,
  FacebookPixel,
  Stripe,
  Paypal,
  GoogleFonts,
  Intercom,
  Hotjar,
  Mailchimp,
  GoogleAds
} from '@csp-kit/data';

export function middleware(request: NextRequest) {
  const csp = generateCSPHeader({
    services: [
      // Analytics & Marketing
      GoogleAnalytics,
      FacebookPixel,
      GoogleAds,
      Hotjar,
      
      // Payments
      Stripe,
      Paypal,
      
      // Customer Support
      Intercom,
      
      // Email Marketing
      Mailchimp,
      
      // UI
      GoogleFonts
    ]
  });

  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy', csp);
  return response;
}
```

### SaaS Application

```typescript
// lib/csp-saas.ts
import { generateCSP, defineService } from '@csp-kit/generator';
import {
  GoogleAnalytics,
  Mixpanel,
  Sentry,
  Intercom,
  Stripe,
  Auth0,
  GoogleFonts,
  ServiceCategory
} from '@csp-kit/data';

// Custom services for SaaS
const GraphQLAPI = defineService({
  id: 'graphql-api',
  name: 'GraphQL API',
  category: ServiceCategory.API,
  description: 'Application GraphQL endpoint',
  website: 'https://api.yoursaas.com',
  directives: {
    'connect-src': [
      'https://api.yoursaas.com',
      'wss://subscriptions.yoursaas.com' // GraphQL subscriptions
    ]
  }
});

const FileStorage = defineService({
  id: 'file-storage',
  name: 'File Storage',
  category: ServiceCategory.CDN,
  description: 'User file uploads',
  website: 'https://files.yoursaas.com',
  directives: {
    'img-src': ['https://files.yoursaas.com'],
    'media-src': ['https://files.yoursaas.com'],
    'connect-src': ['https://files.yoursaas.com'] // For uploads
  }
});

export const saasCsp = generateCSP({
  services: [
    // Analytics
    GoogleAnalytics,
    Mixpanel,
    
    // Error Monitoring
    Sentry,
    
    // Customer Support
    Intercom,
    
    // Billing
    Stripe,
    
    // Authentication
    Auth0,
    
    // UI
    GoogleFonts,
    
    // Custom
    GraphQLAPI,
    FileStorage
  ],
  reportUri: 'https://api.yoursaas.com/csp-violations'
});
```

### Blog/Content Site

```typescript
// Blog CSP configuration
import { generateCSPHeader } from '@csp-kit/generator';
import {
  GoogleAnalytics,
  GoogleFonts,
  Youtube,
  Twitter,
  Instagram,
  GoogleAds,
  Disqus
} from '@csp-kit/data';

const blogCsp = generateCSPHeader({
  services: [
    // Analytics
    GoogleAnalytics,
    
    // Typography
    GoogleFonts,
    
    // Embeds
    Youtube,
    Twitter,
    Instagram,
    
    // Monetization
    GoogleAds,
    
    // Comments (if Disqus is supported in the future)
    // Disqus
  ]
});
```

## 🔒 Security Best Practices

### Report-Only Mode for Testing

```typescript
// middleware.ts - Test CSP without breaking site
import { generateReportOnlyCSP } from '@csp-kit/generator';
import { GoogleAnalytics, NewServiceToTest } from '@csp-kit/data';

export function middleware(request: NextRequest) {
  const reportOnlyCsp = generateReportOnlyCSP({
    services: [GoogleAnalytics, NewServiceToTest],
    reportUri: '/api/csp-report'
  });

  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy-Report-Only', reportOnlyCsp);
  return response;
}
```

### CSP Violation Reporting

```typescript
// app/api/csp-report/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const report = await request.json();
    
    // Log CSP violations
    console.error('CSP Violation:', {
      documentUri: report['document-uri'],
      violatedDirective: report['violated-directive'],
      blockedUri: report['blocked-uri'],
      sourceFile: report['source-file'],
      lineNumber: report['line-number'],
      columnNumber: report['column-number']
    });
    
    // Optionally send to monitoring service
    // await sendToMonitoring(report);
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error processing CSP report:', error);
    return new NextResponse(null, { status: 500 });
  }
}
```

### Gradual CSP Rollout

```typescript
// middleware.ts - Gradually enable strict CSP
import { generateCSP } from '@csp-kit/generator';
import { GoogleAnalytics } from '@csp-kit/data';
import { cookies } from 'next/headers';

export function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const isInStrictCSPGroup = cookieStore.get('strict-csp')?.value === 'true';
  
  // 10% of users get strict CSP
  if (!cookieStore.has('strict-csp')) {
    const enableStrict = Math.random() < 0.1;
    cookieStore.set('strict-csp', enableStrict ? 'true' : 'false');
  }
  
  const csp = isInStrictCSPGroup
    ? generateCSP({ services: [GoogleAnalytics] }) // Strict
    : generateCSP({ 
        services: [GoogleAnalytics],
        unsafeInline: true // Less strict for gradual rollout
      });
  
  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy', csp.header);
  return response;
}
```

## 🚀 Performance Optimization

### Static CSP Generation

```typescript
// next.config.js - Generate CSP at build time
const { generateCSPHeader } = require('@csp-kit/generator');
const { GoogleAnalytics, VercelAnalytics } = require('@csp-kit/data');

const csp = generateCSPHeader({
  services: [GoogleAnalytics, VercelAnalytics]
});

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: csp
          }
        ]
      }
    ];
  }
};
```

### Edge Runtime Compatible

```typescript
// middleware.ts - Works with Edge Runtime
import { generateCSPHeader } from '@csp-kit/generator';
import { GoogleAnalytics, VercelAnalytics } from '@csp-kit/data';

export const config = {
  runtime: 'edge',
};

export function middleware(request: Request) {
  // CSP Kit works in Vercel Edge Functions
  const csp = generateCSPHeader({
    services: [GoogleAnalytics, VercelAnalytics]
  });
  
  return new Response(null, {
    headers: {
      'Content-Security-Policy': csp
    }
  });
}
```

## 🧪 Testing

### Test CSP Configuration

```typescript
// __tests__/csp.test.ts
import { describe, it, expect } from 'vitest';
import { generateCSP } from '@csp-kit/generator';
import { GoogleAnalytics, Stripe, GoogleFonts } from '@csp-kit/data';

describe('CSP Configuration', () => {
  it('should generate valid CSP for production', () => {
    const result = generateCSP({
      services: [GoogleAnalytics, Stripe, GoogleFonts]
    });
    
    expect(result.header).toContain("script-src 'self'");
    expect(result.includedServices).toHaveLength(3);
    expect(result.warnings).toHaveLength(0);
  });
  
  it('should include nonce when requested', () => {
    const result = generateCSP({
      services: [GoogleAnalytics],
      nonce: true
    });
    
    expect(result.nonce).toBeDefined();
    expect(result.header).toContain(`'nonce-${result.nonce}'`);
  });
});
```

### E2E Testing with CSP

```typescript
// cypress/e2e/csp.cy.ts
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

**1. CSP blocking Next.js development features**
```typescript
// Use environment-specific configuration
import { defineService } from '@csp-kit/generator';
import { ServiceCategory } from '@csp-kit/data';

const NextJSDev = defineService({
  id: 'nextjs-dev',
  name: 'Next.js Development',
  category: ServiceCategory.DEVELOPMENT,
  description: 'Next.js dev server requirements',
  website: 'http://localhost:3000',
  directives: {
    'script-src': ["'unsafe-eval'"], // For Fast Refresh
    'connect-src': [
      'http://localhost:3000',
      'ws://localhost:3000',      // Hot reload
      'http://localhost:3001'     // API routes
    ],
    'style-src': ["'unsafe-inline'"] // For styled-jsx
  }
});
```

**2. Next.js Image Optimization**
```typescript
// Add image domains for next/image
const NextImages = defineService({
  id: 'next-images',
  name: 'Next.js Images',
  category: ServiceCategory.CDN,
  description: 'Next.js image optimization',
  website: 'https://your-domain.com',
  directives: {
    'img-src': [
      'https://your-domain.com',
      'https://images.your-domain.com',
      'data:', // For placeholder images
      'blob:'  // For dynamic images
    ]
  }
});
```

**3. Styled Components / Emotion**
```typescript
// Handle CSS-in-JS libraries
import { generateCSP } from '@csp-kit/generator';
import { GoogleAnalytics } from '@csp-kit/data';

const result = generateCSP({
  services: [GoogleAnalytics],
  nonce: true // Use nonce for styled-components
});

// In your app
import { ServerStyleSheet } from 'styled-components';

const sheet = new ServerStyleSheet();
const html = renderToString(
  sheet.collectStyles(<App nonce={result.nonce} />)
);
```

## 📚 Next.js Specific Resources

- **[Next.js Security Headers](https://nextjs.org/docs/advanced-features/security-headers)**
- **[Next.js Middleware](https://nextjs.org/docs/middleware)**
- **[Vercel Edge Functions](https://vercel.com/docs/concepts/functions/edge-functions)**
- **[Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)**

---

## 🔗 More Examples

More framework integration examples coming soon! For now, you can adapt the patterns shown above for other frameworks by following similar middleware patterns.