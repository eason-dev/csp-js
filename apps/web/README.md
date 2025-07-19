# CSP Generator Web App

A modern web application for generating Content Security Policy headers using the csp-kit library.

## Features

- 🎨 Modern UI built with Next.js 15 and TailwindCSS v4
- 🔍 Interactive service search and selection
- 📋 One-click copy to clipboard
- 🌙 Dark mode support
- 📱 Responsive design
- ⚡ Fast build times with TailwindCSS v4
- 🔒 Production-ready CSP implementation with Google Analytics

## Browser Support

This application uses TailwindCSS v4, which requires modern browsers:

- ✅ Safari 16.4+ (March 2023)
- ✅ Chrome 111+ (March 2023)
- ✅ Firefox 128+ (July 2024)
- ✅ Edge 111+ (March 2023)

If you need to support older browsers, consider using TailwindCSS v3 instead.

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run linting
pnpm lint

# Type checking
pnpm check-types

# Run unit tests
pnpm test

# Run E2E tests
pnpm test:e2e
```

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: TailwindCSS v4 with PostCSS
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono
- **TypeScript**: Full type safety
- **Library**: @csp-kit/generator for CSP generation

## CSP Implementation with Google Analytics

This app also demonstrates production-ready CSP implementation with Google Analytics:

### Setup

1. **Environment Variables**

   Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

   Configure your Google Analytics ID:

   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-YOUR-ID-HERE
   ```

2. **Implementation Details**
   - **Middleware** (`middleware.ts`): Generates CSP headers with nonces for each request
   - **Google Analytics** (`components/analytics/google-analytics.tsx`): Loads GA with proper nonce attributes
   - **Layout** (`app/layout.tsx`): Integrates GA component and propagates nonces

3. **Key Features**
   - Unique nonces generated per request for security
   - Report-Only mode in development for testing
   - Strict CSP enforcement in production
   - Automatic exclusion of static assets
   - Full support for Google Analytics tracking

### Testing

The app includes comprehensive test coverage:

- **Unit Tests**: Middleware logic, component rendering, nonce handling
- **E2E Tests**: CSP header verification, GA integration, security policies

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

This app is optimized for deployment on Vercel and other modern hosting platforms that support Next.js.
