import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, CheckCircle, Calendar, Clock } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, lineHeight } from '../../utils/typography';
import { buttonStyle, buttonRippleClass } from '../../utils/buttons';

interface FormField {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  required: boolean;
  options?: { value: string; label: string }[];
  rows?: number;
}

const AppointmentFormSection: React.FC = () => {
  const { t } = useTranslation('contact');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    appointmentType: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
    consent: false
  });
  const [isVisible, setIsVisible] = useState(false);

  // Trigger entrance animations
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Form fields configuration
  const formFields: FormField[] = [
    {
      id: 'name',
      label: t('appointmentForm.nameLabel'),
      placeholder: t('appointmentForm.namePlaceholder'),
      type: 'text',
      required: true
    },
    {
      id: 'email',
      label: t('appointmentForm.emailLabel'),
      placeholder: t('appointmentForm.emailPlaceholder'),
      type: 'email',
      required: true
    },
    {
      id: 'phone',
      label: t('appointmentForm.phoneLabel'),
      placeholder: t('appointmentForm.phonePlaceholder'),
      type: 'tel',
      required: true
    },
    {
      id: 'appointmentType',
      label: t('appointmentForm.appointmentTypeLabel'),
      placeholder: t('appointmentForm.appointmentTypePlaceholder'),
      type: 'select',
      required: true,
      options: [
        { value: 'phone', label: t('appointmentForm.appointmentTypeOptions.phone') },
        { value: 'inPerson', label: t('appointmentForm.appointmentTypeOptions.inPerson') }
      ]
    },
    {
      id: 'preferredDate',
      label: t('appointmentForm.preferredDateLabel'),
      placeholder: t('appointmentForm.preferredDatePlaceholder'),
      type: 'date',
      required: true
    },
    {
      id: 'preferredTime',
      label: t('appointmentForm.preferredTimeLabel'),
      placeholder: t('appointmentForm.preferredTimePlaceholder'),
      type: 'select',
      required: true,
      options: [
        { value: 'morning', label: t('appointmentForm.preferredTimeOptions.morning') },
        { value: 'afternoon', label: t('appointmentForm.preferredTimeOptions.afternoon') },
        { value: 'evening', label: t('appointmentForm.preferredTimeOptions.evening') }
      ]
    },
    {
      id: 'message',
      label: t('appointmentForm.messageLabel'),
      placeholder: t('appointmentForm.messagePlaceholder'),
      type: 'textarea',
      required: false,
      rows: 4
    }
  ];

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  // State for form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Handle form submission
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
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          appointmentType: formData.appointmentType,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
          message: formData.message || 'Keine Nachricht angegeben',
          formType: 'Terminbuchungsformular',
          timestamp: new Date().toISOString(),
          source: window.location.href
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Fehler beim Senden: ${response.status}`);
      }
      
      // Form submission successful
      setFormSubmitted(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          appointmentType: '',
          preferredDate: '',
          preferredTime: '',
          message: '',
          consent: false
        });
      }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError('Es gab ein Problem beim Senden des Formulars. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt per Telefon.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="appointmentForm" className="py-16 md:py-24 relative overflow-hidden">
      {/* Simple background */}
      <div className="absolute -z-10 w-full h-full inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className={`${textStyle.sectionTitle} mb-4`}>
            {t('appointmentForm.title')}
          </h2>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto`}>
            {t('appointmentForm.description')}
          </p>
          <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-6 mx-auto`}></div>
        </div>
        
        {/* Contact Form */}
        <div className={`max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-10 border border-gray-100 transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {formSubmitted ? (
            <div className="text-center py-12">
              <div className="flex justify-center mb-6">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <h3 className={`${textStyle.primaryHeading} mb-4`}>
                {t('appointmentForm.successMessage')}
              </h3>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                {formFields.slice(0, 3).map((field) => (
                  <div key={field.id} className="space-y-2">
                    <label 
                      htmlFor={field.id} 
                      className={`block ${fontSize.base} ${fontWeight.medium} ${textColor.dark}`}
                    >
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      placeholder={field.placeholder}
                      required={field.required}
                      value={formData[field.id as keyof typeof formData] as string}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#7BA7C2] focus:ring-2 focus:ring-[#7BA7C2]/20 outline-none transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
              
              {/* Appointment Type */}
              <div className="space-y-2">
                  <label 
                    htmlFor="appointmentType" 
                    className={`block ${fontSize.base} ${fontWeight.medium} ${textColor.dark}`}
                  >
                    {t('appointmentForm.appointmentTypeLabel')} <span className="text-red-500">*</span>
                  </label>
                  
                  <div className="relative">
                    <select
                      id="appointmentType"
                      name="appointmentType"
                      required
                      value={formData.appointmentType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#7BA7C2] focus:ring-2 focus:ring-[#7BA7C2]/20 outline-none transition-all duration-300 appearance-none bg-white"
                    >
                      <option value="" disabled>{t('appointmentForm.appointmentTypePlaceholder')}</option>
                    {formFields[3].options?.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Date and Time */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Preferred Date */}
                <div className="space-y-2">
                  <label 
                    htmlFor="preferredDate" 
                    className={`block ${fontSize.base} ${fontWeight.medium} ${textColor.dark}`}
                  >
                    {t('appointmentForm.preferredDateLabel')} <span className="text-red-500">*</span>
                  </label>
                  
                  <div className="relative">
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      required
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#7BA7C2] focus:ring-2 focus:ring-[#7BA7C2]/20 outline-none transition-all duration-300"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Calendar className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                {/* Preferred Time */}
                <div className="space-y-2">
                  <label 
                    htmlFor="preferredTime" 
                    className={`block ${fontSize.base} ${fontWeight.medium} ${textColor.dark}`}
                  >
                    {t('appointmentForm.preferredTimeLabel')} <span className="text-red-500">*</span>
                  </label>
                  
                  <div className="relative">
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      required
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#7BA7C2] focus:ring-2 focus:ring-[#7BA7C2]/20 outline-none transition-all duration-300 appearance-none bg-white"
                    >
                      <option value="" disabled>{t('appointmentForm.preferredTimePlaceholder')}</option>
                      {formFields[5].options?.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Clock className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Message */}
              <div className="space-y-2">
                <label 
                  htmlFor="message" 
                  className={`block ${fontSize.base} ${fontWeight.medium} ${textColor.dark}`}
                >
                  {t('appointmentForm.messageLabel')}
                </label>
                
                <textarea
                  id="message"
                  name="message"
                  placeholder={t('appointmentForm.messagePlaceholder')}
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#7BA7C2] focus:ring-2 focus:ring-[#7BA7C2]/20 outline-none transition-all duration-300"
                />
              </div>
              
              {/* Error Message */}
              {submitError && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-lg text-red-600">
                  {submitError}
                </div>
              )}
              
              {/* Consent Checkbox */}
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="consent"
                      name="consent"
                      type="checkbox"
                      required
                      checked={formData.consent}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 text-[#7BA7C2] border-gray-300 rounded focus:ring-[#7BA7C2]/20"
                    />
                  </div>
                  <label 
                    htmlFor="consent" 
                    className={`ml-3 ${fontSize.sm} ${textColor.medium}`}
                  >
                    {t('appointmentForm.consentText')}
                  </label>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`${buttonStyle.primary} w-full md:w-auto shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] disabled:opacity-70`}
                >
                  <span className={buttonRippleClass}></span>
                  <span className="relative flex items-center justify-center">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('appointmentForm.sending', { defaultValue: 'Wird gesendet...' })}
                      </>
                    ) : (
                      <>
                        {t('appointmentForm.submitButton')}
                        <Send className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default AppointmentFormSection;
