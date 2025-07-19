#!/bin/bash

# Script to verify npm authentication setup

echo "=== NPM Authentication Verification ==="
echo ""

# Check if NPM_TOKEN is provided
if [ -z "$1" ]; then
  echo "Usage: ./scripts/verify-npm-auth.sh <npm-token>"
  echo "Example: ./scripts/verify-npm-auth.sh npm_xxxxxxxxxxxx"
  exit 1
fi

NPM_TOKEN=$1

# Test authentication
echo "Testing npm authentication..."
NPM_TOKEN=$NPM_TOKEN npm whoami 2>&1 || {
  echo ""
  echo "❌ Authentication failed!"
  echo "Please check:"
  echo "1. Your token is valid"
  echo "2. Your token has not expired"
  echo "3. Your token has automation permissions"
  exit 1
}

echo ""
echo "✅ Authentication successful!"
echo ""

# Check package access
echo "Checking package access..."
NPM_TOKEN=$NPM_TOKEN npm access ls-packages 2>&1 | grep "@csp-kit" || {
  echo "⚠️  No @csp-kit packages found in your npm account"
  echo "This might be normal if you haven't published any packages yet"
}

echo ""
echo "=== Setup Instructions ==="
echo "1. Copy your NPM token"
echo "2. Go to GitHub repository settings"
echo "3. Navigate to Secrets and variables → Actions"
echo "4. Add a new secret named 'NPM_TOKEN' with your token value"
echo ""
echo "Your token is valid and ready to use! ✅"