import { Command } from 'commander';

const hello = new Command('hello')
  .description('Say hello')
  .option('-n, --name <string>', 'Your name', 'World')
  .action((opts) => {
    console.log(`Hello, ${opts.name}!`);
  });

export default hello;
