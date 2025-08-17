import useAuthContext from "./useAuthContext"
import useExercisesContext from './useExercisesContext'
import useRoutinesContext from './useRoutinesContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: exercisesDispatch } = useExercisesContext()
    const { dispatch: routinesDispatch } = useRoutinesContext()

    const logout = () => {
        // we don't need to send a request to the backend to log out, we just need to update the global state and delete the token from local storage

        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type: 'LOGOUT'}) // note there's no payload (the user is just reset to be null (AuthContext.jsx))
        exercisesDispatch({type: 'SET_EXERCISES', payload: null}) // clearing global exercises state
        routinesDispatch({type: 'SET_ROUTINES', payload: null}) // clearing global routines state
    }
    return {logout}
}