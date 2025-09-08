import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import useExercisesContext from '../hooks/useExercisesContext';
import useAuthContext from '../hooks/useAuthContext';

// components
import ExerciseCard from '../components/ExerciseCard'
import ExerciseForm from '../components/ExerciseForm';

const API_URL = import.meta.env.VITE_API_URL;

export default function MyExercises() {
    const [exerciseToEdit, setExerciseToEdit] = useState(null);
    const {exercises, dispatch} = useExercisesContext()

    // console.log('current exercises state:', exercises); 

    const { user } = useAuthContext()
    
    // useEffect(() => {
    //     if (!user) {
    //         console.log('user is not ready yet');
    //         return;
    //     }

    //     const fetchExercises = async () => {
    //         // console.log('fetching exercises from:', `${API_URL}/api/exercises/`);
    //         const response = await fetch(`${API_URL}/api/exercises/`, {
    //             headers: {
    //                 'Authorization': `Bearer ${user.token}`
    //             }
    //         })
    //         const json = await response.json()
    //         // console.log('fetch response:', response, json);

    //         if (response.ok) {
    //             dispatch({type: 'SET_EXERCISES', payload: json})
    //         }
    //     }

    //     fetchExercises() 
    // }, [dispatch, user])

    const fetchExercises = async () => {
        if (!user) return;

        const response = await fetch(`${API_URL}/api/exercises/`, {
            headers: {
                'Authorization': `Bearer ${user.token}`,
            },
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'SET_EXERCISES', payload: json });
        }
    };
    
    // initial load
    useEffect(() => {
        fetchExercises();
    }, [user]); // just depends on user

    return (
        <>
            <Navbar />
            {/*<h1 className='page-title'>Exercises</h1>*/}
            <main>
                <div>
                    {exercises && exercises.map((exercise) => (
                        <ExerciseCard 
                            key={exercise._id} 
                            exercise={exercise}
                            onEdit={() => setExerciseToEdit(exercise)} // <-- open form with data 
                        />
                    ))}
                </div>
                <ExerciseForm
                    exerciseToEdit={exerciseToEdit}
                    onFinish={() => {
                        setExerciseToEdit(null);
                        fetchExercises();
                    }} // clear after editing 
                />
            </main>
            
        </>
    )
}