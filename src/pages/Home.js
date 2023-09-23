import { useEffect } from "react"
import { useAuthContext } from '../hooks/useAuthContext'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
    const {state, dispatch} = useWorkoutsContext()
    const {workouts} = state
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('http://localhost:4000/api/workouts/', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const data = await response.json()

            console.log(data)

            if (response.ok) {
                dispatch({
                    type: 'SET_WORKOUTS', 
                    payload: data
                })
            }
        }

        if (user) {
            fetchWorkouts()
        }
    }, [dispatch, user])

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => {
                    return <WorkoutDetails key={workout._id} workout={workout}/>
                })}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home