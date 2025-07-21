# @csp-kit/data

Service definitions for CSP Kit. Contains CSP directives for 106+ popular web services.

## Installation

```bash
npm install @csp-kit/generator @csp-kit/data
```

Both packages are required - use with `@csp-kit/generator` to generate CSP headers.

## Usage

```javascript
import { generateCSP } from '@csp-kit/generator';
import { GoogleAnalytics, Stripe, GoogleFonts } from '@csp-kit/data';

const { header } = generateCSP({
  services: [GoogleAnalytics, Stripe, GoogleFonts],
});
```

## Available Services

Import services by name (PascalCase):

```javascript
import {
  // Analytics
  GoogleAnalytics,
  MicrosoftClarity,
  Mixpanel,
  Amplitude,

  // Payment
  Stripe,
  Paypal,
  Square,

  // Authentication
  Auth0,
  FirebaseAuth,
  Okta,

  // Video
  Youtube,
  Vimeo,
  Wistia,

  // Chat
  Intercom,
  Zendesk,
  Drift,

  // ... and 100+ more
} from '@csp-kit/data';
```

See the [full service list](https://csp-kit.eason.ch/services) or check the main README for complete imports.

## Custom Services

```javascript
import { defineService } from '@csp-kit/data';

const MyService = defineService({
  directives: {
    'script-src': ['https://my-cdn.com'],
    'connect-src': ['https://my-api.com'],
  },
});
```

## TypeScript

All services are fully typed:

```typescript
import type { CSPService } from '@csp-kit/data';
```

## License

MIT © [CSP Kit Contributors](https://github.com/eason-dev/csp-kit/graphs/contributors)
