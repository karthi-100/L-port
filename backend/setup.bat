@echo off
REM Quick start script for L-Port Backend on Windows

setlocal enabledelayedexpansion

echo ======================================
echo    L-Port Backend Quick Start
echo ======================================
echo.

REM Check Python version
echo [OK] Checking Python version...
python --version
if errorlevel 1 (
    echo [ERROR] Python is not installed or not in PATH
    pause
    exit /b 1
)

REM Create virtual environment
echo.
echo [OK] Creating virtual environment...
if not exist "venv" (
    python -m venv venv
    echo     Virtual environment created
) else (
    echo     Virtual environment already exists
)

REM Activate virtual environment
echo.
echo [OK] Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo.
echo [OK] Installing dependencies...
python -m pip install --upgrade pip
pip install -r requirements.txt

REM Create .env if not exists
echo.
echo [OK] Checking environment configuration...
if not exist ".env" (
    echo     Creating .env file from template...
    copy .env.example .env
    echo     WARNING: Edit .env with your credentials!
) else (
    echo     .env file already exists
)

REM Show next steps
echo.
echo ======================================
echo    [OK] Setup Complete!
echo ======================================
echo.
echo Next steps:
echo.
echo 1. Edit your .env file with credentials:
echo    - RAZORPAY_KEY_ID
echo    - RAZORPAY_KEY_SECRET
echo    - SMTP_EMAIL
echo    - SMTP_PASSWORD
echo.
echo 2. Run the development server:
echo    uvicorn main:app --reload --host 0.0.0.0 --port 8000
echo.
echo 3. Open Swagger docs:
echo    http://localhost:8000/docs
echo.
echo ======================================
echo.
pause
