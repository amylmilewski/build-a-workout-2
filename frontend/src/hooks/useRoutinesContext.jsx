import { RoutinesContext } from "../context/RoutineContext";
import { useContext } from "react";

export default function useRoutinesContext () {
    const context = useContext(RoutinesContext)

    if (!context) {
        throw Error('useRoutinesContext must be used inside a RoutinesContextProvider')
    }

    return context
}