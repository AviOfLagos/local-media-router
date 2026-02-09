# LMR Backend

Node.js + TypeScript service that acts as the "brain" of the Local Media Router.

## Responsibilities
- **Stream Detection**: Polls NGINX stats to detect active streams.
- **FFmpeg Orchestration**: Spawns and manages FFmpeg child processes for relaying.
- **Metrics**: Aggregates system and stream health data.

## Commands
- `npm run dev`: Start in development mode with hot-reload.
- `npm run build`: Compile TypeScript.
- `npm start`: Run compiled code.

## API Endpoints
- `GET /api/status`: System overview.
- `POST /api/start-relay`: Start forwarding stream.
- `POST /api/stop-relay`: Stop forwarding.
