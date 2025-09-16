#!/bin/bash

echo "🚀 Starting Haymanh Success Initiative..."

# Create .env file for frontend if it doesn't exist
if [ ! -f "haymanh-success/.env" ]; then
    echo "📝 Creating .env file for frontend..."
    echo "REACT_APP_API_URL=http://localhost:5000" > haymanh-success/.env
    echo "✅ .env file created!"
fi

# Create .env file for backend if it doesn't exist
if [ ! -f "backend/.env" ]; then
    echo "📝 Creating .env file for backend..."
    cp backend/env.example backend/.env
    echo "✅ .env file created from example!"
fi

# Start Backend in background
echo "🔧 Starting Backend Server..."
cd backend
npm install
npm run build
npm run dev &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start Frontend
echo "🎨 Starting Frontend..."
cd haymanh-success
npm install
npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo "🎉 Haymanh Success Initiative is starting up!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:5000"
echo "🏥 Health Check: http://localhost:5000/health"
echo ""
echo "Press Ctrl+C to stop both servers"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Servers stopped!"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for both processes
wait
