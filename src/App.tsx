import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import HairTransplantationPage from './pages/HairTransplantationPage';
import ThemeDesignerPage from './pages/ThemeDesignerPage';
import { ThemeProvider } from './utils/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/haartransplantation" element={<HairTransplantationPage />} />
            <Route path="/theme-designer" element={<ThemeDesignerPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
