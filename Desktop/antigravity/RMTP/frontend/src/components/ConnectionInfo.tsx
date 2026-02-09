import { useState, useEffect } from 'react';

interface Props {
  apiUrl: string;
  isHeaderOnly?: boolean;
  hideObs?: boolean;
}

export function ConnectionInfo({ apiUrl, isHeaderOnly, hideObs }: Props) {
  const [localIp, setLocalIp] = useState<string>('Loading...');
  const [isEditing, setIsEditing] = useState(false);
  const [manualIp, setManualIp] = useState('');

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch(`${apiUrl}/config`);
        if (!res.ok) throw new Error('Failed to fetch config');
        const data = await res.json();
        setLocalIp(data.ip || '127.0.0.1');
        setManualIp(data.ip || '127.0.0.1');
      } catch (e) {
        setLocalIp(window.location.hostname || '127.0.0.1');
        setManualIp(window.location.hostname || '127.0.0.1');
      }
    };
    fetchConfig();
  }, [apiUrl]);

  const displayIp = isEditing ? manualIp : localIp;
  const ingestUrl = `rtmp://${displayIp}/live/test`;
  const obsUrl = `rtmp://${displayIp}/live/test`;

  if (isHeaderOnly) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.05)', padding: '1rem 2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <span style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>DETECTED IP:</span>
          {isEditing ? (
             <input 
               type="text" 
               value={manualIp} 
               onChange={(e) => setManualIp(e.target.value)}
               onBlur={() => { setIsEditing(false); setLocalIp(manualIp); }}
               onKeyDown={(e) => { if (e.key === 'Enter') { setIsEditing(false); setLocalIp(manualIp); } }}
               autoFocus
               style={{ background: '#000', border: '1px solid var(--color-primary)', color: 'white', padding: '4px 12px', borderRadius: '6px', fontSize: '1.2rem', width: '200px', textAlign: 'center' }}
             />
          ) : (
             <span 
               onClick={() => setIsEditing(true)} 
               style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)', cursor: 'pointer', borderBottom: '2px dashed #646cff' }}
             >
               {localIp}
             </span>
          )}
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
          Click the IP above to change it manually if this doesn't match your local network.
        </p>
      </div>
    );
  }

  return (
    <div className="card" style={{gridColumn: '1 / -1'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.1rem', margin: 0 }}>📡 Connection Details</h2>
        {!hideObs && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
            <span style={{ color: 'var(--color-text-secondary)' }}>IP:</span>
            {isEditing ? (
               <input 
                 type="text" 
                 value={manualIp} 
                 onChange={(e) => setManualIp(e.target.value)}
                 onBlur={() => { setIsEditing(false); setLocalIp(manualIp); }}
                 onKeyDown={(e) => { if (e.key === 'Enter') { setIsEditing(false); setLocalIp(manualIp); } }}
                 autoFocus
                 style={{ background: '#000', border: '1px solid #333', color: 'white', padding: '2px 6px', borderRadius: '4px', width: '120px' }}
               />
            ) : (
               <span 
                 onClick={() => setIsEditing(true)} 
                 style={{ cursor: 'pointer', color: 'var(--color-primary)' }}
               >
                 {localIp} ✏️
               </span>
            )}
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginTop: '1rem' }}>
        
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '4px', border: '1px solid rgba(100, 108, 255, 0.2)' }}>
          <h3 style={{ fontSize: '0.9rem', color: 'var(--color-primary)', marginTop: 0 }}>Step 1: Ingest (Camera)</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
            Push your RTMP stream here:
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', background: '#000', padding: '8px', borderRadius: '4px' }}>
            <code style={{ fontSize: '0.9rem', flex: 1, color: '#9f5afd' }}>{ingestUrl}</code>
            <button 
              onClick={() => navigator.clipboard.writeText(ingestUrl)}
              style={{ padding: '4px 8px', fontSize: '0.7rem', background: '#333' }}
            >
              Copy
            </button>
          </div>
        </div>

        {!hideObs && (
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '4px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <h3 style={{ fontSize: '0.9rem', color: 'var(--color-success)', marginTop: 0 }}>Step 2: OBS / VLC (Output)</h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.3rem' }}>
                <b>Option A: RTMP (Media Source)</b> - Lowest Latency
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', background: '#000', padding: '6px', borderRadius: '4px' }}>
                <code style={{ fontSize: '0.8rem', flex: 1, color: '#22c55e' }}>{obsUrl}</code>
                <button onClick={() => navigator.clipboard.writeText(obsUrl)} style={{ padding: '2px 6px', fontSize: '0.65rem', background: '#333' }}>Copy</button>
              </div>
            </div>

            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.3rem' }}>
                <b>Option B: HLS (Browser Source / Web)</b>
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', background: '#000', padding: '6px', borderRadius: '4px' }}>
                <code style={{ fontSize: '0.8rem', flex: 1, color: '#3b82f6' }}>{`http://${displayIp}:8080/hls/test.m3u8`}</code>
                <button onClick={() => navigator.clipboard.writeText(`http://${displayIp}:8080/hls/test.m3u8`)} style={{ padding: '2px 6px', fontSize: '0.65rem', background: '#333' }}>Copy</button>
              </div>
            </div>
          </div>
        )}

      </div>
      {hideObs && (
        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '1rem', background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '4px' }}>
          <strong>ℹ️ Finding your LAN IP:</strong>
          <ul style={{ margin: '0.2rem 0 0 1.2rem', padding: 0 }}>
            <li><b>Mac:</b> <code>ipconfig getifaddr en0</code></li>
            <li><b>Windows:</b> <code>ipconfig</code> (look for IPv4)</li>
          </ul>
        </div>
      )}
    </div>
  );
}
