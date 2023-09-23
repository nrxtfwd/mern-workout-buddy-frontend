import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutDetails = ({ workout }) => {
    const { title, reps, load, createdAt } = workout
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    async function handleDelete() {
        if (!user) return;

        const response = await fetch(`http://localhost:4000/api/workouts/${workout._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({
                type: 'DELETE_WORKOUT',
                payload: json
            })
        }
    }

    return (
        <div className="workout-details">
            <h4>{title}</h4>
            <p><strong>Load (kg): </strong>{load}</p>
            <p><strong>Reps: </strong>{reps}</p>
            <p>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
        </div>
    )
}

export default WorkoutDetails