import { useAPI } from '../hooks/useAPI';

export default function Users() {
  const { data: users, loading, error } = useAPI('/api/users');

  if (loading) return <div className="text-center p-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container-fluid py-4">
      <h1 className="mb-4">Users</h1>
      <div className="row">
        {users.map((user) => (
          <div key={user._id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <div className="text-center mb-3">
                  <img src={user.profile?.avatar} alt={user.username} className="rounded-circle" width="80" height="80" />
                </div>
                <h5 className="card-title text-center">{user.profile?.firstName} {user.profile?.lastName}</h5>
                <p className="card-text text-center text-muted">@{user.username}</p>
                <p className="card-text text-center"><small>{user.email}</small></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
