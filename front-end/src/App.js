import React, {useState, useEffect} from "react";
import {Home, AccountForm, Activities, Routines, MyRoutines} from "./components"
import { Route, Switch, Link} from "react-router-dom";
import { fetchActivities } from "./api/api";

const App = () => {
const [activities, setActivities] = useState ([])
const [token, setToken] = useState(window.localStorage.getItem("token"||""));

useEffect(() => {
    const getActivities = async () => {
        const activities = await fetchActivities();
        // if (error) {
        //     console.error(error);
        // }
        setActivities(activities);
        // console.log('HEREEEEE is activities', activities)
    };
    getActivities();
}, []);

// this useEffect sets the items state every time our token value changes
useEffect(() => {
    window.localStorage.setItem("token", token) // key value pair
    console.log('token in index useEffect', token)
    }, [token]);

// this is our logout button
const LogOut = ({setToken}) => {
    return (
        <button className="item" onClick={() => {setToken("")} }><a>Log out</a></button> 
    )
}

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
        <Link className="item" to="/myroutines">
           My Routines
        </Link>
        </div>
        <div className="right menu">
        <Link className="item" to="/accountform">
            Login / Register
        </Link>

            <LogOut setToken={setToken} className="item"/>

        </div>
      </nav>
      
<Switch>
    <Route exact path ="/">
        <Home />
    </Route>
    <Route path ="/accountform">
        <AccountForm token={token} setToken={setToken} />
    </Route>
    <Route path ="/activities">
        <Activities activities={activities} token = {token} setActivities={setActivities}/>
    </Route>
    <Route path ="/routines">
        <Routines />
    </Route>  
    <Route path ="/myroutines">
        <MyRoutines/>
    </Route>
</Switch>
    </div>
    )
  }



export default App;