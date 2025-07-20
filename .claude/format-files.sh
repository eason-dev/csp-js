#!/bin/bash

# Claude Code hook script for automatic file formatting
# This script is triggered after Claude writes, edits, or multi-edits files

set -e

# Change to the project root directory
cd "$(dirname "$0")/.."

# Read JSON input from stdin
input=$(cat)

# Extract file path from the JSON input
# Try different possible field names that Claude might use
file_path=$(echo "$input" | jq -r '.file_path // .filepath // .path // empty')

# If jq is not available, try a simple grep approach
if [ -z "$file_path" ] && command -v grep >/dev/null 2>&1; then
    file_path=$(echo "$input" | grep -o '"file_path"\s*:\s*"[^"]*"' | cut -d'"' -f4 2>/dev/null || echo "")
fi

if [ -z "$file_path" ]; then
    echo "No file path found in input, skipping formatting"
    exit 0
fi

# Check if file exists
if [ ! -f "$file_path" ]; then
    echo "File $file_path does not exist, skipping formatting"
    exit 0
fi

# Get file extension
extension="${file_path##*.}"

echo "Formatting file: $file_path (extension: $extension)"

case "$extension" in
    ts|tsx|js|jsx)
        echo "Running Prettier on TypeScript/JavaScript file..."
        if command -v pnpm >/dev/null 2>&1; then
            echo "Using pnpm exec prettier..."
            pnpm exec prettier --write "$file_path" || {
                echo "Prettier via pnpm failed, trying global prettier..."
                prettier --write "$file_path" 2>/dev/null || echo "Prettier formatting failed"
            }
        elif command -v prettier >/dev/null 2>&1; then
            echo "Using global prettier..."
            prettier --write "$file_path" || echo "Prettier formatting failed"
        else
            echo "Prettier not available, skipping formatting"
        fi
        ;;
    md)
        echo "Running Prettier on Markdown file..."
        if command -v pnpm >/dev/null 2>&1; then
            echo "Using pnpm exec prettier..."
            pnpm exec prettier --write "$file_path" || {
                echo "Prettier via pnpm failed, trying global prettier..."
                prettier --write "$file_path" 2>/dev/null || echo "Prettier formatting failed"
            }
        elif command -v prettier >/dev/null 2>&1; then
            echo "Using global prettier..."
            prettier --write "$file_path" || echo "Prettier formatting failed"
        else
            echo "Prettier not available, skipping formatting"
        fi
        ;;
    json)
        echo "Running Prettier on JSON file..."
        if command -v pnpm >/dev/null 2>&1; then
            echo "Using pnpm exec prettier..."
            pnpm exec prettier --write "$file_path" || {
                echo "Prettier via pnpm failed, trying global prettier..."
                prettier --write "$file_path" 2>/dev/null || echo "Prettier formatting failed"
            }
        elif command -v prettier >/dev/null 2>&1; then
            echo "Using global prettier..."
            prettier --write "$file_path" || echo "Prettier formatting failed"
        else
            echo "Prettier not available, skipping formatting"
        fi
        ;;
    *)
        echo "No formatting rule for extension: $extension"
        ;;
esac

echo "Formatting completed for: $file_path"