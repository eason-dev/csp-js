import { defineService, createConfigurableService, type CSPService } from '../../service-types.js';
import { ServiceCategory } from '../../types.js';

// Example of a configurable service
interface StripeOptions {
  checkout?: boolean;
  elements?: boolean;
  paymentRequest?: boolean;
}

const baseStripe = defineService({
  id: 'stripe-configurable',
  name: 'Stripe (Configurable)',
  category: ServiceCategory.PAYMENT,
  description: 'Online payment processing platform',
  website: 'https://stripe.com',
  officialDocs: [
    'https://docs.stripe.com/security/content-security-policy'
  ],
  directives: {
    'script-src': ['https://js.stripe.com'],
    'frame-src': ['https://js.stripe.com'],
    'connect-src': ['https://api.stripe.com']
  },
  lastUpdated: '2024-01-15T00:00:00Z'
});

export const StripeConfigurable = createConfigurableService<StripeOptions>(
  baseStripe,
  (options) => {
    const additionalDirectives: Partial<CSPService> = {
      directives: {}
    };

    if (options.checkout) {
      additionalDirectives.directives['frame-src'] = [
        ...baseStripe.directives['frame-src'] || [],
        'https://checkout.stripe.com'
      ];
      additionalDirectives.directives['script-src'] = [
        ...baseStripe.directives['script-src'] || [],
        'https://checkout.stripe.com'
      ];
    }

    if (options.elements) {
      // Elements is included in base config
    }

    if (options.paymentRequest) {
      additionalDirectives.directives['connect-src'] = [
        ...baseStripe.directives['connect-src'] || [],
        'https://stripe.network'
      ];
    }

    return additionalDirectives;
  }
);

// For users who want to use it configured:
// const configured = StripeConfigurable.configure({ checkout: true });
// generateCSP([configured]);