# TypeScript Web Development Rules

## Package Management & Dependencies

- Always use `pnpm` as package manager for this monorepo
- Never run `pnpm dev` to validate your changes - use proper build/test commands instead
- Use `pnpm install` to add dependencies, respecting workspace configurations in [pnpm-workspace.yaml](mdc:pnpm-workspace.yaml)
- When adding dependencies, consider if they belong in the root, specific apps, or shared packages

## Library Documentation & Research

- Always use `Context7 MCP` when working with libraries to get the latest documentation
- Use Context7 MCP for libraries like Next.js, React, TailwindCSS, TypeScript, and other dependencies
- Verify API compatibility and best practices through official documentation before implementation

## Code Quality & Formatting

- Prefer using `eslint` and `prettier` to format your code
- Follow existing ESLint configurations in [packages/eslint-config/](mdc:packages/eslint-config/)
- Maintain consistent TypeScript configuration based on [packages/typescript-config/](mdc:packages/typescript-config/)
- Use TypeScript strict mode and proper type definitions

## Project Structure & Organization

- This is a monorepo with apps in [apps/](mdc:apps/) and shared packages in [packages/](mdc:packages/)
- Apps: [apps/docs/](mdc:apps/docs/) and [apps/web/](mdc:apps/web/) are Next.js applications
- Shared packages: UI components in [packages/ui/](mdc:packages/ui/), configurations, and utilities
- Follow the established directory structure and naming conventions

## Next.js Development

- Both apps use Next.js App Router (app directory structure)
- Shared layouts are in [app/layout.tsx](mdc:apps/docs/app/layout.tsx) and [app/layout.tsx](mdc:apps/web/app/layout.tsx)
- Global styles in [app/globals.css](mdc:apps/docs/app/globals.css) and [app/globals.css](mdc:apps/web/app/globals.css)
- Use Next.js 14+ features and best practices

## Component Development

- Shared UI components should be placed in [packages/ui/src/](mdc:packages/ui/src/)
- Existing components: [button.tsx](mdc:packages/ui/src/button.tsx), [card.tsx](mdc:packages/ui/src/card.tsx), [code.tsx](mdc:packages/ui/src/code.tsx)
- Follow React best practices with proper TypeScript props interfaces
- Use component generators available in [turbo/generators/](mdc:turbo/generators/)

## Build & Development Workflow

- Use Turbo for build orchestration as configured in [turbo.json](mdc:turbo.json)
- Respect workspace dependencies and build order
- Test changes across affected packages and apps
- Use proper TypeScript compilation and type checking

## File References & Imports

- Use relative imports within packages, workspace imports between packages
- Maintain proper export/import structure for shared packages
- Keep dependencies up to date and compatible across the workspace

## Best Practices

- Write self-documenting code with proper TypeScript types
- Use meaningful component and variable names
- Implement proper error handling and loading states
- Follow accessibility best practices in UI components
- Maintain consistent code style across the monorepo
