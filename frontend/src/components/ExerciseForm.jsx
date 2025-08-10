import { useState } from "react"

export default function ExerciseForm () {
    const [title, setTitle] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');
    const [load, setLoad] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const exercise = {title, sets, reps, load}

        const response = await fetch('http://localhost:4000/api/exercises', {
         method: 'POST',
         body: JSON.stringify(exercise),
         headers: {
            'Content-Type': 'application/json'
         }   
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setTitle('')
            setSets('')
            setReps('')
            setLoad('')
            setError(null)
            console.log('new exercise added', json)
        }
    }

    return (
        <form className="form-panel" onSubmit={handleSubmit}>
            <h2>Add a New Exercise</h2>

            <label>Exercise Title:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title} 
            />

            <label>Number of Sets:</label>
            <input 
                type="number"
                onChange={(e) => setSets(e.target.value)}
                value={sets} 
            />

            <label>Number of Reps (per set):</label>
            <input 
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps} 
            />

            <label>Load (lb):</label>
            <input 
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load} 
            />

            <button>Add Exercise</button>
            {error && <div>{error}</div>}
        </form>
    )
}