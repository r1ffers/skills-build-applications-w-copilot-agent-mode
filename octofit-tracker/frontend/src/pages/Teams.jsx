import { useAPI } from '../hooks/useAPI';

/**
 * Teams Page Component
 * Displays all teams with their leaders and members
 * 
 * API: GET https://{CODESPACE_NAME}-8000.app.github.dev/api/teams
 * Returns: Array of team objects with leader and members info
 */
export default function Teams() {
  const { data: teams, loading, error } = useAPI('/api/teams');

  if (loading) return <div className="text-center p-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger m-3">Error loading teams: {error}</div>;
  if (!teams || teams.length === 0) return <div className="alert alert-info m-3">No teams found</div>;

  return (
    <div className="container-fluid py-4">
      <h1 className="mb-4">👥 Teams</h1>
      <p className="text-muted mb-4">Total Teams: {teams.length}</p>
      
      <div className="row">
        {teams.map((team) => (
          <div key={team._id} className="col-md-6 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <p className="card-text text-muted">{team.description}</p>
                
                <div className="mb-3">
                  <h6 className="text-muted">🏆 Team Leader</h6>
                  <div className="d-flex align-items-center gap-2">
                    <img 
                      src={team.leader?.profile?.avatar || 'https://via.placeholder.com/40'} 
                      alt={team.leader?.username || 'Leader'}
                      className="rounded-circle"
                      width="40"
                      height="40"
                      style={{ objectFit: 'cover' }}
                    />
                    <div>
                      <div><strong>{team.leader?.username || 'N/A'}</strong></div>
                      <small className="text-muted">
                        {team.leader?.profile?.firstName} {team.leader?.profile?.lastName}
                      </small>
                    </div>
                  </div>
                </div>

                <div>
                  <h6 className="text-muted">👥 Members ({team.members?.length || 0})</h6>
                  <div className="list-group list-group-sm">
                    {team.members && team.members.length > 0 ? (
                      team.members.map((member) => (
                        <div key={member._id} className="list-group-item border-0 px-0 py-2">
                          <div className="d-flex align-items-center gap-2">
                            <img 
                              src={member.profile?.avatar || 'https://via.placeholder.com/32'} 
                              alt={member.username}
                              className="rounded-circle"
                              width="32"
                              height="32"
                              style={{ objectFit: 'cover' }}
                            />
                            <div>
                              <div className="text-sm"><strong>{member.username}</strong></div>
                              <small className="text-muted">
                                {member.profile?.firstName} {member.profile?.lastName}
                              </small>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <small className="text-muted">No members</small>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
