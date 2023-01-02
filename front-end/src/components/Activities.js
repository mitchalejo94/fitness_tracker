import React, { useState, useEffect } from "react";
import { createActivities, fetchActivities } from "../api/api";
// import { Link } from "react-router-dom";
//import { getAllActivities } from "../../../db/activities";

const Activities = ({ activities, token }) => {
  console.log(activities, "these are the activities");
  //   const [description, setDescription] = useState("");
  const [activity, setActivity] = useState([]);
  //   const [name, setName] = useState("");
  // const [token,setToken ] = useState(window.localStorage.getItem("token") || null)

  // useEffect(() => {
  //     if (token) {
  //       window.localStorage.setItem('token', token);
  //     } else {
  //       window.localStorage.removeItem('token');
  //     }
  //   }, [token]);

  useEffect(() => {
    const gathering = async (activity, setActivity, token) => {
      const data = await fetchActivities(activity, setActivity, token);
      setActivity(data);
      console.log(data, " - this is data ");
    };
    gathering(activity, setActivity, token);
  },[]);

  const handleCreateActivity = async (name, description) => {
    console.log(`this is name -${name} this is description - ${description}`);
    const newActivity = await createActivities(token, name, description);
    return newActivity;
  };
  const NewActivityForm = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    return (
      <>
        {
          /* {token ? (
      <>
        {" "}
        <div className="ui card centered">
          <div className="content">
            <div className="header">CREATE ACTIVITY</div>
            <form
              className="ui form"
              onSubmit={async (event) => {
                event.preventDefault();
    
                const { activities } = await createActivities(
                  token,
                  name,
                  description
                );
    
                console.log("activity from onSubmit:", description);
    
                // if(activities) {
                //     setActivities((prevActivities) => [...prevActivities, activities]);
                //     setName('');
                //     setDescription('');
                // } else {
                //     console.error("Cannot make new activity");
                // }
              }}
            >
              <div className="field">
                <label>Activity Name</label>
                <input placeholder="Activity Name" />
              </div>
              <div className="field">
                <label>Activity Description</label>
                <input placeholder="Activity Description" />
              </div>
              <div className="field"></div>
              <button className="ui button" type="submit">
                Create Activity
              </button>
            </form>
          </div>{" "}
        </div>{" "}
      </>
    ) : null
    } */
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleCreateActivity(name, description);
              setName("");
              setDescription("");
            }}
          >
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
              value={description}
              placeholder="description"
              required
              onChange={(event) => setDescription(event.target.value)}
            />
            
            <button type="submit">Create Activity</button>
          </form>
        }
      </>
    );
  };

  return (
    <>
      <h1 className="centered ui header">Activities</h1>
      <NewActivityForm />

      {activities.map((individualActivity) => {
        return (
          <>
            <div className="ui card centered">
              <div className="header">
                {individualActivity.name.toUpperCase()}
              </div>
              <div className="meta">{individualActivity.description}</div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default Activities;
