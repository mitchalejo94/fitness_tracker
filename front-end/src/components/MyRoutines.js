import React, { useEffect, useState } from "react";
import { fetchRoutines, postRoutine } from "../api/api";


const MyRoutines = ({username, token}) => {
    // console.log('username here: ', username);
    // console.log('token here? :', token)

    const [routines, setRoutines] = useState([]);

    useEffect(() => {
        const gathering = async(username, token) => {
            const data = await fetchRoutines(username, token);
            setRoutines(data);
            // console.log('data here: ', data)
        }
        gathering(username, token)
    },[])

    const handleCreateNewRoutine = async (name, goal, visability) => {
        // console.log(`your private (${visability}) routine is ${name} until ${goal}`);
        const newRoutine = await postRoutine(name, goal, visability, token);
        setRoutines((previousRoutines) => [...previousRoutines, newRoutine]);
        // setAddContact((prevContact) => [...prevContact, inputValue]);
        return newRoutine;
        
    }

    const NewRoutineForm = () => {
        const [name, setName] = useState("");
        const [goal, setGoal] = useState("");
        const [visability, setVisability] = useState(true) // sets public / private of routine
        // default to public

        return (
            <>
                <form onSubmit={(event) => {
                event.preventDefault();
                handleCreateNewRoutine(name, goal, visability)
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
                    <label>Check this box to make your routine private: </label>
                    <input
                        type="checkbox"
                        value={visability}
                        onChange={() => setVisability(!visability)}/>

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
                // console.log('each routine', eachRoutine)
                return (
                    <div key={eachRoutine.id}>
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