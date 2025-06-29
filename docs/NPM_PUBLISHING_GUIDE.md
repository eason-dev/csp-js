# NPM Publishing Guide

This guide explains how to publish CSP-JS packages to NPM, including setup, versioning, and release procedures.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Package Configuration](#package-configuration)
- [Publishing Process](#publishing-process)
- [Automated Publishing](#automated-publishing)
- [Manual Publishing](#manual-publishing)
- [Verification](#verification)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### NPM Account Setup

1. **Create NPM Account**: Register at [npmjs.com](https://www.npmjs.com/signup)
2. **Enable 2FA**: Set up two-factor authentication for security
3. **Get Access Token**: Generate automation token for CI/CD

```bash
# Login to NPM
npm login

# Verify login
npm whoami

# Generate automation token (for CI/CD)
npm token create --type=automation
```

### Repository Permissions

Ensure you have:
- **Write access** to the GitHub repository
- **Admin access** to NPM packages
- **Maintainer role** for @csp-js organization

## Package Configuration

### Package.json Setup

All packages are configured with proper NPM publishing settings:

```json
{
  "name": "csp-js",
  "version": "1.0.0",
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/",
    "provenance": true
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/eason-dev/csp-js.git",
    "directory": "packages/csp-js"
  },
  "scripts": {
    "prepare": "npm run build",
    "prepack": "npm run build && npm run test",
    "prepublishOnly": "npm run lint && npm run check-types"
  }
}
```

### Files Configuration

Each package includes only necessary files:

```json
{
  "files": [
    "dist",
    "README.md",
    "CHANGELOG.md"
  ]
}
```

### NPM Configuration

Root `.npmrc` configuration:

```ini
# NPM Configuration
registry=https://registry.npmjs.org/
access=public
fund=true
save-exact=true

# Workspace settings
link-workspace-packages=true
shared-workspace-lockfile=true

# Security settings
audit-level=moderate
package-lock=false

# Publishing settings
provenance=true

# Development settings
engine-strict=true
auto-install-peers=true
```

## Publishing Process

### Package Dependencies

Packages must be published in dependency order:

1. **@csp-js/data** (no dependencies)
2. **csp-js** (depends on @csp-js/data)
3. **@csp-js/cli** (depends on @csp-js/data)

### Version Management

CSP-JS uses **synchronized versioning** - all packages share the same version number:

```bash
# Check current versions
node -p "require('./packages/csp-js/package.json').version"
node -p "require('./packages/csp-data/package.json').version"
node -p "require('./packages/csp-cli/package.json').version"

# Update all package versions
pnpm version:patch   # 1.0.0 → 1.0.1
pnpm version:minor   # 1.0.1 → 1.1.0
pnpm version:major   # 1.1.0 → 2.0.0
```

## Automated Publishing

### GitHub Actions Release

The preferred method is using GitHub Actions for automated publishing:

1. **Create Release Tag**:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. **Monitor Release**:
   - Go to [Actions tab](https://github.com/eason-dev/csp-js/actions)
   - Watch the "Release" workflow
   - Check for any failures

3. **Verify Publication**:
   - Check [NPM packages](https://www.npmjs.com/package/csp-js)
   - Verify GitHub release created
   - Test installation

### Release Workflow Steps

The automated release workflow:

1. **Validation**:
   - Extract version from tag
   - Determine if prerelease
   - Validate package structure

2. **Testing**:
   - Run full test suite
   - Type checking
   - Linting
   - Security audit

3. **Building**:
   - Build all packages
   - Verify artifacts
   - Test package imports

4. **Publishing**:
   - Publish to NPM with provenance
   - Create GitHub release
   - Update documentation

5. **Verification**:
   - Test NPM installation
   - Verify CLI functionality
   - Check package availability

## Manual Publishing

### Using Publishing Script

For manual releases, use the publishing script:

```bash
# Dry run to see what would happen
./scripts/publish.sh --dry-run

# Publish patch release
./scripts/publish.sh patch

# Publish minor release
./scripts/publish.sh minor

# Publish major release
./scripts/publish.sh major

# Skip tests (not recommended)
./scripts/publish.sh patch --skip-tests
```

### Manual Step-by-Step

If the script fails, you can publish manually:

1. **Pre-flight Checks**:
   ```bash
   # Validate everything is ready
   node scripts/validate-release.js
   ```

2. **Update Versions**:
   ```bash
   # Update package versions
   cd packages/csp-data && npm version 1.0.0 --no-git-tag-version
   cd ../csp-js && npm version 1.0.0 --no-git-tag-version
   cd ../csp-cli && npm version 1.0.0 --no-git-tag-version
   ```

3. **Build Packages**:
   ```bash
   pnpm build
   ```

4. **Publish in Order**:
   ```bash
   # Publish csp-data first
   cd packages/csp-data
   npm publish --access public --provenance
   
   # Wait for NPM propagation
   sleep 30
   
   # Publish csp-js
   cd ../csp-js
   npm publish --access public --provenance
   
   # Wait for NPM propagation
   sleep 30
   
   # Publish csp-cli
   cd ../csp-cli
   npm publish --access public --provenance
   ```

5. **Create Git Tag**:
   ```bash
   git add .
   git commit -m "chore(release): v1.0.0"
   git tag v1.0.0
   git push origin main v1.0.0
   ```

## Verification

### Post-Publication Checks

After publishing, verify the release:

1. **NPM Package Availability**:
   ```bash
   # Check packages are available
   npm view csp-js
   npm view @csp-js/data
   npm view @csp-js/cli
   
   # Check specific version
   npm view csp-js@1.0.0
   ```

2. **Installation Test**:
   ```bash
   # Test installation in clean environment
   mkdir test-install && cd test-install
   npm init -y
   npm install csp-js@1.0.0
   
   # Test functionality
   node -e "
     const { generateCSP } = require('csp-js');
     console.log(generateCSP(['google-analytics']).header);
   "
   ```

3. **CLI Test**:
   ```bash
   # Test global CLI installation
   npm install -g @csp-js/cli@1.0.0
   csp-cli --version
   csp-cli generate google-analytics
   ```

4. **Documentation Verification**:
   - Check GitHub release page
   - Verify README badges are updated
   - Confirm documentation links work

### Package Health Checks

Monitor package health after release:

```bash
# Check download stats
npm view csp-js dist-tags
npm view csp-js time

# Monitor for issues
npm audit csp-js
npm outdated csp-js
```

## Troubleshooting

### Common Publishing Issues

#### Authentication Errors

```bash
# Error: You must be logged in to publish packages
npm login

# Error: You do not have permission to publish
# Contact package owner to add you as maintainer
```

#### Version Conflicts

```bash
# Error: Version already exists
# Increment version number
npm version patch

# Error: Version not in sync
# Use the publishing script to sync versions
./scripts/publish.sh patch
```

#### Build Failures

```bash
# Error: Build artifacts missing
pnpm build

# Error: Tests failing
pnpm test

# Error: Type errors
pnpm check-types
```

#### NPM Registry Issues

```bash
# Error: Package not found after publishing
# Wait for NPM propagation (up to 15 minutes)
sleep 300

# Error: Package shows old version
# Clear NPM cache
npm cache clean --force
```

### Emergency Procedures

#### Unpublish Package

```bash
# Unpublish specific version (within 24 hours)
npm unpublish csp-js@1.0.0

# Deprecate version (after 24 hours)
npm deprecate csp-js@1.0.0 "Critical bug - use 1.0.1 instead"
```

#### Rollback Release

```bash
# Publish fixed version
npm version patch
npm publish

# Update documentation
git commit -m "docs: update for emergency release"
git push
```

### Support Channels

If you encounter issues:

1. **Check GitHub Issues**: [Issues page](https://github.com/eason-dev/csp-js/issues)
2. **NPM Support**: [NPM Support](https://www.npmjs.com/support)
3. **Contact Maintainers**: Create issue with `@maintainer` tag

## Publishing Checklist

Before each release:

- [ ] All tests pass (`pnpm test`)
- [ ] No linting errors (`pnpm lint`)
- [ ] TypeScript compiles (`pnpm check-types`)
- [ ] Build successful (`pnpm build`)
- [ ] Version numbers updated
- [ ] CHANGELOG.md updated
- [ ] Git working directory clean
- [ ] NPM authentication verified
- [ ] Package.json metadata current

After each release:

- [ ] NPM packages available
- [ ] Installation works
- [ ] CLI functionality verified
- [ ] GitHub release created
- [ ] Documentation updated
- [ ] Community notified

---

*Last Updated: 2024-06-29*
*Guide Version: 1.0.0*