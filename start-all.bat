@echo off
title Launching IMovies Application
echo ========================================================
echo   Launching IMovies Full-Stack Cinema Ticketing App
echo ========================================================
echo.

cd /d "%~dp0"

echo [1/3] Starting Backend API Server on http://localhost:5000 ...
start "IMovies Server [Port 5000]" cmd /k "cd server && npm start"

echo [2/3] Waiting 3 seconds for database and API startup...
timeout /t 3 /nobreak >nul

echo [3/3] Starting Frontend React App on http://localhost:3000 ...
start "IMovies Client [Port 3000]" cmd /k "cd client && npm run dev"

echo.
echo All services launched!
echo Opening browser in 2 seconds...
timeout /t 2 /nobreak >nul
start http://localhost:3000
exit

