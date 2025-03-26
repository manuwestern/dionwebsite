import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Shield, Award, Clock, Heart, Sparkles, Zap, Star, Trophy, Medal, ThumbsUp, X, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, tracking, lineHeight } from '../../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../utils/buttons';

const BenefitsSection: React.FC = () => {
  const { t } = useTranslation(['home', 'common']);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedBenefit, setSelectedBenefit] = useState<number>(0);
  const [scrollY, setScrollY] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const [autoRotateTimer, setAutoRotateTimer] = useState<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  // Trigger entrance animations on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const scrollPosition = window.scrollY + window.innerHeight;
      
      if (sectionRef.current) {
        const elementPosition = sectionRef.current.offsetTop + 200;
        
        if (scrollPosition > elementPosition) {
          setIsVisible(true);
        }
      }
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate benefits if user hasn't interacted
  useEffect(() => {
    if (!isVisible) return;
    
    // Clear any existing timer
    if (autoRotateTimer) {
      clearTimeout(autoRotateTimer);
    }
    
    // If user hasn't interacted, set up auto-rotation
    if (!userInteracted) {
      const timer = setTimeout(() => {
        const nextIndex = (selectedBenefit + 1) % benefits.length;
        setSelectedBenefit(nextIndex);
        setActiveIndex(nextIndex);
      }, 5000); // Rotate every 5 seconds
      
      setAutoRotateTimer(timer);
    }
    
    return () => {
      if (autoRotateTimer) {
        clearTimeout(autoRotateTimer);
      }
    };
  }, [isVisible, selectedBenefit, userInteracted]);

  // Scroll to details on mobile when a benefit is selected
  useEffect(() => {
    if (window.innerWidth < 1024 && detailsRef.current) {
      setTimeout(() => {
        detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [selectedBenefit]);

  // Handle card click
  const handleCardClick = (index: number) => {
    setSelectedBenefit(index);
    setActiveIndex(index);
    setUserInteracted(true);
    
    // Reset auto-rotation after 30 seconds of inactivity
    if (autoRotateTimer) {
      clearTimeout(autoRotateTimer);
    }
    
    const inactivityTimer = setTimeout(() => {
      setUserInteracted(false);
    }, 30000);
    
    setAutoRotateTimer(inactivityTimer);
  };

  // Handle card hover
  const handleCardHover = (index: number) => {
    setActiveIndex(index);
    setUserInteracted(true);
    
    // Reset auto-rotation after 30 seconds of inactivity
    if (autoRotateTimer) {
      clearTimeout(autoRotateTimer);
    }
    
    const inactivityTimer = setTimeout(() => {
      setUserInteracted(false);
    }, 30000);
    
    setAutoRotateTimer(inactivityTimer);
  };

  // Icons for benefits with elegant styling
  const benefitIcons = [
    <Shield strokeWidth={1.5} />,
    <Award strokeWidth={1.5} />,
    <Clock strokeWidth={1.5} />,
    <Heart strokeWidth={1.5} />
  ];

  // Create benefits from translation keys
  const benefits = Array.from(
    { length: (t('benefitsSection.benefits', { returnObjects: true }) as any[]).length },
    (_, index) => ({
      title: t(`benefitsSection.benefits.${index}.title`),
      description: t(`benefitsSection.benefits.${index}.description`),
      icon: benefitIcons[index]
    })
  );

  // Additional details for each benefit
  const benefitDetails = [
    {
      title: "Erfahrene Spezialisten",
      description: "Unser Team besteht aus erfahrenen Ärzten mit über 15 Jahren Erfahrung in der Haartransplantation.",
      longDescription: "Bei der Dion Hair Clinic legen wir besonderen Wert auf Erfahrung und Expertise. Unsere Spezialisten haben jahrelange Erfahrung in der Durchführung von Haartransplantationen und bilden sich kontinuierlich weiter, um stets die neuesten und effektivsten Techniken anwenden zu können. Jeder unserer Ärzte hat bereits tausende erfolgreiche Eingriffe durchgeführt und verfügt über ein tiefes Verständnis für die ästhetischen und medizinischen Aspekte der Haartransplantation.",
      advantages: [
        "Ärzte mit über 15 Jahren Erfahrung in der Haartransplantation",
        "Regelmäßige Fortbildungen und Zertifizierungen",
        "Spezialisierung auf verschiedene Transplantationstechniken"
      ]
    },
    {
      title: "Modernste Technologien",
      description: "Wir verwenden nur die neuesten und schonendsten Techniken für optimale Ergebnisse.",
      longDescription: "Die Dion Hair Clinic setzt auf modernste Technologien und innovative Verfahren, um Ihnen die bestmöglichen Ergebnisse zu garantieren. Von der präzisen FUE-Technik bis zur fortschrittlichen DHI-Methode mit Saphir-Klingen – wir bieten Ihnen stets die neuesten und schonendsten Verfahren. Unsere hochmoderne Ausstattung ermöglicht es uns, jeden Eingriff mit höchster Präzision und minimaler Belastung durchzuführen.",
      advantages: [
        "Neueste FUE und DHI Techniken mit Saphir-Klingen",
        "Hochauflösende Mikroskope für präzise Entnahme und Implantation",
        "Schmerzarme Verfahren mit minimaler Erholungszeit"
      ]
    },
    {
      title: "Individuelle Beratung",
      description: "Jeder Patient erhält eine ausführliche und persönliche Beratung für die beste Behandlungsstrategie.",
      longDescription: "Wir verstehen, dass jeder Patient einzigartig ist und individuelle Bedürfnisse hat. Daher beginnt jede Behandlung bei uns mit einer ausführlichen persönlichen Beratung. Unsere Experten analysieren Ihre Haarsituation, besprechen Ihre Wünsche und Erwartungen und entwickeln einen maßgeschneiderten Behandlungsplan, der optimal auf Sie abgestimmt ist. Wir nehmen uns Zeit für Sie und beantworten alle Ihre Fragen, damit Sie sich rundum wohl und gut informiert fühlen.",
      advantages: [
        "Ausführliche Analyse Ihrer individuellen Haarsituation",
        "Persönliches Beratungsgespräch mit unseren Experten",
        "Maßgeschneiderter Behandlungsplan nach Ihren Wünschen"
      ]
    },
    {
      title: "Natürliche Ergebnisse",
      description: "Unsere Haartransplantationen sehen natürlich aus und sind nicht von natürlichem Haarwuchs zu unterscheiden.",
      longDescription: "Das Ziel jeder Haartransplantation in der Dion Hair Clinic ist ein vollkommen natürliches Ergebnis. Durch die präzise Platzierung der Haarfollikel unter Berücksichtigung der natürlichen Wuchsrichtung und -dichte erreichen wir Ergebnisse, die selbst aus nächster Nähe nicht von natürlichem Haarwuchs zu unterscheiden sind. Wir achten besonders auf die Gestaltung einer natürlichen Haarlinie und die harmonische Integration der transplantierten Haare in Ihr bestehendes Haar.",
      advantages: [
        "Natürliche Haarlinie und Wuchsrichtung",
        "Präzise Platzierung jedes einzelnen Haarfollikels",
        "Harmonische Integration in Ihr bestehendes Haar"
      ]
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="benefits-section" 
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Elegant background with subtle animations */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/80 to-white"></div>
        
        {/* Animated gradient circles */}
        <div 
          className="absolute top-0 right-0 w-[1000px] h-[1000px] rounded-full bg-gradient-to-br from-[#7BA7C2]/5 to-transparent -mr-[500px] -mt-[500px] blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.03}px)` }}
        ></div>
        <div 
          className="absolute bottom-0 left-0 w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-[#7BA7C2]/5 to-transparent -ml-[400px] -mb-[400px] blur-3xl"
          style={{ transform: `translateY(${scrollY * -0.02}px)` }}
        ></div>
        
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.015]" 
          style={{ 
            backgroundImage: 'url("/images/dionhairclinic_bg.svg")',
            backgroundSize: '200px',
            backgroundRepeat: 'repeat'
          }}
        ></div>
        
        {/* Animated gradient lines */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#7BA7C2] to-transparent animate-gradient-x-slow"></div>
          <div className="absolute top-2/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#7BA7C2] to-transparent animate-gradient-x-slower"></div>
        </div>
      </div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Elegant section header */}
        <div className="text-center mb-20">
          <div className="inline-block relative">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-[#7BA7C2]/10 blur-xl"></div>
            <h2 className={`${textStyle.sectionTitle} mb-4`} lang="de">{t('benefitsSection.title')}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[300px] mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-6`}>
            {t('benefitsSection.subtitle')}
          </p>
        </div>

        {/* Main content - Elegant asymmetrical layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-20">
          {/* Left column - Benefits grid with elegant hover effects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 h-full order-2 lg:order-1">
            {benefits.map((benefit, index) => {
              const isActive = index === activeIndex;
              const isSelected = index === selectedBenefit;
              
              return (
                <div 
                  key={index}
                  className={`relative transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                  onMouseEnter={() => handleCardHover(index)}
                  onClick={() => handleCardClick(index)}
                >
                  {/* Card with glass morphism effect */}
                  <div className={`relative bg-white backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 h-full cursor-pointer ${
                    isSelected 
                      ? 'shadow-xl border-2 border-[#7BA7C2] scale-[1.02]' 
                      : isActive
                        ? 'shadow-xl border-2 border-[#7BA7C2]/80' 
                        : 'border border-gray-100/80 hover:border-[#7BA7C2]/30 hover:shadow-xl'
                  }`}>
                    {/* Card Content */}
                    <div className="p-6 h-full flex flex-col">
                      {/* Icon with elegant styling */}
                      <div className={`w-14 h-14 rounded-full bg-gradient-to-br from-[#7BA7C2]/20 to-[#7BA7C2]/5 flex items-center justify-center mb-4 transition-all duration-500 ${
                        isSelected ? 'scale-110 bg-gradient-to-br from-[#7BA7C2]/40 to-[#7BA7C2]/20' :
                        isActive ? 'scale-110 bg-gradient-to-br from-[#7BA7C2]/30 to-[#7BA7C2]/10' : ''
                      }`}>
                        {React.cloneElement(benefit.icon as React.ReactElement, { 
                          className: `w-6 h-6 text-[#7BA7C2] transition-all duration-500 ${isActive ? 'scale-110' : ''}` 
                        })}
                      </div>
                      
                      {/* Title with elegant typography */}
                      <h3 className={`${fontSize.h4} ${fontWeight.normal} ${isActive ? textColor.primary : textColor.dark} mb-3 transition-colors duration-300`}>
                        {benefit.title}
                      </h3>
                      
                      {/* Description with perfect typography */}
                      <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed} flex-grow`}>
                        {benefit.description}
                      </p>
                      
                      {/* Subtle indicator */}
                      <div className={`flex items-center justify-end ${fontSize.xs} ${textColor.primary} mt-4 transition-opacity duration-300 ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <span className={`mr-1 ${fontWeight.light}`}>Mehr erfahren</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative shadow */}
                  <div className={`absolute -z-10 w-full h-full rounded-2xl bg-[#7BA7C2]/10 top-2 left-2 transition-all duration-500 ${
                    isActive ? 'opacity-70' : 'opacity-0'
                  }`}></div>
                </div>
              );
            })}
          </div>
          
          {/* Right column - Featured benefit with animation */}
          <div 
            ref={detailsRef}
            className={`transition-all duration-1000 ease-out order-1 lg:order-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            <div className="relative h-full">
              {/* Decorative elements */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#7BA7C2]/5 to-transparent rounded-3xl blur-xl"></div>
              
              {/* Featured benefit card */}
              <div className="relative bg-white backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-gray-100/80 h-full p-8 md:p-10">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -mr-32 -mt-32 blur-xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#7BA7C2]/5 -ml-24 -mb-24 blur-xl"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Dynamic content based on selected benefit */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-[#7BA7C2]/20 flex items-center justify-center flex-shrink-0">
                      {React.cloneElement(benefits[selectedBenefit].icon as React.ReactElement, { 
                        className: 'w-7 h-7 text-[#7BA7C2]' 
                      })}
                    </div>
                    <h3 className={`${fontSize.h3} ${fontWeight.light} ${textColor.primary} tracking-wider pt-2`}>
                      {benefitDetails[selectedBenefit].title}
                    </h3>
                  </div>
                  
                  <div className="space-y-6">
                    <p className={`${textStyle.bodyTextImportant}`}>
                      {benefitDetails[selectedBenefit].description}
                    </p>
                    
                    <p className={`${textStyle.bodyText}`}>
                      {benefitDetails[selectedBenefit].longDescription}
                    </p>
                    
                    <div className="bg-[#7BA7C2]/5 p-6 rounded-xl">
                      <h4 className={`${fontSize.lg} ${fontWeight.normal} ${textColor.primary} mb-4`}>
                        Ihre Vorteile:
                      </h4>
                      <ul className="space-y-3">
                        {benefitDetails[selectedBenefit].advantages.map((advantage, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-[#7BA7C2] flex-shrink-0 mt-0.5" />
                            <span className={`${fontSize.base} ${textColor.medium}`}>
                              {advantage}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <div className="mt-10 flex justify-center md:justify-start">
                    <button className={`${buttonStyle.primary} shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}>
                      <span className={buttonRippleClass}></span>
                      <span className={`relative flex items-center ${textStyle.button} uppercase tracking-widest`}>
                        {t('buttons.consultation', { ns: 'common' })}
                        <ArrowRight className={`${buttonArrowClass} ml-2`} />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Elegant CTA Section */}
        <div className={`mt-16 relative transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="relative bg-gradient-to-r from-[#7BA7C2] to-[#5A8BA6] rounded-2xl p-8 md:p-10 shadow-xl overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/10 -ml-32 -mb-32"></div>
            
            {/* Animated particles */}
            <div className="absolute top-1/4 right-1/4 w-1 h-1 rounded-full bg-white/70 animate-pulse"></div>
            <div className="absolute bottom-1/3 left-1/3 w-1 h-1 rounded-full bg-white/70 animate-pulse-slow"></div>
            <div className="absolute top-1/2 right-1/2 w-1 h-1 rounded-full bg-white/70 animate-pulse-slower"></div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="md:w-2/3">
                <h3 className={`${fontSize.h3} ${fontWeight.light} text-white mb-4 text-center md:text-left`}>
                  {t('benefitsSection.overlay')}
                </h3>
              </div>
              <div className="md:w-1/3 flex justify-center md:justify-end">
                <button className="group relative inline-flex items-center justify-center overflow-hidden transition-all duration-300 shadow-lg px-8 py-4 rounded-xl bg-white text-[#7BA7C2]">
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#7BA7C2] rounded-full group-hover:w-80 group-hover:h-80 opacity-10"></span>
                  <span className={`relative flex items-center ${fontSize.base} ${fontWeight.medium} ${tracking.wider} uppercase`}>
                    {t('buttons.consultation', { ns: 'common' })}
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
