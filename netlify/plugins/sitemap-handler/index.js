// Custom Netlify plugin to ensure sitemap files are properly handled
const fs = require('fs');
const path = require('path');

module.exports = {
  onPostBuild: ({ constants, utils }) => {
    const { PUBLISH_DIR } = constants;
    const sitemapSource = path.join(process.cwd(), 'sitemap.xml');
    const sitemapDestination = path.join(PUBLISH_DIR, 'sitemap.xml');
    
    // Check if we have a root-level sitemap.xml
    if (fs.existsSync(sitemapSource)) {
      try {
        // Read source file
        const data = fs.readFileSync(sitemapSource, 'utf8');
        
        // Write to build directory
        fs.writeFileSync(sitemapDestination, data, 'utf8');
        
        utils.status.show({
          title: 'Sitemap Installer',
          summary: 'Successfully copied sitemap.xml to publish directory',
          text: `Source: ${sitemapSource}\nDestination: ${sitemapDestination}`
        });
      } catch (error) {
        utils.build.failPlugin(`Failed to copy sitemap: ${error.message}`);
      }
    } else {
      utils.status.show({
        title: 'Sitemap Installer',
        summary: 'No root sitemap.xml found',
        text: 'Will fallback to public/sitemap.xml if available'
      });
    }
    
    // Verify sitemap exists in build directory
    if (fs.existsSync(sitemapDestination)) {
      const stats = fs.statSync(sitemapDestination);
      utils.status.show({
        title: 'Sitemap Verification',
        summary: 'sitemap.xml exists in build directory',
        text: `Size: ${stats.size} bytes`
      });
    } else {
      utils.build.failPlugin('No sitemap.xml found in build directory!');
    }
  }
};
