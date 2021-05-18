import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import Axios from "axios";
import './About.css';
import * as url from './about_us.png'
export default function About() {

return(
<div class ="about" >
    <h3>About Us    
    </h3>
    <img src={url.default} alt="Hospital Building" width="100%" height="300px"/>
    <br></br>
    <br></br>
    <br></br>
    <p>
        NeuroSoft is a medical surveying platform that allows surgeons from <a href="https://hartfordhealthcare.org">Hartford HealthCare</a> to create, manage, and distribute medical treatment admission surveys to new and returning patients. 
    </p>
    <div class="box">
    <div class ="row">
        <div class ="column1">
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h5>
                <img id="ctl01_ppheader_2_0_imgLogo" src="https://hartfordhealthcare.org/Image%20Library/Logos%20.%20Icons/No%20Tagline/Hartford-HealthCare--HHC-_4C_horz.png" alt="Hartford HealthCare"></img>
            </h5>
            <br></br>
            <p>
                <a href="https://hartfordhealthcare.org/about-us">Hartford HealthCare</a> is Connecticut’s only truly integrated healthcare system. With 33,000 colleagues, $4.3 billion in operating revenue and a medical staff of 4,000 providers, the system offers the full continuum of care with seven acute-care hospitals, the state’s longest-running air-ambulance service, behavioral health and rehabilitation services, a physician group and clinical integration organization, skilled-nursing and home health services, and a comprehensive range of services for seniors, including senior-living facilities.
            </p>
        </div>
        <div class="column1">
            <p>
            <iframe width="500px" height="400px" src="https://www.youtube.com/embed/Nv7fGanXBbs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </p>
        </div>
    </div>
    <br></br>
    <div class = "team">
        <h4 style={{ color: "#0098c3" }}>
            Our Developer Team
        </h4>
        <br></br>
        <h5>
            Advisor
        </h5>
        <p>
            Prof. Ahmad Ajakh
        </p>
        <br></br>
        <h5>
            Members
        </h5>
        <p>
            Minghao Du <i>mdu5@jh.edu</i>
        </p>
        <p>
            Tao Ren <i>tren199729@gmail.com</i>
        </p>
        <p>
            Ying Chen <i>ychen448@jh.edu</i>
        </p>
        <p>
            Yuxin Liu <i>yliu387@jh.edu </i>
        </p>
        <p> 
            Zihan Wang <i>zwang207@jh.edu </i>
        </p>



    </div>



</div>  
</div>
)
}