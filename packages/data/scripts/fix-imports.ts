#!/usr/bin/env tsx

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SERVICES_DIR = join(__dirname, '../src/services');

function fixImportsInFile(filePath: string): void {
  let content = readFileSync(filePath, 'utf-8');

  // Fix imports from service-types
  content = content.replace(/from '\.\.\/\.\.\/service-types'/g, "from '../../service-types.js'");

  // Fix imports from types
  content = content.replace(/from '\.\.\/\.\.\/types'/g, "from '../../types.js'");

  // Fix any other relative imports without .js
  content = content.replace(/from '(\.\.[^']+)'/g, (match, path) => {
    if (!path.endsWith('.js') && !path.endsWith('.json')) {
      return `from '${path}.js'`;
    }
    return match;
  });

  writeFileSync(filePath, content);
}

function processDirectory(dir: string): void {
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.endsWith('.ts') && !entry.endsWith('.d.ts')) {
      console.log(`Fixing imports in ${fullPath}`);
      fixImportsInFile(fullPath);
    }
  }
}

console.log('Fixing imports in service files...');
processDirectory(SERVICES_DIR);
console.log('Done!');
