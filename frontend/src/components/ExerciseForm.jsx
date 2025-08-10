import { useState } from "react"
import useExercisesContext from '../hooks/useExercisesContext'

export default function ExerciseForm () {
    const { dispatch } = useExercisesContext()
    const [title, setTitle] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');
    const [load, setLoad] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

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
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle('')
            setSets('')
            setReps('')
            setLoad('')
            setError(null)
            setEmptyFields([])
            console.log('new exercise added', json)
            dispatch({type: 'CREATE_EXERCISE', payload: json})
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
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Number of Sets:</label>
            <input 
                type="number"
                min="0"
                onChange={(e) => setSets(e.target.value)}
                value={sets} 
                className={emptyFields.includes('sets') ? 'error' : ''}
            />

            <label>Number of Reps (per set):</label>
            <input 
                type="number"
                min="0"
                onChange={(e) => setReps(e.target.value)}
                value={reps} 
                className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <label>Load (lb):</label>
            <input 
                type="number"
                min="0"
                step="0.01"
                onChange={(e) => setLoad(e.target.value)}
                value={load} 
                className={emptyFields.includes('load') ? 'error' : ''}
            />

            <button>Add Exercise</button>
            {error && <div>{error}</div>}
        </form>
    )
}