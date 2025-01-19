#!/usr/bin/env node
import fs from 'fs-extra';
import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import prompts, { PromptObject } from 'prompts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const COMPONENTS_DIR = 'src/components';
const TEMPLATES_DIR = path.join(__dirname, 'templates');

async function setupTailwind() {
  console.log('Setting up TailwindCSS...');
  // Install necessary dependencies
  execSync('yarn add nativewind@3.0.0-next.34', { stdio: 'inherit' });
  execSync('yarn add -D tailwindcss@3.3.2', { stdio: 'inherit' });
  
  // Create tailwind config
  fs.writeFileSync(
    'tailwind.config.js',
    `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./App.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`
  );

  // Update babel.config.js
  const babelConfig = fs.readFileSync('babel.config.js', 'utf-8');
  const updatedBabelConfig = babelConfig.replace(
    'module.exports = {',
    `module.exports = {
  plugins: ["nativewind/babel"],`
  );
  fs.writeFileSync('babel.config.js', updatedBabelConfig);

  // Create app.d.ts for TypeScript support
  fs.writeFileSync(
    'app.d.ts',
    `/// <reference types="nativewind/types" />`
  );
}

type ProjectNamePromptResult = { projectName: string };
type TailwindPromptResult = { useTailwind: boolean };

async function initProject() {
  try {
    const isExistingProject = fs.existsSync('package.json');
    
    if (!isExistingProject) {
      const questions: PromptObject[] = [
        {
          type: 'text',
          name: 'projectName',
          message: 'What is your project name?',
          validate: (value: string) => value.length > 0 ? true : 'Project name is required'
        }
      ];

      const response = await prompts(questions);

      if (!response.projectName) {
        console.error('Project name is required');
        process.exit(1);
      }

      console.log('Creating React Native project...');
      execSync(`npx react-native@latest init ${response.projectName} --template typescript`, { stdio: 'inherit' });
      process.chdir(response.projectName);
    }

    // Ask about Tailwind regardless of new or existing project
    const tailwindQuestion: PromptObject = {
      type: 'confirm',
      name: 'useTailwind',
      message: 'Would you like to use TailwindCSS for styling?',
      initial: true
    };

    const response = await prompts(tailwindQuestion) as TailwindPromptResult;

    // Create components directory if it doesn't exist
    fs.mkdirpSync(COMPONENTS_DIR);

    if (response.useTailwind) {
      await setupTailwind();
    }
    
    // Install types for prompts if not already installed
    try {
      execSync('yarn add -D @types/prompts', { stdio: 'inherit' });
    } catch (error) {
      // Ignore error if package is already installed
    }
    
    console.log(`🚀 React Native Forge UI ${isExistingProject ? 'setup' : 'project'} completed successfully!`);
  } catch (error) {
    console.error('Error initializing project:', error);
    process.exit(1);
  }
}

async function addComponent(componentName: string, useTailwind: boolean) {
  try {
    const componentDir = path.join(
      process.cwd(),
      COMPONENTS_DIR,
      componentName.toLowerCase()
    );
    
    fs.mkdirpSync(componentDir);

    const templatePath = path.join(
      TEMPLATES_DIR,
      useTailwind 
        ? `${componentName.toLowerCase()}.tailwind.template.tsx`
        : `${componentName.toLowerCase()}.template.tsx`
    );
    const template = fs.readFileSync(templatePath, 'utf-8');

    fs.writeFileSync(path.join(componentDir, `${componentName}.tsx`), template);
    fs.writeFileSync(
      path.join(componentDir, 'index.ts'),
      `export { ${componentName} } from './${componentName}';\n`
    );

    console.log(`✨ Component ${componentName} created successfully!`);
  } catch (error) {
    console.error('Error creating component:', error);
    process.exit(1);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (command === 'init') {
    await initProject();
  } else if (command === 'add') {
    const componentName = args[1];
    if (!componentName) {
      console.error('Please provide a component name');
      process.exit(1);
    }

    // Check if project uses Tailwind by looking for tailwind.config.js
    const useTailwind = fs.existsSync(path.join(process.cwd(), 'tailwind.config.js'));
    await addComponent(componentName, useTailwind);
  } else {
    console.error('Invalid command. Available commands: init, add');
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
}); 