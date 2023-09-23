import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutForm = () => {
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const {state, dispatch} = useWorkoutsContext()
    const { user } = useAuthContext()

    async function handleSubmit(e) {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in!')
            return;
        }

        const workout = {title, load, reps}

        const response = await fetch('http://localhost:4000/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        setEmptyFields(json.emptyFields || [])

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            dispatch({
                type: 'CREATE_WORKOUT',
                payload: json
            })
            setError(null)
            console.log('New Workout added successfully', json)
            setTitle('')
            setLoad('')
            setReps('')
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>
                Add a new Workout
            </h3>

            <label>Exercise Title:</label>
            <input 
                type="text" 
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Load (kg):</label>
            <input 
                type="number" 
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />

            <label>Reps:</label>
            <input 
                type="number" 
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm