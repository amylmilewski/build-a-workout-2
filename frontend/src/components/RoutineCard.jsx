import useRoutinesContext from "../hooks/useRoutinesContext"

export default function RoutineCard ({ routine }) {
    const { dispatch } = useRoutinesContext()
    
    const handleClick = async () => {
        const response = await fetch('http://localhost:4000/api/routines/' + routine._id, {
            method: 'DELETE'
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
                <button onClick={handleClick}>delete</button>
            </div>
        </>
    )
}