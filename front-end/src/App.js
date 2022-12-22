import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {Home, AccountForm} from "./components"
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
      </nav>
<Switch>
    <Route exact path ="/">
        <Home />
    </Route>
    <Route path ="/accountform">
        <AccountForm/>
    </Route>
</Switch>
    </div>
  }



export default App;