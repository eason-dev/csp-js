# Release Setup Guide

This guide explains how to set up automated releases for CSP Kit packages.

## Prerequisites

1. **NPM Account**: You need an npm account with publish permissions for the `@csp-kit` scope
2. **GitHub Repository Access**: Admin access to the repository for setting secrets

## Step 1: Create NPM Token

1. Log in to [npmjs.com](https://www.npmjs.com)
2. Click on your profile picture → "Access Tokens"
3. Click "Generate New Token"
4. Select "Classic Token" (Automation type)
5. Name it something like "csp-kit-github-actions"
6. Copy the token (it starts with `npm_`)

## Step 2: Add NPM Token to GitHub Secrets

1. Go to your repository on GitHub
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `NPM_TOKEN`
5. Value: Paste your npm token
6. Click "Add secret"

## Step 3: (Optional) Add GitHub PAT for Changesets

For changesets to create pull requests, you need a Personal Access Token:

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate a new token (classic) with these permissions:
   - `repo` (full control)
   - `workflow` (update workflows)
3. Add it as a secret named `CHANGESET_GITHUB_TOKEN`

## Release Process

### Automated Release (Recommended)

1. Create changesets for your changes:
   ```bash
   pnpm changeset
   ```

2. Commit and push to main
3. The workflow will automatically:
   - Create a "Version Packages" PR
   - When merged, publish to npm
   - Create GitHub releases

### Manual Release (Fallback)

If the automated release fails:

```bash
# Set your npm token
export NPM_TOKEN=npm_xxxxxxxxxxxx

# Run the manual publish script
./scripts/manual-publish.sh
```

## Troubleshooting

### Error: 404 Not Found when publishing

**Cause**: NPM token is invalid or doesn't have publish permissions

**Solution**:
1. Verify your npm token has publish permissions
2. Check if you're logged in: `npm whoami`
3. Ensure the token is set correctly in GitHub secrets

### Error: 403 Forbidden

**Cause**: You don't have permission to publish to the @csp-kit scope

**Solution**:
1. Ensure your npm account has access to the @csp-kit organization
2. Check package access: `npm access ls-packages @csp-kit`

### Error: Packages not publishing

**Cause**: Version already exists on npm

**Solution**:
1. Check current npm versions: `npm view @csp-kit/generator version`
2. Ensure local versions are bumped: `pnpm changeset version`
3. Commit version changes before publishing

## Verifying Setup

Run this command to verify your npm token works:

```bash
NPM_TOKEN=your-token-here npm whoami
```

You should see your npm username.