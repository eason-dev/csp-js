# 📦 Release Process

This document outlines the release process for CSP Kit using Changesets and conventional commits.

## Overview

CSP Kit uses:

- **[Changesets](https://github.com/changesets/changesets)** for version management and changelog generation
- **[Conventional Commits](https://www.conventionalcommits.org/)** for standardized commit messages
- **GitHub Actions** for automated CI/CD and releases
- **Package-scoped tags** (e.g., `@csp-kit/generator@1.0.0`) for better monorepo support

## Release Types

### 1. Regular Release (Automated)

The standard release flow is fully automated:

1. **Development Phase**
   - Developers create feature branches
   - Make changes using conventional commits
   - Add changesets for their changes
   - Submit PRs to `main` branch

2. **Changeset Creation**

   ```bash
   # Add a changeset for your changes
   pnpm changeset

   # Select packages affected
   # Choose version bump type (patch/minor/major)
   # Write a summary of changes
   ```

3. **Automated Release PR**
   - When changes with changesets are merged to `main`
   - GitHub Actions creates a "Version Packages" PR
   - This PR updates versions and changelogs
   - Review and merge when ready to release

4. **Automatic Publishing**
   - Merging the release PR triggers publishing
   - Packages are published to npm
   - GitHub releases are created automatically
   - Package-specific tags are created

### 2. Manual Package Release

For releasing specific packages manually:

1. Go to Actions → Release workflow
2. Click "Run workflow"
3. Select the package to release (or leave empty for all)
4. Click "Run workflow"

### 3. Emergency Release

For critical fixes:

```bash
# Create changeset with patch bump
pnpm changeset

# Select affected packages
# Choose "patch" for version bump
# Add description: "Emergency fix for [issue]"

# Commit and push
git add .
git commit -m "fix: emergency fix for critical issue"
git push

# Fast-track the release PR
```

## Conventional Commits

### Commit Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: New feature → Minor version bump
- `fix`: Bug fix → Patch version bump
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Test additions/changes
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Other changes
- `revert`: Revert a previous commit

### Scopes

Valid scopes (enforced by commitlint):

- `generator`, `data`, `cli`, `ui` (packages)
- `web`, `docs` (apps)
- `deps`, `release`, `config`, `ci`, `root` (other)

### Examples

```bash
# Feature
git commit -m "feat(generator): add support for new CSP directive"

# Bug fix
git commit -m "fix(data): correct Google Analytics CSP rules"

# Breaking change (triggers major version)
git commit -m "feat(generator)!: change API to use service objects

BREAKING CHANGE: generateCSP now requires service objects instead of strings"

# Using commitizen (interactive)
pnpm commit
```

## Version Management

### Package Versioning

- Packages can be versioned **independently**
- Each package maintains its own version
- Internal dependencies are updated automatically

### Version Bump Guidelines

| Change Type | Version Bump  | When to Use                        |
| ----------- | ------------- | ---------------------------------- |
| Patch       | 1.0.0 → 1.0.1 | Bug fixes, documentation           |
| Minor       | 1.0.0 → 1.1.0 | New features, non-breaking changes |
| Major       | 1.0.0 → 2.0.0 | Breaking changes                   |

### Breaking Changes

Mark breaking changes clearly:

1. Use `!` after type: `feat!:` or `fix!:`
2. Add `BREAKING CHANGE:` in commit body
3. Document migration path in changeset

## Changeset Workflow

### Adding a Changeset

```bash
# Interactive mode
pnpm changeset

# Follow prompts:
# 1. Select changed packages (space to select, enter to confirm)
# 2. Choose version bump for each package
# 3. Write a summary (this becomes the changelog entry)
```

### Changeset Best Practices

1. **One changeset per feature/fix**
2. **Clear, user-focused summaries**
3. **Link to issues/PRs**: Use `#123` format
4. **Group related changes**

### Example Changeset

```markdown
---
'@csp-kit/generator': minor
'@csp-kit/data': patch
---

Add support for Cloudflare Turnstile service (#123)

- Added new Cloudflare Turnstile service definition
- Updated generator to handle challenge-response directives
- Fixed typing issue in service configuration
```

## CI/CD Pipeline

### Pull Request Checks

1. **Lint**: Code quality checks
2. **Type Check**: TypeScript validation
3. **Tests**: Unit test suite
4. **Build**: Verify build artifacts
5. **Commit Lint**: Validate commit messages
6. **Format Check**: Prettier formatting

### Release Pipeline

1. **Changeset Bot**: Comments on PRs about changesets
2. **Version PR**: Auto-created when changesets exist
3. **Publishing**: Triggered by merging version PR
4. **GitHub Releases**: Created with changelogs
5. **npm Publishing**: With provenance disabled

## Pre-release Checklist

- [ ] All CI checks passing
- [ ] Changesets added for all changes
- [ ] Documentation updated if needed
- [ ] Breaking changes clearly marked
- [ ] Migration guide written (if breaking)
- [ ] Version PR reviewed

## Post-release Steps

1. **Verify npm packages**: Check all packages published correctly
2. **Verify GitHub releases**: Ensure releases created with changelogs
3. **Update documentation site**: If needed
4. **Announce release**: If major version or significant features

## Troubleshooting

### Failed Publish

1. Check npm authentication: `npm whoami`
2. Verify `NPM_TOKEN` secret in GitHub
3. Check for npm registry issues
4. Retry with manual workflow

### Missing Changesets

```bash
# Add changeset after the fact
pnpm changeset

# Commit and push
git add .changeset
git commit -m "chore: add missing changeset"
git push
```

### Version Conflicts

1. Pull latest changes: `git pull`
2. Regenerate changesets: `pnpm changeset version`
3. Resolve conflicts in package.json files
4. Commit and push

## Rollback Procedure

If a release has critical issues:

1. **Deprecate on npm** (don't unpublish):

   ```bash
   npm deprecate @csp-kit/package@version "Critical issue, use previous version"
   ```

2. **Create fix**:
   - Fix the issue
   - Add changeset
   - Fast-track release

3. **Document issue**:
   - Create GitHub issue
   - Add to release notes
   - Notify users if needed

## Release Schedule

- **Regular releases**: As needed when changes accumulate
- **Security fixes**: Immediate release
- **Major versions**: Coordinate with documentation updates

## Access Requirements

### npm Access

- Publish access to `@csp-kit` scope
- 2FA enabled on npm account

### GitHub Access

- Write access to repository
- Access to GitHub Actions secrets

## Related Documentation

- [Changesets Documentation](https://github.com/changesets/changesets)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [npm Publishing Guide](./NPM_PUBLISHING_GUIDE.md)
