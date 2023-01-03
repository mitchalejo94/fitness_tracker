import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import { Activities, Routines, MyRoutines } from "/";
import { fetchUser } from "../api/api";

const Home = ({ token }) => {
  // const getUserData = async (token) => {
  //     const data = await fetchUser(token);
  //     console.log('this is data in Home: ', data);
  //     return data;
  // }
  // const data = await getUserData(token);
  // console.log('datadatadata: ', data)
  // getUserData();
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
              Activites
            </Link>
          </div>
          <div className="ui fluid card">
            <Link className="card header" to="/routines">
              Routines
            </Link>
          </div>
          <div className="ui fluid card">
            <Link className="card header" to="/myroutines">
              MyRoutines
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
