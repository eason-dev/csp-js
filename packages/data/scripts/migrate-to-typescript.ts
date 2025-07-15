#!/usr/bin/env tsx

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs';
import { join, dirname, basename } from 'path';
import { parse } from 'jsonc-parser';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface ServiceDefinition {
  id: string;
  name: string;
  category: string;
  description: string;
  website: string;
  officialDocs: string[];
  cspDirectives: Record<string, string[]>;
  requiresDynamic?: boolean;
  requiresNonce?: boolean;
  notes?: string;
  aliases?: string[];
  lastUpdated: string;
  verifiedAt?: string;
  monitoring?: unknown;
}

const SERVICES_DIR = join(__dirname, '../data/services');
const OUTPUT_DIR = join(__dirname, '../src/services');

// Categories to create subdirectories for
const CATEGORIES = [
  'analytics',
  'advertising',
  'cdn',
  'chat',
  'fonts',
  'forms',
  'maps',
  'monitoring',
  'payment',
  'social',
  'testing',
  'video',
  'other',
];

function migrateService(filePath: string, category: string): void {
  const content = readFileSync(filePath, 'utf-8');
  const service = parse(content) as ServiceDefinition;

  // Generate TypeScript content
  const tsContent = `import { defineService } from '../../service-types';
import { ServiceCategory } from '../../types';

export const ${toPascalCase(service.id)} = defineService({
  id: '${service.id}',
  name: '${service.name}',
  category: ServiceCategory.${getCategoryEnum(service.category)},
  description: '${service.description.replace(/'/g, "\\'")}',
  website: '${service.website}',
  officialDocs: ${JSON.stringify(service.officialDocs, null, 2)
    .split('\n')
    .map((line, i) => (i === 0 ? line : '  ' + line))
    .join('\n')},
  directives: ${formatDirectives(service.cspDirectives)},${
    service.requiresDynamic ? `\n  requiresDynamic: ${service.requiresDynamic},` : ''
  }${service.requiresNonce ? `\n  requiresNonce: ${service.requiresNonce},` : ''}${
    service.notes ? `\n  notes: '${service.notes.replace(/'/g, "\\'")}',` : ''
  }${service.aliases ? `\n  aliases: ${JSON.stringify(service.aliases)},` : ''}
  lastUpdated: '${service.lastUpdated}'${
    service.verifiedAt ? `,\n  verifiedAt: '${service.verifiedAt}'` : ''
  }${
    service.monitoring
      ? `,\n  monitoring: ${JSON.stringify(service.monitoring, null, 2)
          .split('\n')
          .map((line, i) => (i === 0 ? line : '  ' + line))
          .join('\n')}`
      : ''
  }
});
`;

  // Write to appropriate category directory
  const categoryDir = join(OUTPUT_DIR, category);
  mkdirSync(categoryDir, { recursive: true });

  const outputPath = join(categoryDir, `${service.id}.ts`);
  writeFileSync(outputPath, tsContent);

  console.log(`✓ Migrated ${service.id} to ${outputPath}`);
}

function formatDirectives(directives: Record<string, string[]>): string {
  const lines = ['{'];
  const entries = Object.entries(directives);

  entries.forEach(([key, values], index) => {
    const isLast = index === entries.length - 1;
    lines.push(`    '${key}': ${JSON.stringify(values)}${isLast ? '' : ','}`);
  });

  lines.push('  }');
  return lines.join('\n');
}

function toPascalCase(str: string): string {
  return str
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function getCategoryEnum(category: string): string {
  const mapping: Record<string, string> = {
    analytics: 'ANALYTICS',
    advertising: 'ADVERTISING',
    cdn: 'CDN',
    chat: 'CHAT',
    fonts: 'FONTS',
    forms: 'FORMS',
    maps: 'MAPS',
    monitoring: 'MONITORING',
    payment: 'PAYMENT',
    social: 'SOCIAL',
    testing: 'TESTING',
    video: 'VIDEO',
    other: 'OTHER',
  };

  return mapping[category.toLowerCase()] || 'OTHER';
}

function createIndexFiles(): void {
  // Create index files for each category
  CATEGORIES.forEach(category => {
    const categoryDir = join(OUTPUT_DIR, category);
    const files = readdirSync(categoryDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

    const indexContent =
      files
        .map(file => {
          const serviceName = toPascalCase(basename(file, '.ts'));
          return `export { ${serviceName} } from './${basename(file, '.ts')}';`;
        })
        .join('\n') + '\n';

    writeFileSync(join(categoryDir, 'index.ts'), indexContent);
  });

  // Create main index file
  const mainIndexContent =
    CATEGORIES.map(category => `export * from './${category}';`).join('\n') + '\n';

  writeFileSync(join(OUTPUT_DIR, 'index.ts'), mainIndexContent);
}

async function main() {
  console.log('Starting migration from JSONC to TypeScript...\n');

  // Create output directory
  mkdirSync(OUTPUT_DIR, { recursive: true });

  // Get all JSONC files
  const files = readdirSync(SERVICES_DIR).filter(f => f.endsWith('.jsonc'));
  console.log(`Found ${files.length} service files to migrate\n`);

  // Migrate each file
  let migrated = 0;
  for (const file of files) {
    try {
      const filePath = join(SERVICES_DIR, file);
      const content = readFileSync(filePath, 'utf-8');
      const service = parse(content) as ServiceDefinition;

      migrateService(filePath, service.category || 'other');
      migrated++;
    } catch (error) {
      console.error(`✗ Failed to migrate ${file}:`, error);
    }
  }

  // Create index files
  console.log('\nCreating index files...');
  createIndexFiles();

  console.log(`\n✅ Migration complete! Migrated ${migrated}/${files.length} services.`);
}

main().catch(console.error);
