import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './LogsPanel.css';

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'success';
  source: string;
  message: string;
}

interface Props {
  apiUrl: string;
}

export function LogsPanel({ apiUrl }: Props) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const intervalRef = useRef<number | null>(null);

  const fetchLogs = async () => {
    try {
      const res = await axios.get<LogEntry[]>(`${apiUrl}/logs`);
      setLogs(res.data);
    } catch (e) {
      // console.error(e);
    }
  };

  useEffect(() => {
    fetchLogs();
    intervalRef.current = setInterval(fetchLogs, 2000) as unknown as number;
    return () => clearInterval(intervalRef.current!);
  }, [apiUrl]);

  return (
    <div className="card logs-panel">
      <h3>System Logs</h3>
      <div className="logs-container">
        {logs.length === 0 && <div className="no-logs">No logs yet...</div>}
        {logs.map(log => (
          <div key={log.id} className={`log-entry ${log.level}`}>
            <span className="log-time">{new Date(log.timestamp).toLocaleTimeString()}</span>
            <span className="log-source">[{log.source}]</span>
            <span className="log-message">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
