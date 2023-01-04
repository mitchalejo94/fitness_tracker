import React, { useState, useEffect } from "react";
import {
  Home,
  AccountForm,
  Activities,
  Routines,
  MyRoutines,
} from "./components";
import { Route, Switch, Link } from "react-router-dom";
import { fetchActivities, fetchAllRoutines } from "./api/api";

const App = () => {
  const [activities, setActivities] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [token, setToken] = useState(
    window.localStorage.getItem("token") || null
  );
  // set user to
  const [user, setUser] = useState("");

  useEffect(() => {
    const getActivities = async () => {
      const activities = await fetchActivities();

      setActivities(activities);
      };
    getActivities();
  }, []);

  useEffect(() => {
    const getRoutines = async () => {
      const routines = await fetchAllRoutines();
      setRoutines(routines);
    };
    getRoutines();
  }, []);

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("token", token);
    } else {
      window.localStorage.removeItem("token");
    }
  }, [token]);

  // this is our logout button
  const LogOut = ({ setToken }) => {
    return (
      <button
        className="item"
        onClick={() => {
          setToken("");
        }}
      >
        <a>Log out</a>
      </button>
    );
  };

  return (
    <div>
      <nav className="ui horizontal menu">
        <div className="item">
          <Link className="header" to="/">
            Fitness Tracker
          </Link>
          <Link className="item" to="/activities">
            Activites
          </Link>
          <Link className="item" to="/routines">
            Routines
          </Link>
          {token ? (
            <Link className="item" to="/myroutines">
              My Routines
            </Link>
          ) : null}
        </div>
        <div className="right menu">
          {!token ? (
            <Link className="item" to="/accountform">
              Login / Register
            </Link>
          ) : null}
          {token ? <LogOut setToken={setToken} className="item" /> : null}
        </div>
      </nav>

      <Switch>
        <Route exact path="/">
          <Home token={token} />
        </Route>
        <Route path="/accountform">
          <AccountForm token={token} setToken={setToken} setUser={setUser} />
        </Route>
        <Route path="/activities">
          <Activities
            activities={activities}
            token={token}
            setActivities={setActivities}
          />
        </Route>
        <Route path="/routines">
          <Routines routines={routines} />
        </Route>
        <Route path="/myroutines">
          <MyRoutines username={user} token={token} activities={activities} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
