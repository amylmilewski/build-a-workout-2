import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react';
import useRoutinesContext from '../hooks/useRoutinesContext';

import RoutineCard from '../components/RoutineCard';
import RoutineForm from '../components/RoutineForm';


export default function MyRoutines() {
    const {routines, dispatch} = useRoutinesContext()
    
    useEffect(() => {
        const fetchRoutines = async () => {
            const response = await fetch('http://localhost:4000/api/routines/')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_ROUTINES', payload: json})
            }
        }

        fetchRoutines()
    }, [])
    
    return (
       <>
            <Navbar />
            {/*<h1 className='page-title'>Routines</h1>*/}
            <main>
                <div>
                    {routines && routines.map((routine) => (
                        <RoutineCard key={routine._id} routine={routine} />
                    ))}
                </div>
                <RoutineForm />
            </main>
       </>
    )
}