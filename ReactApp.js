import React, { useEffect, useState } from "react";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import { fetchPosts, fetchUser } from "./api/api";


const ReactApp = () => {
    return (
        <div>
            <h1>Welcome to Fitness Tracker</h1>
        </div>
    )
}

export default ReactApp;