import { useAPI } from '../hooks/useAPI';

/**
 * Workouts Page Component
 * Displays all workout plans and routines
 * 
 * API: GET https://{CODESPACE_NAME}-8000.app.github.dev/api/workouts
 * Example: https://supreme-memory-759rwv6qj6vfw5xq-8000.app.github.dev/api/workouts
 * Returns: Array of workout objects with exercises and details
 */
export default function Workouts() {
  const { data: workouts, loading, error } = useAPI('/api/workouts');

  if (loading) return <div className="text-center p-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger m-3">Error loading workouts: {error}</div>;
  if (!workouts || workouts.length === 0) return <div className="alert alert-info m-3">No workouts found</div>;

  const getDifficultyBadge = (difficulty) => {
    const colors = {
      beginner: 'success',
      intermediate: 'warning',
      advanced: 'danger'
    };
    return colors[difficulty] || 'secondary';
  };

  const getDifficultyEmoji = (difficulty) => {
    const emojis = {
      beginner: '🟢',
      intermediate: '🟡',
      advanced: '🔴'
    };
    return emojis[difficulty] || '⭕';
  };

  return (
    <div className="container-fluid py-4">
      <h1 className="mb-4">💪 Workouts</h1>
      <p className="text-muted mb-4">Total Workouts: {workouts.length}</p>
      
      <div className="row">
        {workouts.map((workout) => (
          <div key={workout._id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h5 className="card-title">{workout.name || 'Untitled Workout'}</h5>
                  {workout.difficulty && (
                    <span className={`badge bg-${getDifficultyBadge(workout.difficulty)}`}>
                      {getDifficultyEmoji(workout.difficulty)} {workout.difficulty}
                    </span>
                  )}
                </div>
                
                <p className="card-text text-muted">{workout.description || 'No description'}</p>
                
                <div className="mb-3">
                  <h6 className="text-muted">📋 Details</h6>
                  <ul className="small">
                    {workout.duration && (
                      <li>⏱️ Duration: {workout.duration} minutes</li>
                    )}
                    {workout.exercises && (
                      <li>🏋️ Exercises: {Array.isArray(workout.exercises) ? workout.exercises.length : workout.exercises}</li>
                    )}
                    {workout.targetMuscles && (
                      <li>💪 Target: {Array.isArray(workout.targetMuscles) ? workout.targetMuscles.join(', ') : workout.targetMuscles}</li>
                    )}
                    {workout.estimatedCalories && (
                      <li>🔥 Est. Calories: {workout.estimatedCalories}</li>
                    )}
                  </ul>
                </div>

                {workout.exercises && Array.isArray(workout.exercises) && workout.exercises.length > 0 && (
                  <div>
                    <h6 className="text-muted">🏃 Exercises</h6>
                    <div className="list-group list-group-sm">
                      {workout.exercises.slice(0, 3).map((exercise, idx) => (
                        <div key={idx} className="list-group-item border-0 px-0 py-2">
                          <small>
                            <strong>{exercise.name || exercise}</strong>
                            {exercise.sets && ` - ${exercise.sets}x${exercise.reps || 'reps'}`}
                          </small>
                        </div>
                      ))}
                      {workout.exercises.length > 3 && (
                        <small className="text-muted">
                          +{workout.exercises.length - 3} more exercises
                        </small>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
