
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import Axios from "axios";
import './homepage.css';
import * as url from './thocc-bristol-1-.jpeg'
import * as url2 from './doctor.png' 
import * as url3 from './patient.png'
import * as url4 from './register.png' 
import * as url5 from './survey.jpg' 
import * as url6 from './send.png' 
import * as url7 from './report.png' 
import { Link } from 'react-router-dom';
export default function Home() {
return(
 


  <div class="container">
  <div class="row">
  <div class="column1">
    <div class ="homeImg">
      <img src={url.default} alt="Hospital Building" width="100%" height="100%" />
    </div>
  </div>
  <div class="column1">
    <div class="intro">
      <h3>Manage patient data through highly customizable surveys </h3>
      <br/>
      <p>With the help of AI and NLP technologies, surgeons can automatically generate medical reports with documented patient surveying.</p>
      <p>This application is built as a type of online responsive platform, where patients can fill out prepared surveys from doctors anywhere they want.</p>
      <p>Doctors can then keep and extract patients’ records from the platform and spend less time reading and checking the paperwork during face-to-face meetings with patients. </p >
      {/* <a class="button button-ghost" href=""></a> */}
    </div>
  </div>
  
  </div>


  <div className ="row">
    <div className ="column2">
      <img src={url2.default} alt="Patient" width="100%" height="100%" class="center"/>
    </div>
    <div className ="column2">
      <br></br>
      <br></br>
      <br></br>
      <img src={url5.default} alt="Patient" width="30%" height="30%" class="center"/>
      <p>Create survey templates through feature-rich survey functions</p>
    </div>
    <div className ="column2">
      <br></br>
      <br></br>
      <br></br>
      <img src={url6.default} alt="Patient" width="30%" height="30%" class="center"/>
      <p>Distribute surveys to patients</p>
      <p>
        Manage patient’s survey result
      </p>
    </div>
    <div className ="column2">
      <br></br>
      <br></br>
      <br></br>
      <img src={url7.default} alt="Patient" width="30%" height="30%"class="center"/>
      <p>Check Ai-powered auto-generated reports based on patient’s survey</p>
    </div>
  </div>
  <div className ="row">
    <div className ="column2">
      <img src={url3.default} alt="Patient" width="100%" height="100%" class="center"/>
    </div>
    <div className ="column2">
      <br></br>
      <br></br>
      <br></br>
      <img src={url4.default} alt="Patient" width="30%" height="30%" class="center"/>
      <p>Register/Log into the account</p>
    </div>
    <div className ="column2">
      <br></br>
      <br></br>
      <br></br>
      <img src={url5.default} alt="Patient" width="30%" height="30%" class="center"/>
      <p>Fill out the survey you receive</p>
      <p>
        i. Complete the survey
      </p>
      <p>
        ii. Save the survey, complete it later
      </p>
    </div>
    <div className ="column2">
      <br></br>
      <br></br>
      <br></br>
      <img src={url7.default} alt="Patient" width="30%" height="30%"class="center"/>
      <p>Keep the survey records in your account, then your doctor will know you better :)</p>
    </div>
  </div>

</div>

)
}