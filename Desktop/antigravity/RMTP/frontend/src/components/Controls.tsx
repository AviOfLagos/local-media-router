import React, { useState } from 'react';
import type { RelaySession } from '../types';

interface Props {
  relays: Record<string, RelaySession>;
  onStartRelay: (id: string, url: string) => void;
  onStopRelay: (id: string) => void;
  isStreamLive: boolean;
}

export const Controls: React.FC<Props> = ({ relays, onStartRelay, onStopRelay, isStreamLive }) => {
  const [targetUrl, setTargetUrl] = useState('');
  const [relayId, setRelayId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (targetUrl && relayId) {
      onStartRelay(relayId, targetUrl);
      setTargetUrl('');
      setRelayId('');
    }
  };

  const activeRelays = Object.entries(relays);
  const hasActiveRelays = activeRelays.length > 0;

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ margin: 0 }}>Relay Control</h2>
        <span className={`status-badge ${hasActiveRelays ? 'status-live' : 'status-offline'}`}>
            {hasActiveRelays ? `${activeRelays.length} ACTIVE` : 'IDLE'}
        </span>
      </div>

      {/* Active Relays List */}
      {hasActiveRelays && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>Active Outputs</h3>
          {activeRelays.map(([id, session]) => (
            <div 
              key={id} 
              style={{ 
                background: 'rgba(255,255,255,0.05)', 
                padding: '0.75rem', 
                borderRadius: '4px', 
                marginBottom: '0.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-accent)', fontWeight: 600 }}>{id}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                  {session.output}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#888', marginTop: '0.25rem' }}>
                  {session.active ? '🟢 Live' : '🔴 Stopped'} • Retries: {session.retries}
                </div>
              </div>
              <button 
                onClick={() => onStopRelay(id)}
                style={{ 
                  backgroundColor: 'rgba(239, 68, 68, 0.2)', 
                  color: 'var(--color-danger)', 
                  border: '1px solid currentColor',
                  padding: '0.5rem 1rem',
                  fontSize: '0.8rem',
                  marginLeft: '1rem'
                }}
              >
                Stop
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add New Relay Form */}
      <form onSubmit={handleSubmit}>
        <h3 style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>
          Add New Output
        </h3>
        <div style={{ marginBottom: '0.75rem' }}>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
            Output Name (e.g., youtube, twitch)
          </label>
          <input 
            type="text" 
            placeholder="youtube" 
            value={relayId}
            onChange={(e) => setRelayId(e.target.value)}
            disabled={!isStreamLive}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
            Target RTMP URL
          </label>
          <input 
            type="text" 
            placeholder="rtmp://a.rtmp.youtube.com/live2/YOUR_KEY" 
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            disabled={!isStreamLive}
          />
        </div>
        <button 
          type="submit" 
          disabled={!isStreamLive || !targetUrl || !relayId}
          style={{ 
            width: '100%', 
            backgroundColor: (!isStreamLive || !targetUrl || !relayId) ? '#333' : 'var(--color-accent)',
            cursor: (!isStreamLive || !targetUrl || !relayId) ? 'not-allowed' : 'pointer',
            color: 'white'
           }}
        >
          {isStreamLive ? '➕ Add Output' : 'Waiting for Stream...'}
        </button>
      </form>
    </div>
  );
};
