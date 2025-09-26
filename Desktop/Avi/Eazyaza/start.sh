#!/bin/bash

# 🚀 EazyAza Platform Startup Script
# This script starts both the backend and frontend concurrently

echo "🎉 Starting EazyAza Platform..."
echo ""
echo "🏪 Backend will start on: http://localhost:9000"
echo "🌐 Storefront will start on: http://localhost:8000"
echo "📊 Admin Dashboard: http://localhost:9000/app"
echo ""
echo "🏢 Demo Tenant Stores:"
echo "   • ACME Store: http://acme-store.localhost:8000"
echo "   • Fashion Hub: http://fashion-hub.localhost:8000"
echo "   • Naija Market: http://naija-market.localhost:8000"
echo "   • Tech World: http://tech-world.localhost:8000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo "============================================"

# Run the smart dev script with port checking
npm run dev