#!/bin/bash
echo "Cleaning up ports 4000, 1935, 8080, 5173..."
lsof -ti:4000,1935,8080,5173 | xargs kill -9 2>/dev/null
exit 0
