import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { trackPageView } from './utils/gtm';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/layout/ScrollToTop';
import LoadingSpinner from './components/layout/LoadingSpinner';
import CookieConsent from './components/cookies/CookieConsent';
import { NewsletterProvider } from './contexts/NewsletterContext';
import { SpringPromotionProvider } from './contexts/SpringPromotionContext';
import SpringPromotionPopup from './components/layout/SpringPromotionPopup';
// Newsletter popup temporarily disabled for spring promotion
// import NewsletterPopup from './components/layout/NewsletterPopup';
import ErrorBoundary from './components/common/elements/ErrorBoundary';
import NotFoundPage from './pages/NotFoundPage';

// Lazy load all pages to improve initial load time
const HomePage = lazy(() => import('./pages/HomePage'));
const HairTransplantationPage = lazy(() => import('./pages/HairTransplantationPage'));
const BeardTransplantationPage = lazy(() => import('./pages/BeardTransplantationPage'));
const EyebrowTransplantationPage = lazy(() => import('./pages/EyebrowTransplantationPage'));
// HairLossTherapyPage removed due to Google Ads guidelines violation
// const HairLossTherapyPage = lazy(() => import('./pages/HairLossTherapyPage'));
const ClinicPage = lazy(() => import('./pages/ClinicPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ImprintPage = lazy(() => import('./pages/ImprintPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const KnowledgePage = lazy(() => import('./pages/KnowledgePage'));
const PricesPage = lazy(() => import('./pages/PricesPage'));

// Component to track route changes
const RouteTracker: React.FC = () => {
  const location = useLocation();
  
  // Track page views on route change
  useEffect(() => {
    const path = location.pathname + location.search;
    const title = document.title;
    trackPageView(path, title);
  }, [location]);
  
  return null;
};

// Memoize the App component to prevent unnecessary re-renders
const App: React.FC = React.memo(() => {
  return (
    <ErrorBoundary>
      <Router>
        <RouteTracker />
        <CookieConsent>
          <NewsletterProvider webhookUrl="https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTY4MDYzNjA0M2Q1MjY4NTUzMDUxMzQi_pc">
            <SpringPromotionProvider>
              <ScrollToTop />
              <Layout>
                <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/haartransplantation" element={<HairTransplantationPage />} />
                  <Route path="/barthaartransplantation" element={<BeardTransplantationPage />} />
                  <Route path="/augenbrauentransplantation" element={<EyebrowTransplantationPage />} />
                  {/* Route for HairLossTherapyPage removed due to Google Ads guidelines violation */}
                  {/* <Route path="/haarausfalltherapie" element={<HairLossTherapyPage />} /> */}
                  <Route path="/klinik" element={<ClinicPage />} />
                  <Route path="/kontakt" element={<ContactPage />} />
                  <Route path="/impressum" element={<ImprintPage />} />
                  <Route path="/datenschutz" element={<PrivacyPage />} />
                  <Route path="/agb" element={<TermsPage />} />
                  <Route path="/wissenswertes" element={<KnowledgePage />} />
                  <Route path="/preise" element={<PricesPage />} />
                  {/* Fallback-Route für 404-Fehler - zeigt die NotFoundPage an */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
                </Suspense>
              </Layout>
              <SpringPromotionPopup />
            </SpringPromotionProvider>
          </NewsletterProvider>
        </CookieConsent>
      </Router>
    </ErrorBoundary>
  );
});

// Set display name for debugging
App.displayName = 'App';

export default App;
