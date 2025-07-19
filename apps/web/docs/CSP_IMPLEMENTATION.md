# CSP Implementation Guide for Next.js with csp-kit

This guide demonstrates how to implement Content Security Policy (CSP) headers in a Next.js application using the `@csp-kit/generator` and `@csp-kit/data` packages, with Google Analytics as an example.

## Implementation Overview

### 1. Middleware Setup (`middleware.ts`)

The middleware generates CSP headers for each request with unique nonces:

```typescript
import { generateCSP } from '@csp-kit/generator';
import { GoogleAnalytics } from '@csp-kit/data';

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  
  const cspResult = generateCSP({
    services: [GoogleAnalytics],
    nonce,
    development: {
      unsafeEval: process.env.NODE_ENV !== 'production',
    },
    production: {
      reportUri: process.env.CSP_REPORT_URI,
    },
    includeSelf: true,
  });

  // Set headers and return response
}
```

### 2. Google Analytics Component

The GA component uses the nonce for inline scripts:

```typescript
export function GoogleAnalytics({ measurementId, nonce }: GoogleAnalyticsProps) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        nonce={nonce}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        nonce={nonce}
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}');
          `,
        }}
      />
    </>
  );
}
```

### 3. Layout Integration

The root layout retrieves the nonce and passes it to components:

```typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = headers().get('x-nonce');
  
  return (
    <html>
      <body>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics
            measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
            nonce={nonce || undefined}
          />
        )}
        {children}
      </body>
    </html>
  );
}
```

## Key Features

1. **Nonce-based Security**: Each request gets a unique nonce for inline scripts
2. **Service-based Configuration**: Use pre-configured services from `@csp-kit/data`
3. **Environment-aware**: Different policies for development and production
4. **Report-Only Mode**: Safe testing in development
5. **Static Asset Exclusion**: Middleware skips static files for performance

## Testing

### Unit Tests
- Middleware CSP generation logic
- Component rendering with nonces
- Environment-specific behavior

### E2E Tests
- CSP header presence and content
- Google Analytics integration
- Nonce propagation
- Security policy enforcement

## Best Practices

1. **Always use nonces** for inline scripts instead of `unsafe-inline`
2. **Test in Report-Only mode** before enforcing strict CSP
3. **Configure report URIs** to monitor violations in production
4. **Use service definitions** from `@csp-kit/data` for consistency
5. **Exclude static assets** from CSP processing for performance

## Environment Variables

```env
# Required for Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Optional for CSP reporting
CSP_REPORT_URI=https://your-endpoint.com/csp-reports
```

## Common Issues and Solutions

1. **CSP violations in console**: Check if all required domains are included in service definition
2. **Nonce mismatch errors**: Ensure nonce is properly propagated from middleware to components
3. **Static assets blocked**: Verify middleware matcher excludes static file paths
4. **GA not tracking**: Confirm measurement ID is set and CSP includes all GA domains