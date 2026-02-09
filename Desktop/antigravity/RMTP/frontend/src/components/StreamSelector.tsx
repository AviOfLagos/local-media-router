import React from 'react';
import type { StreamInfo } from '../types';

interface Props {
  streams: StreamInfo[];
  selectedStream: string | null;
  onSelectStream: (streamName: string) => void;
}

export const StreamSelector: React.FC<Props> = ({ streams, selectedStream, onSelectStream }) => {
  if (streams.length === 0) return null;

  return (
    <div className="card">
      <h2 style={{ marginBottom: '1rem' }}>
        Available Streams ({streams.length})
      </h2>
      {streams.length > 1 && (
        <div style={{ 
          padding: '0.75rem', 
          background: 'rgba(255, 193, 7, 0.1)', 
          borderLeft: '3px solid #ffc107',
          marginBottom: '1rem',
          fontSize: '0.9rem'
        }}>
          ⚠️ Multiple streams detected. Select which one to use for outputs.
        </div>
      )}
      
      <div style={{ display: 'grid', gap: '0.75rem' }}>
        {streams.map((stream) => {
          const isSelected = stream.name === selectedStream;
          const totalBitrate = (stream.videoBitrate + stream.audioBitrate) / 1000; // Kbps

          return (
            <div
              key={stream.name}
              onClick={() => onSelectStream(stream.name)}
              style={{
                padding: '1rem',
                background: isSelected ? 'rgba(100, 108, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                border: `2px solid ${isSelected ? 'var(--color-accent)' : 'transparent'}`,
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (!isSelected) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              }}
              onMouseLeave={(e) => {
                if (!isSelected) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 600, color: isSelected ? 'var(--color-accent)' : 'white' }}>
                    {stream.name}
                  </span>
                  {isSelected && (
                    <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', background: 'var(--color-accent)', borderRadius: '4px', fontWeight: 600 }}>
                      SELECTED
                    </span>
                  )}
                </div>
                <span className="status-badge status-live">LIVE</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                {stream.width && stream.height && (
                  <div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>Resolution</div>
                    <div style={{ fontFamily: 'monospace', color: 'white' }}>{stream.width}x{stream.height}</div>
                  </div>
                )}
                {stream.codec && (
                  <div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>Codec</div>
                    <div style={{ fontFamily: 'monospace', color: 'white' }}>{stream.codec}</div>
                  </div>
                )}
                <div>
                  <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>Bitrate</div>
                  <div style={{ fontFamily: 'monospace', color: 'white' }}>{totalBitrate.toFixed(0)} Kbps</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>Uptime</div>
                  <div style={{ fontFamily: 'monospace', color: 'white' }}>
                    {Math.floor(stream.uptime / 60)}m {Math.floor(stream.uptime % 60)}s
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {streams.length > 1 && (
        <div style={{ 
          marginTop: '1rem',
          fontSize: '0.75rem',
          color: 'var(--color-text-secondary)',
          padding: '0.5rem',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '4px'
        }}>
          💡 <strong>Tip:</strong> Each stream uses bandwidth. On low-end systems, limit to 1-2 simultaneous streams for best performance.
        </div>
      )}
    </div>
  );
};
