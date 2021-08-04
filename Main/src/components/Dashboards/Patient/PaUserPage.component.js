import React, { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Axios from "axios";
import UserContext from "../../../context/UserContext";
import PaDashSideNav from "./PaDashSideNav.component"
import CompletedSurvey from './CompletedSurvey.component'
import PaDocList from "./PaDocList.component";
import PendingSurvey from "./PendingSurvey.component"

export default function PaUserPage() {
    // const history = useHistory();
    // const { userData, setUserData } = useContext(UserContext);
    // console.log(userData)
    // if (typeof userData.user === "undefined") history.push("/login");

    const [currentPage, setCurrentPage] = useState('Dashboard');

    const dashContent = () => {
        return (
            <div>
                <h3>Patient's Dashboard Page</h3>
            </div>
        )
    }
    
    const renderSwitch = () => {
        switch (currentPage) {
            case 'Dashboard':
                return dashContent();
            case 'MyDoctors':
                return <PaDocList/>
            case 'CompletedSurvey':
                return <CompletedSurvey/>
            case 'PendingSurvey': 
                return <PendingSurvey/>
            default:
                return dashContent();
        }
    }

    return (
        <div style={{ display: "flex" }}>
            <PaDashSideNav updatePage={setCurrentPage}/>
            {renderSwitch()}
            {/* <Link to={"/newsurvey"} style={{ color: "#ffffff", margin: "0.3rem" }}>
                <button className="btn btn-outline-primary">Complete a New Survey</button>
            </Link> */}
        </div>

    )
}