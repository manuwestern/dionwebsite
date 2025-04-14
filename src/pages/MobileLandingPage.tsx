import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Phone, MessageCircle } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline } from '../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../utils/buttons';
import SEO from '../components/seo/SEO';

// Mobile-optimized Hero Section with Swipe Animation
const MobileHeroSection: React.FC = () => {
  const { t } = useTranslation(['home', 'common']);
  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Trigger entrance animations
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      setActiveSlide((prev) => (prev + 1) % 3);
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      setActiveSlide((prev) => (prev - 1 + 3) % 3);
    }
  };

  // Hero content for each slide
  const heroContent = [
    {
      title: t('heroSection.title'),
      subtitle: t('heroSection.subtitle').split('\n')[0],
      highlight: "15+ Jahre Erfahrung"
    },
    {
      title: "Natürliche Ergebnisse",
      subtitle: "Modernste Techniken für Ihr Haar",
      highlight: "98% Zufriedenheit"
    },
    {
      title: "Schmerzfreie Behandlung",
      subtitle: "Mit innovativer DPI-Technologie",
      highlight: "Exklusiv bei Dion"
    }
  ];

  return (
    <div 
      className="relative h-[90vh] overflow-hidden flex items-center"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background with parallax effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>
        <div 
          className="absolute inset-0 opacity-[0.03] bg-[url('/images/dionhairclinic_bg.svg')] bg-[length:200px_200px] bg-repeat"
          style={{ transform: `translateY(${activeSlide * 5}px)` }}
        ></div>
      </div>
      
      {/* Main content area */}
      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col px-5">
          {/* Text content with animations */}
          <div className="space-y-6 mt-4 text-center">
            {/* Slide indicator */}
            <div className="flex justify-center gap-2 mb-4">
              {[0, 1, 2].map((index) => (
                <button 
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    activeSlide === index 
                      ? 'bg-[#7BA7C2] scale-125' 
                      : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Title with animation */}
            <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
              <h1 className={`${textStyle.heroTitle} text-center px-1 leading-tight break-words hyphens-auto`} lang="de">
                {heroContent[activeSlide].title}
              </h1>
              
              {/* Subtitle with animation */}
              <div className="mt-3 mb-2">
                <span className={`block text-center ${fontSize.h4} ${textColor.medium} ${fontWeight.light} tracking-wider leading-relaxed`}>
                  {heroContent[activeSlide].subtitle}
                </span>
              </div>
              
              {/* Highlight badge */}
              <div className="mt-4 flex justify-center">
                <div className="bg-[#7BA7C2]/10 text-[#7BA7C2] px-4 py-2 rounded-full text-sm font-medium inline-block">
                  {heroContent[activeSlide].highlight}
                </div>
              </div>
              
              {/* Elegant gradient underline with animation */}
              <div className={`${gradientUnderline.primary} h-[1.5px] w-[85%] max-w-[280px] mx-auto mt-5 transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
            </div>
            
            {/* CTA button with animation */}
            <div className={`flex justify-center mt-8 transition-all duration-1000 delay-900 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <Link 
                to="/kontakt" 
                className={`${buttonStyle.primary} shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] inline-block`}
              >
                <span className={buttonRippleClass}></span>
                <span className={`relative flex items-center ${textStyle.button} uppercase tracking-widest`}>
                  {t('buttons.consultation', { ns: 'common' })}
                  <ArrowRight className={`${buttonArrowClass} ml-2`} />
                </span>
              </Link>
            </div>
          </div>
          
          {/* Image with animation */}
          <div className="mt-8 relative">
            <div className={`relative flex justify-center transition-all duration-1000 delay-1100 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <img 
                src="/images/Model_Home.webp"
                alt="Dr. Dion - Führender Experte für Haartransplantation"
                className="w-auto h-auto max-h-[400px] object-contain relative z-10 scale-125"
                width="450"
                height="650"
                loading="lazy"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Swipe indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center text-gray-400 text-sm">
        <ChevronLeft className="w-4 h-4 mr-1" />
        <span>Wischen für mehr</span>
        <ChevronRight className="w-4 h-4 ml-1" />
      </div>
    </div>
  );
};

// Treatment Areas as Interactive Cards
const TreatmentAreasSection: React.FC = () => {
  const { t } = useTranslation(['home', 'common']);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Trigger entrance animations on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Treatment areas data
  const treatmentAreas = [
    {
      id: 'head',
      imageUrl: '/images/Behandlung_Haartransplantation.webp',
      title: t('treatmentAreasSection.areas.0.title'),
      description: t('treatmentAreasSection.areas.0.mobileDescription'),
      link: '/haartransplantation'
    },
    {
      id: 'beard',
      imageUrl: '/images/Behandlung_Barthaartransplantation.webp',
      title: t('treatmentAreasSection.areas.1.title'),
      description: t('treatmentAreasSection.areas.1.mobileDescription'),
      link: '/barthaartransplantation'
    },
    {
      id: 'eyebrows',
      imageUrl: '/images/Behandlung_Augenbrauentransplantation.webp',
      title: t('treatmentAreasSection.areas.2.title'),
      description: t('treatmentAreasSection.areas.2.mobileDescription'),
      link: '/augenbrauentransplantation'
    }
  ];

  return (
    <section ref={sectionRef} className="py-12 relative overflow-hidden bg-[#F8FAFC]">
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className={`${textStyle.sectionTitle} mb-2`} lang="de">{t('treatmentAreasSection.title')}</h2>
          <div className={`${gradientUnderline.primary} w-[90%] max-w-[250px] mt-2 mx-auto`}></div>
        </div>

        {/* Horizontal scrolling cards */}
        <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          <div className="flex space-x-4" style={{ minWidth: 'max-content' }}>
            {treatmentAreas.map((area, index) => (
              <div 
                key={area.id}
                className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${index * 150}ms`, width: '280px' }}
                onClick={() => setActiveCard(activeCard === index ? null : index)}
              >
                {/* Treatment area card with tap-to-expand */}
                <div className={`bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100/80 transition-all duration-300 ${
                  activeCard === index ? 'transform scale-[1.02]' : ''
                }`}>
                  {/* Image container */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#7BA7C2]/10 to-transparent"></div>
                    <img
                      src={area.imageUrl}
                      alt={area.title}
                      className="w-full h-48 object-cover relative z-10"
                      loading="lazy"
                    />
                    {/* Overlay with title */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 z-20">
                      <h3 className={`${textStyle.primaryHeading} text-white mb-0 text-lg`}>{area.title}</h3>
                    </div>
                  </div>
                  
                  {/* Expandable content */}
                  <div className={`p-4 text-center transition-all duration-300 overflow-hidden ${
                    activeCard === index ? 'max-h-40' : 'max-h-16'
                  }`}>
                    <p className={`${textStyle.bodyText} text-sm mb-4`}>
                      {area.description}
                    </p>
                    
                    {/* Button only visible when expanded */}
                    <div className={`transition-all duration-300 ${
                      activeCard === index ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <Link 
                        to={area.link}
                        className={`${buttonStyle.primary} w-full shadow-md text-sm py-2`}
                      >
                        <span className={buttonRippleClass}></span>
                        <span className={`relative flex items-center justify-center ${textStyle.button} uppercase tracking-widest text-xs`}>
                          {t('buttons.moreInfo', { ns: 'common' })}
                          <ArrowRight className={`${buttonArrowClass} ml-2 w-3 h-3`} />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="text-center mt-4 text-gray-400 text-xs flex items-center justify-center">
          <ChevronLeft className="w-3 h-3 mr-1" />
          <span>Scrollen für mehr</span>
          <ChevronRight className="w-3 h-3 ml-1" />
        </div>
      </div>
    </section>
  );
};

// Benefits as Animated Icons
const BenefitsSection: React.FC = () => {
  const { t } = useTranslation(['home', 'common']);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Trigger entrance animations on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Icons for each benefit
  const benefitIcons = [
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
  ];

  // Create benefit cards from translation keys
  const benefitCards = [
    {
      title: t('benefitsSection.cards.0.title'),
      description: "15+ Jahre Erfahrung in Haartransplantationen",
      icon: benefitIcons[0]
    },
    {
      title: t('benefitsSection.cards.1.title'),
      description: "Saphir-FUE und DHI für natürliche Ergebnisse",
      icon: benefitIcons[1]
    },
    {
      title: t('benefitsSection.cards.2.title'),
      description: "Ganzheitlicher Ansatz für optimale Resultate",
      icon: benefitIcons[2]
    },
    {
      title: t('benefitsSection.cards.3.title'),
      description: "Maßgeschneiderte Behandlungspläne für Sie",
      icon: benefitIcons[3]
    }
  ];

  return (
    <section ref={sectionRef} className="py-12 relative overflow-hidden bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className={`${textStyle.sectionTitle} mb-2`} lang="de">{t('benefitsSection.title')}</h2>
          <div className={`${gradientUnderline.primary} w-[90%] max-w-[250px] mt-2 mx-auto`}></div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-2 gap-4">
          {benefitCards.map((card, index) => (
            <div 
              key={index}
              className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Benefit card with animated icon */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100/80 p-4 h-full flex flex-col items-center">
                {/* Animated icon */}
                <div className={`w-12 h-12 rounded-full bg-[#7BA7C2]/10 flex items-center justify-center mb-3 ${
                  isVisible ? 'animate-pulse-once' : ''
                }`}>
                  <div className="text-[#7BA7C2]">
                    {card.icon}
                  </div>
                </div>
                
                {/* Title and description */}
                <h3 className={`${fontSize.base} ${fontWeight.medium} ${textColor.dark} text-center mb-1`}>{card.title}</h3>
                <p className={`${fontSize.xs} ${textColor.medium} ${fontWeight.light} text-center`}>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Before-After with Interactive Slider
const BeforeAfterSection: React.FC = () => {
  const { t } = useTranslation(['home', 'common']);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCase, setActiveCase] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Trigger entrance animations on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle slider movement
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  // Handle touch movement
  const handleTouchMove = (e: React.TouchEvent) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const newPosition = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(newPosition);
    }
  };

  // Before/After cases
  const cases = [
    {
      title: "Haartransplantation",
      before: "/images/hairtrans_0.webp",
      after: "/images/hairtransplantation_1.webp",
      details: "3500 Grafts, 12 Monate nach dem Eingriff"
    },
    {
      title: "Barthaartransplantation",
      before: "/images/Bart_undicht.webp",
      after: "/images/Bart_komplett.webp",
      details: "1800 Grafts, 8 Monate nach dem Eingriff"
    }
  ];

  return (
    <section ref={sectionRef} className="py-12 relative overflow-hidden bg-[#F8FAFC]">
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className={`${textStyle.sectionTitle} mb-2`} lang="de">{t('beforeAfterSection.title')}</h2>
          <div className={`${gradientUnderline.primary} w-[90%] max-w-[250px] mt-2 mx-auto`}></div>
        </div>

        {/* Case selector */}
        <div className="flex justify-center gap-2 mb-4">
          {cases.map((_, index) => (
            <button 
              key={index}
              onClick={() => setActiveCase(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeCase === index 
                  ? 'bg-[#7BA7C2] scale-125' 
                  : 'bg-gray-300'
              }`}
              aria-label={`Go to case ${index + 1}`}
            />
          ))}
        </div>

        {/* Case title */}
        <div className="text-center mb-4">
          <h3 className={`${fontSize.lg} ${fontWeight.medium} ${textColor.dark}`}>{cases[activeCase].title}</h3>
          <p className={`${fontSize.sm} ${textColor.medium}`}>{cases[activeCase].details}</p>
        </div>

        {/* Interactive slider */}
        <div 
          ref={sliderRef}
          className={`relative h-[300px] rounded-xl overflow-hidden shadow-lg transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          onTouchMove={handleTouchMove}
        >
          {/* Before image (full width) */}
          <div className="absolute inset-0 z-10">
            <img 
              src={cases[activeCase].before} 
              alt="Vorher" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          
          {/* After image (clipped by slider) */}
          <div 
            className="absolute inset-0 z-20 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img 
              src={cases[activeCase].after} 
              alt="Nachher" 
              className="w-full h-full object-cover"
              style={{ width: `${100 / (sliderPosition/100)}%` }}
              loading="lazy"
            />
          </div>
          
          {/* Slider control */}
          <div className="absolute inset-0 z-30 flex items-center justify-center">
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={sliderPosition} 
              onChange={handleSliderChange}
              className="w-full h-full opacity-0 cursor-pointer"
              aria-label="Vorher-Nachher Vergleich Schieberegler"
              title="Schieben Sie den Regler, um den Vorher-Nachher-Vergleich zu sehen"
            />
            <div 
              className="absolute h-full w-1 bg-white shadow-md pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            ></div>
            <div 
              className="absolute w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center pointer-events-none transform -translate-x-1/2"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-6 h-6 rounded-full bg-[#7BA7C2] flex items-center justify-center">
                <ChevronLeft className="w-3 h-3 text-white" />
                <ChevronRight className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          
          {/* Labels */}
          <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs z-40">
            Vorher
          </div>
          <div className="absolute top-4 right-4 bg-[#7BA7C2]/90 text-white px-3 py-1 rounded-full text-xs z-40">
            Nachher
          </div>
        </div>
        
        {/* Swipe instruction */}
        <div className="text-center mt-4 text-gray-500 text-xs">
          Wischen Sie über das Bild, um den Vorher-Nachher-Vergleich zu sehen
        </div>
      </div>
    </section>
  );
};

// Testimonials as Video Snippets (simulated with images for now)
const TestimonialsSection: React.FC = () => {
  const { t } = useTranslation(['hairTransplantation', 'common']);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Trigger entrance animations on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get testimonials from translation
  const testimonials = (t('testimonialsSection.testimonials', { returnObjects: true }) as any[]).map(
    (testimonial: any) => ({
      name: testimonial.name,
      rating: testimonial.rating,
      text: testimonial.text,
      procedure: testimonial.procedure,
      date: testimonial.date,
      // Using model images as placeholders for video thumbnails
      image: testimonial.name.includes('Michael') ? '/images/Dion_Model_ThumbsUp.webp' : 
             testimonial.name.includes('Thomas') ? '/images/Dion_Model_Ok.webp' : 
             '/images/Dion_Model_Mobile.webp'
    })
  );

  return (
    <section ref={sectionRef} className="py-12 relative overflow-hidden bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className={`${textStyle.sectionTitle} mb-2`} lang="de">{t('testimonialsSection.title')}</h2>
          <div className={`${gradientUnderline.primary} w-[90%] max-w-[250px] mt-2 mx-auto`}></div>
        </div>

        {/* Testimonial selector */}
        <div className="flex justify-center gap-2 mb-4">
          {testimonials.map((_, index) => (
            <button 
              key={index}
              onClick={() => setActiveTestimonial(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeTestimonial === index 
                  ? 'bg-[#7BA7C2] scale-125' 
                  : 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Video testimonial card */}
        <div 
          className={`relative rounded-xl overflow-hidden shadow-lg transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          {/* Video thumbnail with play button */}
          <div className="relative">
            <img 
              src={testimonials[activeTestimonial].image} 
              alt={testimonials[activeTestimonial].name} 
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#7BA7C2] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Testimonial content */}
          <div className="p-4 bg-white">
            <div className="flex items-center mb-2">
              {/* Star rating */}
              <div className="flex mr-2">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#7BA7C2] fill-current" viewBox="0 0 24 24">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                ))}
              </div>
              <span className={`${fontSize.xs} ${textColor.light}`}>{testimonials[activeTestimonial].date}</span>
            </div>
            
            {/* Quote */}
            <p className={`${fontSize.sm} ${textColor.dark} ${fontWeight.light} italic mb-3`}>
              "{testimonials[activeTestimonial].text.length > 120 
                ? testimonials[activeTestimonial].text.substring(0, 120) + '...' 
                : testimonials[activeTestimonial].text}"
            </p>
            
            {/* Patient info */}
            <div className="flex justify-between items-end">
              <div>
                <div className={`${fontSize.sm} ${fontWeight.medium} ${textColor.dark}`}>{testimonials[activeTestimonial].name}</div>
                <div className={`${fontSize.xs} ${textColor.primary}`}>{testimonials[activeTestimonial].procedure}</div>
              </div>
              <button className={`${fontSize.xs} ${textColor.primary} underline`}>
                Mehr lesen
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// App Showcase with Animation
const AppShowcaseSection: React.FC = () => {
  const { t } = useTranslation(['home', 'common']);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Trigger entrance animations on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // App features
  const features = (t('appSection.features', { returnObjects: true }) as any[]).slice(0, 4).map(
    (feature: any, index: number) => ({
      title: feature.title,
      description: feature.description
    })
  );

  return (
    <section ref={sectionRef} className="py-12 relative overflow-hidden bg-[#F8FAFC]">
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className={`${textStyle.sectionTitle} mb-2`} lang="de">{t('appSection.title')}</h2>
          <div className={`${gradientUnderline.primary} w-[90%] max-w-[250px] mt-2 mx-auto`}></div>
        </div>

        {/* App mockup */}
        <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="relative mx-auto max-w-[250px]">
            <img 
              src="/images/dionapp.webp" 
              alt="Dion Hair Clinic App" 
              className="w-full h-auto rounded-xl shadow-lg"
              loading="lazy"
            />
            
            {/* Badge "ab Mai 2025" */}
            <div className="absolute top-3 right-3 bg-[#7BA7C2] text-white px-3 py-1 rounded-full shadow-md transform rotate-12 text-sm font-medium">
              ab Mai 2025
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -z-10 w-64 h-64 bg-[#7BA7C2]/5 rounded-full -bottom-10 -left-10"></div>
            <div className="absolute -z-10 w-32 h-32 bg-[#7BA7C2]/10 rounded-full -top-5 right-10"></div>
          </div>
        </div>
        
        {/* App features */}
        <div className="mt-8">
          <h3 className={`${fontSize.lg} ${fontWeight.medium} ${textColor.dark} text-center mb-4`}>{t('appSection.subheading')}</h3>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${index * 150 + 300}ms` }}
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100/80 p-4 h-full">
                  <h4 className={`${fontSize.sm} ${fontWeight.medium} ${textColor.dark} text-center mb-1`}>{feature.title}</h4>
                  <p className={`${fontSize.xs} ${textColor.medium} ${fontWeight.light} text-center`}>
                    {feature.description.length > 60 
                      ? feature.description.substring(0, 60) + '...' 
                      : feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* App store links */}
          <div className={`mt-8 flex justify-center gap-4 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
               style={{ transitionDelay: '900ms' }}>
            <a href="#" className="transform transition-all duration-300 hover:scale-[1.05] active:scale-[0.98]">
              <img 
                src="/images/apple_store.svg" 
                alt="Apple App Store" 
                className="w-32 h-auto"
                loading="lazy"
              />
            </a>
            <a href="#" className="transform transition-all duration-300 hover:scale-[1.05] active:scale-[0.98]">
              <img 
                src="/images/google_play.svg" 
                alt="Google Play Store" 
                className="w-32 h-auto"
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact with One-Tap Action
const ContactSection: React.FC = () => {
  const { t } = useTranslation(['home', 'common']);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Trigger entrance animations on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="py-12 relative overflow-hidden bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className={`${textStyle.sectionTitle} mb-2`} lang="de">Kontakt</h2>
          <div className={`${gradientUnderline.primary} w-[90%] max-w-[250px] mt-2 mx-auto`}></div>
          <p className={`${fontSize.base} ${textColor.medium} mt-4`}>
            Vereinbaren Sie jetzt Ihren persönlichen Beratungstermin
          </p>
        </div>

        {/* Contact buttons */}
        <div className={`space-y-4 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* Call button */}
          <a 
            href="tel:+4917026378181" 
            className="flex items-center justify-center gap-3 w-full bg-[#7BA7C2] text-white py-4 px-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Phone className="w-5 h-5" />
            <span className={`${fontSize.base} ${fontWeight.medium}`}>Jetzt anrufen</span>
          </a>
          
          {/* WhatsApp button */}
          <a 
            href="https://wa.me/4917026378181" 
            className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white py-4 px-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageCircle className="w-5 h-5" />
            <span className={`${fontSize.base} ${fontWeight.medium}`}>WhatsApp Chat</span>
          </a>
          
          {/* Appointment button */}
          <Link 
            to="/kontakt" 
            className="flex items-center justify-center gap-3 w-full bg-white border-2 border-[#7BA7C2] text-[#7BA7C2] py-4 px-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className={`${fontSize.base} ${fontWeight.medium}`}>Termin vereinbaren</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        
        {/* Address */}
        <div className={`mt-8 text-center transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
             style={{ transitionDelay: '300ms' }}>
          <p className={`${fontSize.sm} ${textColor.medium}`}>
            Dion Hair Clinic<br />
            Schürenweg 61<br />
            41063 Mönchengladbach<br />
            Deutschland
          </p>
        </div>
      </div>
    </section>
  );
};

// Main Mobile Landing Page Component
const MobileLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO namespace="home" />
      
      {/* Mobile-optimized sections */}
      <MobileHeroSection />
      <TreatmentAreasSection />
      <BenefitsSection />
      <BeforeAfterSection />
      <TestimonialsSection />
      <AppShowcaseSection />
      <ContactSection />
      
      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-100 p-3 z-50">
        <Link 
          to="/kontakt" 
          className={`${buttonStyle.primary} w-full shadow-md flex items-center justify-center`}
        >
          <span className={buttonRippleClass}></span>
          <span className={`relative flex items-center justify-center ${textStyle.button} uppercase tracking-widest`}>
            Kostenlose Beratung
            <ArrowRight className={`${buttonArrowClass} ml-2`} />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default MobileLandingPage;
