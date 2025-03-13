import React from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16 md:py-24">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light mb-3 md:text-5xl md:mb-4">Kontaktieren Sie uns</h2>
          <p className="text-base text-gray-600 font-light md:text-xl">
            Wir sind für Sie da und beantworten gerne Ihre Fragen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <h3 className="text-2xl font-light mb-6">Kontaktmöglichkeiten</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-gray-100 rounded-full p-3 mr-4">
                  <Phone className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h4 className="text-lg font-light mb-1">Telefon</h4>
                  <p className="text-gray-600 font-light">
                    <a href="tel:+491702637818" className="hover:text-gray-900 transition-colors">
                      +49 170 2637818
                    </a>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Mo-Fr: 9:00 - 18:00 Uhr
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-gray-100 rounded-full p-3 mr-4">
                  <Mail className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h4 className="text-lg font-light mb-1">E-Mail</h4>
                  <p className="text-gray-600 font-light">
                    <a href="mailto:info@dionhairclinic.de" className="hover:text-gray-900 transition-colors">
                      info@dionhairclinic.de
                    </a>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Wir antworten innerhalb von 24 Stunden
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-gray-100 rounded-full p-3 mr-4">
                  <MessageCircle className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h4 className="text-lg font-light mb-1">WhatsApp</h4>
                  <p className="text-gray-600 font-light">
                    <a href="https://wa.me/491702637818" className="hover:text-gray-900 transition-colors">
                      +49 170 2637818
                    </a>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Schnelle Beratung per Chat
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <h4 className="text-lg font-light mb-3">Adresse</h4>
              <p className="text-gray-600 font-light">
                Dion Hair Clinic<br />
                Hindenburgstraße 123<br />
                41061 Mönchengladbach<br />
                Deutschland
              </p>
            </div>
          </div>

          {/* Free Hair Analysis CTA */}
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 rounded-2xl shadow-lg p-8 md:p-10 flex flex-col">
            <h3 className="text-2xl font-light mb-4">Kostenlose Haaranalyse</h3>
            <p className="text-gray-600 font-light mb-6">
              Lassen Sie Ihre Haarsituation von unseren Experten analysieren und erhalten Sie eine individuelle Beratung zu Ihren Behandlungsmöglichkeiten – völlig unverbindlich und kostenlos.
            </p>
            
            <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
              <h4 className="text-xl font-light mb-4">Das erwartet Sie:</h4>
              <ul className="space-y-3 text-gray-600 font-light">
                <li className="flex items-start">
                  <span className="inline-block w-5 h-5 bg-gray-300 rounded-full mr-3 flex-shrink-0 mt-0.5"></span>
                  <span>Detaillierte Analyse Ihrer Kopfhaut und Haarstruktur</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-5 h-5 bg-gray-300 rounded-full mr-3 flex-shrink-0 mt-0.5"></span>
                  <span>Persönliches Gespräch mit einem Haarspezialisten</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-5 h-5 bg-gray-300 rounded-full mr-3 flex-shrink-0 mt-0.5"></span>
                  <span>Individuelle Behandlungsempfehlungen</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-5 h-5 bg-gray-300 rounded-full mr-3 flex-shrink-0 mt-0.5"></span>
                  <span>Transparente Kostenübersicht</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-auto">
              <a 
                href="#" 
                className="block w-full bg-gray-800 text-white text-center py-4 px-6 rounded-xl font-light hover:bg-gray-700 transition-colors"
              >
                Jetzt kostenlose Haaranalyse vereinbaren
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
