# Claude Code Configuration

This directory contains Claude Code configuration and hooks for the CSP Kit project.

## Hooks

### Auto-formatting Hook

The `format-files.sh` script automatically formats files after Claude makes changes using the Write, Edit, or MultiEdit tools.

**Supported file types:**

- TypeScript/JavaScript (`.ts`, `.tsx`, `.js`, `.jsx`) - formatted with Prettier
- Markdown (`.md`) - formatted with Prettier
- JSON (`.json`) - formatted with Prettier

**How it works:**

1. Claude makes changes to a file using Write, Edit, or MultiEdit
2. The PostToolUse hook is triggered
3. The script receives file information via JSON input
4. Based on the file extension, the appropriate formatter is run
5. The file is automatically formatted in place

**Requirements:**

- `jq` for JSON parsing (optional, falls back to grep)
- `pnpm` and `prettier` for formatting (tries pnpm first, then global prettier)

**Configuration:**
The hook is configured in `settings.json` to match Write, Edit, and MultiEdit tools.

## Usage

This configuration is automatically active when Claude Code is run from this project directory. No manual setup is required - the hooks will automatically format files when Claude makes changes.

## Debugging

If formatting fails, check:

1. File permissions on `format-files.sh` (should be executable)
2. `pnpm` and `prettier` are available in the project
3. Check Claude Code output for hook execution logs
