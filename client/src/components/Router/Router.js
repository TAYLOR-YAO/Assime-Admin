import React from "react";
import {Switch, Route} from "react-router-dom";
import store from "../Config/Store";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import StoreRegistration from "../Pages/StoreRegistration";
import Login from "../Pages/Login";
// import Home from "../Pages/UserPages/HomePages";
import Office from "../Pages/Managment/Office";
import Landing from "../Pages/Landing/landing";
import Register from "../Pages/Register/Register";

import PrivateRoute from "../PrivateRoute/PrivateRoute";
// import Dashboard from "../Pages/Dashboard/Dashboard";

import jwt_decode from "jwt-decode";
import setAdminAuthToken from "../Utils/setAdminAuthToken";
import { setCurrentAdmin, logoutAdmin } from "../Utils/Actions";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAdminAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentAdmin(decoded));
  // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutAdmin());
      // Redirect to login
      window.location.href = "./login";
    }
  }

const Router =()=>(
    <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Office} />
        <PrivateRoute exact path="/storeregistration" component={StoreRegistration}/>                        

    </Switch>
)

export default Router;