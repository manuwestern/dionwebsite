import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n';
import { initScrollEffects } from './utils/scrollEffects';

// Render the React app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Initialize scroll effects after the app has rendered
// We use a small delay to ensure all components are fully mounted
window.addEventListener('load', () => {
  setTimeout(() => {
    // Target all major sections in the app with a more comprehensive selector
    initScrollEffects('div[class*="py-"], section, [data-section], .bg-gradient-to-b, .bg-gradient-to-tr');
    console.log('Scroll effects initialized');
  }, 1000);
});

// Also try to initialize immediately in case the page is already loaded
setTimeout(() => {
  initScrollEffects('div[class*="py-"], section, [data-section], .bg-gradient-to-b, .bg-gradient-to-tr');
  console.log('Immediate scroll effects initialization attempt');
}, 100);
