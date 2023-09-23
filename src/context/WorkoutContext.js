import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext()

export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                workouts: [
                    ...state.workouts,
                    action.payload
                ]
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter(e => e._id !== action.payload._id)
            }
        case 'CLEAR':
            return {
                workouts: []
            }
        default:
            return state
    }
}

export const WorkoutsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutsReducer, {workouts: null})

    return (
        <WorkoutsContext.Provider value={{state, dispatch}}>
            {children}
        </WorkoutsContext.Provider>
    )
}