# Multi-Stream Architecture

## Overview
The system now supports **multiple simultaneous RTMP streams**, allowing you to have several sources (cameras, simulators, encoders) streaming to the same server.

## How It Works

### 1. Stream Keys (The Foundation)
Each stream must have a **unique stream key**. The URL format is:
```
rtmp://{server_ip}/live/{stream_key}
```

**Examples:**
- Camera 1: `rtmp://192.168.100.6/live/camera1`
- Camera 2: `rtmp://192.168.100.6/live/camera2`
- Simulator: `rtmp://192.168.100.6/live/simulated_stream`
- Drone: `rtmp://192.168.100.6/live/drone_feed`

### 2. Stream Detection
The `StreamDetectionService` polls NGINX every 2 seconds and:
- Detects **ALL active streams** (not just the first one)
- Extracts metadata: resolution, codec, bitrate, uptime
- Calculates total bandwidth usage
- Warns if total bitrate > 10 Mbps (low-end system protection)

### 3. Frontend Stream Selector
When multiple streams are detected:
- **StreamSelector component** displays all active streams
- Shows resolution, codec, bitrate, and uptime for each
- User clicks to select which stream to use for outputs
- Selected stream is highlighted with blue border

### 4. Relay Assignment
When adding an output destination:
- System uses the **currently selected stream**
- If you select "camera1", relays from `rtmp://127.0.0.1:1935/live/camera1`
- If you select "simulated_stream", relays from that instead
- You can switch selection and add more relays from different streams

## Edge Cases Handled

### ✅ Scenario 1: Multiple Different Streams
**Setup:**
- Camera → `rtmp://server/live/camera1`
- Simulator → `rtmp://server/live/test`

**Behavior:**
- Dashboard shows both streams in StreamSelector
- User picks one to send to YouTube
- User can pick the other to send to Twitch
- Both relays run independently

**Why it's safe:**
- Each relay is an isolated FFmpeg process
- If YouTube relay crashes, Twitch keeps running
- Different stream keys = no conflict

---

### ⚠️ Scenario 2: Same Stream Key Collision
**Setup:**
- Camera 1 → `rtmp://server/live/test`
- Camera 2 → `rtmp://server/live/test` (same key!)

**NGINX Behavior:**
- **Last-writer-wins**: Camera 2 replaces Camera 1
- Only the most recent connection remains active
- First camera is forcibly disconnected

**Prevention:**
- Always use unique stream keys
- Format: `live/{device_name}` or `live/{unique_id}`

---

### 🔧 Scenario 3: High Bandwidth Warning  
**Setup:**
- Stream 1: 4K @ 8 Mbps
- Stream 2: 1080p @ 3 Mbps
- **Total: 11 Mbps**

**Behavior:**
- System logs: `HIGH BANDWIDTH WARNING: Total 11.0 Mbps may stress low-end systems`
- All streams continue running
- User can see warning in System Logs panel

**Recommendation:**
- On low-end hardware, limit to 1-2 streams
- Or use lower bitrates (720p @ 2 Mbps each)

---

### 🔄 Scenario 4: Stream Reconnection
**Setup:**
- Camera disconnects mid-stream
- Reconnects 10 seconds later with same stream key

**Behavior:**
1. StreamDetectionService detects disconnection
2. Logs: "All streams ended"
3. Auto-relays keep retrying (exponential backoff)
4. When stream returns, detection resumes
5. User's selected stream persists (if same key)

**Note:** If stream key changes, user must reselect

---

### 💡 Scenario 5: Dynamic Stream Addition
**Setup:**
- User starts with 1 stream
- Adds a second stream while first is relaying

**Behavior:**
1. New stream appears in StreamSelector automatically
2. Existing relays continue uninterrupted
3. Stream count badge updates (1 ACTIVE → 2 ACTIVE)
4. User can add relays from the new stream immediately

**No restart required!**

---

## Technical Implementation

### Backend Changes
**`StreamDetectionService.ts`:**
- Changed from single stream to `streams: StreamInfo[]`
- Iterates over ALL streams in NGINX stats XML
- Stores array instead of single object

**`api.ts` Routes:**
- `/api/status` now returns `{ stream: { isLive, streams[], totalBitrate } }`
- `/relays/start` accepts optional `streamName` parameter
- If `streamName` not specified, defaults to first stream

### Frontend Changes
**New Component: `StreamSelector.tsx`:**
- Displays grid of active streams
- Clickable cards with hover effects
- Shows resolution, codec, bitrate, uptime
- Highlights selected stream

**Updated: `App.tsx`:**
- Added `selectedStream` state
- Auto-selects first stream on detection
- Passes `selectedStream` to relay handlers

**Updated: `types.ts`:**
- New `StreamInfo` interface
- `StreamStatus` now has `streams: StreamInfo[]` instead of single `streamName`

## API Examples

### Get Status with Multiple Streams
```bash
curl http://localhost:4000/api/status
```

**Response:**
```json
{
  "stream": {
    "isLive": true,
    "streams": [
      {
        "name": "camera1",
        "uptime": 145.2,
        "videoBitrate": 4500000,
        "audioBitrate": 128000,
        "width": 1920,
        "height": 1080,
        "codec": "H264",
        "clients": 1
      },
      {
        "name": "simulated_stream",
        "uptime": 62.8,
        "videoBitrate": 300000,
        "audioBitrate": 69000,
        "width": 1280,
        "height": 720,
        "codec": "H264",
        "clients": 1
      }
    ],
    "totalBitrate": 4997000,
    "timestamp": "2026-02-05T08:30:00.000Z"
  }
}
```

### Start Relay with Specific Stream
```bash
curl -X POST http://localhost:4000/api/relays/start \
  -H "Content-Type: application/json" \
  -d '{
    "id": "youtube",
    "targetUrl": "rtmp://a.rtmp.youtube.com/live2/YOUR_KEY",
    "streamName": "camera1"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Relay 'youtube' started for stream 'camera1'"
}
```

## Best Practices

### For Low-End Systems:
1. **Limit concurrent streams to 2-3 maximum**
2. **Use 720p @ 2-3 Mbps** instead of 4K
3. **Monitor CPU usage** in System Metrics card
4. **Avoid transcoding** - always use `-c copy` (we do this automatically)

### For Stream Naming:
1. **Use descriptive names**: `front_door_cam` not `test`
2. **Include device identifier**: `drone_dji_001`
3. **Avoid special characters**: Stick to `a-z0-9_-`

### For Production:
1. **Document your stream keys** in a config file
2. **Use unique keys** for each physical device
3. **Test disconnection/reconnection** scenarios
4. **Monitor bandwidth** via System Logs

## Testing the Feature

### Test 1: Dual Stream Setup
```bash
# Terminal 1: Start simulator
./scripts/simulate_stream.sh

# Terminal 2: Connect real camera
# Point camera to: rtmp://192.168.100.6/live/camera1

# Dashboard should show BOTH streams in StreamSelector
```

### Test 2: Collision Test
```bash
# Terminal 1
ffmpeg -re -i video1.mp4 -c copy -f flv rtmp://localhost/live/test

# Terminal 2 (wait 5 sec, then run)
ffmpeg -re -i video2.mp4 -c copy -f flv rtmp://localhost/live/test

# Only video2 should be visible (last-writer-wins)
```

### Test 3: Bandwidth Warning
```bash
# Push two high-bitrate streams
ffmpeg -re -i 4k_video.mp4 -c copy -f flv rtmp://localhost/live/stream1
ffmpeg -re -i another_4k.mp4 -c copy -f flv rtmp://localhost/live/stream2

# Check System Logs for HIGH BANDWIDTH WARNING
```

## Troubleshooting

**Q: I have 2 cameras but only see 1 stream**
- Check if both use different stream keys
- Verify both show "connected" status
- Check NGINX stats: `curl http://localhost:8080/stat`

**Q: Selected stream keeps changing**
- This happens if the stream disconnects
- System auto-selects first available stream
- Reconnect with same stream key to maintain selection

**Q: Relay using wrong stream**
- Ensure you've clicked the correct stream in StreamSelector BEFORE adding relay
- Check relay details in Controls panel - it shows the `input` URL

**Q: System feels slow with multiple streams**
- Check total bitrate in StreamSelector
- If > 10 Mbps, reduce stream quality or count
- Monitor CPU usage in System Metrics
