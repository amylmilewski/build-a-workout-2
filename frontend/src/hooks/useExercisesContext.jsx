import { ExercisesContext } from "../context/ExerciseContext";
import { useContext } from "react";

export default function useExercisesContext () {
    const context = useContext(ExercisesContext) // this hook returns the value of the ExercisesContext object which is the value we passed into the provider component

    if (!context) {
        throw Error('useExercisesContext must be used inside an ExercisesContextProvider')
    }

    return context
}