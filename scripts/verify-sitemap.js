// Script to verify if sitemap.xml exists in the dist directory after build
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory of this script
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const publicDir = path.join(rootDir, 'public');
const sitemapDist = path.join(distDir, 'sitemap.xml');
const sitemapPublic = path.join(publicDir, 'sitemap.xml');
const sitemapRoot = path.join(rootDir, 'sitemap.xml');

console.log('\n===== SITEMAP VERIFICATION =====');
console.log('Checking if sitemap.xml exists in various locations...\n');

// Check if dist directory exists
if (!fs.existsSync(distDir)) {
  console.error('❌ dist directory does not exist! Build may have failed.');
} else {
  console.log(`✓ dist directory exists: ${distDir}`);
}

// If root sitemap exists, ALWAYS use it (overwriting anything in dist)
if (fs.existsSync(sitemapRoot)) {
  try {
    console.log('🔄 Copying root sitemap.xml to dist directory...');
    const content = fs.readFileSync(sitemapRoot, 'utf8');
    fs.writeFileSync(sitemapDist, content, 'utf8');
    console.log(`✅ Successfully copied sitemap.xml from root directory to dist (${content.length} bytes)`);
    
    // Verify the file in dist
    const stats = fs.statSync(sitemapDist);
    console.log(`✅ Verified: sitemap.xml EXISTS in dist directory (${stats.size} bytes)`);
    console.log(`   First 60 chars: ${content.substring(0, 60)}...`);
  } catch (e) {
    console.error(`❌ Error copying/verifying sitemap: ${e.message}`);
  }
} 
// If no root sitemap but dist has one (probably from public dir)
else if (fs.existsSync(sitemapDist)) {
  const stats = fs.statSync(sitemapDist);
  console.log(`ℹ️ Using existing sitemap.xml in dist directory (${stats.size} bytes)`);
  
  try {
    const content = fs.readFileSync(sitemapDist, 'utf8');
    console.log(`   First 60 chars: ${content.substring(0, 60)}...`);
  } catch (e) {
    console.error(`   Error reading sitemap in dist: ${e.message}`);
  }
} 
// If no root sitemap and no dist sitemap, try to copy from public
else if (fs.existsSync(sitemapPublic)) {
  try {
    console.log('🔄 Copying public sitemap.xml to dist directory...');
    const content = fs.readFileSync(sitemapPublic, 'utf8');
    fs.writeFileSync(sitemapDist, content, 'utf8');
    console.log(`✅ Successfully copied sitemap.xml from public directory to dist (${content.length} bytes)`);
  } catch (e) {
    console.error(`❌ Error copying from public: ${e.message}`);
  }
} else {
  console.error('❌ No sitemap.xml found in any location!');
}

// Check sitemap in public
if (fs.existsSync(sitemapPublic)) {
  const stats = fs.statSync(sitemapPublic);
  console.log(`ℹ️ sitemap.xml exists in public directory (${stats.size} bytes)`);
} else {
  console.log('ℹ️ No sitemap.xml in public directory');
}

// Check sitemap in root
if (fs.existsSync(sitemapRoot)) {
  const stats = fs.statSync(sitemapRoot);
  console.log(`ℹ️ sitemap.xml exists in root directory (${stats.size} bytes)`);
} else {
  console.log('ℹ️ No sitemap.xml in root directory');
}

console.log('\n=== FILE CONTENT OF PUBLIC SITEMAP ===');
try {
  if (fs.existsSync(sitemapPublic)) {
    const content = fs.readFileSync(sitemapPublic, 'utf8');
    console.log(content);
  }
} catch (e) {
  console.error(`Error reading sitemap: ${e.message}`);
}

console.log('\n===== END VERIFICATION =====');
