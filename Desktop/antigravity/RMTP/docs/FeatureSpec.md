FEATURE SPEC (MVP ONLY)

Agents must not build beyond this.


---

Feature 1 — RTMP Ingest

Description: Accept RTMP stream locally.

Success Criteria

Stream can be pushed to rtmp://localhost/live/stream

Stream appears in nginx stats


Edge Cases

Stream drops unexpectedly

Stream reconnects



---

Feature 2 — Stream Detection

Backend detects when stream is live/offline.

Success

API status updates in ≤2 seconds



---

Feature 3 — OBS Output Endpoint

OBS can pull stream from LMR.

Success

OBS shows video without stutter



---

Feature 4 — External Relay

Forward stream to at least 1 RTMP destination.

Success

YouTube test endpoint receives stream



---

Feature 5 — Control UI

Buttons:

Start relay

Stop relay

Show stream status



---

Feature 6 — Metrics

Show:

CPU usage

Stream bitrate

Relay status


