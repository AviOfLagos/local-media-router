# Additional Edge Cases & Solutions

## 🚨 Critical Edge Cases We Need to Handle

### 1. **OBS Browser Source CORS Issues**
**Problem**: OBS Browser Source may fail to load HLS from `http://localhost:8080/hls/` due to CORS
**Solution**: ✅ Already handled in `nginx.conf` line 49: `add_header Access-Control-Allow-Origin *;`

**Verification needed**:
- Test actual OBS Browser Source loading
- Check if localhost vs LAN IP matters
- Ensure HLS segments are being generated

---

### 2. **Network Discovery (No Static IP)**
**Problem**: User's LAN IP changes (DHCP), breaking OBS connection
**Current**: We detect IP at startup, but don't handle changes

**Solution**:
- Add IP change detection (poll network interfaces every 30s)
- Show warning in UI: "⚠️ IP changed from X to Y. Update OBS source!"
- Option: mDNS/Bonjour service name (e.g., `http://lmr.local:8080/hls/...`)

---

### 3. **HLS Segment Cleanup** 
**Problem**: `/tmp/hls/` accumulates `.ts` files indefinitely
**Current**: NGINX writes segments but never cleans old ones

**Impact**:
- Disk fills up after hours of streaming
- `/tmp` partition exhaustion

**Solution**:
```bash
# Add to nginx.conf
hls_playlist_length 60;  # ✅ Already set
hls_fragment 3;          # ✅ Already set  
hls_cleanup on;          # ⚠️ MISSING! Add this
```

---

### 4. **Firewall Blocking RTMP Port 1935**
**Problem**: Camera can't connect even with correct URL
**Detection**: 
- NGINX listening but no connections
- Camera shows "connection refused"

**Solution**:
- Add firewall check to setup script
- On macOS: `sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /usr/local/bin/nginx`
- Show in UI: "🔥 Firewall may be blocking port 1935"

---

### 5. **Stream Bitrate Mismatch** 
**Problem**: Camera sends 4K @ 20 Mbps, relay forwards to YouTube @ 6 Mbps limit
**Result**: YouTube rejects stream or buffers

**Solution**:
- Add **optional transcoding** mode (not default!)
- Warn if bitrate > platform limit
- YouTube max: 51 Mbps (4K), 9 Mbps (1080p)
- Show: "⚠️ Your 4K stream (15 Mbps) exceeds YouTube 1080p limit (9 Mbps)"

---

### 6. **Platform Rate Limits**
**Problem**: YouTube limits concurrent live streams
- Free accounts: 1 concurrent stream
- Verified: Multiple streams allowed

**Solution**:
- Track active destinations per platform
- Warn: "You're already streaming to YouTube as 'stream1'. Starting another may fail."

---

### 7. **Encoder Compatibility** 
**Problem**: Some cameras use H.265 (HEVC), but YouTube only accepts H.264
**Current**: We use `-c copy`, so this would fail

**Solution**:
- Detect codec from stream metadata
- If H.265 detected:
  - Option A: Auto-transcode to H.264 (CPU heavy)
  - Option B: Reject with error: "YouTube doesn't support H.265. Use H.264 mode on camera."

---

### 8. **Authentication Token Expiry** (YouTube API)
**Problem**: OAuth tokens expire after 1 hour
**Impact**: Stream starts, but metadata (title, description) update fails after 60 min

**Solution**:
- Implement refresh token flow
- Store access token + refresh token securely
- Auto-refresh before expiry

---

### 9. **Stream Delay/Buffering**
**Problem**: OBS Browser Source shows stream 10-15 seconds behind live
**Cause**: HLS inherent latency (segment duration + playlist fetch)

**Current Setup**:
```
hls_fragment 3s  → 3s per segment
hls_playlist_length 60s → keeps 20 segments
```

**Optimization**:
- Reduce to `hls_fragment 1s` (lower latency)
- Trade-off: More CPU, more segments
- For ultra-low latency: Consider WebRTC (future)

---

### 10. **Multi-Device Same Stream Key**
**Already documented** but worth emphasizing:
- Last device wins
- First device gets kicked

**Better UX**:
- Show in UI: "⚠️ Stream 'camera1' replaced by new connection from 192.168.100.20"

---

### 11. **System Resource Exhaustion**
**Scenario**: 5 streams @ 4 Mbps each + 3 relays = CPU overload
**Detection**:
- Monitor CPU via `os.loadavg()`
- If > 80% for 30s: Show warning

**Prevention**:
- Limit max concurrent streams (configurable, default 3)
- Reject new streams if limit reached
- Error: "Max 3 streams allowed. Stop an existing stream first."

---

### 12. **Platform-Specific Requirements**

#### **YouTube**:
- Requires RTMPS (port 443) not RTMP
- Stream key format: Complex (varies by account)
- Metadata: Title, Description, Category, Privacy (public/unlisted/private)
- Auto-start broadcast: Requires API call
- Thumbnail: Can be uploaded via API

#### **Twitch**:
- RTMPS: `rtmps://live.twitch.tv/app/{stream_key}`
- Max bitrate: 6 Mbps
- Title only (via API), no description
- Game/Category required

#### **Facebook**:
- Requires Page ID or Profile ID
- Stream key: Very long (40+ chars)
- Privacy: Public, Friends, Custom
- Scheduled vs Continuous stream

---

## 🎯 Priority Order for Implementation

### **P0 (Must Have - This Sprint)**:
1. ✅ HLS cleanup (`hls_cleanup on`)
2. ✅ YouTube destination with metadata (title, description, category)
3. ✅ Browser source URL generation
4. ✅ Codec detection warning

### **P1 (Should Have - Next Sprint)**:
5. ⚠️ IP change detection
6. ⚠️ Firewall check in setup
7. ⚠️ Platform bitrate limits
8. ⚠️ Stream replacement notification

### **P2 (Nice to Have)**:
9. 📝 Twitch integration
10. 📝 Multi-device conflict resolution
11. 📝 Auto-transcoding for codec mismatch
12. 📝 OAuth token refresh

---

## 📋 Testing Checklist

- [ ] OBS Browser Source: Load `http://192.168.100.6:4000/player.html?stream=test`
- [ ] Multiple cameras with different stream keys
- [ ] Camera reconnection after network drop
- [ ] Disk usage after 2 hours of streaming
- [ ] CPU usage with 3 concurrent streams
- [ ] YouTube stream with metadata
- [ ] Firewall blocking scenario
- [ ] Stream key collision
