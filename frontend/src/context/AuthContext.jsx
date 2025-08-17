import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {user: action.payload}
        case 'LOGOUT':
            return {user: null}
        default:
            return state // if there are no changes, return the original state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    // check for token in local storage (once) when the page first loads
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')) // when it's stored in local storage, it has to be stored as a string, but now using it outside of local storage, we want it back in object format

        // if the user exists, set login action
        if (user) {
            dispatch({type: 'LOGIN', payload: user})
        }
    }, []) // otherwise, if no user in local storage, the user will stay null as defined above the useEffect

    console.log('AuthContext state: ', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}