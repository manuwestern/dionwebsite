@echo off
echo ===================================================================
echo POWERSHELL SCRIPT LAUNCHER
echo ===================================================================
echo.
echo This batch file will launch the PowerShell cleanup script.
echo.

REM Check if PowerShell is available
where powershell >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ERROR: PowerShell is not available on this system.
    echo Please install PowerShell to run this script.
    echo.
    pause
    exit /b 1
)

echo Starting PowerShell script...
echo.

REM Run the PowerShell script with bypass execution policy
powershell -ExecutionPolicy Bypass -File "cleanup.ps1"

echo.
echo PowerShell script execution completed.
echo.
pause
