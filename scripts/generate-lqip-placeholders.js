/**
 * Skript zur Generierung von LQIP (Low Quality Image Placeholders) für Bilder
 * 
 * Dieses Skript durchsucht das public/images-Verzeichnis nach Bildern und generiert
 * kleine, verschwommene Versionen dieser Bilder als Platzhalter für die OptimizedImage-Komponente.
 * 
 * Verwendung:
 * node scripts/generate-lqip-placeholders.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import sharp from 'sharp'; // Benötigt: npm install sharp

// __dirname Äquivalent für ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Konfiguration
const imagesDir = path.join(__dirname, '..', 'public', 'images');
const placeholdersDir = path.join(__dirname, '..', 'public', 'images', 'placeholders');
const filePattern = '**/*.{jpg,jpeg,png,webp}';
const placeholderWidth = 20; // Breite des Platzhalters
const placeholderQuality = 20; // Qualität des Platzhalters (1-100)

// Funktion zum Erstellen des Platzhalter-Verzeichnisses, falls es nicht existiert
function ensurePlaceholderDirExists() {
  if (!fs.existsSync(placeholdersDir)) {
    fs.mkdirSync(placeholdersDir, { recursive: true });
    console.log(`Verzeichnis erstellt: ${placeholdersDir}`);
  }
}

// Funktion zum Generieren eines LQIP für ein Bild
async function generatePlaceholder(imagePath) {
  try {
    // Extrahiere den Dateinamen und erstelle den Pfad für den Platzhalter
    const relativePath = path.relative(imagesDir, imagePath);
    const placeholderPath = path.join(placeholdersDir, relativePath);
    
    // Stelle sicher, dass das Verzeichnis für den Platzhalter existiert
    const placeholderDir = path.dirname(placeholderPath);
    if (!fs.existsSync(placeholderDir)) {
      fs.mkdirSync(placeholderDir, { recursive: true });
    }
    
    // Lade das Bild und extrahiere seine Dimensionen
    const metadata = await sharp(imagePath).metadata();
    const { width, height } = metadata;
    
    // Berechne die Höhe des Platzhalters unter Beibehaltung des Seitenverhältnisses
    const placeholderHeight = Math.round((height / width) * placeholderWidth);
    
    // Generiere den Platzhalter
    await sharp(imagePath)
      .resize(placeholderWidth, placeholderHeight)
      .webp({ quality: placeholderQuality })
      .toFile(placeholderPath.replace(/\.(jpg|jpeg|png|webp)$/i, '.webp'));
    
    return {
      original: relativePath,
      placeholder: path.relative(imagesDir, placeholderPath).replace(/\.(jpg|jpeg|png|webp)$/i, '.webp'),
      width,
      height,
      success: true
    };
  } catch (error) {
    console.error(`Fehler bei der Generierung des Platzhalters für ${imagePath}:`, error);
    return {
      original: path.relative(imagesDir, imagePath),
      success: false,
      error: error.message
    };
  }
}

// Funktion zum Generieren eines TypeScript-Interfaces für die Platzhalter
function generateTypeScriptInterface(placeholders) {
  const successfulPlaceholders = placeholders.filter(p => p.success);
  
  let interfaceContent = `/**
 * Automatisch generierte Platzhalter für Bilder
 * Generiert am: ${new Date().toISOString()}
 */

export interface ImagePlaceholder {
  original: string;
  placeholder: string;
  width: number;
  height: number;
}

export const imagePlaceholders: Record<string, ImagePlaceholder> = {
`;
  
  successfulPlaceholders.forEach(placeholder => {
    const key = placeholder.original
      .replace(/\\/g, '/')
      .replace(/\.(jpg|jpeg|png|webp)$/i, '')
      .replace(/[^a-zA-Z0-9_/]/g, '_');
    
    interfaceContent += `  "${key}": {
    original: "/images/${placeholder.original.replace(/\\/g, '/')}",
    placeholder: "/images/placeholders/${placeholder.placeholder.replace(/\\/g, '/')}",
    width: ${placeholder.width},
    height: ${placeholder.height}
  },
`;
  });
  
  interfaceContent += `};
`;
  
  return interfaceContent;
}

// Funktion zum Generieren einer Beispielkomponente
function generateExampleComponent() {
  return `/**
 * Beispiel für die Verwendung der OptimizedImage-Komponente mit LQIP
 */

import React from 'react';
import OptimizedImage from '../components/common/OptimizedImage';
import { imagePlaceholders } from './imagePlaceholders';

const ExampleComponent: React.FC = () => {
  // Beispiel für ein Bild mit Platzhalter
  const imageKey = 'Model_Home'; // Ersetzen Sie dies durch den Schlüssel eines Ihrer Bilder
  const imageData = imagePlaceholders[imageKey];
  
  if (!imageData) {
    return <div>Bild nicht gefunden</div>;
  }
  
  return (
    <div>
      <h2>Optimiertes Bild mit LQIP</h2>
      <OptimizedImage
        sources={{
          original: imageData.original,
          webp: imageData.original.replace(/\.(jpg|jpeg|png)$/i, '.webp'),
          placeholder: imageData.placeholder,
          width: imageData.width,
          height: imageData.height
        }}
        alt="Beispielbild"
        useLqip={true}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};

export default ExampleComponent;
`;
}

// Hauptfunktion
async function main() {
  // Stelle sicher, dass das Platzhalter-Verzeichnis existiert
  ensurePlaceholderDirExists();
  
  // Finde alle Bilder im images-Verzeichnis
  const imageFiles = glob.sync(path.join(imagesDir, filePattern), {
    ignore: path.join(imagesDir, 'placeholders', '**')
  });
  
  console.log(`\n=== LQIP-Generator ===\n`);
  console.log(`Gefunden: ${imageFiles.length} Bilder\n`);
  
  // Generiere Platzhalter für jedes Bild
  const placeholders = [];
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < imageFiles.length; i++) {
    const imagePath = imageFiles[i];
    const relativePath = path.relative(imagesDir, imagePath);
    process.stdout.write(`Generiere Platzhalter (${i + 1}/${imageFiles.length}): ${relativePath}`);
    
    const result = await generatePlaceholder(imagePath);
    
    if (result.success) {
      process.stdout.write(' ✓\n');
      placeholders.push(result);
      successCount++;
    } else {
      process.stdout.write(' ✗\n');
      errorCount++;
    }
  }
  
  console.log(`\nErgebnis: ${successCount} Platzhalter generiert, ${errorCount} Fehler\n`);
  
  // Generiere TypeScript-Interface für die Platzhalter
  if (successCount > 0) {
    const interfaceContent = generateTypeScriptInterface(placeholders);
    const interfacePath = path.join(__dirname, '..', 'src', 'utils', 'imagePlaceholders.ts');
    
    fs.writeFileSync(interfacePath, interfaceContent);
    console.log(`TypeScript-Interface generiert: ${interfacePath}`);
    
    // Generiere Beispielkomponente
    const exampleComponentContent = generateExampleComponent();
    const exampleComponentPath = path.join(__dirname, '..', 'src', 'components', 'examples', 'LqipExample.tsx');
    
    fs.writeFileSync(exampleComponentPath, exampleComponentContent);
    console.log(`Beispielkomponente generiert: ${exampleComponentPath}`);
    
    console.log('\n=== Nächste Schritte ===');
    console.log('1. Installieren Sie sharp, falls noch nicht geschehen: npm install sharp');
    console.log('2. Führen Sie das Skript aus: node scripts/generate-lqip-placeholders.js');
    console.log('3. Importieren Sie die imagePlaceholders in Ihren Komponenten:');
    console.log('   import { imagePlaceholders } from "../../utils/imagePlaceholders";');
    console.log('4. Verwenden Sie die OptimizedImage-Komponente mit den Platzhaltern:');
    console.log('   const imageData = imagePlaceholders["key_des_bildes"];');
    console.log('   <OptimizedImage');
    console.log('     sources={{');
    console.log('       original: imageData.original,');
    console.log('       webp: imageData.original.replace(/\\.(jpg|jpeg|png)$/i, ".webp"),');
    console.log('       placeholder: imageData.placeholder,');
    console.log('       width: imageData.width,');
    console.log('       height: imageData.height');
    console.log('     }}');
    console.log('     alt="Beschreibung"');
    console.log('     useLqip={true}');
    console.log('   />');
  }
}

// Führe das Skript aus
main().catch(error => {
  console.error('Fehler bei der Ausführung des Skripts:', error);
  process.exit(1);
});
