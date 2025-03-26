import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, CheckSquare, FileText, Camera, Bell, Smartphone, Shield, ArrowRight } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, tracking, lineHeight } from '../../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../utils/buttons';

const CareSection: React.FC = () => {
  const { t } = useTranslation(['hairTransplantation', 'common']);

  // Features of the Care+ program
  const features = [
    {
      icon: <Calendar className="w-6 h-6 text-[#7BA7C2]" />,
      title: "Terminplanung",
      description: "Alle wichtigen Termine vor und nach der Behandlung im Überblick"
    },
    {
      icon: <CheckSquare className="w-6 h-6 text-[#7BA7C2]" />,
      title: "Checklisten",
      description: "Personalisierte To-Do-Listen für optimale Vor- und Nachsorge"
    },
    {
      icon: <FileText className="w-6 h-6 text-[#7BA7C2]" />,
      title: "Anleitungen",
      description: "Detaillierte Pflegeanleitungen, z.B. zur Haarwäsche nach der Transplantation"
    },
    {
      icon: <Camera className="w-6 h-6 text-[#7BA7C2]" />,
      title: "Fortschrittsdokumentation",
      description: "Dokumentieren Sie Ihren Wachstumsverlauf mit Fotos und Notizen"
    },
    {
      icon: <Bell className="w-6 h-6 text-[#7BA7C2]" />,
      title: "Erinnerungen",
      description: "Automatische Benachrichtigungen für wichtige Pflegeschritte"
    },
    {
      icon: <Smartphone className="w-6 h-6 text-[#7BA7C2]" />,
      title: "Mobile App",
      description: "Zugriff auf alle Funktionen über unsere benutzerfreundliche App"
    }
  ];

  return (
    <div className="py-16 md:py-24 relative">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Header with gradient underline */}
        <div className="text-center mb-16">
          <div className="inline-block mb-3">
            <h2 className={`${textStyle.sectionTitle}`} lang="de">Dion Hair Clinic Care<span className={`${textColor.primary}`}>+</span></h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-2 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-4`}>
            Ihr persönlicher Begleiter für eine optimale Vor- und Nachsorge
          </p>
        </div>

        {/* Main content area */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left side: App mockup */}
          <div className="lg:w-1/2 relative">
            <div className="bg-gradient-to-br from-[#7BA7C2] to-[#7BA7C2]/70 rounded-3xl p-1 shadow-xl max-w-sm mx-auto">
              <div className="bg-white rounded-3xl overflow-hidden">
                {/* App header */}
                <div className="bg-[#7BA7C2] text-white p-4">
                  <div className="flex items-center justify-between">
                    <h3 className={`${fontSize.lg} ${fontWeight.light}`}>Dion Care+</h3>
                    <Shield className="w-5 h-5" />
                  </div>
                </div>
                
                {/* App content mockup */}
                <div className="p-4">
                  {/* Progress tracker */}
                  <div className="mb-6">
                    <h4 className={`${fontSize.sm} ${textColor.light} mb-2`}>Ihr Fortschritt</h4>
                    <div className="w-full bg-gray-100 h-2 rounded-full">
                      <div className="bg-[#7BA7C2] h-2 rounded-full w-[65%]"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Tag 1</span>
                      <span>3 Monate</span>
                      <span>12 Monate</span>
                    </div>
                  </div>
                  
                  {/* Today's tasks */}
                  <div className="mb-6">
                    <h4 className={`${fontSize.sm} ${fontWeight.medium} ${textColor.dark} mb-2`}>Heutige Aufgaben</h4>
                    <div className="space-y-2">
                      <div className="flex items-center p-2 bg-[#7BA7C2]/5 rounded-lg">
                        <div className="w-5 h-5 rounded-full border-2 border-[#7BA7C2] flex items-center justify-center mr-2">
                          <div className="w-2 h-2 bg-[#7BA7C2] rounded-full"></div>
                        </div>
                        <span className={`${fontSize.sm}`}>Sanfte Haarwäsche mit speziellem Shampoo</span>
                      </div>
                      <div className="flex items-center p-2 bg-[#7BA7C2]/5 rounded-lg">
                        <div className="w-5 h-5 rounded-full border-2 border-[#7BA7C2] flex items-center justify-center mr-2">
                          <div className="w-2 h-2 bg-[#7BA7C2] rounded-full"></div>
                        </div>
                        <span className={`${fontSize.sm}`}>Feuchtigkeitsspray anwenden</span>
                      </div>
                      <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 mr-2"></div>
                        <span className={`${fontSize.sm} ${textColor.light}`}>Fortschrittsfoto aufnehmen</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Next appointment */}
                  <div className="bg-[#7BA7C2]/10 p-3 rounded-xl">
                    <h4 className={`${fontSize.sm} ${fontWeight.medium} ${textColor.primary} mb-1`}>Nächster Termin</h4>
                    <p className={`${fontSize.sm}`}>Kontrolluntersuchung: 15. April 2025, 14:00 Uhr</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -z-10 w-64 h-64 bg-[#7BA7C2]/5 rounded-full -bottom-10 -left-10"></div>
            <div className="absolute -z-10 w-32 h-32 bg-[#7BA7C2]/10 rounded-full -top-5 right-10"></div>
          </div>
          
          {/* Right side: Features */}
          <div className="lg:w-1/2">
            <h3 className={`${textStyle.primaryHeading} mb-6 text-center md:text-left`}>Ihr persönlicher Begleiter für den gesamten Behandlungsprozess</h3>
            <p className={`${textStyle.bodyText} mb-4 text-center md:text-left px-2 md:px-0`}>
              Mit Dion Hair Clinic Care+ bieten wir Ihnen eine umfassende Smartphone-App, die Sie durch den gesamten Prozess Ihrer Haartransplantation führt - von der Vorbereitung über den Eingriff bis hin zur langfristigen Nachsorge.
            </p>
            <div className="flex flex-col md:flex-row items-center md:items-start mb-8 bg-[#7BA7C2]/5 p-3 rounded-lg text-center md:text-left">
              <div className="flex space-x-3 mb-3 md:mb-0 md:mr-4">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#7BA7C2]" fill="currentColor">
                  <path d="M17.05,20.28c-.98,0-1.79-.8-1.79-1.78V5.5c0-.98,.8-1.78,1.79-1.78s1.79,.8,1.79,1.78V18.5c0,.98-.8,1.78-1.79,1.78Zm-4.46,0c-.98,0-1.79-.8-1.79-1.78V5.5c0-.98,.8-1.78,1.79-1.78s1.79,.8,1.79,1.78V18.5c0,.98-.8,1.78-1.79,1.78Zm-4.46,0c-.98,0-1.79-.8-1.79-1.78V5.5c0-.98,.8-1.78,1.79-1.78s1.79,.8,1.79,1.78V18.5c0,.98-.8,1.78-1.79,1.78Z"/>
                </svg>
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#7BA7C2]" fill="currentColor">
                  <path d="M17.03,22H6.97c-1.63,0-2.97-1.34-2.97-2.97V4.97c0-1.63,1.34-2.97,2.97-2.97h10.05c1.63,0,2.97,1.34,2.97,2.97v14.05c0,1.63-1.34,2.97-2.97,2.97ZM12,18.75c.69,0,1.25-.56,1.25-1.25s-.56-1.25-1.25-1.25-1.25,.56-1.25,1.25,.56,1.25,1.25,1.25Z"/>
                </svg>
              </div>
              <p className={`${fontSize.sm} ${textColor.dark}`}>
                <span className={fontWeight.medium}>Verfügbar für Android und iPhone</span> – Laden Sie die App kostenlos im Google Play Store oder Apple App Store herunter.
              </p>
            </div>
            
            {/* Features grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
                  <div className="mb-3 md:mb-0 md:mr-4 md:mt-1">
                    <div className="w-10 h-10 rounded-full bg-[#7BA7C2]/10 flex items-center justify-center">
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className={`${fontSize.lg} ${fontWeight.normal} ${textColor.dark} mb-1`}>{feature.title}</h4>
                    <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed}`}>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* CTA buttons */}
            <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
              <button className={`${buttonStyle.black} shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}>
                <span className={buttonRippleClass}></span>
                <span className={`relative flex items-center ${textStyle.button} uppercase tracking-widest`}>
                  <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2" fill="currentColor">
                    <path d="M17.03,22H6.97c-1.63,0-2.97-1.34-2.97-2.97V4.97c0-1.63,1.34-2.97,2.97-2.97h10.05c1.63,0,2.97,1.34,2.97,2.97v14.05c0,1.63-1.34,2.97-2.97,2.97ZM12,18.75c.69,0,1.25-.56,1.25-1.25s-.56-1.25-1.25-1.25-1.25,.56-1.25,1.25,.56,1.25,1.25,1.25Z"/>
                  </svg>
                  App Store
                </span>
              </button>
              <button className={`${buttonStyle.primary} shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}>
                <span className={buttonRippleClass}></span>
                <span className={`relative flex items-center ${textStyle.button} uppercase tracking-widest`}>
                  <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2" fill="currentColor">
                    <path d="M17.05,20.28c-.98,0-1.79-.8-1.79-1.78V5.5c0-.98,.8-1.78,1.79-1.78s1.79,.8,1.79,1.78V18.5c0,.98-.8,1.78-1.79,1.78Zm-4.46,0c-.98,0-1.79-.8-1.79-1.78V5.5c0-.98,.8-1.78,1.79-1.78s1.79,.8,1.79,1.78V18.5c0,.98-.8,1.78-1.79,1.78Zm-4.46,0c-.98,0-1.79-.8-1.79-1.78V5.5c0-.98,.8-1.78,1.79-1.78s1.79,.8,1.79,1.78V18.5c0,.98-.8,1.78-1.79,1.78Z"/>
                  </svg>
                  Google Play
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareSection;
