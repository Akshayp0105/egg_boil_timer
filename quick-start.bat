@echo off
REM Quick Start Script for Egg Boiling Timer (Windows)

echo.
echo 🥚 Egg Boiling Timer - Quick Start Script
echo ==========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed.
    echo Please download and install from https://nodejs.org
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i

echo ✅ Node.js %NODE_VERSION% detected
echo ✅ npm %NPM_VERSION% detected
echo.

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd egg
call npm install

echo.
echo ✅ Frontend installation complete
echo.

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd ..\backend
call npm install

echo.
echo ✅ Backend installation complete
echo.

echo 🚀 Setup complete! Next steps:
echo.
echo 1. Open TWO command prompt windows
echo.
echo 2. In Terminal 1 ^(Frontend^):
echo    cd egg
echo    npm run dev
echo.
echo 3. In Terminal 2 ^(Backend^):
echo    cd backend
echo    npm start
echo.
echo 4. Open your browser and navigate to:
echo    http://localhost:5175
echo.
echo Enjoy! 🥚✨
echo.
pause
