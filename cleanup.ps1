# Advanced Cleanup Script for Refactored Components
# This PowerShell script helps manage files that have been refactored to use reusable components

function Write-Header {
    param (
        [string]$text
    )
    Write-Host "`n====================================================================" -ForegroundColor Cyan
    Write-Host $text -ForegroundColor Cyan
    Write-Host "====================================================================" -ForegroundColor Cyan
}

function Write-SubHeader {
    param (
        [string]$text
    )
    Write-Host "`n$text" -ForegroundColor Yellow
    Write-Host "--------------------------------------------------------------------" -ForegroundColor Yellow
}

function Find-Imports {
    param (
        [string]$componentName,
        [string]$directory = "src"
    )
    
    $results = @()
    $files = Get-ChildItem -Path $directory -Recurse -Filter "*.tsx" | Where-Object { $_.FullName -notlike "*\node_modules\*" }
    
    foreach ($file in $files) {
        $content = Get-Content -Path $file.FullName -Raw
        if ($content -match "import.*$componentName.*from") {
            $results += $file.FullName
        }
    }
    
    return $results
}

# Clear the screen
Clear-Host

Write-Header "ADVANCED CLEANUP SCRIPT FOR REFACTORED COMPONENTS"

Write-Host "This script helps manage files that have been refactored to use reusable components."
Write-Host "WARNING: Only remove files after updating all references to them!" -ForegroundColor Red

# Define the refactored files
$benefitsFiles = @(
    "src\components\home\BenefitsSection.tsx",
    "src\components\hairTransplantation\BenefitsSection.tsx",
    "src\components\beardTransplantation\BenefitsSection.tsx",
    "src\components\eyebrowTransplantation\BenefitsSection.tsx",
    "src\components\hairLossTherapy\BenefitsSection.tsx"
)

$faqFiles = @(
    "src\components\home\FAQSection.tsx",
    "src\components\hairTransplantation\FAQSection.tsx",
    "src\components\beardTransplantation\FAQSection.tsx",
    "src\components\eyebrowTransplantation\FAQSection.tsx",
    "src\components\hairLossTherapy\FAQSection.tsx",
    "src\components\prices\FAQSection.tsx"
)

$processFiles = @(
    "src\components\hairTransplantation\ProcessSection.tsx",
    "src\components\beardTransplantation\ProcessSection.tsx",
    "src\components\eyebrowTransplantation\ProcessSection.tsx",
    "src\components\hairLossTherapy\ProcessSection.tsx"
)

$patternFiles = @(
    "src\components\hairTransplantation\HairLossPatternsSection.tsx",
    "src\components\beardTransplantation\PatternSection.tsx",
    "src\components\eyebrowTransplantation\PatternSection.tsx"
)

# Display the files
Write-SubHeader "[BenefitsSectionComponent] Files"
foreach ($file in $benefitsFiles) {
    Write-Host "- $file"
}

Write-SubHeader "[FAQAccordionSection] Files"
foreach ($file in $faqFiles) {
    Write-Host "- $file"
}

Write-SubHeader "[ProcessStepsSection] Files"
foreach ($file in $processFiles) {
    Write-Host "- $file"
}

Write-SubHeader "[PatternCardsSection] Files"
foreach ($file in $patternFiles) {
    Write-Host "- $file"
}

# Analyze imports
Write-Header "IMPORT ANALYSIS"
Write-Host "Checking which components are imported in other files..." -ForegroundColor Yellow

$allFiles = $benefitsFiles + $faqFiles + $processFiles + $patternFiles
$importMap = @{}

foreach ($file in $allFiles) {
    $componentName = [System.IO.Path]::GetFileNameWithoutExtension($file)
    $imports = Find-Imports -componentName $componentName
    $importMap[$file] = $imports
}

Write-SubHeader "Import Results"
foreach ($file in $allFiles) {
    $imports = $importMap[$file]
    $componentName = [System.IO.Path]::GetFileNameWithoutExtension($file)
    
    if ($imports.Count -eq 0) {
        Write-Host "$componentName is not imported anywhere. Safe to remove." -ForegroundColor Green
    } else {
        Write-Host "$componentName is imported in $($imports.Count) files:" -ForegroundColor Yellow
        foreach ($import in $imports) {
            Write-Host "  - $import"
        }
    }
}

# Provide guidance
Write-Header "REPLACEMENT GUIDANCE"
Write-Host "Before removing these files, you must update all references!" -ForegroundColor Yellow
Write-Host "Here are examples of how to replace the components:"

Write-SubHeader "BenefitsSection Replacement"
Write-Host "Replace:" -ForegroundColor Gray
Write-Host "  import BenefitsSection from '../components/[area]/BenefitsSection';" -ForegroundColor Gray
Write-Host "  <BenefitsSection />" -ForegroundColor Gray
Write-Host "With:" -ForegroundColor Green
Write-Host "  import { BenefitsSectionComponent } from '../components/common/BenefitsSectionComponent';" -ForegroundColor Green
Write-Host "  <BenefitsSectionComponent translationNamespace=`"home`" showCTA={true} ctaLink=`"/kontakt`" />" -ForegroundColor Green

Write-SubHeader "FAQSection Replacement"
Write-Host "Replace:" -ForegroundColor Gray
Write-Host "  import FAQSection from '../components/[area]/FAQSection';" -ForegroundColor Gray
Write-Host "  <FAQSection />" -ForegroundColor Gray
Write-Host "With:" -ForegroundColor Green
Write-Host "  import { FAQAccordionSection } from '../components/common/FAQAccordionSection';" -ForegroundColor Green
Write-Host "  <FAQAccordionSection translationNamespace=`"home`" enableSearch={true} enableCategoryFilters={true} />" -ForegroundColor Green

Write-SubHeader "ProcessSection Replacement"
Write-Host "Replace:" -ForegroundColor Gray
Write-Host "  import ProcessSection from '../components/[area]/ProcessSection';" -ForegroundColor Gray
Write-Host "  <ProcessSection />" -ForegroundColor Gray
Write-Host "With:" -ForegroundColor Green
Write-Host "  import { ProcessStepsSection } from '../components/common/ProcessStepsSection';" -ForegroundColor Green
Write-Host "  <ProcessStepsSection translationNamespace=`"hairTransplantation`" />" -ForegroundColor Green

Write-SubHeader "PatternSection Replacement"
Write-Host "Replace:" -ForegroundColor Gray
Write-Host "  import PatternSection from '../components/[area]/PatternSection';" -ForegroundColor Gray
Write-Host "  <PatternSection />" -ForegroundColor Gray
Write-Host "With:" -ForegroundColor Green
Write-Host "  import { PatternCardsSection } from '../components/common/PatternCardsSection';" -ForegroundColor Green
Write-Host "  <PatternCardsSection translationNamespace=`"beardTransplantation`" />" -ForegroundColor Green

# Ask for action
Write-Header "ACTION MENU"
Write-Host "What would you like to do?"
Write-Host "1. Create backup and remove all files" -ForegroundColor Yellow
Write-Host "2. Remove only files that are not imported anywhere" -ForegroundColor Green
Write-Host "3. Create backup only (no removal)" -ForegroundColor Cyan
Write-Host "4. Exit without any action" -ForegroundColor Gray

$choice = Read-Host "Enter your choice (1-4)"

switch ($choice) {
    "1" {
        # Create backup directory
        $backupDir = "component_backups_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
        New-Item -Path $backupDir -ItemType Directory | Out-Null
        
        # Backup and remove all files
        foreach ($file in $allFiles) {
            if (Test-Path $file) {
                $destFile = Join-Path -Path $backupDir -ChildPath $file
                $destDir = Split-Path -Path $destFile -Parent
                
                if (-not (Test-Path $destDir)) {
                    New-Item -Path $destDir -ItemType Directory -Force | Out-Null
                }
                
                Copy-Item -Path $file -Destination $destFile
                Remove-Item -Path $file
                Write-Host "Backed up and removed: $file" -ForegroundColor Green
            } else {
                Write-Host "File not found: $file" -ForegroundColor Red
            }
        }
        
        Write-Host "`nAll files have been backed up to the '$backupDir' directory and removed." -ForegroundColor Green
    }
    "2" {
        # Remove only files that are not imported
        foreach ($file in $allFiles) {
            if ($importMap[$file].Count -eq 0) {
                if (Test-Path $file) {
                    Remove-Item -Path $file
                    Write-Host "Removed: $file" -ForegroundColor Green
                } else {
                    Write-Host "File not found: $file" -ForegroundColor Red
                }
            }
        }
        
        Write-Host "`nFiles that were not imported anywhere have been removed." -ForegroundColor Green
    }
    "3" {
        # Create backup only
        $backupDir = "component_backups_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
        New-Item -Path $backupDir -ItemType Directory | Out-Null
        
        foreach ($file in $allFiles) {
            if (Test-Path $file) {
                $destFile = Join-Path -Path $backupDir -ChildPath $file
                $destDir = Split-Path -Path $destFile -Parent
                
                if (-not (Test-Path $destDir)) {
                    New-Item -Path $destDir -ItemType Directory -Force | Out-Null
                }
                
                Copy-Item -Path $file -Destination $destFile
                Write-Host "Backed up: $file" -ForegroundColor Green
            } else {
                Write-Host "File not found: $file" -ForegroundColor Red
            }
        }
        
        Write-Host "`nAll files have been backed up to the '$backupDir' directory." -ForegroundColor Green
    }
    "4" {
        Write-Host "`nNo action taken. Exiting script." -ForegroundColor Gray
    }
    default {
        Write-Host "`nInvalid choice. Exiting script." -ForegroundColor Red
    }
}

Write-Header "SCRIPT COMPLETED"
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
