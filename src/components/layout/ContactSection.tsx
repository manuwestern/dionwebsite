import React, { useState, useEffect } from 'react';
import { Phone, Mail, MessageCircle, MapPin, ArrowRight, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { textStyle, fontSize, fontWeight, gradientUnderline, tracking, lineHeight } from '../../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../utils/buttons';
import { useTheme } from '../../utils/ThemeProvider';

// Hilfsfunktionen für Typografie-Einstellungen
const getFontWeight = (weightName: string): number => {
  switch (weightName) {
    case 'light': return 300;
    case 'normal': return 400;
    case 'medium': return 500;
    case 'semibold': return 600;
    case 'bold': return 700;
    default: return 400;
  }
};

const getLineHeight = (lineHeightName: string): number => {
  switch (lineHeightName) {
    case 'tight': return 1.25;
    case 'normal': return 1.5;
    case 'relaxed': return 1.625;
    case 'loose': return 2;
    default: return 1.5;
  }
};

const getLetterSpacing = (letterSpacingName: string): string => {
  switch (letterSpacingName) {
    case 'tighter': return '-0.05em';
    case 'tight': return '-0.025em';
    case 'normal': return '0';
    case 'wide': return '0.025em';
    case 'wider': return '0.05em';
    case 'elegant': return '0.1em';
    default: return '0';
  }
};

const ContactSection: React.FC = () => {
  const { t } = useTranslation(['layout', 'common']);
  const [isVisible, setIsVisible] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { activeTheme } = useTheme();

  // Typografie- und UI-Elemente-Einstellungen aus dem Theme
  const typographySettings = activeTheme.typography || {
    fontSizeH1: '3rem',
    fontSizeH2: '2.25rem',
    fontSizeBase: '1rem',
    fontWeightHeadings: 'light',
    fontWeightBody: 'normal',
    fontWeightButtons: 'medium',
    lineHeightHeadings: 'tight',
    lineHeightBody: 'relaxed',
    letterSpacingHeadings: 'wider',
    letterSpacingButtons: 'wider'
  };

  const uiElementsSettings = activeTheme.uiElements || {
    shadowIntensity: 6,
    shadowBlur: 8,
    shadowSpread: 0,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    borderStandard: 1,
    borderHighlighted: 2,
    borderRadius: 8
  };

  // Berechne den Schatten-Stil basierend auf den Einstellungen
  const shadowStyle = `0 ${uiElementsSettings.shadowIntensity}px ${uiElementsSettings.shadowBlur}px ${uiElementsSettings.shadowSpread}px ${uiElementsSettings.shadowColor}`;

  // Trigger entrance animations
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form
      setFormName('');
      setFormEmail('');
      setFormPhone('');
      setFormMessage('');
    }, 1500);
  };

  return (
    <section className="py-20 relative overflow-hidden"
             style={{ background: `linear-gradient(to bottom, white, ${activeTheme.backgroundLight})` }}>
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] z-0" 
        style={{ 
          backgroundImage: 'url("/images/dionhairclinic_bg.svg")',
          backgroundSize: '200px',
          backgroundRepeat: 'repeat'
        }}
      ></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`${textStyle.sectionTitle} mb-4`}
              style={{ 
                color: activeTheme.textPrimary,
                fontSize: typographySettings.fontSizeH2,
                fontWeight: getFontWeight(typographySettings.fontWeightHeadings),
                lineHeight: getLineHeight(typographySettings.lineHeightHeadings),
                letterSpacing: getLetterSpacing(typographySettings.letterSpacingHeadings)
              }}>{t('contactSection.title')}</h2>
          <div className="w-64 mx-auto mb-6 h-px" 
               style={{ background: `linear-gradient(to right, transparent, ${activeTheme.divider}, transparent)` }}></div>
          <p className={`max-w-2xl mx-auto`}
             style={{ 
               color: activeTheme.textSecondary,
               fontSize: typographySettings.fontSizeBase,
               fontWeight: getFontWeight(typographySettings.fontWeightBody),
               lineHeight: getLineHeight(typographySettings.lineHeightBody)
             }}>
            Beginnen Sie Ihre Reise zu vollerem Haar mit einem persönlichen Gespräch.
            Unsere Experten stehen Ihnen für alle Fragen zur Verfügung.
          </p>
        </div>

        {/* Contact Content */}
        <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white overflow-hidden"
               style={{ 
                 borderRadius: `${uiElementsSettings.borderRadius}px`,
                 boxShadow: shadowStyle
               }}>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left side - Contact form */}
              <div className="p-8 md:p-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center"
                       style={{ backgroundColor: `${activeTheme.accent}10` }}>
                    <Calendar className="w-6 h-6" style={{ color: activeTheme.accent }} />
                  </div>
                  <h3 style={{ 
                    color: activeTheme.textPrimary,
                    fontSize: typographySettings.fontSizeH2,
                    fontWeight: getFontWeight(typographySettings.fontWeightHeadings)
                  }}>Kostenlose Beratung</h3>
                </div>
                
                {isSubmitted ? (
                  <div className="bg-green-50 border border-green-100 p-8 text-center"
                       style={{ borderRadius: `${uiElementsSettings.borderRadius}px` }}>
                    <h4 className="mb-4" 
                        style={{ 
                          color: activeTheme.textPrimary,
                          fontSize: '1.25rem',
                          fontWeight: getFontWeight(typographySettings.fontWeightHeadings)
                        }}>Vielen Dank für Ihre Anfrage!</h4>
                    <p className="mb-6"
                       style={{ 
                         color: activeTheme.textSecondary,
                         fontSize: typographySettings.fontSizeBase,
                         fontWeight: getFontWeight(typographySettings.fontWeightBody),
                         lineHeight: getLineHeight(typographySettings.lineHeightBody)
                       }}>
                      Wir haben Ihre Nachricht erhalten und werden uns innerhalb von 24 Stunden bei Ihnen melden.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="inline-flex items-center justify-center px-6 py-3 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                      style={{ borderRadius: `${uiElementsSettings.borderRadius}px` }}
                    >
                      Neue Anfrage senden
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block mb-1" 
                               style={{ 
                                 color: activeTheme.textPrimary,
                                 fontSize: '0.875rem',
                                 fontWeight: getFontWeight(typographySettings.fontWeightBody)
                               }}>Name</label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-4 py-3 border border-gray-200 focus:border-transparent focus:ring-2 transition-all"
                          style={{ 
                            "--tw-ring-color": activeTheme.accent,
                            borderRadius: `${uiElementsSettings.borderRadius}px`
                          } as React.CSSProperties}
                          placeholder="Ihr Name"
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block mb-1" 
                               style={{ 
                                 color: activeTheme.textPrimary,
                                 fontSize: '0.875rem',
                                 fontWeight: getFontWeight(typographySettings.fontWeightBody)
                               }}>E-Mail</label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-3 border border-gray-200 focus:ring-2 focus:border-transparent transition-all"
                          style={{ 
                            "--tw-ring-color": activeTheme.accent,
                            borderRadius: `${uiElementsSettings.borderRadius}px`
                          } as React.CSSProperties}
                          placeholder="Ihre E-Mail-Adresse"
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="phone" className="block mb-1" 
                             style={{ 
                               color: activeTheme.textPrimary,
                               fontSize: '0.875rem',
                               fontWeight: getFontWeight(typographySettings.fontWeightBody)
                             }}>Telefon</label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full px-4 py-3 border border-gray-200 focus:ring-2 focus:border-transparent transition-all"
                        style={{ 
                          "--tw-ring-color": activeTheme.accent,
                          borderRadius: `${uiElementsSettings.borderRadius}px`
                        } as React.CSSProperties}
                        placeholder="Ihre Telefonnummer"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block mb-1" 
                             style={{ 
                               color: activeTheme.textPrimary,
                               fontSize: '0.875rem',
                               fontWeight: getFontWeight(typographySettings.fontWeightBody)
                             }}>Ihre Nachricht</label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 focus:ring-2 focus:border-transparent transition-all"
                        style={{ 
                          "--tw-ring-color": activeTheme.accent,
                          borderRadius: `${uiElementsSettings.borderRadius}px`
                        } as React.CSSProperties}
                        placeholder="Beschreiben Sie Ihr Anliegen oder stellen Sie Ihre Fragen"
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className={`${buttonStyle.primary} w-full disabled:opacity-70 transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}
                      style={{ 
                        background: `linear-gradient(to right, ${activeTheme.accent}, ${activeTheme.accentDark})`,
                        color: 'white',
                        boxShadow: shadowStyle,
                        borderRadius: `${uiElementsSettings.borderRadius}px`,
                        fontWeight: getFontWeight(typographySettings.fontWeightButtons),
                        letterSpacing: getLetterSpacing(typographySettings.letterSpacingButtons)
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span className="uppercase">Wird gesendet...</span>
                        </>
                      ) : (
                        <>
                          <span className={buttonRippleClass}></span>
                          <span className={`relative flex items-center ${textStyle.button} uppercase`}>
                            Beratungstermin vereinbaren
                            <ArrowRight className={buttonArrowClass} />
                          </span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
              
              {/* Right side - Contact info */}
              <div className="p-8 md:p-12 flex flex-col" style={{ backgroundColor: `${activeTheme.accent}05` }}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center"
                       style={{ backgroundColor: `${activeTheme.accent}10` }}>
                    <MapPin className="w-6 h-6" style={{ color: activeTheme.accent }} />
                  </div>
                  <h3 style={{ 
                    color: activeTheme.textPrimary,
                    fontSize: typographySettings.fontSizeH2,
                    fontWeight: getFontWeight(typographySettings.fontWeightHeadings)
                  }}>Kontaktinformationen</h3>
                </div>
                
                <div className="space-y-8 mb-auto">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                         style={{ backgroundColor: `${activeTheme.accent}10` }}>
                      <Phone className="w-5 h-5" style={{ color: activeTheme.accent }} />
                    </div>
                    <div>
                      <h4 className="mb-1" 
                          style={{ 
                            color: activeTheme.textPrimary,
                            fontSize: '1.125rem',
                            fontWeight: getFontWeight(typographySettings.fontWeightHeadings)
                          }}>{t('contact.phone', { ns: 'common' })}</h4>
                      <a href="tel:+491702637818" className="transition-colors"
                         style={{ 
                           color: activeTheme.textSecondary,
                           fontSize: typographySettings.fontSizeBase,
                           fontWeight: getFontWeight(typographySettings.fontWeightBody)
                         }}>
                        +49 170 2637818
                      </a>
                      <p className="mt-1" 
                         style={{ 
                           color: activeTheme.textLight,
                           fontSize: '0.875rem',
                           lineHeight: getLineHeight(typographySettings.lineHeightBody)
                         }}>
                        {t('contact.businessHours', { ns: 'common' })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                         style={{ backgroundColor: `${activeTheme.accent}10` }}>
                      <MessageCircle className="w-5 h-5" style={{ color: activeTheme.accent }} />
                    </div>
                    <div>
                      <h4 className="mb-1" 
                          style={{ 
                            color: activeTheme.textPrimary,
                            fontSize: '1.125rem',
                            fontWeight: getFontWeight(typographySettings.fontWeightHeadings)
                          }}>{t('contact.whatsapp', { ns: 'common' })}</h4>
                      <a href="https://wa.me/491702637818" className="transition-colors"
                         style={{ 
                           color: activeTheme.textSecondary,
                           fontSize: typographySettings.fontSizeBase,
                           fontWeight: getFontWeight(typographySettings.fontWeightBody)
                         }}>
                        +49 170 2637818
                      </a>
                      <p className="mt-1" 
                         style={{ 
                           color: activeTheme.textLight,
                           fontSize: '0.875rem',
                           lineHeight: getLineHeight(typographySettings.lineHeightBody)
                         }}>
                        {t('contact.quickConsultation', { ns: 'common' })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                         style={{ backgroundColor: `${activeTheme.accent}10` }}>
                      <Mail className="w-5 h-5" style={{ color: activeTheme.accent }} />
                    </div>
                    <div>
                      <h4 className="mb-1" 
                          style={{ 
                            color: activeTheme.textPrimary,
                            fontSize: '1.125rem',
                            fontWeight: getFontWeight(typographySettings.fontWeightHeadings)
                          }}>{t('contact.email', { ns: 'common' })}</h4>
                      <a href="mailto:info@dionhairclinic.de" className="transition-colors"
                         style={{ 
                           color: activeTheme.textSecondary,
                           fontSize: typographySettings.fontSizeBase,
                           fontWeight: getFontWeight(typographySettings.fontWeightBody)
                         }}>
                        info@dionhairclinic.de
                      </a>
                      <p className="mt-1" 
                         style={{ 
                           color: activeTheme.textLight,
                           fontSize: '0.875rem',
                           lineHeight: getLineHeight(typographySettings.lineHeightBody)
                         }}>
                        {t('contact.responseTime', { ns: 'common' })}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 pt-8 border-t" style={{ borderColor: `${activeTheme.accent}20` }}>
                  <h4 className="mb-3" 
                      style={{ 
                        color: activeTheme.textPrimary,
                        fontSize: '1.125rem',
                        fontWeight: getFontWeight(typographySettings.fontWeightHeadings)
                      }}>{t('contactSection.address.title')}</h4>
                  <p style={{ 
                    color: activeTheme.textSecondary,
                    fontSize: typographySettings.fontSizeBase,
                    fontWeight: getFontWeight(typographySettings.fontWeightBody),
                    lineHeight: getLineHeight(typographySettings.lineHeightBody)
                  }}>
                    {t('contactSection.address.line1')}<br />
                    {t('contactSection.address.line2')}<br />
                    {t('contactSection.address.line3')}<br />
                    {t('contactSection.address.line4')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
