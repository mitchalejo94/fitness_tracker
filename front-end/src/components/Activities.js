import React from "react";
// import { Link } from "react-router-dom";
//import { getAllActivities } from "../../../db/activities";

const Activities = ({activities}) => {
    console.log(activities, "these are the activities");
    return (
        <>
        <h1 className="centered ui header">Activities</h1>
        {activities.map((individualActivity)=> {
            return( 
                <>
                    <h3>{individualActivity.name}</h3>
                    <p>{individualActivity.description}</p>
                </>
            )
        })}
        </>
    )
}



export default Activities;