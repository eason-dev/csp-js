import inquirer from 'inquirer';
import chalk from 'chalk';
import semver from 'semver';
import { ServiceCategory, getService } from '@csp-js/data';
import type { ServiceDefinition } from '@csp-js/data';
import type { AddServiceOptions } from '../types.js';
import {
  readJsonFile,
  writeJsoncFile,
  getServiceFilePath,
  validateServiceDefinition,
} from '../utils/file-utils.js';
import { createServiceUpdatePR } from '../utils/git-utils.js';

export async function addServiceCommand(options: AddServiceOptions): Promise<void> {
  console.log(chalk.blue('Adding new service definition...'));

  let serviceDefinition: ServiceDefinition;

  try {
    if (options.file) {
      // Load from file
      console.log(chalk.blue(`Loading service definition from ${options.file}...`));
      serviceDefinition = await readJsonFile<ServiceDefinition>(options.file);
    } else if (options.interactive) {
      // Interactive mode
      serviceDefinition = await collectServiceDataInteractively();
    } else {
      console.error(chalk.red('Please specify either --file or --interactive option'));
      process.exit(1);
    }

    // Validate the service definition
    console.log(chalk.blue('Validating service definition...'));
    const validationErrors = validateServiceDefinition(serviceDefinition);
    if (validationErrors.length > 0) {
      console.error(chalk.red('Validation failed:'));
      validationErrors.forEach(error => console.error(chalk.red(`  - ${error}`)));
      process.exit(1);
    }

    // Check if service already exists
    const existingService = getService(serviceDefinition.id);
    if (existingService) {
      console.error(
        chalk.red(`Service '${serviceDefinition.id}' already exists. Use 'update' command instead.`)
      );
      process.exit(1);
    }

    // Write service file
    const filePath = getServiceFilePath(serviceDefinition.id);
    console.log(chalk.blue(`Writing service definition to ${filePath}...`));

    await writeJsoncFile(
      filePath,
      serviceDefinition,
      `Service definition for ${serviceDefinition.name}`
    );

    console.log(chalk.green(`✅ Service '${serviceDefinition.id}' added successfully!`));

    // Ask if user wants to create a PR
    const { createPR } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'createPR',
        message: 'Would you like to create a pull request?',
        default: true,
      },
    ]);

    if (createPR) {
      await createAddServicePR(serviceDefinition, filePath);
    }
  } catch (error) {
    console.error(
      chalk.red('Failed to add service:'),
      error instanceof Error ? error.message : 'Unknown error'
    );
    process.exit(1);
  }
}

async function collectServiceDataInteractively(): Promise<ServiceDefinition> {
  console.log(chalk.yellow('Interactive service creation mode'));

  const basicInfo = await inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'Service ID (kebab-case):',
      validate: input => {
        if (!input) return 'Service ID is required';
        if (!/^[a-z0-9-]+$/.test(input))
          return 'Service ID must be kebab-case (lowercase, numbers, hyphens only)';
        if (getService(input)) return 'Service ID already exists';
        return true;
      },
    },
    {
      type: 'input',
      name: 'name',
      message: 'Service name:',
      validate: input => (input ? true : 'Service name is required'),
    },
    {
      type: 'list',
      name: 'category',
      message: 'Service category:',
      choices: Object.values(ServiceCategory),
    },
    {
      type: 'input',
      name: 'description',
      message: 'Service description:',
      validate: input => (input ? true : 'Description is required'),
    },
    {
      type: 'input',
      name: 'website',
      message: 'Official website URL:',
      validate: input => {
        if (!input) return 'Website URL is required';
        try {
          new URL(input);
          return true;
        } catch {
          return 'Please enter a valid URL';
        }
      },
    },
  ]);

  // Collect official docs
  const officialDocs: string[] = [];
  let addMoreDocs = true;

  while (addMoreDocs) {
    const { docUrl, addAnother } = await inquirer.prompt([
      {
        type: 'input',
        name: 'docUrl',
        message: `Official documentation URL ${officialDocs.length + 1}:`,
        validate: input => {
          if (!input)
            return officialDocs.length > 0 ? true : 'At least one documentation URL is required';
          try {
            new URL(input);
            return true;
          } catch {
            return 'Please enter a valid URL';
          }
        },
      },
      {
        type: 'confirm',
        name: 'addAnother',
        message: 'Add another documentation URL?',
        default: false,
        when: answers => !!answers.docUrl,
      },
    ]);

    if (docUrl) {
      officialDocs.push(docUrl);
    }
    addMoreDocs = addAnother;
  }

  // Collect version information
  const versionInfo = await inquirer.prompt([
    {
      type: 'input',
      name: 'version',
      message: 'Initial version (e.g., 1.0.0 or 2024-01-15):',
      default: '1.0.0',
      validate: input => {
        if (!input) return 'Version is required';
        // Allow semantic versions or date-based versions
        if (semver.valid(input) || /^\\d{4}-\\d{2}-\\d{2}$/.test(input)) {
          return true;
        }
        return 'Version must be semantic (e.g., 1.0.0) or date-based (e.g., 2024-01-15)';
      },
    },
    {
      type: 'input',
      name: 'validFrom',
      message: 'Valid from date (YYYY-MM-DD):',
      default: () => new Date().toISOString().slice(0, 10),
      validate: input => {
        if (!input) return 'Valid from date is required';
        if (!/^\\d{4}-\\d{2}-\\d{2}$/.test(input)) return 'Date must be in YYYY-MM-DD format';
        return true;
      },
    },
  ]);

  // Collect CSP directives
  console.log(chalk.yellow("\nNow let's define the CSP requirements..."));
  const csp: Record<string, string[]> = {};

  const cspDirectives = [
    'script-src',
    'style-src',
    'img-src',
    'connect-src',
    'frame-src',
    'font-src',
    'form-action',
    'object-src',
    'media-src',
  ];

  for (const directive of cspDirectives) {
    const { addDirective } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'addDirective',
        message: `Add ${directive} directive?`,
        default: ['script-src', 'img-src', 'connect-src'].includes(directive),
      },
    ]);

    if (addDirective) {
      const sources: string[] = [];
      let addMoreSources = true;

      while (addMoreSources) {
        const { source, addAnother } = await inquirer.prompt([
          {
            type: 'input',
            name: 'source',
            message: `${directive} source ${sources.length + 1}:`,
            validate: input => {
              if (!input)
                return sources.length > 0
                  ? true
                  : 'At least one source is required for this directive';
              return true;
            },
          },
          {
            type: 'confirm',
            name: 'addAnother',
            message: `Add another ${directive} source?`,
            default: false,
            when: answers => !!answers.source,
          },
        ]);

        if (source) {
          sources.push(source);
        }
        addMoreSources = addAnother;
      }

      if (sources.length > 0) {
        csp[directive] = sources;
      }
    }
  }

  // Additional metadata
  const metadata = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'requiresDynamic',
      message: 'Does this service require dynamic CSP (script injection)?',
      default: false,
    },
    {
      type: 'confirm',
      name: 'requiresNonce',
      message: 'Does this service require nonce for inline scripts?',
      default: false,
    },
    {
      type: 'input',
      name: 'aliases',
      message: 'Service aliases (comma-separated, optional):',
    },
  ]);

  const aliases = metadata.aliases
    ? metadata.aliases
        .split(',')
        .map((alias: string) => alias.trim())
        .filter(Boolean)
    : undefined;

  // Build service definition
  const serviceDefinition: ServiceDefinition = {
    id: basicInfo.id,
    name: basicInfo.name,
    category: basicInfo.category,
    description: basicInfo.description,
    website: basicInfo.website,
    officialDocs,
    versions: {
      [versionInfo.version]: {
        csp,
        validFrom: versionInfo.validFrom,
        requiresDynamic: metadata.requiresDynamic,
        requiresNonce: metadata.requiresNonce,
      },
    },
    defaultVersion: versionInfo.version,
    aliases,
    lastUpdated: new Date().toISOString(),
  };

  return serviceDefinition;
}

async function createAddServicePR(service: ServiceDefinition, filePath: string): Promise<void> {
  const commitMessage = `feat: add ${service.name} service definition

- Service ID: ${service.id}
- Category: ${service.category}
- Default version: ${service.defaultVersion}
- CSP directives: ${Object.keys(service.versions[service.defaultVersion]?.csp || {}).join(', ')}

Generated with @csp-js/cli`;

  const prTitle = `feat: Add ${service.name} service`;

  const prBody = `## Summary
Add new service definition for **${service.name}**.

## Service Details
- **ID**: \`${service.id}\`
- **Category**: ${service.category}
- **Website**: ${service.website}
- **Default Version**: ${service.defaultVersion}

## CSP Requirements
${Object.entries(service.versions[service.defaultVersion]?.csp || {})
  .map(([directive, sources]) => `- \`${directive}\`: ${(sources as string[]).join(', ')}`)
  .join('\\n')}

## Documentation
${service.officialDocs.map(url => `- ${url}`).join('\\n')}

---
*This PR was created automatically using @csp-js/cli*`;

  const result = await createServiceUpdatePR(
    service.id,
    'add',
    [filePath],
    commitMessage,
    prTitle,
    prBody
  );

  if (result.success) {
    console.log(chalk.green('✅ Pull request created successfully!'));
    if (result.pullRequestUrl) {
      console.log(chalk.blue(`🔗 PR URL: ${result.pullRequestUrl}`));
    }
  } else {
    console.error(chalk.red('❌ Failed to create pull request:'), result.message);
    console.log(chalk.yellow('You can manually create a PR with the committed changes.'));
  }
}
