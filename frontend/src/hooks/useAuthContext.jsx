import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function useAuthContext () {
    const context = useContext(AuthContext) // this hook returns the value of the AuthContext object which is the value we passed into the provider component

    if (!context) {
        throw Error('useAuthContext must be used inside an AuthContextProvider')
    }

    return context
}