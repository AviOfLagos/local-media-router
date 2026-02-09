#!/bin/bash
# Start NGINX with our custom config
NGINX_CONF="$(pwd)/media-server/nginx.conf"

echo "Starting NGINX with config: $NGINX_CONF"
# Stop existing nginx if any
nginx -s stop 2>/dev/null

# Create logs dir if not exists (nginx conf assumes standard log paths or we should specify them?)
# The provided nginx.conf doesn't specify log paths, so it defaults to brew's default.

# Run nginx
nginx -c "$NGINX_CONF"

if [ $? -eq 0 ]; then
    echo "NGINX started successfully."
else
    echo "Failed to start NGINX. Check errors above."
fi
