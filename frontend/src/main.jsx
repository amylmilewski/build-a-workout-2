import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MyExercises from './pages/MyExercises.jsx'
import MyRoutines from './pages/MyRoutines.jsx'
import { ExercisesContextProvider } from './context/ExerciseContext.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>404 Not Found</div>
  },
  {
    path: '/myexercises',
    element: <MyExercises />
  },
  {
    path: '/myroutines',
    element: <MyRoutines />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ExercisesContextProvider>
      <RouterProvider router={router} />
    </ExercisesContextProvider>
  </StrictMode>,
);
