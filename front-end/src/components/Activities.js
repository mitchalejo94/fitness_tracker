import React from "react";
// import { Link } from "react-router-dom";
//import { getAllActivities } from "../../../db/activities";

const Activities = ({activities, token,individualActivity}) => {
    console.log(activities, "these are the activities");
    return (
        <>
        <h1 className="centered ui header">Activities</h1>
        {token ? <> <div className="ui card centered"><div className="content"><div className="header">CREATE ACTIVITY</div><form class="ui form"><div class="field"><label>Activity Name</label><input placeholder="Activity Name"/></div><div class="field"><label>Activity Description</label><input placeholder="Activity Description"/></div><div class="field"></div><button class="ui button" type="submit">Create Activity</button></form></div> </div> </> : null}
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