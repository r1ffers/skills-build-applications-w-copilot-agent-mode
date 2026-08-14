import { useAPI } from '../hooks/useAPI';

export default function Teams() {
  const { data: teams, loading, error } = useAPI('/api/teams');

  if (loading) return <div className="text-center p-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container-fluid py-4">
      <h1 className="mb-4">Teams</h1>
      <div className="row">
        {teams.map((team) => (
          <div key={team._id} className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <p className="card-text">{team.description}</p>
                
                <div className="mb-3">
                  <h6 className="text-muted">Team Leader</h6>
                  <div className="d-flex align-items-center gap-2">
                    <img 
                      src={team.leader?.profile?.avatar} 
                      alt={team.leader?.username}
                      className="rounded-circle"
                      width="40"
                      height="40"
                    />
                    <div>
                      <div><strong>{team.leader?.username}</strong></div>
                      <small className="text-muted">{team.leader?.profile?.firstName} {team.leader?.profile?.lastName}</small>
                    </div>
                  </div>
                </div>

                <div>
                  <h6 className="text-muted">Members ({team.members?.length || 0})</h6>
                  <div className="list-group list-group-sm">
                    {team.members?.map((member) => (
                      <div key={member._id} className="list-group-item border-0 px-0 py-2">
                        <div className="d-flex align-items-center gap-2">
                          <img 
                            src={member.profile?.avatar} 
                            alt={member.username}
                            className="rounded-circle"
                            width="32"
                            height="32"
                          />
                          <div>
                            <div className="text-sm"><strong>{member.username}</strong></div>
                            <small className="text-muted">{member.profile?.firstName} {member.profile?.lastName}</small>
                          </div>
                        </div>
                      </div>
                    ))}
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
