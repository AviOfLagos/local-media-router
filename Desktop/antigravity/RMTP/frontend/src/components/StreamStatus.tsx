import React from 'react';
import type { StreamStatus as IStreamStatus, SystemMetrics } from '../types';

interface Props {
  status: IStreamStatus;
  system: SystemMetrics;
}

export const StreamStatus: React.FC<Props> = ({ status, system }) => {
  const formatBitrate = (bps: number) => {
    return (bps / 1000).toFixed(0) + ' kbps';
  };

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ margin: 0 }}>Input Stream</h2>
        <span className={`status-badge ${status.isLive ? 'status-live' : 'status-offline'}`}>
          {status.isLive ? 'LIVE' : 'OFFLINE'}
        </span>
      </div>

      {status.isLive ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Stream Name</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 500 }}>{status.streamName}</div>
          </div>
          <div>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Uptime</div>
            <div style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>{formatUptime(status.uptime || 0)}</div>
          </div>
          <div>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Video Bitrate</div>
            <div style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>{formatBitrate(status.videoBitrate || 0)}</div>
          </div>
        </div>
      ) : (
        <div style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
          Waiting for RTMP source...
        </div>
      )}
    </div>

    <div className="card">
        <h2 style={{ fontSize: '1.1rem', marginTop: 0 }}>System Metrics</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>CPU Load (1m)</div>
            <div style={{ fontFamily: 'monospace' }}>{system.cpuUsage.toFixed(2)} %</div>
        </div>
        <div>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>Free Memory</div>
            <div style={{ fontFamily: 'monospace' }}>{(system.freeMem / 1024 / 1024 / 1024).toFixed(2)} GB</div>
        </div>
        </div>
    </div>
    </div>
  );
};
