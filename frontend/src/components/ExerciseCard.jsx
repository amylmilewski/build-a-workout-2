import useExercisesContext from "../hooks/useExercisesContext"
import useAuthContext from "../hooks/useAuthContext"

const API_URL = import.meta.env.VITE_API_URL;

export default function ExerciseCard ({ exercise, onEdit }) {
    const { dispatch } = useExercisesContext()
    const { user } = useAuthContext()
    
    const handleDelete = async () => {
        if (!user) {
            return
        }
        
        const response = await fetch(`${API_URL}/api/exercises/` + exercise._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_EXERCISE', payload: json})
        }
    }


    return (
        <>
            <div className="card exercise-card">
                <h2>{exercise.title}</h2>
                <p><strong>Sets: </strong>{exercise.sets}</p>
                <p><strong>Reps: </strong>{exercise.reps}</p>
                <p><strong>Load (lb): </strong>{exercise.load}</p>
                <div className="actions">
                    <button onClick={onEdit}>edit</button>
                    <button onClick={handleDelete}>delete</button>
                </div>
            </div>
        </>
    )
}