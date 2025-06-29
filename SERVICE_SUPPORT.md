# 📋 Service Support

## Currently Supported Services

| Service | Versions | Category | Auto-Monitoring |
|---------|----------|----------|-----------------|
| Google Analytics | 4.0.0, 4.1.0 | Analytics | ✅ |
| Microsoft Clarity | 1.0.0 | Analytics | ✅ |
| Typeform | 1.0.0 | Forms | ✅ |
| Google Tag Manager | 1.0.0 | Analytics | ✅ |
| Google Fonts | 1.0.0 | Fonts | ✅ |
| YouTube | 1.0.0 | Video | ✅ |

## Request New Services

We're always adding new services! To request support for a service:

1. [Create an issue](https://github.com/eason-dev/csp-js/issues/new?template=add-service.yml) using our service request template
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

- **Analytics**: Google Analytics, Microsoft Clarity, Adobe Analytics
- **Payment**: Stripe, PayPal, Square
- **Social**: Facebook Pixel, Twitter, LinkedIn
- **Forms**: Typeform, Google Forms, JotForm
- **Chat**: Intercom, Zendesk, Crisp
- **And more**: CDN, Fonts, Maps, Video, Testing, Monitoring