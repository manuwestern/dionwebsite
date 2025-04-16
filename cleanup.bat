@echo off
echo This script will list files that have been refactored and could potentially be removed.
echo These files are currently still in use, but they are now much simpler because they're using reusable components.
echo If you decide to directly use the reusable components in their parent components, these files could be removed.
echo.
echo Files that have been refactored to use BenefitsSectionComponent:
echo - src\components\home\BenefitsSection.tsx
echo - src\components\hairTransplantation\BenefitsSection.tsx
echo - src\components\beardTransplantation\BenefitsSection.tsx
echo - src\components\eyebrowTransplantation\BenefitsSection.tsx
echo - src\components\hairLossTherapy\BenefitsSection.tsx
echo.
echo Files that have been refactored to use FAQAccordionSection:
echo - src\components\home\FAQSection.tsx
echo - src\components\hairTransplantation\FAQSection.tsx
echo - src\components\beardTransplantation\FAQSection.tsx
echo - src\components\eyebrowTransplantation\FAQSection.tsx
echo - src\components\hairLossTherapy\FAQSection.tsx
echo - src\components\prices\FAQSection.tsx
echo.
echo Files that have been refactored to use ProcessStepsSection:
echo - src\components\hairTransplantation\ProcessSection.tsx
echo - src\components\beardTransplantation\ProcessSection.tsx
echo - src\components\eyebrowTransplantation\ProcessSection.tsx
echo - src\components\hairLossTherapy\ProcessSection.tsx
echo.
echo Files that have been refactored to use PatternCardsSection:
echo - src\components\hairTransplantation\HairLossPatternsSection.tsx
echo - src\components\beardTransplantation\PatternSection.tsx
echo - src\components\eyebrowTransplantation\PatternSection.tsx
echo.
echo To actually remove these files, you would need to update the parent components to directly use the reusable components.
echo For example, in src\pages\HomePage.tsx, you would replace:
echo   ^<BenefitsSection /^>
echo with:
echo   ^<BenefitsSectionComponent translationNamespace="home" showCTA={false} /^>
echo.
echo WARNING: Do not remove these files unless you have updated all references to them!
echo.
pause
