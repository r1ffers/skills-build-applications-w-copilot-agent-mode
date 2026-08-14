import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'

/**
 * OctoFit Tracker - Frontend Entry Point
 * 
 * Stack:
 * - React 19 with Vite
 * - react-router-dom for client-side routing
 * - Bootstrap for styling
 * 
 * Environment Setup:
 * 1. Create .env.local in the frontend directory
 * 2. Set VITE_CODESPACE_NAME to your GitHub Codespace name
 *    (e.g., VITE_CODESPACE_NAME=supreme-memory-759rwv6qj6vfw5xq)
 * 3. The API will automatically connect to:
 *    https://{VITE_CODESPACE_NAME}-8000.app.github.dev
 * 
 * Development:
 *   npm run dev      # Start dev server on http://localhost:5173
 *   npm run build    # Build for production
 *   npm run preview  # Preview production build
 */

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

