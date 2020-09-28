import React, { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Axios from "axios";
import UserContext from "../../../context/UserContext";

export default function PaUserPage() {
    const history = useHistory();
    const { userData, setUserData } = useContext(UserContext);
    console.log(userData)
    if (typeof userData.user === "undefined") history.push("/login");

    return (
        <div>
            <h3>Patient's Dashboard Page</h3>
            <br/>
            {/* <Link to={"/newsurvey/" + userData.user.id} style={{ color: "#ffffff", margin: "0.3rem" }}> */}
            <Link to={"/newsurvey"} style={{ color: "#ffffff", margin: "0.3rem" }}>
                <button className="btn btn-outline-primary">Complete a New Survey</button>
            </Link>
        </div>

    )
}