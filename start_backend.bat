@echo off
cd /d "%~dp0api"

echo [INFO] Checking for virtual environment...
if not exist venv (
    echo [INFO] Creating virtual environment...
    python -m venv venv
)

echo [INFO] Activating virtual environment...
call venv\Scripts\activate.bat

echo [INFO] Installing/Updating requirements...
pip install -r requirements.txt

echo [INFO] Starting Backend Server...
python -m uvicorn server:app --reload --port 8000

pause
