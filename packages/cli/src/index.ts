#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();

program
  .name('maniek')
  .description('Example CLI in ESM')
  .version('1.0.0');

program
  .command('hello')
  .option('-n, --name <string>', 'Your name', 'World')
  .action((opts) => {
    console.log(`Hello, ${opts.name}!`);
  });

program.parse();
