import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/layout/ScrollToTop';
import LoadingSpinner from './components/layout/LoadingSpinner';
import CookieConsent from './components/cookies/CookieConsent';
import { NewsletterProvider } from './contexts/NewsletterContext';
import NewsletterPopup from './components/layout/NewsletterPopup';

// Lazy load all pages to improve initial load time
const HomePage = lazy(() => import('./pages/HomePage'));
const HairTransplantationPage = lazy(() => import('./pages/HairTransplantationPage'));
const BeardTransplantationPage = lazy(() => import('./pages/BeardTransplantationPage'));
const EyebrowTransplantationPage = lazy(() => import('./pages/EyebrowTransplantationPage'));
const HairLossTherapyPage = lazy(() => import('./pages/HairLossTherapyPage'));
const ClinicPage = lazy(() => import('./pages/ClinicPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ImprintPage = lazy(() => import('./pages/ImprintPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const KnowledgePage = lazy(() => import('./pages/KnowledgePage'));
const PricesPage = lazy(() => import('./pages/PricesPage'));

function App() {
  return (
    <Router>
      <CookieConsent>
        <NewsletterProvider webhookUrl="https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTY4MDYzNjA0M2Q1MjY4NTUzMDUxMzQi_pc">
          <ScrollToTop />
          <Layout>
            <Suspense fallback={<LoadingSpinner />}>
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
              <Route path="/wissenswertes" element={<KnowledgePage />} />
              <Route path="/preise" element={<PricesPage />} />
              </Routes>
            </Suspense>
          </Layout>
          <NewsletterPopup />
        </NewsletterProvider>
      </CookieConsent>
    </Router>
  );
}

export default App;
