import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const sourceDir = path.join(__dirname, '../public/images');
const outputDir = path.join(__dirname, '../public/images');
const webpQuality = 80; // 0-100, higher is better quality but larger file
const pngQuality = 80; // 0-100
const jpegQuality = 85; // 0-100
const avifQuality = 65; // 0-100, AVIF can use lower quality with good results

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to recursively find all image files
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

// Get all image files from the source directory and its subdirectories
const imageFiles = findImageFiles(sourceDir);

console.log(`Found ${imageFiles.length} images to optimize`);

// Debug: Print all found image files
console.log("Found image files:");
imageFiles.forEach(file => {
  console.log(` - ${file}`);
});

// Process each image
async function processImages() {
  const results = {
    success: 0,
    failed: 0,
    skipped: 0,
    totalSaved: 0
  };

  for (const inputPath of imageFiles) {
    // Get relative path from source directory
    const relativePath = path.relative(sourceDir, inputPath);
    const fileExt = path.extname(inputPath).toLowerCase();
    const fileName = path.basename(inputPath, fileExt);
    const relativeDir = path.dirname(relativePath);
    
    console.log(`Processing: ${relativePath}`);
    console.log(`  File extension: ${fileExt}`);
    console.log(`  Output directory: ${relativeDir}`);
    
    // Create output directory structure
    const outputSubDir = path.join(outputDir, relativeDir);
    if (!fs.existsSync(outputSubDir)) {
      console.log(`  Creating directory: ${outputSubDir}`);
      fs.mkdirSync(outputSubDir, { recursive: true });
    }
    
    const outputPathWebp = path.join(outputSubDir, `${fileName}.webp`);
    const outputPathOriginal = path.join(outputSubDir, path.basename(inputPath));
    
    console.log(`  Output WebP: ${outputPathWebp}`);
    console.log(`  Output Original: ${outputPathOriginal}`);

    // Copy SVG files directly (they're already optimized)
    if (fileExt === '.svg') {
      try {
        fs.copyFileSync(inputPath, outputPathOriginal);
        console.log(`✅ Copied SVG file: ${relativePath}`);
        results.success++;
      } catch (error) {
        console.error(`❌ Error copying SVG file ${relativePath}:`, error);
        results.failed++;
      }
      continue;
    }

    // Optimize existing WebP files
    if (fileExt === '.webp') {
      try {
        await sharp(inputPath)
          .webp({ quality: webpQuality })
          .toFile(outputPathOriginal);
        
        const originalSize = fs.statSync(inputPath).size;
        const optimizedSize = fs.statSync(outputPathOriginal).size;
        const savings = originalSize - optimizedSize;
        
        console.log(`✅ Optimized WebP file: ${relativePath}`);
        console.log(`   Original: ${formatBytes(originalSize)}`);
        console.log(`   Optimized: ${formatBytes(optimizedSize)} (saved ${formatBytes(savings)}, ${Math.round((savings / originalSize) * 100)}%)`);
        
        results.totalSaved += savings;
        results.success++;
      } catch (error) {
        console.error(`❌ Error optimizing WebP file ${relativePath}:`, error);
        results.failed++;
      }
      continue;
    }

    try {
      // Get original file size
      const originalSize = fs.statSync(inputPath).size;

      // Create a sharp instance
      const image = sharp(inputPath);
      const metadata = await image.metadata();

      // Process to WebP and AVIF
      const outputPathAvif = path.join(outputSubDir, `${fileName}.avif`);
      
      await image
        .webp({ quality: webpQuality })
        .toFile(outputPathWebp);
        
      // Generate AVIF version for modern browsers
      try {
        await image
          .avif({ quality: avifQuality })
          .toFile(outputPathAvif);
          
        const avifSize = fs.statSync(outputPathAvif).size;
        const avifSavings = originalSize - avifSize;
        console.log(`   AVIF: ${formatBytes(avifSize)} (saved ${formatBytes(avifSavings)}, ${Math.round((avifSavings / originalSize) * 100)}%)`);
      } catch (avifError) {
        console.error(`  Error creating AVIF version for ${relativePath}:`, avifError);
      }

      // Also optimize the original format
      if (fileExt === '.jpg' || fileExt === '.jpeg') {
        await sharp(inputPath)
          .jpeg({ quality: jpegQuality, progressive: true })
          .toFile(outputPathOriginal);
      } else if (fileExt === '.png') {
        console.log(`  Processing PNG file: ${relativePath}`);
        try {
          await sharp(inputPath)
            .png({ quality: pngQuality, compressionLevel: 9, adaptiveFiltering: true, force: true })
            .toFile(outputPathOriginal);
          console.log(`  Successfully processed PNG file: ${relativePath}`);
        } catch (pngError) {
          console.error(`  Error processing PNG file ${relativePath}:`, pngError);
          // Fallback: just copy the file
          console.log(`  Falling back to copy for: ${relativePath}`);
          fs.copyFileSync(inputPath, outputPathOriginal);
        }
      } else if (fileExt === '.gif') {
        // For GIF files, just copy them as Sharp doesn't handle animated GIFs well
        fs.copyFileSync(inputPath, outputPathOriginal);
      }

      // Calculate size reduction
      const webpSize = fs.statSync(outputPathWebp).size;
      const optimizedOriginalSize = fs.statSync(outputPathOriginal).size;
      const webpSavings = originalSize - webpSize;
      const originalSavings = originalSize - optimizedOriginalSize;
      
      results.totalSaved += webpSavings;
      
      console.log(`✅ Processed: ${relativePath}`);
      console.log(`   Original: ${formatBytes(originalSize)}`);
      console.log(`   WebP: ${formatBytes(webpSize)} (saved ${formatBytes(webpSavings)}, ${Math.round((webpSavings / originalSize) * 100)}%)`);
      console.log(`   Optimized ${path.extname(inputPath).substring(1).toUpperCase()}: ${formatBytes(optimizedOriginalSize)} (saved ${formatBytes(originalSavings)}, ${Math.round((originalSavings / originalSize) * 100)}%)`);
      
      results.success++;
    } catch (error) {
      console.error(`❌ Error processing ${relativePath}:`, error);
      results.failed++;
    }
  }

  return results;
}

// Helper function to format bytes
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Run the optimization
processImages().then(results => {
  console.log('\n=== Image Optimization Summary ===');
  console.log(`Total images processed: ${results.success + results.failed + results.skipped}`);
  console.log(`Successfully optimized: ${results.success}`);
  console.log(`Failed: ${results.failed}`);
  console.log(`Skipped: ${results.skipped}`);
  console.log(`Total space saved: ${formatBytes(results.totalSaved)}`);
  console.log('\nOptimized images are available in the public/images/optimized directory');
  console.log('You can now use these optimized images in your application');
}).catch(err => {
  console.error('Error during image optimization:', err);
});
