import react from "react";

const Routines = (routines) => {
  return (
    <>
      <h1 className="centered ui header">Routines</h1>

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
