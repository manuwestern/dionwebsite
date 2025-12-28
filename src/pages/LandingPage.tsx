import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/seo/SEO';
import '../styles/landing.css';
import LPHeroSection from '../components/landing/LPHeroSection';
import LPUSPSection from '../components/landing/LPUSPSection';
import LPBeforeAfterSection from '../components/landing/LPBeforeAfterSection';
import LPProcessSection from '../components/landing/LPProcessSection';
import LPPricingSection from '../components/landing/LPPricingSection';
import LPTestimonialsSection from '../components/landing/LPTestimonialsSection';
import LPFAQSection from '../components/landing/LPFAQSection';
import LPFinalCTASection from '../components/landing/LPFinalCTASection';
import LPWhatsAppButton from '../components/landing/LPWhatsAppButton';

const LandingPage: React.FC = () => {
  const { i18n } = useTranslation();

  // Hide floating buttons on landing page
  useEffect(() => {
    const hideFloatingButtons = () => {
      const floatingButtons = document.querySelector('.floating-buttons');
      if (floatingButtons) {
        (floatingButtons as HTMLElement).style.display = 'none';
      }
    };

    hideFloatingButtons();
    const timeout = setTimeout(hideFloatingButtons, 100);
    const handleLoad = () => hideFloatingButtons();
    window.addEventListener('load', handleLoad);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('load', handleLoad);
      const floatingButtons = document.querySelector('.floating-buttons');
      if (floatingButtons) {
        (floatingButtons as HTMLElement).style.display = 'flex';
      }
    };
  }, []);

  // Track page view
  useEffect(() => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'lp_page_view',
        page: '/lp',
        language: i18n.language
      });
    }
  }, [i18n.language]);

  return (
    <div className="min-h-screen bg-white">
      <SEO namespace="landing" />
      
      {/* Hero Section */}
      <LPHeroSection />
      
      {/* USP Section */}
      <LPUSPSection />
      
      {/* Before/After Section */}
      <LPBeforeAfterSection />
      
      {/* Process Section */}
      <LPProcessSection />
      
      {/* Pricing Section */}
      <LPPricingSection />
      
      {/* Testimonials Section */}
      <LPTestimonialsSection />
      
      {/* FAQ Section */}
      <LPFAQSection />
      
      {/* Final CTA Section */}
      <LPFinalCTASection />
      
      {/* Sticky WhatsApp Button */}
      <LPWhatsAppButton />
    </div>
  );
};

export default LandingPage;