import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {Home, AccountForm, Activities, Routines, MyRoutines} from "./components"
import { Route, Switch, Link, useHistory} from "react-router-dom";

const App = () => {
    return <div>
      <nav className="ui horizontal menu">
        <div class="item">
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
        </div>
      </nav>
<Switch>
    <Route exact path ="/">
        <Home />
    </Route>
    <Route path ="/accountform">
        <AccountForm/>
    </Route>
    <Route path ="/activities">
        <Activities/>
    </Route>
    <Route path ="/routines">
        <Routines/>
    </Route>  
    <Route path ="/myroutines">
        <MyRoutines/>
    </Route>
</Switch>
    </div>
  }



export default App;