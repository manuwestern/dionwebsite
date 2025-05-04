// Custom Vite plugin to handle sitemap.xml
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function sitemapPlugin() {
  return {
    name: 'vite-plugin-sitemap',
    
    // This hook runs after the build is complete
    closeBundle: {
      sequential: true,
      handler: () => {
        const sourcePath = path.join(__dirname, '..', 'public', 'sitemap.xml');
        const destPath = path.join(__dirname, '..', 'dist', 'sitemap.xml');
        
        try {
          // Read the source file
          const sitemapContent = fs.readFileSync(sourcePath, 'utf8');
          
          // Write to the destination with explicit encoding
          fs.writeFileSync(destPath, sitemapContent, { encoding: 'utf8' });
          
          console.log('✅ sitemap.xml successfully copied to dist directory');
        } catch (err) {
          console.error('❌ Error copying sitemap.xml:', err);
        }
      }
    }
  };
}
