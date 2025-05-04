// Simple script to copy sitemap.xml to dist directory during build
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory of this script
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const sitemapSource = path.join(rootDir, 'sitemap.xml');
const sitemapDest = path.join(distDir, 'sitemap.xml');

console.log('Copying sitemap.xml to dist directory...');

// Make sure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

try {
  if (fs.existsSync(sitemapSource)) {
    // Read and write the file
    const sitemapContent = fs.readFileSync(sitemapSource, 'utf8');
    fs.writeFileSync(sitemapDest, sitemapContent, 'utf8');
    console.log(`✅ Successfully copied sitemap.xml (${sitemapContent.length} bytes)`);
  } else {
    console.error('❌ Error: sitemap.xml not found in root directory!');
  }
} catch (error) {
  console.error(`❌ Error: ${error.message}`);
}
