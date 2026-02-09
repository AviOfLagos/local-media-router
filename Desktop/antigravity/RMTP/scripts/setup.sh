#!/bin/bash

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}=== Local Media Router Setup ===${NC}"

# Check for Homebrew
if ! command -v brew &> /dev/null; then
    echo -e "${RED}Homebrew not found. Please install Homebrew first: https://brew.sh/${NC}"
    exit 1
fi

# Install NGINX with RTMP if not present
if ! command -v nginx &> /dev/null; then
    echo "Installing NGINX with RTMP module..."
    brew tap denji/nginx
    brew install nginx-full --with-rtmp-module
else
    echo -e "${GREEN}✓ NGINX is already installed${NC}"
fi

# Create HLS directory
echo "Setting up HLS temporary directory..."
mkdir -p /tmp/hls
chmod 777 /tmp/hls

# Install Node dependencies
echo "Installing project dependencies..."
npm install

echo -e "\n${GREEN}=== Setup Complete ===${NC}"
echo "Run 'npm start' to launch the application."
