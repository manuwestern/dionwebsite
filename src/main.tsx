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
    // Target all major sections in the app
    initScrollEffects('.py-8, .py-16, .py-20, .py-24, section, [data-section]');
    console.log('Scroll effects initialized');
  }, 500);
});
