// Script to ensure all sitemap files are properly copied to dist directory
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.join(__dirname, '..', 'dist');

// Files to copy with their source directories
const filesToCopy = [
  { file: 'sitemap.xml', sourceDir: path.join(__dirname, '..') }, // Root directory
  { file: 'sitemap.xml', sourceDir: path.join(__dirname, '..', 'public') },
  { file: 'sitemap.html', sourceDir: path.join(__dirname, '..', 'public') },
  { file: 'sitemap.txt', sourceDir: path.join(__dirname, '..', 'public') }
];

// Function to copy a file
function copyFile(source, target) {
  try {
    // Create directory if it doesn't exist
    const targetDir = path.dirname(target);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // Read and write file
    const data = fs.readFileSync(source, 'utf8');
    fs.writeFileSync(target, data, 'utf8');
    console.log(`✅ Successfully copied: ${path.basename(source)}`);
  } catch (err) {
    console.error(`❌ Error copying ${path.basename(source)}: ${err.message}`);
  }
}

// Copy all sitemap files
console.log('📂 Copying sitemap files to dist directory...');
filesToCopy.forEach(item => {
  const sourcePath = path.join(item.sourceDir, item.file);
  const targetPath = path.join(targetDir, item.file);
  
  if (fs.existsSync(sourcePath)) {
    copyFile(sourcePath, targetPath);
  } else {
    console.warn(`⚠️ Warning: ${item.file} not found in ${item.sourceDir}`);
  }
});

console.log('✅ Sitemap copy process completed');
