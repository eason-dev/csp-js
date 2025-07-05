#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { addServiceCommand } from './commands/add-service.js';
import { updateServiceCommand } from './commands/update-service.js';
import { validateDataCommand } from './commands/validate-data.js';
import { checkServiceCommand } from './commands/check-service.js';

const program = new Command();

program
  .name('csp-cli')
  .description('CLI tool for managing CSP service definitions and data updates')
  .version('0.1.0');

// Add service command
program
  .command('add')
  .description('Add a new service definition')
  .option('-i, --interactive', 'Use interactive mode')
  .option('-f, --file <file>', 'JSON file with service definition')
  .action(addServiceCommand);

// Update service command
program
  .command('update')
  .description('Update existing service definition')
  .argument('<service-id>', 'Service ID to update')
  .option('-i, --interactive', 'Use interactive mode')
  .option('-f, --file <file>', 'JSON file with service definition')
  .action(updateServiceCommand);

// Validate data command
program
  .command('validate')
  .description('Validate all service definitions and data integrity')
  .option('-s, --service <service-id>', 'Validate specific service only')
  .action(validateDataCommand);

// Check service command
program
  .command('check')
  .description('Check a service for CSP requirement changes')
  .argument('<service-id>', 'Service ID to check')
  .option('-u, --url <url>', 'Custom URL to check')
  .action(checkServiceCommand);

// Error handling
program.configureOutput({
  writeErr: str => process.stderr.write(chalk.red(str)),
});

program.exitOverride(err => {
  if (err.code === 'commander.help') {
    process.exit(0);
  }
  if (err.code === 'commander.version') {
    process.exit(0);
  }
  process.exit(1);
});

// Parse arguments
async function main() {
  try {
    await program.parseAsync();
  } catch (error) {
    console.error(chalk.red('Error:'), error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}

main();
