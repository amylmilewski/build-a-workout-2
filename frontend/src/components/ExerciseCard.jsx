export default function ExerciseCard ({ exercise }) {
    return (
        <>
            <div className="card">
                <h2>{exercise.title}</h2>
                <p><strong>Sets: </strong>{exercise.sets}</p>
                <p><strong>Reps: </strong>{exercise.reps}</p>
                <p><strong>Load (lb): </strong>{exercise.load}</p>
            </div>
        </>
    )
}