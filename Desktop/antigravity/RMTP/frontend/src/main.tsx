import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ErrorBoundary } from './components/ErrorBoundary'
import App from './App.tsx'

console.log('[Frontend] main.tsx executing...');
const rootElement = document.getElementById('root');
if (!rootElement) console.error('[Frontend] Root element not found!');
else console.log('[Frontend] Found root element, mounting...');

createRoot(rootElement!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
