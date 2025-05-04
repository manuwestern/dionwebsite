// Node.js script to ensure sitemap files are properly copied to dist directory
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');

console.log('🔍 Checking for sitemap files...');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  console.log('Creating dist directory...');
  fs.mkdirSync(distDir, { recursive: true });
}

// Files to check and copy
const sitemapFiles = [
  { 
    name: 'sitemap.xml', 
    sourcePaths: [
      path.join(projectRoot, 'sitemap.xml'),
      path.join(projectRoot, 'public', 'sitemap.xml')
    ]
  },
  { 
    name: 'sitemap.html', 
    sourcePaths: [
      path.join(projectRoot, 'public', 'sitemap.html')
    ]
  },
  { 
    name: 'sitemap.txt', 
    sourcePaths: [
      path.join(projectRoot, 'public', 'sitemap.txt')
    ]
  }
];

// For each sitemap file type
sitemapFiles.forEach(file => {
  let found = false;
  
  // Try each possible source path
  for (const sourcePath of file.sourcePaths) {
    if (fs.existsSync(sourcePath)) {
      const destPath = path.join(distDir, file.name);
      
      try {
        // Read source file
        const data = fs.readFileSync(sourcePath, 'utf8');
        
        // Write to build directory
        fs.writeFileSync(destPath, data, 'utf8');
        
        console.log(`✅ Found ${file.name} in ${path.relative(projectRoot, sourcePath)} - copied to dist (${data.length} bytes)`);
        found = true;
        break; // Stop checking alternative paths
      } catch (error) {
        console.error(`❌ Error copying ${file.name}: ${error.message}`);
      }
    }
  }
  
  if (!found) {
    console.warn(`⚠️ Warning: ${file.name} not found in any location!`);
  }
});

// Final verification
sitemapFiles.forEach(file => {
  const destPath = path.join(distDir, file.name);
  if (fs.existsSync(destPath)) {
    const stats = fs.statSync(destPath);
    console.log(`✓ Verified ${file.name} in dist directory (${stats.size} bytes)`);
  } else {
    console.error(`✗ Failed to copy ${file.name} to dist directory`);
  }
});

console.log('🔍 Sitemap verification complete');
