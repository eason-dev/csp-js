#!/usr/bin/env tsx

import { readdirSync, writeFileSync } from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SERVICES_DIR = join(__dirname, '../src/services');

function toPascalCase(str: string): string {
  return str
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function createIndexFiles(): void {
  // Get all category directories
  const categories = readdirSync(SERVICES_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .sort();

  console.log(`Found ${categories.length} categories:`, categories);

  // Create index files for each category
  categories.forEach(category => {
    const categoryDir = join(SERVICES_DIR, category);
    const files = readdirSync(categoryDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');
    
    if (files.length === 0) {
      console.log(`⚠️  No service files in ${category}`);
      return;
    }

    const indexContent = files
      .sort()
      .map(file => {
        const serviceName = toPascalCase(basename(file, '.ts'));
        return `export { ${serviceName} } from './${basename(file, '.ts')}.js';`;
      })
      .join('\n') + '\n';
    
    writeFileSync(join(categoryDir, 'index.ts'), indexContent);
    console.log(`✓ Created index for ${category} (${files.length} services)`);
  });
  
  // Create main index file
  const mainIndexContent = `// Auto-generated service exports
${categories
  .map(category => `export * from './${category}/index.js';`)
  .join('\n')}

// Re-export types
export type { CSPService, DefineServiceFn, ValidationResult, ConfigurableService } from '../service-types.js';
export { defineService, isCSPService, createConfigurableService } from '../service-types.js';
`;
  
  writeFileSync(join(SERVICES_DIR, 'index.ts'), mainIndexContent);
  console.log('\n✓ Created main index file');
}

createIndexFiles();