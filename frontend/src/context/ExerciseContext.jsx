// to keep the local state in sync with the database (so the user does not need to refresh the page after adding a new exercise)

import { createContext, useReducer } from "react";

export const ExercisesContext = createContext()

// 'state' here refers to the previous state before a change is made to it (a 'reliable previous state value')
// 'action' is the object passed into the dispatch function, which has a type property and a payload
export const exercisesReducer = (state, action) => {
    // check the action type
    switch (action.type) {
        case 'SET_EXERCISES':
            return {
                exercises: action.payload
            }
        case 'CREATE_EXERCISE':
            return {
                exercises: [action.payload, ...state.exercises] // action.payload is a single new exercise object
            }
        case 'UPDATE_EXERCISE':
            return {
                ...state,
                exercises: state.exercises.map((e) =>
                e._id === action.payload._id ? action.payload : e)
            }
        case 'DELETE_EXERCISE':
            return {
                exercises: state.exercises.filter((e) => e._id !== action.payload._id)
            }
        default:
            return state
    }
}

// this component returns the actual provider of the ExercisesContext context created above
// the provider needs to wrap whatever components will need to access the context it represents
// the children property is taken in from the props in main.jsx and it represents the router (including the main App components and the other components)
// therefore, all components will have access to the ExercisesContext context
export const ExercisesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(exercisesReducer, {
        exercises: []
    })

    return (
        <ExercisesContext.Provider value={{...state, dispatch}}>
            { children }
        </ExercisesContext.Provider>
    )
}