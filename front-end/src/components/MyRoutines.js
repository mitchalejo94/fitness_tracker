import React, { useEffect, useState } from "react";
import { fetchRoutines, postRoutine, patchRoutine, deleteRoutine } from "../api/api";


const MyRoutines = ({username, token}) => {
    // console.log('username here: ', username);
    // console.log('token here? :', token)

    const [routines, setRoutines] = useState([]);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        const gathering = async(username, token) => {
            const data = await fetchRoutines(username, token);
            setRoutines(data);
            // console.log('data here: ', data)
        }
        gathering(username, token)
    },[routines])

    const handleCreateNewRoutine = async (name, goal, visability) => {
        // console.log(`your private (${visability}) routine is ${name} until ${goal}`);
        const newRoutine = await postRoutine(name, goal, visability, token);
        setRoutines((previousRoutines) => [...previousRoutines, newRoutine]);
        // setAddContact((prevContact) => [...prevContact, inputValue]);
        return newRoutine;
    }

    const handleRoutineDelete = async (routineId) => {
        // console.log(`are you sure you want to delete ${routineId}`);
        const youSureYouWantToDeleteThis = await deleteRoutine(routineId, token)
        // console.log('youSureYouWantToDeleteThis', youSureYouWantToDeleteThis);
        return youSureYouWantToDeleteThis;
    }

    const EditRoutineForm = ({routine}) => {
        const [name, setName] = useState(routine.name);
        const [goal, setGoal] = useState(routine.goal);
        const [visability, setVisability] = useState(routine.visability);
        // console.log('did we get teh edit routine? ', routine)
        
        return (
            <>
                <form onSubmit={(event) => {
                event.preventDefault();
                handleEditRoutine(name, goal, visability, routine.id)
                }}>
                    <label>Edit Routine Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <label>Edit Routine Goal</label>
                    <input
                        type="text"
                        value={goal}
                        onChange={(event) => setGoal(event.target.value)}
                    />
                    <label>Check this box to make your routine private: </label>
                    <input
                        type="checkbox"
                        value={visability}
                        onChange={() => setVisability(!visability)}/>

                    <button type="submit">Submit Edited Routine</button>
                </form>
                
            </>
        )
    }

    const handleEditRoutine = async (name, goal, visability, routineId) => {
        // routine comes in as an object
        // creatorId, creatorName, goal, isPublic, name

        // (name, goal, isPublic, token, routineId)
        const updatedRoutine = await patchRoutine(name, goal, visability, token, routineId);
        // console.log('updated routine on page? ', updatedRoutine)
        setEdit(false)

        // <button onClick={() => {
            // setArtists(
            //     artists.filter(a =>
            //       a.id !== artist.id
            //     )
            //   );
            // }}>
        const updatingState = routines.filter((routine => routine.id !== updatedRoutine.id));
        setRoutines([...updatingState, updatedRoutine])
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
        <button onClick={() => setEdit(!edit)}>Edit Your Routines</button>
        
        {routines.length < 1 
        ? (<p>You dont have any routines to display!</p>)
        : (
            routines.map((eachRoutine) => {
                // console.log('each routine', eachRoutine)
                return (
                    <div key={eachRoutine.id}>
                        <h4>{eachRoutine.name}</h4>
                        <p>{eachRoutine.goal}</p>
                        {edit ? (<EditRoutineForm routine={eachRoutine} />) : null}
                        <button onClick={() => handleRoutineDelete(eachRoutine.id)}>Delete this routine</button>
                    </div>
                )
            })
        )}
        </>
    )
}





export default MyRoutines;