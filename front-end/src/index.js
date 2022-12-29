import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {Home} from "./components"
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <Router>
    <App />
  </Router>
);
