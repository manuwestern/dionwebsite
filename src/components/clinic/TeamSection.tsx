import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, tracking } from '../../utils/typography';

const TeamSection: React.FC = () => {
  const { t } = useTranslation('clinic');
  const [activeTeamMember, setActiveTeamMember] = useState<number | null>(null);
  
  // Get team members from translation
  const teamMembers = t('teamSection.members', { returnObjects: true }) as any[];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-gray-50 border-t border-b border-gray-100">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-[#7BA7C2]/5 -mr-[400px] -mt-[400px] blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#7BA7C2]/5 -ml-[300px] -mb-[300px] blur-3xl"></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`${textStyle.sectionTitle} mb-4`}>
            {t('teamSection.title')}
          </h2>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto`}>
            {t('teamSection.description')}
          </p>
          <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-6 mx-auto`}></div>
        </div>
        
        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => {
            const isActive = index === activeTeamMember;
            
            return (
              <div 
                key={index}
                className={`bg-white rounded-xl shadow-md overflow-hidden border transition-all duration-300 ${
                  isActive 
                    ? 'border-[#7BA7C2] shadow-lg transform -translate-y-1' 
                    : 'border-gray-100 hover:shadow-lg hover:-translate-y-1'
                }`}
                onMouseEnter={() => setActiveTeamMember(index)}
                onMouseLeave={() => setActiveTeamMember(null)}
              >
                {/* Team Member Image Placeholder */}
                <div className={`h-48 bg-gradient-to-br from-[#7BA7C2]/20 to-[#7BA7C2]/5 flex items-center justify-center transition-all duration-300 ${
                  isActive ? 'bg-[#7BA7C2]/30' : ''
                }`}>
                  <div className="w-24 h-24 rounded-full bg-[#7BA7C2]/20 flex items-center justify-center">
                    <span className={`${fontSize.h2} ${fontWeight.light} text-[#7BA7C2]`}>
                      {member.name.split(' ').map((part: string) => part[0]).join('')}
                    </span>
                  </div>
                </div>
                
                {/* Team Member Info */}
                <div className="p-6">
                  <h3 className={`${textStyle.cardTitle} mb-1`}>{member.name}</h3>
                  <p className={`${fontSize.sm} ${textColor.primary} ${fontWeight.medium} ${tracking.wider} uppercase mb-4`}>
                    {member.title}
                  </p>
                  
                  <p className={`${textStyle.bodyText} mb-4`}>
                    {member.description}
                  </p>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <p className={`${fontSize.xs} ${textColor.light} ${tracking.wide}`}>
                      {member.credentials}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
