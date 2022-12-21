import React from "react";
import ReactDOM from "react-dom/client";
import ReactApp from "./ReactApp";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <Router>
    <ReactApp />
    <h1>TEST</h1>
  </Router>
);
