# @csp-kit/cli

Command-line tools for CSP Kit - manage service definitions, validate configurations, and contribute to the CSP Kit ecosystem.

## Installation

```bash
# Install globally
npm install -g @csp-kit/cli

# Or use with npx (no installation)
npx @csp-kit/cli --help
```

## Quick Start

```bash
# Add a new service
csp-cli add --interactive

# Validate service definitions
csp-cli validate

# Generate CSP from command line
csp-cli generate google-analytics stripe --output header
```

## Available Commands

### Service Management

- `add` - Add new service definitions interactively
- `update` - Update existing service definitions
- `validate` - Validate service definition correctness
- `check` - Check services for CSP requirement changes

### Utilities

- `list` - List available services by category
- `search` - Search services by name or description
- `generate` - Generate CSP headers from command line

## For Contributors

The CLI is primarily designed for maintainers and contributors to manage service definitions. For regular usage, we recommend:

- **[Web Interface](https://csp-kit.eason.ch)** - Visual CSP generator
- **[@csp-kit/generator](https://www.npmjs.com/package/@csp-kit/generator)** - JavaScript/TypeScript API
- **[@csp-kit/data](https://www.npmjs.com/package/@csp-kit/data)** - Service definitions

## Documentation

For detailed CLI documentation, see the [CLI Guide](https://github.com/eason-dev/csp-kit/blob/main/docs/cli-guide.md).

## License

MIT © [CSP Kit Contributors](https://github.com/eason-dev/csp-kit/graphs/contributors)
