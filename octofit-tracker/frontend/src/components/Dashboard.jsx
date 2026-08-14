import { useAPI } from '../hooks/useAPI';
import { Link } from 'react-router-dom';

/**
 * Dashboard Page Component
 * Displays overview statistics and recent activity
 * 
 * APIs:
 * - GET https://{CODESPACE_NAME}-8000.app.github.dev/api/users
 * - GET https://{CODESPACE_NAME}-8000.app.github.dev/api/activities
 * - GET https://{CODESPACE_NAME}-8000.app.github.dev/api/teams
 * - GET https://{CODESPACE_NAME}-8000.app.github.dev/api/leaderboard
 */
export default function Dashboard() {
  const { data: users = [] } = useAPI('/api/users');
  const { data: activities = [] } = useAPI('/api/activities');
  const { data: teams = [] } = useAPI('/api/teams');
  const { data: leaderboard = [] } = useAPI('/api/leaderboard');

  // Safe calculations
  const totalCalories = leaderboard.reduce((sum, entry) => sum + (entry.totalCalories || 0), 0);

  return (
    <div className="container-fluid py-4">
      <h1 className="mb-4">🏋️ Welcome to OctoFit Tracker</h1>
      <p className="text-muted mb-4">Your personal fitness tracking companion</p>
      
      {/* Statistics Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card bg-primary text-white h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">👥 Total Users</h5>
              <h2 className="mb-3">{users.length}</h2>
              <Link to="/users" className="btn btn-light btn-sm">View Users →</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-success text-white h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">📊 Total Activities</h5>
              <h2 className="mb-3">{activities.length}</h2>
              <Link to="/activities" className="btn btn-light btn-sm">View Activities →</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-info text-white h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">👥 Teams</h5>
              <h2 className="mb-3">{teams.length}</h2>
              <Link to="/teams" className="btn btn-light btn-sm">View Teams →</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-warning text-white h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">🔥 Total Calories</h5>
              <h2 className="mb-3">{totalCalories.toLocaleString()}</h2>
              <Link to="/leaderboard" className="btn btn-light btn-sm">View Leaderboard →</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Top Performers */}
      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">📝 Recent Activities</h5>
            </div>
            <div className="card-body">
              {activities.length > 0 ? (
                activities.slice(0, 5).map((activity) => (
                  <div key={activity._id} className="pb-3 mb-3 border-bottom">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <p className="mb-1"><strong>{activity.user?.username || 'Unknown'}</strong></p>
                        <p className="mb-1 text-muted">
                          🏃 {activity.type ? activity.type.charAt(0).toUpperCase() + activity.type.slice(1) : 'Activity'}
                        </p>
                        <small className="text-muted">
                          📅 {activity.date ? new Date(activity.date).toLocaleDateString() : 'Unknown date'}
                        </small>
                      </div>
                      <div className="text-end">
                        <p className="mb-0"><strong>{activity.calories || 0} cal</strong></p>
                        <small className="text-muted">{activity.duration || 0} min</small>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted text-center">No recent activities</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">🏆 Top Performers</h5>
            </div>
            <div className="card-body">
              {leaderboard.length > 0 ? (
                leaderboard
                  .sort((a, b) => (b.totalCalories || 0) - (a.totalCalories || 0))
                  .slice(0, 5)
                  .map((entry, idx) => (
                    <div key={entry._id} className="pb-3 mb-3 border-bottom">
                      <div className="d-flex justify-content-between align-items-start">
                        <div className="d-flex gap-2">
                          <div>
                            {idx === 0 && <span className="fs-5">🥇</span>}
                            {idx === 1 && <span className="fs-5">🥈</span>}
                            {idx === 2 && <span className="fs-5">🥉</span>}
                            {idx > 2 && <span className="fs-6">#{idx + 1}</span>}
                          </div>
                          <div>
                            <p className="mb-1"><strong>{entry.user?.username || 'Unknown'}</strong></p>
                            <small className="text-muted">
                              {entry.user?.profile?.firstName} {entry.user?.profile?.lastName}
                            </small>
                          </div>
                        </div>
                        <div className="text-end">
                          <p className="mb-0"><strong>{entry.totalCalories || 0} cal</strong></p>
                          <small className="text-muted">{entry.totalActivities || 0} activities</small>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-muted text-center">No leaderboard data</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
