# Release Process

This document outlines the complete release process for CSP-JS, including versioning strategy, testing procedures, and deployment steps.

## Table of Contents

- [Release Types](#release-types)
- [Versioning Strategy](#versioning-strategy)
- [Release Schedule](#release-schedule)
- [Pre-Release Checklist](#pre-release-checklist)
- [Release Steps](#release-steps)
- [Post-Release Tasks](#post-release-tasks)
- [Emergency Releases](#emergency-releases)
- [Rollback Procedures](#rollback-procedures)

## Release Types

### 1. Patch Releases (x.x.X)

**Purpose**: Bug fixes, service updates, documentation improvements

**Frequency**: As needed (typically weekly)

**Examples**:

- Fix CSP generation bug
- Update service CSP requirements
- Correct documentation errors
- Security patches

**Approval**: Single maintainer approval required

### 2. Minor Releases (x.X.x)

**Purpose**: New features, service additions, backward-compatible changes

**Frequency**: Monthly

**Examples**:

- Add new service support
- New API methods or options
- Enhanced CLI functionality
- Performance improvements

**Approval**: Two maintainer approvals required

### 3. Major Releases (X.x.x)

**Purpose**: Breaking changes, major architecture updates

**Frequency**: Quarterly or as needed

**Examples**:

- Breaking API changes
- Remove deprecated features
- Major architecture refactoring
- Update minimum Node.js version

**Approval**: All maintainer approvals + community notice period

## Versioning Strategy

### Package Versioning

CSP-JS follows **Semantic Versioning (SemVer)**:

```
MAJOR.MINOR.PATCH

1.0.0 → 1.0.1  (patch: bug fix)
1.0.1 → 1.1.0  (minor: new feature)
1.1.0 → 2.0.0  (major: breaking change)
```

### Service Data Versioning

Service definitions use **independent versioning**:

```json
{
  "versions": {
    "1.0.0": {
      /* initial version */
    },
    "1.1.0": {
      /* added features */
    },
    "2.0.0": {
      /* breaking changes */
    }
  }
}
```

### Cross-Package Compatibility

| csp-js | csp-data | csp-cli | Compatibility |
| ------ | -------- | ------- | ------------- |
| 1.x.x  | 1.x.x    | 1.x.x   | ✅ Full       |
| 1.x.x  | 2.x.x    | 1.x.x   | ⚠️ Limited    |
| 2.x.x  | 1.x.x    | 1.x.x   | ❌ None       |

## Release Schedule

### Regular Release Cycle

```
Week 1: Development & Feature Work
Week 2: Development & Service Updates
Week 3: Testing & Bug Fixes
Week 4: Release Preparation & Deployment
```

### Monthly Release Calendar

- **1st Monday**: Minor release planning
- **2nd Monday**: Feature freeze for minor releases
- **3rd Monday**: Release candidate testing
- **4th Monday**: Release deployment

### Emergency Releases

- **Security Issues**: Within 24 hours
- **Critical Bugs**: Within 48 hours
- **Service Outages**: Within 4 hours

## Pre-Release Checklist

### Code Quality

- [ ] **All tests pass**

  ```bash
  pnpm test
  ```

- [ ] **Zero linting warnings**

  ```bash
  pnpm lint
  ```

- [ ] **TypeScript compilation successful**

  ```bash
  pnpm check-types
  ```

- [ ] **Build successful**
  ```bash
  pnpm build
  ```

### Service Validation

- [ ] **Service definitions validated**

  ```bash
  csp-cli validate
  ```

- [ ] **Service CSP requirements tested**

  ```bash
  pnpm test:services
  ```

- [ ] **Breaking service changes documented**

### Documentation

- [ ] **CHANGELOG.md updated**
- [ ] **README badges current**
- [ ] **API documentation updated**
- [ ] **Migration guides prepared** (for breaking changes)

### Security

- [ ] **Dependency audit clean**

  ```bash
  pnpm audit
  ```

- [ ] **No secrets in codebase**
- [ ] **Security review completed** (for major releases)

### Performance

- [ ] **Bundle size regression check**
- [ ] **Performance benchmarks run**
- [ ] **Memory usage validated**

## Release Steps

### 1. Preparation Phase

**Create Release Branch**:

```bash
git checkout main
git pull origin main
git checkout -b release/v1.2.0
```

**Update Version Numbers**:

```bash
# Update package.json files
pnpm version 1.2.0

# Update dependency versions in workspace
pnpm update:workspace-versions
```

**Update Documentation**:

```bash
# Generate CHANGELOG.md entry
pnpm changelog:generate

# Update README badges
pnpm docs:update-badges
```

### 2. Testing Phase

**Run Full Test Suite**:

```bash
# Unit tests
pnpm test

# Integration tests
pnpm test:integration

# E2E tests
pnpm test:e2e

# Service validation
pnpm test:services
```

**Manual Testing**:

- [ ] Web interface functionality
- [ ] CLI commands work correctly
- [ ] NPM package installation
- [ ] Documentation site builds

### 3. Review Phase

**Create Release PR**:

```bash
git add .
git commit -m "chore(release): v1.2.0"
git push origin release/v1.2.0

# Create PR with release template
gh pr create --template release.md
```

**Review Requirements**:

- [ ] Code review completed
- [ ] Changelog reviewed
- [ ] Breaking changes documented
- [ ] Performance impact assessed

### 4. Release Phase

**Merge Release PR**:

```bash
# After approval, merge to main
gh pr merge release/v1.2.0 --squash
```

**Tag and Release**:

```bash
git checkout main
git pull origin main

# Create signed tag
git tag -s v1.2.0 -m "Release v1.2.0"
git push origin v1.2.0

# Create GitHub release
gh release create v1.2.0 \
  --title "v1.2.0" \
  --notes-file CHANGELOG_EXCERPT.md \
  --generate-notes
```

**Publish to NPM**:

```bash
# Build packages
pnpm build

# Publish all packages
pnpm publish:all

# Verify publication
npm info csp-js
npm info @csp-js/data
npm info @csp-js/cli
```

### 5. Deployment Phase

**Web App Deployment**:

```bash
# Trigger deployment (automatic via Vercel/Netlify)
# Or manual deployment
pnpm deploy:web
```

**Documentation Update**:

```bash
# Update documentation site
pnpm deploy:docs
```

**CDN Purge**:

```bash
# Purge CDN caches for updated assets
pnpm cdn:purge
```

## Post-Release Tasks

### Immediate Tasks (Within 1 hour)

- [ ] **Verify NPM packages published correctly**
- [ ] **Test installation from NPM**
  ```bash
  npm install csp-js@latest
  ```
- [ ] **Check web app deployment**
- [ ] **Monitor error tracking** for new issues

### Follow-up Tasks (Within 24 hours)

- [ ] **Community announcement**
  - GitHub Discussions post
  - Twitter/X announcement
  - Discord/Slack notification

- [ ] **Documentation updates**
  - Update getting started guides
  - Refresh code examples
  - Update integration guides

- [ ] **Analytics review**
  - Download statistics
  - Usage patterns
  - Error rates

### Weekly Tasks

- [ ] **Performance monitoring**
- [ ] **Community feedback review**
- [ ] **Next release planning**

## Emergency Releases

### Security Issues

**Process**:

1. **Private disclosure** received
2. **Impact assessment** (CVSS scoring)
3. **Fix development** in private branch
4. **Testing** with minimal exposure
5. **Coordinated disclosure** with fix

**Timeline**:

- Critical (CVSS 9.0+): 4 hours
- High (CVSS 7.0-8.9): 24 hours
- Medium (CVSS 4.0-6.9): 72 hours

### Critical Bug Fixes

**Criteria**:

- Service completely broken
- Data corruption risk
- Build/installation failures
- Major functionality regression

**Process**:

1. **Immediate hotfix** branch
2. **Minimal fix** with tests
3. **Fast-track review** (single approver)
4. **Emergency release** with clear communication

### Service Outages

**Common Scenarios**:

- Service changes CSP requirements suddenly
- Major service provider updates
- Security-related service changes

**Response**:

1. **Rapid service definition update**
2. **Community notification** of temporary fix
3. **Full update** in next regular release

## Rollback Procedures

### NPM Package Rollback

**Deprecate Problematic Version**:

```bash
# Deprecate specific version
npm deprecate csp-js@1.2.0 "Critical bug - use 1.1.9 instead"

# Publish patch release if possible
pnpm version 1.2.1
pnpm publish
```

### Web App Rollback

**Vercel/Netlify Rollback**:

```bash
# Rollback to previous deployment
vercel --prod rollback
# or
netlify deploy:rollback
```

**Manual Rollback**:

```bash
# Deploy previous version
git checkout v1.1.9
pnpm build
pnpm deploy:web
```

### Service Data Rollback

**Revert Service Changes**:

```bash
# Create hotfix branch
git checkout -b hotfix/revert-service-update

# Revert problematic service changes
git revert <commit-hash>

# Emergency release
pnpm version patch
pnpm publish
```

## Release Communication

### Changelog Format

```markdown
## [1.2.0] - 2024-06-29

### Added

- New service support: Stripe Checkout v2
- Version selection UI in web interface
- CLI command for batch service updates

### Changed

- Updated Google Analytics to v4.1.0
- Improved CSP generation performance by 15%
- Enhanced error messages with suggestions

### Fixed

- Fixed nonce generation in server environments
- Corrected Microsoft Clarity CSP requirements
- Resolved CLI hanging on Windows

### Deprecated

- Google Analytics v4.0.0 (use v4.1.0+)
- Legacy API methods (migrate by v2.0.0)

### Security

- Updated dependencies with security patches
- Improved CSP validation to prevent XSS

### Breaking Changes (Major releases only)

- Removed deprecated `generateCSPString` method
- Changed minimum Node.js version to 18+
```

### Community Announcement Template

````markdown
# 🎉 CSP-JS v1.2.0 Released!

We're excited to announce the release of CSP-JS v1.2.0! This release includes several new features and improvements.

## 🆕 What's New

- **New Service**: Stripe Checkout v2 support
- **Version Selection**: Choose specific service versions in web UI
- **Performance**: 15% faster CSP generation

## 🔧 Breaking Changes

None in this release! Fully backward compatible.

## 📈 Upgrade Instructions

```bash
npm update csp-js
```
````

## 🐛 Bug Reports

Found an issue? Please report it: https://github.com/eason-dev/csp-js/issues

## 🙏 Contributors

Thanks to all contributors who made this release possible!

```

### Social Media Templates

**Twitter/X**:
```

🛡️ CSP-JS v1.2.0 is live!

✨ New: Stripe Checkout v2 support
🎯 Enhanced: Version selection UI
⚡ Faster: 15% performance improvement

Generate Content Security Policies from service names in seconds!

#WebSecurity #CSP #OpenSource

```

---

## Quality Gates

### Automated Checks

All releases must pass:
- [ ] Unit tests (>95% coverage)
- [ ] Integration tests
- [ ] TypeScript compilation
- [ ] ESLint (zero warnings)
- [ ] Bundle size limits
- [ ] Security audit

### Manual Verification

- [ ] Installation from NPM works
- [ ] Web interface functional
- [ ] CLI commands work
- [ ] Documentation accurate
- [ ] Service definitions valid

### Release Approval Matrix

| Release Type | Approvals Required | Notice Period |
|--------------|-------------------|---------------|
| Patch        | 1 maintainer      | None |
| Minor        | 2 maintainers     | 48 hours |
| Major        | All maintainers   | 2 weeks |
| Emergency    | 1 maintainer      | None |

---

*Last Updated: 2024-06-29*
*Process Version: 1.0.0*
```
