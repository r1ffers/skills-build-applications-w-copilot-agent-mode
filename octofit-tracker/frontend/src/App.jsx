import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Teams from './pages/Teams';
import Activities from './pages/Activities';
import Leaderboard from './pages/Leaderboard';
import Workouts from './pages/Workouts';
import './App.css';

/**
 * OctoFit Tracker - Multi-tier React Application
 * 
 * Architecture:
 * - Frontend: React 19 with Vite, running on port 5173
 * - Backend: Express API, running on port 8000
 * - Database: MongoDB, running on port 27017
 * 
 * Environment Configuration:
 * Set VITE_CODESPACE_NAME in .env.local for Codespaces deployment
 * Example: VITE_CODESPACE_NAME=your-codespace-name
 * 
 * API Base URL (determined by Vite environment variable):
 * - Codespaces: https://{VITE_CODESPACE_NAME}-8000.app.github.dev
 * - Local: http://localhost:8000 (fallback)
 */
function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </Router>
  );
}

export default App;
