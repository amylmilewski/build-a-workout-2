import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import useExercisesContext from '../hooks/useExercisesContext';
import useAuthContext from '../hooks/useAuthContext';

// components
import ExerciseCard from '../components/ExerciseCard'
import ExerciseForm from '../components/ExerciseForm';

export default function MyExercises() {
    const {exercises, dispatch} = useExercisesContext()

    const { user } = useAuthContext()
    
    useEffect(() => {
        const fetchExercises = async () => {
            const response = await fetch('http://localhost:4000/api/exercises/', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_EXERCISES', payload: json})
            }
        }

        if (user) {
            fetchExercises() // only attempt to fetch the exercises if there's a value for the user
        }
    }, [dispatch, user])

    return (
        <>
            <Navbar />
            {/*<h1 className='page-title'>Exercises</h1>*/}
            <main>
                <div>
                    {exercises && exercises.map((exercise) => (
                        <ExerciseCard key={exercise._id} exercise={exercise} />
                    ))}
                </div>
                <ExerciseForm />
            </main>
            
        </>
    )
}