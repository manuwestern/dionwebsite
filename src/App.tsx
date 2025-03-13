import React, { useState, useEffect, useRef } from 'react';
import TopBar from './components/home/TopBar';
import Navigation from './components/home/Navigation';
import HeroSection from './components/home/HeroSection';
import BenefitsSection from './components/home/BenefitsSection';
import TreatmentAreasSection from './components/home/TreatmentAreasSection';
import HolisticConceptSection from './components/home/HolisticConceptSection';
import TreatmentProcessSection from './components/home/TreatmentProcessSection';
import BeforeAfterSection from './components/home/BeforeAfterSection';
import TestimonialsSection from './components/home/TestimonialsSection';
import FooterSection from './components/home/FooterSection';

function App() {
  const [visibleSteps, setVisibleSteps] = useState(new Set<number>());
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastScrollY = useRef(0);
  const scrollDirection = useRef('down');

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
                    for (let i = 0; i < 5; i++) {
                      if (i !== index && i !== index - 1 && i !== index + 1) {
                        newSet.delete(i);
                      }
                    }
                  }
                  return newSet;
                });
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
                    for (let i = index; i < 5; i++) {
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
      <TopBar />
      <Navigation />
      <HeroSection />
      <BenefitsSection />
      <TreatmentAreasSection />
      <HolisticConceptSection />
      <TreatmentProcessSection stepRefs={stepRefs} visibleSteps={visibleSteps} />
      <BeforeAfterSection />
      <TestimonialsSection />
      <FooterSection />
    </div>
  );
}

export default App;
