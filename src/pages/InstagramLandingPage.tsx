import React, { useEffect } from 'react';
import InstagramHeroSection from '../components/instagram/InstagramHeroSection';
import InstagramTreatmentOffers from '../components/instagram/InstagramTreatmentOffers';
import InstagramWhyChooseUs from '../components/instagram/InstagramWhyChooseUs';
import InstagramBeforeAfter from '../components/instagram/InstagramBeforeAfter';
import InstagramTestimonial from '../components/instagram/InstagramTestimonial';
import InstagramFinalCTA from '../components/instagram/InstagramFinalCTA';

const InstagramLandingPage: React.FC = () => {

  // Hide floating buttons on Instagram landing page
  useEffect(() => {
    const hideFloatingButtons = () => {
      const floatingButtons = document.querySelector('.floating-buttons');
      if (floatingButtons) {
        (floatingButtons as HTMLElement).style.display = 'none';
      }
    };

    // Try immediately
    hideFloatingButtons();

    // Try again after a short delay to ensure DOM is loaded
    const timeout = setTimeout(hideFloatingButtons, 100);

    // Try again after page load
    const handleLoad = () => hideFloatingButtons();
    window.addEventListener('load', handleLoad);

    // Cleanup: show buttons again when component unmounts
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('load', handleLoad);
      const floatingButtons = document.querySelector('.floating-buttons');
      if (floatingButtons) {
        (floatingButtons as HTMLElement).style.display = 'flex';
      }
    };
  }, []);

  const handleWhatsAppContact = (message: string) => {
    // GTM tracking
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_contact',
        eventCategory: 'Contact',
        eventAction: 'WhatsApp Click',
        eventLabel: 'Instagram Landing Page'
      });
    }
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/+491702637818?text=${encodedMessage}`, '_blank');
  };

  const handleCallContact = () => {
    // GTM tracking
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'phone_contact',
        eventCategory: 'Contact',
        eventAction: 'Phone Click',
        eventLabel: 'Instagram Landing Page'
      });
    }
    
    window.open('tel:+4921612963017', '_self');
  };

  return (
    <div className="min-h-screen bg-white">
      <InstagramHeroSection 
        onWhatsAppContact={handleWhatsAppContact}
        onCallContact={handleCallContact}
      />
      
      <InstagramTreatmentOffers 
        onWhatsAppContact={handleWhatsAppContact}
      />
      
      <InstagramWhyChooseUs />
      
      <InstagramBeforeAfter />
      
      <InstagramTestimonial />
      
      <InstagramFinalCTA 
        onWhatsAppContact={handleWhatsAppContact}
        onCallContact={handleCallContact}
      />
    </div>
  );
};

export default InstagramLandingPage;
