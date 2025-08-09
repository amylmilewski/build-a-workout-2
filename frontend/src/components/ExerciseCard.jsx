export default function ExerciseCard ({ workout }) {
    return (
        <>
            <div className="card">
                <h2>{workout.title}</h2>
                <p><strong>Sets: </strong>{workout.sets}</p>
                <p><strong>Reps: </strong>{workout.reps}</p>
                <p><strong>Load (lb): </strong>{workout.load}</p>
            </div>
        </>
    )
}