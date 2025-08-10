import { Command } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';

const templateDir = path.resolve(__dirname, '../../microservice-template');

const create = new Command('create')
  .description('Create a new microservice from template')
  .option('-n, --name <name>', 'Name of the microservice')
  .action(async (options) => {
    let name = options.name;

    if (!name) {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Enter the name of the microservice:',
          validate: (input) => input ? true : 'Name cannot be empty',
        }
      ]);
      name = answers.name;
    }

    const targetDir = path.resolve(process.cwd(), name);

    if (!fs.existsSync(templateDir)) {
      console.error(`❌ Template folder not found: ${templateDir}`);
      process.exit(1);
    }

    if (fs.existsSync(targetDir)) {
      console.error(`❌ Folder "${name}" already exists!`);
      process.exit(1);
    }

    copyFolderRecursiveSync(templateDir, targetDir);
    generateTsConfig(targetDir, "../../tsconfig.base.json");

    console.log(`✅ Microservice created at: ${targetDir}`);
  });

function copyFolderRecursiveSync(src: string, dest: string) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyFolderRecursiveSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function generateTsConfig(targetDir: string, basePath: string) {
  const content = {
    extends: basePath,
    compilerOptions: {
      rootDir: "./src",
      outDir: "./dist",
      noEmit: false,
      allowImportingTsExtensions: false,
      composite: false,
      incremental: false
    },
    include: ["src/**/*"]
  };

  const filePath = path.join(targetDir, 'tsconfig.json');
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
  console.log(`tsconfig.json wygenerowany w ${filePath}`);
}

export default create;
