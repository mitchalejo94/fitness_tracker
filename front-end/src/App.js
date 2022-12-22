import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {Home, AccountForm, Activities, Routines, MyRoutines} from "./components"
import { Route, Switch, Link, useHistory} from "react-router-dom";

const App = () => {
    return <div>
      Hello World
      <nav>
        <Link to="/">
            Home
        </Link>
        <Link to="/accountform">
            AccountForm 
        </Link>
        <Link to="/activities">
            Activites
        </Link>
        <Link to="/routines">
            Routines
        </Link>
        <Link to="/myroutines">
           My Routines
        </Link>
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