# Local Media Router (LMR) 🚀

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

**The lightweight, high-performance RTMP stream relay engine designed for local deployment.**

LMR receives RTMP streams (from cameras, drones, OBS, etc.), processes them locally, and lets you push them to multiple destinations (YouTube, Twitch, Facebook) simultaneously—all from a beautiful, modern dashboard.

---

## 📚 Documentation (Next.js Style)

We've built a comprehensive documentation site directly into the application dashboard. Launch the app to explore:
- **Project Overview**: Why we built this and how it helps low-end systems.
- **Deep Dive Features**: Multi-stream architecture, OBS integration, and platform support.
- **Roadmap**: What's coming next (Twitch API, Auto-transcoding).

---

## 🌟 Key Features

- **Multi-Stream Support**: Ingest multiple cameras at once.
- **Low-Latency Relay**: Push to YouTube/Twitch with minimal delay using `-c copy`.
- **OBS Browser Source**: Get instant HLS player URLs for your OBS scenes.
- **Smart Dashboard**: Real-time bitrate monitoring, stream health, and error logging.
- **Platform Integration**: Native support for YouTube Live metadata (Title, Description, Category).
- **Resource Efficient**: Designed to run on modest hardware (though high-bitrate streams will use CPU!).

---

## ⚠️ Important Note on CPU Usage

LMR is powerful, but processing video streams is intensive.
- **High Bitrate = High CPU**: Streaming 4K or multiple 1080p streams will spike CPU usage.
- **Recommendation**: For low-end devices, stick to 720p/1080p at 30fps and limit concurrent streams to 2.
- **Monitoring**: Keep an eye on the "System Health" card in the dashboard.

---

## 🚀 Quick Start

### 1. Prerequisite (Mac Only)
This project uses **NGINX** with the RTMP module.
```bash
# Run our automated setup script
./scripts/setup.sh
```

### 2. Start the System
Launch Media Server, Backend, and Dashboard with one command:
```bash
./scripts/start_all.sh
```

- **Dashboard**: [http://localhost:5173](http://localhost:5173)
- **API**: [http://localhost:4000](http://localhost:4000)
- **RTMP Ingest**: `rtmp://localhost/live/{stream_key}`

---

## 🤝 Contributing & Roadmap

We love open source! This project is MIT Licensed and open for everyone.

**How to Contribute:**
1. Fork the repo.
2. Create a feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes.
4. Push to the branch.
5. Open a Pull Request!

**Current Roadmap:**
- [x] Multi-stream architecture
- [x] YouTube Live integration
- [ ] Twitch API integration
- [ ] Auto-transcoding for H.265 -> H.264
- [ ] User authentication system

See the [Issues](https://github.com/yourusername/local-media-router/issues) tab for more.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
