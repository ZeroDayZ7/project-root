import { Command } from 'commander';
import fs from 'fs';
import path from 'path';

const create = new Command('create')
  .description('Create a new microservice from template')
  .argument('<name>', 'Name of the microservice')
  .action((name) => {
    const templateDir = path.resolve(__dirname, '../microservice-template');
    const targetDir = path.resolve(process.cwd(), name);

    if (fs.existsSync(targetDir)) {
      console.error(`Folder "${name}" already exists! Choose a different name.`);
      process.exit(1);
    }

    copyFolderRecursiveSync(templateDir, targetDir);
    console.log(`Microservice created at: ${targetDir}`);
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

export default create;
