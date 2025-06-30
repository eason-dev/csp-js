# 📋 Service Support

## Currently Supported Services (106+ Services)

We now support **106+ popular web services** across all major categories. Here are some highlighted services by category:

### Analytics Services (12)

| Service              | Versions     | Auto-Monitoring |
| -------------------- | ------------ | --------------- |
| Google Analytics     | 4.0.0, 4.1.0 | ✅              |
| Microsoft Clarity    | 1.0.0        | ✅              |
| Google Tag Manager   | 1.0.0        | ✅              |
| Hotjar               | current      | ✅              |
| Mixpanel             | current      | ✅              |
| Amplitude            | current      | ✅              |
| Segment              | current      | ✅              |
| Adobe Analytics      | current      | ✅              |
| Cloudflare Analytics | current      | ✅              |
| Plausible Analytics  | current      | ✅              |
| Fathom Analytics     | current      | ✅              |

### Payment Services (8)

| Service     | Versions | Auto-Monitoring |
| ----------- | -------- | --------------- |
| Stripe      | v3       | ✅              |
| PayPal      | current  | ✅              |
| Square      | current  | ✅              |
| Shopify     | current  | ✅              |
| WooCommerce | current  | ✅              |
| Apple Pay   | current  | ✅              |
| Google Pay  | current  | ✅              |

### Social Media (11)

| Service   | Versions | Auto-Monitoring |
| --------- | -------- | --------------- |
| Facebook  | current  | ✅              |
| Twitter   | current  | ✅              |
| LinkedIn  | current  | ✅              |
| Instagram | current  | ✅              |
| Pinterest | current  | ✅              |
| TikTok    | current  | ✅              |
| Snapchat  | current  | ✅              |
| Discord   | current  | ✅              |
| Slack     | current  | ✅              |
| WhatsApp  | current  | ✅              |

### Video & Communication (8)

| Service         | Versions | Auto-Monitoring |
| --------------- | -------- | --------------- |
| YouTube         | 1.0.0    | ✅              |
| Vimeo           | current  | ✅              |
| Twitch          | current  | ✅              |
| Zoom            | current  | ✅              |
| Microsoft Teams | current  | ✅              |
| Google Meet     | current  | ✅              |
| Jitsi Meet      | current  | ✅              |
| BigBlueButton   | current  | ✅              |

### Chat & Support (6)

| Service    | Versions | Auto-Monitoring |
| ---------- | -------- | --------------- |
| Drift      | current  | ✅              |
| Intercom   | current  | ✅              |
| Zendesk    | current  | ✅              |
| Tawk.to    | current  | ✅              |
| Freshchat  | current  | ✅              |
| Crisp Chat | current  | ✅              |

### CDN Providers (8)

| Service        | Versions | Auto-Monitoring |
| -------------- | -------- | --------------- |
| jsDelivr       | current  | ✅              |
| cdnjs          | current  | ✅              |
| unpkg          | current  | ✅              |
| AWS CloudFront | current  | ✅              |
| Azure CDN      | current  | ✅              |
| KeyCDN         | current  | ✅              |
| MaxCDN         | current  | ✅              |
| Fastly         | current  | ✅              |

### Forms & Marketing (9)

| Service          | Versions | Auto-Monitoring |
| ---------------- | -------- | --------------- |
| Typeform         | 1.0.0    | ✅              |
| Calendly         | current  | ✅              |
| HubSpot          | current  | ✅              |
| Mailchimp        | current  | ✅              |
| Mailgun          | current  | ✅              |
| SendGrid         | current  | ✅              |
| Constant Contact | current  | ✅              |
| Campaign Monitor | current  | ✅              |
| ConvertKit       | current  | ✅              |

### Maps & Location (3)

| Service               | Versions | Auto-Monitoring |
| --------------------- | -------- | --------------- |
| Google Maps           | current  | ✅              |
| Mapbox                | current  | ✅              |
| OpenStreetMap/Leaflet | current  | ✅              |

**And many more services across categories including:**

- Testing & Development (5 services)
- Advertising Platforms (5 services)
- Authentication Services (5 services)
- Website Builders (5 services)
- E-Learning Platforms (5 services)
- A/B Testing Tools (5 services)
- Search & Discovery (5 services)
- Content Management (5 services)
- Monitoring & Error Tracking (3 services)

## Request New Services

We're always adding new services! To request support for a service:

1. [Create an issue](https://github.com/eason-dev/csp-kit/issues/new?template=add-service.yml) using our service request template
2. Use the CLI: `csp-cli add --interactive`
3. Submit a pull request with the service definition

## Service Update Process

Services are automatically monitored for CSP requirement changes:

1. **Automated Monitoring**: GitHub Actions check services weekly
2. **Change Detection**: Compare current vs. expected CSP requirements
3. **Issue Creation**: Automatic issues for detected changes
4. **Community Review**: Maintainers and community validate changes
5. **Version Release**: Updated service definitions released

## Service Categories

Services are organized by category for easy discovery:

- **Analytics (12)**: Google Analytics, Microsoft Clarity, Hotjar, Mixpanel, Amplitude, Segment, Adobe Analytics, Cloudflare Analytics, Plausible, Fathom
- **Payment (8)**: Stripe, PayPal, Square, Shopify, WooCommerce, Apple Pay, Google Pay
- **Social (11)**: Facebook, Twitter, LinkedIn, Instagram, Pinterest, TikTok, Snapchat, Discord, Slack, WhatsApp
- **Video (8)**: YouTube, Vimeo, Twitch, Zoom, Microsoft Teams, Google Meet, Jitsi Meet, BigBlueButton
- **Chat (6)**: Drift, Intercom, Zendesk, Tawk.to, Freshchat, Crisp Chat
- **CDN (8)**: jsDelivr, cdnjs, unpkg, AWS CloudFront, Azure CDN, KeyCDN, MaxCDN, Fastly
- **Forms (9)**: Typeform, Calendly, HubSpot, Mailchimp, Mailgun, SendGrid, Constant Contact, Campaign Monitor, ConvertKit
- **Maps (3)**: Google Maps, Mapbox, OpenStreetMap/Leaflet
- **Testing (5)**: BrowserStack, Sauce Labs, Percy, Ghost Inspector, Cypress
- **Advertising (5)**: Google Ads, Facebook Ads, Twitter Ads, LinkedIn Ads, Microsoft Ads
- **Authentication (5)**: Auth0, Okta, Firebase Auth, OneLogin, Ping Identity
- **Website Builders (5)**: Squarespace, Wix, Webflow, Elementor, Divi
- **E-Learning (5)**: Teachable, Thinkific, Udemy, GitBook, Notion
- **A/B Testing (5)**: Optimizely, VWO, Google Optimize, Unbounce, Crazy Egg
- **Search (5)**: Algolia, Elasticsearch, Swiftype, Klevu, Constructor
- **Content Management (5)**: WordPress, Drupal, Contentful, Strapi, Sanity
- **Monitoring (3)**: Sentry, New Relic, Datadog
- **Other**: Google Fonts and other specialized services
