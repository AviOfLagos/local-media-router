SYSTEM ARCHITECTURE SPEC

Purpose: Prevents agents from inventing random structure.

System Layers

1. Media Layer

NGINX with RTMP module

Handles stream ingest only

NEVER modified dynamically by code


2. Processing Layer

FFmpeg processes spawned by backend

Handles relays, bitrate control, delay, format adjustments


3. Control Layer (Backend API)

Node.js + TypeScript

Manages stream lifecycle

Manages FFmpeg workers

Provides system metrics

4. UI Layer

React dashboard

Talks only to API

Data Flow

Camera → RTMP → NGINX
NGINX → Node detects stream
Node → launches FFmpeg workers
FFmpeg → outputs to:
    - OBS endpoint
    - External RTMP platforms

Rules

UI never talks to FFmpeg

FFmpeg never writes business logic

Backend never handles raw video

Media layer and API must run independently
