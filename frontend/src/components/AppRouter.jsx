import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import App from '../App.jsx'
import MyExercises from '../pages/MyExercises.jsx'
import MyRoutines from '../pages/MyRoutines.jsx'
import Login from '../pages/Login.jsx'
import Signup from '../pages/Signup.jsx'
import useAuthContext from '../hooks/useAuthContext.jsx'

export default function AppRouter() {
    const { user } = useAuthContext()

    const router = createBrowserRouter([
        {
            path: '/',
            element: user ? <App /> : <Navigate to="/login" />,
            errorElement: <div>404 Not Found</div>
        },
        {
            path: '/myexercises',
            element: user ? <MyExercises /> : <Navigate to="/login" />
        },
        {
            path: '/myroutines',
            element: user ? <MyRoutines /> : <Navigate to="/login" />
        },
        {
            path: '/login',
            element: !user ? <Login /> : <Navigate to="/" />
        },
        {
            path: '/signup',
            element: !user ? <Signup /> : <Navigate to="/" />
        }
    ]);

    return <RouterProvider router={router} />;
}