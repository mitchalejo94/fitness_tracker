import React, {useState} from "react";
import { createActivities } from "../api/api";
// import { Link } from "react-router-dom";
//import { getAllActivities } from "../../../db/activities";

const Activities = ({activities, token, setActivities}) => {
    console.log(activities, "these are the activities");
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');

    return (
        <>
        <h1 className="centered ui header">Activities</h1>
        
        {token ? <> <div className="ui card centered"><div className="content"><div className="header">CREATE ACTIVITY</div><form className="ui form" onSubmit={async(event) => {
            event.preventDefault();
            const {activities} = await createActivities(token, name, description);

            console.log("activity from onSubmit:", description)

            if(activities) {
                setActivities((prevActivities) => [...prevActivities, activities]);
                setName('');
                setDescription('');
            } else {
                console.error("Cannot make new activity");
            }

        }}><div className="field"><label>Activity Name</label><input placeholder="Activity Name"/></div><div className="field"><label>Activity Description</label><input placeholder="Activity Description"/></div><div className="field"></div><button className="ui button" type="submit">Create Activity</button></form></div> </div> </> : null}
        {activities.map((individualActivity)=> {
            return( 
                <>
                
    
                <div className="ui card centered">
                
                    <div className="header">{individualActivity.name.toUpperCase()}</div>
                    <div className="meta">{individualActivity.description}</div>
                
                    </div>
                </>
            )
        })}

 
        


        </>
    )
}



export default Activities;