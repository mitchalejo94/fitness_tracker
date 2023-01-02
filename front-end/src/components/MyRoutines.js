import React, { useEffect, useState } from "react";
import { fetchRoutines } from "../api/api";


const MyRoutines = ({username, token}) => {
    console.log('username here: ', username);
    console.log('token here? :', token)

    const [routines, setRoutines] = useState([]);

    useEffect(() => {
        const gathering = async(username, token) => {
            const data = await fetchRoutines(username, token);
            setRoutines(data);
            console.log('data here: ', data)
        }
        gathering(username, token)
    },[])

    const handleCreateNewRoutine = (name, goal) => {
        console.log(`your new routine is ${name} until ${goal}`)
    }

    const NewRoutineForm = () => {
        const [name, setName] = useState("");
        const [goal, setGoal] = useState("");

        return (
            <>
                <form onSubmit={(event) => {
                event.preventDefault();
                handleCreateNewRoutine(name, goal)
                setGoal("")
                setName("")
                }}>
                    <label>Routine Name</label>
                    <input
                        type="text"
                        value={name}
                        placeholder="name"
                        required
                        onChange={(event) => setName(event.target.value)}
                    />
                    <label>Routine Goal</label>
                    <input
                        type="text"
                        value={goal}
                        placeholder="goal"
                        required
                        onChange={(event) => setGoal(event.target.value)}
                    />
                    <button type="submit">Create Routine</button>
                </form>
                
            </>
        )
        
    }
    
    return (
        <>
        <h1 className="centered ui header">My Routines</h1>
        <NewRoutineForm />
        {routines.length < 1 
        ? (<p>You dont have any routines to display!</p>)
        : (
            routines.map((eachRoutine) => {
                console.log('each routine', eachRoutine)
                return (
                    <div>
                        <h4>{eachRoutine.name}</h4>
                        <p>{eachRoutine.goal}</p>
                    </div>
                )
            })
        )}
        
        </>
    )
}





export default MyRoutines;