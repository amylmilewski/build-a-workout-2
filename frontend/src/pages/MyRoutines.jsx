import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react';
import useRoutinesContext from '../hooks/useRoutinesContext';
import useAuthContext from '../hooks/useAuthContext';

// components
import RoutineCard from '../components/RoutineCard';
import RoutineForm from '../components/RoutineForm';

const API_URL = import.meta.env.VITE_API_URL;

export default function MyRoutines() {
    const [routineToEdit, setRoutineToEdit] = useState(null);
    const {routines, dispatch} = useRoutinesContext()
    
    const { user } = useAuthContext() 

    // useEffect(() => {
    //     if (!user) {
    //         console.log('user is not ready yet');
    //         return;
    //     }

    //     const fetchRoutines = async () => {
    //         const response = await fetch(`${API_URL}/api/routines/`, {
    //             headers: {
    //                 'Authorization': `Bearer ${user.token}`
    //             }
    //         })
            
    //         const json = await response.json()

    //         if (response.ok) {
    //             dispatch({type: 'SET_ROUTINES', payload: json})
    //         }
    //     }

    //     fetchRoutines()        
    // }, [dispatch, user])

    const fetchRoutines = async () => {
        if (!user) return;

        const response = await fetch(`${API_URL}/api/routines/`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
            
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'SET_ROUTINES', payload: json})
        }
    };

    // initial load
    useEffect(() => {
        fetchRoutines();
    }, [user]); // just depends on user
    
    return (
       <>
            <Navbar />
            {/*<h1 className='page-title'>Routines</h1>*/}
            <main>
                <div>
                    {routines && routines.map((routine) => (
                        <RoutineCard 
                            key={routine._id} 
                            routine={routine} 
                            onEdit={() => setRoutineToEdit(routine)} // <-- open form with data
                        />
                    ))}
                </div>
                {user && <RoutineForm 
                    routineToEdit={routineToEdit}
                    onFinish={() => {
                        setRoutineToEdit(null);
                        fetchRoutines();
                    }} // clear after editing 
                />}
            </main>
       </>
    )
}