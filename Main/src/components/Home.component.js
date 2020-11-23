import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import Axios from "axios";

import * as url from './Building-Doctor-Patient-Trust.jpg' 

export default function Home() {

return(
<div>
    <h3>Home Page
    <p>
        <img src={url.default} alt="Doctor smiling" width="1116" height="500"/>
    </p>
    </h3>
</div>

)
}