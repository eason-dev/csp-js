# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Basic

- Always use `pnpm` as package manager.
- Never run `pnpm dev` to validate your changes.
- Always use `Context7 MCP` when working with libraries. Use it to get latest documentation for a library, such as Next.js, React, TailwindCSS, etc.
- Always use `eslint` and `prettier` to format your code.

## Project Structure

This is a Turborepo monorepo with TypeScript and React/Next.js applications. The project uses pnpm as the package manager and requires Node.js >=22.

### Key Directories
- `apps/` - Contains Next.js applications (web, docs)
- `packages/` - Shared packages and libraries
  - `ui/` - React component library shared across apps
  - `eslint-config/` - ESLint configurations
  - `typescript-config/` - TypeScript configurations
  - `csp-js/` - Core CSP functionality (package structure incomplete)
  - `csp-data/` - CSP data handling (package structure incomplete)

## Development Commands

### Core Commands (run from root)
- `pnpm dev` - Start development servers for all apps
- `pnpm build` - Build all apps and packages
- `pnpm lint` - Run ESLint across all packages
- `pnpm check-types` - Type check all packages
- `pnpm format` - Format code using Prettier

### Targeted Commands (using Turbo filters)
- `pnpm exec turbo dev --filter=web` - Run only the web app
- `pnpm exec turbo build --filter=docs` - Build only the docs app
- `pnpm exec turbo lint --filter=@repo/ui` - Lint only the UI package

### Individual App Commands
Navigate to specific app directories for app-specific commands:
- `apps/web/`: `pnpm dev` (runs on port 3000), `pnpm build`, `pnpm lint`, `pnpm check-types`
- `apps/docs/`: Same commands available

## Architecture Notes

### Monorepo Setup
- Uses Turborepo for build orchestration and caching
- Workspace packages are referenced with `workspace:*` protocol
- All packages are 100% TypeScript
- Shared configurations are centralized in `packages/` directory

### Component Library (`@repo/ui`)
- Exports components using path-based exports (`./*` → `./src/*.tsx`)
- Components are client-side React components
- Has a code generator: `pnpm generate:component` for creating new components
- Uses Turbo generators with Handlebars templates

### App Structure
- Both apps use Next.js 15 with React 19
- Apps consume the shared UI library via `@repo/ui` imports
- TypeScript strict mode enabled across all packages
- ESLint configured with zero warnings tolerance (`--max-warnings 0`)

### Build System
- Turbo handles dependency ordering and caching
- Build outputs are cached in `.next/` directories
- Dev mode uses Turbo's TUI interface
- Remote caching available via Vercel integration

## Package Management
- Uses pnpm workspaces defined in `pnpm-workspace.yaml`
- Workspace dependencies are automatically resolved
- Lock file: `pnpm-lock.yaml`