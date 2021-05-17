import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import Axios from "axios";
import './About.css';

export default function About() {

return(
<div class ="about" >
    <h3>About Page
        
    </h3>
    <br></br>
    <p>
        NeuroSoft is a medical surveying platform that allows surgeons from <a href="https://hartfordhealthcare.org">Hartford HealthCare</a> to create, manage, and distribute medical treatment admission surveys to new and returning patients. 
    </p>
    <br></br>
    <h5>
    <img id="ctl01_ppheader_2_0_imgLogo" src="https://hartfordhealthcare.org/Image%20Library/Logos%20.%20Icons/No%20Tagline/Hartford-HealthCare--HHC-_4C_horz.png" alt="Hartford HealthCare"></img>
    </h5>
    <br></br>
    <p>
    <a href="https://hartfordhealthcare.org/about-us">Hartford HealthCare</a> is Connecticut’s only truly integrated healthcare system. With 33,000 colleagues, $4.3 billion in operating revenue and a medical staff of 4,000 providers, the system offers the full continuum of care with seven acute-care hospitals, the state’s longest-running air-ambulance service, behavioral health and rehabilitation services, a physician group and clinical integration organization, skilled-nursing and home health services, and a comprehensive range of services for seniors, including senior-living facilities.
    </p>
    <br></br>
    <h5 style={{ color: "#0098c3" }}>
        Our Developer Team
    </h5>
    <br></br>
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

)
}