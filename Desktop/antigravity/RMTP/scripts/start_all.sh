#!/bin/bash

# Configuration
NGINX_CONF="$(pwd)/media-server/nginx.conf"
BACKEND_DIR="$(pwd)/backend"
FRONTEND_DIR="$(pwd)/frontend"

# Check dependencies
echo "Checking dependencies..."
if ! command -v ffmpeg &> /dev/null; then
    echo "FFmpeg is required but not installed. Please install it (brew install ffmpeg)."
    exit 1
fi

# Cleanup function
cleanup() {
    echo ""
    echo "Stopping all services..."
    kill $(jobs -p) 2>/dev/null
    nginx -s stop 2>/dev/null
    exit
}

# Trap Ctrl+C
trap cleanup SIGINT

# Cleanup function - kill existing processes
echo ">>> Checking for existing processes..."
EXISTING_BACKEND=$(lsof -ti:4000 2>/dev/null)
if [ ! -z "$EXISTING_BACKEND" ]; then
    echo "Killing existing backend processes: $EXISTING_BACKEND"
    kill $EXISTING_BACKEND 2>/dev/null
    sleep 1
fi

EXISTING_FRONTEND=$(lsof -ti:5173 2>/dev/null)
if [ ! -z "$EXISTING_FRONTEND" ]; then
    echo "Killing existing frontend processes: $EXISTING_FRONTEND"
    kill $EXISTING_FRONTEND 2>/dev/null
    sleep 1
fi

# 1. Start NGINX
echo ">>> Starting NGINX..."
nginx -s stop 2>/dev/null # Stop any existing instance
nginx -c "$NGINX_CONF"
if [ $? -ne 0 ]; then
    echo "Failed to start NGINX."
    exit 1
fi
echo "✓ NGINX started (RTMP: 1935, HLS: 8080)"

# 2. Start Backend
echo ">>> Starting Backend API..."
cd "$BACKEND_DIR"
npm run dev &
BACKEND_PID=$!
cd ..
echo "✓ Backend started (PID: $BACKEND_PID)"

# 3. Start Frontend
echo ">>> Starting Frontend..."
cd "$FRONTEND_DIR"
npm run dev &
FRONTEND_PID=$!
cd ..
echo "✓ Frontend started (PID: $FRONTEND_PID)"

# 4. Success Message
echo ""
echo "=================================================="
echo "   🚀 SYSTEM ONLINE"
echo "=================================================="
echo "   - Stream Ingest: rtmp://localhost/live/{stream_key}"
echo "   - Dashboard:     http://localhost:5173"
echo "   - API:           http://localhost:4000"
echo "   - Playback:      http://localhost:4000/player.html"
echo "=================================================="
echo "Press Ctrl+C to stop all services."

# Wait for processes
wait
