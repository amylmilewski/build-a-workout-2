import { Link, NavLink } from 'react-router-dom'

export default function Navbar () {
    return (
        <>
            <header>
                <Link to='/' className='site-title'><h1><img src="/src/assets/build_a_workout_logo.png" alt="" />Build-a-Workout</h1></Link>
                <nav>
                <NavLink to='/myroutines'>My Routines</NavLink>
                <NavLink to='/myexercises'>My Exercises</NavLink>
                </nav>
            </header>
        </>
    )
}