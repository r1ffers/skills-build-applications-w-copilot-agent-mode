import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          🏋️ OctoFit Tracker
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/')}`} to="/">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/users')}`} to="/users">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/teams')}`} to="/teams">
                Teams
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/activities')}`} to="/activities">
                Activities
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/leaderboard')}`} to="/leaderboard">
                🏆 Leaderboard
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
