# CLI Guide

Complete guide to CSP Kit command-line tools for service management, contribution, and automation.

## Installation

```bash
# Install globally
npm install -g @csp-kit/cli

# Or use with npx (no installation)
npx @csp-kit/cli --help

# Verify installation
csp-cli --version
```

## Quick Start

```bash
# Add a new service interactively
csp-cli add --interactive

# Update existing service
csp-cli update google-analytics

# Validate service definitions
csp-cli validate

# Check service for changes
csp-cli check stripe --url https://example.com
```

## Commands

### `add` - Add New Service

Add a new service definition to the CSP Kit database.

**Syntax:**

```bash
csp-cli add [options]
```

**Options:**

- `-i, --interactive` - Use interactive mode (recommended)
- `-f, --file <file>` - Load service definition from JSON file

**Interactive Mode (Recommended):**

```bash
csp-cli add --interactive
```

The interactive mode will prompt you for:

- Service ID and name
- Category selection
- Website and documentation URLs
- CSP directive requirements
- Testing and monitoring configuration

**File Mode:**

```bash
# Create service-definition.json
{
  "id": "my-service",
  "name": "My Service",
  "category": "analytics",
  "description": "Description of the service",
  "website": "https://myservice.com",
  "officialDocs": ["https://docs.myservice.com/csp"],
  "cspDirectives": {
    "script-src": ["https://cdn.myservice.com"],
    "connect-src": ["https://api.myservice.com"]
  }
}

csp-cli add --file service-definition.json
```

**Examples:**

```bash
# Add service interactively
csp-cli add -i

# Add from file
csp-cli add --file ./new-service.json
```

### `update` - Update Existing Service

Update an existing service definition.

**Syntax:**

```bash
csp-cli update <service-id> [options]
```

**Arguments:**

- `service-id` - The ID of the service to update

**Options:**

- `-i, --interactive` - Use interactive mode
- `-f, --file <file>` - Load updates from JSON file

**Examples:**

```bash
# Update service interactively
csp-cli update google-analytics --interactive

# Update from file
csp-cli update stripe --file ./stripe-update.json

# Quick update (will prompt for changes)
csp-cli update typeform
```

### `validate` - Validate Service Definitions

Validate service definitions for correctness and completeness.

**Syntax:**

```bash
csp-cli validate [options]
```

**Options:**

- `-s, --service <service-id>` - Validate specific service only

**Examples:**

```bash
# Validate all services
csp-cli validate

# Validate specific service
csp-cli validate --service google-analytics

# Validate multiple services
csp-cli validate -s stripe -s typeform
```

**Validation Checks:**

- ✅ Required fields present
- ✅ Valid category values
- ✅ Proper URL formats
- ✅ CSP directive syntax
- ✅ No duplicate IDs or aliases
- ✅ Schema compliance

### `check` - Check Service for Changes

Check if a service's CSP requirements have changed by analyzing their current implementation.

**Syntax:**

```bash
csp-cli check <service-id> [options]
```

**Arguments:**

- `service-id` - The ID of the service to check

**Options:**

- `-u, --url <url>` - Custom URL to check (optional)

**Examples:**

```bash
# Check service using default test URLs
csp-cli check google-analytics

# Check service using custom URL
csp-cli check stripe --url https://example.com/checkout

# Check multiple services
csp-cli check google-analytics stripe typeform
```

**What it checks:**

- 🔍 Analyzes actual service implementation
- 📊 Compares with current CSP definition
- ⚠️ Reports discrepancies and changes
- 📝 Suggests updates if needed

### `list` - List Services

List available services with filtering and search capabilities.

**Syntax:**

```bash
csp-cli list [options]
```

**Options:**

- `-c, --category <category>` - Filter by category
- `-s, --search <query>` - Search services
- `--json` - Output in JSON format

**Examples:**

```bash
# List all services
csp-cli list

# List analytics services
csp-cli list --category analytics

# Search for services
csp-cli list --search "google"

# Output as JSON
csp-cli list --json
```

**Categories:**

- `analytics` - Analytics and tracking
- `advertising` - Ad networks
- `social` - Social media widgets
- `payment` - Payment processors
- `cdn` - Content delivery networks
- `fonts` - Web font services
- `maps` - Mapping services
- `video` - Video hosting
- `forms` - Form builders
- `chat` - Chat and support
- `testing` - A/B testing
- `monitoring` - Error tracking
- `other` - Other services

### `search` - Search Services

Search for services by name, description, or functionality.

**Syntax:**

```bash
csp-cli search <query>
```

**Examples:**

```bash
# Search for Google services
csp-cli search "google"

# Search for payment services
csp-cli search "payment"

# Search for analytics
csp-cli search "analytics"
```

### `generate` - Generate CSP

Generate CSP policies from the command line.

**Syntax:**

```bash
csp-cli generate <services...> [options]
```

**Arguments:**

- `services...` - List of service IDs

**Options:**

- `--nonce` - Include nonce generation
- `--report-only` - Generate report-only header
- `--format <format>` - Output format (header, meta, json)

**Examples:**

```bash
# Generate CSP header
csp-cli generate google-analytics stripe

# Generate with nonce
csp-cli generate google-analytics --nonce

# Generate as meta tag
csp-cli generate stripe --format meta

# Generate report-only version
csp-cli generate typeform --report-only
```

## Configuration

### Global Configuration

Create `~/.csp-kit/config.json` for global settings:

```json
{
  "defaultCategory": "other",
  "editor": "code",
  "validateOnAdd": true,
  "autoCommit": false,
  "testUrls": {
    "timeout": 10000,
    "retries": 3
  }
}
```

### Project Configuration

Create `.csp-kit.json` in your project root:

```json
{
  "services": ["google-analytics", "stripe"],
  "nonce": true,
  "customRules": {
    "script-src": ["https://my-cdn.com"]
  },
  "reportUri": "https://my-site.com/csp-report"
}
```

## Workflows

### Contributing a New Service

1. **Research the service**

   ```bash
   # Check if service already exists
   csp-cli search "service-name"
   ```

2. **Add the service**

   ```bash
   csp-cli add --interactive
   ```

3. **Validate the service**

   ```bash
   csp-cli validate --service new-service-id
   ```

4. **Test the service**

   ```bash
   csp-cli check new-service-id --url https://test-url.com
   ```

5. **Submit a pull request** (CLI will guide you)

### Updating Existing Services

1. **Check for changes**

   ```bash
   csp-cli check service-id
   ```

2. **Update if needed**

   ```bash
   csp-cli update service-id --interactive
   ```

3. **Validate changes**
   ```bash
   csp-cli validate --service service-id
   ```

### Batch Operations

```bash
# Validate multiple services
csp-cli validate -s google-analytics -s stripe -s typeform

# Update multiple services
for service in google-analytics stripe typeform; do
  csp-cli check $service
done

# Generate CSP for project
csp-cli generate $(cat .csp-services.txt)
```

## Service Definition Format

When adding services manually, use this JSON schema:

```json
{
  "id": "service-id",
  "name": "Service Name",
  "category": "analytics",
  "description": "Brief description of what this service does",
  "website": "https://service.com",
  "officialDocs": ["https://docs.service.com/csp", "https://help.service.com/security"],
  "cspDirectives": {
    "script-src": ["https://cdn.service.com"],
    "connect-src": ["https://api.service.com"],
    "img-src": ["https://images.service.com"]
  },
  "requiresDynamic": false,
  "requiresNonce": false,
  "notes": "Additional implementation notes",
  "aliases": ["service", "svc"],
  "lastUpdated": "2024-07-05T00:00:00.000Z",
  "verifiedAt": "2024-07-05T00:00:00.000Z",
  "monitoring": {
    "testUrls": ["https://service.com/demo"],
    "checkInterval": "weekly",
    "alertOnBreaking": true
  }
}
```

### Field Descriptions

| Field             | Required | Description                    |
| ----------------- | -------- | ------------------------------ |
| `id`              | ✅       | Unique identifier (kebab-case) |
| `name`            | ✅       | Human-readable service name    |
| `category`        | ✅       | Service category               |
| `description`     | ✅       | Brief description              |
| `website`         | ✅       | Official website URL           |
| `officialDocs`    | ✅       | Array of documentation URLs    |
| `cspDirectives`   | ✅       | CSP requirements object        |
| `requiresDynamic` | ❌       | Requires 'strict-dynamic'      |
| `requiresNonce`   | ❌       | Requires nonce                 |
| `notes`           | ❌       | Additional notes               |
| `aliases`         | ❌       | Alternative identifiers        |
| `lastUpdated`     | ✅       | ISO timestamp                  |
| `verifiedAt`      | ❌       | Last verification timestamp    |
| `monitoring`      | ❌       | Monitoring configuration       |

## Automation & CI/CD

### GitHub Actions Integration

```yaml
# .github/workflows/csp-check.yml
name: CSP Service Check
on:
  schedule:
    - cron: '0 0 * * 1' # Weekly on Monday

jobs:
  check-services:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install -g @csp-kit/cli
      - run: csp-cli validate
      - run: csp-cli check google-analytics stripe
```

### Pre-commit Hook

```bash
# .git/hooks/pre-commit
#!/bin/bash
if command -v csp-cli &> /dev/null; then
  echo "Validating CSP service definitions..."
  csp-cli validate
fi
```

### Package.json Scripts

```json
{
  "scripts": {
    "csp:validate": "csp-cli validate",
    "csp:check": "csp-cli check google-analytics stripe",
    "csp:generate": "csp-cli generate google-analytics stripe > csp-header.txt"
  }
}
```

## Troubleshooting

### Common Issues

**Command not found:**

```bash
# Check installation
npm list -g @csp-kit/cli

# Reinstall if needed
npm install -g @csp-kit/cli
```

**Permission errors:**

```bash
# Use npx instead
npx @csp-kit/cli add --interactive

# Or fix npm permissions
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
```

**Service validation fails:**

```bash
# Check specific errors
csp-cli validate --service service-id

# View detailed logs
DEBUG=csp-cli* csp-cli validate
```

**Network timeouts during checks:**

```bash
# Increase timeout in config
{
  "testUrls": {
    "timeout": 30000,
    "retries": 5
  }
}
```

### Debug Mode

Enable debug logging for troubleshooting:

```bash
# Enable debug logs
DEBUG=csp-cli* csp-cli add --interactive

# Or set environment variable
export DEBUG=csp-cli*
csp-cli validate
```

## Environment Variables

| Variable         | Description            | Default                  |
| ---------------- | ---------------------- | ------------------------ |
| `CSP_CLI_CONFIG` | Path to config file    | `~/.csp-kit/config.json` |
| `CSP_CLI_CACHE`  | Cache directory        | `~/.csp-kit/cache`       |
| `DEBUG`          | Enable debug logging   | -                        |
| `NO_COLOR`       | Disable colored output | -                        |

## Examples

### Real-world Scenarios

**Adding Google Tag Manager:**

```bash
csp-cli add --interactive
# ID: google-tag-manager
# Category: analytics
# CSP: script-src https://www.googletagmanager.com
```

**Updating Stripe after API changes:**

```bash
csp-cli check stripe --url https://stripe.com/docs
csp-cli update stripe --interactive
```

**Validating all analytics services:**

```bash
csp-cli list --category analytics --json | jq -r '.[].id' | xargs -I {} csp-cli validate --service {}
```

## Contributing to CLI

The CLI tool is open source and welcomes contributions:

- **🐛 [Report bugs](https://github.com/eason-dev/csp-kit/issues)**
- **💡 [Suggest features](https://github.com/eason-dev/csp-kit/discussions)**
- **🔧 [Submit pull requests](https://github.com/eason-dev/csp-kit/pulls)**

### Development Setup

```bash
git clone https://github.com/eason-dev/csp-kit.git
cd csp-kit/packages/cli
pnpm install
pnpm build
npm link

# Test your changes
csp-cli --help
```

---

## Need Help?

- 📖 **[Getting Started](./getting-started.md)**
- 📚 **[API Reference](./api-reference.md)**
- 🐛 **[GitHub Issues](https://github.com/eason-dev/csp-kit/issues)**
- 💬 **[GitHub Discussions](https://github.com/eason-dev/csp-kit/discussions)**
