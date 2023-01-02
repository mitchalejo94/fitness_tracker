import react, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createRoutine } from "../api/api";

const Routines = ({ routines, token }) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  return (
    <>
      <h1 className="centered ui header">Routines</h1>
      {token ? (
        <>
          {" "}
          <div className="ui card centered">
            <div className="content">
              <div className="header">CREATE ROUTINE</div>
              <form
                class="ui form"
                onSubmit={async (event) => {
                  event.preventDefault();

                  const { error, routine } = await createRoutine(
                    name,
                    goal,
                    isPublic,
                    token
                  );

                  console.log("Routinestoken", token);

                  if (routine) {
                    console.log("post", routine);
                    setName("");
                    setGoal("");
                    setIsPublic("");
                    history.push("/posts");
                  } else {
                    setErrorMessage(error);
                  }
                }}
              >
                <div class="field">
                  <label>Routine Name</label>
                  <input
                    placeholder="Routine Name"
                    type="text"
                    className="field"
                    placeholder="Title"
                    required
                    autoComplete="off"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </div>
                <div class="field">
                  <label>Routine Goal</label>
                  <input
                    placeholder="Routine Goal"
                    required
                    autoComplete="off"
                    value={goal}
                    onChange={(event) => {
                      setGoal(event.target.value);
                    }}
                  />
                </div>
                <div class="ui checkbox">
                  <input
                    type="checkbox"
                    onChange={(event) => {
                      setIsPublic(true);
                    }}
                  />
                  <label>Make my routine public</label>
                </div>
                <div class="field"></div>
                <button class="ui button" type="submit">
                  Create Routine
                </button>
              </form>
            </div>{" "}
          </div>{" "}
        </>
      ) : null}
      {routines.map((individualRoutine) => {
        return (
          <>
            <div className="ui card centered">
              <div className="card header">
                {individualRoutine.name.toUpperCase()}
              </div>
              <div classname="meta">
                <span className="goal">By: </span>
                {individualRoutine.creatorName}
              </div>
              <div className="description">
                <span className="goal">Goal: </span>
                {individualRoutine.goal}
              </div>
              <div className="description">
                <span className="goal">Activities included: </span>
              </div>
              {individualRoutine.activities.map((activities) => {
                return (
                  <>
                    <div className="description">
                      {activities.name}(x{activities.duration})
                    </div>
                  </>
                );
              })}
              <span>
                {" "}
                <button className="ui right floated button">Delete</button>{" "}
                <button className="ui right floated button">Edit</button>
              </span>
            </div>
          </>
        );
      })}
    </>
  );
};

export default Routines;
