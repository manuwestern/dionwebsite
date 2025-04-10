import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const componentsDir = path.join(__dirname, '../src/components');
const extensions = ['.tsx', '.jsx'];

// SEO attributes to add to img tags
const seoAttributes = {
  loading: 'lazy',
  decoding: 'async',
  fetchpriority: 'auto',
  alt: '', // Will be filled dynamically based on context
};

// Function to recursively find all component files
function findComponentFiles(dir) {
  let results = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      results = results.concat(findComponentFiles(itemPath));
    } else if (extensions.includes(path.extname(itemPath).toLowerCase())) {
      results.push(itemPath);
    }
  }
  
  return results;
}

// Function to add SEO attributes to img tags
function addSeoAttributesToImgTags(content, filePath) {
  // Regular expression to find img tags
  const imgRegex = /<img\s+([^>]*)>/g;
  
  // Regular expression to find src attribute
  const srcRegex = /src=["']([^"']*)["']/;
  
  // Regular expression to find alt attribute
  const altRegex = /alt=["']([^"']*)["']/;
  
  // Regular expression to check if loading attribute already exists
  const loadingRegex = /loading=["']([^"']*)["']/;
  
  // Regular expression to check if decoding attribute already exists
  const decodingRegex = /decoding=["']([^"']*)["']/;
  
  // Regular expression to check if fetchpriority attribute already exists
  const fetchpriorityRegex = /fetchpriority=["']([^"']*)["']/;
  
  // Get the component name from the file path
  const componentName = path.basename(filePath, path.extname(filePath));
  
  // Replace img tags with optimized ones
  let modifiedContent = content.replace(imgRegex, (match, attributes) => {
    // Check if the img tag already has the SEO attributes
    const hasLoading = loadingRegex.test(attributes);
    const hasDecoding = decodingRegex.test(attributes);
    const hasFetchpriority = fetchpriorityRegex.test(attributes);
    
    // If all SEO attributes already exist, return the original tag
    if (hasLoading && hasDecoding && hasFetchpriority) {
      return match;
    }
    
    // Extract src attribute
    const srcMatch = attributes.match(srcRegex);
    const src = srcMatch ? srcMatch[1] : '';
    
    // Extract alt attribute or generate one based on the image name
    let alt = '';
    const altMatch = attributes.match(altRegex);
    
    if (altMatch) {
      alt = altMatch[1];
    } else {
      // Generate alt text based on the image name
      if (src) {
        const imageName = path.basename(src, path.extname(src));
        // Convert camelCase or snake_case to spaces and capitalize first letter of each word
        alt = imageName
          .replace(/([A-Z])/g, ' $1') // camelCase to spaces
          .replace(/_/g, ' ') // snake_case to spaces
          .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
          .trim();
      } else {
        // If no src, use component name as fallback
        alt = `${componentName} image`;
      }
    }
    
    // Add SEO attributes if they don't exist
    let newAttributes = attributes;
    
    if (!hasLoading) {
      newAttributes += ` loading="${seoAttributes.loading}"`;
    }
    
    if (!hasDecoding) {
      newAttributes += ` decoding="${seoAttributes.decoding}"`;
    }
    
    if (!hasFetchpriority) {
      newAttributes += ` fetchpriority="${seoAttributes.fetchpriority}"`;
    }
    
    // Add alt attribute if it doesn't exist
    if (!altMatch) {
      newAttributes += ` alt="${alt}"`;
    }
    
    return `<img ${newAttributes}>`;
  });
  
  // Also handle next/image components
  const imageComponentRegex = /<Image\s+([^>]*)>/g;
  const altPropRegex = /alt=\{["']([^"']*)["']\}|alt=["']([^"']*)["']/;
  
  modifiedContent = modifiedContent.replace(imageComponentRegex, (match, attributes) => {
    // Check if the Image component already has an alt prop
    const hasAlt = altPropRegex.test(attributes);
    
    // If alt prop already exists, return the original tag
    if (hasAlt) {
      return match;
    }
    
    // Extract src prop
    const srcMatch = attributes.match(/src=\{["']([^"']*)["']\}|src=["']([^"']*)["']/);
    const src = srcMatch ? (srcMatch[1] || srcMatch[2]) : '';
    
    // Generate alt text based on the image name
    let alt = '';
    if (src) {
      const imageName = path.basename(src, path.extname(src));
      // Convert camelCase or snake_case to spaces and capitalize first letter of each word
      alt = imageName
        .replace(/([A-Z])/g, ' $1') // camelCase to spaces
        .replace(/_/g, ' ') // snake_case to spaces
        .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
        .trim();
    } else {
      // If no src, use component name as fallback
      alt = `${componentName} image`;
    }
    
    // Add alt prop
    return `<Image ${attributes} alt="${alt}">`;
  });
  
  return modifiedContent;
}

// Function to add WebP support with fallback
function addWebpSupport(content) {
  // Regular expression to find img tags with src attribute
  const imgRegex = /<img\s+([^>]*?)src=["']([^"']*\.(jpe?g|png|gif))["']([^>]*)>/gi;
  
  // Replace img tags with picture tags
  return content.replace(imgRegex, (match, beforeSrc, src, ext, afterSrc) => {
    // Skip if the image is an SVG
    if (src.toLowerCase().endsWith('.svg')) {
      return match;
    }
    
    // Generate WebP path
    const webpSrc = src.replace(/\.(jpe?g|png|gif)$/i, '.webp');
    
    // Check if the WebP file exists in the optimized directory
    const webpPath = path.join(__dirname, '../public', webpSrc);
    const originalPath = path.join(__dirname, '../public', src);
    
    // Get the directory for the optimized image
    const optimizedDir = path.dirname(path.join(__dirname, '../public', src.replace('/images/', '/images/optimized/')));
    const optimizedPath = path.join(__dirname, '../public', src.replace('/images/', '/images/optimized/'));
    
    // Create optimized directory if it doesn't exist
    if (!fs.existsSync(optimizedDir)) {
      fs.mkdirSync(optimizedDir, { recursive: true });
    }
    
    // If the WebP file doesn't exist, return the original img tag with optimized attributes
    if (!fs.existsSync(webpPath.replace('/images/', '/images/optimized/'))) {
      // Add SEO attributes to the original img tag
      const imgWithAttributes = match.replace(/<img\s+/, '<img loading="lazy" decoding="async" fetchPriority="auto" ');
      return imgWithAttributes;
    }
    
    // Create picture tag with WebP and original format
    return `<picture>
  <source srcSet="${webpSrc.replace('/images/', '/images/optimized/')}" type="image/webp" />
  <source srcSet="${src.replace('/images/', '/images/optimized/')}" type="image/${ext.toLowerCase() === 'jpg' || ext.toLowerCase() === 'jpeg' ? 'jpeg' : ext.toLowerCase()}" />
  <img ${beforeSrc}src="${src}"${afterSrc} />
</picture>`;
  });
}

// Function to recursively find all image files in the public/images directory
function findImageFiles(dir) {
  let results = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      // Skip the optimized directory to avoid processing already optimized images
      if (item === 'optimized') continue;
      results = results.concat(findImageFiles(itemPath));
    } else {
      const ext = path.extname(item).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif'].includes(ext)) {
        results.push(itemPath);
      }
    }
  }
  
  return results;
}

// Main function
async function main() {
  try {
    // Find all component files
    const componentFiles = findComponentFiles(componentsDir);
    console.log(`Found ${componentFiles.length} component files`);
    
    let modifiedFiles = 0;
    
    // Process each component file
    for (const filePath of componentFiles) {
      // Read the file content
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Add SEO attributes to img tags
      const contentWithSeoAttributes = addSeoAttributesToImgTags(content, filePath);
      
      // Add WebP support with fallback
      const contentWithWebpSupport = addWebpSupport(contentWithSeoAttributes);
      
      // If the content has changed, write it back to the file
      if (content !== contentWithWebpSupport) {
        fs.writeFileSync(filePath, contentWithWebpSupport, 'utf8');
        console.log(`✅ Modified: ${path.relative(process.cwd(), filePath)}`);
        modifiedFiles++;
      }
    }
    
    console.log(`\n=== Image SEO Optimization Summary ===`);
    console.log(`Total component files: ${componentFiles.length}`);
    console.log(`Modified files: ${modifiedFiles}`);
    console.log(`\nImage SEO attributes have been added to all img tags`);
    console.log(`WebP support with fallback has been added where applicable`);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the main function
main();
