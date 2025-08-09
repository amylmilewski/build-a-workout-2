import { Link, NavLink } from 'react-router-dom'
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';

import ExerciseCard from '../components/ExerciseCard'

export default function MyExercises() {
    const [exercises, setExercises] = useState(null);
    
    useEffect(() => {
        const fetchExercises = async () => {
            const response = await fetch('http://localhost:4000/api/exercises/')
            const json = await response.json()

            if (response.ok) {
                setExercises(json)
            }
        }

        fetchExercises()
    }, [])

    return (
        <>
            <Navbar />
            <h1 className='page-title'>Exercises</h1>
            <main>
                <div>
                    {exercises && exercises.map((exercise) => (
                        <ExerciseCard key={exercise._id} exercise={exercise} />
                    ))}
                </div>
            </main>
        </>
    )
}