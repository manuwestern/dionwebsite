import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n';
import { initPerformanceMonitoring } from './utils/performance-monitoring';
import { registerServiceWorker } from './utils/service-worker-registration';

// Initialize performance monitoring
if (process.env.NODE_ENV !== 'production') {
  // Only enable in development mode for now
  console.log('Performance monitoring enabled in development mode');
  initPerformanceMonitoring();
} else {
  // Register service worker only in production mode
  registerServiceWorker();
}

// Render the React app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
