# @csp-kit/data

Service definitions and CSP mappings database for [csp-kit](https://github.com/eason-dev/csp-kit). This package provides Content Security Policy directives for 100+ popular web services and is designed to be used with `@csp-kit/generator`.

## Installation

**Install both packages together:**

```bash
npm install @csp-kit/generator @csp-kit/data
# or
yarn add @csp-kit/generator @csp-kit/data
# or
pnpm add @csp-kit/generator @csp-kit/data
```

## Usage

This package exports service definitions that are used with `@csp-kit/generator` to create CSP headers:

```javascript
import { generateCSP } from '@csp-kit/generator';
import { GoogleAnalytics, Stripe, GoogleFonts } from '@csp-kit/data';

// Generate CSP header for your services
const { header } = generateCSP({
  services: [GoogleAnalytics, Stripe, GoogleFonts],
});

// Use in your application
response.setHeader('Content-Security-Policy', header);
```

## Available Services

Services are exported as named exports with PascalCase naming:

```javascript
import {
  // Analytics
  GoogleAnalytics,
  MicrosoftClarity,
  Mixpanel,
  Amplitude,
  Hotjar,

  // Payment
  Stripe,
  Paypal,
  Square,

  // Authentication
  Auth0,
  Clerk,
  FirebaseAuth,

  // Video
  Youtube,
  Vimeo,
  Wistia,

  // ... and 100+ more services
} from '@csp-kit/data';
```

## Service Categories

- **analytics**: Google Analytics, Microsoft Clarity, Mixpanel, Amplitude, Heap, PostHog
- **authentication**: Auth0, Clerk, Firebase Auth, Supabase Auth
- **cdn**: Cloudflare, Fastly, jsDelivr, unpkg, cdnjs
- **chat**: Intercom, Crisp, Tawk.to, Zendesk Chat
- **fonts**: Google Fonts, Adobe Fonts
- **forms**: Typeform, Tally, Jotform
- **maps**: Google Maps, Mapbox
- **marketing**: HubSpot, Mailchimp, ConvertKit
- **monitoring**: Sentry, Datadog, LogRocket, Bugsnag
- **payment**: Stripe, PayPal, Square
- **social**: Twitter/X Widgets, Facebook SDK, LinkedIn
- **video**: YouTube, Vimeo, Wistia, Loom
- And many more...

## Configurable Services

Some services support dynamic configuration:

```javascript
import { GoogleMaps, Stripe } from '@csp-kit/data';

// Configure services with dynamic values
const mapsWithKey = GoogleMaps.configure({ apiKey: 'YOUR_API_KEY' });
const stripeWithAccount = Stripe.configure({ account: 'acct_123456' });

// Use with generator
import { generateCSP } from '@csp-kit/generator';
const { header } = generateCSP({
  services: [mapsWithKey, stripeWithAccount],
});
```

## TypeScript Support

All services are fully typed:

```typescript
import type { CSPService } from '@csp-kit/data';
import { GoogleAnalytics } from '@csp-kit/data';

// Each service has these properties
console.log(GoogleAnalytics.id); // 'google-analytics'
console.log(GoogleAnalytics.name); // 'Google Analytics 4'
console.log(GoogleAnalytics.category); // 'analytics'
console.log(GoogleAnalytics.directives); // CSP directives object
```

## Updates

Service definitions are updated independently from the generator:

```bash
# Check for updates
npm outdated @csp-kit/data

# Update to latest
npm update @csp-kit/data
```

## Contributing

Want to add or update a service? See our [Contributing Guide](https://github.com/eason-dev/csp-kit/blob/main/CONTRIBUTING.md).

## License

MIT License - see [LICENSE](https://github.com/eason-dev/csp-kit/blob/main/LICENSE) for details.
