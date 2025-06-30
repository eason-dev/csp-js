import { readFile, writeFile, access } from 'node:fs/promises';
import { dirname } from 'node:path';
import { mkdir } from 'node:fs/promises';
import type { ServiceDefinition } from '@csp-kit/data';

/**
 * Check if file exists
 */
export async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

/**
 * Ensure directory exists
 */
export async function ensureDir(path: string): Promise<void> {
  try {
    await mkdir(dirname(path), { recursive: true });
  } catch {
    // Directory might already exist, ignore
  }
}

/**
 * Read JSON file
 */
export async function readJsonFile<T = unknown>(path: string): Promise<T> {
  try {
    const content = await readFile(path, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    throw new Error(
      `Failed to read JSON file ${path}: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Write JSON file with formatting
 */
export async function writeJsonFile(path: string, data: unknown): Promise<void> {
  try {
    await ensureDir(path);
    const content = `${JSON.stringify(data, null, 2)}\n`;
    await writeFile(path, content, 'utf-8');
  } catch (error) {
    throw new Error(
      `Failed to write JSON file ${path}: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Read JSONC file (JSON with comments)
 */
export async function readJsoncFile<T = unknown>(path: string): Promise<T> {
  try {
    const content = await readFile(path, 'utf-8');
    // Simple JSONC parsing - remove comments
    const jsonContent = content
      .split('\n')
      .map(line => line.replace(/\/\/.*$/, '')) // Remove line comments
      .join('\n')
      .replace(/\/\*[\s\S]*?\*\//g, ''); // Remove block comments

    return JSON.parse(jsonContent);
  } catch (error) {
    throw new Error(
      `Failed to read JSONC file ${path}: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Write JSONC file with comments
 */
export async function writeJsoncFile(
  path: string,
  data: ServiceDefinition,
  comment?: string
): Promise<void> {
  try {
    await ensureDir(path);

    let content = '';
    if (comment) {
      content += `// ${comment}\n`;
    }
    content += `${JSON.stringify(data, null, 2)}\n`;

    await writeFile(path, content, 'utf-8');
  } catch (error) {
    throw new Error(
      `Failed to write JSONC file ${path}: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Get service file path
 */
export function getServiceFilePath(serviceId: string): string {
  return `packages/csp-data/data/services/${serviceId}.jsonc`;
}

/**
 * Validate service definition structure
 */
export function validateServiceDefinition(data: unknown): string[] {
  const errors: string[] = [];

  if (!data || typeof data !== 'object') {
    errors.push('Service definition must be an object');
    return errors;
  }

  // Type assertion for the object after checking it's an object
  const serviceData = data as Record<string, unknown>;

  // Required fields
  const requiredFields = [
    'id',
    'name',
    'category',
    'description',
    'website',
    'versions',
    'defaultVersion',
  ];
  for (const field of requiredFields) {
    if (!(field in serviceData)) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  // Validate versions
  if (serviceData.versions && typeof serviceData.versions === 'object') {
    const versions = serviceData.versions as Record<string, unknown>;
    if (Object.keys(versions).length === 0) {
      errors.push('At least one version must be defined');
    }

    for (const [version, versionData] of Object.entries(versions)) {
      if (typeof versionData !== 'object' || !versionData) {
        errors.push(`Version ${version} must be an object`);
        continue;
      }

      const versionObj = versionData as Record<string, unknown>;

      // Required version fields
      const requiredVersionFields = ['csp', 'validFrom'];
      for (const field of requiredVersionFields) {
        if (!(field in versionObj)) {
          errors.push(`Version ${version} missing required field: ${field}`);
        }
      }

      // Validate CSP structure
      if (versionObj.csp && typeof versionObj.csp === 'object') {
        for (const [directive, sources] of Object.entries(versionObj.csp)) {
          if (!Array.isArray(sources)) {
            errors.push(`Version ${version}: CSP directive ${directive} must be an array`);
          }
        }
      }
    }

    // Validate default version exists
    if (serviceData.defaultVersion && !versions[serviceData.defaultVersion as string]) {
      errors.push(`Default version '${serviceData.defaultVersion}' not found in versions`);
    }
  }

  return errors;
}
