@echo off
setlocal enabledelayedexpansion

echo ===================================================================
echo ADVANCED CLEANUP SCRIPT FOR REFACTORED COMPONENTS
echo ===================================================================
echo This script can remove files that have been refactored to use reusable components.
echo WARNING: Only run this if you have updated all references to these files!
echo.
echo The following files have been refactored:
echo.

set "files_to_remove="

REM BenefitsSection files
echo [BenefitsSectionComponent] Files:
set "benefits_files=src\components\home\BenefitsSection.tsx src\components\hairTransplantation\BenefitsSection.tsx src\components\beardTransplantation\BenefitsSection.tsx src\components\eyebrowTransplantation\BenefitsSection.tsx src\components\hairLossTherapy\BenefitsSection.tsx"
for %%f in (%benefits_files%) do (
    echo - %%f
    set "files_to_remove=!files_to_remove! %%f"
)
echo.

REM TestimonialsSection files
echo [TestimonialsSectionComponent] Files:
set "testimonials_files=src\components\hairTransplantation\TestimonialsSection.tsx src\components\beardTransplantation\TestimonialsSection.tsx src\components\eyebrowTransplantation\TestimonialsSection.tsx"
for %%f in (%testimonials_files%) do (
    echo - %%f
    set "files_to_remove=!files_to_remove! %%f"
)
echo.

REM FAQSection files
echo [FAQAccordionSection] Files:
set "faq_files=src\components\home\FAQSection.tsx src\components\hairTransplantation\FAQSection.tsx src\components\beardTransplantation\FAQSection.tsx src\components\eyebrowTransplantation\FAQSection.tsx src\components\hairLossTherapy\FAQSection.tsx src\components\prices\FAQSection.tsx"
for %%f in (%faq_files%) do (
    echo - %%f
    set "files_to_remove=!files_to_remove! %%f"
)
echo.

REM ProcessSection files
echo [ProcessStepsSection] Files:
set "process_files=src\components\hairTransplantation\ProcessSection.tsx src\components\beardTransplantation\ProcessSection.tsx src\components\eyebrowTransplantation\ProcessSection.tsx src\components\hairLossTherapy\ProcessSection.tsx"
for %%f in (%process_files%) do (
    echo - %%f
    set "files_to_remove=!files_to_remove! %%f"
)
echo.

REM PatternSection files
echo [PatternCardsSection] Files:
set "pattern_files=src\components\hairTransplantation\HairLossPatternsSection.tsx src\components\beardTransplantation\PatternSection.tsx src\components\eyebrowTransplantation\PatternSection.tsx"
for %%f in (%pattern_files%) do (
    echo - %%f
    set "files_to_remove=!files_to_remove! %%f"
)
echo.

echo ===================================================================
echo IMPORTANT: Before removing these files, you must update all references!
echo ===================================================================
echo For example, in src\pages\HomePage.tsx, you would replace:
echo   ^<BenefitsSection /^>
echo with:
echo   ^<BenefitsSectionComponent translationNamespace="home" showCTA={false} /^>
echo.
echo Similarly for other components:
echo   ^<FAQSection /^> -^> ^<FAQAccordionSection translationNamespace="home" /^>
echo   ^<TestimonialsSection /^> -^> ^<TestimonialsSectionComponent translationNamespace="hairTransplantation" beforeAfterPairs={beforeAfterPairs} /^>
echo   ^<ProcessSection /^> -^> ^<ProcessStepsSection translationNamespace="hairTransplantation" /^>
echo   ^<PatternSection /^> -^> ^<PatternCardsSection translationNamespace="beardTransplantation" /^>
echo.

set /p confirm=Do you want to proceed with removing these files? (y/n): 

if /i "%confirm%"=="y" (
    echo.
    echo Removing files...
    for %%f in (%files_to_remove%) do (
        if exist "%%f" (
            del "%%f"
            echo Removed: %%f
        ) else (
            echo File not found: %%f
        )
    )
    echo.
    echo Files have been removed.
    echo.
    echo NEXT STEPS:
    echo 1. Update all imports in your components to use the reusable components directly
    echo 2. Update all references in your pages to use the reusable components directly
    echo 3. Run your application to ensure everything works correctly
) else (
    echo.
    echo Operation cancelled. No files were removed.
)

echo.
echo ===================================================================
echo Script completed.
echo ===================================================================
pause
