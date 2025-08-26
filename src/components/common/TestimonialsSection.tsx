import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Star, Quote, ChevronLeft, ChevronRight, Eye, Info, MessageCircle } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, tracking, lineHeight } from '../../utils/typography';
import OptimizedImage from './elements/OptimizedImage';
import CTASection from './elements/CTASection';

interface Testimonial {
  name: string;
  rating: number;
  text: string;
  procedure: string;
  date: string;
}

interface Stat {
  value: string;
  label: string;
}

interface BeforeAfterPair {
  before: string;
  after: string;
  beforeAlt?: string;
  afterAlt?: string;
}

interface TestimonialsSectionComponentProps {
  translationNamespace: string;
  beforeAfterPairs: BeforeAfterPair[];
  ctaLink?: string;
  beforeLabel?: string;
  afterLabel?: string;
  showTestimonials?: boolean;
  requiresUnlock?: boolean;
}

const TestimonialsSectionComponent: React.FC<TestimonialsSectionComponentProps> = ({
  translationNamespace,
  beforeAfterPairs,
  ctaLink = '/kontakt',
  beforeLabel,
  afterLabel,
  showTestimonials = false,
  requiresUnlock = true
}) => {
  const { t } = useTranslation([translationNamespace, 'common']);
  const [activeBeforeAfter, setActiveBeforeAfter] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoverStat, setHoverStat] = useState<number | null>(null);

  // Trigger entrance animations
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-rotate testimonials if they are shown
  useEffect(() => {
    if (showTestimonials && testimonials.length > 0) {
      const interval = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [showTestimonials]);

  // Get testimonials from translation if they are shown
  const testimonials: Testimonial[] = showTestimonials 
    ? (t('testimonialsSection.testimonials', { returnObjects: true }) as any[]).map(
        (testimonial: any) => ({
          name: testimonial.name,
          rating: testimonial.rating,
          text: testimonial.text,
          procedure: testimonial.procedure,
          date: testimonial.date
        })
      )
    : [];

  // Get stats from translation if they are shown
  const stats: Stat[] = showTestimonials
    ? (t('testimonialsSection.stats', { returnObjects: true }) as any[]).map(
        (stat: any) => ({
          value: stat.value,
          label: stat.label
        })
      )
    : [];

  const nextBeforeAfter = () => {
    setActiveBeforeAfter((prev) => (prev + 1) % beforeAfterPairs.length);
  };

  const prevBeforeAfter = () => {
    setActiveBeforeAfter((prev) => (prev - 1 + beforeAfterPairs.length) % beforeAfterPairs.length);
  };

  // Get labels with fallbacks
  const beforeLabelText = beforeLabel || t('testimonialsSection.before');
  const afterLabelText = afterLabel || t('testimonialsSection.after');

  // Handle WhatsApp request functionality
  const handleWhatsAppRequest = () => {
    // GTM tracking
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_contact',
        eventCategory: 'Contact',
        eventAction: 'WhatsApp Click',
        eventLabel: `Testimonials Section - ${translationNamespace}`
      });
    }

    // Create treatment-specific message
    const treatmentType = translationNamespace === 'hairTransplantation' ? 'Haartransplantationen' :
                         translationNamespace === 'beardTransplantation' ? 'Barthaartransplantationen' :
                         'Augenbrauentransplantationen';
    
    const message = encodeURIComponent(
      `Hallo, ich interessiere mich für Behandlungsergebnisse bei ${treatmentType}. Können Sie mir Vorher-Nachher-Bilder zusenden?`
    );
    
    // Open WhatsApp with predefined message
    const whatsappUrl = `https://wa.me/491702637818?text=${message}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -z-10 w-full h-full inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>
      <div className="absolute -z-10 w-[800px] h-[800px] rounded-full bg-[#7BA7C2]/5 -top-[400px] -right-[400px] blur-3xl"></div>
      <div className="absolute -z-10 w-[600px] h-[600px] rounded-full bg-[#7BA7C2]/5 -bottom-[300px] -left-[300px] blur-3xl"></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header with elegant design */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4 relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-[#7BA7C2]/10 blur-xl"></div>
            <h2 className={`${textStyle.sectionTitle}`} lang="de">{t('testimonialsSection.title')}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-3 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-4`} lang="de">
            {t('testimonialsSection.subtitle')}
          </p>
        </div>

        {/* Before/After Slider with elegant design */}
        <div className={`mb-20 transition-all duration-1000 delay-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <div className="h-96 w-full transition-all duration-700 ease-in-out transform group-hover:scale-105 relative">
                  <OptimizedImage 
                    sources={{
                      webp: beforeAfterPairs[activeBeforeAfter].before,
                      original: beforeAfterPairs[activeBeforeAfter].before.replace('.webp', '.jpg'),
                      width: 1000,
                      height: 667
                    }}
                    alt={beforeAfterPairs[activeBeforeAfter].beforeAlt || `Vor der Behandlung - Patient vor dem Eingriff`}
                    className={`w-full h-full object-cover transition-all duration-500 ${
                      requiresUnlock ? 'blur-md' : ''
                    }`}
                    loading="lazy"
                  />
                  {requiresUnlock && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="text-white text-center px-4">
                        <Eye className="w-8 h-8 mx-auto mb-2 opacity-80" />
                        <p className="text-sm font-light opacity-90">
                          {t('testimonialsSection.blurNotice', 'Bild aus rechtlichen Gründen unscharf')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-1.5 rounded-full text-sm font-light backdrop-blur-sm">{beforeLabelText}</div>
              </div>
              
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <div className="h-96 w-full transition-all duration-700 ease-in-out transform group-hover:scale-105">
                  <OptimizedImage 
                    sources={{
                      webp: beforeAfterPairs[activeBeforeAfter].after,
                      original: beforeAfterPairs[activeBeforeAfter].after.replace('.webp', '.jpg'),
                      width: 1000,
                      height: 667
                    }}
                    alt={beforeAfterPairs[activeBeforeAfter].afterAlt || `Nach der Behandlung - Erfolgreiche Behandlung mit sichtbaren Ergebnissen`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute top-4 left-4 bg-[#7BA7C2]/90 text-white px-4 py-1.5 rounded-full text-sm font-light backdrop-blur-sm">{afterLabelText}</div>
              </div>
            </div>
            
            {/* Navigation arrows */}
            <button 
              onClick={prevBeforeAfter}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-colors z-10 border border-gray-100"
              aria-label="Previous result"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button 
              onClick={nextBeforeAfter}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-colors z-10 border border-gray-100"
              aria-label="Next result"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
            
            {/* Dots indicator */}
            <div className="flex justify-center mt-6">
              {beforeAfterPairs.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveBeforeAfter(index)}
                  className={`w-3 h-3 rounded-full mx-2 transition-all duration-300 ${
                    activeBeforeAfter === index 
                      ? 'bg-[#7BA7C2] scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to result ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* WhatsApp Request Button and Legal Notice */}
          {requiresUnlock && (
            <div className="mt-8 text-center">
              <button
                onClick={handleWhatsAppRequest}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white px-8 py-4 rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mb-6"
              >
                <MessageCircle className="w-5 h-5" />
                {t('testimonialsSection.whatsAppButton', 'Behandlungsergebnisse anfordern')}
              </button>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-sm text-blue-800 font-medium mb-1">
                      {t('testimonialsSection.legalNoticeTitle', 'Hinweis zum Heilmittelwerbegesetz')}
                    </p>
                    <p className="text-xs text-blue-700 leading-relaxed">
                      {t('testimonialsSection.legalNotice', 'Aus rechtlichen Gründen (§11 Heilmittelwerbegesetz) dürfen Vorher-Nachher-Bilder medizinischer Behandlungen nicht öffentlich dargestellt werden. Die Ergebnisse können individuell variieren und sind nicht garantiert.')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CTA Section using the reusable component */}
        <CTASection 
          translationNamespace={translationNamespace}
          titleKey="testimonialsSection.ctaSection.title"
          descriptionKey="testimonialsSection.ctaSection.description"
          ctaTextKey="testimonialsSection.cta"
          ctaLink={ctaLink}
          animationDelay="delay-1200"
          showAnimation={isVisible}
        />
      </div>
    </section>
  );
};

export default TestimonialsSectionComponent;
