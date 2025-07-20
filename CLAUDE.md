# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Basic

- Always use `pnpm` as package manager.
- Always use `Context7 MCP` when working with libraries. Use it to get latest documentation for a library, such as Next.js, React, TailwindCSS, etc.
- Prefer using `eslint` and `prettier` to format your code.
- Don't auto commit and auto push unless I ask you to.

## Project Overview

CSP Kit is a modern Content Security Policy (CSP) toolkit that simplifies CSP header generation for web developers. It provides:

- **Core Library** (`@csp-kit/generator`): Type-safe CSP generation with 100+ pre-configured services
- **Service Database** (`@csp-kit/data`): Service definitions with PascalCase exports (e.g., `GoogleAnalytics`, `Stripe`)
- **CLI Tools** (`@csp-kit/cli`): Command-line utilities for service management
- **Web Interface** (https://csp-kit.eason.ch): Interactive visual CSP generator
- **Documentation**: Comprehensive guides and API reference

### Key Features

- 🎯 Service-first configuration (not directive-based)
- 📦 100+ pre-configured services across 19 categories
- 🌳 Tree-shakeable ES modules with TypeScript
- 🔒 Security-first with conservative defaults
- 🚀 Zero-config for common services
- 🔧 Configurable services for dynamic values

## Project Structure

This is a Turborepo monorepo with TypeScript and React/Next.js applications. The project uses pnpm as the package manager and requires Node.js >=24.

### Key Directories

- `apps/` - Contains Next.js applications
  - `web/` - Interactive CSP generator web app (Next.js 15, React 19, Tailwind CSS)
  - `docs/` - Documentation site (Docusaurus)
- `packages/` - Core packages and shared libraries
  - `generator/` - Core CSP generation library (@csp-kit/generator)
  - `data/` - Service definitions database (@csp-kit/data)
  - `cli/` - Command-line tools (@csp-kit/cli)
  - `eslint-config/` - ESLint configurations
  - `typescript-config/` - TypeScript configurations

## Development Commands

### Core Commands (run from root)

- `pnpm dev` - Start development servers for all apps
- `pnpm build` - Build all apps and packages
- `pnpm lint` - Run ESLint across all packages (zero warnings policy)
- `pnpm check-types` - Type check all packages
- `pnpm format` - Format code using Prettier
- `pnpm test` - Run all tests (Vitest)

### Targeted Commands (using Turbo filters)

- `pnpm exec turbo dev --filter=web` - Run only the web app
- `pnpm exec turbo build --filter=docs` - Build only the docs app
- `pnpm exec turbo lint --filter=@csp-kit/generator` - Lint only the generator package
- `pnpm --filter @csp-kit/generator test` - Test specific package

### Commit Guidelines

Use conventional commits for all changes:

```bash
# Format: <type>(<scope>): <subject>
git commit -m "feat(generator): add new CSP directive support"
git commit -m "fix(data): correct service configuration"
git commit -m "docs(web): update API examples"

# Or use interactive commit tool:
pnpm commit
```

Valid types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`
Valid scopes: `generator`, `data`, `cli`, `ui`, `web`, `docs`, `deps`, `release`, `config`, `ci`, `root`

### Releasing with Changesets

The project uses Changesets for version management:

```bash
# Add a changeset for your changes
pnpm changeset

# The release process is automated:
# 1. Changesets creates a "Version Packages" PR
# 2. Merge the PR to trigger publishing
# 3. Packages are published to npm automatically
# 4. GitHub releases are created with changelogs
```

**Important Changeset Rules:**

- **NEVER include ignored packages in changesets**: The `web` and `docs` apps are configured as ignored packages and must not be included in changesets
- **Mixed changesets are not allowed**: A changeset cannot contain both ignored packages (web, docs) and published packages (@csp-kit/\*)
- When creating a changeset that affects both apps and packages, only include the publishable packages in the changeset

Example of INCORRECT changeset:

```yaml
---
'@csp-kit/generator': minor
'web': minor # ❌ This will cause release to fail!
---
```

Example of CORRECT changeset:

```yaml
---
'@csp-kit/generator': minor
# ✅ Omit web/docs even if they have related changes
---
```

**Manual release (for specific packages):**

- Go to Actions → Release workflow
- Click "Run workflow"
- Select package or leave empty for all
- Tags are created as `@csp-kit/package@version`

Note: NPM provenance is disabled (`--provenance=false`) due to CI limitations.

## Architecture Notes

### Design Principles

1. **Service-First**: Configure CSP by services, not individual directives
2. **Data-Package Separation**: Service definitions update independently (inspired by Browserslist)
3. **Type-Safe APIs**: Full TypeScript coverage with strict mode
4. **Security by Default**: Conservative defaults with opt-in for relaxed policies
5. **Tree-Shakeable**: Only bundle the services you use

### Monorepo Setup

- Uses Turborepo for build orchestration and caching
- Workspace packages are referenced with `workspace:*` protocol
- All packages are 100% TypeScript
- Shared configurations are centralized in `packages/` directory
- Build outputs cached in `.next/` and `dist/` directories

### Service System

- Services exported with PascalCase naming: `import { GoogleAnalytics, Stripe } from '@csp-kit/data'`
- 19 categories: analytics, payment, authentication, video, fonts, etc.
- Configurable services support dynamic values:
  ```typescript
  const mapsWithKey = GoogleMaps.configure({ apiKey: 'YOUR_KEY' });
  ```

### API Design

- Simple array syntax: `generateCSP([GoogleAnalytics, Stripe])`
- Options object for advanced usage:
  ```typescript
  generateCSP({
    services: [GoogleAnalytics, Stripe],
    nonce: true,
    additionalRules: {
      /* ... */
    },
    development: { unsafeEval: true },
    production: { reportUri: 'https://...' },
  });
  ```

### App Structure

- Both apps use Next.js 15 with React 19
- Apps use Radix UI components directly for UI elements
- TypeScript strict mode enabled across all packages
- ESLint configured with zero warnings tolerance (`--max-warnings 0`)

### Build System

- Turbo handles dependency ordering and caching
- tsup for TypeScript bundling in packages
- Next.js build system for apps
- Dev mode uses Turbo's TUI interface
- Remote caching available via Vercel integration

## Package Management

- Uses pnpm workspaces defined in `pnpm-workspace.yaml`
- Workspace dependencies are automatically resolved
- Lock file: `pnpm-lock.yaml`
- Node.js >=24 required

## Tech Stack Summary

- **Frontend**: Next.js 15.3, React 19, TypeScript 5.8.2, Tailwind CSS 3.4, Radix UI
- **Build Tools**: Turborepo, pnpm 10.12.4, tsup, Vitest
- **Development**: ESLint (zero warnings), Prettier, TypeScript strict mode
- **Deployment**: Vercel (web app and docs)

## Recent Changes

- Migration to TypeScript services (100% complete)
- Removal of V2 type annotations (CSPOptionsV2 → CSPOptions)
- Fixed npm publish provenance errors
- Updated documentation for PascalCase imports
- **New Release Process**: Implemented Changesets + Conventional Commits
- **CI/CD**: Added GitHub Actions workflows for automated testing and releases
- **Independent Versioning**: Packages can now be released independently

## Important Notes

- Always use PascalCase for service imports (e.g., `GoogleAnalytics`, not `googleAnalytics`)
- The `@csp-kit/data` package must be installed alongside `@csp-kit/generator`
- Service IDs are kebab-case (e.g., 'google-analytics') but exports are PascalCase
- Use the visual web interface for quick CSP generation without coding
