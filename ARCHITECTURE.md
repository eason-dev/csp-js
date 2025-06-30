# 🏗️ Architecture

## Project Structure

CSP Kit is built as a modular monorepo with clear separation of concerns:

```
csp-kit/
├── packages/
│   ├── generator/       # Core library and CSP generation
│   ├── data/            # Service definitions database
│   └── cli/             # Command-line tools
├── apps/
│   ├── web/             # Interactive web interface (Next.js)
│   └── docs/            # Documentation site
└── packages/
    ├── ui/              # Shared UI components
    └── typescript-config/ # Shared TypeScript configurations
```

## Design Principles

1. **Service-First**: Configure CSP by services, not individual directives
2. **Version Aware**: Support multiple versions of service implementations
3. **Automated Updates**: Monitor services for CSP requirement changes
4. **Developer Experience**: Intuitive APIs with comprehensive TypeScript support
5. **Security by Default**: Conservative defaults with opt-in for relaxed policies

## Development Setup

### Project Structure

- **Monorepo**: Uses Turborepo for efficient builds and caching
- **Package Manager**: pnpm with workspaces
- **TypeScript**: 100% TypeScript with strict mode
- **Testing**: Vitest for unit tests
- **Linting**: ESLint + Prettier with zero-warning policy
- **CI/CD**: GitHub Actions for testing, building, and deployment

### Development Commands

```bash
# Root commands (run from project root)
pnpm dev          # Start all development servers
pnpm build        # Build all packages
pnpm test         # Run all tests
pnpm lint         # Lint all packages
pnpm check-types  # TypeScript type checking
pnpm format       # Format code with Prettier

# Package-specific commands
pnpm --filter @csp-kit/generator test # Test specific package
pnpm --filter web dev            # Start web app only
pnpm --filter @csp-kit/cli build    # Build CLI only
```

## Contributing Guide

### Quick Contribution Setup

1. **Fork & Clone**

   ```bash
   git clone https://github.com/yourusername/csp-kit.git
   cd csp-kit
   ```

2. **Install Dependencies**

   ```bash
   pnpm install
   ```

3. **Development Setup**

   ```bash
   # Build all packages
   pnpm build

   # Run tests
   pnpm test

   # Start development servers
   pnpm dev
   ```

4. **Add New Services**

   ```bash
   # Interactive service addition
   pnpm cli add --interactive

   # Or manually edit packages/data/data/services/
   ```

## Security Considerations

- **Conservative Defaults**: CSP Kit uses strict defaults and warns about insecure configurations
- **Nonce Support**: Built-in nonce generation for secure inline script execution
- **Regular Updates**: Service definitions are actively monitored and updated
- **Community Driven**: Security issues are quickly addressed through community involvement
