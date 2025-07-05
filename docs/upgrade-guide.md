# Upgrade Guide

Keep your CSP Kit packages up-to-date to get the latest service definitions, security fixes, and new features.

## Quick Upgrade

```bash
# Upgrade both packages together (recommended)
npm update @csp-kit/generator @csp-kit/data

# Or using other package managers
yarn upgrade @csp-kit/generator @csp-kit/data
pnpm update @csp-kit/generator @csp-kit/data
```

## Understanding CSP Kit's Architecture

CSP Kit uses a **data-package separation** model inspired by [browserslist](https://github.com/browserslist/browserslist):

### 📦 **Package Structure**

| Package | Purpose | Update Frequency |
|---------|---------|------------------|
| **`@csp-kit/generator`** | Core library with stable API | Monthly (features/fixes) |
| **`@csp-kit/data`** | Service definitions database | Weekly (service updates) |
| **`@csp-kit/cli`** | Command-line tools | Monthly (features/fixes) |

### 🎯 **Why Separate Packages?**

**Benefits:**
- ✅ **Fast Service Updates**: Get new services without library updates
- ✅ **Stable API**: Core library changes rarely, reducing breaking changes  
- ✅ **Smaller Bundles**: Only include what you need
- ✅ **Independent Versioning**: Service data can update independently
- ✅ **Community Driven**: Easy for contributors to add/update services

**Example:**
```bash
# Service data updates frequently
@csp-kit/data: 1.0.0 → 1.1.0 → 1.2.0 → 1.3.0 (new services added)

# Core library stays stable
@csp-kit/generator: 1.0.0 → 1.0.0 → 1.0.0 → 1.1.0 (new features)
```

## Checking Current Versions

### View Installed Versions

```bash
# Check your current versions
npm list @csp-kit/generator @csp-kit/data

# Or in package.json
cat package.json | grep csp-kit
```

### Check Latest Versions

```bash
# Check what's available
npm info @csp-kit/generator @csp-kit/data

# View version history
npm view @csp-kit/data versions --json
```

### Using CLI

```bash
# If you have CLI installed
csp-cli --version

# Check for CLI updates
npm info @csp-kit/cli
```

## Upgrade Strategies

### 1. 🚀 **Automatic Updates (Recommended)**

Keep packages automatically updated with your CI/CD:

**package.json:**
```json
{
  "dependencies": {
    "@csp-kit/generator": "^1.0.0",
    "@csp-kit/data": "^1.0.0"
  }
}
```

**GitHub Actions:**
```yaml
# .github/workflows/update-csp.yml
name: Update CSP Kit
on:
  schedule:
    - cron: '0 0 * * 1'  # Weekly on Monday

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm update @csp-kit/generator @csp-kit/data
      - run: npm test  # Verify everything works
      # Optionally create PR with updates
```

### 2. 📅 **Scheduled Updates**

Update regularly to get latest service definitions:

```bash
# Weekly update script
#!/bin/bash
echo "Updating CSP Kit packages..."
npm update @csp-kit/generator @csp-kit/data

echo "Current versions:"
npm list @csp-kit/generator @csp-kit/data

echo "Running tests..."
npm test
```

### 3. 🎯 **Manual Updates**

Update when you need specific services or features:

```bash
# Check what services were added recently
npm view @csp-kit/data --json | jq '.versions | keys'

# Update to get new services
npm update @csp-kit/data

# Test that your CSP still works
node -e "console.log(require('@csp-kit/generator').generateCSP(['your-services']))"
```

## Migration Guides

### From v0.x to v1.x

**Breaking Changes:**
- ❌ Version support removed (no more `service@1.0.0`)
- ❌ Legacy service format deprecated
- ✅ Simplified service definitions
- ✅ Better TypeScript support

**Migration Steps:**

1. **Update service references:**
   ```javascript
   // Old (v0.x)
   generateCSP(['google-analytics@4.0.0'])
   
   // New (v1.x) - always uses latest
   generateCSP(['google-analytics'])
   ```

2. **Update package.json:**
   ```json
   {
     "dependencies": {
       "@csp-kit/generator": "^1.0.0",
       "@csp-kit/data": "^1.0.0"
     }
   }
   ```

3. **Test your implementation:**
   ```bash
   npm update @csp-kit/generator @csp-kit/data
   npm test
   ```

### Future Migrations

We follow [semantic versioning](https://semver.org/):

- **Patch (1.0.1)**: Bug fixes, new services
- **Minor (1.1.0)**: New features, backward compatible
- **Major (2.0.0)**: Breaking changes (rare)

## Update Notifications

### Enable Update Checks

**CLI notifications:**
```bash
# CLI will notify about updates
csp-cli check google-analytics
# → ℹ️ Update available: @csp-kit/data 1.2.0 → 1.3.0
```

**Programmatic checks:**
```javascript
import { getServiceRegistry } from '@csp-kit/generator';

const registry = await getServiceRegistry();
console.log(`Data version: ${registry.version}`);
console.log(`Last updated: ${registry.lastUpdated}`);
```

### npm-check-updates

Use [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) for automation:

```bash
# Install globally
npm install -g npm-check-updates

# Check for CSP Kit updates
npx ncu '@csp-kit/*'

# Update automatically
npx ncu -u '@csp-kit/*'
npm install
```

## Testing After Updates

### Verify Service Generation

```javascript
// test-csp-update.js
import { generateCSP, getServiceRegistry } from '@csp-kit/generator';

async function testUpdate() {
  // Test core functionality
  const result = generateCSP(['google-analytics', 'stripe']);
  console.log('✅ CSP Generation:', result.header);
  
  // Check service count
  const registry = await getServiceRegistry();
  console.log(`✅ Total services: ${Object.keys(registry.services).length}`);
  
  // Test your specific services
  const yourServices = ['google-analytics', 'stripe']; // Your services
  const testResult = generateCSP(yourServices);
  
  if (testResult.unknownServices.length === 0) {
    console.log('✅ All your services found');
  } else {
    console.warn('⚠️ Unknown services:', testResult.unknownServices);
  }
}

testUpdate();
```

```bash
node test-csp-update.js
```

### Automated Testing

**package.json scripts:**
```json
{
  "scripts": {
    "test:csp": "node test-csp-update.js",
    "update:csp": "npm update @csp-kit/generator @csp-kit/data && npm run test:csp"
  }
}
```

**CI/CD integration:**
```yaml
# In your GitHub Actions workflow
- name: Test CSP after update
  run: |
    npm update @csp-kit/generator @csp-kit/data
    npm run test:csp
    # Your other tests
```

## Rollback Strategy

If an update causes issues:

### 1. **Quick Rollback**

```bash
# Rollback to previous version
npm install @csp-kit/generator@1.0.0 @csp-kit/data@1.0.0

# Or using lockfile
git checkout -- package-lock.json
npm ci
```

### 2. **Pin Specific Versions**

```json
{
  "dependencies": {
    "@csp-kit/generator": "1.0.0",
    "@csp-kit/data": "1.0.0"
  }
}
```

### 3. **Gradual Updates**

```bash
# Update data package only (safer)
npm update @csp-kit/data

# Test thoroughly
npm test

# Then update core if needed
npm update @csp-kit/generator
```

## Monitoring Updates

### Dependabot Configuration

**.github/dependabot.yml:**
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    groups:
      csp-kit:
        patterns:
          - "@csp-kit/*"
```

### Release Notifications

- **📧 [Watch releases](https://github.com/eason-dev/csp-kit/releases)** on GitHub
- **🐦 [Follow @cspkit](https://twitter.com/cspkit)** for announcements
- **📬 [Subscribe to newsletter](https://csp-kit.eason.ch/newsletter)**

## Update Checklist

### Before Updating

- [ ] Check [CHANGELOG.md](https://github.com/eason-dev/csp-kit/blob/main/CHANGELOG.md)
- [ ] Review your current CSP implementation
- [ ] Backup your current package-lock.json
- [ ] Ensure tests are passing

### During Update

- [ ] Update both packages together
- [ ] Check for new unknown services
- [ ] Verify CSP header generation
- [ ] Test in staging environment

### After Update

- [ ] Run full test suite  
- [ ] Check CSP headers in browser dev tools
- [ ] Monitor for CSP violations
- [ ] Update documentation if needed

## Troubleshooting Updates

### Common Issues

**Service not found after update:**
```javascript
// Check if service was renamed or removed
import { searchServices } from '@csp-kit/generator';

const results = await searchServices('old-service-name');
console.log('Similar services:', results.map(s => s.id));
```

**CSP generation fails:**
```javascript
// Clear cache and reload
import { clearServicesCache, loadServices } from '@csp-kit/generator';

clearServicesCache();
await loadServices();
```

**Version conflicts:**
```bash
# Check for conflicts
npm ls @csp-kit/generator @csp-kit/data

# Fix conflicts
npm install @csp-kit/generator@latest @csp-kit/data@latest
```

### Getting Help

If you encounter issues during updates:

- 🐛 **[Report issues](https://github.com/eason-dev/csp-kit/issues)**
- 💬 **[Ask questions](https://github.com/eason-dev/csp-kit/discussions)**
- 📖 **[Check documentation](https://csp-kit.eason.ch/docs)**

## Best Practices

### 1. **Regular Updates**
- Update weekly to get latest service definitions
- Set up automated updates in CI/CD
- Monitor for security updates

### 2. **Testing Strategy**
- Always test after updates
- Use staging environment first
- Monitor CSP violations post-update

### 3. **Version Pinning**
- Pin versions in production
- Use ranges for development
- Document version requirements

### 4. **Monitoring**
- Watch for update notifications
- Subscribe to release notes
- Join the community discussions

---

## Need Help?

- 📖 **[Getting Started](./getting-started.md)**
- 📚 **[API Reference](./api-reference.md)**
- 🛠️ **[CLI Guide](./cli-guide.md)**
- 🐛 **[GitHub Issues](https://github.com/eason-dev/csp-kit/issues)**
- 💬 **[GitHub Discussions](https://github.com/eason-dev/csp-kit/discussions)**