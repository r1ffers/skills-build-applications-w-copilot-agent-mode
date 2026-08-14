import { useAPI } from '../hooks/useAPI';

/**
 * Leaderboard Page Component
 * Displays team-based fitness leaderboard with rankings
 * 
 * API: GET https://{CODESPACE_NAME}-8000.app.github.dev/api/leaderboard
 * Returns: Array of leaderboard entries grouped by team
 */
export default function Leaderboard() {
  const { data: leaderboard, loading, error } = useAPI('/api/leaderboard');

  if (loading) return <div className="text-center p-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger m-3">Error loading leaderboard: {error}</div>;
  if (!leaderboard || leaderboard.length === 0) return <div className="alert alert-info m-3">No leaderboard data found</div>;

  // Group by team
  const byTeam = leaderboard.reduce((acc, entry) => {
    const teamId = entry.team || 'unknown';
    if (!acc[teamId]) {
      acc[teamId] = [];
    }
    acc[teamId].push(entry);
    return acc;
  }, {});

  const getRankMedal = (rank) => {
    const medals = { 1: '🥇', 2: '🥈', 3: '🥉' };
    return medals[rank] || `#${rank}`;
  };

  return (
    <div className="container-fluid py-4">
      <h1 className="mb-4">🏆 Leaderboard</h1>
      <p className="text-muted mb-4">Total Competitors: {leaderboard.length}</p>
      
      {Object.entries(byTeam).map(([teamId, entries]) => (
        <div key={teamId} className="mb-5">
          <h2 className="text-primary mb-3">
            👥 {entries[0]?.user?.team || entries[0]?.teamName || 'Team'}
          </h2>
          <div className="table-responsive">
            <table className="table table-hover shadow-sm">
              <thead className="table-primary">
                <tr>
                  <th>🏅 Rank</th>
                  <th>👤 User</th>
                  <th>🔥 Total Calories</th>
                  <th>📊 Activities</th>
                  <th>⏱️ Total Duration (min)</th>
                </tr>
              </thead>
              <tbody>
                {entries.length > 0 ? (
                  entries
                    .sort((a, b) => a.rank - b.rank)
                    .map((entry) => (
                      <tr key={entry._id}>
                        <td>
                          <strong>{getRankMedal(entry.rank || 0)}</strong>
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <img 
                              src={entry.user?.profile?.avatar || 'https://via.placeholder.com/32'} 
                              alt={entry.user?.username || 'User'}
                              className="rounded-circle"
                              width="32"
                              height="32"
                              style={{ objectFit: 'cover' }}
                            />
                            <div>
                              <div><strong>{entry.user?.username || 'Unknown'}</strong></div>
                              <small className="text-muted">
                                {entry.user?.profile?.firstName} {entry.user?.profile?.lastName}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td><strong>{entry.totalCalories || 0}</strong> cal</td>
                        <td>{entry.totalActivities || 0}</td>
                        <td>{entry.totalDuration || 0} min</td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">No entries for this team</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
