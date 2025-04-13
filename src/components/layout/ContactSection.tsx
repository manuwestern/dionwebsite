import React, { useState, useEffect } from 'react';
import { Phone, Mail, MessageCircle, MapPin, ArrowRight, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, lineHeight } from '../../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../utils/buttons';

const ContactSection: React.FC = () => {
  const { t } = useTranslation(['layout', 'common']);
  const [isVisible, setIsVisible] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formConsent, setFormConsent] = useState(false);
  const [formNewsletter, setFormNewsletter] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Trigger entrance animations
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Send form data to Pabbly webhook
      const response = await fetch('https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTY4MDYzNjA0MzI1MjY5NTUzNTUxM2Ei_pc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          phone: formPhone || 'Nicht angegeben',
          message: formMessage,
          formType: 'Footer-Kontaktformular',
          newsletter: formNewsletter,
          timestamp: new Date().toISOString(),
          source: window.location.href
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Fehler beim Senden: ${response.status}`);
      }
      
      // Form submission successful
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form
      setFormName('');
      setFormEmail('');
      setFormPhone('');
      setFormMessage('');
      setFormConsent(false);
      setFormNewsletter(true);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError('Es gab ein Problem beim Senden des Formulars. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt per Telefon.');
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] z-0 bg-[url('/images/dionhairclinic_bg.svg')] bg-[length:200px_200px] bg-repeat"
      ></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`${textStyle.sectionTitle} mb-4`}>{t('contactSection.title')}</h2>
          <div className={`${gradientUnderline.primary} w-64 mx-auto mb-6`}></div>
          <p className={`${textStyle.sectionSubtitle} max-w-2xl mx-auto`}>
            {t('contactSection.subtitle')}
          </p>
        </div>

        {/* Contact Content */}
        <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left side - Contact form */}
              <div className="p-8 md:p-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-[#7BA7C2]/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-[#7BA7C2]" />
                  </div>
                  <h3 className={`${fontSize.h3} ${fontWeight.light} ${textColor.dark}`}>{t('contactSection.form.title')}</h3>
                </div>
                
                {isSubmitted ? (
                  <div className="bg-green-50 border border-green-100 rounded-xl p-8 text-center">
                    <h4 className={`${fontSize.h4} ${fontWeight.light} ${textColor.dark} mb-4`}>{t('contactSection.form.success.title')}</h4>
                    <p className={`${textStyle.bodyText} ${lineHeight.relaxed} mb-6`}>
                      {t('contactSection.form.success.message')}
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      {t('contactSection.form.success.newRequest')}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className={`block ${fontSize.sm} ${fontWeight.medium} ${textColor.dark} mb-1`}>{t('contactSection.form.name.label')}</label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#7BA7C2] focus:border-transparent transition-all"
                          placeholder={t('contactSection.form.name.placeholder')}
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className={`block ${fontSize.sm} ${fontWeight.medium} ${textColor.dark} mb-1`}>{t('contactSection.form.email.label')}</label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#7BA7C2] focus:border-transparent transition-all"
                          placeholder={t('contactSection.form.email.placeholder')}
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="phone" className={`block ${fontSize.sm} ${fontWeight.medium} ${textColor.dark} mb-1`}>{t('contactSection.form.phone.label')}</label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#7BA7C2] focus:border-transparent transition-all"
                        placeholder={t('contactSection.form.phone.placeholder')}
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className={`block ${fontSize.sm} ${fontWeight.medium} ${textColor.dark} mb-1`}>{t('contactSection.form.message.label')}</label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#7BA7C2] focus:border-transparent transition-all"
                        placeholder={t('contactSection.form.message.placeholder')}
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                      ></textarea>
                    </div>
                    
                    {/* Consent and Newsletter Checkboxes */}
                    <div className="space-y-4 mb-6">
                      {/* Privacy Consent Checkbox */}
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="consent"
                            name="consent"
                            type="checkbox"
                            required
                            checked={formConsent}
                            onChange={(e) => setFormConsent(e.target.checked)}
                            className="w-4 h-4 text-[#7BA7C2] border-gray-300 rounded focus:ring-[#7BA7C2]/20"
                            aria-label={t('contactSection.form.consent')}
                            title={t('contactSection.form.consent')}
                          />
                        </div>
                        <label 
                          htmlFor="consent" 
                          className={`ml-3 ${fontSize.sm} ${textColor.medium}`}
                        >
                          {t('contactSection.form.consent')}
                        </label>
                      </div>
                      
                      {/* Newsletter Checkbox */}
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="newsletter"
                            name="newsletter"
                            type="checkbox"
                            checked={formNewsletter}
                            onChange={(e) => setFormNewsletter(e.target.checked)}
                            className="w-4 h-4 text-[#7BA7C2] border-gray-300 rounded focus:ring-[#7BA7C2]/20"
                            aria-label={t('contactSection.form.newsletter')}
                            title={t('contactSection.form.newsletter')}
                          />
                        </div>
                        <label 
                          htmlFor="newsletter" 
                          className={`ml-3 ${fontSize.sm} ${textColor.medium}`}
                        >
                          {t('contactSection.form.newsletter')}
                        </label>
                      </div>
                    </div>
                    
                    {/* Error Message */}
                    {submitError && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg text-red-600">
                        {submitError}
                      </div>
                    )}
                    
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className={`${buttonStyle.primary} w-full disabled:opacity-70 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span className="uppercase">{t('contactSection.form.sending')}</span>
                        </>
                      ) : (
                        <>
                          <span className={buttonRippleClass}></span>
                          <span className={`relative flex items-center ${textStyle.button} uppercase`}>
                            {t('contactSection.form.submit')}
                            <ArrowRight className={buttonArrowClass} />
                          </span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
              
              {/* Right side - Contact info */}
              <div className="bg-[#7BA7C2]/5 p-8 md:p-12 flex flex-col">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-[#7BA7C2]/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#7BA7C2]" />
                  </div>
                  <h3 className={`${fontSize.h3} ${fontWeight.light} ${textColor.dark}`}>{t('contactSection.contactInfo.title')}</h3>
                </div>
                
                <div className="space-y-8 mb-auto">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#7BA7C2]/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Phone className="w-5 h-5 text-[#7BA7C2]" />
                    </div>
                    <div>
                      <h4 className={`${fontSize.lg} ${fontWeight.light} ${textColor.dark} mb-1`}>{t('contact.phone', { ns: 'common' })}</h4>
                      <a href="tel:+491702637818" className={`${fontSize.base} ${textColor.medium} hover:text-[#7BA7C2] transition-colors`}>
                        +49 170 2637818
                      </a>
                      <p className={`${fontSize.sm} ${textColor.light} ${lineHeight.relaxed} mt-1`}>
                        {t('contact.businessHours', { ns: 'common' })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#7BA7C2]/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <MessageCircle className="w-5 h-5 text-[#7BA7C2]" />
                    </div>
                    <div>
                      <h4 className={`${fontSize.lg} ${fontWeight.light} ${textColor.dark} mb-1`}>{t('contact.whatsapp', { ns: 'common' })}</h4>
                      <a href="https://wa.me/491702637818" className={`${fontSize.base} ${textColor.medium} hover:text-[#7BA7C2] transition-colors`}>
                        +49 170 2637818
                      </a>
                      <p className={`${fontSize.sm} ${textColor.light} ${lineHeight.relaxed} mt-1`}>
                        {t('contact.quickConsultation', { ns: 'common' })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#7BA7C2]/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Mail className="w-5 h-5 text-[#7BA7C2]" />
                    </div>
                    <div>
                      <h4 className={`${fontSize.lg} ${fontWeight.light} ${textColor.dark} mb-1`}>{t('contact.email', { ns: 'common' })}</h4>
                      <a href="mailto:info@dionhairclinic.de" className={`${fontSize.base} ${textColor.medium} hover:text-[#7BA7C2] transition-colors`}>
                        info@dionhairclinic.de
                      </a>
                      <p className={`${fontSize.sm} ${textColor.light} ${lineHeight.relaxed} mt-1`}>
                        {t('contact.responseTime', { ns: 'common' })}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 pt-8 border-t border-[#7BA7C2]/20">
                  <h4 className={`${fontSize.lg} ${fontWeight.light} ${textColor.dark} mb-3`}>{t('contactSection.address.title')}</h4>
                  <p className={`${fontSize.base} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed}`}>
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
