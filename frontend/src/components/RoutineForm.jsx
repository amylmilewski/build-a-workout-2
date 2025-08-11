import { useState, useEffect } from "react";
import useRoutinesContext from "../hooks/useRoutinesContext";
import useExercisesContext from "../hooks/useExercisesContext";

export default function RoutineForm () {
    const { dispatch } = useRoutinesContext()
    const { exercises, dispatch: dispatchExercises } = useExercisesContext()
    const [title, setTitle] = useState('');
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    // To ensure that the form repopulates the existing exercise list after form submission, fetch exercises if the global exercises list is empty or null
    useEffect(() => {
        if (!exercises || exercises.length === 0) {
            fetch('http://localhost:4000/api/exercises')
            .then(res => res.json())
            .then(data => dispatchExercises({ type: 'SET_EXERCISES', payload: data }))
            .catch(err => console.error('Failed to load exercises', err));
        }
    }, [exercises, dispatchExercises]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const routine = {title, exercises: selectedExercises}

        const response = await fetch('http://localhost:4000/api/routines', {
         method: 'POST',
         body: JSON.stringify(routine),
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
            setSelectedExercises([])
            setError(null)
            setEmptyFields([])
            console.log('new routine added', json)
            dispatch({type: 'CREATE_ROUTINE', payload: json})
        }
    }

    return (
        <form className="form-panel" onSubmit={handleSubmit}>
            <h1>Create a New Routine</h1>

            <label>Routine Title:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''} 
            />

            <label>Exercises:</label>
            <select
                name="exercises"
                multiple
                onChange={(e) => {
                    const selectedOptions = Array.from(e.target.selectedOptions)
                    const selectedValues = selectedOptions.map(option => option.value)
                    setSelectedExercises(selectedValues)
                }}
            >
                {(exercises || []).map(exercise => ( // using ' || []' to ensure that exercise is always an array before calling .map on it (). When the context provider initializes, exercises might be null or undefined initially before the data is fetched.The component renders once immediately, so if you try .map before the data is loaded, you get the error.
                    <option key={exercise._id} value={exercise._id}>{exercise.title}</option>
                ))}
            </select>
           
            <button>Create Routine</button>
            {error && <div>{error}</div>}
        </form>
    )
}