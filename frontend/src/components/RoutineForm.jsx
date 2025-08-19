import { useState, useEffect } from "react";
import useRoutinesContext from "../hooks/useRoutinesContext";
import useExercisesContext from "../hooks/useExercisesContext";
import useAuthContext from "../hooks/useAuthContext";

const API_URL = import.meta.env.VITE_API_URL;


export default function RoutineForm () {
    const { dispatch } = useRoutinesContext()
    const { user } = useAuthContext()

    const { exercises, dispatch: dispatchExercises } = useExercisesContext()
    const [title, setTitle] = useState('');
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [emptyFields, setEmptyFields] = useState([]);

    // To ensure that the form repopulates the existing exercise list after form submission, fetch exercises if the global exercises list is empty or null
    useEffect(() => {
        if (!user || !user.token) return; // wait until fully authenticated

        if (!Array.isArray(exercises) || exercises.length === 0) { // guard with Array.isArray(exercises) before mapping to prevent the "map is not a function" crash 
            setIsLoading(true);
            fetch(`${API_URL}/api/exercises`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            .then(res => res.json())
            .then(data => {
                dispatchExercises({ type: 'SET_EXERCISES', payload: data });
                setIsLoading(false);
            })
            .catch(err => {
                console.error('Failed to load exercises', err);
                setIsLoading(false);
            });
        } else {
            setIsLoading(false); // Already have exercises in context
        }
    }, [user, exercises, dispatchExercises]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const routine = {title, user_id: user._id, exercises: selectedExercises};

        const response = await fetch(`${API_URL}/api/routines`, {
         method: 'POST',
         body: JSON.stringify(routine),
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
         }   
        });
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if (response.ok) {
            setTitle('')
            setSelectedExercises([])
            setError(null)
            setEmptyFields([])
            console.log('new routine added', json)
            dispatch({type: 'CREATE_ROUTINE', payload: json});
        }
    };

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
            {isLoading ? (
                <p>Loading exercises...</p> // NEW: loading message
            ) : (
                <select
                    name="exercises"
                    multiple
                    onChange={(e) => {
                        const selectedOptions = Array.from(e.target.selectedOptions)
                        const selectedValues = selectedOptions.map(option => option.value)
                        setSelectedExercises(selectedValues);
                    }}
                >
                    {Array.isArray(exercises) && exercises.map(exercise => ( // guard with 'Array.isArray(exercises)' before mapping to prevent the "map is not a function" crash
                        <option key={exercise._id} value={exercise._id}>{exercise.title}</option>
                    ))}
                </select>
            )}
            <button>Create Routine</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}