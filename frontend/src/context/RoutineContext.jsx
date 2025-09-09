// to keep the local state in sync with the database (so the user does not need to refresh the page after adding a new exercise)

import { createContext, useReducer } from "react";

export const RoutinesContext = createContext()

// 'state' here refers to the previous state before a change is made to it (a 'reliable previous state value')
// 'action' is the object passed into the dispatch function, which has a type property and a payload
export const routinesReducer = (state, action) => {
    // check the action type
    switch (action.type) {
        case 'SET_ROUTINES':
            return {
                routines: action.payload
            }
        case 'CREATE_ROUTINE':
            return {
                routines: [action.payload, ...state.routines] // action.payload is a single new routine object
            }
        case 'UPDATE_ROUTINE':
            return {
                ...state,
                routines: state.routines.map((r) =>
                r._id === action.payload._id ? action.payload : r)
            }
        case 'DELETE_ROUTINE':
            return {
                routines: state.routines.filter((r) => r._id !== action.payload._id)
            }
        default:
            return state
    }
}

// this component returns the actual provider of the RoutinesContext context created above
// the provider needs to wrap whatever components will need to access the context it represents
// the children property is taken in from the props in main.jsx and it represents the router (including the main App components and the other components)
// therefore, all components will have access to the RoutinesContext context
export const RoutinesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(routinesReducer, {
        routines: null
    })

    return (
        <RoutinesContext.Provider value={{...state, dispatch}}>
            { children }
        </RoutinesContext.Provider>
    )
}