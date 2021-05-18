
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import Axios from "axios";
import './homepage.css';
import * as url from './thocc-bristol-1-.jpeg' 
import { Link } from 'react-router-dom';
export default function Home() {
return(
 
  <div className="container">
  <div className ="homeImg">
    < img src={url.default} alt="Hospital Building" width="100%" height="100%" />
  </div>
  
  <div className="header">
  <br/><br/><br/><br/>
    <h4>Manage patient data through highly customizable surveys </h4>
  </div>
  <div className="intro">
    <p>With the help of AI and NLP technologies, surgeons can automatically generate medical reports with documented patient surveying.</p >
   
    <p>This application is built as a type of online responsive platform, where patients can fill out prepared surveys from doctors anywhere they want.</p >
    <a className="button button-ghost" href=""></a >
  </div>
</div> 

)
}