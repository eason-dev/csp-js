# Getting Started with CSP Kit

Welcome to CSP Kit! This guide will help you get up and running quickly with Content Security Policy generation for your web applications.

## 🎯 What is CSP Kit?

CSP Kit is a modern toolkit that simplifies Content Security Policy (CSP) management by using a **service-first approach**. Instead of manually writing CSP directives, you specify the services your application uses, and CSP Kit automatically generates the appropriate security policies.

## 🚀 Quick Start Options

### Option 1: Web Interface (Recommended for Beginners)

The fastest way to get started is using our interactive web interface:

**👉 [Try CSP Kit Web Generator](https://csp-kit.eason.ch)**

**Benefits:**
- ✅ No installation required
- ✅ Visual service selection
- ✅ Real-time CSP generation
- ✅ Copy ready-to-use headers
- ✅ Learn how different services affect CSP

### Option 2: JavaScript/TypeScript API

For developers who want to integrate CSP generation into their applications:

#### Installation

You need **both packages** for CSP Kit to work:

```bash
# npm
npm install @csp-kit/generator @csp-kit/data

# yarn
yarn add @csp-kit/generator @csp-kit/data

# pnpm
pnpm add @csp-kit/generator @csp-kit/data
```

> **💡 Why two packages?** CSP Kit uses a data-package separation architecture. The `@csp-kit/generator` contains the core logic, while `@csp-kit/data` contains service definitions that update frequently. This allows you to get service updates without library updates.

#### Basic Usage

```javascript
import { generateCSP } from '@csp-kit/generator';

// Generate CSP for common services
const result = generateCSP([
  'google-analytics',
  'stripe', 
  'google-fonts'
]);

console.log(result.header);
// Output: "script-src 'self' https://www.googletagmanager.com https://js.stripe.com; style-src 'self' https://fonts.googleapis.com; ..."

// Use the CSP header
response.setHeader('Content-Security-Policy', result.header);
```

### Option 3: CLI Tools

For developers who want to contribute or manage service definitions:

```bash
# Install CLI globally
npm install -g @csp-kit/cli

# Generate CSP from command line
csp-cli generate google-analytics stripe

# Add new services interactively
csp-cli add --interactive
```

## 🎯 Common Use Cases

### 1. Next.js Application

```javascript
// pages/api/set-csp.js or app/api/set-csp/route.js
import { generateCSP } from '@csp-kit/generator';

export default function handler(req, res) {
  const result = generateCSP([
    'google-analytics',
    'vercel-analytics',
    'google-fonts'
  ]);
  
  res.setHeader('Content-Security-Policy', result.header);
  res.json({ csp: result.header });
}
```

### 2. Express.js Middleware

```javascript
import express from 'express';
import { generateCSP } from '@csp-kit/generator';

const app = express();

// Generate CSP once at startup
const cspResult = generateCSP([
  'google-analytics',
  'stripe',
  'intercom'
]);

// Apply CSP to all routes
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', cspResult.header);
  next();
});
```

### 3. React Application (Create React App)

```javascript
// public/index.html - Add to <head>
<meta http-equiv="Content-Security-Policy" content="script-src 'self' https://www.googletagmanager.com; style-src 'self' https://fonts.googleapis.com;">

// Or generate dynamically
import { generateCSP } from '@csp-kit/generator';

const result = generateCSP(['google-analytics', 'google-fonts']);
document.querySelector('meta[http-equiv="Content-Security-Policy"]')
  .setAttribute('content', result.header);
```

### 4. Static Sites (Netlify, Vercel)

For static sites, you can use the web interface to generate CSP headers and add them to your hosting configuration:

**Netlify (_headers file):**
```
/*
  Content-Security-Policy: script-src 'self' https://www.googletagmanager.com; style-src 'self' https://fonts.googleapis.com
```

**Vercel (vercel.json):**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "script-src 'self' https://www.googletagmanager.com; style-src 'self' https://fonts.googleapis.com"
        }
      ]
    }
  ]
}
```

## 🔧 Advanced Configuration

### Custom Rules

Add your own CSP rules alongside service-generated ones:

```javascript
const result = generateCSP({
  services: ['google-analytics', 'stripe'],
  customRules: {
    'script-src': ['https://my-custom-domain.com'],
    'img-src': ['data:', 'blob:'],
  },
  nonce: true, // Generate nonce for inline scripts
  reportUri: 'https://my-site.com/csp-report'
});
```

### Nonce Support

For secure inline scripts:

```javascript
const result = generateCSP({
  services: ['google-analytics'],
  nonce: true
});

// Use the nonce in your HTML
`<script nonce="${result.nonce}">
  // Your inline script
</script>`
```

### Report-Only Mode

Test CSP without breaking your site:

```javascript
const result = generateCSP(['google-analytics', 'stripe']);

// Use report-only header for testing
response.setHeader('Content-Security-Policy-Report-Only', result.reportOnlyHeader);
```

## 🔍 Finding Services

CSP Kit supports 106+ popular services. Here are some ways to find what you need:

### 1. Web Interface
Browse services visually at [csp-kit.eason.ch](https://csp-kit.eason.ch)

### 2. Search Programmatically
```javascript
import { searchServices } from '@csp-kit/generator';

// Search for analytics services
const analyticsServices = await searchServices('analytics');
console.log(analyticsServices.map(s => s.id));
// Output: ['google-analytics', 'mixpanel', 'hotjar', ...]
```

### 3. CLI Search
```bash
csp-cli list --category analytics
csp-cli search "google"
```

## 🐛 Troubleshooting

### Common Issues

**1. "Services not loaded" error**
```javascript
// Solution: Call loadServices() first
import { loadServices, generateCSP } from '@csp-kit/generator';

await loadServices();
const result = generateCSP(['google-analytics']);
```

**2. Service not found**
```javascript
const result = generateCSP(['unknown-service']);
console.log(result.unknownServices); // ['unknown-service']
```

**3. Missing @csp-kit/data package**
```bash
# Install both packages
npm install @csp-kit/generator @csp-kit/data
```

### Getting Help

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/eason-dev/csp-kit/issues)
- 💬 **Questions**: [GitHub Discussions](https://github.com/eason-dev/csp-kit/discussions)
- 📖 **Documentation**: [csp-kit.eason.ch/docs](https://csp-kit.eason.ch/docs)

## 📚 Next Steps

Now that you're up and running:

1. **[API Reference](./api-reference.md)** - Complete API documentation
2. **[CLI Guide](./cli-guide.md)** - Command-line tools reference
3. **[Service Support](./service-support.md)** - List of all supported services
4. **[Contributing](./contributing.md)** - Help add new services
5. **[Examples](./examples/)** - Framework-specific examples

## 🎉 Welcome to the Community!

- ⭐ **[Star us on GitHub](https://github.com/eason-dev/csp-kit)**
- 🐦 **[Follow updates](https://twitter.com/cspkit)**
- 💬 **[Join discussions](https://github.com/eason-dev/csp-kit/discussions)**
- 🤝 **[Contribute services](./contributing.md)**

Happy coding! 🚀