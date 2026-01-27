#!/bin/bash
# Quick Start Script for Egg Boiling Timer

echo "🥚 Egg Boiling Timer - Quick Start Script"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"
echo "✅ npm $(npm -v) detected"
echo ""

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd egg
npm install

echo ""
echo "✅ Frontend installation complete"
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd ../backend
npm install

echo ""
echo "✅ Backend installation complete"
echo ""

echo "🚀 Setup complete! Next steps:"
echo ""
echo "1. Open TWO terminal windows"
echo ""
echo "2. In Terminal 1 (Frontend):"
echo "   cd egg"
echo "   npm run dev"
echo ""
echo "3. In Terminal 2 (Backend):"
echo "   cd backend"
echo "   npm start"
echo ""
echo "4. Open your browser:"
echo "   http://localhost:5175"
echo ""
echo "Enjoy! 🥚✨"
