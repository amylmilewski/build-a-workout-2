import { Link, NavLink } from 'react-router-dom'
import useAuthContext from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

import logo from '../assets/build_a_workout_logo.png'

export default function Navbar () {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <>
            <header>
                <Link to='/' className='site-title'><h1><img src={logo} alt="Logo" />Build-a-Workout</h1></Link>
                <nav>
                    {user && (
                        <div>
                            <NavLink to='/myroutines'>My Routines</NavLink>
                            <NavLink to='/myexercises'>My Exercises</NavLink>
                            <span>{user.email}</span>
                            <button onClick={handleClick}>Log out</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <NavLink to='/login'>Login</NavLink>
                            <NavLink to='/signup'>Signup</NavLink>
                        </div>
                    )}
                </nav>
            </header>
        </>
    )
}