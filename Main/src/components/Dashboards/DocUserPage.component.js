import React, { useState, useContext, useEffect } from "react";
import SurveyList from "../survey-list.component";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import UserContext from "../../context/UserContext";

export default function DocUserPage() {
    const history = useHistory();
    const { userData, setUserData } = useContext(UserContext);
    if (!userData.user) return (<h3>Access restricted</h3>)

    return (
        <div>
            <h3>Doctor's Dashboard Page</h3>
            <SurveyList />
        </div>
    );
}