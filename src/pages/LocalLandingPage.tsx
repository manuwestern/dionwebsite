import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackPageView } from '../utils/gtm';
import SEO from '../components/seo/SEO';
import CommonHeroSection from '../components/common/HeroSection';
import BenefitsSection from '../components/hairTransplantation/BenefitsSection';
import MethodsSection from '../components/hairTransplantation/MethodsSection';
import ProcessSection from '../components/hairTransplantation/ProcessSection';
import TestimonialsSection from '../components/hairTransplantation/TestimonialsSection';
import FAQSection from '../components/hairTransplantation/FAQSection';
import ContactSection from '../components/layout/ContactSection';

interface CityData {
  name: string;
  distance: string;
  travelTime: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  welcomeText: string;
}

const cityData: Record<string, CityData> = {
  koeln: {
    name: 'Köln',
    distance: '30 km',
    travelTime: '30 Minuten',
    metaTitle: 'Haartransplantation Köln | Günstige Haarklinik nahe Köln - Dion Hair Clinic',
    metaDescription: 'Günstige Haartransplantation nahe Köln ✓ Nur 30 Min. Fahrt ✓ Beste Haarklinik in NRW ✓ Faire Festpreise ✓ Modernste FUE & DHI-Technik ✓ Kostenlose Beratung',
    heroTitle: 'Haartransplantation\nnahe Köln',
    heroSubtitle: 'Ihre Haarklinik nur 30 Minuten von Köln entfernt',
    welcomeText: 'Suchen Sie eine günstige Haartransplantation in Köln? Die Dion Hair Clinic in Mönchengladbach ist nur 30 Minuten von Köln entfernt und bietet Ihnen erstklassige Haartransplantationen zu fairen Preisen. Als beste Haarklinik in NRW sind wir Ihre erste Wahl für natürliche Ergebnisse.'
  },
  duesseldorf: {
    name: 'Düsseldorf',
    distance: '25 km',
    travelTime: '30 Minuten',
    metaTitle: 'Haartransplantation Düsseldorf | Günstige Haarklinik nahe Düsseldorf',
    metaDescription: 'Günstige Haartransplantation nahe Düsseldorf ✓ Nur 30 Min. Fahrt ✓ Beste Haarklinik in NRW ✓ Faire Festpreise ✓ Modernste FUE & DHI ✓ Kostenlose Beratung',
    heroTitle: 'Haartransplantation\nnahe Düsseldorf',
    heroSubtitle: 'Ihre Haarklinik nur 30 Minuten von Düsseldorf entfernt',
    welcomeText: 'Suchen Sie eine günstige Haartransplantation in Düsseldorf? Die Dion Hair Clinic in Mönchengladbach ist nur 30 Minuten von Düsseldorf entfernt und bietet Ihnen erstklassige Haartransplantationen zu fairen Preisen. Als beste Haarklinik in NRW sind wir Ihre erste Wahl für natürliche Ergebnisse.'
  }
};

const LocalLandingPage: React.FC = () => {
  const { city } = useParams<{ city: string }>();
  const { t } = useTranslation('hairTransplantation');
  
  const cityInfo = city ? cityData[city] : null;
  
  useEffect(() => {
    if (cityInfo) {
      // Track page view with city-specific data
      trackPageView(
        `/haartransplantation-${city}`,
        `Haartransplantation ${cityInfo.name}`
      );
      
      // Update page title
      document.title = cityInfo.metaTitle;
    }
  }, [city, cityInfo]);
  
  if (!cityInfo) {
    return null;
  }
  
  return (
    <>
      <SEO 
        title={cityInfo.metaTitle}
        description={cityInfo.metaDescription}
        keywords={`Haartransplantation ${cityInfo.name}, günstige Haartransplantation ${cityInfo.name}, Haarklinik ${cityInfo.name}, beste Haarklinik ${cityInfo.name}, Haartransplantation NRW`}
      />
      
      <div className="relative bg-gradient-to-b from-[#F8FAFC] to-white">
        <CommonHeroSection
          title={cityInfo.heroTitle}
          subtitle={cityInfo.heroSubtitle}
          welcomeText={cityInfo.welcomeText}
          imageSrc="/images/Model_Haare.webp"
          imageAltMobile="Haartransplantation Experte"
          imageAltDesktop="Günstige Haartransplantation nahe {cityInfo.name}"
          translationNamespace="hairTransplantation"
          stats={[
            { value: '98%', label: 'stats.satisfiedPatients' },
            { value: '5.000+', label: 'stats.successfulTreatments' },
            { value: '15+', label: 'stats.yearsExperience' }
          ]}
          ctaLink="/kontakt"
          ctaText="buttons.consultation"
          enableHyphenation={true}
        />
      </div>
      
      {/* Location Info Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ihre Haarklinik in der Nähe von {cityInfo.name}
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-4xl font-bold text-primary mb-2">{cityInfo.distance}</div>
                <p className="text-gray-600">Entfernung von {cityInfo.name}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-4xl font-bold text-primary mb-2">{cityInfo.travelTime}</div>
                <p className="text-gray-600">Fahrzeit mit dem Auto</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-4xl font-bold text-primary mb-2">1,50€</div>
                <p className="text-gray-600">Ab pro Graft</p>
              </div>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Warum lange nach einer Haarklinik in {cityInfo.name} suchen? Die Dion Hair Clinic in Mönchengladbach 
              bietet Ihnen alle Vorteile einer erstklassigen Haartransplantation zu deutlich günstigeren Preisen 
              als in {cityInfo.name}. Durch unsere zentrale Lage in NRW sind wir optimal aus {cityInfo.name} erreichbar.
            </p>
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
      
      <div className="bg-[#F8FAFC]">
        <TestimonialsSection />
      </div>
      
      {/* City-specific FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Häufige Fragen zur Haartransplantation für Patienten aus {cityInfo.name}
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">
                  Warum sollte ich für meine Haartransplantation von {cityInfo.name} nach Mönchengladbach fahren?
                </h3>
                <p className="text-gray-700">
                  Die kurze Fahrt von nur {cityInfo.travelTime} lohnt sich: Sie erhalten dieselbe hohe Qualität 
                  wie in {cityInfo.name}, aber zu deutlich günstigeren Preisen. Unsere zentrale Lage in NRW 
                  macht uns zur idealen Wahl für Patienten aus {cityInfo.name}.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">
                  Wie komme ich von {cityInfo.name} zur Dion Hair Clinic?
                </h3>
                <p className="text-gray-700">
                  Die Anfahrt ist denkbar einfach: Mit dem Auto sind Sie in nur {cityInfo.travelTime} bei uns. 
                  Alternativ gibt es auch gute Bahnverbindungen von {cityInfo.name} nach Mönchengladbach. 
                  Gerne geben wir Ihnen detaillierte Anfahrtsbeschreibungen.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">
                  Bieten Sie spezielle Konditionen für Patienten aus {cityInfo.name}?
                </h3>
                <p className="text-gray-700">
                  Ja, wir haben attraktive Angebote für Patienten aus {cityInfo.name} und Umgebung. 
                  Kontaktieren Sie uns für ein kostenloses Beratungsgespräch und erfahren Sie mehr über 
                  unsere aktuellen Aktionen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="bg-gray-50">
        <ContactSection />
      </div>
    </>
  );
};

export default LocalLandingPage;
