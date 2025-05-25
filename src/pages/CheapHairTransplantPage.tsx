import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { trackPageView } from '../utils/gtm';
import SEO from '../components/seo/SEO';
import CommonHeroSection from '../components/common/HeroSection';
import BenefitsSection from '../components/hairTransplantation/BenefitsSection';
import MethodsSection from '../components/hairTransplantation/MethodsSection';
import ProcessSection from '../components/hairTransplantation/ProcessSection';
import TestimonialsSection from '../components/hairTransplantation/TestimonialsSection';
import ContactSection from '../components/layout/ContactSection';

const CheapHairTransplantPage: React.FC = () => {
  const { t } = useTranslation('hairTransplantation');
  
  useEffect(() => {
    // Track page view
    trackPageView(
      '/guenstige-haartransplantation',
      'Günstige Haartransplantation'
    );
  }, []);
  
  const metaTitle = 'Günstige Haartransplantation Deutschland | Ab 1,50€/Graft - Beste Haarklinik';
  const metaDescription = 'Günstige Haartransplantation in Deutschland ab 1,50€ pro Graft ✓ Beste Haarklinik in NRW ✓ Faire Preise ohne Qualitätsverlust ✓ Modernste FUE & DHI-Technik ✓ 15+ Jahre Erfahrung';
  
  return (
    <>
      <SEO 
        title={metaTitle}
        description={metaDescription}
        keywords="günstige Haartransplantation, Haartransplantation Preise, günstige Haarklinik, beste Haarklinik, Haartransplantation Deutschland, Haartransplantation NRW, Haartransplantation Köln, Haartransplantation Düsseldorf"
      />
      
      <div className="relative bg-gradient-to-b from-[#F8FAFC] to-white">
        <CommonHeroSection
          title="Günstige\nHaartransplantation"
          subtitle="Faire Preise ab 1,50€ pro Graft"
          welcomeText="Suchen Sie eine günstige Haartransplantation ohne Qualitätsverlust? Die Dion Hair Clinic bietet Ihnen erstklassige Haartransplantationen zu fairen Preisen. Als beste Haarklinik in NRW garantieren wir höchste Qualität zu transparenten Konditionen."
          imageSrc="/images/Model_Haare.webp"
          imageAltMobile="Günstige Haartransplantation"
          imageAltDesktop="Günstige Haartransplantation in Deutschland"
          translationNamespace="hairTransplantation"
          stats={[
            { value: 'Ab 1,50€', label: 'Pro Graft' },
            { value: '0%', label: 'Versteckte Kosten' },
            { value: '100%', label: 'Preistransparenz' }
          ]}
          ctaLink="/kontakt"
          ctaText="buttons.consultation"
          enableHyphenation={true}
        />
      </div>
      
      {/* Pricing Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Transparente Preise für Ihre Haartransplantation
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 rounded-lg p-8">
                <h3 className="text-2xl font-semibold mb-4">Unsere Preisvorteile</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Faire Preise ab 1,50€ pro Graft</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Keine versteckten Kosten</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Transparente Preiskalkulation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Finanzierungsmöglichkeiten verfügbar</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Kostenlose Erstberatung</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-8">
                <h3 className="text-2xl font-semibold mb-4">Preisbeispiele</h3>
                <div className="space-y-4">
                  <div>
                    <div className="font-semibold">Kleine Behandlung (1.000 Grafts)</div>
                    <div className="text-2xl text-primary">Ab 1.500€</div>
                  </div>
                  <div>
                    <div className="font-semibold">Mittlere Behandlung (2.500 Grafts)</div>
                    <div className="text-2xl text-primary">Ab 3.750€</div>
                  </div>
                  <div>
                    <div className="font-semibold">Große Behandlung (4.000 Grafts)</div>
                    <div className="text-2xl text-primary">Ab 6.000€</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#F8FAFC] rounded-lg p-8 text-center">
              <h3 className="text-2xl font-semibold mb-4">
                Warum sind wir günstiger als andere Kliniken?
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                Durch unseren Standort in Mönchengladbach haben wir niedrigere Betriebskosten als Kliniken 
                in Großstädten wie Köln oder Düsseldorf. Diese Ersparnis geben wir direkt an unsere Patienten 
                weiter - ohne Kompromisse bei der Qualität.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">-30%</div>
                  <p className="text-gray-600">Günstiger als in Großstädten</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">100%</div>
                  <p className="text-gray-600">Gleiche Qualität</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">0€</div>
                  <p className="text-gray-600">Beratungskosten</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="bg-white">
        <BenefitsSection />
      </div>
      
      <div className="bg-gray-50">
        <MethodsSection />
      </div>
      
      <div className="bg-white">
        <ProcessSection />
      </div>
      
      {/* Price FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Häufige Fragen zu den Kosten
            </h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">
                  Sind in Ihren Preisen wirklich alle Kosten enthalten?
                </h3>
                <p className="text-gray-700">
                  Ja, unsere Preise sind all-inclusive. Sie beinhalten die komplette Behandlung, 
                  alle Medikamente, die Nachsorge und sogar die Kontrolltermine. Es gibt keine 
                  versteckten Kosten oder nachträgliche Gebühren.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">
                  Bieten Sie Finanzierungsmöglichkeiten an?
                </h3>
                <p className="text-gray-700">
                  Ja, wir bieten verschiedene Finanzierungsmöglichkeiten an, damit Sie Ihre 
                  Haartransplantation bequem in Raten zahlen können. Sprechen Sie uns bei der 
                  Beratung darauf an, wir finden gemeinsam die beste Lösung für Sie.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">
                  Warum sind Ihre Preise günstiger als bei anderen Kliniken?
                </h3>
                <p className="text-gray-700">
                  Unser Standort in Mönchengladbach ermöglicht uns niedrigere Betriebskosten als 
                  Kliniken in teuren Großstädten. Außerdem arbeiten wir sehr effizient und haben 
                  durch unsere langjährige Erfahrung optimierte Prozesse. Diese Vorteile geben wir 
                  in Form günstiger Preise an Sie weiter.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">
                  Muss ich eine Anzahlung leisten?
                </h3>
                <p className="text-gray-700">
                  Eine kleine Anzahlung zur Terminreservierung ist üblich, aber nicht zwingend 
                  erforderlich. Die genauen Zahlungsmodalitäten besprechen wir individuell mit 
                  Ihnen bei der Beratung.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="bg-[#F8FAFC]">
        <TestimonialsSection />
      </div>
      
      <div className="bg-gray-50">
        <ContactSection />
      </div>
    </>
  );
};

export default CheapHairTransplantPage;
