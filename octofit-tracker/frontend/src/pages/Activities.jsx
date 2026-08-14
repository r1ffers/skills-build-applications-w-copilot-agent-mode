import { useAPI } from '../hooks/useAPI';

/**
 * Activities Page Component
 * Displays all fitness activities logged by users
 * 
 * API: GET https://{CODESPACE_NAME}-8000.app.github.dev/api/activities
 * Returns: Array of activity objects with type, duration, calories, distance, etc.
 */
export default function Activities() {
  const { data: activities, loading, error } = useAPI('/api/activities');

  if (loading) return <div className="text-center p-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger m-3">Error loading activities: {error}</div>;
  if (!activities || activities.length === 0) return <div className="alert alert-info m-3">No activities found</div>;

  const getActivityBadge = (type) => {
    const colors = {
      running: 'primary',
      cycling: 'info',
      swimming: 'success',
      walking: 'warning',
      gym: 'danger',
      sports: 'secondary',
      other: 'dark'
    };
    return colors[type] || 'secondary';
  };

  const getActivityEmoji = (type) => {
    const emojis = {
      running: '🏃',
      cycling: '🚴',
      swimming: '🏊',
      walking: '🚶',
      gym: '💪',
      sports: '⚽',
      other: '🏋️'
    };
    return emojis[type] || '🏃';
  };

  return (
    <div className="container-fluid py-4">
      <h1 className="mb-4">📊 Activities</h1>
      <p className="text-muted mb-4">Total Activities: {activities.length}</p>
      
      <div className="table-responsive">
        <table className="table table-hover shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>📱 User</th>
              <th>🏃 Type</th>
              <th>⏱️ Duration (min)</th>
              <th>🔥 Calories</th>
              <th>📏 Distance (km)</th>
              <th>📅 Date</th>
              <th>📝 Description</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id}>
                <td>
                  <strong>{activity.user?.username || 'Unknown'}</strong>
                </td>
                <td>
                  <span className={`badge bg-${getActivityBadge(activity.type)}`}>
                    {getActivityEmoji(activity.type)} {activity.type}
                  </span>
                </td>
                <td>{activity.duration || 0}</td>
                <td><strong>{activity.calories || 0}</strong></td>
                <td>{activity.distance || '-'}</td>
                <td>{activity.date ? new Date(activity.date).toLocaleDateString() : '-'}</td>
                <td>{activity.description || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
