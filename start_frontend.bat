@echo off
cd /d "%~dp0frontend"

echo [INFO] Starting Frontend Server...
echo.
echo Backend should be running at http://localhost:8000
echo Frontend will open at http://localhost:3000
echo.
echo Press CTRL+C to stop the server
echo.

npm start

pause
