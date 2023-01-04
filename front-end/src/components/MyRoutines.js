import React, { useEffect, useState } from "react";
import { fetchRoutines, postRoutine, patchRoutine, deleteRoutine } from "../api/api";


const MyRoutines = ({username, token, activities}) => {

    const [routines, setRoutines] = useState([]);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        const gathering = async(username, token) => {
            const data = await fetchRoutines(username, token);
            setRoutines(data);
        }
        gathering(username, token)
    },[])

    const handleCreateNewRoutine = async (name, goal, visability) => {
        const newRoutine = await postRoutine(name, goal, visability, token);

            setRoutines((previousRoutines) => [...previousRoutines, newRoutine]);
        
        return newRoutine;
    }

    const handleRoutineDelete = async (routineId) => {
        const youSureYouWantToDeleteThis = await deleteRoutine(routineId, token)
        return youSureYouWantToDeleteThis;
    }

    const EditRoutineForm = ({routine}) => {
        const [name, setName] = useState(routine.name);
        const [goal, setGoal] = useState(routine.goal);
        const [visability, setVisability] = useState(routine.visability);
        
        return (
            <>
                <form 
                className="ui input"
                onSubmit={(event) => {
                event.preventDefault();
                handleEditRoutine(name, goal, visability, routine.id)
                }}>
                    <label>Edit Routine Name</label>
                    <input
                        className="ui input"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <label>Edit Routine Goal</label>
                    <input
                        className="ui input"
                        type="text"
                        value={goal}
                        onChange={(event) => setGoal(event.target.value)}
                    />
                    <label>Check this box to make your routine private: </label>
                    <input
                        className="ui input"
                        type="checkbox"
                        value={visability}
                        onChange={() => setVisability(!visability)}/>

                    <button className="ui primary button" type="submit">Submit Edited Routine</button>
                </form>
                
            </>
        )
    }

    const handleEditRoutine = async (name, goal, visability, routineId) => {
        const updatedRoutine = await patchRoutine(name, goal, visability, token, routineId);
        // console.log('updated routine on page? ', updatedRoutine)
        setEdit(false)

        const updatingState = routines.filter((routine => routine.id !== updatedRoutine.id));
        setRoutines([...updatingState, updatedRoutine])
    }

    const NewRoutineForm = () => {
        const [name, setName] = useState("");
        const [goal, setGoal] = useState("");
        const [visability, setVisability] = useState(true) // sets public / private of routine
        // default to public

        return (
            <div className="container">
            <div className="ui card fluid">
                <form 
                className="ui input"
                onSubmit={(event) => {
                event.preventDefault();
                handleCreateNewRoutine(name, goal, visability)
                setGoal("")
                setName("")
                }}>
                    <label>Routine Name</label>
                    <input
                        className="ui input"
                        type="text"
                        value={name}
                        placeholder="name"
                        required
                        onChange={(event) => setName(event.target.value)}
                    />
                    <label>Routine Goal</label>
                    <input
                        className="ui input"
                        type="text"
                        value={goal}
                        placeholder="goal"
                        required
                        onChange={(event) => setGoal(event.target.value)}
                    />
                    <label>Check this box to make your routine private: </label>
                    <input
                        className="ui input"
                        type="checkbox"
                        value={visability}
                        onChange={() => setVisability(!visability)}/>

                    <button className="ui primary button" type="submit">Create Routine</button>
                </form>
                
            </div>
            </div>
        )
    }

    
    return (
        <>
        <h1 className="centered ui header">My Routines</h1>
        <NewRoutineForm />
        <button className="ui primary button" onClick={() => setEdit(!edit)}>Edit Your Routines</button>
        
        {!routines 
        ? (<p>You dont have any routines to display!</p>)
        : (
            Array.from(routines).map((eachRoutine) => {
                return (
                    <div className="container">
                    <div className="ui card fluid">
                    <div key={eachRoutine.id}>
                        <h4 className="ui header">{eachRoutine.name}</h4>
                        <p className="ui tiny header">{eachRoutine.goal}</p>
                        {edit ? (<EditRoutineForm routine={eachRoutine} />) : null} 
                        <form onSubmit={(event) => {
                            event.preventDefault();
                        }}>
                            <label htmlFor="add-activities">Add activities</label>
                            <select role="listbox" className="ui fluid selection dropdown" name="add-activities">
                            <option disabled>Pick an Activity</option>
                            {activities.map((activity) => {
                                return (
                                    <option key={activity.id} value={activity.id} >{activity.name}</option>
                                )
                            })}
                            </select>
                            <button className="ui primary button" type="submit">Add activity</button>
                        </form> 
                        
                        <button className="ui red basic button" onClick={() => handleRoutineDelete(eachRoutine.id)}>Delete this routine</button>
                    </div>
                    </div>
                    </div>
                )
            })
        )}
        </>
    )
}


export default MyRoutines;