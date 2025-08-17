import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react';
import useRoutinesContext from '../hooks/useRoutinesContext';
import useAuthContext from '../hooks/useAuthContext';

// components
import RoutineCard from '../components/RoutineCard';
import RoutineForm from '../components/RoutineForm';


export default function MyRoutines() {
    const {routines, dispatch} = useRoutinesContext()
    
    const { user } = useAuthContext() 

    useEffect(() => {
        const fetchRoutines = async () => {
            const response = await fetch('http://localhost:4000/api/routines/', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_ROUTINES', payload: json})
            }
        }

        if (user) {
            fetchRoutines() // only attempt to fetch the routines if there's a value for the user
        }
    }, [dispatch, user])
    
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
                {user && <RoutineForm />}
            </main>
       </>
    )
}