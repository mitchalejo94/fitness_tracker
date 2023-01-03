import react, { useState } from "react";
import { useHistory } from "react-router-dom";

const Routines = ({ routines }) => {
  return (
    <>
      <h1 className="centered ui header">Routines</h1>
      {routines.map((individualRoutine) => {
        return (
          <>
            <div className="container">
              <div className="ui fluid card">
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
                <span> </span>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default Routines;
