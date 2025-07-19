# Release Process

This document describes the automated release process for CSP Kit packages.

## Overview

CSP Kit uses [Changesets](https://github.com/changesets/changesets) for version management and automated releases. The process is designed to be fully automated while maintaining high quality and proper versioning.

## Release Flow

### 1. Creating Changes

When making changes to the codebase:

```bash
# After making your changes, create a changeset
pnpm changeset

# Select packages that changed
# Choose version bump type (patch/minor/major)
# Write a summary of changes
```

### 2. Automated Release Process

The release process is triggered automatically when changes are merged to the `main` branch:

1. **Changesets Action** runs on every push to `main`
2. If there are changesets, it creates a **"Version Packages" PR**
3. This PR updates:
   - Package versions in `package.json` files
   - `CHANGELOG.md` files with changes
   - Removes processed changeset files

4. **When the PR is merged**:
   - Packages are published to npm
   - Git tags are created automatically (e.g., `@csp-kit/generator@1.2.3`)
   - GitHub releases are created with changelogs
   - Tags are pushed to the repository

### 3. Manual Release (Optional)

For specific package releases, use the GitHub Actions workflow:

1. Go to **Actions** → **Release** workflow
2. Click **"Run workflow"**
3. Select specific package or leave empty for all
4. Workflow will publish the selected package(s)

## Configuration

### GitHub Secrets Required

- `NPM_TOKEN`: npm authentication token for publishing
- `CHANGESET_GITHUB_TOKEN` (optional): Personal Access Token for creating PRs
  - If not provided, falls back to `GITHUB_TOKEN`
  - PAT enables better PR creation capabilities

### Changeset Configuration

Located in `.changeset/config.json`:

```json
{
  "changelog": ["@changesets/changelog-github", { "repo": "eason-dev/csp-kit" }],
  "commit": false,
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": ["web", "docs"]
}
```

Key settings:

- **changelog**: Uses GitHub changelog generator with PR/commit links
- **access**: Public npm packages
- **ignore**: Apps (web, docs) are not published to npm

## Features

### Automatic Git Tags

- Tags are created in the format: `@csp-kit/package@version`
- Example: `@csp-kit/generator@2.1.0`
- Tags are created locally during publish and pushed afterward

### GitHub Releases

- Automatically created for each published package
- Includes changelog entries from changesets
- Links to relevant PRs and commits
- Provides download links for the release

### Version Bumping

- **patch**: Bug fixes, dependency updates
- **minor**: New features, backward compatible changes
- **major**: Breaking changes

### Monorepo Handling

- Independent versioning for each package
- Dependency updates handled automatically
- Only changed packages are published

## Best Practices

1. **Always create changesets** for user-facing changes
2. **Use conventional commits** for clear history
3. **Review Version Packages PR** before merging
4. **Monitor release status** in GitHub Actions

## Troubleshooting

### Release Failed

1. Check GitHub Actions logs
2. Verify npm authentication is valid
3. Ensure no duplicate versions exist on npm

### Git Tags Not Created

- Tags are created automatically by changesets during publish
- Check that `--no-git-tag` flag is NOT used
- Verify GitHub token has push permissions

### GitHub Releases Not Created

- Ensure `createGithubReleases: true` in workflow
- Verify GitHub token has release creation permissions
- Check changeset action version is up to date

## Package Release Schedule

| Package            | Typical Frequency | Notes             |
| ------------------ | ----------------- | ----------------- |
| @csp-kit/data      | Weekly            | Service updates   |
| @csp-kit/generator | Monthly           | Core features     |
| @csp-kit/cli       | Monthly           | Tool improvements |

## Related Documentation

- [Changesets Documentation](https://github.com/changesets/changesets)
- [Contributing Guide](../contributing.md)
- [Development Setup](../../DEVELOPMENT.md)
