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
    const gathering = async (username) => {
      const data = await fetchActivities(username, token);
      setActivity(data);
      console.log(data, " - this is data ");
      console.log(token, "USEEFFECT TOKEN");
    };
    gathering(activity, setActivity, token);
  }, []);

  const handleCreateActivity = async (name, description) => {
    console.log(`this is name -${name} this is description - ${description}`);
    const newActivity = await createActivities(name, description, token);
    return newActivity;
  };
  const NewActivityForm = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    return (
      <>
        {token ? (
          <div className="container">
            <div className="ui card fluid">
              <form
                onSubmit={(event) => {
                  console.log(token, "please work");
                  event.preventDefault();
                  handleCreateActivity(name, description);
                  setName("");
                  setDescription("");
                }}
              >
                <div>
                  <label className="card header">Activity Name</label>
                  <br></br>
                  <input
                    type="text"
                    value={name}
                    placeholder="name"
                    required
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <div>
                  <label className="card header">Activity Description</label>
                  <br></br>
                  <input
                    type="text"
                    value={description}
                    placeholder="description"
                    required
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </div>

                <button className="ui button" type="submit">
                  Create Activity
                </button>
              </form>
            </div>
          </div>
        ) : null}
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
            <div className="container">
              <div className="ui fluid card">
                <div className="card header">
                  {individualActivity.name.toUpperCase()}
                </div>
                <div>
                  <span className="goal">Description:</span>
                  {individualActivity.description}
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default Activities;
