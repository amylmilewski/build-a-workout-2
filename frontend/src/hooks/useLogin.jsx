import { useState } from "react";
import useAuthContext from './useAuthContext' // returns context with the user property and the dispatch function

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null) // when we try to correct errors, we don't want to still be showing the previous error while we're trying to rectify it. so we want to reset the error at the start of this function

        const response = await fetch('http://localhost:4000/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json() // this json object is the email and jwt

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error) // update error
        }
        if (response.ok) {
            // save the user to local storage so they can stay logged in for as long as the token is valid
            localStorage.setItem('user', JSON.stringify(json)) // stores the email and jwt

            // update the auth context (global state)
            dispatch({type: 'LOGIN', payload: json}) // same action as signing up

            setIsLoading(false)
        }
    }

    return { login, isLoading, error }
}