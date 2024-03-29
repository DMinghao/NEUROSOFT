import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";

import Navbar from "./components/Navbar.component";
// import SurveyList from "./components/survey-list.component";
import ViewEditSurvey from "./components/Dashboards/Doctor/viewEdit-survey.component";
import NewSurvey from "./components/Dashboards/Patient/new-survey.component";
import CreateUser from "./components/Auth/Create-user.component";
import Login from "./components/Auth/Login.component";
import Home from "./components/Home.component";
import About from "./components/About.component";
import DocUserPage from "./components/Dashboards/Doctor/DocUserPage.component";
import PaUserPage from "./components/Dashboards/Patient/PaUserPage.component";

import PrivateRoute from "./components/Auth/PrivateRoute.route"
import DocPrivateRoute from "./components/Auth/DocPrivateRoute.route"
import PaPrivateRoute from "./components/Auth/PaPrivateRoute.route"
import UserContext from "./context/UserContext";
import viewSurvey from "./components/Dashboards/Patient/viewSurvey.component";
import CreateDistribution from './components/Dashboards/Doctor/Create-distribution.component';
// import index from "./components/index";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "/API/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
          const userRes = await Axios.get("/API/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/register" component={CreateUser} />
        <Route exact path="/login" component={Login} />

        <DocPrivateRoute exact path="/docdash" component = {DocUserPage} />
        <PaPrivateRoute exact path="/padash" component = {PaUserPage} />
        <PrivateRoute exact path="/viewEdit/:id" component={ViewEditSurvey} />
        <DocPrivateRoute exact path="/newDist" component={CreateDistribution} />
        <PrivateRoute exact path="/newSurvey/:id" component={NewSurvey} />
        <PrivateRoute exact path="/viewSurvey/:id" component={viewSurvey} />
      </div>
      
    </Router>
    </UserContext.Provider>
  );
}

export default App;
