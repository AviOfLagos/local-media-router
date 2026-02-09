import React, { useState } from 'react';

interface Props {
  streamName: string;
  serverIp: string;
}

export const BrowserSourceLink: React.FC<Props> = ({ streamName, serverIp }) => {
  const [copied, setCopied] = useState(false);

  // HLS URL for OBS Browser Source
  const hlsUrl = `http://${serverIp}:8080/hls/${streamName}.m3u8`;
  
  // Player URL (better for OBS, includes HLS.js)
  const playerUrl = `http://${serverIp}:4000/player.html?stream=${streamName}`;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="card" style={{ background: 'linear-gradient(135deg, rgba(100, 108, 255, 0.1) 0%, rgba(159, 90, 253, 0.1) 100%)', border: '2px solid var(--color-accent)' }}>
      <h2 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.5rem' }}>🎥</span>
        OBS Browser Source
      </h2>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
        Use this URL in OBS Studio → Sources → Browser Source to display your live stream
      </p>

      {/* Player URL (Recommended) */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-accent)' }}>
            🌟 Recommended: Player URL
          </label>
          <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', background: 'var(--color-accent)', borderRadius: '4px' }}>
            BEST
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            value={playerUrl}
            readOnly
            style={{
              flex: 1,
              padding: '0.75rem',
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '6px',
              color: 'white',
              fontFamily: 'monospace',
              fontSize: '0.85rem'
            }}
            onClick={(e) => e.currentTarget.select()}
          />
          <button
            onClick={() => copyToClipboard(playerUrl, 'Player URL')}
            style={{
              padding: '0.75rem 1.25rem',
              background: 'var(--color-accent)',
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {copied ? '✓ Copied!' : '📋 Copy'}
          </button>
        </div>
        <p style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
          Includes HLS.js player for better compatibility. Use this in most cases.
        </p>
      </div>

      {/* Raw HLS URL (Advanced) */}
      <details style={{ marginBottom: '1rem' }}>
        <summary style={{ cursor: 'pointer', fontSize: '0.85rem', marginBottom: '0.5rem', userSelect: 'none' }}>
          Advanced: Raw HLS Playlist
        </summary>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
          <input
            type="text"
            value={hlsUrl}
            readOnly
            style={{
              flex: 1,
              padding: '0.65rem',
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              color: 'white',
              fontFamily: 'monospace',
              fontSize: '0.8rem'
            }}
            onClick={(e) => e.currentTarget.select()}
          />
          <button
            onClick={() => copyToClipboard(hlsUrl, 'HLS URL')}
            style={{
              padding: '0.65rem 1rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '6px',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            📋
          </button>
        </div>
        <p style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
          Direct .m3u8 file. Use only if Player URL doesn't work.
        </p>
      </details>

      {/* Instructions */}
      <div style={{ padding: '1rem', background: 'rgba(0, 0, 0, 0.2)', borderRadius: '6px', fontSize: '0.8rem' }}>
        <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>📖 How to use in OBS:</div>
        <ol style={{ margin: '0', paddingLeft: '1.25rem', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
          <li>Open OBS Studio</li>
          <li>Click <strong>+</strong> under Sources</li>
          <li>Select <strong>Browser</strong></li>
          <li>Paste the Player URL above</li>
          <li>Set Width: <code style={{ background: 'rgba(255,255,255,0.1)', padding: '0.1rem 0.3rem', borderRadius: '3px' }}>1920</code>, Height: <code style={{ background: 'rgba(255,255,255,0.1)', padding: '0.1rem 0.3rem', borderRadius: '3px' }}>1080</code></li>
          <li>✅ Check "Control audio via OBS"</li>
          <li>Click OK → Your stream appears!</li>
        </ol>
      </div>

      {/* Network Note */}
      <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(255, 193, 7, 0.1)', borderLeft: '3px solid #ffc107', fontSize: '0.75rem' }}>
        ⚠️ <strong>Important:</strong> OBS must be on the same network as this server ({serverIp}). 
        If it can't connect, check your firewall settings.
      </div>
    </div>
  );
};
