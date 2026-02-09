import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface StreamPlayerProps {
    streamName: string | undefined;
    isLive: boolean;
}

export function StreamPlayer({ streamName, isLive }: StreamPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);

    useEffect(() => {
        if (!isLive || !streamName || !videoRef.current) return;

        // Assuming backend proxies or we hit nginx directly. 
        // For MVP, if we are local, it's localhost:8080/hls
        // But for remote access, we might need a proxy.
        // Let's assume the user is accessing via the same host.
        const hostname = window.location.hostname;
        const hlsUrl = `http://${hostname}:8080/hls/${streamName}.m3u8`;

        if (Hls.isSupported()) {
            if (hlsRef.current) {
                hlsRef.current.destroy();
            }

            const hls = new Hls({
                enableWorker: true,
                lowLatencyMode: true,
            });
            hlsRef.current = hls;

            hls.loadSource(hlsUrl);
            hls.attachMedia(videoRef.current);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                videoRef.current?.play().catch(() => console.log('Autoplay prevented'));
            });

            // Error handling
            hls.on(Hls.Events.ERROR, function (_event, data) {
                if (data.fatal) {
                  switch (data.type) {
                    case Hls.ErrorTypes.NETWORK_ERROR:
                      console.log('fatal network error encountered, try to recover');
                      hls.startLoad();
                      break;
                    case Hls.ErrorTypes.MEDIA_ERROR:
                      console.log('fatal media error encountered, try to recover');
                      hls.recoverMediaError();
                      break;
                    default:
                      // cannot recover
                      hls.destroy();
                      break;
                  }
                }
              });
        } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
            videoRef.current.src = hlsUrl;
            videoRef.current.addEventListener('loadedmetadata', () => {
                videoRef.current?.play();
            });
        }

        return () => {
            if (hlsRef.current) {
                hlsRef.current.destroy();
            }
        };
    }, [streamName, isLive]);

    if (!isLive) {
        return (
            <div style={{ aspectRatio: '16/9', background: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', color: '#666' }}>
                <p>Offline</p>
            </div>
        );
    }

    return (
        <div className="card" style={{ padding: '0.5rem', overflow: 'hidden' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#888' }}>Live Preview</h3>
            <video 
                ref={videoRef} 
                controls 
                muted 
                autoPlay 
                style={{ width: '100%', borderRadius: '4px', background: '#000', aspectRatio: '16/9' }} 
            />
        </div>
    );
}
