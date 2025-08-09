import { Link, NavLink } from 'react-router-dom'
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';

import ExerciseCard from '../components/ExerciseCard'

export default function MyExercises() {
    const [workouts, setWorkouts] = useState(null);
    
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('http://localhost:4000/api/workouts/')
            const json = await response.json()

            if (response.ok) {
                setWorkouts(json)
            }
        }

        fetchWorkouts()
    }, [])

    return (
        <>
            <Navbar />
            <h1 className='page-title'>Exercises</h1>
            <main>
                <div>
                    {workouts && workouts.map((workout) => (
                        <ExerciseCard key={workout._id} workout={workout} />
                    ))}
                </div>
            </main>
        </>
    )
}