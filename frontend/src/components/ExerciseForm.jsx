import { useState, useEffect } from "react"
import useExercisesContext from '../hooks/useExercisesContext'
import useAuthContext from "../hooks/useAuthContext";

const API_URL = import.meta.env.VITE_API_URL;


export default function ExerciseForm ({ exerciseToEdit, onFinish }) {
    const { dispatch } = useExercisesContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState(exerciseToEdit ? exerciseToEdit.title : '');
    const [sets, setSets] = useState(exerciseToEdit ? exerciseToEdit.sets : '');
    const [reps, setReps] = useState(exerciseToEdit ? exerciseToEdit.reps : '');
    const [load, setLoad] = useState(exerciseToEdit ? exerciseToEdit.load : '');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    // Populate form when exerciseToEdit changes
    useEffect(() => {
        if (exerciseToEdit) {
        setTitle(exerciseToEdit.title || '');
        setSets(exerciseToEdit.sets || '');
        setReps(exerciseToEdit.reps || '');
        setLoad(exerciseToEdit.load || '');
        } else {
            // reset when switching back to add mode
            setTitle('');
            setSets('');
            setReps('');
            setLoad('');
        }
    }, [exerciseToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const exercise = {title, sets, reps, load, user_id: user._id}

        const url = exerciseToEdit
            ? `${API_URL}/api/exercises/${exerciseToEdit._id}`
            : `${API_URL}/api/exercises`;

        const method = exerciseToEdit ? 'PATCH' : 'POST';

        const response = await fetch(url, {
         method,
         body: JSON.stringify(exercise),
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
         }   
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(Array.isArray(json.emptyFields) ? json.emptyFields : [])
        }
        if (response.ok) {
            if (exerciseToEdit) {
                console.log('dispatching UPDATE_EXERCISE with', json);
                dispatch({ type: 'UPDATE_EXERCISE', payload: json });
                console.log('exercise updated', json)
            } else {
                dispatch({ type: 'CREATE_EXERCISE', payload: json });
                console.log('new exercise added', json)

                // reset form only if creating
                setTitle('');
                setSets('');
                setReps('');
                setLoad('');
            }
            
            setError(null)
            setEmptyFields([])

            if (onFinish) onFinish(); // clears edit mode
        
        }

    }

    return (
        <form className="form-panel" onSubmit={handleSubmit}>
            <h1>{exerciseToEdit ? 'Edit Exercise' : 'Add a New Exercise'}</h1>

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

            <button>{exerciseToEdit ? 'Update Exercise' : 'Add Exercise'}</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}