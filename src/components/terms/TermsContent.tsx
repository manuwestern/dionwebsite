import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FileText, 
  Users, 
  Stethoscope, 
  UserCheck, 
  CreditCard, 
  Calendar, 
  ShieldAlert, 
  Clipboard, 
  Camera, 
  Lock, 
  Pill, 
  Award, 
  AlertTriangle, 
  BookOpen 
} from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, tracking } from '../../utils/typography';

// Section component for consistent styling
interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children, className = '', icon }) => {
  return (
    <div className={`mb-12 ${className}`}>
      <div className="flex items-center mb-4">
        {icon && <div className="mr-3 text-[#7BA7C2]">{icon}</div>}
        <h2 className={`${textStyle.primaryHeading}`}>{title}</h2>
      </div>
      <div className={`${gradientUnderline.primary} w-[90%] max-w-[150px] mb-6`}></div>
      {children}
    </div>
  );
};

// Subsection component for nested content
interface SubsectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Subsection: React.FC<SubsectionProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`mb-8 ${className}`}>
      <h3 className={`${textStyle.cardTitle} mb-3`}>{title}</h3>
      {children}
    </div>
  );
};

// Card component for visual separation
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300 ${className}`}>
      {children}
    </div>
  );
};

// List component for data points
interface ListProps {
  items: string[];
  className?: string;
}

const List: React.FC<ListProps> = ({ items, className = '' }) => {
  return (
    <ul className={`list-disc pl-5 space-y-1 ${className}`}>
      {items.map((item, index) => (
        <li key={index} className={textStyle.bodyText}>{item}</li>
      ))}
    </ul>
  );
};

const TermsContent: React.FC = () => {
  const { t } = useTranslation('terms');
  const [isVisible, setIsVisible] = useState(true);

  // Trigger entrance animations immediately
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Background with gradient and blur effects */}
      <div className="absolute inset-0 z-0">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-[#7BA7C2]/5 -mr-[400px] -mt-[400px] blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#7BA7C2]/5 -ml-[300px] -mb-[300px] blur-3xl"></div>
        
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: 'url("/images/dionhairclinic_bg.svg")',
            backgroundSize: '200px',
            backgroundRepeat: 'repeat'
          }}
        ></div>
        
        {/* Animated gradient lines */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#7BA7C2] to-transparent animate-gradient-x"></div>
          <div className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#7BA7C2] to-transparent animate-gradient-x-slow"></div>
          <div className="absolute top-2/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#7BA7C2] to-transparent animate-gradient-x-slower"></div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className={`transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
            <h1 className={`${textStyle.heroTitle} text-center px-1 leading-tight break-words hyphens-auto whitespace-pre-line mb-3`} lang="de">
              {t('title')}
            </h1>
            
            <div className="mt-3 mb-2">
              <span className={`block text-center ${fontSize.h4} ${textColor.medium} ${fontWeight.light} ${tracking.wider} leading-relaxed`}>
                {t('subtitle')}
              </span>
            </div>
            
            <div className={`${gradientUnderline.primary} h-[1.5px] w-[85%] max-w-[280px] mx-auto mt-5 transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
          </div>
        </div>

        {/* Introduction */}
        <Section title={t('introduction.title')} icon={<FileText size={24} />}>
          <Card>
            <p className={`${textStyle.bodyTextImportant} mb-4`}>{t('introduction.text')}</p>
          </Card>
        </Section>

        {/* Scope */}
        <Section title={t('scope.title')} icon={<Users size={24} />}>
          <Card>
            <p className={`${textStyle.bodyText}`}>{t('scope.text')}</p>
          </Card>
        </Section>

        {/* Contract Conclusion */}
        <Section title={t('contractConclusion.title')} icon={<FileText size={24} />}>
          <Card className="mb-6">
            <p className={`${textStyle.bodyText} mb-4`}>{t('contractConclusion.text')}</p>
          </Card>
          
          <Card className="mb-6">
            <Subsection title={t('contractConclusion.consultation.title')}>
              <p className={`${textStyle.bodyText}`}>{t('contractConclusion.consultation.text')}</p>
            </Subsection>
          </Card>
          
          <Card>
            <Subsection title={t('contractConclusion.treatmentPlan.title')}>
              <p className={`${textStyle.bodyText}`}>{t('contractConclusion.treatmentPlan.text')}</p>
            </Subsection>
          </Card>
        </Section>

        {/* Treatment Services */}
        <Section title={t('treatmentServices.title')} icon={<Stethoscope size={24} />}>
          <Card className="mb-6">
            <Subsection title={t('treatmentServices.general.title')}>
              <p className={`${textStyle.bodyText}`}>{t('treatmentServices.general.text')}</p>
            </Subsection>
          </Card>
          
          <Card className="mb-6">
            <Subsection title={t('treatmentServices.hairTransplantation.title')}>
              <p className={`${textStyle.bodyText} mb-4`}>{t('treatmentServices.hairTransplantation.text')}</p>
              <p className={`${textStyle.bodyText}`}>{t('treatmentServices.hairTransplantation.details')}</p>
            </Subsection>
          </Card>
          
          <Card className="mb-6">
            <Subsection title={t('treatmentServices.beardTransplantation.title')}>
              <p className={`${textStyle.bodyText}`}>{t('treatmentServices.beardTransplantation.text')}</p>
            </Subsection>
          </Card>
          
          <Card className="mb-6">
            <Subsection title={t('treatmentServices.eyebrowTransplantation.title')}>
              <p className={`${textStyle.bodyText}`}>{t('treatmentServices.eyebrowTransplantation.text')}</p>
            </Subsection>
          </Card>
          
          <Card>
            <Subsection title={t('treatmentServices.hairLossTherapy.title')}>
              <p className={`${textStyle.bodyText}`}>{t('treatmentServices.hairLossTherapy.text')}</p>
            </Subsection>
          </Card>
        </Section>

        {/* Patient Obligations */}
        <Section title={t('patientObligations.title')} icon={<UserCheck size={24} />}>
          <Card className="mb-6">
            <Subsection title={t('patientObligations.information.title')}>
              <p className={`${textStyle.bodyText}`}>{t('patientObligations.information.text')}</p>
            </Subsection>
          </Card>
          
          <Card className="mb-6">
            <Subsection title={t('patientObligations.pretreatment.title')}>
              <p className={`${textStyle.bodyText}`}>{t('patientObligations.pretreatment.text')}</p>
            </Subsection>
          </Card>
          
          <Card className="mb-6">
            <Subsection title={t('patientObligations.aftercare.title')}>
              <p className={`${textStyle.bodyText} mb-4`}>{t('patientObligations.aftercare.text')}</p>
              <p className={`${textStyle.bodyText}`}>{t('patientObligations.aftercare.documentation')}</p>
            </Subsection>
          </Card>
          
          <Card>
            <Subsection title={t('patientObligations.restrictions.title')}>
              <p className={`${textStyle.bodyText}`}>{t('patientObligations.restrictions.text')}</p>
            </Subsection>
          </Card>
        </Section>

        {/* Costs */}
        <Section title={t('costs.title')} icon={<CreditCard size={24} />}>
          <Card className="mb-6">
            <Subsection title={t('costs.general.title')}>
              <p className={`${textStyle.bodyText}`}>{t('costs.general.text')}</p>
            </Subsection>
          </Card>
          
          <Card className="mb-6">
            <Subsection title={t('costs.payment.title')}>
              <p className={`${textStyle.bodyText}`}>{t('costs.payment.text')}</p>
            </Subsection>
          </Card>
          
          <Card className="mb-6">
            <Subsection title={t('costs.defaultPayment.title')}>
              <p className={`${textStyle.bodyText}`}>{t('costs.defaultPayment.text')}</p>
            </Subsection>
          </Card>
          
          <Card>
            <Subsection title={t('costs.additionalCosts.title')}>
              <p className={`${textStyle.bodyText}`}>{t('costs.additionalCosts.text')}</p>
            </Subsection>
          </Card>
        </Section>

        {/* Cancellation */}
        <Section title={t('cancellation.title')} icon={<Calendar size={24} />}>
          <Card className="mb-6">
            <Subsection title={t('cancellation.revocation.title')}>
              <p className={`${textStyle.bodyText}`}>{t('cancellation.revocation.text')}</p>
            </Subsection>
          </Card>
          
          <Card className="mb-6">
            <Subsection title={t('cancellation.cancellationTerms.title')}>
              <p className={`${textStyle.bodyText}`}>{t('cancellation.cancellationTerms.text')}</p>
            </Subsection>
          </Card>
          
          <Card className="mb-6">
            <Subsection title={t('cancellation.medicalReasons.title')}>
              <p className={`${textStyle.bodyText}`}>{t('cancellation.medicalReasons.text')}</p>
            </Subsection>
          </Card>
          
          <Card>
            <Subsection title={t('cancellation.forceMajeure.title')}>
              <p className={`${textStyle.bodyText}`}>{t('cancellation.forceMajeure.text')}</p>
            </Subsection>
          </Card>
        </Section>

        {/* Liability */}
        <Section title={t('liability.title')} icon={<ShieldAlert size={24} />}>
          <Card className="mb-6">
            <Subsection title={t('liability.general.title')}>
              <p className={`${textStyle.bodyText}`}>{t('liability.general.text')}</p>
            </Subsection>
          </Card>
          
          <Card className="mb-6">
            <Subsection title={t('liability.limitationOfLiability.title')}>
              <p className={`${textStyle.bodyText}`}>{t('liability.limitationOfLiability.text')}</p>
            </Subsection>
          </Card>
          
          <Card>
            <Subsection title={t('liability.revision.title')}>
              <p className={`${textStyle.bodyText} mb-4`}>{t('liability.revision.text')}</p>
              <p className={`${textStyle.bodyText} mb-4`}>{t('liability.revision.conditions')}</p>
              <p className={`${textStyle.bodyText} mb-4`}>{t('liability.revision.medicalCheck')}</p>
              <p className={`${textStyle.bodyText} mb-4`}>{t('liability.revision.scope')}</p>
              <p className={`${textStyle.bodyText} mb-4`}>{t('liability.revision.costs')}</p>
              <p className={`${textStyle.bodyText}`}>{t('liability.revision.exclusions')}</p>
            </Subsection>
          </Card>
        </Section>

        {/* Aftercare */}
        <Section title={t('aftercare.title')} icon={<Clipboard size={24} />}>
          <Card className="mb-6">
            <Subsection title={t('aftercare.general.title')}>
              <p className={`${textStyle.bodyText}`}>{t('aftercare.general.text')}</p>
            </Subsection>
          </Card>
          
          <Card className="mb-6">
            <Subsection title={t('aftercare.appointments.title')}>
              <p className={`${textStyle.bodyText} mb-4`}>{t('aftercare.appointments.text')}</p>
              <p className={`${textStyle.bodyText}`}>{t('aftercare.appointments.responsibility')}</p>
            </Subsection>
          </Card>
          
          <Card className="mb-6">
            <Subsection title={t('aftercare.services.title')}>
              <p className={`${textStyle.bodyText}`}>{t('aftercare.services.text')}</p>
            </Subsection>
          </Card>
          
          <Card>
            <Subsection title={t('aftercare.warning.title')}>
              <p className={`${textStyle.bodyText}`}>{t('aftercare.warning.text')}</p>
            </Subsection>
          </Card>
        </Section>

        {/* Photo Documentation */}
        <Section title={t('photoDocumentation.title')} icon={<Camera size={24} />}>
          <Card>
            <p className={`${textStyle.bodyText}`}>{t('photoDocumentation.text')}</p>
          </Card>
        </Section>

        {/* Data Protection */}
        <Section title={t('dataProtection.title')} icon={<Lock size={24} />}>
          <Card>
            <p className={`${textStyle.bodyText}`}>{t('dataProtection.text')}</p>
          </Card>
        </Section>

        {/* Medication */}
        <Section title={t('medication.title')} icon={<Pill size={24} />}>
          <Card className="mb-6">
            <Subsection title={t('medication.general.title')}>
              <p className={`${textStyle.bodyText}`}>{t('medication.general.text')}</p>
            </Subsection>
          </Card>
          
          <Card className="mb-6">
            <Subsection title={t('medication.mesotherapy.title')}>
              <p className={`${textStyle.bodyText}`}>{t('medication.mesotherapy.text')}</p>
            </Subsection>
          </Card>
          
          <Card className="mb-6">
            <Subsection title={t('medication.additionalTherapies.title')}>
              <p className={`${textStyle.bodyText}`}>{t('medication.additionalTherapies.text')}</p>
            </Subsection>
          </Card>
          
          <Card>
            <Subsection title={t('medication.consultation.title')}>
              <p className={`${textStyle.bodyText}`}>{t('medication.consultation.text')}</p>
            </Subsection>
          </Card>
        </Section>

        {/* Quality */}
        <Section title={t('quality.title')} icon={<Award size={24} />}>
          <Card className="mb-6">
            <Subsection title={t('quality.commitment.title')}>
              <p className={`${textStyle.bodyText}`}>{t('quality.commitment.text')}</p>
            </Subsection>
          </Card>
          
          <Card className="mb-6">
            <Subsection title={t('quality.guarantees.title')}>
              <p className={`${textStyle.bodyText}`}>{t('quality.guarantees.text')}</p>
            </Subsection>
          </Card>
          
          <Card className="mb-6">
            <Subsection title={t('quality.limitation.title')}>
              <p className={`${textStyle.bodyText}`}>{t('quality.limitation.text')}</p>
            </Subsection>
          </Card>
          
          <Card>
            <Subsection title={t('quality.feedback.title')}>
              <p className={`${textStyle.bodyText}`}>{t('quality.feedback.text')}</p>
            </Subsection>
          </Card>
        </Section>

        {/* Health Risks */}
        <Section title={t('healthRisks.title')} icon={<AlertTriangle size={24} />}>
          <Card className="mb-6">
            <Subsection title={t('healthRisks.general.title')}>
              <p className={`${textStyle.bodyText}`}>{t('healthRisks.general.text')}</p>
            </Subsection>
          </Card>
          
          <Card className="mb-6">
            <Subsection title={t('healthRisks.cancellation.title')}>
              <p className={`${textStyle.bodyText}`}>{t('healthRisks.cancellation.text')}</p>
            </Subsection>
          </Card>
          
          <Card className="mb-6">
            <Subsection title={t('healthRisks.substanceUse.title')}>
              <p className={`${textStyle.bodyText}`}>{t('healthRisks.substanceUse.text')}</p>
            </Subsection>
          </Card>
          
          <Card className="mb-6">
            <Subsection title={t('healthRisks.testing.title')}>
              <p className={`${textStyle.bodyText}`}>{t('healthRisks.testing.text')}</p>
            </Subsection>
          </Card>
          
          <Card className="mb-6">
            <Subsection title={t('healthRisks.cancellationFee.title')}>
              <p className={`${textStyle.bodyText}`}>{t('healthRisks.cancellationFee.text')}</p>
            </Subsection>
          </Card>
          
          <Card className="mb-6">
            <Subsection title={t('healthRisks.liability.title')}>
              <p className={`${textStyle.bodyText}`}>{t('healthRisks.liability.text')}</p>
            </Subsection>
          </Card>
          
          <Card>
            <Subsection title={t('healthRisks.emergencyCosts.title')}>
              <p className={`${textStyle.bodyText}`}>{t('healthRisks.emergencyCosts.text')}</p>
            </Subsection>
          </Card>
        </Section>

        {/* Final Provisions */}
        <Section title={t('finalProvisions.title')} icon={<BookOpen size={24} />}>
          <Card className="mb-6">
            <Subsection title={t('finalProvisions.amendments.title')}>
              <p className={`${textStyle.bodyText}`}>{t('finalProvisions.amendments.text')}</p>
            </Subsection>
          </Card>
          
          <Card className="mb-6">
            <Subsection title={t('finalProvisions.validity.title')}>
              <p className={`${textStyle.bodyText}`}>{t('finalProvisions.validity.text')}</p>
            </Subsection>
          </Card>
          
          <Card className="mb-6">
            <Subsection title={t('finalProvisions.severability.title')}>
              <p className={`${textStyle.bodyText}`}>{t('finalProvisions.severability.text')}</p>
            </Subsection>
          </Card>
          
          <Card className="mb-6">
            <Subsection title={t('finalProvisions.jurisdiction.title')}>
              <p className={`${textStyle.bodyText}`}>{t('finalProvisions.jurisdiction.text')}</p>
            </Subsection>
          </Card>
          
          <Card>
            <Subsection title={t('finalProvisions.applicableLaw.title')}>
              <p className={`${textStyle.bodyText}`}>{t('finalProvisions.applicableLaw.text')}</p>
            </Subsection>
          </Card>
        </Section>
      </div>
    </div>
  );
};

export default TermsContent;
