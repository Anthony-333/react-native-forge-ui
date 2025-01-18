#!/usr/bin/env node
import * as fs from 'fs-extra';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMPONENTS_DIR = 'src/components';
const TEMPLATES_DIR = path.join(__dirname, 'templates');

async function initProject(projectName: string) {
  try {
    console.log('Creating React Native project...');
    execSync(`npx react-native@latest init ${projectName} --template typescript`, { stdio: 'inherit' });
    
    console.log('Setting up project structure...');
    process.chdir(projectName);
    
    // Create components directory
    fs.mkdirpSync(COMPONENTS_DIR);
    
    console.log(`🚀 React Native Forge UI project "${projectName}" initialized successfully!`);
  } catch (error) {
    console.error('Error initializing project:', error);
    process.exit(1);
  }
}

async function addComponent(componentName: string) {
  try {
    const componentDir = path.join(
      process.cwd(),
      COMPONENTS_DIR,
      componentName.toLowerCase()
    );
    
    fs.mkdirpSync(componentDir);

    const templatePath = path.join(
      TEMPLATES_DIR,
      `${componentName.toLowerCase()}.template.tsx`
    );
    const template = fs.readFileSync(templatePath, 'utf-8');

    fs.writeFileSync(path.join(componentDir, `${componentName}.tsx`), template);
    fs.writeFileSync(
      path.join(componentDir, 'index.ts'),
      `export { ${componentName} } from './${componentName}';\n`
    );

    console.log(`✨ Component "${componentName}" added successfully!`);
  } catch (error) {
    console.error('Error adding component:', error);
    process.exit(1);
  }
}

async function main() {
  const [, , command, ...args] = process.argv;

  switch (command) {
    case 'init':
      await initProject(args[0] || 'my-forge-ui-app');
      break;
    case 'add':
      if (!args[0]) {
        console.error('Please specify a component name');
        process.exit(1);
      }
      await addComponent(args[0]);
      break;
    default:
      console.log('Usage: npx react-native-forge-ui init [project-name]');
      console.log('       npx react-native-forge-ui add [component-name]');
      process.exit(1);
  }
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
}); 