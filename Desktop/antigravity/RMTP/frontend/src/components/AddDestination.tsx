import React, { useState } from 'react';
import type { StreamInfo } from '../types';
import { 
  Platform, 
  PLATFORM_CONFIGS, 
  YOUTUBE_CATEGORIES, 
  buildRTMPUrl, 
  validateDestination,
  type DestinationConfig 
} from '../types/platforms';

interface Props {
  streams: StreamInfo[];
  selectedStream: string | null;
  onAddDestination: (id: string, targetUrl: string, metadata?: any) => void;
}

export const AddDestination: React.FC<Props> = ({ streams, selectedStream, onAddDestination }) => {
  const [platform, setPlatform] = useState<Platform>(Platform.YOUTUBE);
  const [destinationId, setDestinationId] = useState('');
  const [streamKey, setStreamKey] = useState('');
  const [serverUrl, setServerUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('20'); // Default: Gaming
  const [privacy, setPrivacy] = useState<'public' | 'unlisted' | 'private'>('public');

  const platformConfig = PLATFORM_CONFIGS[platform];
  const selectedStreamInfo = streams.find(s => s.name === selectedStream);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const config: DestinationConfig = {
      id: destinationId,
      platform,
      streamKey,
      serverUrl,
      title,
      description,
      category,
      privacy
    };

    const validation = validateDestination(config);
    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    // Check bitrate warning
    if (selectedStreamInfo && platformConfig.maxBitrate) {
      const totalBitrate = selectedStreamInfo.videoBitrate + selectedStreamInfo.audioBitrate;
      if (totalBitrate > platformConfig.maxBitrate) {
        const shouldContinue = confirm(
          `⚠️ WARNING: Your stream bitrate (${(totalBitrate / 1000000).toFixed(1)} Mbps) exceeds ${platformConfig.name}'s recommended limit (${(platformConfig.maxBitrate / 1000000).toFixed(1)} Mbps).\n\nThis may cause buffering or rejection. Continue anyway?`
        );
        if (!shouldContinue) return;
      }
    }

    // Check codec compatibility
    if (selectedStreamInfo && selectedStreamInfo.codec) {
      if (!platformConfig.supportedCodecs.includes(selectedStreamInfo.codec)) {
        alert(`❌ ERROR: ${platformConfig.name} doesn't support ${selectedStreamInfo.codec} codec.\n\nSupported: ${platformConfig.supportedCodecs.join(', ')}\n\nPlease change your camera/encoder to use H.264.`);
        return;
      }
    }

    const rtmpUrl = buildRTMPUrl(config);
    onAddDestination(destinationId, rtmpUrl, { title, description, category, privacy });

    // Reset form
    setDestinationId('');
    setStreamKey('');
    setTitle('');
    setDescription('');
  };

  return (
    <div className="card">
      <h2 style={{ marginBottom: '1rem' }}>Add Streaming Destination</h2>

      {!selectedStream && (
        <div style={{ padding: '1rem', background: 'rgba(255, 152, 0, 0.1)', borderLeft: '3px solid #ff9800', marginBottom: '1rem' }}>
          ⚠️ Please select a stream first
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Platform Selector */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
            Platform
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
            {Object.entries(PLATFORM_CONFIGS).map(([key, config]) => (
              <button
                key={key}
                type="button"
                onClick={() => setPlatform(key as Platform)}
                style={{
                  padding: '0.75rem',
                  background: platform === key ? 'var(--color-accent)' : 'rgba(255, 255, 255, 0.05)',
                  border: platform === key ? '2px solid var(--color-accent)' : '2px solid transparent',
                  borderRadius: '6px',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: platform === key ? 600 : 400,
                  transition: 'all 0.2s'
                }}
              >
                {config.name}
              </button>
            ))}
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
            {platformConfig.description}
          </p>
        </div>

        {/* Destination ID */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
            Destination Name (e.g., "youtube_main", "twitch_gaming")
          </label>
          <input
            type="text"
            value={destinationId}
            onChange={(e) => setDestinationId(e.target.value)}
            placeholder="my_youtube_stream"
            required
            style={{ width: '100%', padding: '0.75rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '4px', color: 'white' }}
          />
        </div>

        {/* Stream Key */}
        {platformConfig.requiresStreamKey && (
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
              Stream Key {platform === Platform.YOUTUBE && '(from YouTube Studio → Go Live → Stream Settings)'}
            </label>
            <input
              type="password"
              value={streamKey}
              onChange={(e) => setStreamKey(e.target.value)}
              placeholder="xxxx-xxxx-xxxx-xxxx"
              required
              style={{ width: '100%', padding: '0.75rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '4px', color: 'white', fontFamily: 'monospace' }}
            />
          </div>
        )}

        {/* Server URL (for custom or Facebook) */}
        {platformConfig.requiresServerUrl && (
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
              Server URL
            </label>
            <input
              type="text"
              value={serverUrl}
              onChange={(e) => setServerUrl(e.target.value)}
              placeholder="rtmp://live.example.com/app"
              required
              style={{ width: '100%', padding: '0.75rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '4px', color: 'white', fontFamily: 'monospace' }}
            />
          </div>
        )}

        {/* Metadata Fields (platform-specific) */}
        {platformConfig.metadataFields.includes('title') && (
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
              Stream Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My Awesome Live Stream"
              maxLength={100}
              style={{ width: '100%', padding: '0.75rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '4px', color: 'white' }}
            />
          </div>
        )}

        {platformConfig.metadataFields.includes('description') && (
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Stream description..."
              rows={3}
              maxLength={500}
              style={{ width: '100%', padding: '0.75rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '4px', color: 'white', resize: 'vertical', fontFamily: 'inherit' }}
            />
          </div>
        )}

        {platformConfig.metadataFields.includes('category') && platform === Platform.YOUTUBE && (
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '4px', color: 'white' }}
            >
              {YOUTUBE_CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id} style={{ background: '#1a1a2e' }}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {platformConfig.metadataFields.includes('privacy') && (
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
              Privacy
            </label>
            <select
              value={privacy}
              onChange={(e) => setPrivacy(e.target.value as any)}
              style={{ width: '100%', padding: '0.75rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '4px', color: 'white' }}
            >
              <option value="public" style={{ background: '#1a1a2e' }}>Public</option>
              <option value="unlisted" style={{ background: '#1a1a2e' }}>Unlisted</option>
              <option value="private" style={{ background: '#1a1a2e' }}>Private</option>
            </select>
          </div>
        )}

        {/* Warnings */}
        {selectedStreamInfo && platformConfig.maxBitrate && (
          <div style={{ marginBottom: '1rem', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
            Your stream: {(selectedStreamInfo.videoBitrate / 1000000).toFixed(1)} Mbps video + {(selectedStreamInfo.audioBitrate / 1000).toFixed(0)} Kbps audio
            <br />
            {platformConfig.name} limit: {(platformConfig.maxBitrate / 1000000).toFixed(1)} Mbps max
          </div>
        )}

        <button
          type="submit"
          disabled={!selectedStream}
          style={{
            width: '100%',
            padding: '1rem',
            background: !selectedStream ? '#333' : 'var(--color-accent)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: !selectedStream ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s'
          }}
        >
          ➕ Add {platformConfig.name} Destination
        </button>
      </form>
    </div>
  );
};
