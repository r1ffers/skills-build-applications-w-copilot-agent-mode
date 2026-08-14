import { useAPI } from '../hooks/useAPI';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { data: users } = useAPI('/api/users');
  const { data: activities } = useAPI('/api/activities');
  const { data: teams } = useAPI('/api/teams');
  const { data: leaderboard } = useAPI('/api/leaderboard');

  return (
    <div className="container-fluid py-4">
      <h1 className="mb-4">Welcome to OctoFit Tracker 🏋️</h1>
      
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <h2>{users.length}</h2>
              <Link to="/users" className="btn btn-light btn-sm mt-2">View Users →</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5 className="card-title">Total Activities</h5>
              <h2>{activities.length}</h2>
              <Link to="/activities" className="btn btn-light btn-sm mt-2">View Activities →</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">Teams</h5>
              <h2>{teams.length}</h2>
              <Link to="/teams" className="btn btn-light btn-sm mt-2">View Teams →</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <h5 className="card-title">Total Calories</h5>
              <h2>{leaderboard.reduce((sum, entry) => sum + entry.totalCalories, 0)}</h2>
              <Link to="/leaderboard" className="btn btn-light btn-sm mt-2">View Leaderboard →</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Recent Activities</h5>
            </div>
            <div className="card-body">
              {activities.slice(0, 5).map((activity) => (
                <div key={activity._id} className="pb-3 mb-3 border-bottom">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <p className="mb-1"><strong>{activity.user?.username}</strong></p>
                      <p className="mb-1 text-muted">{activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}</p>
                      <small className="text-muted">{new Date(activity.date).toLocaleDateString()}</small>
                    </div>
                    <div className="text-end">
                      <p className="mb-0"><strong>{activity.calories} cal</strong></p>
                      <small className="text-muted">{activity.duration} min</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">Top Performers</h5>
            </div>
            <div className="card-body">
              {leaderboard
                .sort((a, b) => b.totalCalories - a.totalCalories)
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
                          <p className="mb-1"><strong>{entry.user?.username}</strong></p>
                          <small className="text-muted">{entry.user?.profile?.firstName} {entry.user?.profile?.lastName}</small>
                        </div>
                      </div>
                      <div className="text-end">
                        <p className="mb-0"><strong>{entry.totalCalories} cal</strong></p>
                        <small className="text-muted">{entry.totalActivities} activities</small>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
