import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ExercisesContextProvider } from './context/ExerciseContext.jsx'
import { RoutinesContextProvider } from './context/RoutineContext.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import AppRouter from './components/AppRouter.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <RoutinesContextProvider>
        <ExercisesContextProvider>
          <AppRouter />
        </ExercisesContextProvider>
      </RoutinesContextProvider>
    </AuthContextProvider>
  </StrictMode>,
);
