import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from "./useWorkoutsContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: workoutsDispatch } = useWorkoutsContext()

    const logout = () => {
        // dispatch logout
        dispatch({ type: 'LOGOUT' })

        // remove workouts
        workoutsDispatch({
            type: 'CLEAR'
        })

        // remove user from storage
        localStorage.removeItem('user')
    }

    return { logout }
}