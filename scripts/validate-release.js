#!/usr/bin/env node

/**
 * Release Validation Script
 * 
 * This script validates that packages are ready for release by checking:
 * - Package.json consistency
 * - Build artifacts
 * - Version compatibility
 * - NPM registry status
 */

import { readFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');

// Colors for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'blue') {
  console.log(`${colors[color]}[INFO]${colors.reset} ${message}`);
}

function success(message) {
  console.log(`${colors.green}[SUCCESS]${colors.reset} ${message}`);
}

function warning(message) {
  console.log(`${colors.yellow}[WARNING]${colors.reset} ${message}`);
}

function error(message) {
  console.log(`${colors.red}[ERROR]${colors.reset} ${message}`);
}

function bold(text) {
  return `${colors.bold}${text}${colors.reset}`;
}

// Package definitions
const packages = [
  { name: 'generator', path: 'packages/generator', npmName: '@csp-kit/generator' },
  { name: 'data', path: 'packages/data', npmName: '@csp-kit/data' },
  { name: 'cli', path: 'packages/cli', npmName: '@csp-kit/cli' }
];

// Validation functions
async function validatePackageJson(pkg) {
  const pkgJsonPath = path.join(ROOT_DIR, pkg.path, 'package.json');
  
  if (!existsSync(pkgJsonPath)) {
    error(`Package.json not found: ${pkgJsonPath}`);
    return false;
  }

  try {
    const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf8'));
    
    // Check required fields
    const requiredFields = ['name', 'version', 'description', 'main', 'types', 'exports'];
    const missingFields = requiredFields.filter(field => !pkgJson[field]);
    
    if (missingFields.length > 0) {
      error(`${pkg.name}: Missing required fields: ${missingFields.join(', ')}`);
      return false;
    }

    // Check NPM name consistency
    if (pkgJson.name !== pkg.npmName) {
      error(`${pkg.name}: NPM name mismatch. Expected: ${pkg.npmName}, Got: ${pkgJson.name}`);
      return false;
    }

    // Check repository field
    if (!pkgJson.repository) {
      warning(`${pkg.name}: Missing repository field`);
    }

    // Check publishConfig
    if (!pkgJson.publishConfig) {
      warning(`${pkg.name}: Missing publishConfig`);
    } else {
      if (pkgJson.publishConfig.access !== 'public') {
        error(`${pkg.name}: publishConfig.access should be 'public'`);
        return false;
      }
    }

    success(`${pkg.name}: Package.json validation passed`);
    return true;
  } catch (err) {
    error(`${pkg.name}: Failed to parse package.json: ${err.message}`);
    return false;
  }
}

async function validateBuildArtifacts(pkg) {
  const distPath = path.join(ROOT_DIR, pkg.path, 'dist');
  
  if (!existsSync(distPath)) {
    error(`${pkg.name}: Dist directory not found. Run 'pnpm build' first.`);
    return false;
  }

  // Check for required build artifacts
  const requiredFiles = ['index.js', 'index.d.ts'];
  const missingFiles = requiredFiles.filter(file => 
    !existsSync(path.join(distPath, file))
  );

  if (missingFiles.length > 0) {
    error(`${pkg.name}: Missing build artifacts: ${missingFiles.join(', ')}`);
    return false;
  }

  success(`${pkg.name}: Build artifacts validation passed`);
  return true;
}

async function validateVersionConsistency() {
  const versions = {};
  
  for (const pkg of packages) {
    const pkgJsonPath = path.join(ROOT_DIR, pkg.path, 'package.json');
    const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf8'));
    versions[pkg.name] = pkgJson.version;
  }

  // All packages should have the same version
  const uniqueVersions = [...new Set(Object.values(versions))];
  
  if (uniqueVersions.length > 1) {
    error('Version mismatch across packages:');
    for (const [name, version] of Object.entries(versions)) {
      console.log(`  ${name}: ${version}`);
    }
    return false;
  }

  success(`Version consistency check passed: ${uniqueVersions[0]}`);
  return true;
}

async function validateDependencies() {
  for (const pkg of packages) {
    const pkgJsonPath = path.join(ROOT_DIR, pkg.path, 'package.json');
    const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf8'));

    // Check workspace dependencies
    if (pkgJson.dependencies) {
      for (const [depName, depVersion] of Object.entries(pkgJson.dependencies)) {
        if (depName.startsWith('@csp-kit/') && depVersion !== 'workspace:*') {
          warning(`${pkg.name}: Dependency ${depName} should use 'workspace:*', got: ${depVersion}`);
        }
      }
    }
  }

  success('Dependency validation passed');
  return true;
}

async function validateNpmStatus() {
  try {
    // Check if we're logged in to NPM
    execSync('npm whoami', { stdio: 'pipe' });
    success('NPM authentication verified');
    
    // Check if packages exist and get latest versions
    for (const pkg of packages) {
      try {
        const output = execSync(`npm view ${pkg.npmName} version`, { 
          stdio: 'pipe', 
          encoding: 'utf8' 
        }).trim();
        
        log(`${pkg.name}: Latest published version: ${output}`);
      } catch (err) {
        if (err.status === 1) {
          log(`${pkg.name}: Package not yet published (this is OK for new packages)`);
        } else {
          warning(`${pkg.name}: Could not check NPM status: ${err.message}`);
        }
      }
    }
    
    return true;
  } catch (err) {
    error('Not logged in to NPM. Run "npm login" first.');
    return false;
  }
}

async function validateGitStatus() {
  try {
    // Check if working directory is clean
    const status = execSync('git status --porcelain', { 
      stdio: 'pipe', 
      encoding: 'utf8' 
    }).trim();
    
    if (status) {
      error('Working directory is not clean. Please commit or stash changes:');
      console.log(status);
      return false;
    }

    // Check current branch
    const branch = execSync('git branch --show-current', { 
      stdio: 'pipe', 
      encoding: 'utf8' 
    }).trim();
    
    if (branch !== 'main') {
      warning(`Currently on branch '${branch}', not 'main'`);
    }

    success('Git status validation passed');
    return true;
  } catch (err) {
    error(`Git validation failed: ${err.message}`);
    return false;
  }
}

async function validateTestsPass() {
  try {
    log('Running test suite...');
    execSync('pnpm test', { stdio: 'inherit', cwd: ROOT_DIR });
    success('All tests passed');
    return true;
  } catch (err) {
    error('Tests failed. Fix failing tests before release.');
    return false;
  }
}

async function validateLinting() {
  try {
    log('Running linting...');
    execSync('pnpm lint', { stdio: 'inherit', cwd: ROOT_DIR });
    success('Linting passed');
    return true;
  } catch (err) {
    error('Linting failed. Fix linting errors before release.');
    return false;
  }
}

async function validateTypeChecking() {
  try {
    log('Running type checking...');
    execSync('pnpm check-types', { stdio: 'inherit', cwd: ROOT_DIR });
    success('Type checking passed');
    return true;
  } catch (err) {
    error('Type checking failed. Fix type errors before release.');
    return false;
  }
}

// Main validation function
async function runValidation() {
  console.log(`${colors.bold}CSP-Kit Release Validation${colors.reset}\n`);
  
  const validations = [
    { name: 'Git Status', fn: validateGitStatus },
    { name: 'Package.json', fn: async () => {
      const results = await Promise.all(packages.map(validatePackageJson));
      return results.every(Boolean);
    }},
    { name: 'Version Consistency', fn: validateVersionConsistency },
    { name: 'Dependencies', fn: validateDependencies },
    { name: 'Build Artifacts', fn: async () => {
      const results = await Promise.all(packages.map(validateBuildArtifacts));
      return results.every(Boolean);
    }},
    { name: 'Linting', fn: validateLinting },
    { name: 'Type Checking', fn: validateTypeChecking },
    { name: 'Tests', fn: validateTestsPass },
    { name: 'NPM Status', fn: validateNpmStatus }
  ];

  const results = [];
  
  for (const validation of validations) {
    try {
      log(`Running ${validation.name} validation...`);
      const result = await validation.fn();
      results.push({ name: validation.name, passed: result });
      
      if (!result) {
        error(`${validation.name} validation failed`);
      }
    } catch (err) {
      error(`${validation.name} validation error: ${err.message}`);
      results.push({ name: validation.name, passed: false });
    }
  }

  // Summary
  console.log(`\n${colors.bold}Validation Summary${colors.reset}`);
  console.log('═'.repeat(50));
  
  for (const result of results) {
    const status = result.passed ? `${colors.green}✓ PASS${colors.reset}` : `${colors.red}✗ FAIL${colors.reset}`;
    console.log(`${result.name.padEnd(20)} ${status}`);
  }

  const passedCount = results.filter(r => r.passed).length;
  const totalCount = results.length;
  
  console.log('═'.repeat(50));
  console.log(`${bold('Total:')} ${passedCount}/${totalCount} validations passed`);

  if (passedCount === totalCount) {
    console.log(`\n${colors.green}${colors.bold}🎉 All validations passed! Ready for release.${colors.reset}`);
    process.exit(0);
  } else {
    console.log(`\n${colors.red}${colors.bold}❌ Some validations failed. Please fix issues before release.${colors.reset}`);
    process.exit(1);
  }
}

// Handle command line arguments
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
${colors.bold}CSP-Kit Release Validation${colors.reset}

This script validates that packages are ready for release.

Usage:
  node scripts/validate-release.js [options]

Options:
  --help, -h    Show this help message

Validations performed:
  • Git status (clean working directory)
  • Package.json structure and consistency
  • Version consistency across packages
  • Workspace dependency configuration
  • Build artifacts presence
  • Code linting
  • TypeScript type checking
  • Test suite execution
  • NPM authentication and package status
`);
  process.exit(0);
}

// Run validation
runValidation().catch((err) => {
  error(`Validation failed: ${err.message}`);
  process.exit(1);
});