import React from "react";
import { Link } from "react-router-dom";

const Home = ({ token }) => {
  return (
    <>
      <div className="ui container">
        <h1 className="centered ui header">Fitness Tracker</h1>
        {token ? (
          // (`You are logged in as ${data.username}`)
          console.log("you are logged in")
        ) : (
          <p>You are not logged in.</p>
        )}
        <div className="container">
          <div className="ui fluid card">
            <Link className="card header" to="/activities">
              Activities
            </Link>
          </div>
          <div className="ui fluid card">
            <Link className="card header" to="/routines">
              Routines
            </Link>
          </div>
          {token ? (
            <div className="ui fluid card">
              <Link className="card header" to="/myroutines">
                MyRoutines
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Home;
