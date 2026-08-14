import { useAPI } from '../hooks/useAPI';

/**
 * Users Page Component
 * Displays all registered users with their profiles
 * 
 * API: GET https://{CODESPACE_NAME}-8000.app.github.dev/api/users
 * Example: https://supreme-memory-759rwv6qj6vfw5xq-8000.app.github.dev/api/users
 * Returns: Array of user objects with profile information
 */
export default function Users() {
  const { data: users, loading, error } = useAPI('/api/users');

  if (loading) return <div className="text-center p-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger m-3">Error loading users: {error}</div>;
  if (!users || users.length === 0) return <div className="alert alert-info m-3">No users found</div>;

  return (
    <div className="container-fluid py-4">
      <h1 className="mb-4">👥 Users</h1>
      <p className="text-muted mb-4">Total Users: {users.length}</p>
      
      <div className="row">
        {users.map((user) => (
          <div key={user._id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm hover-shadow">
              <div className="card-body">
                <div className="text-center mb-3">
                  <img 
                    src={user.profile?.avatar || 'https://via.placeholder.com/80'} 
                    alt={user.username} 
                    className="rounded-circle" 
                    width="80" 
                    height="80"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <h5 className="card-title text-center">{user.profile?.firstName} {user.profile?.lastName}</h5>
                <p className="card-text text-center text-muted">@{user.username}</p>
                <p className="card-text text-center"><small>{user.email}</small></p>
                
                {user.profile?.bio && (
                  <p className="card-text text-center small">{user.profile.bio}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
