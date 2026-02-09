import { useEffect, useState } from 'react';
import axios from 'axios';
import type { APIStatusResponse } from './types';
import { StreamStatus } from './components/StreamStatus';
import { Controls } from './components/Controls';
import { LogsPanel } from './components/LogsPanel';
import { ConnectionInfo } from './components/ConnectionInfo';
import { StreamPlayer } from './components/StreamPlayer';
import { StreamSelector } from './components/StreamSelector';
import { AddDestination } from './components/AddDestination';
import { BrowserSourceLink } from './components/BrowserSourceLink';
import { Documentation } from './components/Documentation';
import './index.css';

function App() {
  const [data, setData] = useState<APIStatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiUrl, setApiUrl] = useState('http://localhost:4000/api');
  const [flowStep, setFlowStep] = useState<'SETUP' | 'INGEST' | 'READY'>('SETUP');
  const [selectedStream, setSelectedStream] = useState<string | null>(null);
  const [serverIp, setServerIp] = useState('localhost');
  const [showDocs, setShowDocs] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${apiUrl}/status`);
      setData(res.data);
      setError(null);
      
      // Extract server IP from apiUrl for OBS Browser Source links
      const ipMatch = apiUrl.match(/:\/\/([^:]+)/);
      if (ipMatch) setServerIp(ipMatch[1]);
      
      // Auto-select first stream if nothing selected yet
      if (res.data.stream.isLive && res.data.stream.streams.length > 0) {
        if (!selectedStream || !res.data.stream.streams.find((s: any) => s.name === selectedStream)) {
          setSelectedStream(res.data.stream.streams[0].name);
        }
      }

      // Auto-advance flow if stream detected
      if (res.data.stream.isLive && flowStep === 'INGEST') {
        setFlowStep('READY');
      }
    } catch (err) {
      setError('Cannot connect to backend agent. Is it running?');
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, [apiUrl, flowStep, selectedStream]);

  const handleStartRelay = async (id: string, targetUrl: string) => {
    if (!selectedStream) {
      alert("Please select a stream first!");
      return;
    }
    await axios.post(`${apiUrl}/relays/start`, { 
      id, 
      targetUrl,
      streamName: selectedStream // Pass selected stream to backend
    });
    fetchData();
  };

  const handleStopRelay = async (id: string) => {
    await axios.post(`${apiUrl}/relays/stop`, { id });
    fetchData();
  };

  return (
    <div className="container" style={{ paddingBottom: '80px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h1 style={{ margin: 0 }}>Local Media Router</h1>
        </div>
        <button 
          onClick={() => setShowDocs(true)}
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#fff',
            padding: '0.6rem 1.2rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
        >
          <span>📚</span> Documentation
        </button>
      </header>
      
      {showDocs && <Documentation onClose={() => setShowDocs(false)} />}
      
      {error && (
        <div style={{ padding: '1rem', background: 'rgba(255, 68, 68, 0.2)', border: '1px solid #ff4444', color: '#ff8888', borderRadius: '8px', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {!data ? (
        <div style={{ textAlign: 'center', marginTop: '4rem', color: '#666' }}>
          <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
          <p>Connecting to Local Media Router Agent...</p>
        </div>
      ) : (
        <main>
          {/* STEP 1: NETWORK SETUP */}
          {flowStep === 'SETUP' && (
            <div className="card fade-in">
              <h2>1. Network Setup</h2>
              <p style={{ color: '#aaa', marginBottom: '1rem' }}>
                Verify your local IP address for incoming streams.
              </p>
              
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '6px', fontFamily: 'monospace', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                 Detected IP: <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>{serverIp}</span>
              </div>

              <p style={{ fontSize: '0.9rem', color: '#888' }}>
                Your ingest URL will be: <br/>
                <code style={{ color: '#fff', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }}>rtmp://{serverIp}/live/YOUR_STREAM_KEY</code>
              </p>

              <button 
                className="primary-btn"
                style={{ marginTop: '1rem', width: '100%' }}
                onClick={() => setFlowStep('INGEST')}
              >
                Confirm & Start Ingest
              </button>
            </div>
          )}

          {/* STEP 2: INGEST CHECK */}
          {flowStep === 'INGEST' && (
            <div className="card fade-in">
              <h2>2. Waiting for Stream...</h2>
              <div style={{ margin: '2rem 0', textAlign: 'center' }}>
                <div className="spinner"></div>
                <p style={{ marginTop: '1rem', color: '#aaa' }}>
                  Please start your stream now.
                </p>
                <div style={{ background: '#222', padding: '1rem', borderRadius: '8px', display: 'inline-block', marginTop: '1rem', fontFamily: 'monospace' }}>
                   rtmp://{serverIp}/live/test
                </div>
              </div>
              <button 
                style={{ background: 'transparent', border: 'none', color: '#666', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.8rem' }}
                onClick={() => setFlowStep('READY')}
              >
                Skip check (Debugging)
              </button>
            </div>
          )}

          {/* STEP 3: DASHBOARD */}
          <div className={flowStep === 'READY' ? 'fade-in' : 'hidden'} style={{ display: flowStep === 'READY' ? 'block' : 'none' }}>
            {flowStep === 'READY' && (
              <>
                <ConnectionInfo apiUrl={apiUrl} />
                <StreamSelector 
                  streams={data.stream.streams}
                  selectedStream={selectedStream}
                  onSelectStream={setSelectedStream}
                />
                
                {selectedStream && (
                  <>
                    <StreamPlayer streamName={selectedStream} isLive={data.stream.isLive} />
                    <BrowserSourceLink streamName={selectedStream} serverIp={serverIp} />
                  </>
                )}
                
                <AddDestination
                  streams={data.stream.streams}
                  selectedStream={selectedStream}
                  onAddDestination={handleStartRelay}
                />
                
                <Controls 
                  relays={data.relays} 
                  isStreamLive={data.stream.isLive}
                  onStartRelay={handleStartRelay}
                  onStopRelay={handleStopRelay}
                />
                
                <StreamStatus status={data.stream} system={data.system} />
                <LogsPanel apiUrl={apiUrl} />
                
                <button 
                  style={{ 
                    position: 'fixed', 
                    bottom: '20px', 
                    right: '20px', 
                    background: 'rgba(0,0,0,0.6)', 
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#fff',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem', 
                    zIndex: 90,
                    backdropFilter: 'blur(5px)',
                    cursor: 'pointer'
                  }}
                  onClick={() => setFlowStep('SETUP')}
                >
                  ↺ Reset Flow
                </button>
              </>
            )}
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
