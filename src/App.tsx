import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, Instagram, Apple as WhatsApp, BookText as TikTok, Menu, X, Award, Clock, Users, Stethoscope, PhoneCall, CalendarCheck, Microscope, HeartPulse, Sparkles, ChevronDown } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState(new Set());
  const stepRefs = useRef([]);
  const lastScrollY = useRef(0);
  const scrollDirection = useRef('down');

  const processSteps = [
    {
      icon: <PhoneCall className="w-6 h-6" />,
      title: "Erstkontakt",
      description: "Vereinbaren Sie ein kostenloses Beratungsgespräch. Wir besprechen Ihre Wünsche und Möglichkeiten.",
      image: "https://images.unsplash.com/photo-1557425493-6f90ae4659fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      icon: <CalendarCheck className="w-6 h-6" />,
      title: "Analyse & Planung",
      description: "Detaillierte Haaranalyse und Erstellung eines individuellen Behandlungsplans.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      icon: <Microscope className="w-6 h-6" />,
      title: "Behandlung",
      description: "Schmerzfreie Durchführung der Haartransplantation mit modernster Technologie.",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      icon: <HeartPulse className="w-6 h-6" />,
      title: "Heilungsprozess",
      description: "Engmaschige Nachsorge und Begleitung während der Heilungsphase.",
      image: "https://images.unsplash.com/photo-1614859324669-927e70f7e6ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Endergebnis",
      description: "Nach 12 Monaten zeigt sich das volle, natürliche Ergebnis Ihrer Behandlung.",
      image: "https://images.unsplash.com/photo-1595163791530-b99f6c0dd4b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollDirection.current = currentScrollY > lastScrollY.current ? 'down' : 'up';
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = stepRefs.current.findIndex(ref => ref === entry.target);
          if (index !== -1) {
            const isScrollingDown = scrollDirection.current === 'down';
            const threshold = isScrollingDown ? 0.7 : 0.3;
            
            if (entry.isIntersecting) {
              const ratio = entry.intersectionRatio;
              const shouldActivate = isScrollingDown ? ratio >= threshold : ratio >= 0.3;
              
              if (shouldActivate) {
                setVisibleSteps(prev => {
                  const newSet = new Set(prev);
                  newSet.add(index);
                  if (!isScrollingDown) {
                    for (let i = 0; i <= index; i++) {
                      newSet.add(i);
                    }
                  } else {
                    for (let i = 0; i < processSteps.length; i++) {
                      if (i !== index && i !== index - 1 && i !== index + 1) {
                        newSet.delete(i);
                      }
                    }
                  }
                  return newSet;
                });
                setActiveStep(index);
              }
            } else if (!entry.isIntersecting) {
              const shouldDeactivate = isScrollingDown ? 
                entry.intersectionRatio < 0.3 : 
                entry.intersectionRatio < 0.1;
              
              if (shouldDeactivate) {
                setVisibleSteps(prev => {
                  const newSet = new Set(prev);
                  if (isScrollingDown) {
                    newSet.delete(index);
                  } else {
                    for (let i = index; i < processSteps.length; i++) {
                      newSet.delete(i);
                    }
                  }
                  return newSet;
                });
              }
            }
          }
        });
      },
      {
        threshold: [0.1, 0.3, 0.7],
        rootMargin: '-20% 0px -20% 0px'
      }
    );

    stepRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white font-montserrat overflow-x-hidden">
      {/* Top Bar */}
      <div className="bg-gray-100 py-2">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
            <div className="flex gap-4">
              <button className="flex items-center gap-1 text-sm">
                <img src="/de.svg" alt="Deutsch" className="w-6 h-4" /> Deutsch
              </button>
              <button className="flex items-center gap-1 text-sm">
                <img src="/gb.svg" alt="English" className="w-6 h-4" /> English
              </button>
            </div>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6 text-sm">
              <a href="mailto:info@dionhairclinic.de" className="flex items-center gap-1 hover:text-gray-600">
                <Mail size={16} /> info@dionhairclinic.de
              </a>
              <a href="tel:+491702637818" className="flex items-center gap-1 hover:text-gray-600">
                <Phone size={16} /> +49 170 2637818
              </a>
              <div className="flex items-center gap-3">
                <a href="#" className="hover:text-gray-600"><WhatsApp size={20} /></a>
                <a href="#" className="hover:text-gray-600"><Instagram size={20} /></a>
                <a href="#" className="hover:text-gray-600"><TikTok size={20} /></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="w-full max-w-7xl mx-auto px-4 py-6 relative">
        <div className="flex justify-between items-center">
          <div className="text-xl md:text-2xl font-light tracking-wider">DH CLINIC</div>
          <button 
            className="block md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="hidden md:flex gap-8 text-sm font-light">
            <a href="#" className="hover:text-gray-600">Home</a>
            <a href="#" className="hover:text-gray-600">Behandlungen</a>
            <a href="#" className="hover:text-gray-600">Wissenswertes</a>
            <a href="#" className="hover:text-gray-600">Klinik</a>
            <a href="#" className="hover:text-gray-600">Kontakt</a>
            <a href="#" className="text-red-600 hover:text-red-700">Preisrechner</a>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg p-4 md:hidden z-50">
            <div className="flex flex-col gap-4 text-sm font-light">
              <a href="#" className="hover:text-gray-600">Home</a>
              <a href="#" className="hover:text-gray-600">Behandlungen</a>
              <a href="#" className="hover:text-gray-600">Wissenswertes</a>
              <a href="#" className="hover:text-gray-600">Klinik</a>
              <a href="#" className="hover:text-gray-600">Kontakt</a>
              <a href="#" className="text-red-600 hover:text-red-700">Preisrechner</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gray-50">
        <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-20">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="w-full text-center md:text-left md:max-w-xl">
              <h1 className="text-3xl font-light mb-4 md:text-6xl">
                Ihre Experten
                <span className="block text-xl mt-2 text-gray-600 md:text-4xl font-light">
                  für Haartransplantationen in Mönchengladbach
                </span>
              </h1>
              
              {/* Benefits Points */}
              <div className="mt-4 mb-6 grid grid-cols-2 gap-4 text-left">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <Award className="w-4 h-4 text-gray-700" />
                  </div>
                  <span className="text-sm font-light text-gray-700">15+ Jahre Erfahrung</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <Stethoscope className="w-4 h-4 text-gray-700" />
                  </div>
                  <span className="text-sm font-light text-gray-700">Modernste Technologie</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <Users className="w-4 h-4 text-gray-700" />
                  </div>
                  <span className="text-sm font-light text-gray-700">Persönliche Betreuung</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <HeartPulse className="w-4 h-4 text-gray-700" />
                  </div>
                  <span className="text-sm font-light text-gray-700">Natürliche Ergebnisse</span>
                </div>
              </div>
              
              <button className="w-full mt-6 bg-[#333333] text-white px-6 py-3 rounded-lg hover:bg-[#444444] transition-colors text-sm font-light tracking-wider md:w-auto md:mt-8 md:px-8">
                KOSTENLOSE BERATUNG
              </button>
            </div>
            <div className="relative w-full md:w-[500px]">
              <img 
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                alt="Haartransplantation Experte in der Dion Hair Clinic"
                className="w-full rounded-lg shadow-xl h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-20">
        <div className="flex flex-col gap-8 md:flex-row md:gap-20">
          <div className="w-full text-center md:text-left md:flex-1">
            <h2 className="text-xl font-light mb-2 md:text-3xl md:mb-4">Willkommen in der</h2>
            <h3 className="text-2xl font-light mb-6 md:text-4xl md:mb-8">Dion Hair Clinic</h3>
            <div className="w-16 h-0.5 bg-gray-800 mb-6 mx-auto md:mx-0 md:w-20 md:mb-8"></div>
            <p className="text-base text-gray-600 font-light md:text-xl">
              Spezialisiert auf moderne Haartransplantationen und Haarwuchstherapien
            </p>
          </div>
          <div className="w-full space-y-4 font-light text-gray-700 text-center md:text-left md:flex-1 md:space-y-6">
            <p>
              In der Dion Hair Clinic in Mönchengladbach haben wir es uns zur Aufgabe gemacht, Haarausfall der Vergangenheit angehören zu lassen.
            </p>
            <p>
              Wir verbinden modernste Technik und Ästhetik mit höchster medizinischer Kompetenz, um Ihnen erstklassige Behandlungen zu fairen Preisen anzubieten.
            </p>
            <p>
              Unser Team besteht aus erfahrenen Ärzten und Experten, mit über 15 Jahren Erfahrung im Bereich der Haartransplantation. Bei uns sind Sie ganz sicher in den besten Händen!
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="w-full max-w-7xl mx-auto px-4 py-12 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light mb-3 md:text-5xl md:mb-4">Warum Dion Hair Clinic?</h2>
          <p className="text-base text-gray-600 font-light md:text-xl">
            Führende Haarklinik für hochwertige Haartransplantationen mit modernster Technologie
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Experience Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:transform hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
              <Award className="w-8 h-8 text-gray-700" />
            </div>
            <h3 className="text-xl font-light mb-3">15+ Jahre Erfahrung</h3>
            <p className="text-gray-600 font-light">
              Langjährige Expertise und tausende erfolgreiche Behandlungen
            </p>
          </div>

          {/* Modern Technology Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:transform hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
              <Stethoscope className="w-8 h-8 text-gray-700" />
            </div>
            <h3 className="text-xl font-light mb-3">Modernste Technologie</h3>
            <p className="text-gray-600 font-light">
              Innovative Methoden und hochmoderne Ausstattung
            </p>
          </div>

          {/* Personal Care Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:transform hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-gray-700" />
            </div>
            <h3 className="text-xl font-light mb-3">Persönliche Betreuung</h3>
            <p className="text-gray-600 font-light">
              Individuelle Beratung und maßgeschneiderte Behandlungspläne
            </p>
          </div>

          {/* Quick Recovery Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:transform hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
              <Clock className="w-8 h-8 text-gray-700" />
            </div>
            <h3 className="text-xl font-light mb-3">Schnelle Erholung</h3>
            <p className="text-gray-600 font-light">
              Minimale Ausfallzeit und optimale Heilungsprozesse
            </p>
          </div>
        </div>
      </div>

      {/* Treatment Areas Section */}
      <div className="bg-gray-50 py-8 md:py-20">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl font-light mb-3 md:text-5xl md:mb-4">Behandlungsbereiche</h2>
            <p className="text-base text-gray-600 font-light md:text-xl">
              Professionelle Haartransplantationen für Kopf, Bart und Augenbrauen mit modernsten Methoden
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {/* Beard Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 md:rounded-3xl">
              <div className="h-48 overflow-hidden md:h-80">
                <img
                  src="https://images.unsplash.com/photo-1621607512022-6aecc4fed814?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Barttransplantation in der Dion Hair Clinic"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center md:p-8">
                <h3 className="text-lg font-light mb-3 md:text-2xl md:mb-4">Barthaare</h3>
                <p className="text-gray-600 mb-4 font-light md:mb-6">
                  Wünschen Sie sich einen volleren Bart ohne Lücken?
                </p>
                <button className="w-3/4 bg-[#333333] text-white px-6 py-3 rounded-lg hover:bg-[#444444] transition-colors text-sm font-light tracking-wider md:w-auto">
                  MEHR INFOS
                </button>
              </div>
            </div>

            {/* Head Hair Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 md:rounded-3xl">
              <div className="h-48 overflow-hidden md:h-80">
                <img
                  src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Haartransplantation am Kopf in der Dion Hair Clinic"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center md:p-8">
                <h3 className="text-lg font-light mb-3 md:text-2xl md:mb-4">Kopfhaare</h3>
                <p className="text-gray-600 mb-4 font-light md:mb-6">
                  Leiden Sie unter kahlen Stellen oder Geheimratsecken?
                </p>
                <button className="w-3/4 bg-[#333333] text-white px-6 py-3 rounded-lg hover:bg-[#444444] transition-colors text-sm font-light tracking-wider md:w-auto">
                  MEHR INFOS
                </button>
              </div>
            </div>

            {/* Eyebrows Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 md:rounded-3xl">
              <div className="h-48 overflow-hidden md:h-80">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Augenbrauentransplantation in der Dion Hair Clinic"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center md:p-8">
                <h3 className="text-lg font-light mb-3 md:text-2xl md:mb-4">Augenbrauen</h3>
                <p className="text-gray-600 mb-4 font-light md:mb-6">
                  Sie sind mit der Form oder Dichte Ihrer Augenbrauen unzufrieden?
                </p>
                <button className="w-3/4 bg-[#333333] text-white px-6 py-3 rounded-lg hover:bg-[#444444] transition-colors text-sm font-light tracking-wider md:w-auto">
                  MEHR INFOS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Treatment Process Section */}
      <div className="w-full max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light mb-3 md:text-5xl md:mb-4">Ihr Weg zu neuem Haar</h2>
          <p className="text-base text-gray-600 font-light md:text-xl">
            Professionelle Haartransplantation in 5 Schritten - von der Beratung bis zum Endergebnis
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:flex justify-center gap-4 mb-12">
          {processSteps.map((step, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`flex items-center gap-2 p-3 rounded-lg transition-all duration-300 ${
                activeStep === index
                  ? 'bg-[#333333] text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <div className="w-8 h-8 flex items-center justify-center">
                {step.icon}
              </div>
              <span className="font-light">{step.title}</span>
            </button>
          ))}
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden space-y-4">
          {processSteps.map((step, index) => (
            <div 
              key={index}
              ref={el => stepRefs.current[index] = el}
              className="scroll-mt-4"
            >
              {/* Step Button */}
              <button
                onClick={() => {
                  if (visibleSteps.has(index)) {
                    setVisibleSteps(prev => {
                      const newSet = new Set(prev);
                      newSet.delete(index);
                      return newSet;
                    });
                  } else {
                    setVisibleSteps(prev => {
                      const newSet = new Set(prev);
                      newSet.add(index);
                      return newSet;
                    });
                  }
                  setActiveStep(index);
                }}
                className={`w-full flex items-center gap-4 p-4 rounded-lg transition-all duration-300 ${
                  visibleSteps.has(index)
                    ? 'bg-[#333333] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  visibleSteps.has(index) ? 'bg-white text-[#333333]' : 'bg-gray-200'
                }`}>
                  {step.icon}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-light text-lg">{step.title}</div>
                  <div className={`text-sm ${visibleSteps.has(index) ? 'text-gray-200' : 'text-gray-500'}`}>
                    Schritt {index + 1} von {processSteps.length}
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform ${visibleSteps.has(index) ? 'rotate-180' : ''}`} />
              </button>

              {/* Expanded Content */}
              <div 
                className={`mt-4 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-500 ${
                  visibleSteps.has(index) ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <p className="text-gray-600 font-light">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Active Step Card */}
        <div className="hidden md:block max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 transform hover:scale-[1.02]">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={processSteps[activeStep].image}
                  alt={processSteps[activeStep].title}
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>
              <div className="p-6 md:w-1/2 md:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-[#333333] text-white">
                    {processSteps[activeStep].icon}
                  </div>
                  <h3 className="text-2xl font-light">{processSteps[activeStep].title}</h3>
                </div>
                <p className="text-gray-600 font-light text-lg">
                  {processSteps[activeStep].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
