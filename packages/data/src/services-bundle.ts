// This file is auto-generated. Do not edit manually.
// Generated at: 2025-07-05T09:37:22.983Z
// Source: packages/data/scripts/generate-services-bundle.ts

import type { ServiceDefinition } from './types.js';

/**
 * Prebuilt services data for production environments where filesystem access is limited.
 * This is used as a fallback when loading services from JSONC files fails.
 */
export const PREBUILT_SERVICES: Record<string, ServiceDefinition> = {
  "adobe-analytics": {
    "id": "adobe-analytics",
    "name": "Adobe Analytics",
    "category": "analytics",
    "description": "Enterprise web analytics and digital marketing suite by Adobe",
    "website": "https://business.adobe.com/products/analytics/adobe-analytics.html",
    "officialDocs": [
      "https://experienceleague.adobe.com/docs/analytics/implementation/js/overview.html",
      "https://experienceleague.adobe.com/en/docs/id-service/using/reference/csp",
      "https://experienceleague.adobe.com/en/docs/experience-platform/tags/client-side/content-security-policy"
    ],
    "cspDirectives": {
      "script-src": [
        "https://assets.adobedtm.com",
        "https://*.adobe.com"
      ],
      "connect-src": [
        "https://*.2o7.net",
        "https://*.omtrdc.net",
        "https://*.demdex.net",
        "https://*.adobe.com",
        "https://*.omniture.com",
        "https://*.adobedc.net"
      ],
      "img-src": [
        "https://*.2o7.net",
        "https://*.omtrdc.net",
        "https://*.demdex.net",
        "https://*.adobe.com",
        "https://*.omniture.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": true,
    "notes": "Adobe Analytics verified against official Experience League CSP documentation. Requires *.adobe.com for Activity Map, assets.adobedtm.com for tag management, *.demdex.net for Experience Cloud Identity Service, and legacy *.omniture.com domains. Adobe recommends nonce-based CSP over 'unsafe-inline'. *.adobedc.net required for Experience Platform integration.",
    "aliases": [
      "adobe-launch",
      "adobe-tags"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "algolia": {
    "id": "algolia",
    "name": "Algolia",
    "category": "other",
    "description": "Search and discovery API platform for websites and applications",
    "website": "https://www.algolia.com/",
    "officialDocs": [
      "https://support.algolia.com/hc/en-us/articles/8947249849873-How-do-I-fix-Content-Security-Policy-CSP-errors-on-my-site",
      "https://www.algolia.com/doc/guides/security/security-best-practices/"
    ],
    "cspDirectives": {
      "script-src": [
        "https://cdn.jsdelivr.net"
      ],
      "connect-src": [
        "https://*.algolia.net",
        "https://*.algolianet.com",
        "https://*.algolia.io"
      ],
      "style-src": [
        "'unsafe-inline'"
      ]
    },
    "requiresDynamic": true,
    "requiresNonce": false,
    "notes": "Algolia verified from official CSP documentation. Requires *.algolia.net, *.algolianet.com, *.algolia.io for API connections. InstantSearch with insights needs cdn.jsdelivr.net for search-insights library. Some InstantSearch versions may require 'unsafe-eval' for JavaScript evaluation. Application-specific subdomains require wildcard permissions.",
    "aliases": [
      "algolia-search"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "amplitude": {
    "id": "amplitude",
    "name": "Amplitude",
    "category": "analytics",
    "description": "Digital analytics platform for tracking user behavior and product usage",
    "website": "https://amplitude.com",
    "officialDocs": [
      "https://www.docs.developers.amplitude.com/data/sdks/browser-2/",
      "https://www.docs.developers.amplitude.com/guides/cookies-consent-mgmt-guide/"
    ],
    "cspDirectives": {
      "script-src": [
        "https://*.amplitude.com"
      ],
      "connect-src": [
        "https://*.amplitude.com"
      ],
      "img-src": [
        "https://*.amplitude.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Amplitude verified against official Browser SDK 2.0 documentation. Requires *.amplitude.com wildcard for script loading and API connections. Covers all Amplitude subdomains including api2.amplitude.com for events, api-secure.amplitude.com for session replay, and cdn.amplitude.com for SDK delivery.",
    "aliases": [
      "amplitude-analytics"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "apple-pay": {
    "id": "apple-pay",
    "name": "Apple Pay",
    "category": "payment",
    "description": "Apple's digital payment and digital wallet service",
    "website": "https://developer.apple.com/apple-pay/",
    "officialDocs": [
      "https://developer.apple.com/documentation/applepayontheweb/apple-pay-js-api",
      "https://developer.apple.com/documentation/applepayontheweb/displaying-apple-pay-buttons-using-javascript"
    ],
    "cspDirectives": {
      "script-src": [
        "https://applepay.cdn-apple.com"
      ],
      "connect-src": [
        "https://apple-pay-gateway.apple.com"
      ],
      "frame-src": [
        "https://applepay.cdn-apple.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Apple Pay verified from official JavaScript API documentation. Requires applepay.cdn-apple.com for SDK and iframe content, apple-pay-gateway.apple.com for merchant validation. SDK requires crossorigin attribute. Domain verification through Apple Developer Portal required. TLS 1.2+ with specific cipher suites mandatory.",
    "aliases": [
      "applepay"
    ],
    "lastUpdated": "2025-06-29T00:00:00Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "auth0": {
    "id": "auth0",
    "name": "Auth0",
    "category": "other",
    "description": "Identity platform for developers and enterprise security",
    "website": "https://auth0.com/",
    "officialDocs": [
      "https://auth0.com/blog/defending-against-xss-with-csp/",
      "https://auth0.com/blog/deploying-csp-in-spa/",
      "https://auth0.com/blog/from-zero-to-hero-with-csp/",
      "https://auth0.com/docs/libraries/auth0-single-page-app-sdk",
      "https://auth0.com/docs/troubleshoot/product-lifecycle/past-migrations/clickjacking-protection-for-universal-login"
    ],
    "cspDirectives": {
      "script-src": [
        "https://cdn.auth0.com"
      ],
      "connect-src": [
        "https://*.auth0.com"
      ],
      "frame-src": [
        "https://*.auth0.com"
      ]
    },
    "requiresDynamic": true,
    "requiresNonce": false,
    "notes": "Auth0 verified from comprehensive official CSP documentation. New Universal Login automatically sets frame-ancestors: 'none' and X-Frame-Options: deny (cannot be disabled). SPA SDK uses Web Workers - configure separate worker file to avoid blob CSP issues. Requires connect-src for tenant domain. Form-action should be 'none' for SPAs. CSP-Report-Only recommended for testing.",
    "aliases": [
      "auth0-identity"
    ],
    "lastUpdated": "2024-06-29T00:00:00.000Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "aws-cloudfront": {
    "id": "aws-cloudfront",
    "name": "AWS CloudFront",
    "category": "cdn",
    "description": "Amazon Web Services content delivery network",
    "website": "https://aws.amazon.com/cloudfront/",
    "officialDocs": [
      "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudfront-responseheaderspolicy-contentsecuritypolicy.html",
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/example_cloudfront_functions_add_security_headers_section.html"
    ],
    "cspDirectives": {
      "script-src": [
        "https://*.cloudfront.net"
      ],
      "connect-src": [
        "https://*.cloudfront.net"
      ],
      "img-src": [
        "https://*.cloudfront.net"
      ],
      "style-src": [
        "https://*.cloudfront.net"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "AWS CloudFront verified from official documentation. CSP headers configured via Response Headers Policies (recommended), CloudFront Functions, or Lambda@Edge. CloudFormation ContentSecurityPolicy resource available. CSP header limited to 1784 characters (can be raised via support ticket). Managed and custom response header policies supported. Multiple implementation methods: console, CLI, CloudFormation, API.",
    "aliases": [
      "cloudfront"
    ],
    "lastUpdated": "2025-06-29T00:00:00Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "azure-cdn": {
    "id": "azure-cdn",
    "name": "Azure CDN",
    "category": "cdn",
    "description": "Microsoft Azure content delivery network",
    "website": "https://azure.microsoft.com/en-us/services/cdn/",
    "officialDocs": [
      "https://learn.microsoft.com/en-us/azure/frontdoor/front-door-security-headers",
      "https://learn.microsoft.com/en-us/azure/api-management/"
    ],
    "cspDirectives": {
      "script-src": [
        "https://*.azureedge.net"
      ],
      "connect-src": [
        "https://*.azureedge.net"
      ],
      "img-src": [
        "https://*.azureedge.net"
      ],
      "style-src": [
        "https://*.azureedge.net"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Azure CDN verified from official Microsoft documentation. CSP headers configured via Azure Front Door Rules Engine. API Management has CSP and CORS configuration support. SharePoint Framework with Azure CDN deployment guidance available. Power Pages provides CSP management documentation. Rules Engine allows CSP header configuration for trusted script sources.",
    "aliases": [
      "azure-content-delivery"
    ],
    "lastUpdated": "2025-06-29T00:00:00Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "bigbluebutton": {
    "id": "bigbluebutton",
    "name": "BigBlueButton",
    "category": "video",
    "description": "Open-source web conferencing system for distance education",
    "website": "https://bigbluebutton.org",
    "officialDocs": [
      "https://docs.bigbluebutton.org/",
      "https://docs.bigbluebutton.org/dev/api.html"
    ],
    "cspDirectives": {
      "script-src": [
        "https://*.bigbluebutton.org"
      ],
      "frame-src": [
        "https://*.bigbluebutton.org"
      ],
      "connect-src": [
        "https://*.bigbluebutton.org",
        "wss://*.bigbluebutton.org"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "BigBlueButton verified from community documentation and GitHub issues. Limited official CSP documentation available. iframe embedding requires SSL for WebRTC (camera, microphone, screen sharing). X-Frame-Options set to SAMEORIGIN by default in Greenlight. iframe needs allow permissions for geolocation, microphone, camera, display-capture. WebSocket connections required for real-time communication. iframe embedding not supported by default - may need provider request.",
    "aliases": [
      "bbb"
    ],
    "lastUpdated": "2025-06-29T00:00:00Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "browserstack": {
    "id": "browserstack",
    "name": "BrowserStack",
    "category": "testing",
    "description": "Cross-browser testing platform for web and mobile applications",
    "website": "https://www.browserstack.com",
    "officialDocs": [
      "https://www.browserstack.com/docs/percy/common-issue/handling-csp",
      "https://www.browserstack.com/docs/enterprise/domain-verification",
      "https://www.browserstack.com/docs/live/local-testing"
    ],
    "cspDirectives": {
      "script-src": [
        "https://www.browserstack.com"
      ],
      "connect-src": [
        "https://api.browserstack.com",
        "https://hub-cloud.browserstack.com"
      ],
      "frame-src": [
        "https://www.browserstack.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "BrowserStack verified from official documentation. Testing platform recommends disabling CSP for precise screenshots, then re-enabling for security. Enterprise domain controls available for IP whitelisting. Iframe content capture may require CORS header adjustments. Official CSP domain list should be requested from BrowserStack support.",
    "aliases": [
      "bs"
    ],
    "lastUpdated": "2025-06-29T00:00:00Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "calendly": {
    "id": "calendly",
    "name": "Calendly",
    "category": "forms",
    "description": "Scheduling software for appointments and meetings",
    "website": "https://calendly.com",
    "officialDocs": [
      "https://developer.calendly.com/docs/embed-options-overview",
      "https://help.calendly.com/hc/en-us/articles/360020052833-Advanced-embed-options"
    ],
    "cspDirectives": {
      "script-src": [
        "https://assets.calendly.com"
      ],
      "frame-src": [
        "https://calendly.com"
      ],
      "style-src": [
        "https://assets.calendly.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Calendly verified from official embed documentation. Uses iframe by default for popup integrations. JavaScript widget loads from assets.calendly.com. Advanced embed options available for developers. Child-src may also be required for iframe compatibility. Direct iframe embedding supported with simple frame-src allowlist.",
    "aliases": [
      "calendly-widget"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "campaign-monitor": {
    "id": "campaign-monitor",
    "name": "Campaign Monitor",
    "category": "other",
    "description": "Email marketing platform with design tools and automation",
    "website": "https://www.campaignmonitor.com/",
    "officialDocs": [
      "https://www.campaignmonitor.com/api/",
      "https://help.campaignmonitor.com/s/article/html-signup-forms"
    ],
    "cspDirectives": {
      "script-src": [
        "https://campaignmonitor.com",
        "https://www.campaignmonitor.com"
      ],
      "frame-src": [
        "https://campaignmonitor.com",
        "https://www.campaignmonitor.com"
      ],
      "connect-src": [
        "https://api.createsend.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Campaign Monitor verified from official API and HTML signup forms documentation. External session API used as iframe source for embedding within applications. HTML signup forms can be embedded on websites. Recommends linking to forms in emails rather than embedding for reliability. No specific official CSP documentation found - contact support for detailed requirements. Uses CreateSend API for backend operations.",
    "aliases": [
      "createsend"
    ],
    "lastUpdated": "2024-06-29T00:00:00.000Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "cdnjs": {
    "id": "cdnjs",
    "name": "cdnjs",
    "category": "cdn",
    "description": "Free and open-source CDN service powered by Cloudflare",
    "website": "https://cdnjs.com",
    "officialDocs": [
      "https://cdnjs.com/about",
      "https://cdnjs.com/libraries",
      "https://developers.cloudflare.com/fundamentals/reference/policies-compliances/content-security-policies/"
    ],
    "cspDirectives": {
      "script-src": [
        "https://cdnjs.cloudflare.com"
      ],
      "style-src": [
        "https://cdnjs.cloudflare.com"
      ],
      "font-src": [
        "https://cdnjs.cloudflare.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "CDNJS verified from official Cloudflare CSP documentation. Free and open-source CDN powered by Cloudflare. Supports nonce-based CSP with automatic script injection. Potential path traversal security concerns with '../' bypasses. Page Shield abstraction available for easier CSP management. Compatible with CSP headers via Transform Rules or _headers files.",
    "aliases": [
      "cdnjs-cloudflare"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "cloudflare-analytics": {
    "id": "cloudflare-analytics",
    "name": "Cloudflare Analytics",
    "category": "analytics",
    "description": "Web analytics service by Cloudflare with privacy focus",
    "website": "https://cloudflare.com/web-analytics/",
    "officialDocs": [
      "https://developers.cloudflare.com/fundamentals/reference/policies-compliances/content-security-policies/",
      "https://support.cloudflare.com/hc/en-us/articles/216537517-What-is-Content-Security-Policy-CSP-and-how-can-I-use-it-with-CloudFlare-"
    ],
    "cspDirectives": {
      "script-src": [
        "https://static.cloudflareinsights.com"
      ],
      "connect-src": [
        "https://cloudflareinsights.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Cloudflare Analytics verified from official CSP documentation. Requires static.cloudflareinsights.com for script loading and cloudflareinsights.com for data reporting. CSP integration with Cloudflare features requires proper nonce support and /cdn-cgi/challenge-platform/ allowlisting.",
    "aliases": [
      "cf-analytics",
      "cloudflare-insights"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "constant-contact": {
    "id": "constant-contact",
    "name": "Constant Contact",
    "category": "other",
    "description": "Email marketing and campaign management platform",
    "website": "https://www.constantcontact.com/",
    "officialDocs": [
      "https://knowledgebase.constantcontact.com/lead-gen-crm/articles/KnowledgeBase/50227-Using-Form-Embed-Codes",
      "https://developer.constantcontact.com/api_reference/index.html"
    ],
    "cspDirectives": {
      "script-src": [
        "https://imgssl.constantcontact.com"
      ],
      "frame-src": [
        "https://lp.constantcontactpages.com"
      ],
      "connect-src": [
        "https://api.constantcontact.com"
      ],
      "img-src": [
        "https://imgssl.constantcontact.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Constant Contact verified from official documentation and community forums. IMPORTANT: Embed codes for forms no longer available as of recent updates. Some pages refuse iframe connections due to security headers and Terms of Use restrictions. Embeddable forms available via lp.constantcontactpages.com domain. New inline and pop-up signup forms recommended. No specific official CSP documentation found - contact support for requirements.",
    "aliases": [
      "constantcontact"
    ],
    "lastUpdated": "2024-06-29T00:00:00.000Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "constructor": {
    "id": "constructor",
    "name": "Constructor",
    "category": "other",
    "description": "Product search and discovery platform for e-commerce",
    "website": "https://constructor.io/",
    "officialDocs": [
      "https://docs.constructor.io/",
      "https://docs.constructor.io/build/integration-guides/javascript-client/"
    ],
    "cspDirectives": {
      "script-src": [
        "https://cnstrc.com"
      ],
      "connect-src": [
        "https://ac.cnstrc.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Constructor.io configuration based on general documentation - no specific CSP documentation found. cnstrc.com hosts JavaScript files and custom bundles. ac.cnstrc.com used for API endpoints including collections, search, autocomplete, browse, and recommendations. Contact Constructor.io support for complete CSP requirements.",
    "aliases": [
      "constructor-io"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "contentful": {
    "id": "contentful",
    "name": "Contentful",
    "category": "other",
    "description": "API-first headless content management system",
    "website": "https://contentful.com",
    "officialDocs": [
      "https://www.contentful.com/developers/docs/experiences/troubleshooting/",
      "https://www.contentful.com/blog/contentful-studio-experiences-sdk/"
    ],
    "cspDirectives": {
      "connect-src": [
        "https://cdn.contentful.com",
        "https://cdn.eu.contentful.com",
        "https://preview.contentful.com",
        "https://graphql.contentful.com"
      ],
      "img-src": [
        "https://assets.ctfassets.net",
        "https://images.ctfassets.net",
        "https://videos.ctfassets.net",
        "https://downloads.ctfassets.net",
        "https://images.secure.ctfassets.net",
        "https://assets.secure.ctfassets.net",
        "https://videos.secure.ctfassets.net",
        "https://downloads.secure.ctfassets.net"
      ],
      "frame-src": [
        "https://app.contentful.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Contentful verified against official troubleshooting and SDK documentation. Requires app.contentful.com for Studio experiences, cdn.contentful.com for content delivery, and both regular and secure ctfassets.net domains for asset hosting. EU customers use cdn.eu.contentful.com endpoint.",
    "aliases": [
      "contentful-cms"
    ],
    "lastUpdated": "2025-06-29T00:00:00Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "convertkit": {
    "id": "convertkit",
    "name": "ConvertKit",
    "category": "other",
    "description": "Email marketing platform designed for creators and bloggers",
    "website": "https://convertkit.com/",
    "officialDocs": [
      "https://developers.kit.com/v3",
      "https://help.kit.com/en/articles/4009572-form-embedding-basics"
    ],
    "cspDirectives": {
      "script-src": [
        "https://convertkit.com",
        "https://app.convertkit.com"
      ],
      "connect-src": [
        "https://api.convertkit.com",
        "https://app.convertkit.com"
      ],
      "form-action": [
        "https://app.convertkit.com"
      ],
      "frame-src": [
        "https://app.convertkit.com"
      ],
      "img-src": [
        "https://convertkit.com",
        "https://app.convertkit.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "ConvertKit (now Kit) verified from official embedding documentation. JavaScript embed recommended over HTML for automatic updates. Forms submit to app.convertkit.com domain. API base URL: api.convertkit.com/v3/. React and Svelte libraries available on GitHub. No specific official CSP documentation found - test with Content-Security-Policy-Report-Only header first. Requires form-action directive for form submissions.",
    "aliases": [
      "ck"
    ],
    "lastUpdated": "2024-06-29T00:00:00.000Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "crazy-egg": {
    "id": "crazy-egg",
    "name": "Crazy Egg",
    "category": "other",
    "description": "Heatmap and user behavior analytics platform",
    "website": "https://www.crazyegg.com/",
    "officialDocs": [
      "https://support.crazyegg.com/hc/en-us/articles/115003890728-Content-Security-Policy-CSP-",
      "https://www.crazyegg.com/help/"
    ],
    "cspDirectives": {
      "script-src": [
        "https://script.crazyegg.com"
      ],
      "style-src": [
        "'unsafe-inline'"
      ],
      "connect-src": [
        "https://crazyegg.com"
      ],
      "img-src": [
        "https://crazyegg.com"
      ]
    },
    "requiresDynamic": true,
    "requiresNonce": false,
    "notes": "Crazy Egg verified from official CSP documentation. Requires script.crazyegg.com for tracking scripts and crazyegg.com for data collection. Heatmap overlays may require 'unsafe-inline' styles for dynamic visualization. Recording features may need additional permissions.",
    "aliases": [
      "crazyegg"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "crisp-chat": {
    "id": "crisp-chat",
    "name": "Crisp Chat",
    "category": "chat",
    "description": "Customer messaging platform with live chat, chatbots, and helpdesk",
    "website": "https://crisp.chat",
    "officialDocs": [
      "https://docs.crisp.chat/guides/chatbox-sdks/web-sdk/",
      "https://help.crisp.chat/en/article/how-to-use-crisp-chatbox-javascript-sdk-10ud15y/"
    ],
    "cspDirectives": {
      "script-src": [
        "https://client.crisp.chat"
      ],
      "connect-src": [
        "wss://client.crisp.chat",
        "https://client.crisp.chat"
      ],
      "frame-src": [
        "https://client.crisp.chat"
      ],
      "img-src": [
        "https://client.crisp.chat",
        "https://image.crisp.chat"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Crisp chat widget with WebSocket support",
    "aliases": [
      "crisp"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "cypress": {
    "id": "cypress",
    "name": "Cypress",
    "category": "testing",
    "description": "End-to-end testing framework for web applications",
    "website": "https://www.cypress.io",
    "officialDocs": [
      "https://docs.cypress.io/app/references/content-security-policy",
      "https://docs.cypress.io/guides/guides/content-security-policy",
      "https://docs.cypress.io/app/references/experiments"
    ],
    "cspDirectives": {
      "script-src": [
        "https://download.cypress.io",
        "'unsafe-eval'"
      ],
      "connect-src": [
        "https://api.cypress.io",
        "https://dashboard.cypress.io"
      ]
    },
    "requiresDynamic": true,
    "requiresNonce": false,
    "notes": "Cypress verified from official documentation. Testing framework that requires script injection for DOM interaction. By default, Cypress strips CSP headers to prevent blocking. Use experimentalCspAllowList configuration for CSP testing. Requires 'unsafe-eval' for test execution. Document.domain injection discontinued in v14.0.0 - use cy.origin() for cross-origin testing.",
    "aliases": [
      "cy"
    ],
    "lastUpdated": "2025-06-29T00:00:00Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "datadog": {
    "id": "datadog",
    "name": "Datadog",
    "category": "monitoring",
    "description": "Monitoring and analytics platform for cloud applications",
    "website": "https://datadoghq.com",
    "officialDocs": [
      "https://docs.datadoghq.com/real_user_monitoring/browser/setup/",
      "https://docs.datadoghq.com/integrations/content_security_policy_logs/",
      "https://docs.datadoghq.com/real_user_monitoring/browser/troubleshooting/"
    ],
    "cspDirectives": {
      "script-src": [
        "https://www.datadoghq-browser-agent.com"
      ],
      "connect-src": [
        "https://browser-intake-datadoghq.com",
        "https://session-replay-datadoghq.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Datadog RUM (Real User Monitoring) browser agent. V5+ uses new intake domains. Worker compression may require additional CSP configuration.",
    "aliases": [
      "datadog-rum"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "discord": {
    "id": "discord",
    "name": "Discord",
    "category": "social",
    "description": "Discord chat platform with widget embeds and invites",
    "website": "https://discord.com",
    "officialDocs": [
      "https://discord.com/developers/docs/resources/widget",
      "https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks"
    ],
    "cspDirectives": {
      "script-src": [
        "https://discord.com"
      ],
      "frame-src": [
        "https://discord.com"
      ],
      "img-src": [
        "https://cdn.discordapp.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Discord verified from official widget documentation. Widget doesn't set CSP headers causing embedding problems. Activities require Discord proxy with URL mapping to bypass CSP restrictions. Chrome supports credentialless=\"true\" but Firefox doesn't. Community reports CSP compatibility issues with Activities - proxy server workarounds needed.",
    "aliases": [
      "discord-widget"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "divi": {
    "id": "divi",
    "name": "Divi",
    "category": "other",
    "description": "WordPress theme and visual page builder by Elegant Themes",
    "website": "https://www.elegantthemes.com/gallery/divi/",
    "officialDocs": [
      "https://www.elegantthemes.com/documentation/divi/",
      "https://github.com/elegantthemes/create-divi-extension/issues/328"
    ],
    "cspDirectives": {
      "script-src": [
        "https://elegantthemes.com",
        "'unsafe-inline'",
        "'unsafe-eval'"
      ],
      "style-src": [
        "https://elegantthemes.com",
        "'unsafe-inline'"
      ],
      "worker-src": [
        "blob:"
      ],
      "connect-src": [
        "https://elegantthemes.com"
      ],
      "img-src": [
        "https://elegantthemes.com",
        "data:"
      ]
    },
    "requiresDynamic": true,
    "requiresNonce": false,
    "notes": "Divi verified from GitHub issues and community reports. No official CSP documentation available. Known CSP compatibility issues - requires 'unsafe-inline' and 'unsafe-eval' for theme builder functionality. Worker-src blob: needed for bundle.js. Theme updates and third-party modules may need additional domains. Consider relaxed CSP for Divi pages.",
    "aliases": [
      "divi-theme",
      "elegant-themes"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "drift": {
    "id": "drift",
    "name": "Drift",
    "category": "chat",
    "description": "Conversational marketing platform with live chat and chatbots",
    "website": "https://drift.com",
    "officialDocs": [
      "https://devdocs.drift.com/docs/enabling-drift-in-your-apps-content-security-policy-csp",
      "https://devdocs.drift.com/docs/drift-javascript-api"
    ],
    "cspDirectives": {
      "script-src": [
        "https://js.driftt.com",
        "https://widget.drift.com"
      ],
      "frame-src": [
        "https://js.driftt.com",
        "https://widget.drift.com"
      ],
      "connect-src": [
        "wss://customer-api.drift.com",
        "https://drift.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Drift chat widget and conversational marketing platform. Requires js.driftt.com and widget.drift.com for both script and frame sources per official CSP documentation.",
    "aliases": [
      "drift-chat"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "drupal": {
    "id": "drupal",
    "name": "Drupal",
    "category": "other",
    "description": "Open-source content management framework",
    "website": "https://drupal.org",
    "officialDocs": [
      "https://www.drupal.org/project/csp",
      "https://www.drupal.org/docs/extending-drupal/contributed-modules/contributed-module-documentation/content-security-policy",
      "https://www.drupal.org/project/seckit"
    ],
    "cspDirectives": {
      "script-src": [
        "https://drupal.org"
      ],
      "connect-src": [
        "https://drupal.org",
        "https://updates.drupal.org"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Drupal verified from official CSP module documentation. Official Content-Security-Policy module provides comprehensive CSP management, reporting endpoint, Libraries API integration, admin interface with validation. Security Kit module available with basic CSP support. Report-Only mode recommended for safe configuration. Dynamic policy modification via csp.policy_alter events. HTTP Response Headers module for custom headers.",
    "aliases": [
      "drupal-cms"
    ],
    "lastUpdated": "2025-06-29T00:00:00Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "elasticsearch": {
    "id": "elasticsearch",
    "name": "Elasticsearch",
    "category": "other",
    "description": "Distributed search and analytics engine with Kibana visualization",
    "website": "https://www.elastic.co/elasticsearch/",
    "officialDocs": [
      "https://www.elastic.co/guide/en/kibana/current/Security-production-considerations.html",
      "https://www.elastic.co/guide/en/kibana/current/settings.html"
    ],
    "cspDirectives": {
      "script-src": [
        "'unsafe-eval'",
        "'self'"
      ],
      "worker-src": [
        "blob:",
        "'self'"
      ],
      "style-src": [
        "'unsafe-inline'",
        "'self'"
      ],
      "connect-src": [
        "https://*.elastic.co"
      ]
    },
    "requiresDynamic": true,
    "requiresNonce": false,
    "notes": "Elasticsearch/Kibana verified from official security documentation. Kibana uses CSP strict mode (csp.strict: true) to block browsers that don't enforce basic CSP. Requires 'unsafe-eval' and 'unsafe-inline' for functionality. Self-hosted instances need custom domain configuration. Elastic Cloud uses cluster-specific subdomains.",
    "aliases": [
      "elastic-search",
      "kibana"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "elementor": {
    "id": "elementor",
    "name": "Elementor",
    "category": "other",
    "description": "WordPress website builder and page builder plugin",
    "website": "https://elementor.com/",
    "officialDocs": [
      "https://elementor.com/help/requirements/",
      "https://github.com/elementor/elementor/issues/15192"
    ],
    "cspDirectives": {
      "script-src": [
        "https://elementor.com",
        "'unsafe-inline'"
      ],
      "frame-ancestors": [
        "'self'"
      ],
      "connect-src": [
        "https://my.elementor.com",
        "https://api.elementor.com"
      ],
      "img-src": [
        "https://elementor.com",
        "data:"
      ]
    },
    "requiresDynamic": true,
    "requiresNonce": false,
    "notes": "Elementor verified from system requirements and GitHub issues. Known CSP compatibility issues - requires 'unsafe-inline' for dynamic scripts. frame-ancestors must be 'self' (not 'none') for editor preview iframe. Pro version and widget libraries may need additional domains. Consider disabling strict CSP for Elementor pages.",
    "aliases": [
      "elementor-wordpress"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "facebook-ads": {
    "id": "facebook-ads",
    "name": "Facebook Ads",
    "category": "advertising",
    "description": "Facebook's advertising and marketing platform",
    "website": "https://www.facebook.com/business/ads",
    "officialDocs": [
      "https://developers.facebook.com/docs/meta-pixel/",
      "https://www.facebook.com/business/help/952192354843755"
    ],
    "cspDirectives": {
      "script-src": [
        "https://connect.facebook.net"
      ],
      "connect-src": [
        "https://www.facebook.com"
      ],
      "img-src": [
        "https://www.facebook.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Facebook Ads verified from community sources - official Meta developer documentation experiencing access issues. Facebook Pixel requires connect.facebook.net for script loading, www.facebook.com/tr/ for tracking endpoint. Noscript fallback uses img-src. Safari requires connect-src directive.",
    "aliases": [
      "fb-ads",
      "facebook-pixel",
      "meta-pixel"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "facebook": {
    "id": "facebook",
    "name": "Facebook",
    "category": "social",
    "description": "Facebook social media platform integration including Like buttons, Comments, and Login",
    "website": "https://facebook.com",
    "officialDocs": [
      "https://developers.facebook.com/docs/javascript/quickstart/",
      "https://developers.facebook.com/docs/plugins/"
    ],
    "cspDirectives": {
      "script-src": [
        "https://connect.facebook.net"
      ],
      "frame-src": [
        "https://www.facebook.com"
      ],
      "connect-src": [
        "https://www.facebook.com",
        "https://connect.facebook.net"
      ],
      "img-src": [
        "https://www.facebook.com",
        "https://scontent.xx.fbcdn.net"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Facebook SDK for JavaScript, Like buttons, Comments widget. Note: Official CSP documentation from Facebook is currently inaccessible - many developer pages return errors. Configuration verified from community sources and Stack Overflow discussions.",
    "aliases": [
      "facebook-sdk",
      "fb"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-05T00:00:00.000Z"
  },
  "fastly": {
    "id": "fastly",
    "name": "Fastly",
    "category": "cdn",
    "description": "Edge cloud platform and content delivery network",
    "website": "https://www.fastly.com",
    "officialDocs": [
      "https://docs.fastly.com/",
      "https://docs.fastly.com/en/guides/content-security-policy"
    ],
    "cspDirectives": {
      "script-src": [
        "https://*.fastly.com"
      ],
      "connect-src": [
        "https://*.fastly.com"
      ],
      "img-src": [
        "https://*.fastly.com"
      ],
      "style-src": [
        "https://*.fastly.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Fastly CDN services and edge computing platform. Replace *.fastly.com with your specific Fastly subdomain. Supports Client-Side Protection with CSP policy management.",
    "aliases": [
      "fastly-cdn"
    ],
    "lastUpdated": "2025-06-29T00:00:00Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "fathom-analytics": {
    "id": "fathom-analytics",
    "name": "Fathom Analytics",
    "category": "analytics",
    "description": "Privacy-first website analytics without cookies",
    "website": "https://usefathom.com",
    "officialDocs": [
      "https://usefathom.com/docs/troubleshooting/not-working",
      "https://usefathom.com/docs/integrations/discourse"
    ],
    "cspDirectives": {
      "script-src": [
        "https://cdn.usefathom.com"
      ],
      "connect-src": [
        "https://api.usefathom.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Fathom Analytics verified from official troubleshooting documentation. Requires CSP allowlisting for script.js from their CDN. Uses EU-based bunny.net CDN for GDPR compliance with EU data isolation. No cookies or personal data collection.",
    "aliases": [
      "fathom"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "firebase-auth": {
    "id": "firebase-auth",
    "name": "Firebase Authentication",
    "category": "other",
    "description": "Google's authentication service for web and mobile apps",
    "website": "https://firebase.google.com/products/auth",
    "officialDocs": [
      "https://firebase.google.com/docs/auth/web/start",
      "https://firebase.google.com/docs/hosting/content-security-policy"
    ],
    "cspDirectives": {
      "script-src": [
        "https://firebase.googleapis.com",
        "https://www.gstatic.com"
      ],
      "connect-src": [
        "https://identitytoolkit.googleapis.com",
        "https://securetoken.googleapis.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Firebase Authentication service by Google. Social providers may require additional domains. FirebaseUI requires additional script sources. Custom domains need separate configuration.",
    "aliases": [
      "firebase-authentication",
      "google-firebase-auth"
    ],
    "lastUpdated": "2024-06-29T00:00:00.000Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "freshchat": {
    "id": "freshchat",
    "name": "Freshchat",
    "category": "chat",
    "description": "Modern messaging software for sales and customer engagement",
    "website": "https://freshchat.com",
    "officialDocs": [
      "https://developers.freshchat.com/web-sdk/",
      "https://support.freshchat.com/support/solutions/articles/238000-freshchat-javascript-sdk"
    ],
    "cspDirectives": {
      "script-src": [
        "https://wchat.freshchat.com"
      ],
      "connect-src": [
        "https://wsv.freshchat.com",
        "https://wchat.freshchat.com"
      ],
      "frame-src": [
        "https://wchat.freshchat.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Freshchat widget for customer messaging",
    "aliases": [
      "fresh-chat"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "ghost-inspector": {
    "id": "ghost-inspector",
    "name": "Ghost Inspector",
    "category": "testing",
    "description": "Automated browser testing and website monitoring service",
    "website": "https://ghostinspector.com",
    "officialDocs": [
      "https://docs.ghostinspector.com/test-running-ip-addresses/",
      "https://docs.ghostinspector.com/test-settings/",
      "https://docs.ghostinspector.com/faq/"
    ],
    "cspDirectives": {
      "script-src": [
        "https://ghostinspector.com"
      ],
      "connect-src": [
        "https://api.ghostinspector.com",
        "https://ghostinspector.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Ghost Inspector verified from official documentation. Automated testing platform provides IP addresses for firewall whitelisting. Tests originate from specific documented IP ranges. User agent appends 'Ghost Inspector' for identification. No specific CSP domain documentation found - contact Ghost Inspector support for current CSP requirements.",
    "aliases": [
      "ghost-test"
    ],
    "lastUpdated": "2025-06-29T00:00:00Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "gitbook": {
    "id": "gitbook",
    "name": "GitBook",
    "category": "other",
    "description": "Modern documentation platform for teams",
    "website": "https://www.gitbook.com/",
    "officialDocs": [
      "https://developer.gitbook.com/",
      "https://docs.gitbook.com/integrations/embed-content",
      "https://docs.gitbook.com/help-center/editing-content/assets-and-files/can-i-embed-an-iframe-in-gitbook"
    ],
    "cspDirectives": {
      "script-src": [
        "https://gitbook.com",
        "https://www.gitbook.com"
      ],
      "frame-src": [
        "https://gitbook.com",
        "https://www.gitbook.com",
        "https://*.gitbook.io"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "GitBook verified from official documentation. Doesn't support external iframe embedding due to CSP. Public content can be embedded in iframes with safe CSP configuration (no cookies/credentials accessible). Custom domain SSL certificates managed by GitBook. frame-ancestors CSP directive configured to allow iframe embedding of public content.",
    "aliases": [
      "gitbook-docs"
    ],
    "lastUpdated": "2024-06-29T00:00:00.000Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "google-ads": {
    "id": "google-ads",
    "name": "Google Ads",
    "category": "advertising",
    "description": "Google's online advertising and marketing platform",
    "website": "https://ads.google.com",
    "officialDocs": [
      "https://developers.google.com/tag-platform/security/guides/csp",
      "https://developers.google.com/publisher-tag/guides/content-security-policy"
    ],
    "cspDirectives": {
      "script-src": [
        "https://googleadservices.com",
        "https://www.googleadservices.com",
        "https://pagead2.googlesyndication.com"
      ],
      "connect-src": [
        "https://google.com",
        "https://www.google.com",
        "https://googleadservices.com"
      ],
      "img-src": [
        "https://googleadservices.com",
        "https://www.googleadservices.com"
      ]
    },
    "requiresDynamic": true,
    "requiresNonce": true,
    "notes": "Google Ads verified from official Google Tag Platform CSP documentation. Supports conversion tracking, remarketing, and Google Publisher Tags. Strongly recommends nonce-based CSP due to dynamic domain usage. Requires individual Google TLD specifications. Each Google top-level domain must be specified individually.",
    "aliases": [
      "google-adwords",
      "adwords"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "google-analytics": {
    "id": "google-analytics",
    "name": "Google Analytics 4",
    "category": "analytics",
    "description": "Web analytics service that tracks and reports website traffic and user behavior",
    "website": "https://analytics.google.com/",
    "officialDocs": [
      "https://developers.google.com/tag-platform/security/guides/csp",
      "https://developers.google.com/analytics/devguides/collection/ga4",
      "https://www.google.com/supported_domains"
    ],
    "cspDirectives": {
      "script-src": [
        "https://*.googletagmanager.com"
      ],
      "img-src": [
        "https://*.google-analytics.com",
        "https://*.googletagmanager.com",
        "https://*.g.doubleclick.net",
        "https://*.google.com",
        "https://*.google.<TLD>"
      ],
      "connect-src": [
        "https://*.google-analytics.com",
        "https://*.analytics.google.com",
        "https://*.googletagmanager.com",
        "https://*.g.doubleclick.net",
        "https://*.google.com",
        "https://*.google.<TLD>",
        "https://pagead2.googlesyndication.com"
      ],
      "frame-src": [
        "https://td.doubleclick.net",
        "https://www.googletagmanager.com"
      ]
    },
    "requiresDynamic": true,
    "requiresNonce": false,
    "notes": "For Google Signals (cross-device tracking), use the extended CSP configuration Each Google top-level domain (TLD) must be specified individually in CSP See https://www.google.com/supported_domains for complete list of Google TLDs Nonce-based approach is recommended for inline scripts gtag.js automatically handles most CSP requirements",
    "aliases": [
      "ga4",
      "gtag",
      "google-gtag"
    ],
    "lastUpdated": "2024-06-28T00:00:00.000Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "google-fonts": {
    "id": "google-fonts",
    "name": "Google Fonts",
    "category": "fonts",
    "description": "Free web font service with hundreds of font families",
    "website": "https://fonts.google.com/",
    "officialDocs": [
      "https://developers.google.com/maps/documentation/javascript/content-security-policy",
      "https://developers.google.com/fonts/docs/getting_started"
    ],
    "cspDirectives": {
      "style-src": [
        "https://fonts.googleapis.com"
      ],
      "font-src": [
        "https://fonts.gstatic.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Google Fonts verified from official Google Maps CSP documentation. fonts.googleapis.com serves CSS stylesheets, fonts.gstatic.com serves actual font files. Both domains required for Google Fonts to work properly. Supports nonce-based CSP for enhanced security.",
    "aliases": [
      "gfonts"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "google-maps": {
    "id": "google-maps",
    "name": "Google Maps",
    "category": "maps",
    "description": "Interactive maps and location services by Google",
    "website": "https://maps.google.com",
    "officialDocs": [
      "https://developers.google.com/maps/documentation/javascript/content-security-policy",
      "https://developers.google.com/maps/documentation/javascript/get-api-key",
      "https://developers.google.com/maps/documentation/javascript/load-maps-js-api"
    ],
    "cspDirectives": {
      "script-src": [
        "https://*.googleapis.com",
        "https://*.gstatic.com",
        "https://*.google.com",
        "https://*.ggpht.com",
        "https://*.googleusercontent.com",
        "'unsafe-eval'",
        "blob:"
      ],
      "img-src": [
        "https://*.googleapis.com",
        "https://*.gstatic.com",
        "https://*.google.com",
        "https://*.googleusercontent.com",
        "data:"
      ],
      "frame-src": [
        "https://*.google.com"
      ],
      "connect-src": [
        "https://*.googleapis.com",
        "https://*.google.com",
        "https://*.gstatic.com",
        "data:",
        "blob:"
      ],
      "font-src": [
        "https://fonts.gstatic.com"
      ],
      "style-src": [
        "https://fonts.googleapis.com",
        "'unsafe-inline'"
      ],
      "worker-src": [
        "blob:"
      ]
    },
    "requiresDynamic": true,
    "requiresNonce": true,
    "notes": "Google Maps JavaScript API for interactive maps. Supports nonce-based strict CSP (recommended) or allowlist CSP. Requires 'unsafe-eval' for some features. All websites must specify googleapis.com in CSP directives.",
    "aliases": [
      "google-maps-api",
      "gmaps"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "google-meet": {
    "id": "google-meet",
    "name": "Google Meet",
    "category": "video",
    "description": "Google's video conferencing and online meeting platform",
    "website": "https://meet.google.com",
    "officialDocs": [
      "https://developers.google.com/meet/",
      "https://developers.google.com/meet/add-ons"
    ],
    "cspDirectives": {
      "script-src": [
        "https://meet.google.com"
      ],
      "frame-src": [
        "https://meet.google.com"
      ],
      "connect-src": [
        "https://meet.google.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Google Meet verified from community documentation. CRITICAL LIMITATION: Google Meet does NOT allow iframe embedding - returns 'meet.google.com refused to connect' errors. No official API/SDK for direct website integration. Must be used in new tab rather than embedded. frame-ancestors CSP directive blocks iframe embedding for security. Google official policy prevents iframe integration.",
    "aliases": [
      "gmeet"
    ],
    "lastUpdated": "2025-06-29T00:00:00Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "google-optimize": {
    "id": "google-optimize",
    "name": "Google Optimize",
    "category": "other",
    "description": "Google's A/B testing and website optimization platform (deprecated September 2023)",
    "website": "https://optimize.google.com/",
    "officialDocs": [
      "https://support.google.com/optimize/answer/7359264",
      "https://developers.google.com/optimize/"
    ],
    "cspDirectives": {
      "script-src": [
        "https://www.googleoptimize.com"
      ],
      "connect-src": [
        "https://www.googleoptimize.com"
      ]
    },
    "requiresDynamic": true,
    "requiresNonce": false,
    "notes": "Google Optimize service was DEPRECATED on September 30, 2023. Official documentation no longer maintained. Historical CSP configuration for legacy implementations only. Migrate to Google Analytics 4 experiments or other A/B testing platforms.",
    "aliases": [
      "google-optimize-360"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "google-pay": {
    "id": "google-pay",
    "name": "Google Pay",
    "category": "payment",
    "description": "Google's digital payment platform and digital wallet",
    "website": "https://pay.google.com",
    "officialDocs": [
      "https://developers.google.com/pay/api/web/overview",
      "https://developers.google.com/tag-platform/security/guides/csp"
    ],
    "cspDirectives": {
      "script-src": [
        "https://pay.google.com"
      ],
      "connect-src": [
        "https://payments.google.com",
        "https://googleapis.com"
      ],
      "img-src": [
        "https://www.gstatic.com",
        "https://cdn.firebasestudio.dev"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": true,
    "notes": "Google Pay verified from official API overview and Google's CSP guide. Requires pay.google.com for JavaScript SDK, googleapis.com for API connections, and gstatic.com for static assets. Google recommends strict CSP with nonces for security. Firebase Studio CDN used for UI elements.",
    "aliases": [
      "googlepay",
      "gpay"
    ],
    "lastUpdated": "2025-06-29T00:00:00Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "google-tag-manager": {
    "id": "google-tag-manager",
    "name": "Google Tag Manager",
    "category": "analytics",
    "description": "Tag management system for managing marketing and analytics tags",
    "website": "https://tagmanager.google.com/",
    "officialDocs": [
      "https://developers.google.com/tag-platform/security/guides/csp",
      "https://developers.google.com/tag-manager/quickstart"
    ],
    "cspDirectives": {
      "script-src": [
        "https://www.googletagmanager.com",
        "https://*.googletagmanager.com"
      ],
      "img-src": [
        "https://www.googletagmanager.com",
        "https://*.googletagmanager.com"
      ],
      "connect-src": [
        "https://www.googletagmanager.com",
        "https://*.googletagmanager.com"
      ]
    },
    "requiresDynamic": true,
    "requiresNonce": true,
    "notes": "Google Tag Manager verified against official CSP guide. GTM requires nonce implementation for secure inline script execution (preferred method). Preview mode requires additional domains. GTM may require 'unsafe-eval' for Custom JavaScript Variables. Tags within GTM may require additional CSP rules specific to each tag.",
    "aliases": [
      "gtm",
      "google-gtm"
    ],
    "lastUpdated": "2024-06-28T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "hotjar": {
    "id": "hotjar",
    "name": "Hotjar",
    "category": "analytics",
    "description": "Website heatmaps, visitor recordings, and user feedback analytics tool",
    "website": "https://hotjar.com",
    "officialDocs": [
      "https://help.hotjar.com/hc/en-us/articles/115009336727-Content-Security-Policy-CSP-",
      "https://help.hotjar.com/hc/en-us/articles/115009336727"
    ],
    "cspDirectives": {
      "script-src": [
        "https://*.hotjar.com",
        "'unsafe-inline'"
      ],
      "connect-src": [
        "https://*.hotjar.com",
        "https://*.hotjar.io",
        "wss://*.hotjar.com"
      ],
      "img-src": [
        "https://*.hotjar.com"
      ],
      "font-src": [
        "https://*.hotjar.com"
      ],
      "style-src": [
        "https://*.hotjar.com",
        "'unsafe-inline'"
      ]
    },
    "requiresDynamic": true,
    "requiresNonce": false,
    "notes": "Hotjar verified against official CSP documentation. Requires *.hotjar.com for scripts/styles/images/fonts, *.hotjar.io for WebSocket connections, and 'unsafe-inline' for dynamic content injection. WebSocket connection (wss://) required for real-time features.",
    "aliases": [
      "hotjar-analytics"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "hubspot": {
    "id": "hubspot",
    "name": "HubSpot",
    "category": "forms",
    "description": "Marketing, sales, and service software with forms and tracking",
    "website": "https://hubspot.com",
    "officialDocs": [
      "https://knowledge.hubspot.com/domains-and-urls/ssl-and-domain-security-in-hubspot",
      "https://community.hubspot.com/t5/HubSpot-Ideas/A-guide-to-Content-Security-Policy-CSP-settings/idi-p/314328",
      "https://community.hubspot.com/t5/APIs-Integrations/Content-Security-Policy-and-Embedded-Hubspot-Forms/m-p/320730"
    ],
    "cspDirectives": {
      "script-src": [
        "https://js.hsforms.net",
        "https://js.hs-scripts.com",
        "https://js.hs-banner.com",
        "https://js.hscollectedforms.net",
        "https://js.hs-analytics.net",
        "https://js.hsadspixel.net",
        "https://*.hubspot.com",
        "https://*.usemessages.com"
      ],
      "connect-src": [
        "https://forms.hubspot.com",
        "https://forms.hsforms.com",
        "https://forms.hscollectedforms.net",
        "https://*.hubspot.com",
        "https://*.hubapi.com",
        "https://*.hs-banner.com",
        "https://*.hscollectedforms.net",
        "https://*.hsforms.com"
      ],
      "frame-src": [
        "https://forms.hubspot.com",
        "https://*.hubspot.com",
        "https://*.hsforms.net",
        "https://*.hsforms.com",
        "https://play.hubspotvideo.com"
      ],
      "img-src": [
        "https://*.hsforms.com",
        "https://*.hubspot.com",
        "https://static.hsappstatic.net",
        "https://*.hubspotusercontent-na1.net",
        "https://*.hubspotusercontent20.net",
        "https://cdn2.hubspot.net"
      ],
      "style-src": [
        "'unsafe-inline'"
      ]
    },
    "requiresDynamic": true,
    "requiresNonce": false,
    "notes": "HubSpot verified from official knowledge base and community documentation. Comprehensive multi-domain CDN setup with regional variations (EU domains: js-eu1.hs-scripts.com). Requires 'unsafe-inline' styles due to v2.js inline styling. Includes forms, tracking, video, and analytics functionality across multiple HubSpot subdomains.",
    "aliases": [
      "hubspot-forms",
      "hs-forms"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "instagram": {
    "id": "instagram",
    "name": "Instagram",
    "category": "social",
    "description": "Instagram photo and video sharing platform integration for embedded posts",
    "website": "https://instagram.com",
    "officialDocs": [
      "https://developers.facebook.com/docs/instagram-basic-display-api/",
      "https://developers.facebook.com/docs/instagram-api/"
    ],
    "cspDirectives": {
      "script-src": [
        "https://platform.instagram.com"
      ],
      "frame-src": [
        "https://www.instagram.com"
      ],
      "connect-src": [
        "https://www.instagram.com"
      ],
      "img-src": [
        "https://scontent.cdninstagram.com",
        "https://instagram.com",
        "https://www.instagram.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Instagram verified from developer community discussions and Stack Overflow. Requires platform.instagram.com for embeds.js script loading. Official Meta documentation unavailable during verification due to site issues. Known CSP race condition with async script loading - blockquote element must be in DOM before script execution.",
    "aliases": [
      "instagram-embed"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "intercom": {
    "id": "intercom",
    "name": "Intercom",
    "category": "chat",
    "description": "Customer messaging platform with live chat, help desk, and marketing automation",
    "website": "https://intercom.com",
    "officialDocs": [
      "https://www.intercom.com/help/en/articles/3894-using-intercom-with-content-security-policy",
      "https://developers.intercom.com/installing-intercom/docs/javascript-api-overview",
      "https://developers.intercom.com/installing-intercom/docs/intercom-javascript"
    ],
    "cspDirectives": {
      "script-src": [
        "https://app.intercom.io",
        "https://widget.intercom.io",
        "https://js.intercomcdn.com",
        "https://video-messages.intercomcdn.com",
        "https://messenger-apps.intercom.io",
        "https://messenger-apps.eu.intercom.io",
        "https://messenger-apps.au.intercom.io"
      ],
      "frame-src": [
        "https://widget.intercom.io",
        "https://intercom-sheets.com",
        "https://www.intercom-reporting.com",
        "https://www.youtube.com",
        "https://player.vimeo.com",
        "https://fast.wistia.net"
      ],
      "connect-src": [
        "https://via.intercom.io",
        "https://api.intercom.io",
        "https://api.au.intercom.io",
        "https://api.eu.intercom.io",
        "https://api-iam.intercom.io",
        "https://api-iam.eu.intercom.io",
        "https://api-iam.au.intercom.io",
        "https://api-ping.intercom.io",
        "https://nexus-websocket-a.intercom.io",
        "wss://nexus-websocket-a.intercom.io",
        "https://nexus-websocket-b.intercom.io",
        "wss://nexus-websocket-b.intercom.io",
        "https://nexus-europe-websocket.intercom.io",
        "wss://nexus-europe-websocket.intercom.io",
        "https://nexus-australia-websocket.intercom.io",
        "wss://nexus-australia-websocket.intercom.io",
        "https://uploads.intercomcdn.com",
        "https://uploads.intercomcdn.eu",
        "https://uploads.au.intercomcdn.com",
        "https://uploads.eu.intercomcdn.com",
        "https://uploads.intercomusercontent.com"
      ],
      "img-src": [
        "https://static.intercomassets.com",
        "https://js.intercomcdn.com",
        "https://downloads.intercomcdn.com",
        "https://uploads.intercomusercontent.com",
        "https://gifs.intercomcdn.com"
      ],
      "style-src": [
        "'unsafe-inline'"
      ],
      "font-src": [
        "https://js.intercomcdn.com"
      ],
      "media-src": [
        "https://js.intercomcdn.com"
      ]
    },
    "requiresDynamic": true,
    "requiresNonce": true,
    "notes": "Intercom verified against official CSP documentation. Requires multiple regional endpoints (US, EU, AU), WebSocket connections for real-time messaging, and various CDN domains for assets. Supports iframe embeds for third-party content (YouTube, Vimeo, Wistia). Regional API endpoints and upload domains required based on account location.",
    "aliases": [
      "intercom-messenger"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "jitsi-meet": {
    "id": "jitsi-meet",
    "name": "Jitsi Meet",
    "category": "video",
    "description": "Open-source video conferencing platform",
    "website": "https://meet.jit.si",
    "officialDocs": [
      "https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe",
      "https://github.com/jitsi/jitsi-meet/blob/master/doc/api.md"
    ],
    "cspDirectives": {
      "script-src": [
        "https://meet.jit.si",
        "'unsafe-inline'"
      ],
      "style-src": [
        "'unsafe-inline'"
      ],
      "frame-src": [
        "https://meet.jit.si"
      ],
      "connect-src": [
        "https://meet.jit.si",
        "wss://meet.jit.si"
      ],
      "img-src": [
        "https:",
        "data:"
      ],
      "media-src": [
        "'self'",
        "data:"
      ]
    },
    "requiresDynamic": true,
    "requiresNonce": false,
    "notes": "Jitsi Meet verified from official iframe API documentation and community forums. CRITICAL SECURITY LIMITATION: Requires 'unsafe-inline' for script-src and style-src - will not function without it. Known CSP security weakness. Nonce implementation discussed but not implemented. WebSocket connections for real-time communication. iframe API well-documented for embedding.",
    "aliases": [
      "jitsi"
    ],
    "lastUpdated": "2025-06-29T00:00:00Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "jsdelivr": {
    "id": "jsdelivr",
    "name": "jsDelivr",
    "category": "cdn",
    "description": "Free CDN for open source projects and NPM packages",
    "website": "https://jsdelivr.com",
    "officialDocs": [
      "https://www.jsdelivr.com/",
      "https://github.com/jsdelivr/jsdelivr"
    ],
    "cspDirectives": {
      "script-src": [
        "https://cdn.jsdelivr.net"
      ],
      "style-src": [
        "https://cdn.jsdelivr.net"
      ],
      "font-src": [
        "https://cdn.jsdelivr.net"
      ],
      "img-src": [
        "https://cdn.jsdelivr.net"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "jsDelivr verified from developer community discussions and GitHub issues. Primary CDN domain cdn.jsdelivr.net required for script-src, style-src, font-src, and img-src. Supports specific path restrictions for enhanced security. Can use Report-Only mode for CSP testing.",
    "aliases": [
      "jsdelivr-cdn"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "keycdn": {
    "id": "keycdn",
    "name": "KeyCDN",
    "category": "cdn",
    "description": "High performance content delivery network",
    "website": "https://www.keycdn.com",
    "officialDocs": [
      "https://www.keycdn.com/support/content-security-policy",
      "https://www.keycdn.com/blog/http-security-headers"
    ],
    "cspDirectives": {
      "script-src": [
        "https://*.kxcdn.com"
      ],
      "connect-src": [
        "https://*.kxcdn.com"
      ],
      "img-src": [
        "https://*.kxcdn.com"
      ],
      "style-src": [
        "https://*.kxcdn.com"
      ],
      "font-src": [
        "https://*.kxcdn.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "KeyCDN verified from official CSP documentation. Uses *.kxcdn.com wildcard domain for pull and push zones. Official documentation emphasizes CSP as powerful mechanism against XSS attacks. Replace wildcard with specific zone subdomain for enhanced security.",
    "aliases": [
      "kxcdn"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "klevu": {
    "id": "klevu",
    "name": "Klevu",
    "category": "other",
    "description": "AI-powered search and discovery platform for e-commerce",
    "website": "https://www.klevu.com/",
    "officialDocs": [
      "https://docs.klevu.com/",
      "https://github.com/klevultd/frontend-sdk",
      "https://www.klevu.com/gdpr/"
    ],
    "cspDirectives": {
      "script-src": [
        "https://js.klevu.com",
        "https://*.ksearchnet.com"
      ],
      "connect-src": [
        "https://*.klevu.com",
        "https://*.ksearchnet.com"
      ],
      "img-src": [
        "https://*.klevu.com",
        "https://*.ksearchnet.com"
      ],
      "style-src": [
        "https://*.klevu.com",
        "https://*.ksearchnet.com"
      ]
    },
    "requiresDynamic": true,
    "requiresNonce": false,
    "notes": "Klevu verified from official documentation and GDPR policy. Uses wildcard domains *.klevu.com and *.ksearchnet.com for CDN, API endpoints, analytics, and search services. Key domains include js.klevu.com, stats.klevu.com, and customer-specific *.ksearchnet.com endpoints.",
    "aliases": [
      "klevu-search"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-05T00:00:00.000Z"
  },
  "linkedin-ads": {
    "id": "linkedin-ads",
    "name": "LinkedIn Ads",
    "category": "advertising",
    "description": "LinkedIn's advertising and marketing platform",
    "website": "https://business.linkedin.com/marketing-solutions/ads",
    "officialDocs": [
      "https://www.linkedin.com/help/lms/answer/a425696",
      "https://docs.microsoft.com/en-us/linkedin/marketing/"
    ],
    "cspDirectives": {
      "script-src": [
        "https://snap.licdn.com"
      ],
      "connect-src": [
        "https://px.ads.linkedin.com",
        "https://px4.ads.linkedin.com",
        "https://dc.ads.linkedin.com"
      ],
      "img-src": [
        "https://px.ads.linkedin.com",
        "https://px4.ads.linkedin.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "LinkedIn Ads verified from troubleshooting documentation and third-party sources. LinkedIn Insight Tag SDK loaded from snap.licdn.com. Requires multiple px domains for pixel tracking: px.ads.linkedin.com, px4.ads.linkedin.com, dc.ads.linkedin.com. Essential domains for conversion tracking and analytics functionality.",
    "aliases": [
      "linkedin-insight"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "linkedin": {
    "id": "linkedin",
    "name": "LinkedIn",
    "category": "social",
    "description": "LinkedIn professional networking platform integration for share buttons and company follow",
    "website": "https://linkedin.com",
    "officialDocs": [
      "https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/share-on-linkedin",
      "https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/plugins/share-plugin",
      "https://www.linkedin.com/developers/tools"
    ],
    "cspDirectives": {
      "script-src": [
        "https://platform.linkedin.com",
        "https://www.linkedin.com"
      ],
      "frame-src": [
        "https://www.linkedin.com"
      ],
      "connect-src": [
        "https://www.linkedin.com"
      ],
      "img-src": [
        "https://media.licdn.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "LinkedIn verified from Microsoft Learn documentation and developer resources. Requires domain configuration in LinkedIn Developer Console for Valid SDK Domains. JavaScript API requires specific domain allowlisting for security. Share plugin and company follow buttons use platform.linkedin.com and www.linkedin.com domains.",
    "aliases": [
      "linkedin-widgets"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "mailchimp": {
    "id": "mailchimp",
    "name": "Mailchimp",
    "category": "forms",
    "description": "Email marketing platform with signup forms and automation",
    "website": "https://mailchimp.com",
    "officialDocs": [
      "https://mailchimp.com/developer/marketing/guides/create-signup-form/",
      "https://mailchimp.com/help/add-a-signup-form-to-your-website/"
    ],
    "cspDirectives": {
      "script-src": [
        "https://chimpstatic.com"
      ],
      "connect-src": [
        "https://us1.api.mailchimp.com",
        "https://chimpstatic.com"
      ],
      "style-src": [
        "https://chimpstatic.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Mailchimp signup forms and embeds",
    "aliases": [
      "mailchimp-forms"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "mailgun": {
    "id": "mailgun",
    "name": "Mailgun",
    "category": "other",
    "description": "Email delivery service and API for developers",
    "website": "https://www.mailgun.com/",
    "officialDocs": [
      "https://documentation.mailgun.com/en/latest/user_manual.html#csp-headers",
      "https://help.mailgun.com/hc/en-us/articles/203380100-Where-Can-I-Find-My-API-Key-and-SMTP-Credentials-"
    ],
    "cspDirectives": {
      "script-src": [
        "https://mailgun.com"
      ],
      "connect-src": [
        "https://api.mailgun.net",
        "https://api.eu.mailgun.net"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Mailgun email delivery service for developers. Different API endpoints for US and EU regions. SMTP credentials may require additional domains.",
    "aliases": [
      "mailgun-email"
    ],
    "lastUpdated": "2024-06-29T00:00:00.000Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "mapbox": {
    "id": "mapbox",
    "name": "Mapbox",
    "category": "maps",
    "description": "Interactive maps and location data platform",
    "website": "https://mapbox.com",
    "officialDocs": [
      "https://docs.mapbox.com/mapbox-gl-js/api/",
      "https://docs.mapbox.com/help/troubleshooting/mapbox-browser-support/"
    ],
    "cspDirectives": {
      "script-src": [
        "https://api.mapbox.com"
      ],
      "style-src": [
        "https://api.mapbox.com"
      ],
      "connect-src": [
        "https://api.mapbox.com",
        "https://events.mapbox.com"
      ],
      "img-src": [
        "https://api.mapbox.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Mapbox GL JS for interactive vector maps",
    "aliases": [
      "mapbox-gl",
      "mapbox-js"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "maxcdn": {
    "id": "maxcdn",
    "name": "MaxCDN",
    "category": "cdn",
    "description": "Content delivery network (now part of StackPath) - SERVICE DISCONTINUED",
    "website": "https://www.maxcdn.com",
    "officialDocs": [
      "https://support.stackpath.com/hc/en-us/categories/360001091912-MaxCDN"
    ],
    "cspDirectives": {
      "script-src": [
        "https://*.maxcdn.com"
      ],
      "connect-src": [
        "https://*.maxcdn.com"
      ],
      "img-src": [
        "https://*.maxcdn.com"
      ],
      "style-src": [
        "https://*.maxcdn.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "MaxCDN/StackPath CDN service was DISCONTINUED in November 2023. Official documentation no longer maintained. Historical CSP configuration for legacy implementations only.",
    "aliases": [
      "stackpath-legacy",
      "stackpath"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "microsoft-ads": {
    "id": "microsoft-ads",
    "name": "Microsoft Ads",
    "category": "advertising",
    "description": "Microsoft's advertising platform (formerly Bing Ads)",
    "website": "https://ads.microsoft.com",
    "officialDocs": [
      "https://docs.microsoft.com/en-us/advertising/",
      "https://help.ads.microsoft.com/apex/index/3/en/56684"
    ],
    "cspDirectives": {
      "script-src": [
        "https://bat.bing.com"
      ],
      "connect-src": [
        "https://bat.bing.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Microsoft Ads Universal Event Tracking (UET) tag",
    "aliases": [
      "bing-ads",
      "uet"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "microsoft-clarity": {
    "id": "microsoft-clarity",
    "name": "Microsoft Clarity",
    "category": "analytics",
    "description": "Free user behavior analytics tool with heatmaps and session recordings",
    "website": "https://clarity.microsoft.com/",
    "officialDocs": [
      "https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-csp",
      "https://github.com/microsoft/clarity/issues/688"
    ],
    "cspDirectives": {
      "script-src": [
        "https://www.clarity.ms",
        "https://*.clarity.ms"
      ],
      "connect-src": [
        "https://*.clarity.ms",
        "https://c.bing.com"
      ],
      "img-src": [
        "https://*.clarity.ms"
      ],
      "style-src": [
        "'unsafe-inline'"
      ]
    },
    "requiresDynamic": true,
    "requiresNonce": false,
    "notes": "Clarity uses load balancing across multiple subdomains (a-z.clarity.ms) Requires 'unsafe-inline' for style-src due to inline styles Uses wildcard *.clarity.ms to cover all subdomains c.bing.com is required for analytics integration CSP is not strictly required for Clarity to work",
    "aliases": [
      "clarity",
      "ms-clarity"
    ],
    "lastUpdated": "2024-06-28T00:00:00.000Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "microsoft-teams": {
    "id": "microsoft-teams",
    "name": "Microsoft Teams",
    "category": "video",
    "description": "Microsoft's collaboration and video conferencing platform",
    "website": "https://teams.microsoft.com",
    "officialDocs": [
      "https://learn.microsoft.com/en-us/microsoftteams/platform/tabs/how-to/tab-requirements",
      "https://devblogs.microsoft.com/microsoft365dev/action-required-ensure-your-microsoft-teams-apps-are-ready-for-upcoming-domain-changes/",
      "https://learn.microsoft.com/en-us/answers/questions/1785610/what-domain-do-i-specify-in-my-csp-headers-for-tea"
    ],
    "cspDirectives": {
      "script-src": [
        "https://statics.teams.cdn.office.net",
        "https://*.teams.microsoft.com"
      ],
      "frame-src": [
        "https://teams.microsoft.com",
        "https://*.teams.microsoft.com",
        "https://*.teams.microsoft.us",
        "https://local.teams.office.com"
      ],
      "frame-ancestors": [
        "https://*.cloud.microsoft",
        "https://teams.microsoft.com",
        "https://*.teams.microsoft.com",
        "https://*.teams.microsoft.us",
        "https://local.teams.office.com",
        "https://*.office.com",
        "https://*.officeapps.live.com",
        "https://*.microsoft.com",
        "https://onedrive.live.com",
        "https://*.onedrive.live.com"
      ],
      "connect-src": [
        "https://teams.microsoft.com",
        "https://*.teams.microsoft.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Microsoft Teams verified from official Microsoft Learn documentation. Critical: Teams apps are migrating to *.cloud.microsoft domain by June 2024 - update CSP frame-ancestors to include this domain for future compatibility. Requires TeamsJS library v2.19+ and comprehensive frame-ancestors directive for Microsoft 365 integration across multiple hosting domains.",
    "aliases": [
      "teams",
      "ms-teams"
    ],
    "lastUpdated": "2025-06-29T00:00:00Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "mixpanel": {
    "id": "mixpanel",
    "name": "Mixpanel",
    "category": "analytics",
    "description": "Event tracking and user analytics platform for product teams",
    "website": "https://mixpanel.com",
    "officialDocs": [
      "https://docs.mixpanel.com/docs/tracking-methods/sdks/javascript",
      "https://github.com/mixpanel/mixpanel-js/issues/234",
      "https://github.com/mixpanel/mixpanel-js"
    ],
    "cspDirectives": {
      "script-src": [
        "https://cdn.mxpnl.com"
      ],
      "connect-src": [
        "https://api.mixpanel.com",
        "https://api-js.mixpanel.com"
      ],
      "img-src": [
        "https://cdn.mxpnl.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Mixpanel verified from official JavaScript SDK docs and GitHub issues. Version 2.31+ requires api-js.mixpanel.com for /decide endpoint. cdn.mxpnl.com serves the JavaScript library and tracking pixels. No nonce support required for basic tracking.",
    "aliases": [
      "mixpanel-analytics"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "new-relic": {
    "id": "new-relic",
    "name": "New Relic",
    "category": "monitoring",
    "description": "Application performance monitoring and observability platform",
    "website": "https://newrelic.com",
    "officialDocs": [
      "https://docs.newrelic.com/docs/browser/new-relic-browser/performance-quality/security-browser-monitoring/",
      "https://docs.newrelic.com/docs/browser/new-relic-browser/getting-started/compatibility-requirements-browser-monitoring/"
    ],
    "cspDirectives": {
      "script-src": [
        "https://js-agent.newrelic.com"
      ],
      "connect-src": [
        "https://bam.nr-data.net",
        "https://bam-cell.nr-data.net",
        "https://js-agent.newrelic.com"
      ]
    },
    "requiresDynamic": true,
    "requiresNonce": true,
    "notes": "New Relic verified against official security and compatibility documentation. Browser agent supports CSP Level 2 with nonce configuration (Ruby agent 9.10.0+ auto-detects CSP nonce). Agent v1.247.0+ includes integrity hashes for CDN verification. Proxy configuration available to reduce CSP exceptions.",
    "aliases": [
      "newrelic",
      "nr"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "notion": {
    "id": "notion",
    "name": "Notion",
    "category": "other",
    "description": "All-in-one workspace for notes, docs, and collaboration",
    "website": "https://www.notion.so/",
    "officialDocs": [
      "https://developers.notion.com/",
      "https://www.notion.so/help/embed-and-connect-other-apps"
    ],
    "cspDirectives": {
      "script-src": [
        "https://notion.so",
        "https://www.notion.so"
      ],
      "frame-src": [
        "https://notion.so",
        "https://www.notion.so"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Notion verified from official embedding documentation. Blocks iframe embedding with X-Frame-Options: sameorigin and CSP frame-ancestors 'self' https://mail.notion.so only. Third-party services like notioniframe.com available for workarounds. API has limited embed block types in public API. Notion uses Iframely service for embedding 1,900+ external domains.",
    "aliases": [
      "notion-workspace"
    ],
    "lastUpdated": "2024-06-29T00:00:00.000Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "okta": {
    "id": "okta",
    "name": "Okta",
    "category": "other",
    "description": "Identity and access management platform",
    "website": "https://www.okta.com/",
    "officialDocs": [
      "https://developer.okta.com/docs/guides/content-security-policy/main/",
      "https://developer.okta.com/"
    ],
    "cspDirectives": {
      "script-src": [
        "https://oktacdn.com"
      ],
      "connect-src": [
        "https://*.okta.com",
        "https://*.oktapreview.com"
      ],
      "frame-src": [
        "https://*.okta.com",
        "https://*.oktapreview.com"
      ]
    },
    "requiresDynamic": true,
    "requiresNonce": false,
    "notes": "Okta identity and access management platform. Organization-specific subdomains require wildcard permissions. Preview environments use oktapreview.com domain. Widget embedding requires frame permissions.",
    "aliases": [
      "okta-identity"
    ],
    "lastUpdated": "2024-06-29T00:00:00.000Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "onelogin": {
    "id": "onelogin",
    "name": "OneLogin",
    "category": "other",
    "description": "Cloud-based identity and access management platform",
    "website": "https://www.onelogin.com/",
    "officialDocs": [
      "https://developers.onelogin.com/api-docs/2/getting-started/working-with-apis",
      "https://developers.onelogin.com/"
    ],
    "cspDirectives": {
      "script-src": [
        "https://onelogin.com",
        "https://www.onelogin.com"
      ],
      "connect-src": [
        "https://api.onelogin.com"
      ],
      "frame-src": [
        "https://*.onelogin.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "OneLogin cloud-based identity platform. Subdomain-specific configurations may be required. SAML integrations may need additional domains.",
    "aliases": [
      "onelogin-identity"
    ],
    "lastUpdated": "2024-06-29T00:00:00.000Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "openstreetmap-leaflet": {
    "id": "openstreetmap-leaflet",
    "name": "OpenStreetMap/Leaflet",
    "category": "maps",
    "description": "Open-source JavaScript library for mobile-friendly interactive maps",
    "website": "https://leafletjs.com",
    "officialDocs": [
      "https://leafletjs.com/examples/quick-start/",
      "https://leafletjs.com/reference.html"
    ],
    "cspDirectives": {
      "script-src": [
        "https://unpkg.com",
        "'unsafe-eval'"
      ],
      "style-src": [
        "https://unpkg.com",
        "'unsafe-inline'"
      ],
      "connect-src": [
        "https://tile.openstreetmap.org",
        "https://*.tile.openstreetmap.org"
      ],
      "img-src": [
        "https://tile.openstreetmap.org",
        "https://*.tile.openstreetmap.org",
        "https://unpkg.com"
      ]
    },
    "requiresDynamic": true,
    "requiresNonce": false,
    "notes": "Leaflet/OpenStreetMap verified from community documentation and GitHub issues. Requires 'unsafe-eval' for mapping libraries and 'unsafe-inline' for dynamic styling. Common error: img-src violations for tile loading. Must include wildcard domains (*.tile.openstreetmap.org) for subdomain tiles (a,b,c). Different tile servers require specific CSP configurations. Cordova requires network access whitelist.",
    "aliases": [
      "leaflet",
      "osm",
      "openstreetmap"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "optimizely": {
    "id": "optimizely",
    "name": "Optimizely",
    "category": "other",
    "description": "A/B testing and experimentation platform for digital optimization",
    "website": "https://www.optimizely.com/",
    "officialDocs": [
      "https://docs.developers.optimizely.com/web/docs/content-security-policy",
      "https://docs.developers.optimizely.com/"
    ],
    "cspDirectives": {
      "script-src": [
        "https://cdn.optimizely.com"
      ],
      "style-src": [
        "'unsafe-inline'"
      ],
      "connect-src": [
        "https://logx.optimizely.com",
        "https://p13nlog.dz.optimizely.com"
      ],
      "img-src": [
        "https://cdn.optimizely.com"
      ]
    },
    "requiresDynamic": true,
    "requiresNonce": false,
    "notes": "Optimizely verified from official CSP documentation. Requires cdn.optimizely.com for JavaScript SDK, logx.optimizely.com and p13nlog.dz.optimizely.com for event tracking. Experiment variations may require 'unsafe-inline' for dynamic style modifications. Custom events tracking needs additional connect sources.",
    "aliases": [
      "optimizely-web"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "paypal": {
    "id": "paypal",
    "name": "PayPal",
    "category": "payment",
    "description": "Online payment service that allows payments and money transfers",
    "website": "https://paypal.com",
    "officialDocs": [
      "https://developer.paypal.com/sdk/js/csp/",
      "https://developer.paypal.com/docs/checkout/reference/security/",
      "https://developer.paypal.com/docs/checkout/integration-features/content-security-policy/"
    ],
    "cspDirectives": {
      "script-src": [
        "https://www.paypal.com",
        "https://*.paypal.com",
        "https://*.paypalobjects.com",
        "https://*.venmo.com"
      ],
      "frame-src": [
        "https://www.paypal.com",
        "https://*.paypal.com",
        "https://*.paypalobjects.com",
        "https://*.venmo.com"
      ],
      "connect-src": [
        "https://www.paypal.com",
        "https://api.paypal.com",
        "https://*.paypal.com",
        "https://*.paypalobjects.com",
        "https://*.venmo.com",
        "https://*.braintreegateway.com",
        "https://*.braintree-api.com"
      ],
      "img-src": [
        "https://www.paypalobjects.com",
        "https://t.paypal.com",
        "https://*.paypal.com",
        "https://*.paypalobjects.com",
        "https://*.venmo.com"
      ],
      "style-src": [
        "https://*.paypal.com",
        "https://*.paypalobjects.com",
        "https://*.venmo.com",
        "'unsafe-inline'"
      ]
    },
    "requiresDynamic": true,
    "requiresNonce": true,
    "notes": "PayPal verified against official CSP documentation. Includes JavaScript SDK, Checkout, Fastlane, and Venmo integration domains. Supports nonce-based CSP (data-csp-nonce attribute). Includes Braintree gateway domains for advanced payment processing. FraudNet integration may require additional domains.",
    "aliases": [
      "paypal-checkout"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "percy": {
    "id": "percy",
    "name": "Percy",
    "category": "testing",
    "description": "Visual testing and review platform for web applications",
    "website": "https://percy.io",
    "officialDocs": [
      "https://www.browserstack.com/docs/percy/common-issue/handling-csp",
      "https://docs.percy.io/docs/enterprise-firewalls",
      "https://docs.percy.io/docs/capturing-multiple-asset-hosts-cli"
    ],
    "cspDirectives": {
      "script-src": [
        "https://percy.io"
      ],
      "connect-src": [
        "https://percy.io",
        "https://api.percy.io"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Percy verified from official BrowserStack documentation. Visual testing platform (now part of BrowserStack) recommends temporarily disabling CSP during screenshot capture for accurate results, then re-enabling for security. Requires outbound access to percy.io domain. Use allowed-hostnames config for multi-domain asset capture. CI environment must allow outbound internet access to percy.io.",
    "aliases": [
      "percy-visual"
    ],
    "lastUpdated": "2025-06-29T00:00:00Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "ping-identity": {
    "id": "ping-identity",
    "name": "Ping Identity",
    "category": "other",
    "description": "Identity security platform for enterprises",
    "website": "https://www.pingidentity.com/",
    "officialDocs": [
      "https://docs.pingidentity.com/r/en-us/pingone/pingone_overview",
      "https://developer.pingidentity.com/"
    ],
    "cspDirectives": {
      "script-src": [
        "https://pingone.com"
      ],
      "connect-src": [
        "https://api.pingone.com",
        "https://*.pingone.com"
      ],
      "frame-src": [
        "https://*.pingone.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Ping Identity security platform. Environment-specific subdomains require wildcard permissions. PingFederate may require additional domains.",
    "aliases": [
      "pingone",
      "ping-federate"
    ],
    "lastUpdated": "2024-06-29T00:00:00.000Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "pinterest": {
    "id": "pinterest",
    "name": "Pinterest",
    "category": "social",
    "description": "Pinterest social media platform with Pin It buttons and widgets",
    "website": "https://pinterest.com",
    "officialDocs": [
      "https://developers.pinterest.com/docs/web-features/buttons/",
      "https://help.pinterest.com/en/business/article/save-button",
      "https://developers.pinterest.com/tools/widget-builder/"
    ],
    "cspDirectives": {
      "script-src": [
        "https://assets.pinterest.com",
        "https://log.pinterest.com"
      ],
      "frame-src": [
        "https://assets.pinterest.com",
        "https://www.pinterest.com"
      ],
      "img-src": [
        "https://i.pinimg.com",
        "https://assets.pinterest.com",
        "https://s.pinimg.com",
        "https://log.pinterest.com",
        "data:"
      ],
      "connect-src": [
        "https://assets.pinterest.com",
        "https://log.pinterest.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Pinterest verified from developer community and CSP discussions. Requires assets.pinterest.com for pinit.js script, log.pinterest.com for analytics/logging. Uses base64 images (data: URIs) for Pinterest logo. Known CSP complexity due to 'weird things' the JavaScript does during execution.",
    "aliases": [
      "pinterest-widget"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "plausible-analytics": {
    "id": "plausible-analytics",
    "name": "Plausible Analytics",
    "category": "analytics",
    "description": "Privacy-focused web analytics without cookies or personal data collection",
    "website": "https://plausible.io",
    "officialDocs": [
      "https://plausible.io/docs/plausible-script",
      "https://github.com/plausible/docs/issues/20"
    ],
    "cspDirectives": {
      "script-src": [
        "https://plausible.io"
      ],
      "connect-src": [
        "https://plausible.io"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Plausible Analytics verified from official documentation and GitHub CSP issues. Requires plausible.io for both script loading and data collection. Self-hosted instances require custom domain in CSP. Proxy configurations require additional domain allowlisting. Supports automatic nonce in Discourse integration.",
    "aliases": [
      "plausible"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "sanity": {
    "id": "sanity",
    "name": "Sanity",
    "category": "other",
    "description": "Structured content platform with real-time APIs",
    "website": "https://sanity.io",
    "officialDocs": [
      "https://www.sanity.io/docs/",
      "https://www.sanity.io/docs/api-cdn",
      "https://www.sanity.io/docs/security"
    ],
    "cspDirectives": {
      "script-src": [
        "https://sanity.io"
      ],
      "connect-src": [
        "https://api.sanity.io",
        "https://cdn.sanity.io",
        "wss://*.api.sanity.io"
      ],
      "img-src": [
        "https://cdn.sanity.io",
        "https://lh3.googleusercontent.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Sanity verified from official API CDN and security documentation. Studio Presentation tool requires iframe CSP adjustments. Global CDN at cdn.sanity.io based on Google CDN. Real-time collaboration requires WebSocket connections (wss://). User avatars from Google (lh3.googleusercontent.com). frame-ancestors 'self' needed for embedded Studio. Avoid access tokens in browser-side JavaScript.",
    "aliases": [
      "sanity-cms"
    ],
    "lastUpdated": "2025-06-29T00:00:00Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "sauce-labs": {
    "id": "sauce-labs",
    "name": "Sauce Labs",
    "category": "testing",
    "description": "Cloud-based testing platform for web and mobile applications",
    "website": "https://saucelabs.com",
    "officialDocs": [
      "https://docs.saucelabs.com/basics/data-center-endpoints/",
      "https://docs.saucelabs.com/secure-connections/sauce-connect/security-authentication/",
      "https://wiki.saucelabs.com/display/DOCS/Whitelisted+Domains+for+Sauce+Connect+Proxy"
    ],
    "cspDirectives": {
      "script-src": [
        "https://saucelabs.com",
        "https://*.saucelabs.com"
      ],
      "connect-src": [
        "https://api.saucelabs.com",
        "https://ondemand.saucelabs.com",
        "https://*.saucelabs.com",
        "https://*.miso.saucelabs.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Sauce Labs verified from official documentation. Multi-data-center testing platform with regional endpoints (US-West-1, US-East-1, EU-Central-1). Requires Sauce Connect Proxy domains (*.miso.saucelabs.com) for tunnel connections. Recommends hostname whitelisting over IP addresses. Official CSP-specific guidance should be requested from Sauce Labs support.",
    "aliases": [
      "saucelabs"
    ],
    "lastUpdated": "2025-06-29T00:00:00Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "segment": {
    "id": "segment",
    "name": "Segment",
    "category": "analytics",
    "description": "Customer data platform for collecting, cleaning, and controlling customer data",
    "website": "https://segment.com",
    "officialDocs": [
      "https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/faq/",
      "https://segment.com/docs/connections/sources/custom-domain/"
    ],
    "cspDirectives": {
      "script-src": [
        "https://cdn.segment.com"
      ],
      "connect-src": [
        "https://api.segment.io",
        "https://events.eu1.segmentapis.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Segment verified from official FAQ and Custom Domain documentation. Requires cdn.segment.com for Analytics.js library and api.segment.io for event tracking. EU workspaces use events.eu1.segmentapis.com endpoint. Supports nonce-based CSP and custom domain proxying.",
    "aliases": [
      "segment-analytics"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "sendgrid": {
    "id": "sendgrid",
    "name": "SendGrid",
    "category": "other",
    "description": "Email delivery and marketing platform by Twilio",
    "website": "https://sendgrid.com/",
    "officialDocs": [
      "https://docs.sendgrid.com/ui/sending-email/content-security-policy",
      "https://docs.sendgrid.com/api-reference/"
    ],
    "cspDirectives": {
      "script-src": [
        "https://sendgrid.com"
      ],
      "connect-src": [
        "https://api.sendgrid.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "SendGrid email delivery and marketing platform by Twilio. Marketing campaigns may require additional image domains. Webhook endpoints should be configured separately.",
    "aliases": [
      "twilio-sendgrid"
    ],
    "lastUpdated": "2024-06-29T00:00:00.000Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "sentry": {
    "id": "sentry",
    "name": "Sentry",
    "category": "monitoring",
    "description": "Application monitoring and error tracking platform",
    "website": "https://sentry.io",
    "officialDocs": [
      "https://docs.sentry.io/platforms/javascript/install/",
      "https://docs.sentry.io/product/security/content-security-policy/"
    ],
    "cspDirectives": {
      "script-src": [
        "https://browser.sentry-cdn.com"
      ],
      "connect-src": [
        "https://sentry.io",
        "https://o*.ingest.sentry.io"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Sentry JavaScript SDK for error monitoring",
    "aliases": [
      "sentry-js"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "shopify": {
    "id": "shopify",
    "name": "Shopify",
    "category": "payment",
    "description": "E-commerce platform with integrated payment processing",
    "website": "https://shopify.com",
    "officialDocs": [
      "https://shopify.dev/docs/apps/build/security/set-up-iframe-protection",
      "https://shopify.dev/docs/storefronts/headless/hydrogen/content-security-policy",
      "https://shopify.dev/docs/api/hydrogen/2024-10/utilities/createcontentsecuritypolicy"
    ],
    "cspDirectives": {
      "script-src": [
        "https://cdn.shopify.com",
        "https://*.shopify.com"
      ],
      "connect-src": [
        "https://checkout.shopify.com",
        "https://shop.app",
        "https://*.shopify.com"
      ],
      "frame-ancestors": [
        "https://*.myshopify.com",
        "https://admin.shopify.com"
      ],
      "img-src": [
        "https://cdn.shopify.com",
        "https://*.shopify.com"
      ]
    },
    "requiresDynamic": true,
    "requiresNonce": true,
    "notes": "Shopify verified from official developer documentation. Requires dynamic frame-ancestors per shop domain (https://[shop].myshopify.com https://admin.shopify.com). Embedded apps must implement shop-specific CSP headers. Hydrogen storefronts use script nonces and include cdn.shopify.com by default. App Store submission requires proper iframe protection with shop domain verification.",
    "aliases": [
      "shopify-checkout"
    ],
    "lastUpdated": "2025-06-29T00:00:00Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "slack": {
    "id": "slack",
    "name": "Slack",
    "category": "social",
    "description": "Slack workspace communication platform with embeds and integrations",
    "website": "https://slack.com",
    "officialDocs": [
      "https://api.slack.com/docs/slack-button",
      "https://api.slack.com/legacy/slack-button"
    ],
    "cspDirectives": {
      "script-src": [
        "https://platform.slack-edge.com"
      ],
      "frame-src": [
        "https://slack.com"
      ],
      "img-src": [
        "https://slack.com",
        "https://platform.slack-edge.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Slack buttons and workspace embeds. Official CSP documentation not readily available - configuration based on general API documentation. platform.slack-edge.com serves embed scripts, slack.com for iframe content.",
    "aliases": [
      "slack-button"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "snapchat": {
    "id": "snapchat",
    "name": "Snapchat",
    "category": "social",
    "description": "Snapchat social media platform with Snap Pixel and embeds",
    "website": "https://snapchat.com",
    "officialDocs": [
      "https://businesshelp.snapchat.com/s/article/pixel-direct-implementation",
      "https://developers.snap.com/api/marketing-api/Ads-API/snap-pixel"
    ],
    "cspDirectives": {
      "script-src": [
        "https://sc-static.net"
      ],
      "frame-src": [
        "https://tr.snapchat.com",
        "https://tr-shadow.snapchat.com",
        "https://snap.adbrn.com"
      ],
      "connect-src": [
        "https://tr.snapchat.com",
        "https://tr-shadow.snapchat.com"
      ],
      "form-action": [
        "https://tr.snapchat.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Snapchat verified from business help and third-party documentation (RudderStack). Snap Pixel requires sc-static.net for SDK loading, tr.snapchat.com for tracking. Cross-device impact measurement for advertising campaigns. Official Snapchat documentation sites experienced loading issues during verification.",
    "aliases": [
      "snapchat-pixel",
      "snap-pixel"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "square": {
    "id": "square",
    "name": "Square",
    "category": "payment",
    "description": "Square payment processing and commerce platform",
    "website": "https://squareup.com",
    "officialDocs": [
      "https://developer.squareup.com/forums/t/whitelisted-square-domains-for-content-security-policy-web-payments-sdk/8186",
      "https://developer.squareup.com/forums/t/content-security-policy-csp-questions-for-web-payments-sdk/11628"
    ],
    "cspDirectives": {
      "script-src": [
        "https://js.squareup.com"
      ],
      "connect-src": [
        "https://connect.squareup.com",
        "https://pci-connect.squareup.com"
      ],
      "frame-src": [
        "https://js.squareup.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Square verified from developer forums discussing CSP requirements. Web Payments SDK requires HTTPS and CSP headers as of October 2025. Known CSP gaps in official documentation - developers report issues with 3DS verification frames and undocumented domains like geoissuer.card. CSP implementation requires testing to identify all needed domains.",
    "aliases": [
      "square-payments"
    ],
    "lastUpdated": "2025-06-29T00:00:00Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "squarespace": {
    "id": "squarespace",
    "name": "Squarespace",
    "category": "other",
    "description": "All-in-one website building and hosting platform",
    "website": "https://www.squarespace.com/",
    "officialDocs": [
      "https://developers.squarespace.com/",
      "https://support.squarespace.com/hc/en-us/articles/205815908-Using-code-injection",
      "https://support.squarespace.com/hc/en-us/articles/205815928-Adding-custom-code-to-your-site"
    ],
    "cspDirectives": {
      "script-src": [
        "https://squarespace.com",
        "https://www.squarespace.com",
        "https://static1.squarespace.com"
      ],
      "connect-src": [
        "https://squarespace.com",
        "https://api.squarespace.com"
      ],
      "img-src": [
        "https://images.squarespace-cdn.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Squarespace verified from official documentation and community forums. CRITICAL CSP ISSUE: Squarespace does not natively provide comprehensive CSP support. Financial institutions flagged 'Content Security Policy Missing'. Bank regulators require CSP fixes. Single-domain CSP breaks editor functionality. Custom code injection available but CSP conflicts. Users in 'tough position' for compliance requirements.",
    "aliases": [
      "squarespace-website"
    ],
    "lastUpdated": "2024-06-29T00:00:00.000Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "strapi": {
    "id": "strapi",
    "name": "Strapi",
    "category": "other",
    "description": "Open-source headless content management system",
    "website": "https://strapi.io",
    "officialDocs": [
      "https://docs.strapi.io/",
      "https://docs.strapi.io/cms/configurations/middlewares"
    ],
    "cspDirectives": {
      "script-src": [
        "https://strapi.io"
      ],
      "connect-src": [
        "https://api.strapi.io"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Strapi verified from official middleware documentation. CSP configured in config/middlewares.js via strapi::security middleware. useDefaults: true recommended. Supports connect-src, img-src, media-src directives. AWS S3 integration examples provided. Known issue: custom CSP ignored for /admin path. upgradeInsecureRequests: null commonly used. Flexible directive configuration supported.",
    "aliases": [
      "strapi-cms"
    ],
    "lastUpdated": "2025-06-29T00:00:00Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "stripe": {
    "id": "stripe",
    "name": "Stripe",
    "category": "payment",
    "description": "Online payment processing platform for internet businesses including Stripe.js, Checkout, Connect, and 3D Secure authentication",
    "website": "https://stripe.com",
    "officialDocs": [
      "https://stripe.com/docs/js",
      "https://stripe.com/docs/security/guide#content-security-policy",
      "https://stripe.com/docs/security/guide"
    ],
    "cspDirectives": {
      "script-src": [
        "https://js.stripe.com",
        "https://*.js.stripe.com",
        "https://maps.googleapis.com"
      ],
      "frame-src": [
        "https://js.stripe.com",
        "https://*.js.stripe.com",
        "https://hooks.stripe.com"
      ],
      "connect-src": [
        "https://api.stripe.com",
        "https://maps.googleapis.com",
        "https://q.stripe.com",
        "https://errors.stripe.com"
      ],
      "img-src": [
        "https://*.stripe.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Stripe.js v3 library for secure payment processing. Includes domains for Google Maps (used in payment forms), error reporting (q.stripe.com), and wildcard subdomains for CDN delivery.",
    "aliases": [
      "stripe-js"
    ],
    "lastUpdated": "2025-07-03T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "swiftype": {
    "id": "swiftype",
    "name": "Swiftype",
    "category": "other",
    "description": "Search platform for websites (now part of Elastic Enterprise Search)",
    "website": "https://swiftype.com/",
    "officialDocs": [
      "https://swiftype.com/documentation/",
      "https://www.elastic.co/guide/en/enterprise-search/current/index.html",
      "https://swiftype.com/documentation/site-search/overview"
    ],
    "cspDirectives": {
      "script-src": [
        "https://s.swiftypecdn.com"
      ],
      "connect-src": [
        "https://search-api.swiftype.com",
        "https://api.swiftype.com",
        "https://*.api.swiftype.com"
      ],
      "img-src": [
        "https://ma.swiftypecdn.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Swiftype verified from official documentation. Uses s.swiftypecdn.com for JavaScript embed, search-api.swiftype.com and api.swiftype.com for API calls. Service now part of Elastic Enterprise Search. Legacy implementations may still require these domains.",
    "aliases": [
      "swiftype-search"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-05T00:00:00.000Z"
  },
  "tawk-to": {
    "id": "tawk-to",
    "name": "Tawk.to",
    "category": "chat",
    "description": "Free live chat software for websites",
    "website": "https://tawk.to",
    "officialDocs": [
      "https://help.tawk.to/article/why-are-images-not-showing-up-in-the-widget",
      "https://developer.tawk.to/jsapi/"
    ],
    "cspDirectives": {
      "script-src": [
        "https://*.tawk.to",
        "https://cdn.jsdelivr.net"
      ],
      "style-src": [
        "https://*.tawk.to",
        "https://fonts.googleapis.com",
        "https://cdn.jsdelivr.net"
      ],
      "frame-src": [
        "https://*.tawk.to"
      ],
      "font-src": [
        "https://*.tawk.to",
        "https://fonts.gstatic.com"
      ],
      "img-src": [
        "https://*.tawk.to",
        "https://cdn.jsdelivr.net",
        "https://tawk.link",
        "https://s3.amazonaws.com"
      ],
      "connect-src": [
        "https://*.tawk.to",
        "wss://*.tawk.to"
      ],
      "form-action": [
        "https://*.tawk.to"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Tawk.to verified from official CSP documentation. Requires wildcard *.tawk.to domains for various resources. Known CSP complexity due to extensive inline styles in widget implementation. Official docs recommend specific CSP directives to ensure widget displays correctly.",
    "aliases": [
      "tawk"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "teachable": {
    "id": "teachable",
    "name": "Teachable",
    "category": "other",
    "description": "Online course creation and hosting platform",
    "website": "https://teachable.com/",
    "officialDocs": [
      "https://support.teachable.com/hc/en-us/articles/222637507-Embed-Forms-and-Other-Content-into-Lessons",
      "https://support.teachable.com/hc/en-us/articles/219090947-Teachable-s-API"
    ],
    "cspDirectives": {
      "script-src": [
        "https://teachable.com",
        "https://*.teachable.com"
      ],
      "frame-src": [
        "https://teachable.com",
        "https://*.teachable.com"
      ],
      "connect-src": [
        "https://api.teachable.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Teachable course platform configuration based on general embedding documentation. Official CSP documentation not available. Course embeds and forms require frame-src permissions. Custom domains may need additional CSP entries. Supports embedding forms and materials via HTML/JavaScript code snippets.",
    "aliases": [
      "teachable-courses"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "thinkific": {
    "id": "thinkific",
    "name": "Thinkific",
    "category": "other",
    "description": "Online course creation and student management platform",
    "website": "https://www.thinkific.com/",
    "officialDocs": [
      "https://developers.thinkific.com/api/api-documentation/",
      "https://support.thinkific.com/hc/en-us/articles/360030350314-Thinkific-API"
    ],
    "cspDirectives": {
      "script-src": [
        "https://thinkific.com",
        "https://*.thinkific.com"
      ],
      "frame-src": [
        "https://thinkific.com",
        "https://*.thinkific.com"
      ],
      "connect-src": [
        "https://api.thinkific.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Thinkific course platform configuration based on API and general documentation. Official CSP documentation not readily available. Course player requires frame embedding permissions. White-label solutions may use custom domains requiring additional CSP entries.",
    "aliases": [
      "thinkific-courses"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "tiktok": {
    "id": "tiktok",
    "name": "TikTok",
    "category": "social",
    "description": "TikTok social media platform with video embeds and tracking",
    "website": "https://tiktok.com",
    "officialDocs": [
      "https://developers.tiktok.com/doc/embed-player",
      "https://developers.tiktok.com/doc/embed-creator-profiles",
      "https://ads.tiktok.com/help/article/get-started-pixel"
    ],
    "cspDirectives": {
      "script-src": [
        "https://www.tiktok.com",
        "https://sf16-website-login.neutral.ttwstatic.com",
        "https://analytics.tiktok.com"
      ],
      "frame-src": [
        "https://www.tiktok.com"
      ],
      "connect-src": [
        "https://analytics.tiktok.com",
        "https://www.tiktok.com"
      ],
      "img-src": [
        "https://www.tiktok.com",
        "https://p16-sign-sg.tiktokcdn.com",
        "https://sf16-website-login.neutral.ttwstatic.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "TikTok verified from developer documentation and ads platform guides. Requires www.tiktok.com for embed.js script and iframe embeds. TikTok Ads Manager mentions CSP considerations when setting up pixel. oEmbed API available for video embedding. Player uses postMessage communication.",
    "aliases": [
      "tiktok-pixel"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "twitch": {
    "id": "twitch",
    "name": "Twitch",
    "category": "video",
    "description": "Twitch live streaming platform for embedded video players and chat",
    "website": "https://twitch.tv",
    "officialDocs": [
      "https://dev.twitch.tv/docs/embed/",
      "https://dev.twitch.tv/docs/embed/video-and-clips/",
      "https://discuss.dev.twitch.com/t/new-extensions-policy-for-content-security-policy-csp-directives-and-timeline-for-enforcement/33695"
    ],
    "cspDirectives": {
      "script-src": [
        "https://player.twitch.tv",
        "https://embed.twitch.tv"
      ],
      "frame-src": [
        "https://player.twitch.tv",
        "https://embed.twitch.tv",
        "https://clips.twitch.tv"
      ],
      "img-src": [
        "https://static-cdn.jtvnw.net",
        "https://clips-media-assets2.twitch.tv"
      ],
      "connect-src": [
        "https://gql.twitch.tv",
        "https://api.twitch.tv",
        "https://irc-ws.chat.twitch.tv"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Twitch verified from official developer documentation and forums. Requires SSL certificates for embedding domains and parent parameter for domain verification. Extensions use iframe sandboxing with dynamically constructed CSP. CSP policy updated in 2024 for Extensions enforcement. Chat integration requires websocket connections to irc-ws.chat.twitch.tv.",
    "aliases": [
      "twitch-player"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "twitter-ads": {
    "id": "twitter-ads",
    "name": "Twitter Ads",
    "category": "advertising",
    "description": "Twitter's advertising and marketing platform (now X Ads)",
    "website": "https://ads.twitter.com",
    "officialDocs": [
      "https://business.twitter.com/en/help/campaign-measurement-and-analytics/conversion-tracking-for-websites.html",
      "https://developer.twitter.com/en/docs/twitter-ads-api/measurement/web-conversions/overview"
    ],
    "cspDirectives": {
      "script-src": [
        "https://static.ads-twitter.com"
      ],
      "connect-src": [
        "https://ads-twitter.com",
        "https://ads-api.twitter.com",
        "https://analytics.twitter.com"
      ],
      "img-src": [
        "https://t.co",
        "https://analytics.twitter.com",
        "https://ads-twitter.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Twitter/X Ads verified from official conversion tracking documentation. X Pixel requires static.ads-twitter.com for uwt.js script. Must allowlist ads-twitter.com, ads-api.twitter.com, and analytics.twitter.com in img-src and connect-src for X Pixel functionality. Essential for measuring return on ad spend.",
    "aliases": [
      "twitter-conversion",
      "x-ads"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "twitter": {
    "id": "twitter",
    "name": "Twitter",
    "category": "social",
    "description": "Twitter social media platform integration for embedded tweets and buttons",
    "website": "https://twitter.com",
    "officialDocs": [
      "https://developer.x.com/en/docs/x-for-websites/embedded-tweets/guides/cms-best-practices",
      "https://developer.x.com/en/docs/x-for-websites"
    ],
    "cspDirectives": {
      "script-src": [
        "https://platform.twitter.com"
      ],
      "frame-src": [
        "https://platform.twitter.com"
      ],
      "connect-src": [
        "https://api.twitter.com"
      ],
      "img-src": [
        "https://pbs.twimg.com",
        "https://abs.twimg.com"
      ],
      "style-src": [
        "https://platform.twitter.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Twitter/X verified from official developer documentation. Requires platform.twitter.com for widgets.js and iframe content. CSP parameter 'csp=on' available to disable features that might trigger CSP warnings. Supports embedded tweets, timelines, and follow buttons with oEmbed API integration.",
    "aliases": [
      "twitter-widgets",
      "x"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "typeform": {
    "id": "typeform",
    "name": "Typeform",
    "category": "forms",
    "description": "Online form builder for creating surveys, quizzes, and questionnaires",
    "website": "https://www.typeform.com/",
    "officialDocs": [
      "https://community.typeform.com/integrate-your-typeform-43/csp-allowing-form-submissions-to-typeform-via-intercom-integration-9338",
      "https://medium.com/typeforms-engineering-blog/why-did-we-rewrite-typeform-embed-f0b16fd4fbd3"
    ],
    "cspDirectives": {
      "script-src": [
        "https://embed.typeform.com"
      ],
      "style-src": [
        "https://embed.typeform.com"
      ],
      "frame-src": [
        "https://form.typeform.com"
      ],
      "form-action": [
        "https://form.typeform.com",
        "https://intercom-integration.typeform.com"
      ],
      "connect-src": [
        "https://api.typeform.com",
        "https://form.typeform.com"
      ],
      "img-src": [
        "https://images.typeform.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Typeform verified from official engineering blog and community CSP documentation. Requires embed.typeform.com for scripts and styles, form.typeform.com for frame embedding. HTTPS required for all embeds. Intercom integration needs additional form-action permissions.",
    "aliases": [
      "typeform-embed"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "udemy": {
    "id": "udemy",
    "name": "Udemy",
    "category": "other",
    "description": "Online learning and teaching marketplace",
    "website": "https://www.udemy.com/",
    "officialDocs": [
      "https://www.udemy.com/developers/",
      "https://business-support.udemy.com/hc/en-us/articles/13292752846999-How-to-Embed-Content-via-iframe-Leadership-Academy",
      "https://www.udemy.com/developers/instructor/"
    ],
    "cspDirectives": {
      "script-src": [
        "https://udemy.com",
        "https://www.udemy.com"
      ],
      "frame-src": [
        "https://udemy.com",
        "https://www.udemy.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Udemy verified from official documentation. CRITICAL: Affiliate API discontinued January 1, 2025. Course widget discontinued. Udemy Business supports iframe embedding for internal use only. REST/GraphQL/xAPI available for Business customers. Public course iframe embedding no longer available for affiliate purposes. Contact current affiliate program for CSP domain requirements.",
    "aliases": [
      "udemy-courses"
    ],
    "lastUpdated": "2024-06-29T00:00:00.000Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "unbounce": {
    "id": "unbounce",
    "name": "Unbounce",
    "category": "other",
    "description": "Landing page builder with A/B testing and conversion optimization",
    "website": "https://unbounce.com/",
    "officialDocs": [
      "https://developer.unbounce.com/",
      "https://documentation.unbounce.com/hc/en-us/articles/203879070-Adding-Custom-JavaScript-and-CSS-in-the-Classic-Builder",
      "https://unbounce.com/product/security/"
    ],
    "cspDirectives": {
      "script-src": [
        "https://unbounce.com"
      ],
      "connect-src": [
        "https://unbounce.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Unbounce verified from official documentation. No specific official CSP documentation found. Custom JavaScript and CSS supported in Classic Builder. API available on all pricing plans. HTTPS/SSL enforced with industry-leading security protocols. Contact support for CSP-specific requirements. Community forums available for developer discussions.",
    "aliases": [
      "unbounce-landing"
    ],
    "lastUpdated": "2024-06-29T00:00:00.000Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "unpkg": {
    "id": "unpkg",
    "name": "unpkg",
    "category": "cdn",
    "description": "Fast, global content delivery network for everything on npm",
    "website": "https://unpkg.com",
    "officialDocs": [
      "https://unpkg.com/",
      "https://github.com/mjackson/unpkg"
    ],
    "cspDirectives": {
      "script-src": [
        "https://unpkg.com"
      ],
      "style-src": [
        "https://unpkg.com"
      ],
      "font-src": [
        "https://unpkg.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "unpkg verified from official documentation. Fast, global CDN for everything on npm. Mirror of all npm packages available within minutes. Runs on Cloudflare's global edge network using Workers. For best cache hits use full version numbers. Subresource Integrity recommended for additional security. CSP challenges: can allow org namespaces like @myorg but not specific libraries without org namespace.",
    "aliases": [
      "unpkg-cdn"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "vimeo": {
    "id": "vimeo",
    "name": "Vimeo",
    "category": "video",
    "description": "Vimeo video hosting platform for embedded video players",
    "website": "https://vimeo.com",
    "officialDocs": [
      "https://developer.vimeo.com/player/sdk/basics",
      "https://help.vimeo.com/hc/en-us/articles/12426259908881-How-to-embed-my-video"
    ],
    "cspDirectives": {
      "frame-src": [
        "https://player.vimeo.com"
      ],
      "script-src": [
        "https://f.vimeocdn.com",
        "https://www.gstatic.com"
      ],
      "img-src": [
        "https://i.vimeocdn.com",
        "https://secure-b.vimeocdn.com",
        "https://f.vimeocdn.com",
        "https://player.vimeo.com"
      ],
      "media-src": [
        "https://player.vimeo.com"
      ],
      "connect-src": [
        "https://player.vimeo.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Vimeo verified from developer community and GitHub issues. Requires player.vimeo.com for iframe embeds, f.vimeocdn.com for player.module.js and vendor.module.js, gstatic.com for Chromecast. Extensive domain requirements due to various Vimeo subdomains and CDN usage. CSP complexity noted by developers.",
    "aliases": [
      "vimeo-player"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "vwo": {
    "id": "vwo",
    "name": "VWO",
    "category": "other",
    "description": "A/B testing and conversion optimization platform",
    "website": "https://vwo.com/",
    "officialDocs": [
      "https://help.vwo.com/hc/en-us/articles/360033730594-Content-Security-Policy-CSP-and-VWO",
      "https://developers.vwo.com/"
    ],
    "cspDirectives": {
      "script-src": [
        "https://dev.visualwebsiteoptimizer.com"
      ],
      "style-src": [
        "'unsafe-inline'"
      ],
      "connect-src": [
        "https://dev.visualwebsiteoptimizer.com"
      ],
      "img-src": [
        "https://dev.visualwebsiteoptimizer.com"
      ]
    },
    "requiresDynamic": true,
    "requiresNonce": false,
    "notes": "VWO verified from official CSP documentation. A/B testing platform requires dev.visualwebsiteoptimizer.com for scripts and API calls. Test variations may require 'unsafe-inline' styles for dynamic content modifications. Heatmaps and session recordings may need additional permissions.",
    "aliases": [
      "visual-website-optimizer"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "webflow": {
    "id": "webflow",
    "name": "Webflow",
    "category": "other",
    "description": "Visual web development platform for designers",
    "website": "https://webflow.com/",
    "officialDocs": [
      "https://developers.webflow.com/",
      "https://university.webflow.com/lesson/custom-code-in-the-head-and-body-tags",
      "https://help.webflow.com/hc/en-us/articles/33961369170963-Custom-security-headers",
      "https://university.webflow.com/lesson/custom-code-embed"
    ],
    "cspDirectives": {
      "script-src": [
        "https://webflow.com",
        "https://d3e54v103j8qbb.cloudfront.net"
      ],
      "connect-src": [
        "https://api.webflow.com"
      ],
      "img-src": [
        "https://uploads-ssl.webflow.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Webflow verified from official documentation. ENTERPRISE ONLY: Custom security headers available only on Enterprise plans ($15k+ annually). Paying customers request broader CSP access. Custom code blocked by default CSP. Community reports script-src 'none' blocking custom JavaScript. Cloudflare workaround available for non-Enterprise users.",
    "aliases": [
      "webflow-cms"
    ],
    "lastUpdated": "2024-06-29T00:00:00.000Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "whatsapp": {
    "id": "whatsapp",
    "name": "WhatsApp",
    "category": "social",
    "description": "WhatsApp messaging platform with chat widgets and business integrations",
    "website": "https://whatsapp.com",
    "officialDocs": [
      "https://developers.facebook.com/docs/whatsapp/",
      "https://business.whatsapp.com/products/business-platform"
    ],
    "cspDirectives": {
      "script-src": [
        "https://web.whatsapp.com"
      ],
      "frame-src": [
        "https://web.whatsapp.com"
      ],
      "connect-src": [
        "https://web.whatsapp.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "WhatsApp Business chat widgets and embeds",
    "aliases": [
      "whatsapp-business",
      "whatsapp-chat"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "wix": {
    "id": "wix",
    "name": "Wix",
    "category": "other",
    "description": "Cloud-based website development platform",
    "website": "https://www.wix.com/",
    "officialDocs": [
      "https://dev.wix.com/api/rest/getting-started/introduction",
      "https://support.wix.com/en/article/embedding-custom-code-on-your-site",
      "https://support.wix.com/en/article/wix-editor-embedding-a-site-or-a-widget"
    ],
    "cspDirectives": {
      "script-src": [
        "https://wix.com",
        "https://www.wix.com",
        "https://static.wixstatic.com"
      ],
      "connect-src": [
        "https://wix.com",
        "https://www.wix.com"
      ],
      "img-src": [
        "https://static.wixstatic.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "Wix verified from official documentation and community forums. LIMITED CSP SUPPORT: CSP headers managed at platform level, no user control. Custom code runs in sandboxed iframes for security. HTTPS required for all embedded content. External sites may block embedding due to their own CSP policies. Community reports limited support for custom security headers as of 2022.",
    "aliases": [
      "wix-website"
    ],
    "lastUpdated": "2024-06-29T00:00:00.000Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "woocommerce": {
    "id": "woocommerce",
    "name": "WooCommerce",
    "category": "payment",
    "description": "WordPress-based e-commerce platform and payment processing",
    "website": "https://woocommerce.com",
    "officialDocs": [
      "https://developer.woocommerce.com/",
      "https://woocommerce.com/document/woocommerce-rest-api/",
      "https://wordpress.org/support/topic/using-a-strict-content-security-policy-while-allowing-woocommerce-plugin-to-work/"
    ],
    "cspDirectives": {
      "script-src": [
        "https://woocommerce.com",
        "'unsafe-inline'"
      ],
      "connect-src": [
        "https://woocommerce.com",
        "https://checkout.woocommerce.com"
      ],
      "style-src": [
        "'unsafe-inline'"
      ]
    },
    "requiresDynamic": true,
    "requiresNonce": false,
    "notes": "WooCommerce verified from community documentation and WordPress support forums. E-commerce plugin with known CSP compatibility challenges - may require 'unsafe-inline' for checkout functionality. WordPress CSP plugins like 'Cookies and Content Security Policy' can help manage WooCommerce CSP requirements. Implementation typically requires WordPress-level CSP configuration rather than dedicated WooCommerce CSP plugin.",
    "aliases": [
      "woo"
    ],
    "lastUpdated": "2025-06-29T00:00:00Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "wordpress": {
    "id": "wordpress",
    "name": "WordPress",
    "category": "other",
    "description": "Open-source content management system and blogging platform",
    "website": "https://wordpress.org",
    "officialDocs": [
      "https://developer.wordpress.org/",
      "https://wordpress.org/plugins/tags/content-security-policy/",
      "https://wordpress.org/plugins/cookies-and-content-security-policy/",
      "https://wpvip.com/blog/content-security-policy-guide/"
    ],
    "cspDirectives": {
      "script-src": [
        "https://w.org",
        "https://s.w.org"
      ],
      "connect-src": [
        "https://api.wordpress.org"
      ],
      "img-src": [
        "https://s.w.org"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "WordPress verified from official plugin directory and VIP documentation. Multiple CSP plugins available: Content Security Policy Manager, Cookies and Content Security Policy, HTTP Headers. Admin area favors inline scripts - may require 'unsafe-inline'. Themes/plugins can break with strict CSP. Different policies for admin vs frontend recommended. Extensive testing required after CSP implementation.",
    "aliases": [
      "wp"
    ],
    "lastUpdated": "2025-06-29T00:00:00Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  },
  "youtube": {
    "id": "youtube",
    "name": "YouTube",
    "category": "video",
    "description": "Video hosting and embedding service",
    "website": "https://www.youtube.com/",
    "officialDocs": [
      "https://developers.google.com/youtube/iframe_api_reference"
    ],
    "cspDirectives": {
      "script-src": [
        "https://www.youtube.com/iframe_api"
      ],
      "frame-src": [
        "https://www.youtube.com/embed/",
        "http://www.youtube.com/embed/",
        "https://www.youtube-nocookie.com/embed/"
      ],
      "img-src": [
        "https://i.ytimg.com",
        "https://i9.ytimg.com",
        "https://ytimg.googleusercontent.com"
      ],
      "connect-src": [
        "https://www.youtube.com"
      ]
    },
    "requiresDynamic": false,
    "requiresNonce": false,
    "notes": "YouTube verified against official iframe API documentation. Requires iframe_api for script-src and embed paths for frame-src. youtube-nocookie.com is the privacy-enhanced mode. Thumbnail images are served from ytimg.com domains. Include origin parameter for enhanced security.",
    "aliases": [
      "youtube-embed",
      "yt"
    ],
    "lastUpdated": "2024-06-28T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "zendesk": {
    "id": "zendesk",
    "name": "Zendesk",
    "category": "chat",
    "description": "Customer service platform with support ticketing and live chat",
    "website": "https://zendesk.com",
    "officialDocs": [
      "https://developer.zendesk.com/documentation/classic-web-widget-sdks/web-widget/integrating-with-google/csp/",
      "https://support.zendesk.com/hc/en-us/articles/5436016355738-Does-Zendesk-support-CSP-headers"
    ],
    "cspDirectives": {
      "script-src": [
        "https://*.zdassets.com",
        "https://static.zdassets.com"
      ],
      "frame-src": [
        "https://*.zendesk.com",
        "https://widget.zendesk.com"
      ],
      "connect-src": [
        "https://*.zendesk.com",
        "https://*.zopim.com",
        "https://assets.zendesk.com",
        "wss://*.zendesk.com",
        "wss://*.zopim.com",
        "https://zendesk-eu.my.sentry.io"
      ],
      "img-src": [
        "https://v2assets.zopim.io",
        "https://static.zdassets.com",
        "data:"
      ],
      "font-src": [
        "https://*.zdassets.com",
        "https://static.zdassets.com"
      ],
      "style-src": [
        "'unsafe-inline'"
      ]
    },
    "requiresDynamic": true,
    "requiresNonce": true,
    "notes": "Zendesk verified against official CSP documentation. Web Widget (Classic) supports Google's strict CSP guidelines with nonce attribute. Requires static.zdassets.com for snippet.js and assets.zendesk.com for embeddable framework. Cannot guarantee custom CSP compatibility outside Google's guidelines.",
    "aliases": [
      "zendesk-chat",
      "zendesk-widget"
    ],
    "lastUpdated": "2024-12-29T00:00:00.000Z",
    "verifiedAt": "2025-07-04T00:00:00.000Z"
  },
  "zoom": {
    "id": "zoom",
    "name": "Zoom",
    "category": "video",
    "description": "Video conferencing and communication platform",
    "website": "https://zoom.us",
    "officialDocs": [
      "https://developers.zoom.us/docs/meeting-sdk/web/",
      "https://devforum.zoom.us/t/what-is-an-appropiate-content-security-policy-csp-for-embedding-an-application-on-the-zoom-client/73158",
      "https://devforum.zoom.us/t/content-securty-policy/5945"
    ],
    "cspDirectives": {
      "script-src": [
        "https://source.zoom.us",
        "https://*.zoom.us",
        "'unsafe-eval'"
      ],
      "frame-src": [
        "https://*.zoom.us"
      ],
      "connect-src": [
        "https://*.zoom.us",
        "wss://*.zoom.us"
      ],
      "worker-src": [
        "blob:"
      ],
      "font-src": [
        "data:"
      ]
    },
    "requiresDynamic": true,
    "requiresNonce": false,
    "notes": "Zoom Web SDK verified from official developer forum discussions. Requires 'unsafe-eval' for SDK functionality, blob: worker-src for WebRTC workers, data: font-src for embedded fonts, and websocket connections (wss://*.zoom.us). Meeting SDK uses react-dom with Web Workers requiring blob: worker-src directive.",
    "aliases": [
      "zoom-video"
    ],
    "lastUpdated": "2025-06-29T00:00:00Z",
    "verifiedAt": "2025-07-03T00:00:00.000Z"
  }
} as const;

/**
 * Number of prebuilt services included in this bundle
 */
export const PREBUILT_SERVICES_COUNT = 106;
