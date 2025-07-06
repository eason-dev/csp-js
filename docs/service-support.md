# Service Support

CSP Kit supports **106+ popular web services** across all major categories. This page provides a comprehensive overview of supported services and how to request new ones.

## 🎯 Quick Service Lookup

### 🔍 **Find Services**

| Method | Best For |
|--------|----------|
| **[🌐 Browse All Services](https://csp-kit.eason.ch/services)** | Visual exploration with categories |
| **[🔍 Interactive Search](https://csp-kit.eason.ch)** | Quick service lookup |
| **[📋 Full List Below](#complete-service-list)** | Reference documentation |

### 💻 **Programmatic Access**

```javascript
import { searchServices, getServicesByCategory } from '@csp-kit/generator';

// Search services
const results = await searchServices('analytics');
console.log(results.map(s => s.id));

// Get by category
const analyticsServices = await getServicesByCategory('analytics');
```

## 📊 Service Categories

### 📈 **Analytics & Tracking (12+ services)**

Monitor user behavior and site performance.

| Service | ID | Popular Features |
|---------|----|--------------------|
| **Google Analytics** | `google-analytics` | Universal Analytics, GA4 |
| **Google Tag Manager** | `google-tag-manager` | Tag management |
| **Mixpanel** | `mixpanel` | Event tracking |
| **Hotjar** | `hotjar` | Heatmaps, recordings |
| **Segment** | `segment` | Customer data platform |
| **Amplitude** | `amplitude` | Product analytics |
| **Microsoft Clarity** | `microsoft-clarity` | User behavior analytics |
| **Plausible Analytics** | `plausible-analytics` | Privacy-focused analytics |
| **Fathom Analytics** | `fathom-analytics` | Simple analytics |
| **Adobe Analytics** | `adobe-analytics` | Enterprise analytics |
| **Cloudflare Analytics** | `cloudflare-analytics` | Web analytics |

**Common CSP requirements:**
- `script-src`: Analytics JavaScript
- `img-src`: Tracking pixels
- `connect-src`: Data collection APIs

### 💳 **Payment Processing (8+ services)**

Secure payment and e-commerce solutions.

| Service | ID | Integration Type |
|---------|----|--------------------|
| **Stripe** | `stripe` | Payment processing |
| **PayPal** | `paypal` | Payment gateway |
| **Square** | `square` | Point of sale |
| **Shopify** | `shopify` | E-commerce platform |
| **Apple Pay** | `apple-pay` | Mobile payments |
| **Google Pay** | `google-pay` | Digital wallet |

**Common CSP requirements:**
- `script-src`: Payment widgets
- `frame-src`: Payment forms
- `connect-src`: Payment APIs

### 📱 **Social Media (15+ services)**

Social widgets, login, and sharing.

| Service | ID | Widget Types |
|---------|----|--------------------|
| **Facebook** | `facebook` | Like buttons, comments, login |
| **Twitter** | `twitter` | Tweet embeds, follow buttons |
| **LinkedIn** | `linkedin` | Share buttons, login |
| **Instagram** | `instagram` | Photo embeds |
| **YouTube** | `youtube` | Video embeds |
| **TikTok** | `tiktok` | Video embeds |
| **Pinterest** | `pinterest` | Pin buttons |
| **Discord** | `discord` | Server widgets |
| **Snapchat** | `snapchat` | Snap Pixel |

**Common CSP requirements:**
- `frame-src`: Social embeds
- `script-src`: Social widgets
- `img-src`: Social media content

### 📝 **Forms & Communication (10+ services)**

Form builders, surveys, and email tools.

| Service | ID | Primary Use |
|---------|----|--------------------|
| **Typeform** | `typeform` | Interactive forms |
| **Calendly** | `calendly` | Scheduling |
| **Mailchimp** | `mailchimp` | Email marketing |
| **ConvertKit** | `convertkit` | Email automation |
| **Campaign Monitor** | `campaign-monitor` | Email campaigns |
| **Constant Contact** | `constant-contact` | Email marketing |
| **SendGrid** | `sendgrid` | Email delivery |
| **Mailgun** | `mailgun` | Email API |

### 💬 **Chat & Support (8+ services)**

Customer support and communication.

| Service | ID | Features |
|---------|----|--------------------|
| **Intercom** | `intercom` | Customer messaging |
| **Zendesk** | `zendesk` | Help desk |
| **Crisp Chat** | `crisp-chat` | Live chat |
| **Tawk.to** | `tawk-to` | Free live chat |
| **Drift** | `drift` | Conversational marketing |
| **Freshchat** | `freshchat` | Customer messaging |

### 🎥 **Media & Content (6+ services)**

Video hosting and media delivery.

| Service | ID | Content Type |
|---------|----|--------------------|
| **YouTube** | `youtube` | Video hosting |
| **Vimeo** | `vimeo` | Video hosting |
| **Twitch** | `twitch` | Live streaming |
| **Spotify** | `spotify` | Music streaming |

### 🌐 **CDN & Infrastructure (12+ services)**

Content delivery and web fonts.

| Service | ID | Service Type |
|---------|----|--------------------|
| **Google Fonts** | `google-fonts` | Web fonts |
| **jsDelivr** | `jsdelivr` | JavaScript CDN |
| **unpkg** | `unpkg` | NPM package CDN |
| **cdnjs** | `cdnjs` | JavaScript libraries |
| **Cloudflare** | `cloudflare` | CDN and security |
| **Fastly** | `fastly` | CDN |
| **AWS CloudFront** | `aws-cloudfront` | CDN |
| **Azure CDN** | `azure-cdn` | CDN |
| **KeyCDN** | `keycdn` | CDN |
| **MaxCDN** | `maxcdn` | CDN |

### 🗺️ **Maps & Location (4+ services)**

Mapping and geolocation services.

| Service | ID | Features |
|---------|----|--------------------|
| **Google Maps** | `google-maps` | Interactive maps |
| **Mapbox** | `mapbox` | Custom maps |
| **OpenStreetMap + Leaflet** | `openstreetmap-leaflet` | Open source maps |

### 🧪 **Testing & Optimization (15+ services)**

A/B testing, monitoring, and development tools.

| Service | ID | Purpose |
|---------|----|--------------------|
| **Optimizely** | `optimizely` | A/B testing |
| **VWO** | `vwo` | Conversion optimization |
| **Google Optimize** | `google-optimize` | A/B testing |
| **Sentry** | `sentry` | Error tracking |
| **New Relic** | `new-relic` | Application monitoring |
| **Datadog** | `datadog` | Infrastructure monitoring |
| **Cypress** | `cypress` | End-to-end testing |
| **BrowserStack** | `browserstack` | Cross-browser testing |
| **Sauce Labs** | `sauce-labs` | Testing platform |
| **Percy** | `percy` | Visual testing |
| **Ghost Inspector** | `ghost-inspector` | Automated testing |

### 🛍️ **E-commerce (8+ services)**

Online store platforms and tools.

| Service | ID | Platform Type |
|---------|----|--------------------|
| **Shopify** | `shopify` | E-commerce platform |
| **WooCommerce** | `woocommerce` | WordPress e-commerce |
| **Squarespace** | `squarespace` | Website builder |
| **Wix** | `wix` | Website builder |
| **Webflow** | `webflow` | Design platform |

### 🔧 **Other Services (28+ services)**

Authentication, productivity, and specialized tools.

| Service | ID | Category |
|---------|----|--------------------|
| **Auth0** | `auth0` | Authentication |
| **Firebase** | `firebase-auth` | Backend services |
| **Okta** | `okta` | Identity management |
| **OneLogin** | `onelogin` | SSO platform |
| **Ping Identity** | `ping-identity` | Identity security |
| **Slack** | `slack` | Team communication |
| **Microsoft Teams** | `microsoft-teams` | Collaboration |
| **Zoom** | `zoom` | Video conferencing |
| **Notion** | `notion` | Productivity |
| **Contentful** | `contentful` | Headless CMS |
| **Sanity** | `sanity` | Content platform |
| **Strapi** | `strapi` | Headless CMS |

## ➕ Request New Services

### 🚀 **Quick Service Request**

**[👉 Request via Web Interface](https://csp-kit.eason.ch/request-service)** *(Recommended)*

- ✅ Interactive form with guidance
- ✅ Automatic CSP analysis
- ✅ Progress tracking
- ✅ Mobile-friendly

### 📋 **Alternative Methods**

| Method | Best For | Time to Process |
|--------|----------|-----------------|
| **[GitHub Issues](https://github.com/eason-dev/csp-kit/issues/new?template=add-service.md)** | Detailed requests | 1-2 weeks |
| **[CLI Contribution](./cli-guide.md#contributing-a-new-service)** | Developer contributors | 3-5 days |
| **[Manual PR](./contributing.md#-adding-a-new-service)** | Advanced contributors | 1-3 days |

### 📝 **Service Request Requirements**

To add a new service, we need:

1. **Service Information**
   - Official website and documentation
   - Description of what the service does
   - How it's typically integrated

2. **CSP Requirements**
   - What domains the service loads from
   - Which CSP directives are needed
   - Any special requirements (nonce, etc.)

3. **Testing Information**
   - Test URLs where the service is implemented
   - Integration examples or demos

### 🏃‍♂️ **Priority Services**

We prioritize services based on:

| Factor | Weight |
|--------|--------|
| **Popularity** | High usage across web |
| **Community requests** | GitHub issues and votes |
| **CSP complexity** | Services that need CSP help |
| **Maintenance burden** | Stable, well-documented services |

**Current high-priority requests:**
- Microsoft services (Teams, Office)
- Popular WordPress plugins
- New social media platforms
- Emerging payment providers

## 🔄 Service Updates

### 📈 **Update Frequency**

Services are updated when:
- **CSP requirements change** (immediate update)
- **New features are added** (weekly review)
- **Security updates** (immediate update)
- **Community reports issues** (within 48 hours)

### 🤖 **Automated Monitoring**

Many services include automated monitoring:
- **Weekly checks** of CSP requirements
- **GitHub Actions** for change detection
- **Community notifications** when updates are needed
- **Automatic PRs** for simple updates

### 📞 **Report Service Issues**

Found a service that's out of date?

**[🐛 Report Service Issue](https://github.com/eason-dev/csp-kit/issues/new?template=update-service.md)**

Include:
- Service name and ID
- What's not working
- Current CSP requirements (if known)
- Test URLs showing the issue

## 📊 Service Statistics

### 📈 **Growth Stats**

- **106+ total services** (as of July 2024)
- **~5-10 new services** added monthly
- **~20-30 service updates** per month
- **99% uptime** for service database

### 🔝 **Most Popular Services**

Based on usage in the web interface and API:

1. **Google Analytics** - Universal web analytics
2. **Stripe** - Payment processing
3. **Google Fonts** - Web typography
4. **YouTube** - Video embeds
5. **Google Tag Manager** - Tag management
6. **Intercom** - Customer messaging
7. **Typeform** - Interactive forms
8. **Hotjar** - User behavior analytics
9. **Mailchimp** - Email marketing
10. **Facebook** - Social widgets

### 📦 **Service Categories Distribution**

```
Other: 28 services (26%)
Analytics: 12 services (11%)
Testing: 15 services (14%)
Social: 15 services (14%)
CDN: 12 services (11%)
Forms: 10 services (9%)
E-commerce: 8 services (8%)
Chat: 8 services (8%)
Payment: 6 services (6%)
Media: 6 services (6%)
Maps: 4 services (4%)
```

## 🔮 Future Plans

### 🚀 **Coming Soon**

- **AI-powered service detection** - Automatically detect services from codebases
- **Enhanced monitoring** - Real-time CSP requirement changes
- **Service recommendations** - Suggest related services
- **Regional variations** - Support for geo-specific requirements
- **Enterprise services** - B2B and internal service support

### 💡 **Long-term Vision**

- **Universal coverage** - Support for all major web services
- **Real-time updates** - Instant updates when services change
- **Community governance** - Community-driven service priorities
- **Integration ecosystem** - Deep framework and platform integration

---

## 🙏 Community Contributions

Service support is driven by our amazing community:

- **🥇 Top Contributors**: Users who've added 10+ services
- **🥈 Regular Contributors**: Users who maintain service definitions
- **🥉 First-time Contributors**: New community members

**Want to contribute?** Start with our [Contributing Guide](./contributing.md)!

---

## 📚 Related Resources

- **[Getting Started](./getting-started.md)** - Learn to use CSP Kit
- **[Contributing](./contributing.md)** - Help add new services
- **[CLI Guide](./cli-guide.md)** - Use CLI tools for service management
- **[Web Interface](./web-interface.md)** - Browse services visually