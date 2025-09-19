#!/bin/bash

echo "🚀 Building Haymanh Success Initiative for Production..."

# Build Backend
echo "📦 Building Backend..."
cd backend
npm install
npm run build
echo "✅ Backend built successfully!"

# Build Frontend
echo "📦 Building Frontend..."
cd ../haymanh-success
npm install
npm run build
echo "✅ Frontend built successfully!"

echo "🎉 All builds completed successfully!"
echo "📁 Backend build: backend/dist/"
echo "📁 Frontend build: haymanh-success/build/"
echo ""
echo "🚀 Ready for deployment!"
echo "1. Upload backend/ to Railway"
echo "2. Upload haymanh-success/ to Vercel"
