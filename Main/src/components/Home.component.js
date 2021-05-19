
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
      <h4>Manage patient data through highly customizable surveys </h4>
      <br/>
      <p>With the help of AI and NLP technologies, surgeons can automatically generate medical reports with documented patient surveying.</p>
      <p>This application is built as a type of online responsive platform, where patients can fill out prepared surveys from doctors anywhere they want.</p>
      {/* <a class="button button-ghost" href=""></a> */}
    </div>
  </div>
  
</div>
<div class="steps">
    <img src={url2.default} alt="Doctors" width="20%" height="20%"/>
    <img src={url3.default} alt="Patients" width="20%" height="20%"/>
    <img src={url4.default} alt="Register" width="20%" height="20%"/>
    <img src={url5.default} alt="Survey" width="20%" height="20%"/>
    <img src={url6.default} alt="Send" width="20%" height="20%"/>
    <img src={url7.default} alt="Report" width="20%" height="20%"/>
  </div>
</div>

)
}