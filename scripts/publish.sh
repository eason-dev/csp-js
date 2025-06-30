#!/bin/bash

# CSP-JS Publishing Script
# This script handles versioning and publishing of all packages

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
log() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "packages" ]; then
    error "This script must be run from the project root directory"
fi

# Check if we're on the main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    warning "You're not on the main branch (current: $CURRENT_BRANCH)"
    read -p "Do you want to continue? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check if working directory is clean
if [ -n "$(git status --porcelain)" ]; then
    error "Working directory is not clean. Please commit or stash your changes."
fi

# Parse command line arguments
RELEASE_TYPE=${1:-patch}
DRY_RUN=false
SKIP_TESTS=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --dry-run)
            DRY_RUN=true
            shift
            ;;
        --skip-tests)
            SKIP_TESTS=true
            shift
            ;;
        patch|minor|major)
            RELEASE_TYPE=$1
            shift
            ;;
        *)
            error "Unknown option: $1"
            ;;
    esac
done

log "Starting $RELEASE_TYPE release process..."

if [ "$DRY_RUN" = true ]; then
    warning "DRY RUN MODE - No actual changes will be made"
fi

# Pre-flight checks
log "Running pre-flight checks..."

# Check if NPM is logged in
if ! npm whoami > /dev/null 2>&1; then
    error "You must be logged in to NPM. Run 'npm login' first."
fi

# Check Node.js version
REQUIRED_NODE_VERSION="18"
CURRENT_NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$CURRENT_NODE_VERSION" -lt "$REQUIRED_NODE_VERSION" ]; then
    error "Node.js $REQUIRED_NODE_VERSION+ is required. Current version: $(node -v)"
fi

# Install dependencies
log "Installing dependencies..."
if [ "$DRY_RUN" = false ]; then
    pnpm install --frozen-lockfile
fi

# Run tests and linting (unless skipped)
if [ "$SKIP_TESTS" = false ]; then
    log "Running tests and linting..."
    if [ "$DRY_RUN" = false ]; then
        pnpm lint
        pnpm check-types
        pnpm test
    else
        log "Would run: pnpm lint && pnpm check-types && pnpm test"
    fi
fi

# Build packages
log "Building packages..."
if [ "$DRY_RUN" = false ]; then
    pnpm build
else
    log "Would run: pnpm build"
fi

# Get current versions
CURRENT_CSP_JS_VERSION=$(node -p "require('./packages/csp-js/package.json').version")
CURRENT_CSP_DATA_VERSION=$(node -p "require('./packages/csp-data/package.json').version")
CURRENT_CSP_CLI_VERSION=$(node -p "require('./packages/csp-cli/package.json').version")

log "Current versions:"
log "  csp-js: $CURRENT_CSP_JS_VERSION"
log "  @csp-js/data: $CURRENT_CSP_DATA_VERSION"
log "  @csp-js/cli: $CURRENT_CSP_CLI_VERSION"

# Calculate new versions (simplified semver increment)
calculate_new_version() {
    local current_version=$1
    local release_type=$2
    
    IFS='.' read -ra VERSION_PARTS <<< "$current_version"
    local major=${VERSION_PARTS[0]}
    local minor=${VERSION_PARTS[1]}
    local patch=${VERSION_PARTS[2]}
    
    case $release_type in
        "major")
            echo "$((major + 1)).0.0"
            ;;
        "minor")
            echo "$major.$((minor + 1)).0"
            ;;
        "patch")
            echo "$major.$minor.$((patch + 1))"
            ;;
    esac
}

NEW_VERSION=$(calculate_new_version "$CURRENT_CSP_JS_VERSION" "$RELEASE_TYPE")

log "New version will be: $NEW_VERSION"

# Confirm before proceeding
if [ "$DRY_RUN" = false ]; then
    read -p "Do you want to proceed with publishing version $NEW_VERSION? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log "Publishing cancelled"
        exit 0
    fi
fi

# Update package versions
log "Updating package versions..."
if [ "$DRY_RUN" = false ]; then
    # Update csp-data first (no dependencies)
    cd packages/csp-data
    npm version "$NEW_VERSION" --no-git-tag-version
    cd ../..
    
    # Update csp-js (depends on csp-data)
    cd packages/csp-js
    npm version "$NEW_VERSION" --no-git-tag-version
    cd ../..
    
    # Update csp-cli (depends on csp-data)
    cd packages/csp-cli
    npm version "$NEW_VERSION" --no-git-tag-version
    cd ../..
else
    log "Would update all packages to version $NEW_VERSION"
fi

# Create git commit and tag
log "Creating git commit and tag..."
if [ "$DRY_RUN" = false ]; then
    git add packages/*/package.json
    git commit -m "chore(release): v$NEW_VERSION"
    git tag -a "v$NEW_VERSION" -m "Release v$NEW_VERSION"
else
    log "Would create commit and tag for v$NEW_VERSION"
fi

# Publish packages
log "Publishing packages to NPM..."
if [ "$DRY_RUN" = false ]; then
    # Publish csp-data first (no dependencies)
    log "Publishing @csp-js/data..."
    cd packages/csp-data
    npm publish --access public --provenance
    cd ../..
    
    # Wait a moment for NPM to process
    sleep 5
    
    # Publish csp-js (depends on csp-data)
    log "Publishing csp-js..."
    cd packages/csp-js
    npm publish --access public --provenance
    cd ../..
    
    # Wait a moment for NPM to process
    sleep 5
    
    # Publish csp-cli (depends on csp-data)
    log "Publishing @csp-js/cli..."
    cd packages/csp-cli
    npm publish --access public --provenance
    cd ../..
else
    log "Would publish all packages to NPM"
fi

# Push to git
log "Pushing to git..."
if [ "$DRY_RUN" = false ]; then
    git push origin main
    git push origin "v$NEW_VERSION"
else
    log "Would push commit and tag to git"
fi

# Verify published packages
if [ "$DRY_RUN" = false ]; then
    log "Verifying published packages..."
    sleep 30  # Wait for NPM to propagate
    
    # Check if packages are available
    if npm view "csp-js@$NEW_VERSION" version > /dev/null 2>&1; then
        success "csp-js@$NEW_VERSION is available on NPM"
    else
        warning "csp-js@$NEW_VERSION is not yet available on NPM"
    fi
    
    if npm view "@csp-js/data@$NEW_VERSION" version > /dev/null 2>&1; then
        success "@csp-js/data@$NEW_VERSION is available on NPM"
    else
        warning "@csp-js/data@$NEW_VERSION is not yet available on NPM"
    fi
    
    if npm view "@csp-js/cli@$NEW_VERSION" version > /dev/null 2>&1; then
        success "@csp-js/cli@$NEW_VERSION is available on NPM"
    else
        warning "@csp-js/cli@$NEW_VERSION is not yet available on NPM"
    fi
fi

success "Release $NEW_VERSION completed successfully!"

if [ "$DRY_RUN" = false ]; then
    log "Next steps:"
    log "1. Create GitHub release: https://github.com/eason-dev/csp-kit/releases/new?tag=v$NEW_VERSION"
    log "2. Update documentation if needed"
    log "3. Announce the release to the community"
else
    log "This was a dry run. To actually publish, run the script without --dry-run"
fi