@echo off
echo Starting Grade Calculator...
echo.
echo [1/2] Starting Backend...
start "Backend Server" cmd /k "cd /d c:\alpha-lab\backend && npm run dev"

timeout /t 3 /nobreak >nul

echo [2/2] Starting Frontend...
start "Frontend Server" cmd /k "cd /c:\alpha-lab\frontend && npm run dev"

echo.
echo ========================================
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo ========================================
echo.
pause
