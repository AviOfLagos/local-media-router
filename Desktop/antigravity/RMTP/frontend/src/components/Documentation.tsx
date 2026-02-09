import React, { useState } from 'react';
import './Documentation.css';

type DocPage = 'OVERVIEW' | 'ARCHITECTURE' | 'FEATURES' | 'TROUBLESHOOTING' | 'ROADMAP';

export const Documentation: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activePage, setActivePage] = useState<DocPage>('OVERVIEW');

  return (
    <div className="docs-overlay">
      <div className="docs-container">
        {/* Sidebar */}
        <aside className="docs-sidebar">
          <div className="docs-header">
            <h2>LMR Docs</h2>
            <span className="version">v1.2.0</span>
          </div>
          <nav className="docs-nav">
            <button 
              className={activePage === 'OVERVIEW' ? 'active' : ''} 
              onClick={() => setActivePage('OVERVIEW')}
            >
              Introduction
            </button>
            <button 
              className={activePage === 'ARCHITECTURE' ? 'active' : ''} 
              onClick={() => setActivePage('ARCHITECTURE')}
            >
              System Architecture
            </button>
            <button 
              className={activePage === 'FEATURES' ? 'active' : ''} 
              onClick={() => setActivePage('FEATURES')}
            >
              Features & Guides
            </button>
            <button 
              className={activePage === 'TROUBLESHOOTING' ? 'active' : ''} 
              onClick={() => setActivePage('TROUBLESHOOTING')}
            >
              Troubleshooting
            </button>
            <button 
              className={activePage === 'ROADMAP' ? 'active' : ''} 
              onClick={() => setActivePage('ROADMAP')}
            >
              Roadmap & Community
            </button>
          </nav>
          <div className="docs-footer">
            <a href="https://github.com/yourusername/local-media-router" target="_blank" rel="noreferrer">
              <span className="icon">★</span> Star on GitHub
            </a>
          </div>
        </aside>

        {/* Content Area */}
        <main className="docs-content">
          <button className="close-btn" onClick={onClose} title="Close Docs">✕</button>
          
          {activePage === 'OVERVIEW' && (
            <div className="content-section fade-in">
              <h1>Local Media Router</h1>
              <p className="lead">
                An open-source, high-performance middleware for handling local RTMP streams and relaying them to the world.
              </p>
              
              <div className="hero-grid">
                <div className="hero-stat">
                  <span className="value">0ms</span>
                  <span className="label">Added Latency*</span>
                </div>
                <div className="hero-stat">
                  <span className="value">4K</span>
                  <span className="label">Resolution Ready</span>
                </div>
                <div className="hero-stat">
                  <span className="value">MIT</span>
                  <span className="label">Open Source</span>
                </div>
              </div>
              <p className="footnote">* When using direct stream copy mode</p>

              <hr />

              <h3>The Problem</h3>
              <p>
                Streaming often involves complex setups: running OBS on a powerful desktop, paying for cloud restreaming services (like Restream.io), 
                or dealing with bulky hardware encoders. If you want to stream from a drone or a GoPro to YouTube, you usually need a phone or a laptop 
                doing heavy lifting.
              </p>

              <h3>The LMR Solution</h3>
              <p>
                LMR runs on lightweight hardware (like a Mac Mini, Raspberry Pi 5, or older laptop). It acts as a <strong>central traffic controller</strong> for your video.
                You send your video <em>once</em> to LMR, and it handles:
              </p>
              <ul>
                <li><strong>Distribution:</strong> Sending to YouTube, Twitch, and Facebook simultaneously.</li>
                <li><strong>Monitoring:</strong> Tracking connection health and bitrate in real-time.</li>
                <li><strong>Integration:</strong> Providing instant "Browser Source" links for OBS overlays.</li>
              </ul>
            </div>
          )}

          {activePage === 'ARCHITECTURE' && (
            <div className="content-section fade-in">
              <h1>System Architecture</h1>
              <p className="lead">Understanding how data flows through the LMR stack.</p>
              
              <div className="architecture-diagram">
                <div className="arch-row">
                  <div className="arch-box source">
                    <span className="icon">📹</span>
                    <strong>Sources</strong>
                    <small>Camera, Drone, OBS</small>
                  </div>
                  <div className="arrow">RTMP →</div>
                  <div className="arch-box core">
                    <span className="icon">⚙️</span>
                    <strong>NGINX Media Server</strong>
                    <small>Port 1935 (Ingest)</small>
                  </div>
                  <div className="arrow">HLS →</div>
                  <div className="arch-box frontend">
                    <span className="icon">🖥</span>
                    <strong>Frontend / OBS</strong>
                    <small>Port 5173 / 8080</small>
                  </div>
                </div>
                
                <div className="arch-row-vertical">
                  <div className="line">↓</div>
                  <div className="arch-box relay">
                    <span className="icon">🚀</span>
                    <strong>FFmpeg Relay Engine</strong>
                    <small>Process Manager</small>
                  </div>
                  <div className="line">↓</div>
                  <div className="all-destinations">
                    <div className="dest youtube">YouTube</div>
                    <div className="dest twitch">Twitch</div>
                    <div className="dest facebook">Facebook</div>
                  </div>
                </div>
              </div>

              <h3>Component Breakdown</h3>
              <div className="tech-stack-grid">
                <div className="tech-item">
                  <h4>NGINX + RTMP Module</h4>
                  <p>The core server that receives video. It's incredibly stable and handles the raw TCP connections.</p>
                  <code>rtmp://localhost/live</code>
                </div>
                <div className="tech-item">
                  <h4>Node.js Backend</h4>
                  <p>The "Brain". It polls NGINX for stats, spawns FFmpeg processes for relaying, and serves the API.</p>
                  <code>/api/status</code>
                </div>
                <div className="tech-item">
                  <h4>React Frontend</h4>
                  <p>The control center. Connects to the backend via REST and plays video using HLS.js.</p>
                  <code>http://localhost:5173</code>
                </div>
              </div>
            </div>
          )}

          {activePage === 'FEATURES' && (
            <div className="content-section fade-in">
              <h1>Features & Capabilities</h1>
              <p className="lead">Detailed breakdown of LMR's toolset.</p>

              <hr />

              <div className="feature-block">
                <h3>🎥 Multi-Stream Ingest</h3>
                <p>
                  LMR isn't limited to one stream. You can send multiple RTMP feeds to different stream keys (e.g., <code>/live/cam1</code>, <code>/live/cam2</code>).
                  The dashboard detects all of them automatically.
                </p>
                <ul>
                  <li><strong>Auto-Discovery:</strong> No configuration needed. Just stream to a new key.</li>
                  <li><strong>Metadata:</strong> See resolution, codec, and bitrate for every active stream.</li>
                </ul>
              </div>

              <div className="feature-block">
                <h3>🚀 Smart Relaying (Stream Copy)</h3>
                <p>
                  By default, LMR uses the <code>-c copy</code> codec in FFmpeg. This means it <strong>does not re-encode</strong> your video.
                  It simply takes the video packets and repackages them for the destination.
                </p>
                <div className="callout info">
                  <strong>Why is this important?</strong>
                  <p>Re-encoding a 1080p stream usually takes ~40-60% CPU. Stream copying takes ~1-2%. This allows you to stream 4K video even on a Raspberry Pi.</p>
                </div>
              </div>

              <div className="feature-block">
                <h3>🔌 OBS Browser Source Integration</h3>
                <p>
                  LMR automatically generates an <code>.m3u8</code> HLS playlist for every stream.
                  You can drop this directly into OBS as a "Browser Source" or "Media Source".
                </p>
                <div className="code-block">
                  <pre>http://{window.location.hostname}:8080/hls/YOUR_STREAM_NAME.m3u8</pre>
                </div>
                <p><small>Latency is typically 4-6 seconds due to HLS buffering.</small></p>
              </div>

              <h3>Supported Platforms</h3>
              <table className="docs-table">
                <thead>
                  <tr>
                    <th>Platform</th>
                    <th>Protocol</th>
                    <th>Metadata Support</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>YouTube Live</strong></td>
                    <td>RTMP / RTMPS</td>
                    <td>✅ Title, Desc, Category, Privacy</td>
                  </tr>
                  <tr>
                    <td><strong>Twitch</strong></td>
                    <td>RTMP</td>
                    <td>✅ Stream Key (API coming soon)</td>
                  </tr>
                  <tr>
                    <td><strong>Facebook Live</strong></td>
                    <td>RTMPS</td>
                    <td>✅ Standard Push</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activePage === 'TROUBLESHOOTING' && (
            <div className="content-section fade-in">
              <h1>Troubleshooting Guide</h1>
              <p className="lead">Common issues and how to fix them.</p>

              <div className="accordion">
                <details open>
                  <summary>🔴 Stream not appearing in Dashboard</summary>
                  <div className="details-content">
                    <p>1. Check if NGINX is running: <code>curl http://localhost:8080/stat</code></p>
                    <p>2. Verify your stream URL: Is it <code>rtmp://YOUR_IP/live/key</code>?</p>
                    <p>3. Check Firewall: Ensure port <strong>1935</strong> is open.</p>
                  </div>
                </details>

                <details>
                  <summary>🐢 High Latency in OBS</summary>
                  <div className="details-content">
                    <p>HLS adds latency by design (chunking). For lower latency:</p>
                    <ul>
                      <li>Use <strong>Media Source</strong> instead of Browser Source in OBS.</li>
                      <li>Uncheck "Use hardware decoding" in OBS if glitching occurs.</li>
                      <li>Future update: We are working on WebRTC for sub-second latency.</li>
                    </ul>
                  </div>
                </details>

                <details>
                  <summary>⚠️ CPU Usage is 100%</summary>
                  <div className="details-content">
                    <p>You might be re-encoding accidentally or running too many streams.</p>
                    <p>Open <strong>Activity Monitor</strong> (Mac) or <code>top</code> (Linux) to check if <code>ffmpeg</code> processes are consuming high CPU.</p>
                  </div>
                </details>

                <details>
                  <summary>🚫 YouTube "Stream Key Invalid"</summary>
                  <div className="details-content">
                    <p>Regenerate your stream key in YouTube Studio. Ensure you selected "RTMP/Variable" and not "HLS" as the ingest protocol in YouTube settings.</p>
                  </div>
                </details>
              </div>
            </div>
          )}

          {activePage === 'ROADMAP' && (
            <div className="content-section fade-in">
              <h1>Roadmap & Community</h1>
              
              <div className="community-cta">
                <h3>🤝 Join the Project</h3>
                <p>LMR is 100% Open Source (MIT License). We believe in building tools that empower creators without locking them into subscriptions.</p>
                <div className="cta-buttons">
                  <a href="https://github.com/yourusername/local-media-router" className="btn-github">
                    View GitHub Repo
                  </a>
                  <a href="https://github.com/yourusername/local-media-router/issues" className="btn-outline">
                    Report a Bug
                  </a>
                </div>
              </div>

              <h3>Current Roadmap</h3>
              <div className="roadmap-grid">
                <div className="roadmap-item done">
                  <div className="status">✅ DONE</div>
                  <h4>Multi-Stream Core</h4>
                  <p>Support for unlimited concurrent input streams.</p>
                </div>
                <div className="roadmap-item done">
                  <div className="status">✅ DONE</div>
                  <h4>YouTube Integration</h4>
                  <p>Metadata sync and stream key validation.</p>
                </div>
                <div className="roadmap-item active">
                  <div className="status">🚧 IN PROGRESS</div>
                  <h4>Twitch API</h4>
                  <p>Set game title and tags automatically.</p>
                </div>
                <div className="roadmap-item future">
                  <div className="status">📅 PLANNED</div>
                  <h4>Auto-Transcoding</h4>
                  <p>Convert H.265 inputs to H.264 automatically.</p>
                </div>
                <div className="roadmap-item future">
                  <div className="status">📅 PLANNED</div>
                  <h4>User Auth</h4>
                  <p>Password protection for public deployments.</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
