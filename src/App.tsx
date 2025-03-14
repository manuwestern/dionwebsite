import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import HairTransplantationPage from './pages/HairTransplantationPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/haartransplantation" element={<HairTransplantationPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
