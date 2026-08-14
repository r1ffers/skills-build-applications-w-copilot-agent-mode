import { useAPI } from '../hooks/useAPI';

export default function Leaderboard() {
  const { data: leaderboard, loading, error } = useAPI('/api/leaderboard');

  if (loading) return <div className="text-center p-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  // Group by team
  const byTeam = leaderboard.reduce((acc, entry) => {
    const teamId = entry.team;
    if (!acc[teamId]) {
      acc[teamId] = [];
    }
    acc[teamId].push(entry);
    return acc;
  }, {});

  return (
    <div className="container-fluid py-4">
      <h1 className="mb-4">🏆 Leaderboard</h1>
      
      {Object.entries(byTeam).map(([teamId, entries]) => (
        <div key={teamId} className="mb-5">
          <h2 className="text-primary mb-3">{entries[0]?.user?.team || 'Team'}</h2>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-primary">
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Total Calories</th>
                  <th>Activities</th>
                  <th>Total Duration (min)</th>
                </tr>
              </thead>
              <tbody>
                {entries
                  .sort((a, b) => a.rank - b.rank)
                  .map((entry) => (
                    <tr key={entry._id}>
                      <td>
                        <strong>
                          {entry.rank === 1 && '🥇'}
                          {entry.rank === 2 && '🥈'}
                          {entry.rank === 3 && '🥉'}
                          {entry.rank > 3 && `#${entry.rank}`}
                        </strong>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <img 
                            src={entry.user?.profile?.avatar} 
                            alt={entry.user?.username}
                            className="rounded-circle"
                            width="32"
                            height="32"
                          />
                          <div>
                            <div><strong>{entry.user?.username}</strong></div>
                            <small className="text-muted">{entry.user?.profile?.firstName} {entry.user?.profile?.lastName}</small>
                          </div>
                        </div>
                      </td>
                      <td><strong>{entry.totalCalories}</strong> cal</td>
                      <td>{entry.totalActivities}</td>
                      <td>{entry.totalDuration} min</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
