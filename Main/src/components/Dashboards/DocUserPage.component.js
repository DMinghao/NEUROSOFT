import React, { useState, useContext, useEffect } from "react";
import SurveyList from "../survey-list.component";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import UserContext from "../../context/UserContext";

export default function DocUserPage() {
    const history = useHistory();
    const { userData, setUserData } = useContext(UserContext);
    // console.log(userData)
    if (typeof userData.user === "undefined") history.push("/login");

    return (
        <div>
            <h3>Doctor's Dashboard Page</h3>
            <SurveyList />
        </div>
    );
}