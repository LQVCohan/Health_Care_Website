import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

class Home extends Component {
  render() {
    let linkToRedirect = "/home";
    // isLoggedIn && (userInfo.roleId === "R2" || userInfo.roleId === "R1")
    //   ? "/doctor/manage-doctor-info"
    //   : "/home";

    return <Navigate to={linkToRedirect} />;
  }
}

export default Home;
