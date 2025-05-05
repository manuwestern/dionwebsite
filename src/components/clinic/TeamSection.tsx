import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, lineHeight, tracking } from '../../utils/typography';
import CTASection from '../common/elements/CTASection';

const TeamSection: React.FC = () => {
  const { t } = useTranslation(['clinic', 'common']);
  const [hoverTeamMember, setHoverTeamMember] = useState<number | null>(null);

  // Get team members from translation
  const teamMembers = t('teamSection.members', { returnObjects: true }) as any[];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -z-10 w-full h-full inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>
      <div className="absolute -z-10 w-[800px] h-[800px] rounded-full bg-[#7BA7C2]/5 -top-[400px] -left-[400px] blur-3xl"></div>
      <div className="absolute -z-10 w-[600px] h-[600px] rounded-full bg-[#7BA7C2]/5 -bottom-[300px] -right-[300px] blur-3xl"></div>

      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header with elegant design */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <h2 className={`${textStyle.sectionTitle}`}>{t('teamSection.title')}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-3 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-4`}>
            {t('teamSection.description')}
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => {
            const isHovered = index === hoverTeamMember;

            return (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => setHoverTeamMember(index)}
                onMouseLeave={() => setHoverTeamMember(null)}
              >
                {/* Card with glass morphism effect */}
                <div className={`relative bg-white backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 h-full border-2 ${
                  isHovered
                    ? 'shadow-xl transform -translate-y-1 border-[#7BA7C2]/80'
                    : 'border-gray-100/80 hover:border-[#7BA7C2]/30 hover:shadow-xl'
                }`}>
                  {/* Team Member Image - Square Format */}
                  <div className="aspect-square w-full overflow-hidden">
                    {member.name === "Blerina Bevapi" || member.name === "Dilek Ergüney" ? (
                      <img 
                        src={member.name === "Blerina Bevapi" ? "/images/Blerina_Bevapi.webp" : "/images/Dilek_Ergueney.webp"} 
                        alt={member.name} 
                        className={`w-full h-full object-cover transition-all duration-500 ${isHovered ? 'scale-105' : ''}`}
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br from-[#7BA7C2]/20 to-[#7BA7C2]/5 flex items-center justify-center transition-all duration-300 ${
                        isHovered ? 'bg-[#7BA7C2]/30' : ''
                      }`}>
                        <div className={`w-32 h-32 rounded-full bg-[#7BA7C2]/20 flex items-center justify-center transition-all duration-500 ${
                          isHovered ? 'scale-110 bg-[#7BA7C2]/30' : ''
                        }`}>
                          <span className={`${fontSize.h1} ${fontWeight.light} text-[#7BA7C2] transition-all duration-500 ${isHovered ? 'scale-110' : ''}`}>
                            {member.name.split(' ').map((part: string) => part[0]).join('')}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Team Member Info - Adjusted for square images */}
                  <div className="p-6 md:p-8 bg-gradient-to-b from-white to-gray-50/50 flex flex-col h-auto md:h-[300px]">
                    {/* Name and title area - responsive height on mobile */}
                    <div className="min-h-[70px] md:h-[80px] flex flex-col justify-start">
                      <h3 className={`${textStyle.cardTitle} mb-1 text-center`}>{member.name}</h3>
                      <p className={`${fontSize.sm} ${textColor.primary} ${fontWeight.medium} ${tracking.wide} uppercase mb-0 text-center`}>
                        {member.title}
                      </p>
                    </div>
                    
                    {/* Description area - auto height on mobile */}
                    <div className="min-h-[80px] md:overflow-hidden md:h-[120px]">
                      <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed}`}>
                        {member.description}
                      </p>
                    </div>

                    {/* Credentials at the bottom */}
                    <div className="pt-4 mt-auto border-t border-gray-100">
                      <p className={`${fontSize.xs} ${textColor.light} ${tracking.wide}`}>
                        {member.credentials}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className={`absolute -z-10 w-full h-full rounded-2xl bg-[#7BA7C2]/10 top-2 left-2 transition-all duration-500 ${
                  isHovered ? 'opacity-70' : 'opacity-0'
                }`}></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
