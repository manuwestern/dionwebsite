// Simple script to ensure sitemap.xml is copied to the dist directory
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const sourcePath = path.join(__dirname, '..', 'public', 'sitemap.xml');
const destPath = path.join(__dirname, '..', 'dist', 'sitemap.xml');

// Copy the file
try {
  // Read the source file
  const data = fs.readFileSync(sourcePath, 'utf8');
  
  // Write to the destination
  fs.writeFileSync(destPath, data, 'utf8');
  
  console.log('✅ sitemap.xml successfully copied to dist directory');
} catch (err) {
  console.error('❌ Error copying sitemap.xml:', err);
}
