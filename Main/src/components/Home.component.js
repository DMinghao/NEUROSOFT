import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import Axios from "axios";
import './homepage.css';
import * as url from './thocc-bristol-1-.jpeg' 
import { Link } from 'react-router-dom';
export default function Home() {
return(
 
  <div class="container">
  <img src={url.default} alt="Hospital Building" width="50%" height="100%"/>
  <div class="centered">
      <h2>Welcome to NeuroSoft Medical Surveying Platform</h2>
      <br></br>
      <Link to="/login" style={{ color: "#ffffff", margin: "0.3rem" }}>
                  <button className="btn btn-outline-primary">Login</button>
                </Link>
  </div>
</div> 
)
}