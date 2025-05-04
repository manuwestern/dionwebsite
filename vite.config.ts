import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // PWA Plugin für Progressive Web App Unterstützung
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'robots.txt',
        'sitemap.xml',
        'apple-touch-icon.png',
        'images/*.svg',
        'images/*.webp',
        'fonts/**/*.woff2'
      ],
      manifest: {
        name: 'Dion Hair Clinic',
        short_name: 'Dion Clinic',
        description: 'Spezialisierte Haarklinik für Haartransplantationen und Haarausfallbehandlungen',
        theme_color: '#7BA7C2',
        icons: [
          {
            src: '/images/DionHairClinic_Logo.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2,xml}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 Jahr
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/connect\.pabbly\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 // 1 Tag
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    }),
    // Bundle-Analyse-Tool (nur im Produktionsmodus)
    process.env.ANALYZE === 'true' && visualizer({
      open: true,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true
    })
  ],
  // Abhängigkeiten optimieren
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'i18next', 'react-i18next'],
    exclude: ['lucide-react'],
  },
  // Build-Optimierungen
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    // Ensure sitemap.xml is copied to the root
    copyPublicDir: true,
    // Verbesserte Chunk-Splitting-Strategie
    rollupOptions: {
      output: {
        manualChunks: {
          // Zusammengefasste Vendor-Chunks für bessere Performance
          'vendor': ['react', 'react-dom', 'react-router-dom', 'i18next', 'react-i18next', 'lucide-react', 'react-helmet']
        },
        // Chunk-Größe optimieren
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    // Kompression aktivieren, aber Konsolenausgaben nur im Produktionsmodus entfernen
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: process.env.NODE_ENV === 'production',
        drop_debugger: process.env.NODE_ENV === 'production'
      }
    },
    // CSS-Optimierungen
    cssCodeSplit: true,
    // Source Maps nur im Entwicklungsmodus
    sourcemap: process.env.NODE_ENV !== 'production'
  },
  // Entwicklungsserver-Konfiguration
  server: {
    port: 3000,
    strictPort: true,
    open: true,
    cors: true
  },
  // Vorschau-Server-Konfiguration
  preview: {
    port: 4173,
    strictPort: true,
    open: true
  }
});
