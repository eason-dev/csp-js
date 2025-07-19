#!/bin/bash

# Manual publish script for CSP Kit packages
# This script can be used as a fallback if the automated release fails

set -e

echo "=== CSP Kit Manual Publish Script ==="
echo ""

# Check if NPM_TOKEN is set
if [ -z "$NPM_TOKEN" ]; then
  echo "Error: NPM_TOKEN environment variable is not set"
  echo "Usage: NPM_TOKEN=your-token ./scripts/manual-publish.sh"
  exit 1
fi

# Configure npm authentication
echo "Configuring npm authentication..."
npm config set //registry.npmjs.org/:_authToken "$NPM_TOKEN"
npm config set registry https://registry.npmjs.org/

# Verify authentication
echo "Verifying npm authentication..."
npm whoami || {
  echo "Error: npm authentication failed"
  exit 1
}

# Build packages
echo "Building packages..."
pnpm build

# Get current versions
echo ""
echo "Current package versions:"
echo "- @csp-kit/cli: $(grep '"version"' packages/cli/package.json | cut -d'"' -f4)"
echo "- @csp-kit/data: $(grep '"version"' packages/data/package.json | cut -d'"' -f4)"
echo "- @csp-kit/generator: $(grep '"version"' packages/generator/package.json | cut -d'"' -f4)"

# Ask for confirmation
echo ""
read -p "Do you want to publish these packages? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Publish cancelled"
  exit 0
fi

# Publish packages in correct order (data first, then generator, then cli)
echo ""
echo "Publishing @csp-kit/data..."
cd packages/data
npm publish --access public || echo "Warning: @csp-kit/data publish failed (might already be published)"
cd ../..

echo ""
echo "Publishing @csp-kit/generator..."
cd packages/generator
# Replace workspace protocol with actual version
DATA_VERSION=$(grep '"version"' ../data/package.json | cut -d'"' -f4)
sed -i.bak "s/\"@csp-kit\/data\": \"workspace:\*\"/\"@csp-kit\/data\": \"^$DATA_VERSION\"/" package.json
npm publish --access public || echo "Warning: @csp-kit/generator publish failed (might already be published)"
# Restore original package.json
mv package.json.bak package.json
cd ../..

echo ""
echo "Publishing @csp-kit/cli..."
cd packages/cli
# Replace workspace protocol with actual version
DATA_VERSION=$(grep '"version"' ../data/package.json | cut -d'"' -f4)
sed -i.bak "s/\"@csp-kit\/data\": \"workspace:\*\"/\"@csp-kit\/data\": \"^$DATA_VERSION\"/" package.json
npm publish --access public || echo "Warning: @csp-kit/cli publish failed (might already be published)"
# Restore original package.json
mv package.json.bak package.json
cd ../..

echo ""
echo "=== Publish Complete ==="
echo "Don't forget to:"
echo "1. Create git tags for the published versions"
echo "2. Create GitHub releases"
echo "3. Update the changelog"