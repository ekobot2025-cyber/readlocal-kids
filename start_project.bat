@echo off
echo ===================================================
echo   Starting ReadLocal Kids (Local Preview)
echo ===================================================
echo.
echo 1. Starting FastAPI Backend Server on http://localhost:8000...
start "ReadLocal Backend" cmd /k "cd backend && python -m uvicorn server:app --reload --port 8000"

echo 2. Starting Vite React Frontend Dev Server...
start "ReadLocal Frontend" cmd /k "cd frontend && npm.cmd run dev"

echo.
echo ===================================================
echo   System running!
echo   - Backend: http://localhost:8000
echo   - Frontend: http://localhost:5173
echo.
echo   Press any key to close this launcher window...
echo ===================================================
pause > nul
