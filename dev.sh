#!/bin/bash
# Development server helper script
# Ensures port 5173 is free and starts VitePress dev server

echo "🔍 Checking for existing VitePress dev servers..."

# Kill any existing VitePress dev servers
pkill -f "vitepress dev" 2>/dev/null

# Wait a moment for ports to be released
sleep 1

# Check if port 5173 is still in use
if lsof -i :5173 >/dev/null 2>&1; then
    echo "⚠️  Port 5173 is still in use. Attempting to free it..."
    PID=$(lsof -t -i :5173)
    if [ ! -z "$PID" ]; then
        kill -9 $PID 2>/dev/null
        sleep 1
    fi
fi

echo "🚀 Starting VitePress dev server on port 5173..."
npm run docs:dev
