import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, CheckCircle } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline } from '../../utils/typography';
import { buttonStyle, buttonRippleClass } from '../../utils/buttons';

interface FormField {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  required: boolean;
  rows?: number;
}

const ContactFormSection: React.FC = () => {
  const { t } = useTranslation('contact');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    consent: false
  });

  // Form fields configuration
  const formFields: FormField[] = [
    {
      id: 'name',
      label: t('formSection.nameLabel'),
      placeholder: t('formSection.namePlaceholder'),
      type: 'text',
      required: true
    },
    {
      id: 'email',
      label: t('formSection.emailLabel'),
      placeholder: t('formSection.emailPlaceholder'),
      type: 'email',
      required: true
    },
    {
      id: 'phone',
      label: t('formSection.phoneLabel'),
      placeholder: t('formSection.phonePlaceholder'),
      type: 'tel',
      required: false
    },
    {
      id: 'subject',
      label: t('formSection.subjectLabel'),
      placeholder: t('formSection.subjectPlaceholder'),
      type: 'text',
      required: true
    },
    {
      id: 'message',
      label: t('formSection.messageLabel'),
      placeholder: t('formSection.messagePlaceholder'),
      type: 'textarea',
      required: true,
      rows: 5
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

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send the form data to a server here
    console.log('Form submitted:', formData);
    
    // Simulate form submission success
    setTimeout(() => {
      setFormSubmitted(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          consent: false
        });
      }, 5000);
    }, 1000);
  };

  return (
    <section id="contactForm" className="py-16 md:py-24 relative overflow-hidden bg-gray-50 border-t border-b border-gray-100">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full bg-[#7BA7C2]/5 -ml-[400px] -mt-[400px] blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-[#7BA7C2]/5 -mr-[300px] -mb-[300px] blur-3xl"></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`${textStyle.sectionTitle} mb-4`}>
            {t('formSection.title')}
          </h2>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto`}>
            {t('formSection.description')}
          </p>
          <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-6 mx-auto`}></div>
        </div>
        
        {/* Contact Form */}
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-10 border border-gray-100">
          {formSubmitted ? (
            <div className="text-center py-12">
              <div className="flex justify-center mb-6">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <h3 className={`${textStyle.primaryHeading} mb-4`}>
                {t('formSection.successMessage')}
              </h3>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form Fields */}
              {formFields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <label 
                    htmlFor={field.id} 
                    className={`block ${fontSize.base} ${fontWeight.medium} ${textColor.dark}`}
                  >
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.id}
                      name={field.id}
                      placeholder={field.placeholder}
                      rows={field.rows}
                      required={field.required}
                      value={formData[field.id as keyof typeof formData] as string}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#7BA7C2] focus:ring-2 focus:ring-[#7BA7C2]/20 outline-none transition-all duration-300"
                    />
                  ) : (
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
                  )}
                </div>
              ))}
              
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
                    {t('formSection.consentText')}
                  </label>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="pt-4">
                <button 
                  type="submit" 
                  className={`${buttonStyle.primary} w-full md:w-auto shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}
                >
                  <span className={buttonRippleClass}></span>
                  <span className="relative flex items-center justify-center">
                    {t('formSection.submitButton')}
                    <Send className="ml-2 w-4 h-4" />
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

export default ContactFormSection;
