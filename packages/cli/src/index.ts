#!/usr/bin/env node
import { Command } from 'commander';
import helloCommand from './commands/hello.js';
import createCommand from './commands/create.js';

const program = new Command();

program
  .name('maniek')
  .description('Example CLI in ESM')
  .version('1.0.0');

program.addCommand(helloCommand);
program.addCommand(createCommand);

program.parse();
