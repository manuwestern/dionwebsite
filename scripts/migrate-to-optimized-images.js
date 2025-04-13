/**
 * Skript zur Unterstützung bei der Migration von regulären img-Tags zur OptimizedImage-Komponente
 * 
 * Dieses Skript durchsucht alle TSX-Dateien im src/components-Verzeichnis nach img-Tags
 * und gibt Vorschläge, wie diese in OptimizedImage-Komponenten umgewandelt werden können.
 * 
 * Verwendung:
 * node scripts/migrate-to-optimized-images.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

// __dirname Äquivalent für ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Konfiguration
const componentsDir = path.join(__dirname, '..', 'src', 'components');
const filePattern = '**/*.tsx';
const imgTagRegex = /<img\s+([^>]*)>/g;
const attributeRegex = /(\w+)=(?:["']([^"']*)["']|{([^}]*)})/g;

// Funktion zum Extrahieren von Attributen aus einem img-Tag
function extractAttributes(attributesString) {
  const attributes = {};
  let match;
  
  while ((match = attributeRegex.exec(attributesString)) !== null) {
    const [, name, stringValue, jsValue] = match;
    attributes[name] = jsValue ? `{${jsValue}}` : `"${stringValue}"`;
  }
  
  return attributes;
}

// Funktion zum Generieren des OptimizedImage-Komponenten-Codes
function generateOptimizedImageComponent(attributes) {
  const { src, alt, className, style, width, height, loading, onLoad, onError, ...rest } = attributes;
  
  // Bestimme den Bildtyp basierend auf der Dateiendung
  let srcValue = src;
  if (srcValue.startsWith('"')) {
    srcValue = srcValue.slice(1, -1);
  } else {
    // Es handelt sich um einen JS-Ausdruck
    srcValue = `\${${srcValue.slice(1, -1)}}`;
  }
  
  // Überprüfe, ob es eine WebP-Version gibt
  const isWebP = srcValue.endsWith('.webp');
  const hasWebPVersion = !isWebP && (
    srcValue.endsWith('.png') || 
    srcValue.endsWith('.jpg') || 
    srcValue.endsWith('.jpeg')
  );
  
  let webpSrc = '';
  if (hasWebPVersion) {
    webpSrc = srcValue.replace(/\.(png|jpg|jpeg)$/, '.webp');
  }
  
  // Generiere die sources-Prop
  let sourcesCode = `{
    original: ${src},
    ${hasWebPVersion ? `webp: "${webpSrc}",` : ''}
    ${width ? `width: ${width.replace(/['"{}]/g, '')},` : ''}
    ${height ? `height: ${height.replace(/['"{}]/g, '')},` : ''}
  }`;
  
  // Generiere den OptimizedImage-Komponenten-Code
  return `<OptimizedImage
  sources=${sourcesCode}
  alt=${alt || '""}'}
  ${className ? `className=${className}` : ''}
  ${style ? `style=${style}` : ''}
  ${loading ? `loading=${loading}` : ''}
  ${onLoad ? `onLoad=${onLoad}` : ''}
  ${onError ? `onError=${onError}` : ''}
  ${Object.entries(rest).map(([key, value]) => `${key}=${value}`).join('\n  ')}
/>`;
}

// Funktion zum Scannen einer Datei nach img-Tags
function scanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const matches = [];
    let match;
    
    while ((match = imgTagRegex.exec(content)) !== null) {
      const [fullMatch, attributesString] = match;
      const attributes = extractAttributes(attributesString);
      
      matches.push({
        fullMatch,
        attributes,
        position: match.index,
        optimizedComponent: generateOptimizedImageComponent(attributes)
      });
    }
    
    return matches;
  } catch (error) {
    console.error(`Fehler beim Scannen von ${filePath}:`, error);
    return [];
  }
}

// Hauptfunktion
function main() {
  // Finde alle TSX-Dateien im components-Verzeichnis
  const files = glob.sync(path.join(componentsDir, filePattern));
  
  let totalImgTags = 0;
  const results = [];
  
  // Scanne jede Datei nach img-Tags
  files.forEach(file => {
    const matches = scanFile(file);
    totalImgTags += matches.length;
    
    if (matches.length > 0) {
      results.push({
        file: path.relative(process.cwd(), file),
        matches
      });
    }
  });
  
  // Ausgabe der Ergebnisse
  console.log(`\n=== Migrationshilfe für OptimizedImage ===\n`);
  console.log(`Gefunden: ${totalImgTags} img-Tags in ${results.length} Dateien\n`);
  
  results.forEach(({ file, matches }) => {
    console.log(`\nDatei: ${file} (${matches.length} img-Tags)`);
    console.log('-'.repeat(80));
    
    matches.forEach((match, index) => {
      console.log(`\n[${index + 1}] Original img-Tag:`);
      console.log(match.fullMatch);
      
      console.log(`\nVorgeschlagene OptimizedImage-Komponente:`);
      console.log(match.optimizedComponent);
      
      console.log('\nErforderliche Änderungen:');
      console.log('1. Importieren Sie die OptimizedImage-Komponente:');
      console.log('   import OptimizedImage from "../common/OptimizedImage";');
      
      if (!match.attributes.width || !match.attributes.height) {
        console.log('2. Fügen Sie width und height Attribute hinzu, um CLS zu vermeiden');
      }
      
      if (!match.attributes.src.includes('.webp')) {
        console.log('3. Stellen Sie sicher, dass WebP-Versionen der Bilder verfügbar sind');
      }
      
      console.log('-'.repeat(40));
    });
  });
  
  console.log('\n=== Empfehlungen für die Migration ===');
  console.log('1. Beginnen Sie mit den wichtigsten Bildern (Hero-Bilder, Above-the-fold-Inhalte)');
  console.log('2. Fügen Sie width und height Attribute zu allen Bildern hinzu, um CLS zu vermeiden');
  console.log('3. Generieren Sie LQIP-Platzhalter für wichtige Bilder mit der generatePlaceholder-Funktion');
  console.log('4. Verwenden Sie das useLqip-Flag für Bilder, die einen Platzhalter haben');
  console.log('5. Testen Sie die Seite nach jeder Änderung, um sicherzustellen, dass alles korrekt angezeigt wird');
}

// Führe das Skript aus
main();
