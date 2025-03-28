import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import HairTransplantationPage from './pages/HairTransplantationPage';
import BeardTransplantationPage from './pages/BeardTransplantationPage';
import EyebrowTransplantationPage from './pages/EyebrowTransplantationPage';
import HairLossTherapyPage from './pages/HairLossTherapyPage';
import ClinicPage from './pages/ClinicPage';
import ContactPage from './pages/ContactPage';
import ImprintPage from './pages/ImprintPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import CookieConsent from './components/cookies/CookieConsent';

function App() {
  return (
    <CookieConsent>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/haartransplantation" element={<HairTransplantationPage />} />
            <Route path="/barthaartransplantation" element={<BeardTransplantationPage />} />
            <Route path="/augenbrauentransplantation" element={<EyebrowTransplantationPage />} />
            <Route path="/haarausfalltherapie" element={<HairLossTherapyPage />} />
            <Route path="/klinik" element={<ClinicPage />} />
            <Route path="/kontakt" element={<ContactPage />} />
            <Route path="/impressum" element={<ImprintPage />} />
            <Route path="/datenschutz" element={<PrivacyPage />} />
            <Route path="/agb" element={<TermsPage />} />
          </Routes>
        </Layout>
      </Router>
    </CookieConsent>
  );
}

export default App;
