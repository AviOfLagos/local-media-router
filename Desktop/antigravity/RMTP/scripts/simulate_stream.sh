#!/bin/bash

# Generates a test stream without needing a camera
# Uses FFmpeg's testsrc (colored pattern) + sine wave audio

STREAM_KEY="simulated_stream"
TARGET_URL="rtmp://localhost/live/$STREAM_KEY"

echo ">>> Starting Simulated Stream..."
echo "Target: $TARGET_URL"
echo "Press Ctrl+C to stop."

ffmpeg -re -f lavfi -i testsrc=size=1280x720:rate=30 \
       -f lavfi -i sine=frequency=1000 \
       -c:v libx264 -preset ultrafast -tune zerolatency \
       -c:a aac -ar 44100 \
       -f flv "$TARGET_URL"
