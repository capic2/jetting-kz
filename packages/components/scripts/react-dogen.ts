import { ComponentDoc, parse } from 'react-docgen-typescript';
import * as path from 'node:path';
import { globSync } from 'glob';
import { writeFileSync } from 'node:fs';

if (process.argv.length < 4) {
  console.error('Usage: tsx script.ts <glob_pattern> <output_file.json>');
  process.exit(1);
}

const globPattern = process.argv[2];
const outputFilePath = process.argv[3];

try {
  const files = globSync(globPattern);

  // Filter out files that do not end with .tsx or that include ".stories."
  const tsxFiles = files.filter(
    (file) => file.endsWith('.tsx') && !file.includes('.stories.')
  );

  if (tsxFiles.length === 0) {
    console.error('No valid .tsx files found.');
    process.exit(1);
  }

  console.log(`Processing ${tsxFiles.length} file(s)...`);

  const result: Record<string, ComponentDoc[]> = {};

  tsxFiles.forEach((file) => {
    try {
      result[path.basename(file)] = parse(file);
    } catch (error) {
      console.error(`Error parsing file ${file}:`, error);
    }
  });

  writeFileSync(outputFilePath, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`Documentation successfully generated in ${outputFilePath}`);
} catch (err) {
  console.error('Error reading glob pattern:', err);
  process.exit(1);
}
