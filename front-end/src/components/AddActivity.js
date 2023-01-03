import React, { useEffect, useState } from "react";
 

const AddActivity = ({activities, eachRoutine}) => {

    const [count, setCount] = useState("");
    const [duration, setDuration] = useState("");
    const [newActivity, setNewActivity] = useState("");

    // console.log('each routine in Add: ', eachRoutine)
    // get the activity to attach to routine
        // from drop down menu
    // we are already inside the routine we need (destructured)
    // when we click Add Activity 
        // use attachActivity(routineId, count, duration)

    const handleAddActivity = (count, duration) => {
        console.log('event? ', count, duration)
        console.log('activity select?', newActivity)
    }

    return (
        <form onSubmit={(event) => {
        event.preventDefault();
        }}>
        <label htmlFor="add-activities">Add activities</label>
        <select role="listbox" className="ui fluid selection dropdown" name="add-activities">
        <option disabled>Pick an Activity</option>
        {activities.map((activity) => {
            return (
                <option onChange={(event) => console.log(event)}key={activity.id} value={activity.id} >{activity.name}</option>
            )
        })}
        </select>
        <input
            className="ui input"
            type="text"
            value={count}
            placeholder="Activity count"
            required
            onChange={(event) => setCount(event.target.value)}
        />
        <input 
            onChange={(event) => setDuration(event.target.value)}
            value={duration}
            type="text"
            className="ui input" 
            placeholder="Activity duration"
            />
        <button className="ui primary button" onClick={() => {handleAddActivity(count, duration, newActivity)}} type="submit">Add activity</button>
    </form>
    )
}

export default AddActivity;