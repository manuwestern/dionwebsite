import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n';
import { initPerformanceMonitoring, measureTTFB, measureLCP } from './utils/performance-monitoring';

// Initialize performance monitoring
if (process.env.NODE_ENV === 'development') {
  // Only enable in development mode
  console.log('Performance monitoring enabled in development mode');
  // Use setTimeout to ensure it doesn't block rendering
  setTimeout(() => {
    initPerformanceMonitoring();
  }, 0);
} else {
  // In production, only measure critical metrics
  // Only measure TTFB and LCP in production to minimize overhead
  setTimeout(() => {
    measureTTFB();
    measureLCP();
  }, 0);
}

// Render the React app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
