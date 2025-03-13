import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const FooterSection: React.FC = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white py-16">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="col-span-1">
            <div className="text-2xl font-light tracking-wider mb-4">DION<span className="font-extralight">HAIR</span></div>
            <p className="text-sm font-light text-gray-300 mb-6">
              Premium-Spezialklinik für Haarwiederherstellung mit ganzheitlichen Behandlungsansätzen.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h3 className="text-lg font-light mb-4">Dienstleistungen</h3>
            <ul className="space-y-2 text-sm font-light text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Haartransplantation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Barthaartransplantation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Augenbrauentransplantation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Haarausfalltherapie</a></li>
            </ul>
          </div>

          {/* Information */}
          <div className="col-span-1">
            <h3 className="text-lg font-light mb-4">Informationen</h3>
            <ul className="space-y-2 text-sm font-light text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Über uns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ergebnisse</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Preisrechner</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pflegeanleitung</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Karriere</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-light mb-4">Kontakt</h3>
            <address className="not-italic text-sm font-light text-gray-300 space-y-2">
              <p>Hindenburgstraße 123</p>
              <p>41061 Mönchengladbach</p>
              <p>Deutschland</p>
              <p className="mt-4">+49 151 2345 6789</p>
              <p><a href="mailto:info@dionhairclinic.de" className="hover:text-white transition-colors">info@dionhairclinic.de</a></p>
            </address>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Copyright and Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 font-light">
          <div>
            © {new Date().getFullYear()} Dion Hair Clinic. Alle Rechte vorbehalten.
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Impressum</a>
            <a href="#" className="hover:text-white transition-colors">Datenschutz</a>
            <a href="#" className="hover:text-white transition-colors">AGB</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
