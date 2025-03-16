import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import HairTransplantationPage from './pages/HairTransplantationPage';
import { initScrollEffects } from './utils/scrollEffects';

// Component to handle route changes and reinitialize scroll effects
const ScrollEffectsHandler = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Reinitialize scroll effects when the route changes
    setTimeout(() => {
      initScrollEffects('div[class*="py-"], section, [data-section], .bg-gradient-to-b, .bg-gradient-to-tr');
      console.log('Scroll effects reinitialized after navigation');
    }, 100);
  }, [location.pathname]);
  
  return null;
};

function App() {
  return (
    <Router>
      <Layout>
        <ScrollEffectsHandler />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/haartransplantation" element={<HairTransplantationPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
