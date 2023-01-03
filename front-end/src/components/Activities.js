import React, { useState, useEffect } from "react";
import { createActivities, fetchActivities } from "../api/api";
import {useHistory} from 'react-router-dom';


const Activities = ({ activities, setActivities, token }) => {
  const history = useHistory();
  console.log(activities, "these are the activities");
  // const [errorMessage, setErrorMessage] = useState(null);


  useEffect(() => {
    const gathering = async (username) => {
      const data = await fetchActivities(username, token);
      setActivities(data);
      console.log(data, " - this is data ");
      console.log(token, "USEEFFECT TOKEN");
    };
    gathering(setActivities, token);
  }, []);

  const handleCreateActivity = async (name, description) => {
    console.log(`this is name -${name} this is description - ${description}`);
    const oldActivity = await fetchActivities(name, description);
    const newActivity = await createActivities(name, description, token);

    if(newActivity != oldActivity) {
      setActivities((previousActivities) => [...previousActivities, newActivity])
      return newActivity;
    } else {
      window.alert("this exists already")
      history.push('/activities')
    }
      
    

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
                  // console.log(token, "please work");
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

                {/* {(newActivity === oldActivity) ? <p className="ui negative message">{"This activity already exists"}</p> : null} */}

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
