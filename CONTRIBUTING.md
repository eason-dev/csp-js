# Contributing to CSP Kit

Thank you for your interest in contributing to CSP Kit!

## Quick Start

### Ways to Contribute

1. **Add New Services** - [Open an issue](https://github.com/eason-dev/csp-kit/issues/new?template=add-service.md) to request support for new services
2. **Update Services** - Report when existing services change their CSP requirements
3. **Fix Bugs** - Report issues or submit fixes
4. **Improve Documentation** - Fix typos, add examples, improve clarity

For maintainers with CLI access, see the [CLI Guide](./docs/cli-guide.md).

### Development Setup

```bash
# Fork & Clone
git clone https://github.com/yourusername/csp-kit.git
cd csp-kit

# Install Dependencies (requires pnpm)
pnpm install

# Build Packages
pnpm build

# Run Tests
pnpm test

# Start Development
pnpm dev
```

For detailed setup instructions, see [DEVELOPMENT.md](./DEVELOPMENT.md).

### Commit Guidelines

Use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format: <type>(<scope>): <subject>

git commit -m "feat(data): add Vercel Analytics service"
git commit -m "fix(generator): handle empty directives correctly"
git commit -m "docs(web): update installation guide"

# Or use interactive commit tool:
pnpm commit
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`  
**Scopes:** `generator`, `data`, `cli`, `ui`, `web`, `docs`, `deps`, `config`

### Creating Changesets

Before submitting your PR:

```bash
pnpm changeset
# Select packages changed
# Choose version bump (patch/minor/major)
# Write a summary
```

## Project Structure

```
csp-kit/
├── packages/
│   ├── generator/    # Core CSP generation library
│   ├── data/        # Service definitions (106+ services)
│   ├── cli/         # Command-line tools
│   └── *-config/    # Shared configurations
├── apps/
│   ├── web/         # Interactive web interface
│   └── docs/        # Documentation site
└── docs/            # Documentation files
```

## Adding Services

### Using GitHub Issues (Recommended)

Use the [Add Service template](https://github.com/eason-dev/csp-kit/issues/new?template=add-service.md) to request new services.

### Service Categories

- **analytics** - Google Analytics, Mixpanel, Hotjar
- **payment** - Stripe, PayPal, Square
- **social** - Facebook, Twitter, LinkedIn
- **forms** - Typeform, Calendly, Mailchimp
- **chat** - Intercom, Zendesk, Crisp
- **video** - YouTube, Vimeo, Twitch
- **cdn** - Google Fonts, jsDelivr, Cloudflare
- **maps** - Google Maps, Mapbox
- **testing** - Optimizely, Sentry, Cypress
- **other** - Auth0, Firebase, Slack

## Testing

```bash
# Run all tests
pnpm test

# Test specific package
pnpm test --filter @csp-kit/generator

# Check code quality
pnpm lint && pnpm check-types
```

## Issue Templates

- [Add Service](https://github.com/eason-dev/csp-kit/issues/new?template=add-service.md) - Request new service support
- [Update Service](https://github.com/eason-dev/csp-kit/issues/new?template=update-service.md) - Report CSP requirement changes
- [Bug Report](https://github.com/eason-dev/csp-kit/issues/new?template=bug-report.md) - Report bugs or issues
- [Feature Request](https://github.com/eason-dev/csp-kit/issues/new?template=feature-request.md) - Suggest new features

## Getting Help

- **Bug reports** - [GitHub Issues](https://github.com/eason-dev/csp-kit/issues)
- **Questions** - [GitHub Discussions](https://github.com/eason-dev/csp-kit/discussions)
- **Documentation** - [Full docs site](https://csp-kit.eason.ch/docs)

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).
