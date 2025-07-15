# Development Environment Setup

This guide provides comprehensive instructions for setting up a development environment for CSP Kit.

## Prerequisites

### Required Software

- **Node.js**: v22+ (check `.nvmrc` for exact version)
- **pnpm**: v10.12.4+ (required package manager)
- **Git**: Latest version
- **IDE**: VS Code recommended (see IDE setup below)

### System Requirements

- **OS**: macOS, Linux, or Windows with WSL2
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 2GB free space for dependencies

## Initial Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/eason-dev/csp-kit.git
cd csp-kit

# Use correct Node version (if using nvm)
nvm use

# Install pnpm if not already installed
npm install -g pnpm@10.12.4

# Install all dependencies
pnpm install

# Build all packages (required for initial setup)
pnpm build
```

### 2. Verify Installation

```bash
# Run all tests to ensure setup is correct
pnpm test

# Check for linting issues
pnpm lint

# Type check all packages
pnpm check-types

# Format check
pnpm format:check
```

## IDE Setup

### VS Code Extensions (Recommended)

Install these extensions for the best development experience:

```json
{
  "recommendations": [
    // Essential
    "dbaeumer.vscode-eslint", // ESLint integration
    "esbenp.prettier-vscode", // Prettier formatting
    "ms-vscode.vscode-typescript-next", // Latest TypeScript features

    // Highly Recommended
    "vivaxy.vscode-conventional-commits", // Commit message helper
    "streetsidesoftware.code-spell-checker", // Spell checking
    "christian-kohler.path-intellisense", // Path autocomplete
    "aaron-bond.better-comments", // Highlighted comments
    "usernamehw.errorlens", // Inline error display

    // Optional but Useful
    "yoavbls.pretty-ts-errors", // Better TypeScript errors
    "bradlc.vscode-tailwindcss", // Tailwind CSS IntelliSense
    "formulahendry.auto-rename-tag", // Auto rename HTML tags
    "naumovs.color-highlight", // CSS color preview
    "wayou.vscode-todo-highlight", // TODO highlighting
    "gruntfuggly.todo-tree", // TODO tree view
    "eamodio.gitlens", // Git supercharged
    "github.copilot" // GitHub Copilot (if available)
  ]
}
```

### VS Code Settings

Add to your workspace settings (`.vscode/settings.json`):

```json
{
  // Format on save
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",

  // ESLint auto-fix on save
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },

  // TypeScript settings
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,

  // File associations
  "files.associations": {
    "*.css": "tailwindcss"
  },

  // Exclude files from search
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/.turbo": true,
    "**/.next": true
  },

  // Auto-save delay
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000
}
```

### Other IDE Setup

#### WebStorm / IntelliJ IDEA

1. Enable ESLint: Settings → Languages & Frameworks → JavaScript → Code Quality Tools → ESLint
2. Enable Prettier: Settings → Languages & Frameworks → JavaScript → Prettier
3. Set TypeScript version: Settings → Languages & Frameworks → TypeScript → TypeScript: `Project`

#### Neovim / Vim

Install these plugins:

- `neoclide/coc.nvim` with coc-tsserver, coc-eslint, coc-prettier
- `nvim-treesitter/nvim-treesitter` for syntax highlighting

## Development Workflow

### Starting Development

```bash
# Start all apps and packages in dev mode
pnpm dev

# Start specific app only
pnpm exec turbo dev --filter=web     # Web app only
pnpm exec turbo dev --filter=docs    # Docs only

# Run specific package in dev mode
pnpm --filter @csp-kit/generator dev
```

### Code Quality Commands

```bash
# Linting (zero warnings policy)
pnpm lint                   # Check all packages
pnpm lint:fix              # Auto-fix issues
pnpm exec turbo lint --filter=@csp-kit/generator  # Lint specific package

# Type checking
pnpm check-types           # Check all packages
pnpm --filter @csp-kit/generator check-types  # Check specific package

# Formatting
pnpm format               # Format all files
pnpm format:check        # Check formatting without fixing

# Testing
pnpm test                # Run all tests
pnpm test:coverage      # Run with coverage
pnpm --filter @csp-kit/generator test  # Test specific package
pnpm --filter @csp-kit/generator test:watch  # Watch mode
```

### Git Workflow

#### Commit Messages

We use conventional commits with Commitizen:

```bash
# Interactive commit (recommended)
pnpm commit

# Manual commit (must follow convention)
git commit -m "feat(generator): add new CSP directive support"
```

Format: `<type>(<scope>): <subject>`

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Test additions or corrections
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Other changes (dependencies, etc.)
- `revert`: Revert a previous commit

**Scopes:**

- `generator`: Core generator package
- `data`: Service definitions package
- `cli`: CLI tools package
- `ui`: UI components package
- `web`: Web app
- `docs`: Documentation site
- `deps`: Dependencies
- `release`: Release-related changes
- `config`: Configuration changes
- `ci`: CI/CD changes
- `root`: Root-level changes

#### Pre-commit Hooks

Husky runs these checks before each commit:

- ESLint with auto-fix
- Prettier formatting
- Commit message validation (commitlint)

To bypass temporarily (not recommended):

```bash
git commit --no-verify -m "WIP: debugging"
```

### Creating Changesets

Before submitting a PR, create a changeset:

```bash
# Create a changeset
pnpm changeset

# Follow the prompts:
# 1. Select packages that changed
# 2. Choose version bump type (patch/minor/major)
# 3. Write a summary of changes
```

## Package-Specific Development

### Generator Package (`@csp-kit/generator`)

```bash
cd packages/generator

# Run tests in watch mode
pnpm test:watch

# Build the package
pnpm build

# Type check
pnpm check-types
```

### Data Package (`@csp-kit/data`)

```bash
cd packages/data

# Validate all service definitions
pnpm validate

# Add a new service (interactive)
pnpm add-service

# Run tests
pnpm test
```

### CLI Package (`@csp-kit/cli`)

```bash
cd packages/cli

# Build the CLI
pnpm build

# Test CLI locally
node dist/cli.js --help
```

### Web App

```bash
cd apps/web

# Start development server
pnpm dev

# Build for production
pnpm build

# Run production build locally
pnpm start
```

## Environment Variables

### Development

No environment variables are required for basic development. Optional variables:

```bash
# Enable Turbo remote caching (optional)
TURBO_TOKEN=your-token
TURBO_TEAM=your-team

# Vercel integration (optional)
VERCEL_TOKEN=your-token
```

### Testing

```bash
# Run tests in CI mode
CI=true pnpm test

# Enable test coverage threshold
TEST_COVERAGE_THRESHOLD=90
```

## Troubleshooting

### Common Issues

#### 1. pnpm install fails

```bash
# Clear pnpm cache
pnpm store prune

# Remove node_modules and reinstall
rm -rf node_modules
rm -rf packages/*/node_modules
rm -rf apps/*/node_modules
pnpm install
```

#### 2. TypeScript errors after pulling changes

```bash
# Rebuild all packages
pnpm build

# Restart TypeScript server in VS Code
# Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

#### 3. ESLint not working in IDE

```bash
# Check ESLint is installed
pnpm list eslint

# Verify ESLint config
pnpm exec eslint --print-config .

# Restart ESLint server in VS Code
# Cmd/Ctrl + Shift + P → "ESLint: Restart ESLint Server"
```

#### 4. Tests failing locally but not in CI

```bash
# Run tests in CI mode
CI=true pnpm test

# Clear test cache
pnpm test --clearCache
```

#### 5. Build failures

```bash
# Clean build artifacts
pnpm clean

# Clear Turbo cache
rm -rf .turbo

# Rebuild everything
pnpm build
```

### Debug Mode

Enable debug logging:

```bash
# Turbo debug mode
TURBO_LOG_LEVEL=debug pnpm build

# Node debug mode
NODE_DEBUG=* pnpm dev

# Verbose npm/pnpm logging
pnpm --loglevel=verbose install
```

## Performance Tips

### 1. Use Turbo Filters

```bash
# Only work on what you need
pnpm exec turbo dev --filter=web --filter=@csp-kit/generator

# Build only changed packages
pnpm exec turbo build --filter='[HEAD^1]'
```

### 2. Enable Turbo Remote Caching

```bash
# Link to Vercel (one-time setup)
pnpm dlx turbo login
pnpm dlx turbo link
```

### 3. Optimize VS Code

```json
{
  // Disable features for large files
  "editor.largeFileOptimizations": true,

  // Exclude folders from file watcher
  "files.watcherExclude": {
    "**/.turbo": true,
    "**/dist": true,
    "**/.next": true
  }
}
```

## Code Style Guidelines

### TypeScript

- Use strict mode (`strict: true`)
- No implicit `any`
- Prefer `interface` over `type` for object shapes
- Use `.js` extensions for local imports
- Document public APIs with JSDoc

### React/Next.js

- Use functional components
- Prefer named exports
- Co-locate styles with components
- Use server components by default (Next.js 15)

### Testing

- Write tests alongside code (`__tests__` folders)
- Use descriptive test names
- Test behavior, not implementation
- Aim for 90%+ coverage on new code

## Getting Help

- **Documentation**: Check `/docs` folder
- **Examples**: See `/docs/examples`
- **Discussions**: [GitHub Discussions](https://github.com/eason-dev/csp-kit/discussions)
- **Issues**: [GitHub Issues](https://github.com/eason-dev/csp-kit/issues)

## Additional Resources

- [Contributing Guide](./CONTRIBUTING.md) - How to contribute
- [Architecture Guide](./docs/maintainer/architecture.md) - System design
- [API Reference](./docs/api-reference.md) - Detailed API docs
- [Maintainer Guide](./docs/maintainer/MAINTAINER_GUIDE.md) - For maintainers

---

Happy coding! 🚀
