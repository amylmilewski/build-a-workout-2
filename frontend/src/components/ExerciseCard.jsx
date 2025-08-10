import useExercisesContext from "../hooks/useExercisesContext"

export default function ExerciseCard ({ exercise }) {
    const { dispatch } = useExercisesContext()
    
    const handleClick = async () => {
        const response = await fetch('http://localhost:4000/api/exercises/' + exercise._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_EXERCISE', payload: json})
        }
    }

    return (
        <>
            <div className="card">
                <h2>{exercise.title}</h2>
                <p><strong>Sets: </strong>{exercise.sets}</p>
                <p><strong>Reps: </strong>{exercise.reps}</p>
                <p><strong>Load (lb): </strong>{exercise.load}</p>
                <button onClick={handleClick}>delete</button>
            </div>
        </>
    )
}