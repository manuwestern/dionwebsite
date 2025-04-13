/**
 * Skript zur Generierung von PWA-Icons aus dem Logo
 * 
 * Dieses Skript generiert verschiedene Größen von Icons für die Progressive Web App (PWA)
 * aus dem Logo der Dion Hair Clinic.
 * 
 * Verwendung:
 * 
 * 
 * 
 * Benötigte Abhängigkeiten:
 * - sharp: npm install sharp
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

// __dirname Äquivalent für ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Konfiguration
const logoPath = path.join(__dirname, '..', 'public', 'images', 'DionHairClinic_Logo.svg');
const outputDir = path.join(__dirname, '..', 'public', 'images', 'icons');
const backgroundColor = '#ffffff'; // Hintergrundfarbe für die Icons
const themeColor = '#7BA7C2'; // Themenfarbe der App
const paddingPercent = 30; // Padding in Prozent, um zu verhindern, dass das Logo an den Rändern abgeschnitten wird

// Funktion zum Entfernen des Hintergrunds aus dem SVG
async function removeSvgBackground(inputPath) {
  try {
    // Erstelle ein temporäres SVG ohne Hintergrund
    const tempPath = path.join(path.dirname(inputPath), 'temp_logo.svg');
    
    // Lese das SVG
    const svgContent = fs.readFileSync(inputPath, 'utf8');
    
    // Entferne Hintergrund-Elemente oder setze sie auf transparent
    // Dies ist eine vereinfachte Version und könnte je nach SVG-Struktur angepasst werden müssen
    const modifiedSvg = svgContent
      .replace(/fill="#f5f5f5"/g, 'fill="transparent"')
      .replace(/fill="#F5F5F5"/g, 'fill="transparent"')
      .replace(/fill="#e0e0e0"/g, 'fill="transparent"')
      .replace(/fill="#E0E0E0"/g, 'fill="transparent"')
      .replace(/fill="#eeeeee"/g, 'fill="transparent"')
      .replace(/fill="#EEEEEE"/g, 'fill="transparent"')
      .replace(/fill="#fafafa"/g, 'fill="transparent"')
      .replace(/fill="#FAFAFA"/g, 'fill="transparent"')
      .replace(/background-color:[^;]+;/g, 'background-color: transparent;')
      .replace(/<rect[^>]*fill="[^"]*"[^>]*>/g, (match) => {
        // Ersetze die Füllfarbe von Rechtecken, die wahrscheinlich Hintergründe sind
        return match.replace(/fill="[^"]*"/, 'fill="transparent"');
      });
    
    // Schreibe das modifizierte SVG
    fs.writeFileSync(tempPath, modifiedSvg);
    
    return tempPath;
  } catch (error) {
    console.error('Fehler beim Entfernen des Hintergrunds aus dem SVG:', error);
    return inputPath; // Fallback zum Original-Logo
  }
}

// Icon-Größen für verschiedene Plattformen
const iconSizes = [
  72, 96, 128, 144, 152, 192, 384, 512, // Standard PWA-Icons
  180 // Apple Touch Icon
];

// Stelle sicher, dass das Ausgabeverzeichnis existiert
function ensureOutputDirExists() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`Verzeichnis erstellt: ${outputDir}`);
  }
}

// Generiere ein Icon in einer bestimmten Größe
async function generateIcon(size) {
  try {
    // Berechne die tatsächliche Größe des Logos mit Padding
    const logoSize = Math.round(size * (1 - paddingPercent / 100));
    const padding = Math.round((size - logoSize) / 2);
    
    // Für SVG-Logos
    if (logoPath.endsWith('.svg')) {
      // Entferne den Hintergrund aus dem SVG
      const cleanLogoPath = await removeSvgBackground(logoPath);
      
      // Extrahiere die Metadaten des SVG, um das Seitenverhältnis zu erhalten
      const metadata = await sharp(cleanLogoPath).metadata();
      
      // Berechne die Größe unter Berücksichtigung des Seitenverhältnisses
      let resizeOptions = {};
      
      if (metadata.width && metadata.height) {
        const aspectRatio = metadata.width / metadata.height;
        
        if (aspectRatio > 1) {
          // Breiter als hoch
          resizeOptions = {
            width: logoSize,
            height: Math.round(logoSize / aspectRatio),
            fit: 'contain',
            background: backgroundColor
          };
        } else {
          // Höher als breit oder quadratisch
          resizeOptions = {
            width: Math.round(logoSize * aspectRatio),
            height: logoSize,
            fit: 'contain',
            background: backgroundColor
          };
        }
      } else {
        // Fallback, wenn keine Metadaten verfügbar sind
        resizeOptions = {
          width: logoSize,
          height: logoSize,
          fit: 'contain',
          background: backgroundColor
        };
      }
      
      await sharp(cleanLogoPath)
        .resize(resizeOptions)
        .extend({
          top: padding,
          bottom: padding,
          left: padding,
          right: padding,
          background: backgroundColor
        })
        .png()
        .toFile(path.join(outputDir, `icon-${size}x${size}.png`));
      
      // Lösche die temporäre Datei, wenn sie erstellt wurde
      if (cleanLogoPath !== logoPath && fs.existsSync(cleanLogoPath)) {
        fs.unlinkSync(cleanLogoPath);
      }
    } 
    // Für PNG/JPG-Logos
    else {
      // Extrahiere die Metadaten des Bildes, um das Seitenverhältnis zu erhalten
      const metadata = await sharp(logoPath).metadata();
      
      // Berechne die Größe unter Berücksichtigung des Seitenverhältnisses
      let resizeOptions = {};
      
      if (metadata.width && metadata.height) {
        const aspectRatio = metadata.width / metadata.height;
        
        if (aspectRatio > 1) {
          // Breiter als hoch
          resizeOptions = {
            width: logoSize,
            height: Math.round(logoSize / aspectRatio),
            fit: 'contain',
            background: backgroundColor
          };
        } else {
          // Höher als breit oder quadratisch
          resizeOptions = {
            width: Math.round(logoSize * aspectRatio),
            height: logoSize,
            fit: 'contain',
            background: backgroundColor
          };
        }
      } else {
        // Fallback, wenn keine Metadaten verfügbar sind
        resizeOptions = {
          width: logoSize,
          height: logoSize,
          fit: 'contain',
          background: backgroundColor
        };
      }
      
      await sharp(logoPath)
        .resize(resizeOptions)
        .extend({
          top: padding,
          bottom: padding,
          left: padding,
          right: padding,
          background: backgroundColor
        })
        .toFile(path.join(outputDir, `icon-${size}x${size}.png`));
    }
    
    console.log(`Icon generiert: ${size}x${size}px (Logo: ${logoSize}x${logoSize}px mit ${padding}px Padding)`);
    return true;
  } catch (error) {
    console.error(`Fehler bei der Generierung des Icons ${size}x${size}px:`, error);
    return false;
  }
}

// Generiere ein Apple Touch Icon
async function generateAppleIcon(size) {
  try {
    // Berechne die tatsächliche Größe des Logos mit Padding
    const logoSize = Math.round(size * (1 - paddingPercent / 100));
    const padding = Math.round((size - logoSize) / 2);
    
    // Für SVG-Logos
    if (logoPath.endsWith('.svg')) {
      // Entferne den Hintergrund aus dem SVG
      const cleanLogoPath = await removeSvgBackground(logoPath);
      
      // Extrahiere die Metadaten des SVG, um das Seitenverhältnis zu erhalten
      const metadata = await sharp(cleanLogoPath).metadata();
      
      // Berechne die Größe unter Berücksichtigung des Seitenverhältnisses
      let resizeOptions = {};
      
      if (metadata.width && metadata.height) {
        const aspectRatio = metadata.width / metadata.height;
        
        if (aspectRatio > 1) {
          // Breiter als hoch
          resizeOptions = {
            width: logoSize,
            height: Math.round(logoSize / aspectRatio),
            fit: 'contain',
            background: backgroundColor
          };
        } else {
          // Höher als breit oder quadratisch
          resizeOptions = {
            width: Math.round(logoSize * aspectRatio),
            height: logoSize,
            fit: 'contain',
            background: backgroundColor
          };
        }
      } else {
        // Fallback, wenn keine Metadaten verfügbar sind
        resizeOptions = {
          width: logoSize,
          height: logoSize,
          fit: 'contain',
          background: backgroundColor
        };
      }
      
      await sharp(cleanLogoPath)
        .resize(resizeOptions)
        .extend({
          top: padding,
          bottom: padding,
          left: padding,
          right: padding,
          background: backgroundColor
        })
        .png()
        .toFile(path.join(outputDir, `apple-icon-${size}x${size}.png`));
      
      // Lösche die temporäre Datei, wenn sie erstellt wurde
      if (cleanLogoPath !== logoPath && fs.existsSync(cleanLogoPath)) {
        fs.unlinkSync(cleanLogoPath);
      }
    } 
    // Für PNG/JPG-Logos
    else {
      // Extrahiere die Metadaten des Bildes, um das Seitenverhältnis zu erhalten
      const metadata = await sharp(logoPath).metadata();
      
      // Berechne die Größe unter Berücksichtigung des Seitenverhältnisses
      let resizeOptions = {};
      
      if (metadata.width && metadata.height) {
        const aspectRatio = metadata.width / metadata.height;
        
        if (aspectRatio > 1) {
          // Breiter als hoch
          resizeOptions = {
            width: logoSize,
            height: Math.round(logoSize / aspectRatio),
            fit: 'contain',
            background: backgroundColor
          };
        } else {
          // Höher als breit oder quadratisch
          resizeOptions = {
            width: Math.round(logoSize * aspectRatio),
            height: logoSize,
            fit: 'contain',
            background: backgroundColor
          };
        }
      } else {
        // Fallback, wenn keine Metadaten verfügbar sind
        resizeOptions = {
          width: logoSize,
          height: logoSize,
          fit: 'contain',
          background: backgroundColor
        };
      }
      
      await sharp(logoPath)
        .resize(resizeOptions)
        .extend({
          top: padding,
          bottom: padding,
          left: padding,
          right: padding,
          background: backgroundColor
        })
        .toFile(path.join(outputDir, `apple-icon-${size}x${size}.png`));
    }
    
    console.log(`Apple Touch Icon generiert: ${size}x${size}px (Logo: ${logoSize}x${logoSize}px mit ${padding}px Padding)`);
    return true;
  } catch (error) {
    console.error(`Fehler bei der Generierung des Apple Touch Icons ${size}x${size}px:`, error);
    return false;
  }
}

// Generiere Favicon-Dateien
async function generateFavicons() {
  try {
    // Entferne den Hintergrund aus dem SVG
    const cleanLogoPath = await removeSvgBackground(logoPath);
    
    // Extrahiere die Metadaten des Logos, um das Seitenverhältnis zu erhalten
    const metadata = await sharp(cleanLogoPath).metadata();
    const aspectRatio = metadata.width && metadata.height ? metadata.width / metadata.height : 1;
    
    // Favicon 16x16
    const logoSize16 = Math.round(16 * (1 - paddingPercent / 100));
    const padding16 = Math.round((16 - logoSize16) / 2);
    
    let resizeOptions16 = {};
    if (aspectRatio > 1) {
      resizeOptions16 = {
        width: logoSize16,
        height: Math.round(logoSize16 / aspectRatio),
        fit: 'contain',
        background: backgroundColor
      };
    } else {
      resizeOptions16 = {
        width: Math.round(logoSize16 * aspectRatio),
        height: logoSize16,
        fit: 'contain',
        background: backgroundColor
      };
    }
    
    await sharp(cleanLogoPath)
      .resize(resizeOptions16)
      .extend({
        top: padding16,
        bottom: padding16,
        left: padding16,
        right: padding16,
        background: backgroundColor
      })
      .png()
      .toFile(path.join(outputDir, 'favicon-16x16.png'));
    
    // Favicon 32x32
    const logoSize32 = Math.round(32 * (1 - paddingPercent / 100));
    const padding32 = Math.round((32 - logoSize32) / 2);
    
    let resizeOptions32 = {};
    if (aspectRatio > 1) {
      resizeOptions32 = {
        width: logoSize32,
        height: Math.round(logoSize32 / aspectRatio),
        fit: 'contain',
        background: backgroundColor
      };
    } else {
      resizeOptions32 = {
        width: Math.round(logoSize32 * aspectRatio),
        height: logoSize32,
        fit: 'contain',
        background: backgroundColor
      };
    }
    
    await sharp(cleanLogoPath)
      .resize(resizeOptions32)
      .extend({
        top: padding32,
        bottom: padding32,
        left: padding32,
        right: padding32,
        background: backgroundColor
      })
      .png()
      .toFile(path.join(outputDir, 'favicon-32x32.png'));
    
    // Favicon 48x48
    const logoSize48 = Math.round(48 * (1 - paddingPercent / 100));
    const padding48 = Math.round((48 - logoSize48) / 2);
    
    let resizeOptions48 = {};
    if (aspectRatio > 1) {
      resizeOptions48 = {
        width: logoSize48,
        height: Math.round(logoSize48 / aspectRatio),
        fit: 'contain',
        background: backgroundColor
      };
    } else {
      resizeOptions48 = {
        width: Math.round(logoSize48 * aspectRatio),
        height: logoSize48,
        fit: 'contain',
        background: backgroundColor
      };
    }
    
    await sharp(cleanLogoPath)
      .resize(resizeOptions48)
      .extend({
        top: padding48,
        bottom: padding48,
        left: padding48,
        right: padding48,
        background: backgroundColor
      })
      .png()
      .toFile(path.join(outputDir, 'favicon-48x48.png'));
    
    // Lösche die temporäre Datei, wenn sie erstellt wurde
    if (cleanLogoPath !== logoPath && fs.existsSync(cleanLogoPath)) {
      fs.unlinkSync(cleanLogoPath);
    }
    
    console.log(`Favicons generiert mit ${paddingPercent}% Padding`);
    return true;
  } catch (error) {
    console.error('Fehler bei der Generierung der Favicons:', error);
    return false;
  }
}

// Hauptfunktion
async function main() {
  console.log('\n=== PWA-Icon-Generator ===\n');
  
  // Stelle sicher, dass das Ausgabeverzeichnis existiert
  ensureOutputDirExists();
  
  // Prüfe, ob die Logo-Datei existiert
  if (!fs.existsSync(logoPath)) {
    console.error(`Logo-Datei nicht gefunden: ${logoPath}`);
    console.log('\nBitte stellen Sie sicher, dass die Logo-Datei existiert und der Pfad korrekt ist.');
    return;
  }
  
  // Generiere Icons in verschiedenen Größen
  let successCount = 0;
  let errorCount = 0;
  
  for (const size of iconSizes) {
    if (size === 180) {
      // Generiere Apple Touch Icon
      const success = await generateAppleIcon(size);
      if (success) successCount++; else errorCount++;
    } else {
      // Generiere Standard-Icon
      const success = await generateIcon(size);
      if (success) successCount++; else errorCount++;
    }
  }
  
  // Generiere Favicons
  const faviconSuccess = await generateFavicons();
  if (faviconSuccess) successCount += 3; else errorCount += 3;
  
  console.log(`\nErgebnis: ${successCount} Icons generiert, ${errorCount} Fehler\n`);
  
  // Hinweise zur Verwendung der Icons
  console.log('=== Nächste Schritte ===');
  console.log('1. Überprüfen Sie die generierten Icons im Verzeichnis:');
  console.log(`   ${outputDir}`);
  console.log('2. Stellen Sie sicher, dass die Icons im Web App Manifest korrekt referenziert werden:');
  console.log('   - Überprüfen Sie die Pfade in der Datei public/manifest.json');
  console.log('3. Stellen Sie sicher, dass das Apple Touch Icon in der index.html verlinkt ist:');
  console.log('   <link rel="apple-touch-icon" href="/images/icons/apple-icon-180x180.png">');
  console.log('4. Testen Sie die PWA-Funktionalität in verschiedenen Browsern');
}

// Führe das Skript aus
main().catch(error => {
  console.error('Fehler bei der Ausführung des Skripts:', error);
  process.exit(1);
});
