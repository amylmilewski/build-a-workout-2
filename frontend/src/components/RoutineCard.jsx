import useRoutinesContext from "../hooks/useRoutinesContext"
import useAuthContext from "../hooks/useAuthContext"

const API_URL = import.meta.env.VITE_API_URL;

export default function RoutineCard ({ routine, onEdit }) {
    const { dispatch } = useRoutinesContext()
    const { user } = useAuthContext()
    
    const handleDelete = async () => {
        if (!user) {
            return
        }
        
        const response = await fetch(`${API_URL}/api/routines/` + routine._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_ROUTINE', payload: json})
        }
    }

    const exercises = routine.exercises;

    return (
        <>
            <div className="card routine-card">
                <h1>{routine.title}</h1>
                <div>
                    {exercises.map((exercise) => (
                        <div className="card exercise-card" key={exercise._id}>
                            <h2>{exercise.title}</h2>
                            <p><strong>Sets: </strong>{exercise.sets}</p>
                            <p><strong>Reps: </strong>{exercise.reps}</p>
                            <p><strong>Load (lb): </strong>{exercise.load}</p>
                        </div>
                    ))}
                </div>
                <div className="actions">
                    <button onClick={onEdit}>edit</button>
                    <button onClick={handleDelete}>delete</button>
                </div>
            </div>
        </>
    )
}