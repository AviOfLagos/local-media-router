import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0f1014', color: '#ef4444' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Something went wrong.</h1>
          <div style={{ background: '#1a1c23', padding: '1.5rem', borderRadius: '8px', maxWidth: '800px', width: '100%', overflow: 'auto', border: '1px solid #333' }}>
            <h3 style={{ marginTop: 0 }}>Error: {this.state.error?.toString()}</h3>
            <pre style={{ fontSize: '0.8rem', opacity: 0.7 }}>
              {this.state.errorInfo?.componentStack}
            </pre>
          </div>
          <button 
            onClick={() => window.location.reload()}
            style={{ marginTop: '2rem', padding: '0.8rem 1.6rem', fontSize: '1rem', background: '#646cff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Reload Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
