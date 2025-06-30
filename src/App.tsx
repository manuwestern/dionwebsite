import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { trackPageView } from './utils/gtm';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/layout/ScrollToTop';
import LoadingSpinner from './components/layout/LoadingSpinner';
import CookieConsent from './components/cookies/CookieConsent';
import { NewsletterProvider } from './contexts/NewsletterContext';
import { SummerPromotionProvider, useSummerPromotion } from './contexts/SummerPromotionContext';
import PromotionPopup from './components/layout/PromotionPopup';
// Newsletter popup temporarily disabled for summer promotion
// import NewsletterPopup from './components/layout/NewsletterPopup';
import ErrorBoundary from './components/common/elements/ErrorBoundary';
import NotFoundPage from './pages/NotFoundPage';

// Simple component for the promotion popup
// This component will show the popup only on specific pages
const PromotionPopupContainer: React.FC = () => {
  const location = useLocation();
  const [isClosing, setIsClosing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  
  console.log('PromotionPopupContainer - Current location:', location.pathname);
  
  // Function to close the popup
  const closePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowPopup(false);
      setIsClosing(false);
    }, 300);
  };
  
  // Check if we should show the popup based on the current path
  useEffect(() => {
    // Only show popup on homepage, hair transplantation and eyebrow transplantation pages
    // Exclude Instagram landing page from showing popups
    const allowedPaths = ['/', '/haartransplantation', '/augenbrauentransplantation'];
    const shouldShowPopup = allowedPaths.some(path => 
      path === '/' ? location.pathname === '/' : location.pathname.includes(path)
    );
    
    // Don't show popup on Instagram landing page
    if (location.pathname === '/ig' || !shouldShowPopup) {
      setShowPopup(false);
      return;
    }
    
    // Show popup after 3 seconds on allowed pages
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  // Determine which config to use based on the current path
  const config = location.pathname.includes('augenbrauentransplantation')
    ? {
        treatmentType: 'eyebrow' as 'eyebrow',
        title: 'Sommeraktion',
        subtitle: 'Limitiertes Angebot zur Augenbrauentransplantation',
        originalPrice: 1699,
        discountPrice: 1499,
        benefits: [
          'Natürlich aussehende, dichte Augenbrauen'
        ],
        therapyCount: 2,
        therapyValue: 500,
        testimonial: {
          text: 'Meine Augenbrauentransplantation bei Dion Hair Clinic hat mein Gesicht komplett verändert. Ich bin begeistert von dem natürlichen Ergebnis!',
          author: 'Sandra L., zufriedene Patientin'
        },
        whatsAppMessage: 'Hallo, ich interessiere mich für das Sommerangebot (Augenbrauentransplantation für 1499€).'
      }
    : {
        treatmentType: 'hair' as 'hair',
        title: 'Sommeraktion',
        subtitle: 'Limitiertes Angebot zur Haartransplantation',
        originalPrice: 2999,
        discountPrice: 2499,
        benefits: [
          'Maximale Anzahl an Grafts inklusive'
        ],
        therapyCount: 3,
        therapyValue: 750,
        testimonial: {
          text: 'Die Haartransplantation bei Dion Hair Clinic war die beste Entscheidung. Das Ergebnis übertrifft alle meine Erwartungen!',
          author: 'Michael K., zufriedener Patient'
        },
        whatsAppMessage: 'Hallo, ich interessiere mich für das Sommerangebot (Haartransplantation für 2499€).'
      };
  
  if (!showPopup) {
    return null;
  }
  
  return <PromotionPopup config={config} showPopup={showPopup} isClosing={isClosing} closePopup={closePopup} />;
};

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
const LocalLandingPage = lazy(() => import('./pages/LocalLandingPage'));
const CheapHairTransplantPage = lazy(() => import('./pages/CheapHairTransplantPage'));
const InstagramLandingPage = lazy(() => import('./pages/InstagramLandingPage'));

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

// Instagram Landing Page Layout - No header/footer
const InstagramLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
};

// Memoize the App component to prevent unnecessary re-renders
const App: React.FC = React.memo(() => {
  return (
    <ErrorBoundary>
      <Router>
        <RouteTracker />
        <CookieConsent>
          <NewsletterProvider webhookUrl="https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTY4MDYzNjA0M2Q1MjY4NTUzMDUxMzQi_pc">
            <SummerPromotionProvider>
              <ScrollToTop />
              <Routes>
                {/* Instagram Landing Page - No Layout (no header/footer) */}
                <Route 
                  path="/ig" 
                  element={
                    <InstagramLayout>
                      <Suspense fallback={<LoadingSpinner />}>
                        <InstagramLandingPage />
                      </Suspense>
                    </InstagramLayout>
                  } 
                />
                
                {/* All other pages with normal Layout */}
                <Route path="/*" element={
                  <Layout>
                    <Suspense fallback={<LoadingSpinner />}>
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/haartransplantation" element={<HairTransplantationPage />} />
                        <Route path="/guenstige-haartransplantation" element={<CheapHairTransplantPage />} />
                        <Route path="/haartransplantation-:city" element={<LocalLandingPage />} />
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
                } />
              </Routes>
              <PromotionPopupContainer />
            </SummerPromotionProvider>
          </NewsletterProvider>
        </CookieConsent>
      </Router>
    </ErrorBoundary>
  );
});

// Set display name for debugging
App.displayName = 'App';

export default App;
