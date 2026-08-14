import { useAPI } from '../hooks/useAPI';

export default function Activities() {
  const { data: activities, loading, error } = useAPI('/api/activities');

  if (loading) return <div className="text-center p-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

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

  return (
    <div className="container-fluid py-4">
      <h1 className="mb-4">Activities</h1>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Duration (min)</th>
              <th>Calories</th>
              <th>Distance (km)</th>
              <th>Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id}>
                <td>
                  <strong>{activity.user?.username}</strong>
                </td>
                <td>
                  <span className={`badge bg-${getActivityBadge(activity.type)}`}>
                    {activity.type}
                  </span>
                </td>
                <td>{activity.duration}</td>
                <td><strong>{activity.calories}</strong></td>
                <td>{activity.distance || '-'}</td>
                <td>{new Date(activity.date).toLocaleDateString()}</td>
                <td>{activity.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
