import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar.component";
import SurveyList from "./components/survey-list.component";
// import ViewEditSurvey from "./components/viewEdit-survey.component";
import NewSurvey from "./components/new-survey.component";
import CreateUser from "./components/create-user.component";
// import index from "./components/index";

function App() {
  return (
    <Router>
    <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={SurveyList} />
      {/* <Route path="/viewEdit/:id" component={ViewEditSurvey} /> */}
      <Route path="/newSurvey" component={NewSurvey} />
      <Route path="/user/register" component={CreateUser} />
    </div>
    </Router>
  );
}

export default App;
