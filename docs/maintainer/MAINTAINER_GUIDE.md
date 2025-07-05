# Maintainer Guide

This guide is for CSP Kit maintainers and covers advanced topics for project maintenance, release management, and community engagement.

## Table of Contents

- [Project Overview](#project-overview)
- [Maintainer Responsibilities](#maintainer-responsibilities)
- [Service Management](#service-management)
- [Release Process](#release-process)
- [Monitoring & Automation](#monitoring--automation)
- [Community Management](#community-management)
- [Security & Quality](#security--quality)

## Project Overview

### Architecture

CSP Kit follows a data-package separation approach inspired by browserslist:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   generator     │    │   data          │    │   cli           │
│                 │    │                 │    │                 │
│ • Core API      │───►│ • Service DB    │◄───│ • Management    │
│ • CSP Generator │    │ • Versioning    │    │ • Automation    │
│ • Utilities     │    │ • Validation    │    │ • PR Creation   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Web App       │
                    │                 │
                    │ • UI Interface  │
                    │ • Interactive   │
                    │ • Documentation │
                    └─────────────────┘
```

### Key Design Principles

1. **Service-First**: Abstract CSP complexity through service definitions
2. **Version Awareness**: Support multiple service versions with deprecation
3. **Community Driven**: Enable community contributions through automation
4. **Developer Experience**: Prioritize ease of use and clear documentation
5. **Security by Default**: Conservative defaults with explicit opt-ins

## Maintainer Responsibilities

### Code Review

**Pull Request Review Checklist:**

- [ ] **Code Quality**
  - TypeScript strict mode compliance
  - ESLint zero warnings
  - Proper error handling
  - Performance considerations

- [ ] **Service Definitions**
  - CSP rules verified against official documentation
  - Version numbering follows conventions
  - Monitoring configuration present
  - Test URLs provided and functional

- [ ] **Documentation**
  - Code comments for complex logic
  - README updates if needed
  - Changelog entries for user-facing changes

- [ ] **Testing**
  - Unit tests pass
  - Integration tests included for new features
  - Service definitions validated

### Issue Management

**Triage Process:**

1. **Label Issues** within 24 hours:
   - `service-request` - New service additions
   - `service-update` - Existing service changes
   - `bug` - Bug reports
   - `enhancement` - Feature requests
   - `documentation` - Documentation improvements
   - `good-first-issue` - Beginner-friendly tasks

2. **Prioritize** based on:
   - Security implications
   - Breaking changes
   - Community impact
   - Maintenance burden

3. **Response Time Goals**:
   - Security issues: 24 hours
   - Service updates: 48 hours
   - Bug reports: 72 hours
   - Feature requests: 1 week

## Service Management

### Adding New Services

**Validation Process:**

1. **Official Documentation**: Verify CSP requirements from official sources
2. **Testing**: Test CSP rules with actual service implementation
3. **Community Need**: Ensure service has sufficient community demand
4. **Maintenance**: Consider long-term maintenance requirements

**Service Definition Quality Standards:**

```typescript
{
  // Required fields - must be complete and accurate
  "id": "kebab-case-identifier",
  "name": "Human Readable Name",
  "category": "valid-category",
  "description": "Clear, concise description (50-150 chars)",
  "website": "https://official-website.com",
  "officialDocs": ["https://official-csp-docs.com"],

  // Version management - must support versioning
  "versions": {
    "1.0.0": {
      "csp": { /* validated CSP rules */ },
      "validFrom": "YYYY-MM-DD",
      "notes": ["Implementation details"],
      "requiresDynamic": boolean,
      "requiresNonce": boolean
    }
  },
  "defaultVersion": "1.0.0",

  // Optional but recommended
  "aliases": ["common-aliases"],
  "monitoring": {
    "testUrls": ["https://testable-urls.com"],
    "checkInterval": "weekly|monthly",
    "alertOnBreaking": true
  }
}
```

### Updating Existing Services

**Update Triggers:**

1. **Automated Monitoring**: GitHub Actions detect changes
2. **Community Reports**: Issues from users
3. **Service Announcements**: Official service updates
4. **Security Advisories**: CSP-related security updates

**Update Process:**

1. **Verify Change**: Confirm CSP requirement changes
2. **Version Strategy**:
   - Patch: Bug fixes, clarifications
   - Minor: New optional CSP rules
   - Major: Breaking changes to CSP rules
3. **Documentation**: Update notes and migration guides
4. **Testing**: Validate new requirements
5. **Deprecation**: Mark old versions if needed

### Version Management Strategy

**Service Versioning:**

- **Semantic Versions** (1.0.0): For library-specific integrations
- **Date Versions** (2024-01-15): For service infrastructure changes
- **Breaking Changes**: Always increment major version
- **Deprecation**: 6-month deprecation period before removal

**Example Scenarios:**

```typescript
// Scenario 1: Service adds new optional domain
"1.1.0": {
  "csp": {
    "script-src": ["https://cdn.service.com", "https://cdn2.service.com"],
    "connect-src": ["https://api.service.com"]
  },
  "validFrom": "2024-01-15",
  "breaking": false,
  "notes": ["Added cdn2.service.com for improved performance"]
}

// Scenario 2: Service removes support for old domain
"2.0.0": {
  "csp": {
    "script-src": ["https://new-cdn.service.com"],
    "connect-src": ["https://api.service.com"]
  },
  "validFrom": "2024-06-01",
  "breaking": true,
  "notes": ["Removed legacy cdn.service.com - migrate to new-cdn.service.com"]
}
```

## Release Process

### Versioning Strategy

**Package Versioning:**

- **Major**: Breaking API changes, removed features
- **Minor**: New features, service additions, backward compatible changes
- **Patch**: Bug fixes, service updates, documentation

**Release Schedule:**

- **Patch**: As needed for bugs and service updates
- **Minor**: Monthly for new features and services
- **Major**: Quarterly or as needed for breaking changes

### Release Checklist

**Pre-Release:**

1. [ ] **Code Quality**

   ```bash
   pnpm lint           # Zero warnings
   pnpm check-types    # No TypeScript errors
   pnpm test           # All tests pass
   pnpm build          # Successful build
   ```

2. [ ] **Documentation**
   - [ ] CHANGELOG.md updated
   - [ ] README version badges updated
   - [ ] API documentation current
   - [ ] Migration guides for breaking changes

3. [ ] **Service Database**
   - [ ] All services validated
   - [ ] Monitoring configurations tested
   - [ ] Version deprecations processed

**Release Process:**

1. **Create Release Branch**

   ```bash
   git checkout -b release/v1.2.0
   ```

2. **Update Version Numbers**

   ```bash
   # Update package.json files
   pnpm version:update 1.2.0
   ```

3. **Final Testing**

   ```bash
   pnpm test:all
   pnpm test:integration
   ```

4. **Create Release PR**

   ```bash
   # Use conventional commit format
   git commit -m "chore(release): v1.2.0"
   ```

5. **Merge and Tag**

   ```bash
   git tag v1.2.0
   git push origin v1.2.0
   ```

6. **Publish to NPM**
   ```bash
   pnpm publish:all
   ```

**Post-Release:**

- [ ] GitHub release with changelog
- [ ] Documentation deployment
- [ ] Community announcement
- [ ] Monitor for issues

## Monitoring & Automation

### GitHub Actions Workflows

**Service Monitoring** (`.github/workflows/service-monitoring.yml`):

- **Schedule**: Weekly on Sundays
- **Function**: Check services for CSP changes
- **Output**: Creates issues for detected changes
- **Manual Trigger**: Support for specific service checks

**CI/CD Pipeline**:

- **On PR**: Run tests, lint, build
- **On Merge**: Deploy documentation, run integration tests
- **On Release**: Publish packages, update distributions

### Monitoring Dashboard

**Key Metrics to Track:**

1. **Service Health**
   - Number of services
   - Services with monitoring
   - Last check timestamps
   - Failure rates

2. **Community Engagement**
   - Issue response times
   - PR merge times
   - Community contributions
   - Documentation usage

3. **Usage Analytics**
   - NPM download statistics
   - Web app usage
   - Popular services
   - Error rates

## Community Management

### Communication Channels

1. **GitHub Issues**: Primary support and bug reports
2. **GitHub Discussions**: Community questions and ideas
3. **Discord/Slack**: Real-time community chat (if established)
4. **Email**: Direct maintainer contact

### Community Growth

**Contributor Onboarding:**

1. **Good First Issues**: Label beginner-friendly tasks
2. **Documentation**: Maintain clear contribution guides
3. **Recognition**: Highlight contributors in releases
4. **Mentorship**: Guide new contributors through PR process

**Service Contributions:**

1. **Templates**: Provide clear service addition templates
2. **Automation**: Use CLI tools to reduce friction
3. **Validation**: Automated validation of service definitions
4. **Feedback**: Quick feedback on service requests

### Release Communication

**Changelog Format:**

```markdown
## [1.2.0] - 2024-06-29

### Added

- New service support: Stripe Checkout v2
- Version selection UI in web interface
- Service deprecation warnings

### Changed

- Updated Google Analytics to v4.1.0
- Improved error messages for invalid CSP

### Fixed

- Fixed nonce generation in server environments
- Corrected Typeform CSP requirements

### Deprecated

- Google Analytics v4.0.0 (migrate to v4.1.0)

### Security

- Updated dependencies with security patches
```

## Security & Quality

### Security Practices

1. **Dependency Management**

   ```bash
   # Regular security audits
   pnpm audit

   # Automated dependency updates
   # Configure Dependabot or Renovate
   ```

2. **CSP Validation**
   - Verify all service CSP rules against official documentation
   - Test CSP rules in realistic environments
   - Monitor for security advisories affecting supported services

3. **Code Security**
   - No secrets in repository
   - Secure CI/CD pipeline
   - Limited access to release process

### Quality Assurance

**Code Quality Tools:**

```bash
# Linting
pnpm lint           # ESLint with zero warnings
pnpm lint:fix       # Auto-fix linting issues

# Type Checking
pnpm check-types    # TypeScript strict mode

# Testing
pnpm test           # Unit tests with >90% coverage
pnpm test:e2e       # End-to-end testing

# Formatting
pnpm format         # Prettier formatting
```

**Performance Monitoring:**

- Bundle size tracking
- Build time optimization
- API response time monitoring
- Web app performance metrics

### Quality Gates

**PR Requirements:**

- [ ] All tests pass
- [ ] Zero ESLint warnings
- [ ] TypeScript compilation successful
- [ ] Code coverage maintained
- [ ] Documentation updated

**Release Requirements:**

- [ ] Full test suite passes
- [ ] Security audit clean
- [ ] Performance regression check
- [ ] Documentation complete
- [ ] Backward compatibility verified

## Emergency Procedures

### Security Issues

1. **Assessment**: Evaluate severity and impact
2. **Communication**: Private disclosure to maintainers
3. **Fix**: Develop and test security patch
4. **Release**: Emergency patch release
5. **Disclosure**: Public disclosure after fix deployment

### Service Outages

1. **Detection**: Monitoring alerts or community reports
2. **Investigation**: Verify service CSP changes
3. **Hotfix**: Quick fix for critical services
4. **Communication**: Notify community of temporary workarounds
5. **Follow-up**: Proper fix and documentation update

### Breaking Changes

1. **Notice**: 30-day advance notice for breaking changes
2. **Migration**: Provide migration guides and tools
3. **Support**: Extended support for deprecated versions
4. **Timeline**: Clear timeline for deprecation and removal

---

## Contact Information

**Current Maintainers:**

- Primary: [maintainer1@csp-kit.eason.ch](mailto:maintainer1@csp-kit.eason.ch)
- Secondary: [maintainer2@csp-kit.eason.ch](mailto:maintainer2@csp-kit.eason.ch)

**Emergency Contact:**

- Security: [security@csp-kit.eason.ch](mailto:security@csp-kit.eason.ch)
- Infrastructure: [infrastructure@csp-kit.eason.ch](mailto:infrastructure@csp-kit.eason.ch)

---

_Last Updated: 2024-06-29_
_Version: 1.0.0_
